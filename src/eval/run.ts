import fs from "node:fs";
import path from "node:path";
import { cases } from "../../eval/cases/cases";
import { runBaseline } from "../baseline/baseline";
import { runSolution } from "../agent/solve";
import { verifyClaims } from "../lib/verify";
import { scoreQuality } from "../lib/scoreQuality";
import { stringifyDraft } from "../lib/draftFormat";
import { IMPROVEMENTS } from "../agent/improvements/index";
import type { RunResult } from "../lib/types";
import type { LLMCallLog } from "../lib/callLLM";

const mode = process.argv[2];


const enabledIds = IMPROVEMENTS.filter((i) => i.enabled).map((i) => i.id);
const stageLabel = enabledIds.length > 0 ? enabledIds.join("+") : "no-improvements-enabled";

const RESULTS_DIR = path.resolve("eval/results", stageLabel);
const TRAJ_DIR = path.resolve("agent-trajectories", stageLabel);
const BASELINE_RESULTS_DIR = path.resolve("eval/results", "baseline-only");
const BASELINE_TRAJ_DIR = path.resolve("agent-trajectories", "baseline-only");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeTrajectory(dir: string, caseId: string, kind: string, logs: LLMCallLog[], summary: string) {
  ensureDir(dir);
  const file = path.join(dir, `${kind}-${caseId}.md`);
  const body = [
    `# Trajectory: ${kind} — ${caseId}`,
    ``,
    `Stage: ${kind === "baseline" ? "baseline-only" : stageLabel}`,
    ``,
    `## Summary`,
    summary,
    ``,
    `## Raw steps`,
    ...logs.map(
      (l, i) =>
        `\n### Step ${i + 1} — ${l.role}${l.kind === "tool" ? " (tool/context/memory — no LLM call)" : " (LLM call)"}\n\n**System prompt:**\n\n\`\`\`\n${l.systemPrompt}\n\`\`\`\n\n**User prompt:**\n\n\`\`\`\n${l.userPrompt}\n\`\`\`\n\n**Response:**\n\n\`\`\`\n${l.rawResponse}\n\`\`\`\n`
    ),
  ].join("\n");
  fs.writeFileSync(file, body, "utf-8");
}

async function runAll(kind: "baseline" | "solution"): Promise<RunResult[]> {
  const out: RunResult[] = [];
  const trajDir = kind === "baseline" ? BASELINE_TRAJ_DIR : TRAJ_DIR;

  for (const c of cases) {
    console.log(`[${kind}] running ${c.id} (${c.difficulty})...`);
    const startedAt = Date.now();
    let output: string;
    let logs: LLMCallLog[];
    let iterations = 1;

    if (kind === "baseline") {
      const r = await runBaseline(c);
      output = stringifyDraft(r.output);
      logs = r.logs;
    } else {
      const r = await runSolution(c);
      output = stringifyDraft(r.output);
      logs = r.logs;
      iterations = r.iterations;
    }


    const { result: verification, log: scoreLog } = await verifyClaims(output, c.candidateFacts);
    logs.push(scoreLog);


    const { result: quality, log: qualityLog } = await scoreQuality(output);
    logs.push(qualityLog);

    const elapsedMs = Date.now() - startedAt;
    const totalTokens = logs.reduce((sum, l) => sum + (l.totalTokens ?? 0), 0);

    const summary = `Case: ${c.id} (${c.difficulty})${
      c.isHardCase ? " — HARD CASE: " + c.hardCaseNote : ""
    }\nFabricated claims: ${verification.fabricatedCount}/${verification.totalClaims}\nQuality score: ${quality.score}/5 (${quality.notes})\nRepair iterations: ${iterations}\nTokens: ${totalTokens} | Time: ${elapsedMs}ms`;
    writeTrajectory(trajDir, c.id, kind, logs, summary);

    out.push({
      caseId: c.id,
      finalOutput: output,
      verification,
      iterations,
      totalTokens,
      elapsedMs,
      qualityScore: quality.score,
    });
  }
  return out;
}

function summarize(label: string, results: RunResult[]) {
  const totalFab = results.reduce((s, r) => s + r.verification.fabricatedCount, 0);
  const totalClaims = results.reduce((s, r) => s + r.verification.totalClaims, 0);
  const rate = totalClaims > 0 ? (totalFab / totalClaims) * 100 : 0;

  const avgQuality = results.reduce((s, r) => s + r.qualityScore, 0) / results.length;
  const avgTokens = results.reduce((s, r) => s + r.totalTokens, 0) / results.length;
  const avgMs = results.reduce((s, r) => s + r.elapsedMs, 0) / results.length;
  const avgIterations = results.reduce((s, r) => s + r.iterations, 0) / results.length;

  console.log(`\n=== ${label} summary ===`);
  console.log(`Total claims checked: ${totalClaims}`);
  console.log(`Fabricated/unsupported claims: ${totalFab}`);
  console.log(`Fabrication rate: ${rate.toFixed(1)}%`);
  console.log(`Avg quality score: ${avgQuality.toFixed(2)}/5`);
  console.log(`Avg tokens/case: ${Math.round(avgTokens)}`);
  console.log(`Avg time/case: ${(avgMs / 1000).toFixed(1)}s`);
  console.log(`Avg repair iterations/case: ${avgIterations.toFixed(2)}`);

const tiers: Array<"easy" | "medium" | "hard" | "outlier"> = ["easy", "medium", "hard", "outlier"];
  const byTier: Record<string, { fab: number; total: number; rate: number }> = {};
  for (const tier of tiers) {
    const tierResults = results.filter((r) => cases.find((c) => c.id === r.caseId)?.difficulty === tier);
    if (tierResults.length === 0) continue;
    const fab = tierResults.reduce((s, r) => s + r.verification.fabricatedCount, 0);
    const total = tierResults.reduce((s, r) => s + r.verification.totalClaims, 0);
    byTier[tier] = { fab, total, rate: total > 0 ? (fab / total) * 100 : 0 };
    console.log(`  ${tier}: ${fab}/${total} fabricated (${byTier[tier].rate.toFixed(1)}%)`);
  }

  return { totalFab, totalClaims, rate, avgQuality, avgTokens, avgMs, avgIterations, byTier };
}

async function main() {
  console.log(`Stage: ${stageLabel}`);
  console.log(`Enabled improvements: ${enabledIds.join(", ") || "(none)"}\n`);

  ensureDir(RESULTS_DIR);
  ensureDir(BASELINE_RESULTS_DIR);

  if (mode === "baseline") {
    const results = await runAll("baseline");
    fs.writeFileSync(path.join(BASELINE_RESULTS_DIR, "baseline.json"), JSON.stringify(results, null, 2));
    summarize("Baseline", results);
  } else if (mode === "solution") {
    const results = await runAll("solution");
    fs.writeFileSync(path.join(RESULTS_DIR, "solution.json"), JSON.stringify(results, null, 2));
    summarize(`Solution (${stageLabel})`, results);
  } else if (mode === "compare") {
    const baseline = await runAll("baseline");
    fs.writeFileSync(path.join(BASELINE_RESULTS_DIR, "baseline.json"), JSON.stringify(baseline, null, 2));
    const solution = await runAll("solution");
    fs.writeFileSync(path.join(RESULTS_DIR, "solution.json"), JSON.stringify(solution, null, 2));

    const b = summarize("Baseline", baseline);
    const s = summarize(`Solution (${stageLabel})`, solution);

    console.log(`\n=== COMPARISON: baseline vs. ${stageLabel} ===`);
    console.log(`| Metric              | Baseline | Solution | Change |`);
    console.log(`|----------------------|----------|----------|--------|`);
    console.log(
      `| Fabrication rate     | ${b.rate.toFixed(1)}%    | ${s.rate.toFixed(1)}%    | ${(b.rate - s.rate).toFixed(1)}pt reduction |`
    );
    console.log(
      `| Quality score (1-5)  | ${b.avgQuality.toFixed(2)}     | ${s.avgQuality.toFixed(2)}     | ${(s.avgQuality - b.avgQuality).toFixed(2)} |`
    );
    console.log(
      `| Avg tokens/case      | ${Math.round(b.avgTokens)}      | ${Math.round(s.avgTokens)}      | ${(s.avgTokens / b.avgTokens).toFixed(1)}x |`
    );
    console.log(
      `| Avg time/case (s)    | ${(b.avgMs / 1000).toFixed(1)}     | ${(s.avgMs / 1000).toFixed(1)}     | ${(s.avgMs / b.avgMs).toFixed(1)}x |`
    );

    fs.writeFileSync(
      path.join(RESULTS_DIR, "comparison.json"),
      JSON.stringify({ stageLabel, enabledIds, baseline: b, solution: s }, null, 2)
    );

    console.log(`\nFull numbers written to eval/results/${stageLabel}/comparison.json`);
    console.log(`Trajectories written to agent-trajectories/${stageLabel}/ (and /baseline-only/)`);
  } else {
    console.error("Usage: npm run baseline | npm run solve | npm run eval");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
