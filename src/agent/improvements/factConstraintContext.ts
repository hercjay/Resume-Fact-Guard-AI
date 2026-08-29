import type { Improvement } from "../types";


export const factConstraintContext: Improvement = {
  id: "fact-constraint-context",
  kind: "context",
  description:
    "Adds a hard system-prompt rule: only state facts explicitly given, never invent or exaggerate beyond them, and be honest about gaps instead of fabricating coverage.",
  beforeDraft(ctx) {
    const rule =
      "HARD CONSTRAINT: You may ONLY state facts that appear in the candidate background given by the user. Never invent, exaggerate, or infer achievements, skills, or experience beyond what is explicitly stated. If the candidate lacks something the job asks for, say so honestly and frame their closest real, relevant experience instead — do not fabricate coverage.";

    ctx.systemPromptParts.push(rule);

    ctx.trajectory.push({
      role: "context-fact-constraint",
      systemPrompt: "(context injection — no LLM call)",
      userPrompt: "(none)",
      rawResponse: `Added to system prompt: "${rule}"`,
      timestampMs: Date.now(),
      kind: "tool",
    });
  },
};
