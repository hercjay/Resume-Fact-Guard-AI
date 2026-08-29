import { callLLM, type CallLLMOptions, type LLMCallLog } from "./callLLM";
import { parseLooseJson } from "./looseJson";
import type { CandidateFact, VerificationResult, Claim } from "./types";


const BOILERPLATE_PATTERNS: RegExp[] = [
  /^dear\b/i,
  /^to whom it may concern\b/i,
  /^(warm(est)?|best|kind)\s+(regards|wishes)\b/i,
  /^(sincerely|regards|best|cheers|respectfully)\b/i,
  /^yours\s+(sincerely|truly|faithfully)\b/i,
  /^thank you\b/i,
  /^i (look forward|would welcome|welcome) (to|the)\b/i,
  /^(i am|i'm) (writing|excited|eager|thrilled|keen) to (apply|express|submit)\b/i,
  /^please (find|feel free|do not hesitate|don't hesitate)\b/i,
  /^(attached|enclosed) (is|please find)\b/i,
  /^resume summary:?$/i,
  /^cover letter:?$/i,
];

export function isBoilerplateClaim(text: string): boolean {
  const trimmed = (text ?? "").trim().replace(/^[-*\u2022]\s*/, "");
  if (trimmed.length === 0) return true;
  if (trimmed.split(/\s+/).length < 3) return true;
  return BOILERPLATE_PATTERNS.some((p) => p.test(trimmed));
}

export async function verifyClaims(
  generatedText: string,
  facts: CandidateFact[],
  options: CallLLMOptions = {}
): Promise<{ result: VerificationResult; log: LLMCallLog }> {
  const factList = facts.map((f) => `${f.id}: ${f.text}`).join("\n");

  const systemPrompt = `You are a strict fact-checking auditor. You will be given a candidate's ground-truth facts and a generated resume/cover letter. Extract every concrete factual claim about the candidate's experience, skills, or achievements from the text. For each claim, decide if it is directly supported by one of the ground-truth facts, or if it is fabricated/unsupported/exaggerated beyond the facts given.

Do not extract greetings, sign-offs, or generic closing phrases as claims — only extract concrete factual assertions about the candidate's experience, skills, or achievements. Specifically, never extract: salutations ("Dear Hiring Team,", "To whom it may concern"), sign-offs ("Sincerely,", "Best regards,", the candidate's name), pleasantries ("Thank you for your time", "I look forward to hearing from you", "Please find my resume attached"), section headings, generic statements of interest or enthusiasm that assert no fact ("I am excited to apply for this role"), and statements about the company or the job posting rather than the candidate. If a sentence would still be true of any applicant, it is not a claim.

Respond ONLY with valid JSON, no markdown fences, no prose, in this exact shape:
{"claims":[{"text":"<claim as it appears>","supportedByFactId":"<fact id or null>"}]}`;

  const userPrompt = `GROUND-TRUTH FACTS:\n${factList}\n\nGENERATED TEXT TO AUDIT:\n${generatedText}`;

  const { text, log } = await callLLM(systemPrompt, userPrompt, "fact-guard-verify", options);

  const parsed = parseLooseJson<{ claims?: Claim[] }>(text);
  if (!parsed) {
    console.error(
      `Failed to parse verifier output, treating as 0 claims found. First 200 chars: ${text.slice(0, 200)}`
    );
  }


  const factIds = new Set(facts.map((f) => f.id.toLowerCase()));
  const claims: Claim[] = (parsed?.claims ?? [])
    .filter((c) => c && typeof c.text === "string" && !isBoilerplateClaim(c.text))
    .map((c) => ({
      ...c,
      text: c.text.trim(),
      supportedByFactId:
        typeof c.supportedByFactId === "string" && factIds.has(c.supportedByFactId.trim().toLowerCase())
          ? c.supportedByFactId.trim()
          : null,
    }));

  const fabricatedCount = claims.filter((c) => !c.supportedByFactId).length;

  const result: VerificationResult = {
    claims,
    fabricatedCount,
    totalClaims: claims.length,
  };

  return { result, log };
}
