export interface CandidateFact {
  id: string;
  text: string;
}

export interface JobPosting {
  title: string;
  company: string;
  description: string;
}

export interface EvalCase {
  id: string;
  candidateFacts: CandidateFact[];
  jobPosting: JobPosting;
  difficulty: "easy" | "medium" | "hard" | "outlier";
  isHardCase?: boolean;
  hardCaseNote?: string;
}

export interface Claim {
  text: string;
  supportedByFactId: string | null;
}

export interface VerificationResult {
  claims: Claim[];
  fabricatedCount: number;
  totalClaims: number;
}

export interface RunResult {
  caseId: string;
  finalOutput: string;
  verification: VerificationResult;
  iterations: number;
  totalTokens: number;
  elapsedMs: number;
  qualityScore: number;
}
