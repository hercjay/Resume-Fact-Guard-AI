# Trajectory: solution — case-04-medium-irrelevant-noise

Stage: fact-constraint-context+fact-guard-verification+cumulative-repair-memory

## Summary
Case: case-04-medium-irrelevant-noise (medium)
Fabricated claims: 0/7
Quality score: 2/5 (The cover letter is essentially a verbatim repeat of the resume summary, making it feel lazy and unlikely to be sent as-is without adding personalization or enthusiasm.)
Repair iterations: 2
Tokens: 0 | Time: 161924ms

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
- 4 years as a full-stack engineer, React on the frontend, Django on the backend
- Built an internal admin dashboard used by the support team daily
- Enjoys rock climbing and has run two half marathons
- Previously worked a summer internship in retail before switching to engineering
- Wrote unit tests for the payments module, raising coverage from 40% to 78%

Job posting:
Title: Full-Stack Engineer
Company: Portside Analytics
Description: Full-stack engineer comfortable in React and a Python web framework, who cares about test coverage and internal tooling.

Write a tailored resume summary and a short cover letter for this candidate applying to this job.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Full-stack engineer with 4 years of experience building applications with React on the frontend and Django on the backend. Developed an internal admin dashboard that is used daily by the support team, reflecting a strong focus on internal tooling. Wrote unit tests for the payments module, improving test coverage from 40% to 78%. Comfortable working across the stack and committed to writing reliable, maintainable code.", "coverLetter": "Dear Hiring Manager,\n\nI was excited to see the Full-Stack Engineer opening at Portside Analytics. With 4 years of hands-on experience using React and Django, and a strong interest in internal tooling and test coverage, this role aligns closely with my skills and what I enjoy doing.\n\nIn my current role as a full-stack engineer, I built an internal admin dashboard that the support team uses daily. That experience taught me how to design tools that make real workflows easier and more efficient. I also took ownership of the payments module’s test suite, raising unit test coverage from 40% to 78% — a project that reinforced my belief that solid tests are essential for confident, maintainable code.\n\nI am drawn to Portside Analytics because the position values both the frontend and backend work I love, and also emphasizes the kind of quality and internal tooling I care about. I would welcome the chance to contribute to your team and help build reliable, useful software.\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]"}
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
F1: 4 years as a full-stack engineer, React on the frontend, Django on the backend
F2: Built an internal admin dashboard used by the support team daily
F3: Enjoys rock climbing and has run two half marathons
F4: Previously worked a summer internship in retail before switching to engineering
F5: Wrote unit tests for the payments module, raising coverage from 40% to 78%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Full-stack engineer with 4 years of experience building applications with React on the frontend and Django on the backend. Developed an internal admin dashboard that is used daily by the support team, reflecting a strong focus on internal tooling. Wrote unit tests for the payments module, improving test coverage from 40% to 78%. Comfortable working across the stack and committed to writing reliable, maintainable code.

COVER LETTER:
Dear Hiring Manager,

I was excited to see the Full-Stack Engineer opening at Portside Analytics. With 4 years of hands-on experience using React and Django, and a strong interest in internal tooling and test coverage, this role aligns closely with my skills and what I enjoy doing.

In my current role as a full-stack engineer, I built an internal admin dashboard that the support team uses daily. That experience taught me how to design tools that make real workflows easier and more efficient. I also took ownership of the payments module’s test suite, raising unit test coverage from 40% to 78% — a project that reinforced my belief that solid tests are essential for confident, maintainable code.

I am drawn to Portside Analytics because the position values both the frontend and backend work I love, and also emphasizes the kind of quality and internal tooling I care about. I would welcome the chance to contribute to your team and help build reliable, useful software.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Full-stack engineer with 4 years of experience building applications with React on the frontend and Django on the backend.","supportedByFactId":"F1"},{"text":"Developed an internal admin dashboard that is used daily by the support team","supportedByFactId":"F2"},{"text":"reflecting a strong focus on internal tooling","supportedByFactId":null},{"text":"Wrote unit tests for the payments module, improving test coverage from 40% to 78%.","supportedByFactId":"F5"},{"text":"Comfortable working across the stack","supportedByFactId":"F1"},{"text":"committed to writing reliable, maintainable code","supportedByFactId":null},{"text":"With 4 years of hands-on experience using React and Django","supportedByFactId":"F1"},{"text":"a strong interest in internal tooling and test coverage","supportedByFactId":null},{"text":"In my current role as a full-stack engineer","supportedByFactId":null},{"text":"I built an internal admin dashboard that the support team uses daily","supportedByFactId":"F2"},{"text":"That experience taught me how to design tools that make real workflows easier and more efficient.","supportedByFactId":null},{"text":"I also took ownership of the payments module’s test suite","supportedByFactId":null},{"text":"raising unit test coverage from 40% to 78%","supportedByFactId":"F5"},{"text":"a project that reinforced my belief that solid tests are essential for confident, maintainable code.","supportedByFactId":null},{"text":"I am drawn to Portside Analytics because the position values both the frontend and backend work I love","supportedByFactId":null},{"text":"also emphasizes the kind of quality and internal tooling I care about.","supportedByFactId":null}]}
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
Full-stack engineer with 4 years of experience building applications with React on the frontend and Django on the backend. Developed an internal admin dashboard that is used daily by the support team, reflecting a strong focus on internal tooling. Wrote unit tests for the payments module, improving test coverage from 40% to 78%. Comfortable working across the stack and committed to writing reliable, maintainable code.

COVER LETTER:
Dear Hiring Manager,

I was excited to see the Full-Stack Engineer opening at Portside Analytics. With 4 years of hands-on experience using React and Django, and a strong interest in internal tooling and test coverage, this role aligns closely with my skills and what I enjoy doing.

In my current role as a full-stack engineer, I built an internal admin dashboard that the support team uses daily. That experience taught me how to design tools that make real workflows easier and more efficient. I also took ownership of the payments module’s test suite, raising unit test coverage from 40% to 78% — a project that reinforced my belief that solid tests are essential for confident, maintainable code.

I am drawn to Portside Analytics because the position values both the frontend and backend work I love, and also emphasizes the kind of quality and internal tooling I care about. I would welcome the chance to contribute to your team and help build reliable, useful software.

Thank you for your consideration.

Sincerely,
[Your Name]

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "reflecting a strong focus on internal tooling"
- "committed to writing reliable, maintainable code"
- "a strong interest in internal tooling and test coverage"
- "In my current role as a full-stack engineer"
- "That experience taught me how to design tools that make real workflows easier and more efficient."
- "I also took ownership of the payments module’s test suite"
- "a project that reinforced my belief that solid tests are essential for confident, maintainable code."
- "I am drawn to Portside Analytics because the position values both the frontend and backend work I love"
- "also emphasizes the kind of quality and internal tooling I care about."

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Full-stack engineer with 4 years of experience building applications with React on the frontend and Django on the backend. Developed an internal admin dashboard used daily by the support team. Wrote unit tests for the payments module, improving test coverage from 40% to 78%.", "coverLetter": "Dear Hiring Manager,\n\nI am applying for the Full-Stack Engineer opening at Portside Analytics. I have 4 years of experience building applications with React on the frontend and Django on the backend.\n\nI developed an internal admin dashboard that is used daily by the support team. I also wrote unit tests for the payments module, improving test coverage from 40% to 78%.\n\nThese projects reflect my experience with React, Django, and testing. I would welcome the opportunity to discuss how I can contribute to your team.\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]"}
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
F1: 4 years as a full-stack engineer, React on the frontend, Django on the backend
F2: Built an internal admin dashboard used by the support team daily
F3: Enjoys rock climbing and has run two half marathons
F4: Previously worked a summer internship in retail before switching to engineering
F5: Wrote unit tests for the payments module, raising coverage from 40% to 78%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Full-stack engineer with 4 years of experience building applications with React on the frontend and Django on the backend. Developed an internal admin dashboard used daily by the support team. Wrote unit tests for the payments module, improving test coverage from 40% to 78%.

COVER LETTER:
Dear Hiring Manager,

I am applying for the Full-Stack Engineer opening at Portside Analytics. I have 4 years of experience building applications with React on the frontend and Django on the backend.

I developed an internal admin dashboard that is used daily by the support team. I also wrote unit tests for the payments module, improving test coverage from 40% to 78%.

These projects reflect my experience with React, Django, and testing. I would welcome the opportunity to discuss how I can contribute to your team.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Full-stack engineer with 4 years of experience building applications with React on the frontend and Django on the backend.","supportedByFactId":"F1"},{"text":"Developed an internal admin dashboard used daily by the support team.","supportedByFactId":"F2"},{"text":"Wrote unit tests for the payments module, improving test coverage from 40% to 78%.","supportedByFactId":"F5"},{"text":"I have 4 years of experience building applications with React on the frontend and Django on the backend.","supportedByFactId":"F1"},{"text":"I developed an internal admin dashboard that is used daily by the support team.","supportedByFactId":"F2"},{"text":"I also wrote unit tests for the payments module, improving test coverage from 40% to 78%.","supportedByFactId":"F5"},{"text":"These projects reflect my experience with React, Django, and testing.","supportedByFactId":"F1"}]}
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
F1: 4 years as a full-stack engineer, React on the frontend, Django on the backend
F2: Built an internal admin dashboard used by the support team daily
F3: Enjoys rock climbing and has run two half marathons
F4: Previously worked a summer internship in retail before switching to engineering
F5: Wrote unit tests for the payments module, raising coverage from 40% to 78%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Full-stack engineer with 4 years of experience building applications with React on the frontend and Django on the backend. Developed an internal admin dashboard used daily by the support team. Wrote unit tests for the payments module, improving test coverage from 40% to 78%.

COVER LETTER:
Dear Hiring Manager,

I am applying for the Full-Stack Engineer opening at Portside Analytics. I have 4 years of experience building applications with React on the frontend and Django on the backend.

I developed an internal admin dashboard that is used daily by the support team. I also wrote unit tests for the payments module, improving test coverage from 40% to 78%.

These projects reflect my experience with React, Django, and testing. I would welcome the opportunity to discuss how I can contribute to your team.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Full-stack engineer with 4 years of experience building applications with React on the frontend and Django on the backend.","supportedByFactId":"F1"},{"text":"Developed an internal admin dashboard used daily by the support team.","supportedByFactId":"F2"},{"text":"Wrote unit tests for the payments module, improving test coverage from 40% to 78%.","supportedByFactId":"F5"},{"text":"I have 4 years of experience building applications with React on the frontend and Django on the backend.","supportedByFactId":"F1"},{"text":"I developed an internal admin dashboard that is used daily by the support team.","supportedByFactId":"F2"},{"text":"I also wrote unit tests for the payments module, improving test coverage from 40% to 78%.","supportedByFactId":"F5"},{"text":"These projects reflect my experience with React, Django, and testing.","supportedByFactId":"F1"}]}
```


### Step 8 — quality-score (LLM call)

**System prompt:**

```
Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}
```

**User prompt:**

```
RESUME SUMMARY:
Full-stack engineer with 4 years of experience building applications with React on the frontend and Django on the backend. Developed an internal admin dashboard used daily by the support team. Wrote unit tests for the payments module, improving test coverage from 40% to 78%.

COVER LETTER:
Dear Hiring Manager,

I am applying for the Full-Stack Engineer opening at Portside Analytics. I have 4 years of experience building applications with React on the frontend and Django on the backend.

I developed an internal admin dashboard that is used daily by the support team. I also wrote unit tests for the payments module, improving test coverage from 40% to 78%.

These projects reflect my experience with React, Django, and testing. I would welcome the opportunity to discuss how I can contribute to your team.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"score": 2, "notes": "The cover letter is essentially a verbatim repeat of the resume summary, making it feel lazy and unlikely to be sent as-is without adding personalization or enthusiasm."}
```
