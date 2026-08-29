import { extractStringField, parseLooseJson, stripFences } from "./looseJson";

export interface DraftOutput {
  resumeSummary: string;
  coverLetter: string;
}

export const DRAFT_FORMAT_INSTRUCTIONS = `Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}

Both fields are required and neither may be empty. Write every line break inside a value as the two characters backslash-n — a raw newline inside a JSON string is invalid — and escape any double quote inside a value.`;

function coerceText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map(coerceText).filter(Boolean).join("\n\n");
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map(coerceText)
      .filter(Boolean)
      .join("\n\n");
  }
  return "";
}

function parseHeadingLayout(text: string): Partial<DraftOutput> {
  const heading = (label: string) =>
    new RegExp("(?:^|\\n)\\s*(?:#+\\s*|\\*\\*)?\\s*" + label + "\\s*:?\\s*(?:\\*\\*)?\\s*\\n?", "i");

  const coverMatch = heading("COVER\\s+LETTER").exec(text);
  const summaryMatch = heading("RESUME\\s+SUMMARY").exec(text);
  if (!coverMatch && !summaryMatch) return {};

  const out: Partial<DraftOutput> = {};
  if (summaryMatch) {
    const from = summaryMatch.index + summaryMatch[0].length;
    const to = coverMatch && coverMatch.index > summaryMatch.index ? coverMatch.index : text.length;
    out.resumeSummary = text.slice(from, to).trim();
  }
  if (coverMatch) {
    out.coverLetter = text.slice(coverMatch.index + coverMatch[0].length).trim();
  }
  return out;
}

function splitOnSalutation(text: string): Partial<DraftOutput> {
  const salutation = /(?:^|\n)\s*(?:Dear\b|To whom it may concern\b|Hello\b|Hi\b)/i.exec(text);
  if (!salutation) return {};
  const at = salutation.index;
  return {
    resumeSummary: text.slice(0, at).trim(),
    coverLetter: text.slice(at).trim(),
  };
}

export function parseDraftOutput(text: string): DraftOutput {
  const cleaned = stripFences(text);

  const sources: Array<Partial<DraftOutput>> = [];

  const parsed = parseLooseJson<Record<string, unknown>>(text);
  if (parsed) {
    sources.push({
      resumeSummary: coerceText(parsed.resumeSummary),
      coverLetter: coerceText(parsed.coverLetter),
    });
  }

  sources.push({
    resumeSummary: extractStringField(cleaned, "resumeSummary") ?? undefined,
    coverLetter: extractStringField(cleaned, "coverLetter") ?? undefined,
  });


  if (!/"(?:coverLetter|resumeSummary)"\s*:/i.test(cleaned)) {
    sources.push(parseHeadingLayout(cleaned));
    sources.push(splitOnSalutation(cleaned));
  }

  const pick = (key: keyof DraftOutput) => {
    for (const source of sources) {
      const value = source[key]?.trim();
      if (value) return value;
    }
    return "";
  };

  const resumeSummary = pick("resumeSummary");
  const coverLetter = pick("coverLetter");

  if (resumeSummary && coverLetter) return { resumeSummary, coverLetter };

  console.error(
    `Could not fully recover a draft (summary: ${resumeSummary ? "ok" : "missing"}, cover letter: ${
      coverLetter ? "ok" : "missing"
    }). First 200 chars: ${cleaned.slice(0, 200)}`
  );

  return {
    resumeSummary: resumeSummary || (coverLetter ? "" : cleaned),
    coverLetter,
  };
}

export function stringifyDraft(d: DraftOutput): string {
  return `RESUME SUMMARY:\n${d.resumeSummary}\n\nCOVER LETTER:\n${d.coverLetter}`;
}
