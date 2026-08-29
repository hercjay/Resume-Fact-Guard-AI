import { callLLM, type LLMCallLog } from "../lib/callLLM";
import type { EvalCase } from "../lib/types";
import { DRAFT_FORMAT_INSTRUCTIONS, parseDraftOutput, stringifyDraft, type DraftOutput } from "../lib/draftFormat";
import { humanizeId, type AgentEvent, type RunLane } from "../lib/agentEvents";
import type { AgentContext, Improvement } from "./types";

const MAX_REPAIRS = 2;

export interface PipelineOptions {
  lane?: RunLane;
  onEvent?: (event: AgentEvent) => void;
}

export async function runAgentPipeline(
  evalCase: EvalCase,
  improvements: Improvement[],
  options: PipelineOptions = {}
): Promise<{ output: DraftOutput; logs: LLMCallLog[]; iterations: number }> {
  const enabled = improvements.filter((i) => i.enabled);

  const lane: RunLane = options.lane ?? (enabled.length ? "solution" : "baseline");
  const emit = options.onEvent;

  let stepCounter = 0;
  const nextStepId = () => `${lane}-${++stepCounter}`;

  async function narrate<T>(
    meta: { label: string; detail?: string; kind?: string; streams?: boolean },
    run: (stepId: string) => Promise<T> | T,
    summarize?: (value: T) => { summary?: string; elapsedMs?: number; tokens?: number; status?: "ok" | "warn" }
  ): Promise<T> {
    const stepId = nextStepId();
    const startedAt = Date.now();
    emit?.({ type: "step-start", lane, stepId, ...meta });

    if (meta.streams) {
      ctx.stream = (text: string) => emit?.({ type: "step-delta", lane, stepId, text });
    }

    try {
      const value = await run(stepId);
      const closing = summarize?.(value) ?? {};
      emit?.({
        type: "step-done",
        lane,
        stepId,
        elapsedMs: Date.now() - startedAt,
        ...closing,
      });
      return value;
    } finally {
      ctx.stream = undefined;
    }
  }

  const ctx: AgentContext = {
    evalCase,
    facts: evalCase.candidateFacts,
    jobPosting: evalCase.jobPosting,
    systemPromptParts: [],
    notes: {},
    trajectory: [],
    lane,
    emit,
  };

  const baseSystemPrompt = "You are a helpful resume writer.";
  const factList = ctx.facts.map((f) => f.text).join("\n- ");
  const userPrompt = `Candidate background:\n- ${factList}\n\nJob posting:\nTitle: ${ctx.jobPosting.title}\nCompany: ${ctx.jobPosting.company}\nDescription: ${ctx.jobPosting.description}\n\nWrite a tailored resume summary and a short cover letter for this candidate applying to this job.\n\n${DRAFT_FORMAT_INSTRUCTIONS}`;

  for (const imp of enabled) {
    if (imp.beforeDraft) {
      await narrate(
        { label: humanizeId(imp.id), detail: imp.description, kind: imp.kind },
        () => imp.beforeDraft!(ctx),
        () => ({ summary: "Applied before drafting" })
      );
    }
  }

  const systemPrompt = [baseSystemPrompt, ...ctx.systemPromptParts].filter(Boolean).join("\n\n");
  const draftRole = enabled.length ? "solution-draft" : "baseline-draft";

  const draftCall = await narrate(
    {
      label: "Writing the first draft",
      detail: enabled.length
        ? "Drafting under every constraint gathered above"
        : "One plain prompt, no constraints and no audit",
      kind: "llm",
      streams: true,
    },
    (stepId) =>
      callLLM(systemPrompt, userPrompt, draftRole, {
        onDelta: emit ? (text) => emit({ type: "step-delta", lane, stepId, text }) : undefined,
        onReset: emit
          ? (reason) => emit({ type: "step-reset", lane, stepId, reason })
          : undefined,
      }),
    (call) => ({ summary: "Draft written", tokens: (call.log as { tokens?: number }).tokens })
  );

  ctx.trajectory.push(draftCall.log);
  let draft: DraftOutput = parseDraftOutput(draftCall.text);

  let iterations = 1;
  const verifiers = enabled.filter((i) => i.afterDraft);
  const cumulativeViolations: string[] = [];

  for (let round = 0; round < MAX_REPAIRS && verifiers.length > 0; round++) {
    let anyNeedsRepair = false;
    const roundInstructions: string[] = [];

    for (const imp of verifiers) {
      const res = await narrate(
        {
          label: `${humanizeId(imp.id)} — pass ${round + 1}`,
          detail: imp.description,
          kind: imp.kind,
          streams: true,
        },
        () => imp.afterDraft!(ctx, draft),
        (value) => {
          const flagged = countFlagged(value?.repairInstructions);
          return value?.needsRepair
            ? {
                summary: flagged
                  ? `${flagged} unsupported claim${flagged === 1 ? "" : "s"} flagged`
                  : "Issues found, repair needed",
                status: "warn" as const,
              }
            : { summary: "Every claim traced to a real fact", status: "ok" as const };
        }
      );

      if (res?.needsRepair) {
        anyNeedsRepair = true;
        if (res.repairInstructions) roundInstructions.push(`[${imp.id}] ${res.repairInstructions}`);
      }
    }

    if (!anyNeedsRepair) break;

    if (ctx.notes.cumulativeRepairMemory) {
      cumulativeViolations.push(...roundInstructions);
    }
    const instructionsToUse = ctx.notes.cumulativeRepairMemory
      ? cumulativeViolations
      : roundInstructions;

    const repairUserPrompt = `Here is your previous draft:\n\n${stringifyDraft(draft)}\n\nIssues found that must be fixed:\n${instructionsToUse.join(
      "\n"
    )}\n\nRewrite it to address every issue above, while staying consistent with all prior constraints and facts.\n\n${DRAFT_FORMAT_INSTRUCTIONS}`;

    const repairCall = await narrate(
      {
        label: `Repair round ${round + 1}`,
        detail: "Rewriting the draft so nothing unsupported survives",
        kind: "orchestration",
        streams: true,
      },
      (stepId) =>
        callLLM(systemPrompt, repairUserPrompt, `repair-round-${round + 1}`, {
          onDelta: emit ? (text) => emit({ type: "step-delta", lane, stepId, text }) : undefined,
          onReset: emit
            ? (reason) => emit({ type: "step-reset", lane, stepId, reason })
            : undefined,
        }),
      (call) => ({ summary: "Draft rewritten", tokens: (call.log as { tokens?: number }).tokens })
    );

    ctx.trajectory.push(repairCall.log);
    draft = parseDraftOutput(repairCall.text);
    iterations++;
  }

  return { output: draft, logs: ctx.trajectory, iterations };
}

function countFlagged(instructions?: string): number {
  if (!instructions) return 0;
  return instructions.split("\n").filter((line) => line.trim().startsWith("- ")).length;
}
