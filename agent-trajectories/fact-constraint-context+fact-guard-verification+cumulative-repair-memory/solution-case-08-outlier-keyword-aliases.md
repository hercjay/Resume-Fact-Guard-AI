# Trajectory: solution — case-08-outlier-keyword-aliases

Stage: fact-constraint-context+fact-guard-verification+cumulative-repair-memory

## Summary
Case: case-08-outlier-keyword-aliases (outlier) — HARD CASE: Tests near-duplicate/alias handling: 'Postgres' vs 'PostgreSQL', 'JS'/'TS' vs 'JavaScript'/'TypeScript'. A naive keyword matcher could double-count or miss these entirely — good evidence for whether the tool's de-duping logic actually works.
Fabricated claims: 1/5
Quality score: 3/5 (It's clear and professional but very brief and generic, lacking specific achievements or enthusiasm; a real person would likely add more detail before sending.)
Repair iterations: 2
Tokens: 0 | Time: 100362ms

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
- 3 years working with Postgres and writing complex SQL queries for reporting
- Comfortable with JS and some TS, mostly on internal tooling

Job posting:
Title: Data Engineer
Company: Northline Freight
Description: Looking for someone strong in PostgreSQL and SQL, plus JavaScript/TypeScript for internal tooling scripts.

Write a tailored resume summary and a short cover letter for this candidate applying to this job.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Data-focused professional with 3 years of experience working with PostgreSQL and writing complex SQL queries for reporting. Comfortable with JavaScript and some TypeScript, primarily for internal tooling. Seeking to apply hands-on SQL and scripting skills to the Data Engineer role at Northline Freight.", "coverLetter": "Dear Hiring Manager,\n\nI am writing to apply for the Data Engineer position at Northline Freight. I have 3 years of experience working with PostgreSQL and writing complex SQL queries for reporting, which has given me a solid hands-on foundation in SQL and database work.\n\nI am also comfortable with JavaScript and some TypeScript, mostly on internal tooling. That experience aligns well with your need for scripting and internal tooling support as part of this role.\n\nMy background directly matches the core requirements you listed, and I would welcome the chance to bring my PostgreSQL and scripting skills to Northline Freight.\n\nThank you for your consideration."}
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
F1: 3 years working with Postgres and writing complex SQL queries for reporting
F2: Comfortable with JS and some TS, mostly on internal tooling

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Data-focused professional with 3 years of experience working with PostgreSQL and writing complex SQL queries for reporting. Comfortable with JavaScript and some TypeScript, primarily for internal tooling. Seeking to apply hands-on SQL and scripting skills to the Data Engineer role at Northline Freight.

COVER LETTER:
Dear Hiring Manager,

I am writing to apply for the Data Engineer position at Northline Freight. I have 3 years of experience working with PostgreSQL and writing complex SQL queries for reporting, which has given me a solid hands-on foundation in SQL and database work.

I am also comfortable with JavaScript and some TypeScript, mostly on internal tooling. That experience aligns well with your need for scripting and internal tooling support as part of this role.

My background directly matches the core requirements you listed, and I would welcome the chance to bring my PostgreSQL and scripting skills to Northline Freight.

Thank you for your consideration.
```

**Response:**

```
{"claims":[{"text":"Data-focused professional with 3 years of experience working with PostgreSQL and writing complex SQL queries for reporting.","supportedByFactId":"F1"},{"text":"Comfortable with JavaScript and some TypeScript, primarily for internal tooling.","supportedByFactId":"F2"},{"text":"Seeking to apply hands-on SQL and scripting skills to the Data Engineer role at Northline Freight.","supportedByFactId":null},{"text":"I have 3 years of experience working with PostgreSQL and writing complex SQL queries for reporting","supportedByFactId":"F1"},{"text":"which has given me a solid hands-on foundation in SQL and database work","supportedByFactId":"F1"},{"text":"I am also comfortable with JavaScript and some TypeScript, mostly on internal tooling.","supportedByFactId":"F2"},{"text":"That experience aligns well with your need for scripting and internal tooling support as part of this role.","supportedByFactId":null},{"text":"My background directly matches the core requirements you listed","supportedByFactId":null},{"text":"I would welcome the chance to bring my PostgreSQL and scripting skills to Northline Freight.","supportedByFactId":null}]}
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
Data-focused professional with 3 years of experience working with PostgreSQL and writing complex SQL queries for reporting. Comfortable with JavaScript and some TypeScript, primarily for internal tooling. Seeking to apply hands-on SQL and scripting skills to the Data Engineer role at Northline Freight.

COVER LETTER:
Dear Hiring Manager,

I am writing to apply for the Data Engineer position at Northline Freight. I have 3 years of experience working with PostgreSQL and writing complex SQL queries for reporting, which has given me a solid hands-on foundation in SQL and database work.

I am also comfortable with JavaScript and some TypeScript, mostly on internal tooling. That experience aligns well with your need for scripting and internal tooling support as part of this role.

My background directly matches the core requirements you listed, and I would welcome the chance to bring my PostgreSQL and scripting skills to Northline Freight.

Thank you for your consideration.

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "Seeking to apply hands-on SQL and scripting skills to the Data Engineer role at Northline Freight."
- "That experience aligns well with your need for scripting and internal tooling support as part of this role."
- "My background directly matches the core requirements you listed"
- "I would welcome the chance to bring my PostgreSQL and scripting skills to Northline Freight."

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Data professional with 3 years of experience working with PostgreSQL. Writes complex SQL queries for reporting. Comfortable with JavaScript and some TypeScript, primarily for internal tooling.", "coverLetter": "Dear Hiring Manager,\n\nI am applying for the Data Engineer position at Northline Freight. I have 3 years of experience using PostgreSQL and writing complex SQL queries for reporting.\n\nIn that work, I have also used JavaScript and some TypeScript, primarily for internal tooling.\n\nThank you for your time and consideration."}
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
F1: 3 years working with Postgres and writing complex SQL queries for reporting
F2: Comfortable with JS and some TS, mostly on internal tooling

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Data professional with 3 years of experience working with PostgreSQL. Writes complex SQL queries for reporting. Comfortable with JavaScript and some TypeScript, primarily for internal tooling.

COVER LETTER:
Dear Hiring Manager,

I am applying for the Data Engineer position at Northline Freight. I have 3 years of experience using PostgreSQL and writing complex SQL queries for reporting.

In that work, I have also used JavaScript and some TypeScript, primarily for internal tooling.

Thank you for your time and consideration.
```

**Response:**

```
{"claims":[{"text":"Data professional","supportedByFactId":"F1"},{"text":"3 years of experience working with PostgreSQL","supportedByFactId":"F1"},{"text":"Writes complex SQL queries for reporting","supportedByFactId":"F1"},{"text":"Comfortable with JavaScript","supportedByFactId":"F2"},{"text":"some TypeScript","supportedByFactId":"F2"},{"text":"primarily for internal tooling","supportedByFactId":"F2"},{"text":"I have 3 years of experience using PostgreSQL","supportedByFactId":"F1"},{"text":"writing complex SQL queries for reporting","supportedByFactId":"F1"},{"text":"I have also used JavaScript","supportedByFactId":"F2"},{"text":"some TypeScript","supportedByFactId":"F2"},{"text":"primarily for internal tooling","supportedByFactId":"F2"}]}
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
F1: 3 years working with Postgres and writing complex SQL queries for reporting
F2: Comfortable with JS and some TS, mostly on internal tooling

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Data professional with 3 years of experience working with PostgreSQL. Writes complex SQL queries for reporting. Comfortable with JavaScript and some TypeScript, primarily for internal tooling.

COVER LETTER:
Dear Hiring Manager,

I am applying for the Data Engineer position at Northline Freight. I have 3 years of experience using PostgreSQL and writing complex SQL queries for reporting.

In that work, I have also used JavaScript and some TypeScript, primarily for internal tooling.

Thank you for your time and consideration.
```

**Response:**

```
{"claims":[{"text":"Data professional with 3 years of experience working with PostgreSQL.","supportedByFactId":"F1"},{"text":"Writes complex SQL queries for reporting.","supportedByFactId":"F1"},{"text":"Comfortable with JavaScript and some TypeScript, primarily for internal tooling.","supportedByFactId":"F2"},{"text":"I have 3 years of experience using PostgreSQL and writing complex SQL queries for reporting.","supportedByFactId":"F1"},{"text":"In that work, I have also used JavaScript and some TypeScript, primarily for internal tooling.","supportedByFactId":null}]}
```


### Step 8 — quality-score (LLM call)

**System prompt:**

```
Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}
```

**User prompt:**

```
RESUME SUMMARY:
Data professional with 3 years of experience working with PostgreSQL. Writes complex SQL queries for reporting. Comfortable with JavaScript and some TypeScript, primarily for internal tooling.

COVER LETTER:
Dear Hiring Manager,

I am applying for the Data Engineer position at Northline Freight. I have 3 years of experience using PostgreSQL and writing complex SQL queries for reporting.

In that work, I have also used JavaScript and some TypeScript, primarily for internal tooling.

Thank you for your time and consideration.
```

**Response:**

```
{"score": 3, "notes": "It's clear and professional but very brief and generic, lacking specific achievements or enthusiasm; a real person would likely add more detail before sending."}
```
