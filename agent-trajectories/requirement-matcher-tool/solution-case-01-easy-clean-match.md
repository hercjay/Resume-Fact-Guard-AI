# Trajectory: solution — case-01-easy-clean-match

Stage: requirement-matcher-tool

## Summary
Case: case-01-easy-clean-match (easy)
Fabricated claims: 3/10
Quality score: 4/5 (Clear, specific, and natural tone; a real person could send it as-is, though minor phrasing tweaks might make it slightly more polished.)
Repair iterations: 1
Tokens: 0 | Time: 79577ms

## Raw steps

### Step 1 — tool-requirement-matcher (tool/context/memory — no LLM call)

**System prompt:**

```
(deterministic tool call — no LLM involved)
```

**User prompt:**

```
{
  "jobDescription": "We're looking for a senior frontend engineer with strong React/TypeScript skills, experience improving performance at scale, and a track record of mentoring.",
  "facts": [
    {
      "id": "F1",
      "text": "3 years as a frontend engineer using React and TypeScript at a Series A fintech startup"
    },
    {
      "id": "F2",
      "text": "Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s"
    },
    {
      "id": "F3",
      "text": "Mentored 2 junior engineers over 18 months"
    }
  ]
}
```

**Response:**

```
MATCH: "React" — covered by fact F1
MATCH: "TypeScript" — covered by fact F1
GAP: "mentoring" — NOT covered by any candidate fact. Do not claim this skill; if relevant, honestly note the closest real experience instead.
GAP: "performance" — NOT covered by any candidate fact. Do not claim this skill; if relevant, honestly note the closest real experience instead.
```


### Step 2 — solution-draft (LLM call)

**System prompt:**

```
You are a helpful resume writer.

AUTOMATED REQUIREMENT-MATCH REPORT (from a deterministic tool, already checked against the facts — trust its GAP findings, do not contradict them):
MATCH: "React" — covered by fact F1
MATCH: "TypeScript" — covered by fact F1
GAP: "mentoring" — NOT covered by any candidate fact. Do not claim this skill; if relevant, honestly note the closest real experience instead.
GAP: "performance" — NOT covered by any candidate fact. Do not claim this skill; if relevant, honestly note the closest real experience instead.
```

**User prompt:**

```
Candidate background:
- 3 years as a frontend engineer using React and TypeScript at a Series A fintech startup
- Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s
- Mentored 2 junior engineers over 18 months

Job posting:
Title: Senior Frontend Engineer
Company: Nimbus Retail
Description: We're looking for a senior frontend engineer with strong React/TypeScript skills, experience improving performance at scale, and a track record of mentoring.

Write a tailored resume summary and a short cover letter for this candidate applying to this job.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s. Spent 18 months working closely with two junior engineers to help them grow. Excited to bring this hands-on product and technical experience to the Senior Frontend Engineer role at Nimbus Retail.", "coverLetter": "Dear Hiring Manager, I'm excited to apply for the Senior Frontend Engineer position at Nimbus Retail. With three years of React and TypeScript experience at a Series A fintech startup, I'm comfortable owning complex, user-facing frontend work. One project I'm proud of is rebuilding our checkout flow, which cut page load time from 4.2s to 1.1s and made a meaningful difference for users. I've also spent the past 18 months working closely with two junior engineers, helping them level up their skills and confidence. I'd love to bring that combination of technical ownership and team support to Nimbus Retail. Thank you for your consideration."}
```


### Step 3 — fact-guard-verify (LLM call)

**System prompt:**

```
You are a strict fact-checking auditor. You will be given a candidate's ground-truth facts and a generated resume/cover letter. Extract every concrete factual claim about the candidate's experience, skills, or achievements from the text. For each claim, decide if it is directly supported by one of the ground-truth facts, or if it is fabricated/unsupported/exaggerated beyond the facts given.

Respond ONLY with valid JSON, no markdown fences, no prose, in this exact shape:
{"claims":[{"text":"<claim as it appears>","supportedByFactId":"<fact id or null>"}]}
```

**User prompt:**

```
GROUND-TRUTH FACTS:
F1: 3 years as a frontend engineer using React and TypeScript at a Series A fintech startup
F2: Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s
F3: Mentored 2 junior engineers over 18 months

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s. Spent 18 months working closely with two junior engineers to help them grow. Excited to bring this hands-on product and technical experience to the Senior Frontend Engineer role at Nimbus Retail.

COVER LETTER:
Dear Hiring Manager, I'm excited to apply for the Senior Frontend Engineer position at Nimbus Retail. With three years of React and TypeScript experience at a Series A fintech startup, I'm comfortable owning complex, user-facing frontend work. One project I'm proud of is rebuilding our checkout flow, which cut page load time from 4.2s to 1.1s and made a meaningful difference for users. I've also spent the past 18 months working closely with two junior engineers, helping them level up their skills and confidence. I'd love to bring that combination of technical ownership and team support to Nimbus Retail. Thank you for your consideration.
```

**Response:**

```
{"claims":[{"text":"Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup.","supportedByFactId":"F1"},{"text":"Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s.","supportedByFactId":"F2"},{"text":"Spent 18 months working closely with two junior engineers to help them grow.","supportedByFactId":"F3"},{"text":"With three years of React and TypeScript experience at a Series A fintech startup","supportedByFactId":"F1"},{"text":"I'm comfortable owning complex, user-facing frontend work.","supportedByFactId":null},{"text":"rebuilding our checkout flow","supportedByFactId":"F2"},{"text":"cut page load time from 4.2s to 1.1s","supportedByFactId":"F2"},{"text":"made a meaningful difference for users","supportedByFactId":null},{"text":"spent the past 18 months working closely with two junior engineers","supportedByFactId":"F3"},{"text":"helping them level up their skills and confidence","supportedByFactId":null}]}
```


### Step 4 — quality-score (LLM call)

**System prompt:**

```
Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}
```

**User prompt:**

```
RESUME SUMMARY:
Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s. Spent 18 months working closely with two junior engineers to help them grow. Excited to bring this hands-on product and technical experience to the Senior Frontend Engineer role at Nimbus Retail.

COVER LETTER:
Dear Hiring Manager, I'm excited to apply for the Senior Frontend Engineer position at Nimbus Retail. With three years of React and TypeScript experience at a Series A fintech startup, I'm comfortable owning complex, user-facing frontend work. One project I'm proud of is rebuilding our checkout flow, which cut page load time from 4.2s to 1.1s and made a meaningful difference for users. I've also spent the past 18 months working closely with two junior engineers, helping them level up their skills and confidence. I'd love to bring that combination of technical ownership and team support to Nimbus Retail. Thank you for your consideration.
```

**Response:**

```
{"score": 4, "notes": "Clear, specific, and natural tone; a real person could send it as-is, though minor phrasing tweaks might make it slightly more polished."}
```
