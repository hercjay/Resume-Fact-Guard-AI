# Trajectory: solution — case-01-easy-clean-match

Stage: fact-constraint-context+fact-guard-verification+cumulative-repair-memory

## Summary
Case: case-01-easy-clean-match (easy)
Fabricated claims: 0/6
Quality score: 4/5 (Professional and clear, but the cover letter largely repeats the resume summary and could use a more personalized touch.)
Repair iterations: 2
Tokens: 0 | Time: 183313ms

## Raw steps

### Step 1 — context-fact-constraint (tool/context/memory — no LLM call)

**System prompt:**

```
(context injection — no LLM call)
```

**User prompt:**

```
(none)
```

**Response:**

```
Added to system prompt: "HARD CONSTRAINT: You may ONLY state facts that appear in the candidate background given by the user. Never invent, exaggerate, or infer achievements, skills, or experience beyond what is explicitly stated. If the candidate lacks something the job asks for, say so honestly and frame their closest real, relevant experience instead — do not fabricate coverage."
```


### Step 2 — memory-cumulative-repair (tool/context/memory — no LLM call)

**System prompt:**

```
(memory flag set — no LLM call)
```

**User prompt:**

```
(none)
```

**Response:**

```
Repair loop will carry forward all prior-round violations into every subsequent repair prompt, not just the latest round.
```


### Step 3 — solution-draft (LLM call)

**System prompt:**

```
You are a helpful resume writer.

HARD CONSTRAINT: You may ONLY state facts that appear in the candidate background given by the user. Never invent, exaggerate, or infer achievements, skills, or experience beyond what is explicitly stated. If the candidate lacks something the job asks for, say so honestly and frame their closest real, relevant experience instead — do not fabricate coverage.
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
{"resumeSummary": "Frontend engineer with 3 years of experience building React and TypeScript applications at a Series A fintech startup. Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s on a critical user-facing journey. Mentored two junior engineers over an 18-month period, supporting their growth in React and frontend best practices. Seeking to contribute performance-focused frontend engineering and mentoring experience to Nimbus Retail.", "coverLetter": "Dear Hiring Manager,\n\nI'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. I've spent the last three years working as a frontend engineer using React and TypeScript, with a focus on building reliable, user-facing features in a fast-paced fintech startup.\n\nIn my current role, I rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s, directly improving a core part of the product experience. Alongside that work, I mentored two junior engineers over 18 months, helping them grow as confident React developers.\n\nI'm drawn to Nimbus Retail because the role combines the performance work I enjoy with the team development I care about. I'd welcome the chance to bring that experience to your team.\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]"}
```


### Step 4 — fact-guard-verify (LLM call)

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
Frontend engineer with 3 years of experience building React and TypeScript applications at a Series A fintech startup. Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s on a critical user-facing journey. Mentored two junior engineers over an 18-month period, supporting their growth in React and frontend best practices. Seeking to contribute performance-focused frontend engineering and mentoring experience to Nimbus Retail.

COVER LETTER:
Dear Hiring Manager,

I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. I've spent the last three years working as a frontend engineer using React and TypeScript, with a focus on building reliable, user-facing features in a fast-paced fintech startup.

In my current role, I rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s, directly improving a core part of the product experience. Alongside that work, I mentored two junior engineers over 18 months, helping them grow as confident React developers.

I'm drawn to Nimbus Retail because the role combines the performance work I enjoy with the team development I care about. I'd welcome the chance to bring that experience to your team.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Frontend engineer with 3 years of experience building React and TypeScript applications at a Series A fintech startup.","supportedByFactId":"F1"},{"text":"Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s","supportedByFactId":"F2"},{"text":"on a critical user-facing journey","supportedByFactId":null},{"text":"Mentored two junior engineers over an 18-month period","supportedByFactId":"F3"},{"text":"supporting their growth in React and frontend best practices","supportedByFactId":null},{"text":"I've spent the last three years working as a frontend engineer using React and TypeScript","supportedByFactId":"F1"},{"text":"with a focus on building reliable, user-facing features","supportedByFactId":null},{"text":"in a fast-paced fintech startup","supportedByFactId":null},{"text":"In my current role, I rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s","supportedByFactId":"F2"},{"text":"directly improving a core part of the product experience","supportedByFactId":null},{"text":"Alongside that work, I mentored two junior engineers over 18 months","supportedByFactId":"F3"},{"text":"helping them grow as confident React developers","supportedByFactId":null}]}
```


### Step 5 — repair-round-1 (LLM call)

**System prompt:**

```
You are a helpful resume writer.

HARD CONSTRAINT: You may ONLY state facts that appear in the candidate background given by the user. Never invent, exaggerate, or infer achievements, skills, or experience beyond what is explicitly stated. If the candidate lacks something the job asks for, say so honestly and frame their closest real, relevant experience instead — do not fabricate coverage.
```

**User prompt:**

```
Here is your previous draft:

RESUME SUMMARY:
Frontend engineer with 3 years of experience building React and TypeScript applications at a Series A fintech startup. Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s on a critical user-facing journey. Mentored two junior engineers over an 18-month period, supporting their growth in React and frontend best practices. Seeking to contribute performance-focused frontend engineering and mentoring experience to Nimbus Retail.

COVER LETTER:
Dear Hiring Manager,

I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. I've spent the last three years working as a frontend engineer using React and TypeScript, with a focus on building reliable, user-facing features in a fast-paced fintech startup.

In my current role, I rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s, directly improving a core part of the product experience. Alongside that work, I mentored two junior engineers over 18 months, helping them grow as confident React developers.

I'm drawn to Nimbus Retail because the role combines the performance work I enjoy with the team development I care about. I'd welcome the chance to bring that experience to your team.

Thank you for your consideration.

Sincerely,
[Your Name]

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "on a critical user-facing journey"
- "supporting their growth in React and frontend best practices"
- "with a focus on building reliable, user-facing features"
- "in a fast-paced fintech startup"
- "directly improving a core part of the product experience"
- "helping them grow as confident React developers"

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary":"Frontend engineer with 3 years of experience building React and TypeScript applications at a Series A fintech startup. Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s. Mentored two junior engineers over an 18-month period. Seeking to apply performance-focused frontend engineering and mentoring experience to Nimbus Retail.","coverLetter":"Dear Hiring Manager,\n\nI'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. I have spent the last three years as a frontend engineer using React and TypeScript at a Series A fintech startup.\n\nIn my current role, I rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s. I also mentored two junior engineers over an 18-month period.\n\nI'm drawn to Nimbus Retail because this role would allow me to use my frontend engineering experience, including performance improvements and mentoring, to contribute to your team.\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]"}
```


### Step 6 — fact-guard-verify (LLM call)

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
Frontend engineer with 3 years of experience building React and TypeScript applications at a Series A fintech startup. Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s. Mentored two junior engineers over an 18-month period. Seeking to apply performance-focused frontend engineering and mentoring experience to Nimbus Retail.

COVER LETTER:
Dear Hiring Manager,

I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. I have spent the last three years as a frontend engineer using React and TypeScript at a Series A fintech startup.

In my current role, I rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s. I also mentored two junior engineers over an 18-month period.

I'm drawn to Nimbus Retail because this role would allow me to use my frontend engineering experience, including performance improvements and mentoring, to contribute to your team.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Frontend engineer with 3 years of experience building React and TypeScript applications at a Series A fintech startup.","supportedByFactId":"F1"},{"text":"Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s.","supportedByFactId":"F2"},{"text":"Mentored two junior engineers over an 18-month period.","supportedByFactId":"F3"},{"text":"performance-focused frontend engineering","supportedByFactId":"F2"},{"text":"mentoring experience","supportedByFactId":"F3"},{"text":"I have spent the last three years as a frontend engineer using React and TypeScript at a Series A fintech startup.","supportedByFactId":"F1"},{"text":"In my current role, I rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s.","supportedByFactId":"F2"},{"text":"I also mentored two junior engineers over an 18-month period.","supportedByFactId":"F3"},{"text":"my frontend engineering experience","supportedByFactId":"F1"},{"text":"performance improvements","supportedByFactId":"F2"},{"text":"mentoring","supportedByFactId":"F3"}]}
```


### Step 7 — fact-guard-verify (LLM call)

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
Frontend engineer with 3 years of experience building React and TypeScript applications at a Series A fintech startup. Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s. Mentored two junior engineers over an 18-month period. Seeking to apply performance-focused frontend engineering and mentoring experience to Nimbus Retail.

COVER LETTER:
Dear Hiring Manager,

I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. I have spent the last three years as a frontend engineer using React and TypeScript at a Series A fintech startup.

In my current role, I rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s. I also mentored two junior engineers over an 18-month period.

I'm drawn to Nimbus Retail because this role would allow me to use my frontend engineering experience, including performance improvements and mentoring, to contribute to your team.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Frontend engineer with 3 years of experience building React and TypeScript applications at a Series A fintech startup.","supportedByFactId":"F1"},{"text":"Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s.","supportedByFactId":"F2"},{"text":"Mentored two junior engineers over an 18-month period.","supportedByFactId":"F3"},{"text":"I have spent the last three years as a frontend engineer using React and TypeScript at a Series A fintech startup.","supportedByFactId":"F1"},{"text":"In my current role, I rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s.","supportedByFactId":"F2"},{"text":"I also mentored two junior engineers over an 18-month period.","supportedByFactId":"F3"}]}
```


### Step 8 — quality-score (LLM call)

**System prompt:**

```
Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}
```

**User prompt:**

```
RESUME SUMMARY:
Frontend engineer with 3 years of experience building React and TypeScript applications at a Series A fintech startup. Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s. Mentored two junior engineers over an 18-month period. Seeking to apply performance-focused frontend engineering and mentoring experience to Nimbus Retail.

COVER LETTER:
Dear Hiring Manager,

I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. I have spent the last three years as a frontend engineer using React and TypeScript at a Series A fintech startup.

In my current role, I rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s. I also mentored two junior engineers over an 18-month period.

I'm drawn to Nimbus Retail because this role would allow me to use my frontend engineering experience, including performance improvements and mentoring, to contribute to your team.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"score": 4, "notes": "Professional and clear, but the cover letter largely repeats the resume summary and could use a more personalized touch."}
```
