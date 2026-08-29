import type { Improvement } from "../types";


export const cumulativeRepairMemory: Improvement = {
  id: "cumulative-repair-memory",
  kind: "memory",
  description:
    "Carries every violation flagged across ALL repair rounds forward into each new repair prompt, instead of only the most recent round.",
  beforeDraft(ctx) {
    ctx.notes.cumulativeRepairMemory = true;
    ctx.trajectory.push({
      role: "memory-cumulative-repair",
      systemPrompt: "(memory flag set — no LLM call)",
      userPrompt: "(none)",
      rawResponse:
        "Repair loop will carry forward all prior-round violations into every subsequent repair prompt, not just the latest round.",
      timestampMs: Date.now(),
      kind: "tool",
    });
  },
};
