# Trajectory: solution — case-02-easy-design

Stage: fact-constraint-context+fact-guard-verification+cumulative-repair-memory

## Summary
Case: case-02-easy-design (easy)
Fabricated claims: 0/6
Quality score: 3/5 (Clear and professional with strong metrics, but the cover letter feels formulaic and lacks a natural, personalized touch, so most would edit before sending.)
Repair iterations: 3
Tokens: 0 | Time: 60262ms

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
- 5 years product design experience, Figma and design systems
- Led the design system rebuild adopted by 4 product teams
- Ran 12 user research sessions for a mobile onboarding redesign, which improved activation rate by 9%

Job posting:
Title: Senior Product Designer
Company: Fieldnote
Description: Senior product designer to own our design system and drive user research for our mobile app onboarding experience.

Write a tailored resume summary and a short cover letter for this candidate applying to this job.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Product designer with 5 years of experience in Figma and design systems. Led a design system rebuild that was adopted by 4 product teams, supporting consistent, scalable product work. Conducted 12 user research sessions to inform a mobile onboarding redesign that improved activation rate by 9%. Experienced in combining design system ownership with research-driven mobile onboarding improvements.", "coverLetter": "Dear Hiring Team,\n\nI’m excited to apply for the Senior Product Designer role at Fieldnote. With 5 years of product design experience focused on Figma and design systems, I’ve spent much of my career building and maintaining the shared foundations that let product teams move quickly and consistently.\n\nIn my recent work, I led a design system rebuild that was adopted by 4 product teams, giving me hands-on experience owning a system end to end. I also ran 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%. That combination—owning the design system while driving user research for onboarding—maps directly to the work you’re hiring for.\n\nI’d welcome the chance to bring that experience to Fieldnote and help strengthen both your design system and mobile onboarding experience.\n\nThank you for your consideration."}
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
F1: 5 years product design experience, Figma and design systems
F2: Led the design system rebuild adopted by 4 product teams
F3: Ran 12 user research sessions for a mobile onboarding redesign, which improved activation rate by 9%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Product designer with 5 years of experience in Figma and design systems. Led a design system rebuild that was adopted by 4 product teams, supporting consistent, scalable product work. Conducted 12 user research sessions to inform a mobile onboarding redesign that improved activation rate by 9%. Experienced in combining design system ownership with research-driven mobile onboarding improvements.

COVER LETTER:
Dear Hiring Team,

I’m excited to apply for the Senior Product Designer role at Fieldnote. With 5 years of product design experience focused on Figma and design systems, I’ve spent much of my career building and maintaining the shared foundations that let product teams move quickly and consistently.

In my recent work, I led a design system rebuild that was adopted by 4 product teams, giving me hands-on experience owning a system end to end. I also ran 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%. That combination—owning the design system while driving user research for onboarding—maps directly to the work you’re hiring for.

I’d welcome the chance to bring that experience to Fieldnote and help strengthen both your design system and mobile onboarding experience.

Thank you for your consideration.
```

**Response:**

```
{"claims":[{"text":"Product designer with 5 years of experience in Figma and design systems","supportedByFactId":"F1"},{"text":"Led a design system rebuild that was adopted by 4 product teams","supportedByFactId":"F2"},{"text":"Conducted 12 user research sessions to inform a mobile onboarding redesign that improved activation rate by 9%","supportedByFactId":"F3"},{"text":"Experienced in combining design system ownership with research-driven mobile onboarding improvements","supportedByFactId":null},{"text":"With 5 years of product design experience focused on Figma and design systems","supportedByFactId":"F1"},{"text":"I’ve spent much of my career building and maintaining the shared foundations that let product teams move quickly and consistently","supportedByFactId":null},{"text":"In my recent work, I led a design system rebuild that was adopted by 4 product teams","supportedByFactId":"F2"},{"text":"hands-on experience owning a system end to end","supportedByFactId":null},{"text":"I also ran 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%","supportedByFactId":"F3"}]}
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
Product designer with 5 years of experience in Figma and design systems. Led a design system rebuild that was adopted by 4 product teams, supporting consistent, scalable product work. Conducted 12 user research sessions to inform a mobile onboarding redesign that improved activation rate by 9%. Experienced in combining design system ownership with research-driven mobile onboarding improvements.

COVER LETTER:
Dear Hiring Team,

I’m excited to apply for the Senior Product Designer role at Fieldnote. With 5 years of product design experience focused on Figma and design systems, I’ve spent much of my career building and maintaining the shared foundations that let product teams move quickly and consistently.

In my recent work, I led a design system rebuild that was adopted by 4 product teams, giving me hands-on experience owning a system end to end. I also ran 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%. That combination—owning the design system while driving user research for onboarding—maps directly to the work you’re hiring for.

I’d welcome the chance to bring that experience to Fieldnote and help strengthen both your design system and mobile onboarding experience.

Thank you for your consideration.

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "Experienced in combining design system ownership with research-driven mobile onboarding improvements"
- "I’ve spent much of my career building and maintaining the shared foundations that let product teams move quickly and consistently"
- "hands-on experience owning a system end to end"

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary":"Product designer with 5 years of experience in Figma and design systems. Led a design system rebuild that was adopted by 4 product teams, supporting consistent, scalable product work. Conducted 12 user research sessions that informed a mobile onboarding redesign, which improved activation rate by 9%.","coverLetter":"Dear Hiring Team,\n\nI’m excited to apply for the Senior Product Designer role at Fieldnote. I have 5 years of product design experience focused on Figma and design systems.\n\nIn my recent work, I led a design system rebuild that was adopted by 4 product teams. I also conducted 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%.\n\nI would welcome the chance to bring this background to Fieldnote and contribute to your design system and mobile onboarding work.\n\nThank you for your consideration."}
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
F1: 5 years product design experience, Figma and design systems
F2: Led the design system rebuild adopted by 4 product teams
F3: Ran 12 user research sessions for a mobile onboarding redesign, which improved activation rate by 9%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Product designer with 5 years of experience in Figma and design systems. Led a design system rebuild that was adopted by 4 product teams, supporting consistent, scalable product work. Conducted 12 user research sessions that informed a mobile onboarding redesign, which improved activation rate by 9%.

COVER LETTER:
Dear Hiring Team,

I’m excited to apply for the Senior Product Designer role at Fieldnote. I have 5 years of product design experience focused on Figma and design systems.

In my recent work, I led a design system rebuild that was adopted by 4 product teams. I also conducted 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%.

I would welcome the chance to bring this background to Fieldnote and contribute to your design system and mobile onboarding work.

Thank you for your consideration.
```

**Response:**

```
{"claims":[{"text":"Product designer with 5 years of experience in Figma and design systems.","supportedByFactId":"F1"},{"text":"Led a design system rebuild that was adopted by 4 product teams","supportedByFactId":"F2"},{"text":"supporting consistent, scalable product work","supportedByFactId":null},{"text":"Conducted 12 user research sessions that informed a mobile onboarding redesign, which improved activation rate by 9%.","supportedByFactId":"F3"},{"text":"I have 5 years of product design experience focused on Figma and design systems.","supportedByFactId":"F1"},{"text":"In my recent work, I led a design system rebuild that was adopted by 4 product teams.","supportedByFactId":"F2"},{"text":"I also conducted 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%.","supportedByFactId":"F3"}]}
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
Product designer with 5 years of experience in Figma and design systems. Led a design system rebuild that was adopted by 4 product teams, supporting consistent, scalable product work. Conducted 12 user research sessions that informed a mobile onboarding redesign, which improved activation rate by 9%.

COVER LETTER:
Dear Hiring Team,

I’m excited to apply for the Senior Product Designer role at Fieldnote. I have 5 years of product design experience focused on Figma and design systems.

In my recent work, I led a design system rebuild that was adopted by 4 product teams. I also conducted 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%.

I would welcome the chance to bring this background to Fieldnote and contribute to your design system and mobile onboarding work.

Thank you for your consideration.

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "Experienced in combining design system ownership with research-driven mobile onboarding improvements"
- "I’ve spent much of my career building and maintaining the shared foundations that let product teams move quickly and consistently"
- "hands-on experience owning a system end to end"
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "supporting consistent, scalable product work"

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary":"Product designer with 5 years of experience in Figma and design systems. Led a design system rebuild that was adopted by 4 product teams. Conducted 12 user research sessions that informed a mobile onboarding redesign, which improved activation rate by 9%.","coverLetter":"Dear Hiring Team,\n\nI’m excited to apply for the Senior Product Designer role at Fieldnote. I have 5 years of product design experience focused on Figma and design systems.\n\nIn my recent work, I led a design system rebuild that was adopted by 4 product teams. I also conducted 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%.\n\nI would welcome the chance to bring this background to Fieldnote.\n\nThank you for your consideration."}
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
F1: 5 years product design experience, Figma and design systems
F2: Led the design system rebuild adopted by 4 product teams
F3: Ran 12 user research sessions for a mobile onboarding redesign, which improved activation rate by 9%

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Product designer with 5 years of experience in Figma and design systems. Led a design system rebuild that was adopted by 4 product teams. Conducted 12 user research sessions that informed a mobile onboarding redesign, which improved activation rate by 9%.

COVER LETTER:
Dear Hiring Team,

I’m excited to apply for the Senior Product Designer role at Fieldnote. I have 5 years of product design experience focused on Figma and design systems.

In my recent work, I led a design system rebuild that was adopted by 4 product teams. I also conducted 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%.

I would welcome the chance to bring this background to Fieldnote.

Thank you for your consideration.
```

**Response:**

```
{"claims":[{"text":"Product designer with 5 years of experience in Figma and design systems.","supportedByFactId":"F1"},{"text":"Led a design system rebuild that was adopted by 4 product teams.","supportedByFactId":"F2"},{"text":"Conducted 12 user research sessions that informed a mobile onboarding redesign, which improved activation rate by 9%.","supportedByFactId":"F3"},{"text":"I have 5 years of product design experience focused on Figma and design systems.","supportedByFactId":"F1"},{"text":"In my recent work, I led a design system rebuild that was adopted by 4 product teams.","supportedByFactId":"F2"},{"text":"I also conducted 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%.","supportedByFactId":"F3"}]}
```


### Step 9 — quality-score (LLM call)

**System prompt:**

```
Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}
```

**User prompt:**

```
RESUME SUMMARY:
Product designer with 5 years of experience in Figma and design systems. Led a design system rebuild that was adopted by 4 product teams. Conducted 12 user research sessions that informed a mobile onboarding redesign, which improved activation rate by 9%.

COVER LETTER:
Dear Hiring Team,

I’m excited to apply for the Senior Product Designer role at Fieldnote. I have 5 years of product design experience focused on Figma and design systems.

In my recent work, I led a design system rebuild that was adopted by 4 product teams. I also conducted 12 user research sessions for a mobile onboarding redesign, and the resulting changes improved activation rate by 9%.

I would welcome the chance to bring this background to Fieldnote.

Thank you for your consideration.
```

**Response:**

```
{"score": 3, "notes": "Clear and professional with strong metrics, but the cover letter feels formulaic and lacks a natural, personalized touch, so most would edit before sending."}
```
