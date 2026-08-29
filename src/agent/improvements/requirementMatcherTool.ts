import type { Improvement } from "../types";
import { matchRequirements, formatRequirementMatches } from "../../lib/matchRequirements";


export const requirementMatcherTool: Improvement = {
  id: "requirement-matcher-tool",
  kind: "tool",
  description:
    "Deterministic keyword scan of the job posting cross-checked against candidate facts, run before drafting, to surface explicit match/gap signals.",
  beforeDraft(ctx) {
    const matches = matchRequirements(ctx.jobPosting.description, ctx.facts);
    const report = formatRequirementMatches(matches);

    ctx.trajectory.push({
      role: "tool-requirement-matcher",
      systemPrompt: "(deterministic tool call — no LLM involved)",
      userPrompt: JSON.stringify(
        { jobDescription: ctx.jobPosting.description, facts: ctx.facts },
        null,
        2
      ),
      rawResponse: report,
      timestampMs: Date.now(),
      kind: "tool",
    });

    ctx.systemPromptParts.push(
      `AUTOMATED REQUIREMENT-MATCH REPORT (from a deterministic tool, already checked against the facts — trust its GAP findings, do not contradict them):\n${report}`
    );
  },
};
