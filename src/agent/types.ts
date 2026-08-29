import type { CandidateFact, EvalCase, JobPosting } from "../lib/types";
import type { LLMCallLog } from "../lib/callLLM";
import type { DraftOutput } from "../lib/draftFormat";
import type { AgentEvent, RunLane } from "../lib/agentEvents";

export interface AgentContext {
  evalCase: EvalCase;
  facts: CandidateFact[];
  jobPosting: JobPosting;
  systemPromptParts: string[];
  notes: Record<string, unknown>;
  trajectory: LLMCallLog[];
  lane: RunLane;
  emit?: (event: AgentEvent) => void;
  stream?: (text: string) => void;
}

export interface AfterDraftResult {
  needsRepair: boolean;
  repairInstructions?: string;
}

export type ImprovementKind =
  | "context"
  | "tool"
  | "memory"
  | "verification"
  | "orchestration"
  | "skill";

export interface Improvement {
  id: string;
  kind: ImprovementKind;
  description: string;
  enabled?: boolean;
  beforeDraft?: (ctx: AgentContext) => Promise<void> | void;
  afterDraft?: (
    ctx: AgentContext,
    draft: DraftOutput
  ) => Promise<AfterDraftResult | void> | AfterDraftResult | void;
}
