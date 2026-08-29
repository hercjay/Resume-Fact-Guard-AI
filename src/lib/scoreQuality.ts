import { callLLM, type LLMCallLog } from "./callLLM.js";
import { parseLooseJson } from "./looseJson";

export interface QualityScore {
  score: number;
  notes: string;
}

export async function scoreQuality(
  text: string
): Promise<{ result: QualityScore; log: LLMCallLog }> {
  const systemPrompt =
    'Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}';

  const { text: response, log } = await callLLM(systemPrompt, text, "quality-score");

  let result: QualityScore = { score: 0, notes: "parse failed" };
  const parsed = parseLooseJson<{ score?: unknown; notes?: unknown }>(response);
  const score = typeof parsed?.score === "string" ? Number(parsed.score) : parsed?.score;

  if (typeof score === "number" && Number.isFinite(score)) {
    result = { score, notes: typeof parsed?.notes === "string" ? parsed.notes : "" };
  } else {
    console.error(`Failed to parse quality score. First 200 chars: ${response.slice(0, 200)}`);
  }

  return { result, log };
}
