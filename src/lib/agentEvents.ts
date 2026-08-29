import type { Claim } from "./types";

export type RunLane = "baseline" | "solution" | "audit";

export interface StepMeta {
  lane: RunLane;
  stepId: string;
}

export type AgentEvent =
  | { type: "run-start"; totalStepsHint: number; startedAt: number }
  | (StepMeta & {
      type: "step-start";
      label: string;
      detail?: string;
      kind?: string;
      streams?: boolean;
    })
  | (StepMeta & { type: "step-delta"; text: string })
  | (StepMeta & { type: "step-reset"; reason: string })
  | (StepMeta & {
      type: "step-done";
      summary?: string;
      elapsedMs?: number;
      tokens?: number;
      status?: "ok" | "warn";
    })
  | { type: "result"; payload: GenerateResponse }
  | { type: "error"; message: string };

export interface RequirementMatch {
  requirement: string;
  matched: boolean;
  matchingFactId: string | null;
}

export interface DocumentResult {
  resumeSummary: string;
  coverLetter: string;
  claims: Claim[];
  fabricatedCount: number;
  totalClaims: number;
  iterations?: number;
}

export interface GenerateResponse {
  requirementMatches: RequirementMatch[];
  baseline: DocumentResult;
  solution: DocumentResult;
}

/** Humanises an improvement id like `fact-guard-verification` into `Fact guard verification`. */
export function humanizeId(id: string): string {
  const spaced = id.replace(/[-_]/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
