import { NextResponse } from "next/server";
import { runBaseline } from "../../../src/baseline/baseline";
import { runSolution } from "../../../src/agent/solve";
import { verifyClaims } from "../../../src/lib/verify";
import { stringifyDraft } from "../../../src/lib/draftFormat";
import { matchRequirements } from "../../../src/lib/matchRequirements";
import type { CandidateFact, EvalCase } from "../../../src/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobTitle, company, jobDescription, facts } = body as {
      jobTitle: string;
      company: string;
      jobDescription: string;
      facts: string[];
    };

    if (!jobTitle || !jobDescription || !facts?.length) {
      return NextResponse.json(
        { error: "Job title, job description, and at least one fact are required." },
        { status: 400 }
      );
    }

    const candidateFacts: CandidateFact[] = facts
      .filter((f) => f.trim().length > 0)
      .map((text, i) => ({ id: `F${i + 1}`, text: text.trim() }));

    const evalCase: EvalCase = {
      id: "live-run",
      difficulty: "medium",
      candidateFacts,
      jobPosting: { title: jobTitle, company: company || "the company", description: jobDescription },
    };

    const requirementMatches = matchRequirements(jobDescription, candidateFacts);

    const [baseline, solution] = await Promise.all([
      runBaseline(evalCase),
      runSolution(evalCase),
    ]);

    const [baselineVerification, solutionVerification] = await Promise.all([
      verifyClaims(stringifyDraft(baseline.output), candidateFacts),
      verifyClaims(stringifyDraft(solution.output), candidateFacts),
    ]);

    return NextResponse.json({
      requirementMatches,
      baseline: {
        resumeSummary: baseline.output.resumeSummary,
        coverLetter: baseline.output.coverLetter,
        claims: baselineVerification.result.claims,
        fabricatedCount: baselineVerification.result.fabricatedCount,
        totalClaims: baselineVerification.result.totalClaims,
      },
      solution: {
        resumeSummary: solution.output.resumeSummary,
        coverLetter: solution.output.coverLetter,
        claims: solutionVerification.result.claims,
        fabricatedCount: solutionVerification.result.fabricatedCount,
        totalClaims: solutionVerification.result.totalClaims,
        iterations: solution.iterations,
      },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Something went wrong." }, { status: 500 });
  }
}
