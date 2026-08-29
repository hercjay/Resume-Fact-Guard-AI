
export function stripFences(text: string): string {
  let s = text.replace(/^﻿/, "").trim();

  const fenced = s.match(/(?:```|~~~)[ \t]*[A-Za-z0-9_-]*[ \t]*\r?\n([\s\S]*?)(?:```|~~~|$)/);
  if (fenced) s = fenced[1];

  return s.replace(/(?:```|~~~)[ \t]*[A-Za-z0-9_-]*/g, "").trim();
}

function escapeControlChars(s: string): string {
  let out = "";
  let inString = false;
  let escaped = false;

  for (const ch of s) {
    if (escaped) {
      out += ch;
      escaped = false;
      continue;
    }
    if (ch === "\\") {
      out += ch;
      escaped = inString;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      out += ch;
      continue;
    }
    if (inString && ch < " ") {
      if (ch === "\n") out += "\\n";
      else if (ch === "\r") out += "\\r";
      else if (ch === "\t") out += "\\t";
      else out += "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0");
      continue;
    }
    out += ch;
  }

  return out;
}

function sliceBalancedObject(s: string): string | null {
  const open = s.indexOf("{");
  if (open === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = open; i < s.length; i++) {
    const ch = s[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === "\\") {
      escaped = inString;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}" && --depth === 0) return s.slice(open, i + 1);
  }

  return s.slice(open);
}

function repairs(candidate: string): string[] {
  const escaped = escapeControlChars(candidate);
  const noTrailingCommas = escaped.replace(/,(\s*[}\]])/g, "$1");
  return [
    candidate,
    escaped,
    noTrailingCommas,
    noTrailingCommas + '"}',
    noTrailingCommas + "}",
  ];
}


export function parseLooseJson<T = Record<string, unknown>>(text: string): T | null {
  const cleaned = stripFences(text);
  const candidates = [cleaned];

  const balanced = sliceBalancedObject(cleaned);
  if (balanced && balanced !== cleaned) candidates.push(balanced);

  const open = cleaned.indexOf("{");
  const close = cleaned.lastIndexOf("}");
  if (open !== -1 && close > open) candidates.push(cleaned.slice(open, close + 1));

  for (const candidate of candidates) {
    for (const attempt of repairs(candidate)) {
      try {
        const parsed = JSON.parse(attempt);
        if (typeof parsed === "string") {
          const inner = parseLooseJson<T>(parsed);
          if (inner) return inner;
          continue;
        }
        if (parsed && typeof parsed === "object") return parsed as T;
      } catch {
       
      }
    }
  }

  return null;
}

function unescapeJsonString(body: string): string {
  try {
    return JSON.parse(escapeControlChars('"' + body + '"'));
  } catch {
    return body
      .replace(/\\r\\n|\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
}


export function extractStringField(text: string, key: string): string | null {
  const start = new RegExp('"' + key + '"\\s*:\\s*"', "i").exec(text);
  if (!start) return null;

  let i = start.index + start[0].length;
  let body = "";

  while (i < text.length) {
    const ch = text[i];

    if (ch === "\\") {
      const next = text[i + 1];
      if (next === undefined) break;
      body += ch + next;
      i += 2;
      continue;
    }

    if (ch === '"') {
      if (/^\s*(?:,\s*"|[}\]]|$)/.test(text.slice(i + 1))) break;
      body += '\\"';
      i++;
      continue;
    }

    body += ch;
    i++;
  }

  const value = unescapeJsonString(body).trim();
  return value.length > 0 ? value : null;
}
