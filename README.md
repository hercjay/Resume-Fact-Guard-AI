# Resume Fact-Guard AI

**What I didn't expect:** every stage that reduced fabrication also reduced my quality score. See [Hot Take](#main-failure-mode--hot-take) for why that's a real, generalizable tension worth designing for, not a scoring artifact.

**Who has this problem:** Software engineers, designers, and other technical/product professionals tailoring resumes and cover letters to tech-industry roles: people who either burn hours doing it by hand for every posting, or use generic AI tools that quietly invent achievements they never had.

**Scope:** `eval/cases/cases.ts` spans frontend, backend, design, QA, embedded, and data roles within the tech/product domain. `case-11` deliberately tests an obscure skill outside any keyword list, to show graceful degradation rather than false matching.

**The bottleneck:** Generic AI resume tools optimize for "sounds impressive" over "is true"; they fabricate or exaggerate claims, which stays invisible until an interviewer asks about it and the fabrication surfaces. Doing this safely by hand is slow, and doing it with a naive AI prompt is actively risky: our own baseline measurement below shows a plain single-prompt approach fabricates or exaggerates **62.6% of claims**.

**What this does:** Given a candidate's real, ground-truth facts and a job posting, produces a tailored resume summary + cover letter that's verified before you see it. Every claim is itemized and checked against the fact list, unsupported claims are caught and rewritten out automatically, and you can see exactly what changed vs. a plain single-prompt baseline.

## Where to find each rubric criterion in this repo

| Criterion | Where to look |
|---|---|
| **Problem & User Value** | The paragraph above, plus [Try it live](#try-it-live). |
| **Agent Solution & Engineering** | [How it works](#how-it-works) below: every improvement I tested, with the real evidence for keeping or removing each one. |
| **End to End Quality** | Run `npm run dev`: a real, fully responsive UI renders structured, itemized fact-checked output, not a JSON dump or a raw text blob. |
| **Measured Improvement** | [Improvement Changelog](#improvement-changelog) and [Measured Improvement](#measured-improvement) below, backed by the committed per-stage runs in `eval/results/baseline-only/baseline.json` and `eval/results/<stage>/solution.json`. |
| **Reproducibility** | [REPRODUCE.md](./REPRODUCE.md): clean-environment walkthrough, exact commands, versions. |
| **Hot Take / Insights** | [Main failure mode & hot take](#main-failure-mode--hot-take) below. |

## How it works

This isn't one big prompt. It's a small pipeline (`src/agent/pipeline.ts`) that runs a candidate's facts and a job posting through zero or more **improvements**: standalone files in `src/agent/improvements/`, toggled from one place; `src/agent/improvements/index.ts`. I tested four of them against real evidence; two earned a permanent place in the shipped pipeline, the other two were removed.

| Improvement | Lever | What it does | Status |
|---|---|---|---|
| `requirement-matcher-tool` | tool | Deterministic keyword scan of the job posting vs. candidate facts, run before drafting | **Removed**: a naive `.includes()` match falsely flagged negated facts (e.g. "no experience with Kubernetes") as a positive skill match, forcing the model to hallucinate to comply. See Stage 1 below. |
| `fact-constraint-context` | context | Hard system-prompt rule: only state given facts, be honest about gaps | **Kept**: cut fabrication from 57.5% to 44.2% on its own. |
| `fact-guard-verification` | verification | Post-draft LLM pass checking every claim against ground truth; triggers a repair round | **Kept**: the single largest driver in this project: 44.2% → 8.3% fabrication. |
| `cumulative-repair-memory` | memory | Carries every violation across all repair rounds forward, not just the latest | **Removed**: fabrication barely moved (8.3% → 8.2%) while quality score measurably dropped (3.25 → 2.92). |

**The shipped pipeline is deliberately lean: context + verification, nothing else.** I built and tried a tool and a memory mechanism too, and the evidence said no on both; that's reflected in the code (`enabled: false`) as well as in this table, not just in prose.

**The output is structured, not a text blob.** The model returns JSON (`{resumeSummary, coverLetter}`), which is what lets the UI render distinct, legible sections and an itemized, source-cited fact-check list.

## Improvement Changelog

| Stage | What I tried and why | Evidence (primary metric) | Decision / Learning |
|---|---|---|---|
| **Baseline** | Basic single-shot prompt, zero tools, zero verification. | **62.6% fabrication** (117/187 claims - Quality: 4.17/5 - Time: 58.6s/case) | Established the starting point. Fabrication was worst on outlier cases (74.0%), vague/adversarial inputs are where an unguarded model improvises most. |
| **Stage 1: `requirement-matcher-tool`** | Added a deterministic keyword-match tool to ground the prompt in explicit skill gaps before drafting. | **57.5% fabrication** (104/181 claims - Quality: 4.17/5 - Time: 47.8s/case) | **Removed.** The tool used substring matching (`.includes()`), so a fact stating *"no experience with Kubernetes"* still contained the word "Kubernetes" and got flagged as a **match**, not a gap. On `case-05-hard-skill-gap`, this fed the model a false positive and directly encouraged the hallucination the whole pipeline exists to prevent. A deterministic tool is not automatically a safe tool; negation-blindness is a real failure mode, not a hypothetical one. |
| **Stage 2: `fact-constraint-context`** | Replaced the tool with an explicit hard-constraint rule in the system prompt: only state given facts, admit gaps honestly. | **44.2% fabrication** (73/165 claims - Quality: 4.25/5 - Time: 41.0s/case) | **Kept.** Prompt-level instruction works, partially. It still wasn't enough on genuinely hard cases: `case-06-hard-seniority-mismatch` (a 1-year-experience candidate against an 8+ year requirement) kept getting inflated seniority language even with the rule in place. Instruction alone can't guarantee compliance; something needs to check the output, not just constrain the input. |
| **Stage 3: `+ fact-guard-verification`** | Added the post-draft verification + repair loop: a separate LLM pass audits every claim, flags anything unsupported, and triggers up to 2 repair rounds. | **8.3% fabrication**: down from 44.2%, the single largest jump in the whole project. Easy and medium tiers hit **0%**. Hard tier: 14.3%. Outlier tier: 10.9%. Time rose to 102.9s/case (2.5 repair rounds/case on average) and quality dropped to 3.25/5. | **Kept.** This is what actually closes the gap that context alone couldn't; an active auditor checking the output beats an instruction hoping for compliance. The cost is real and worth stating plainly: ~1.8x the latency of Stage 2, and a genuine quality-score dip (see Hot Take). |
| **Stage 4: `+ cumulative-repair-memory`** | Tested whether carrying every prior round's violations forward (not just the current round's) reduces repeat mistakes across repair rounds. | **8.2% fabrication**: a 0.1-point change, within noise. Quality dropped further, to 2.92/5. Avg repair iterations actually fell slightly (2.50 → 2.42). | **Removed.** No measurable fabrication benefit, and a real quality cost from the extra accumulated context in the repair prompt. With `MAX_REPAIRS = 2`, there's only one point where "carrying forward" could matter at all; the data says it isn't earning its cost at that scale. |
| **Final (shipped)** | `fact-constraint-context` + `fact-guard-verification` only. | **8.3% fabrication**, down from 62.6% baseline, a **54.3-point reduction**. | The verification/repair loop (Stage 3) is the main contribution by a wide margin: an 18-point context-only improvement became a 54-point improvement once the output was actually audited, not just instructed. |

## Measured Improvement

| Metric | Baseline | Final (context + verification) | Change |
|---|---|---|---|
| Fabrication rate (all cases) | 62.6% | 8.3% | **54.3pt reduction** |
| Fabrication rate: hard tier | 57.9% | 14.3% | 43.6pt reduction |
| Fabrication rate: outlier tier | 74.0% | 10.9% | 63.1pt reduction |
| Quality score (1-5, independent LLM judge) | 4.17 | 3.25 | **−0.92 : a real trade-off, not hidden. See Hot Take.** |
| Avg time per case | 58.6s | 102.9s | 1.76x |
| Avg tokens per case | 8,329 | not reliably captured | See note below |

**Note on token data:** token totals read `0` in this table for every stage after the baseline run, a bug in our own logging (not capturing `usage` from the API response), confirmed by checking DeepSeek's billing dashboard directly: real tokens were spent and billed correctly the entire time, our code just failed to record them for most calls. The whole day's experimentation (baseline plus all 4 tested stages) totaled **$0.45 USD for 797,063 tokens across 316 API requests** per the provider's own dashboard (see `agent-trajectories/deepseek-cost-full-day-total.png`), a blended rate of ~$0.57/million tokens. See [REPRODUCE.md](./REPRODUCE.md) for the full breakdown. Time-per-case remains the more granular per-stage cost proxy in the table above.

**The outlier-vs-hard crossover is worth calling out.** Baseline treated outlier cases far worse than hard cases (74.0% vs 57.9%), which is what you'd expect; deliberately vague or adversarial inputs give an unguarded model the most room to improvise. But after verification was added, that ordering flipped: outliers ended up *better* than hard cases (10.9% vs 14.3%), and checking the individual cases in `eval/results/fact-constraint-context+fact-guard-verification/solution.json` confirms this isn't one easy outlier dragging the average: **3 of 6 outlier cases** (`case-08-outlier-keyword-aliases`, `case-11-outlier-obscure-skill`, `case-12-outlier-ambiguous-transferable-skill`) hit **exactly 0% fabrication**, while **neither** hard case did (`case-05-hard-skill-gap` still sat at 22.2%, `case-06-hard-seniority-mismatch` at 8.3%, even after up to 3 repair rounds each). The verification loop appears to fully solve certain failure types — ambiguous or vague-signal cases — while only partially closing the gap on cases with a genuine, structural mismatch between the candidate and the role. That's a real, unexpected finding, not the result we assumed going in.

## The hard/outlier cases

`eval/cases/cases.ts` has 12 synthetic cases, tagged `easy` / `medium` / `hard` / `outlier`. Two are directly referenced above with real before/after evidence:
- **`case-05-hard-skill-gap`** (the candidate explicitly lacks Kubernetes experience); the case that exposed Stage 1's negation-blindness bug.
- **`case-06-hard-seniority-mismatch`** (1 year of experience vs. an 8+ year requirement); the case that showed context-only constraints (Stage 2) weren't sufficient on their own.

## Main failure mode & hot take

**Main failure mode:** a deterministic, non-LLM tool was not automatically the "safe" component I assumed it would be. `requirement-matcher-tool`'s substring match treated the presence of a skill's name as evidence of the skill, even inside an explicit negation ("no experience with X"). It actively fed the model a false positive rather than protecting it from one. The lesson: when a tool's output becomes context for a generative step, the tool's own correctness matters as much as the model's. A bug in "safe" scaffolding can cause the exact failure it was built to prevent.

**Hot take:** truthfulness and perceived quality pulled in opposite directions in this project, and it held on every stage that reduced fabrication, not a one-off. Every stage that cut fabrication (Stages 2, 3) also cut the independent quality score (4.17 → 4.25 → 3.25). The most likely mechanism: a model forced to hedge, qualify, or admit a gap instead of confidently asserting a strong-sounding claim reads as *less polished* to a quality judge, even though it's *more honest*. A second, harder-to-rule-out possibility: the quality judge itself may just reward confident phrasing regardless of truth content, in which case the "cost" isn't real, it's the metric being gameable in the same direction our fabrication problem was. We can't fully separate these two explanations with the data we collected, but either way the implication is the same: a single score can be optimized against, honestly or not. Tracking fabrication rate alone would have made Stage 3 look like a pure win; tracking quality score alone would have made it look like a regression. Reliable agents may need both metrics deliberately kept in tension; and, next iteration, a quality judge specifically instructed to reward honesty signals rather than penalize them, to test which explanation is actually correct.

**A known, deliberate tradeoff:** the fact-guard sometimes flags forward-looking statements of fit (e.g. "I can apply my React and Tailwind experience to your onboarding flows") as unsupported, even though they only synthesize already-verified facts rather than introduce new ones. This is intentional, not a bug — reliably distinguishing "safe synthesis of verified facts" from "an unstated skill smuggled in via future tense" would require the verifier to reason more deeply about its own prior extractions, and getting that distinction wrong in the permissive direction would reopen exactly the failure mode this tool exists to close. We chose to stay conservative rather than risk a loophole.

## A note on how this was built

Built end-to-end using AI coding agents (Gemini and Claude, via Cline in VS Code) as a pair-programmer, with occasional manual code edits of my own. I directed the architecture, designed every improvement and every evaluation case, ran every experiment against the real API, and made every kept/removed decision from the resulting datal; the agent implemented the code for each stage under that direction. The engineering judgment: what to try, why, what the evidence said, what to keep, is my own work during the event; the code that carries it out was written collaboratively with the agents, one stage at a time.

## Try it live

`npm run dev` runs a fully responsive Next.js UI where you can paste a job posting and your real facts and see the baseline and fact-guarded solution side by side, each claim individually marked as verified or unsupported and traced back to its source fact. This uses the final shipped configuration (`fact-constraint-context` + `fact-guard-verification`). On mobile, the two results are reachable via a tab toggle rather than being crammed side by side.

## Setup & reproduction

See [REPRODUCE.md](./REPRODUCE.md): `npm run baseline` once, then `npm run solve` per stage. (`npm run eval` runs both lanes together and additionally writes a `comparison.json` for the active stage; the results committed here came from the separate `baseline` and `solve` runs, so no `comparison.json` is checked in.)

## Data

All candidate facts and job postings in `eval/cases/cases.ts` are synthetic, written for this project; no real people's data.