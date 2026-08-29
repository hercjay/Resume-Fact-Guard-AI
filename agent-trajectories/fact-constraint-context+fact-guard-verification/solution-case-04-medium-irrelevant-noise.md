# Trajectory: solution — case-04-medium-irrelevant-noise

Stage: fact-constraint-context+fact-guard-verification

## Summary
Case: case-04-medium-irrelevant-noise (medium)
Fabricated claims: 0/6
Quality score: 3/5 (The materials are clear and specific but the cover letter feels formulaic and redundant, lacking a natural, personalized touch that would make a real person send it without edits.)
Repair iterations: 2
Tokens: 0 | Time: 63378ms

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


### Step 2 — solution-draft (LLM call)

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
{"resumeSummary": "Full-stack engineer with 4 years of experience building web applications using React on the frontend and Django on the backend. Developed an internal admin dashboard that the support team uses daily, demonstrating a strong focus on practical internal tooling. Wrote unit tests for the payments module, improving test coverage from 40% to 78%. Passionate about writing reliable code and creating tools that improve team workflows, aligning well with the needs at Portside Analytics.", "coverLetter": "Dear Hiring Manager,\n\nI am excited to apply for the Full-Stack Engineer position at Portside Analytics. With four years of experience as a full-stack engineer working with React and Django, I am comfortable across the stack and enjoy building tools that make teams more effective.\n\nIn my current role, I built an internal admin dashboard that the support team relies on daily, and I took ownership of the payments module's test coverage—raising it from 40% to 78% through unit tests. I care deeply about test coverage and internal tooling, values that I see reflected in your job description.\n\nI would love to bring my hands-on experience with React, Django, and testing to your team and contribute to building reliable, useful tools. Thank you for considering my application.\n\nBest regards,\n[Your Name]"}
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
F1: 4 years as a full-stack engineer, React on the frontend, Django on the backend
F2: Built an internal admin dashboard used by the support team daily
F3: Enjoys rock climbing and has run two half marathons
F4: Previously worked a summer internship in retail before switching to engineering
F5: Wrote unit tests for the payments module, raising coverage from 40% to 78%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Full-stack engineer with 4 years of experience building web applications using React on the frontend and Django on the backend. Developed an internal admin dashboard that the support team uses daily, demonstrating a strong focus on practical internal tooling. Wrote unit tests for the payments module, improving test coverage from 40% to 78%. Passionate about writing reliable code and creating tools that improve team workflows, aligning well with the needs at Portside Analytics.

COVER LETTER:
Dear Hiring Manager,

I am excited to apply for the Full-Stack Engineer position at Portside Analytics. With four years of experience as a full-stack engineer working with React and Django, I am comfortable across the stack and enjoy building tools that make teams more effective.

In my current role, I built an internal admin dashboard that the support team relies on daily, and I took ownership of the payments module's test coverage—raising it from 40% to 78% through unit tests. I care deeply about test coverage and internal tooling, values that I see reflected in your job description.

I would love to bring my hands-on experience with React, Django, and testing to your team and contribute to building reliable, useful tools. Thank you for considering my application.

Best regards,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Full-stack engineer with 4 years of experience building web applications using React on the frontend and Django on the backend","supportedByFactId":"F1"},{"text":"Developed an internal admin dashboard that the support team uses daily","supportedByFactId":"F2"},{"text":"demonstrating a strong focus on practical internal tooling","supportedByFactId":null},{"text":"Wrote unit tests for the payments module","supportedByFactId":"F5"},{"text":"improving test coverage from 40% to 78%","supportedByFactId":"F5"},{"text":"Passionate about writing reliable code and creating tools that improve team workflows","supportedByFactId":null},{"text":"four years of experience as a full-stack engineer working with React and Django","supportedByFactId":"F1"},{"text":"I am comfortable across the stack","supportedByFactId":null},{"text":"I enjoy building tools that make teams more effective","supportedByFactId":null},{"text":"In my current role","supportedByFactId":null},{"text":"I built an internal admin dashboard that the support team relies on daily","supportedByFactId":"F2"},{"text":"I took ownership of the payments module's test coverage","supportedByFactId":null},{"text":"raising it from 40% to 78% through unit tests","supportedByFactId":"F5"},{"text":"I care deeply about test coverage and internal tooling","supportedByFactId":null},{"text":"hands-on experience with React and Django","supportedByFactId":"F1"},{"text":"hands-on experience with testing","supportedByFactId":"F5"}]}
```


### Step 4 — repair-round-1 (LLM call)

**System prompt:**

```
You are a helpful resume writer.

HARD CONSTRAINT: You may ONLY state facts that appear in the candidate background given by the user. Never invent, exaggerate, or infer achievements, skills, or experience beyond what is explicitly stated. If the candidate lacks something the job asks for, say so honestly and frame their closest real, relevant experience instead — do not fabricate coverage.
```

**User prompt:**

```
Here is your previous draft:

RESUME SUMMARY:
Full-stack engineer with 4 years of experience building web applications using React on the frontend and Django on the backend. Developed an internal admin dashboard that the support team uses daily, demonstrating a strong focus on practical internal tooling. Wrote unit tests for the payments module, improving test coverage from 40% to 78%. Passionate about writing reliable code and creating tools that improve team workflows, aligning well with the needs at Portside Analytics.

COVER LETTER:
Dear Hiring Manager,

I am excited to apply for the Full-Stack Engineer position at Portside Analytics. With four years of experience as a full-stack engineer working with React and Django, I am comfortable across the stack and enjoy building tools that make teams more effective.

In my current role, I built an internal admin dashboard that the support team relies on daily, and I took ownership of the payments module's test coverage—raising it from 40% to 78% through unit tests. I care deeply about test coverage and internal tooling, values that I see reflected in your job description.

I would love to bring my hands-on experience with React, Django, and testing to your team and contribute to building reliable, useful tools. Thank you for considering my application.

Best regards,
[Your Name]

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "demonstrating a strong focus on practical internal tooling"
- "Passionate about writing reliable code and creating tools that improve team workflows"
- "I am comfortable across the stack"
- "I enjoy building tools that make teams more effective"
- "In my current role"
- "I took ownership of the payments module's test coverage"
- "I care deeply about test coverage and internal tooling"

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Full-stack engineer with 4 years of experience building web applications using React on the frontend and Django on the backend. Built an internal admin dashboard used daily by the support team. Wrote unit tests for the payments module, improving test coverage from 40% to 78%. This experience aligns with the full-stack and testing needs at Portside Analytics.", "coverLetter": "Dear Hiring Manager,\n\nI am applying for the Full-Stack Engineer position at Portside Analytics. I have four years of experience as a full-stack engineer working with React and Django, building web applications with these technologies.\n\nI built an internal admin dashboard that the support team uses daily. I also wrote unit tests for the payments module, improving test coverage from 40% to 78%. These are the kinds of practical, reliable projects I have worked on.\n\nI would like to bring my experience with React, Django, and testing to your team. Thank you for considering my application.\n\nBest regards,\n[Your Name]"}
```


### Step 5 — fact-guard-verify (LLM call)

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
Full-stack engineer with 4 years of experience building web applications using React on the frontend and Django on the backend. Built an internal admin dashboard used daily by the support team. Wrote unit tests for the payments module, improving test coverage from 40% to 78%. This experience aligns with the full-stack and testing needs at Portside Analytics.

COVER LETTER:
Dear Hiring Manager,

I am applying for the Full-Stack Engineer position at Portside Analytics. I have four years of experience as a full-stack engineer working with React and Django, building web applications with these technologies.

I built an internal admin dashboard that the support team uses daily. I also wrote unit tests for the payments module, improving test coverage from 40% to 78%. These are the kinds of practical, reliable projects I have worked on.

I would like to bring my experience with React, Django, and testing to your team. Thank you for considering my application.

Best regards,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Full-stack engineer with 4 years of experience building web applications using React on the frontend and Django on the backend","supportedByFactId":"F1"},{"text":"Built an internal admin dashboard used daily by the support team","supportedByFactId":"F2"},{"text":"Wrote unit tests for the payments module, improving test coverage from 40% to 78%","supportedByFactId":"F5"},{"text":"I have four years of experience as a full-stack engineer working with React and Django, building web applications with these technologies","supportedByFactId":"F1"},{"text":"I built an internal admin dashboard that the support team uses daily","supportedByFactId":"F2"},{"text":"I also wrote unit tests for the payments module, improving test coverage from 40% to 78%","supportedByFactId":"F5"}]}
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
Full-stack engineer with 4 years of experience building web applications using React on the frontend and Django on the backend. Built an internal admin dashboard used daily by the support team. Wrote unit tests for the payments module, improving test coverage from 40% to 78%. This experience aligns with the full-stack and testing needs at Portside Analytics.

COVER LETTER:
Dear Hiring Manager,

I am applying for the Full-Stack Engineer position at Portside Analytics. I have four years of experience as a full-stack engineer working with React and Django, building web applications with these technologies.

I built an internal admin dashboard that the support team uses daily. I also wrote unit tests for the payments module, improving test coverage from 40% to 78%. These are the kinds of practical, reliable projects I have worked on.

I would like to bring my experience with React, Django, and testing to your team. Thank you for considering my application.

Best regards,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Full-stack engineer with 4 years of experience building web applications using React on the frontend and Django on the backend.","supportedByFactId":"F1"},{"text":"Built an internal admin dashboard used daily by the support team.","supportedByFactId":"F2"},{"text":"Wrote unit tests for the payments module, improving test coverage from 40% to 78%.","supportedByFactId":"F5"},{"text":"I have four years of experience as a full-stack engineer working with React and Django, building web applications with these technologies.","supportedByFactId":"F1"},{"text":"I built an internal admin dashboard that the support team uses daily.","supportedByFactId":"F2"},{"text":"I also wrote unit tests for the payments module, improving test coverage from 40% to 78%.","supportedByFactId":"F5"}]}
```


### Step 7 — quality-score (LLM call)

**System prompt:**

```
Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}
```

**User prompt:**

```
RESUME SUMMARY:
Full-stack engineer with 4 years of experience building web applications using React on the frontend and Django on the backend. Built an internal admin dashboard used daily by the support team. Wrote unit tests for the payments module, improving test coverage from 40% to 78%. This experience aligns with the full-stack and testing needs at Portside Analytics.

COVER LETTER:
Dear Hiring Manager,

I am applying for the Full-Stack Engineer position at Portside Analytics. I have four years of experience as a full-stack engineer working with React and Django, building web applications with these technologies.

I built an internal admin dashboard that the support team uses daily. I also wrote unit tests for the payments module, improving test coverage from 40% to 78%. These are the kinds of practical, reliable projects I have worked on.

I would like to bring my experience with React, Django, and testing to your team. Thank you for considering my application.

Best regards,
[Your Name]
```

**Response:**

```
{"score": 3, "notes": "The materials are clear and specific but the cover letter feels formulaic and redundant, lacking a natural, personalized touch that would make a real person send it without edits."}
```
