import { runBaseline } from "../../../../src/baseline/baseline";
import { runSolution } from "../../../../src/agent/solve";
import { IMPROVEMENTS } from "../../../../src/agent/improvements/index";
import { verifyClaims } from "../../../../src/lib/verify";
import { stringifyDraft } from "../../../../src/lib/draftFormat";
import { matchRequirements } from "../../../../src/lib/matchRequirements";
import type { AgentEvent, RunLane } from "../../../../src/lib/agentEvents";
import type { CandidateFact, EvalCase } from "../../../../src/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface GenerateBody {
  jobTitle: string;
  company: string;
  jobDescription: string;
  facts: string[];
}

export async function POST(req: Request) {
  let body: GenerateBody;
  try {
    body = (await req.json()) as GenerateBody;
  } catch (err) {
    console.error("Malformed request body:", err);
    return new Response(JSON.stringify({ error: "Malformed request body." }), { status: 400 });
  }

  const { jobTitle, company, jobDescription, facts } = body;

  if (!jobTitle || !jobDescription || !facts?.length) {
    return new Response(
      JSON.stringify({ error: "Job title, job description, and at least one fact are required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const candidateFacts: CandidateFact[] = facts
    .filter((f) => f.trim().length > 0)
    .map((text, i) => ({ id: `F${i + 1}`, text: text.trim() }));

  const evalCase: EvalCase = {
    id: "live-run",
    difficulty: "medium",
    candidateFacts,
    jobPosting: {
      title: jobTitle,
      company: company || "the company",
      description: jobDescription,
    },
  };

  const preDraftSteps = IMPROVEMENTS.filter((i) => i.enabled && i.beforeDraft).length;
  const totalStepsHint = preDraftSteps + 7;

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const send = (event: AgentEvent) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch (err) {
          closed = true;
          console.warn("Client disconnected mid-run:", (err as Error).message);
        }
      };

      /** Wraps a plain async step (one not run by the pipeline) in the same start/done narration. */
      async function narrate<T>(
        lane: RunLane,
        stepId: string,
        meta: { label: string; detail?: string; kind?: string },
        run: (onDelta: (text: string) => void) => Promise<T>,
        summarize: (value: T) => { summary?: string; status?: "ok" | "warn" }
      ): Promise<T> {
        const startedAt = Date.now();
        send({ type: "step-start", lane, stepId, streams: true, ...meta });
        const value = await run((text) => send({ type: "step-delta", lane, stepId, text }));
        send({
          type: "step-done",
          lane,
          stepId,
          elapsedMs: Date.now() - startedAt,
          ...summarize(value),
        });
        return value;
      }

      try {
        send({ type: "run-start", totalStepsHint, startedAt: Date.now() });

        const requirementMatches = matchRequirements(jobDescription, candidateFacts);

        const [baseline, solution] = await Promise.all([
          runBaseline(evalCase, { onEvent: send }),
          runSolution(evalCase, { onEvent: send }),
        ]);

        const [baselineVerification, solutionVerification] = await Promise.all([
          narrate(
            "audit",
            "audit-baseline",
            {
              label: "Final audit — baseline",
              detail: "Scoring the unguarded draft against the same facts",
              kind: "verification",
            },
            (onDelta) => verifyClaims(stringifyDraft(baseline.output), candidateFacts, { onDelta }),
            ({ result }) => ({
              summary: `${result.fabricatedCount} of ${result.totalClaims} claims unsupported`,
              status: result.fabricatedCount > 0 ? ("warn" as const) : ("ok" as const),
            })
          ),
          narrate(
            "audit",
            "audit-solution",
            {
              label: "Final audit — fact-guarded",
              detail: "Scoring the repaired draft against the same facts",
              kind: "verification",
            },
            (onDelta) => verifyClaims(stringifyDraft(solution.output), candidateFacts, { onDelta }),
            ({ result }) => ({
              summary: `${result.fabricatedCount} of ${result.totalClaims} claims unsupported`,
              status: result.fabricatedCount > 0 ? ("warn" as const) : ("ok" as const),
            })
          ),
        ]);

        send({
          type: "result",
          payload: {
            requirementMatches,
            baseline: {
              resumeSummary: baseline.output.resumeSummary,
              coverLetter: baseline.output.coverLetter,
              claims: baselineVerification.result.claims,
              fabricatedCount: baselineVerification.result.fabricatedCount,
              totalClaims: baselineVerification.result.totalClaims,
            },
            solution: {
              resumeSummary: solution.output.resumeSummary,
              coverLetter: solution.output.coverLetter,
              claims: solutionVerification.result.claims,
              fabricatedCount: solutionVerification.result.fabricatedCount,
              totalClaims: solutionVerification.result.totalClaims,
              iterations: solution.iterations,
            },
          },
        });
      } catch (err: any) {
        console.error(err);
        send({ type: "error", message: err?.message || "Something went wrong." });
      } finally {
        closed = true;
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
