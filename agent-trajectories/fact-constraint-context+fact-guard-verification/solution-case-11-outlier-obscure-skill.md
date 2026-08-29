# Trajectory: solution — case-11-outlier-obscure-skill

Stage: fact-constraint-context+fact-guard-verification

## Summary
Case: case-11-outlier-obscure-skill (outlier) — HARD CASE: 'Zig' isn't in the requirement-matcher's keyword list, so the tool will find zero signals here. Tests graceful degradation for niche/obscure domains the deterministic tool wasn't built to recognize — a good test of whether the LLM's own judgment still carries the case when the tool contributes nothing.
Fabricated claims: 0/6
Quality score: 2/5 (The text is clear and professional but overly sparse and repetitive, with no tailoring to the company or role, making it feel robotic and unlikely to be sent as-is by a real person.)
Repair iterations: 2
Tokens: 0 | Time: 85520ms

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
- 3 years building embedded firmware in Zig for industrial sensor devices
- Optimized a sensor polling loop to cut power draw by 30%

Job posting:
Title: Embedded Systems Engineer
Company: Ferrovax Robotics
Description: Embedded systems engineer with experience in low-level systems programming for constrained hardware.

Write a tailored resume summary and a short cover letter for this candidate applying to this job.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Embedded firmware engineer with 3 years of experience developing low-level systems for constrained industrial sensor devices, primarily using Zig. Proven ability to optimize performance and power efficiency, including reducing power draw by 30% through careful redesign of a sensor polling loop. Skilled in writing efficient, reliable firmware for resource-limited embedded platforms.",
 "coverLetter": "Dear Hiring Team,\n\nI am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. With 3 years of experience building embedded firmware in Zig for industrial sensor devices, I am well prepared to work on low-level systems programming for constrained hardware.\n\nIn my current work, I focus on writing efficient, reliable firmware for resource-limited devices. One project involved optimizing a sensor polling loop, where I reduced power draw by 30% through careful analysis and targeted code changes. This experience gave me a strong practical understanding of the trade-offs involved in low-power embedded development.\n\nI am drawn to the challenges of constrained hardware and enjoy working directly with low-level systems. I would welcome the opportunity to contribute to the team at Ferrovax Robotics.\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]"}
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
F1: 3 years building embedded firmware in Zig for industrial sensor devices
F2: Optimized a sensor polling loop to cut power draw by 30%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Embedded firmware engineer with 3 years of experience developing low-level systems for constrained industrial sensor devices, primarily using Zig. Proven ability to optimize performance and power efficiency, including reducing power draw by 30% through careful redesign of a sensor polling loop. Skilled in writing efficient, reliable firmware for resource-limited embedded platforms.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. With 3 years of experience building embedded firmware in Zig for industrial sensor devices, I am well prepared to work on low-level systems programming for constrained hardware.

In my current work, I focus on writing efficient, reliable firmware for resource-limited devices. One project involved optimizing a sensor polling loop, where I reduced power draw by 30% through careful analysis and targeted code changes. This experience gave me a strong practical understanding of the trade-offs involved in low-power embedded development.

I am drawn to the challenges of constrained hardware and enjoy working directly with low-level systems. I would welcome the opportunity to contribute to the team at Ferrovax Robotics.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Embedded firmware engineer","supportedByFactId":"F1"},{"text":"3 years of experience","supportedByFactId":"F1"},{"text":"developing low-level systems","supportedByFactId":null},{"text":"constrained industrial sensor devices","supportedByFactId":null},{"text":"primarily using Zig","supportedByFactId":"F1"},{"text":"Proven ability to optimize performance","supportedByFactId":null},{"text":"power efficiency","supportedByFactId":"F2"},{"text":"reducing power draw by 30%","supportedByFactId":"F2"},{"text":"through careful redesign of a sensor polling loop","supportedByFactId":null},{"text":"Skilled in writing efficient, reliable firmware for resource-limited embedded platforms","supportedByFactId":null},{"text":"3 years of experience building embedded firmware in Zig for industrial sensor devices","supportedByFactId":"F1"},{"text":"well prepared to work on low-level systems programming for constrained hardware","supportedByFactId":null},{"text":"In my current work, I focus on writing efficient, reliable firmware for resource-limited devices","supportedByFactId":null},{"text":"One project involved optimizing a sensor polling loop","supportedByFactId":"F2"},{"text":"I reduced power draw by 30%","supportedByFactId":"F2"},{"text":"through careful analysis and targeted code changes","supportedByFactId":null},{"text":"This experience gave me a strong practical understanding of the trade-offs involved in low-power embedded development","supportedByFactId":null},{"text":"I am drawn to the challenges of constrained hardware and enjoy working directly with low-level systems","supportedByFactId":null}]}
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
Embedded firmware engineer with 3 years of experience developing low-level systems for constrained industrial sensor devices, primarily using Zig. Proven ability to optimize performance and power efficiency, including reducing power draw by 30% through careful redesign of a sensor polling loop. Skilled in writing efficient, reliable firmware for resource-limited embedded platforms.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. With 3 years of experience building embedded firmware in Zig for industrial sensor devices, I am well prepared to work on low-level systems programming for constrained hardware.

In my current work, I focus on writing efficient, reliable firmware for resource-limited devices. One project involved optimizing a sensor polling loop, where I reduced power draw by 30% through careful analysis and targeted code changes. This experience gave me a strong practical understanding of the trade-offs involved in low-power embedded development.

I am drawn to the challenges of constrained hardware and enjoy working directly with low-level systems. I would welcome the opportunity to contribute to the team at Ferrovax Robotics.

Thank you for your consideration.

Sincerely,
[Your Name]

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "developing low-level systems"
- "constrained industrial sensor devices"
- "Proven ability to optimize performance"
- "through careful redesign of a sensor polling loop"
- "Skilled in writing efficient, reliable firmware for resource-limited embedded platforms"
- "well prepared to work on low-level systems programming for constrained hardware"
- "In my current work, I focus on writing efficient, reliable firmware for resource-limited devices"
- "through careful analysis and targeted code changes"
- "This experience gave me a strong practical understanding of the trade-offs involved in low-power embedded development"
- "I am drawn to the challenges of constrained hardware and enjoy working directly with low-level systems"

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary":"Embedded firmware engineer with 3 years of experience, primarily using Zig. My work has included sensor polling loops, and I reduced power draw by 30% in one such loop. I am interested in continuing to build embedded firmware and contributing to the Ferrovax Robotics team.","coverLetter":"Dear Hiring Team,\n\nI am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. I have 3 years of experience as an embedded firmware engineer, primarily working in Zig.\n\nMy work has included sensor polling loops. In one project, I reduced the power draw of a sensor polling loop by 30%.\n\nI would welcome the opportunity to contribute to the Ferrovax Robotics team and continue developing embedded firmware in Zig.\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]"}
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
F1: 3 years building embedded firmware in Zig for industrial sensor devices
F2: Optimized a sensor polling loop to cut power draw by 30%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Embedded firmware engineer with 3 years of experience, primarily using Zig. My work has included sensor polling loops, and I reduced power draw by 30% in one such loop. I am interested in continuing to build embedded firmware and contributing to the Ferrovax Robotics team.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. I have 3 years of experience as an embedded firmware engineer, primarily working in Zig.

My work has included sensor polling loops. In one project, I reduced the power draw of a sensor polling loop by 30%.

I would welcome the opportunity to contribute to the Ferrovax Robotics team and continue developing embedded firmware in Zig.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Embedded firmware engineer with 3 years of experience","supportedByFactId":"F1"},{"text":"primarily using Zig","supportedByFactId":"F1"},{"text":"My work has included sensor polling loops","supportedByFactId":"F2"},{"text":"I reduced power draw by 30% in one such loop","supportedByFactId":"F2"},{"text":"I have 3 years of experience as an embedded firmware engineer, primarily working in Zig","supportedByFactId":"F1"},{"text":"My work has included sensor polling loops","supportedByFactId":"F2"},{"text":"In one project, I reduced the power draw of a sensor polling loop by 30%","supportedByFactId":"F2"}]}
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
F1: 3 years building embedded firmware in Zig for industrial sensor devices
F2: Optimized a sensor polling loop to cut power draw by 30%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Embedded firmware engineer with 3 years of experience, primarily using Zig. My work has included sensor polling loops, and I reduced power draw by 30% in one such loop. I am interested in continuing to build embedded firmware and contributing to the Ferrovax Robotics team.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. I have 3 years of experience as an embedded firmware engineer, primarily working in Zig.

My work has included sensor polling loops. In one project, I reduced the power draw of a sensor polling loop by 30%.

I would welcome the opportunity to contribute to the Ferrovax Robotics team and continue developing embedded firmware in Zig.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Embedded firmware engineer with 3 years of experience, primarily using Zig.","supportedByFactId":"F1"},{"text":"My work has included sensor polling loops","supportedByFactId":"F2"},{"text":"I reduced power draw by 30% in one such loop","supportedByFactId":"F2"},{"text":"I have 3 years of experience as an embedded firmware engineer, primarily working in Zig.","supportedByFactId":"F1"},{"text":"My work has included sensor polling loops.","supportedByFactId":"F2"},{"text":"In one project, I reduced the power draw of a sensor polling loop by 30%.","supportedByFactId":"F2"}]}
```


### Step 7 — quality-score (LLM call)

**System prompt:**

```
Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}
```

**User prompt:**

```
RESUME SUMMARY:
Embedded firmware engineer with 3 years of experience, primarily using Zig. My work has included sensor polling loops, and I reduced power draw by 30% in one such loop. I am interested in continuing to build embedded firmware and contributing to the Ferrovax Robotics team.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. I have 3 years of experience as an embedded firmware engineer, primarily working in Zig.

My work has included sensor polling loops. In one project, I reduced the power draw of a sensor polling loop by 30%.

I would welcome the opportunity to contribute to the Ferrovax Robotics team and continue developing embedded firmware in Zig.

Thank you for your consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"score": 2, "notes": "The text is clear and professional but overly sparse and repetitive, with no tailoring to the company or role, making it feel robotic and unlikely to be sent as-is by a real person."}
```
