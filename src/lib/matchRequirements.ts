import type { CandidateFact } from "./types";

export interface RequirementMatch {
  requirement: string;
  matched: boolean;
  matchingFactId: string | null;
}



const SKILL_KEYWORDS = [
  "React", "TypeScript", "JavaScript", "Node.js", "Node", "PostgreSQL", "SQL",
  "GraphQL", "Kubernetes", "Docker", "Figma", "design system", "design systems",
  "user research", "mentoring", "mentored", "performance", "microservices",
  "REST", "API", "Python", "AWS", "CI/CD", "testing", "accessibility",
];


export function matchRequirements(
  jobDescription: string,
  facts: CandidateFact[]
): RequirementMatch[] {
  const jdLower = jobDescription.toLowerCase();
  const factsLower = facts.map((f) => f.text).join(" | ").toLowerCase();

  const found = SKILL_KEYWORDS.filter((kw) => jdLower.includes(kw.toLowerCase()));


  const seen = new Set<string>();
  const deduped = found.filter((kw) => {
    const key = kw.toLowerCase().replace(/\.js$/, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped.map((requirement) => {
    const matched = factsLower.includes(requirement.toLowerCase());
    const matchingFactId = matched
      ? facts.find((f) => f.text.toLowerCase().includes(requirement.toLowerCase()))?.id ?? null
      : null;
    return { requirement, matched, matchingFactId };
  });
}


export function formatRequirementMatches(matches: RequirementMatch[]): string {
  if (matches.length === 0) return "No specific tracked skill keywords detected in this posting.";
  const lines = matches.map((m) =>
    m.matched
      ? `MATCH: "${m.requirement}" — covered by fact ${m.matchingFactId}`
      : `GAP: "${m.requirement}" — NOT covered by any candidate fact. Do not claim this skill; if relevant, honestly note the closest real experience instead.`
  );
  return lines.join("\n");
}
