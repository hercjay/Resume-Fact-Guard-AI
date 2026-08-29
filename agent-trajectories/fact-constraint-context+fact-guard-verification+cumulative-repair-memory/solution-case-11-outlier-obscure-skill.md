# Trajectory: solution — case-11-outlier-obscure-skill

Stage: fact-constraint-context+fact-guard-verification+cumulative-repair-memory

## Summary
Case: case-11-outlier-obscure-skill (outlier) — HARD CASE: 'Zig' isn't in the requirement-matcher's keyword list, so the tool will find zero signals here. Tests graceful degradation for niche/obscure domains the deterministic tool wasn't built to recognize — a good test of whether the LLM's own judgment still carries the case when the tool contributes nothing.
Fabricated claims: 0/4
Quality score: 2/5 (The content is clear but overly brief and repetitive, lacking a natural, personalized tone that would make it ready to send as-is.)
Repair iterations: 3
Tokens: 0 | Time: 139551ms

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
{"resumeSummary": "Embedded systems engineer with 3 years of experience building embedded firmware in Zig for industrial sensor devices. Developed and maintained low-level firmware for constrained hardware, with a focus on efficient, reliable operation. Optimized a sensor polling loop to reduce power draw by 30%, demonstrating practical skill in power-sensitive embedded design. Seeking to apply hands-on low-level systems programming experience to embedded systems development at Ferrovax Robotics.", "coverLetter": "Dear Hiring Team,\n\nI am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. With three years of experience building embedded firmware in Zig for industrial sensor devices, I have hands-on expertise in low-level systems programming for constrained hardware.\n\nIn my current work, I have focused on writing efficient firmware that runs reliably within the limits of resource-constrained devices. One achievement I am particularly proud of is optimizing a sensor polling loop, which reduced power draw by 30% without sacrificing performance. This required close attention to hardware behavior and careful, low-level code design.\n\nI am drawn to Ferrovax Robotics because of your focus on advanced embedded systems, and I believe my background in Zig and industrial sensing aligns well with your needs. I would welcome the opportunity to contribute to your team and can be reached at your convenience.\n\nThank you for your time and consideration.\n\nSincerely,\n[Your Name]"}
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
F1: 3 years building embedded firmware in Zig for industrial sensor devices
F2: Optimized a sensor polling loop to cut power draw by 30%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Embedded systems engineer with 3 years of experience building embedded firmware in Zig for industrial sensor devices. Developed and maintained low-level firmware for constrained hardware, with a focus on efficient, reliable operation. Optimized a sensor polling loop to reduce power draw by 30%, demonstrating practical skill in power-sensitive embedded design. Seeking to apply hands-on low-level systems programming experience to embedded systems development at Ferrovax Robotics.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. With three years of experience building embedded firmware in Zig for industrial sensor devices, I have hands-on expertise in low-level systems programming for constrained hardware.

In my current work, I have focused on writing efficient firmware that runs reliably within the limits of resource-constrained devices. One achievement I am particularly proud of is optimizing a sensor polling loop, which reduced power draw by 30% without sacrificing performance. This required close attention to hardware behavior and careful, low-level code design.

I am drawn to Ferrovax Robotics because of your focus on advanced embedded systems, and I believe my background in Zig and industrial sensing aligns well with your needs. I would welcome the opportunity to contribute to your team and can be reached at your convenience.

Thank you for your time and consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Embedded systems engineer with 3 years of experience building embedded firmware in Zig for industrial sensor devices.","supportedByFactId":"F1"},{"text":"Developed and maintained low-level firmware for constrained hardware, with a focus on efficient, reliable operation.","supportedByFactId":null},{"text":"Optimized a sensor polling loop to reduce power draw by 30%","supportedByFactId":"F2"},{"text":"demonstrating practical skill in power-sensitive embedded design","supportedByFactId":null},{"text":"Seeking to apply hands-on low-level systems programming experience to embedded systems development at Ferrovax Robotics.","supportedByFactId":null},{"text":"With three years of experience building embedded firmware in Zig for industrial sensor devices","supportedByFactId":"F1"},{"text":"I have hands-on expertise in low-level systems programming for constrained hardware.","supportedByFactId":null},{"text":"In my current work, I have focused on writing efficient firmware that runs reliably within the limits of resource-constrained devices.","supportedByFactId":null},{"text":"optimizing a sensor polling loop","supportedByFactId":"F2"},{"text":"reduced power draw by 30%","supportedByFactId":"F2"},{"text":"without sacrificing performance","supportedByFactId":null},{"text":"This required close attention to hardware behavior and careful, low-level code design.","supportedByFactId":null},{"text":"my background in Zig and industrial sensing","supportedByFactId":"F1"},{"text":"my background in Zig and industrial sensing aligns well with your needs","supportedByFactId":null}]}
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
Embedded systems engineer with 3 years of experience building embedded firmware in Zig for industrial sensor devices. Developed and maintained low-level firmware for constrained hardware, with a focus on efficient, reliable operation. Optimized a sensor polling loop to reduce power draw by 30%, demonstrating practical skill in power-sensitive embedded design. Seeking to apply hands-on low-level systems programming experience to embedded systems development at Ferrovax Robotics.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. With three years of experience building embedded firmware in Zig for industrial sensor devices, I have hands-on expertise in low-level systems programming for constrained hardware.

In my current work, I have focused on writing efficient firmware that runs reliably within the limits of resource-constrained devices. One achievement I am particularly proud of is optimizing a sensor polling loop, which reduced power draw by 30% without sacrificing performance. This required close attention to hardware behavior and careful, low-level code design.

I am drawn to Ferrovax Robotics because of your focus on advanced embedded systems, and I believe my background in Zig and industrial sensing aligns well with your needs. I would welcome the opportunity to contribute to your team and can be reached at your convenience.

Thank you for your time and consideration.

Sincerely,
[Your Name]

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "Developed and maintained low-level firmware for constrained hardware, with a focus on efficient, reliable operation."
- "demonstrating practical skill in power-sensitive embedded design"
- "Seeking to apply hands-on low-level systems programming experience to embedded systems development at Ferrovax Robotics."
- "I have hands-on expertise in low-level systems programming for constrained hardware."
- "In my current work, I have focused on writing efficient firmware that runs reliably within the limits of resource-constrained devices."
- "without sacrificing performance"
- "This required close attention to hardware behavior and careful, low-level code design."
- "my background in Zig and industrial sensing aligns well with your needs"

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Embedded systems engineer with 3 years of experience building embedded firmware in Zig for industrial sensor devices. Optimized a sensor polling loop to reduce power draw by 30%. Interested in bringing this experience to embedded systems development at Ferrovax Robotics.", "coverLetter": "Dear Hiring Team,\n\nI am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. I have three years of experience building embedded firmware in Zig for industrial sensor devices.\n\nIn my current work, I optimized a sensor polling loop to reduce power draw by 30%. This is an achievement I am pleased to share because it reflects my hands-on work with embedded firmware.\n\nI am interested in Ferrovax Robotics and would welcome the opportunity to contribute to your team. Thank you for your time and consideration.\n\nSincerely,\n[Your Name]"}
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
Embedded systems engineer with 3 years of experience building embedded firmware in Zig for industrial sensor devices. Optimized a sensor polling loop to reduce power draw by 30%. Interested in bringing this experience to embedded systems development at Ferrovax Robotics.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. I have three years of experience building embedded firmware in Zig for industrial sensor devices.

In my current work, I optimized a sensor polling loop to reduce power draw by 30%. This is an achievement I am pleased to share because it reflects my hands-on work with embedded firmware.

I am interested in Ferrovax Robotics and would welcome the opportunity to contribute to your team. Thank you for your time and consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Embedded systems engineer","supportedByFactId":null},{"text":"3 years of experience building embedded firmware in Zig for industrial sensor devices","supportedByFactId":"F1"},{"text":"Optimized a sensor polling loop to reduce power draw by 30%","supportedByFactId":"F2"},{"text":"I have three years of experience building embedded firmware in Zig for industrial sensor devices","supportedByFactId":"F1"},{"text":"In my current work","supportedByFactId":null},{"text":"I optimized a sensor polling loop to reduce power draw by 30%","supportedByFactId":"F2"},{"text":"this achievement reflects my hands-on work with embedded firmware","supportedByFactId":"F1"}]}
```


### Step 7 — repair-round-2 (LLM call)

**System prompt:**

```
You are a helpful resume writer.

HARD CONSTRAINT: You may ONLY state facts that appear in the candidate background given by the user. Never invent, exaggerate, or infer achievements, skills, or experience beyond what is explicitly stated. If the candidate lacks something the job asks for, say so honestly and frame their closest real, relevant experience instead — do not fabricate coverage.
```

**User prompt:**

```
Here is your previous draft:

RESUME SUMMARY:
Embedded systems engineer with 3 years of experience building embedded firmware in Zig for industrial sensor devices. Optimized a sensor polling loop to reduce power draw by 30%. Interested in bringing this experience to embedded systems development at Ferrovax Robotics.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. I have three years of experience building embedded firmware in Zig for industrial sensor devices.

In my current work, I optimized a sensor polling loop to reduce power draw by 30%. This is an achievement I am pleased to share because it reflects my hands-on work with embedded firmware.

I am interested in Ferrovax Robotics and would welcome the opportunity to contribute to your team. Thank you for your time and consideration.

Sincerely,
[Your Name]

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "Developed and maintained low-level firmware for constrained hardware, with a focus on efficient, reliable operation."
- "demonstrating practical skill in power-sensitive embedded design"
- "Seeking to apply hands-on low-level systems programming experience to embedded systems development at Ferrovax Robotics."
- "I have hands-on expertise in low-level systems programming for constrained hardware."
- "In my current work, I have focused on writing efficient firmware that runs reliably within the limits of resource-constrained devices."
- "without sacrificing performance"
- "This required close attention to hardware behavior and careful, low-level code design."
- "my background in Zig and industrial sensing aligns well with your needs"
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "Embedded systems engineer"
- "In my current work"

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Three years of experience building embedded firmware in Zig for industrial sensor devices. Optimized a sensor polling loop to reduce power draw by 30%. Interested in bringing this experience to embedded systems development at Ferrovax Robotics.", "coverLetter": "Dear Hiring Team,\n\nI am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. I have three years of experience building embedded firmware in Zig for industrial sensor devices.\n\nDuring that work, I optimized a sensor polling loop to reduce power draw by 30%. I am interested in applying this experience to embedded systems development at Ferrovax Robotics.\n\nThank you for your time and consideration.\n\nSincerely,\n[Your Name]"}
```


### Step 8 — fact-guard-verify (LLM call)

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
Three years of experience building embedded firmware in Zig for industrial sensor devices. Optimized a sensor polling loop to reduce power draw by 30%. Interested in bringing this experience to embedded systems development at Ferrovax Robotics.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. I have three years of experience building embedded firmware in Zig for industrial sensor devices.

During that work, I optimized a sensor polling loop to reduce power draw by 30%. I am interested in applying this experience to embedded systems development at Ferrovax Robotics.

Thank you for your time and consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Three years of experience building embedded firmware in Zig for industrial sensor devices.","supportedByFactId":"F1"},{"text":"Optimized a sensor polling loop to reduce power draw by 30%.","supportedByFactId":"F2"},{"text":"I have three years of experience building embedded firmware in Zig for industrial sensor devices.","supportedByFactId":"F1"},{"text":"During that work, I optimized a sensor polling loop to reduce power draw by 30%.","supportedByFactId":"F2"}]}
```


### Step 9 — quality-score (LLM call)

**System prompt:**

```
Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}
```

**User prompt:**

```
RESUME SUMMARY:
Three years of experience building embedded firmware in Zig for industrial sensor devices. Optimized a sensor polling loop to reduce power draw by 30%. Interested in bringing this experience to embedded systems development at Ferrovax Robotics.

COVER LETTER:
Dear Hiring Team,

I am writing to apply for the Embedded Systems Engineer position at Ferrovax Robotics. I have three years of experience building embedded firmware in Zig for industrial sensor devices.

During that work, I optimized a sensor polling loop to reduce power draw by 30%. I am interested in applying this experience to embedded systems development at Ferrovax Robotics.

Thank you for your time and consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"score": 2, "notes": "The content is clear but overly brief and repetitive, lacking a natural, personalized tone that would make it ready to send as-is."}
```
