import "dotenv/config";

export interface LLMCallLog {
  role: string;
  systemPrompt: string;
  userPrompt: string;
  rawResponse: string;
  timestampMs: number;
  kind?: "llm" | "tool";
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
}

export interface CallLLMOptions {
  onDelta?: (chunk: string) => void;
  onReset?: (reason: string) => void;
}

const API_KEY = process.env.DEEPSEEK_API_KEY;
const BASE_URL = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

interface StreamedResult {
  text: string;
  tokens: number;
}

async function readStream(
  response: Response,
  onDelta: (chunk: string) => void
): Promise<StreamedResult> {
  const body = response.body;
  if (!body) throw new Error("Streaming response had no body");

  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  let tokens = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      for (const line of frame.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;

        try {
          const parsed = JSON.parse(payload);
          const chunk: string = parsed.choices?.[0]?.delta?.content ?? "";
          if (chunk) {
            text += chunk;
            onDelta(chunk);
          }
          if (parsed.usage?.total_tokens) tokens = parsed.usage.total_tokens;
        } catch (err) {
          console.warn(`[callLLM] Skipped an unparseable stream frame: ${(err as Error).message}`);
        }
      }
    }
  }

  return { text, tokens };
}

export async function callLLM(
  systemPrompt: string,
  userPrompt: string,
  roleLabel: string,
  options: CallLLMOptions = {}
) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

  if (!apiKey) throw new Error("DEEPSEEK_API_KEY is missing");

  const streaming = Boolean(options.onDelta);
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const startTime = Date.now();

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.4,
          ...(streaming ? { stream: true, stream_options: { include_usage: true } } : {})
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      let text: string;
      let tokens: number;

      if (streaming) {
        const streamed = await readStream(response, options.onDelta!);
        text = streamed.text;
        tokens = streamed.tokens;
      } else {
        const data = await response.json();
        text = data.choices?.[0]?.message?.content || "";
        tokens = data.usage?.total_tokens || 0;
      }

      const log = {
        role: roleLabel,
        systemPrompt,
        userPrompt,
        rawResponse: text,
        timestampMs: Date.now(),
        elapsedMs: Date.now() - startTime,
        tokens,
      };

      return { text, log };

    } catch (error: any) {
      attempt++;
      console.warn(`[callLLM] Network error on attempt ${attempt}/${MAX_RETRIES}: ${error.message}`);
      if (attempt >= MAX_RETRIES) {
        console.error(`[callLLM] Failed completely after ${MAX_RETRIES} attempts.`);
        throw error;
      }
      if (streaming) options.onReset?.(`retrying after: ${error.message}`);
      const waitTime = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw new Error("Unreachable");
}
