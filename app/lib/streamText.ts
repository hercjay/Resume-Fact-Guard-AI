
function readJsonStringFrom(raw: string, start: number): string {
  let out = "";
  for (let i = start; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === "\\") {
      const next = raw[i + 1];
      if (next === undefined) break;
      out += next === "n" ? "\n" : next === "t" ? "\t" : next === "r" ? "" : next;
      i++;
      continue;
    }
    if (ch === '"') break;
    out += ch;
  }
  return out;
}

function pluckKey(raw: string, key: string): string | null {
  const marker = new RegExp(`"${key}"\s*:\s*"`).exec(raw);
  if (!marker || marker.index === undefined) return null;
  return readJsonStringFrom(raw, marker.index + marker[0].length);
}

function pluckClaims(raw: string): string[] {
  const claims: string[] = [];
  const pattern = /"text"\s*:\s*"/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(raw)) !== null) {
    claims.push(readJsonStringFrom(raw, match.index + match[0].length));
  }
  return claims;
}

export interface ReadableStreamView {
  text: string;
  raw: boolean;
}

export function toReadable(raw: string): ReadableStreamView {
  if (!raw) return { text: "", raw: false };

  if (raw.includes('"claims"')) {
    const claims = pluckClaims(raw);
    if (claims.length) return { text: claims.map((c) => `• ${c}`).join("\n"), raw: false };
    return { text: "Reading the draft, pulling out every concrete claim…", raw: false };
  }

  const summary = pluckKey(raw, "resumeSummary");
  const letter = pluckKey(raw, "coverLetter");
  if (summary !== null || letter !== null) {
    const parts: string[] = [];
    if (summary) parts.push(summary);
    if (letter) parts.push(letter);
    if (parts.length) return { text: parts.join("\n\n"), raw: false };
  }

  return { text: raw, raw: true };
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}
