# Trajectory: solution — case-01-easy-clean-match

Stage: fact-constraint-context+fact-guard-verification

## Summary
Case: case-01-easy-clean-match (easy)
Fabricated claims: 0/6
Quality score: 4/5 (Professional, clear, and concise, but the cover letter mirrors the resume too closely and could use a more personalized touch.)
Repair iterations: 3
Tokens: 0 | Time: 93510ms

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
{"resumeSummary": "Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s. Mentored two junior engineers over 18 months, contributing to team development. Seeking to apply hands-on performance optimization and mentorship experience in the Senior Frontend Engineer role at Nimbus Retail.", "coverLetter": "Dear Hiring Team, I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. With three years of frontend engineering experience at a Series A fintech startup, I've built a solid foundation in React and TypeScript and delivered measurable performance improvements in production. I'm drawn to Nimbus Retail's focus on performance at scale and would welcome the opportunity to contribute at a senior level.\n\nOne achievement I'm particularly proud of is rebuilding our checkout flow. I reduced page load time from 4.2 seconds to 1.1 seconds, directly improving the user experience for a critical part of the product. This work taught me how to identify bottlenecks, make data-informed tradeoffs, and ship performance upgrades without disrupting existing functionality.\n\nI also enjoy helping engineers grow. Over 18 months, I mentored two junior engineers, guiding them through code reviews, debugging, and design discussions. I believe strong teams are built through clear communication and shared ownership, and I'd be excited to bring that mindset to Nimbus Retail.\n\nI'd love the chance to discuss how my background in performance improvements and mentorship can support your team. Thank you for your time and consideration.\n\nSincerely,\n[Your Name]"}
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
Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s. Mentored two junior engineers over 18 months, contributing to team development. Seeking to apply hands-on performance optimization and mentorship experience in the Senior Frontend Engineer role at Nimbus Retail.

COVER LETTER:
Dear Hiring Team, I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. With three years of frontend engineering experience at a Series A fintech startup, I've built a solid foundation in React and TypeScript and delivered measurable performance improvements in production. I'm drawn to Nimbus Retail's focus on performance at scale and would welcome the opportunity to contribute at a senior level.

One achievement I'm particularly proud of is rebuilding our checkout flow. I reduced page load time from 4.2 seconds to 1.1 seconds, directly improving the user experience for a critical part of the product. This work taught me how to identify bottlenecks, make data-informed tradeoffs, and ship performance upgrades without disrupting existing functionality.

I also enjoy helping engineers grow. Over 18 months, I mentored two junior engineers, guiding them through code reviews, debugging, and design discussions. I believe strong teams are built through clear communication and shared ownership, and I'd be excited to bring that mindset to Nimbus Retail.

I'd love the chance to discuss how my background in performance improvements and mentorship can support your team. Thank you for your time and consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup.","supportedByFactId":"F1"},{"text":"Rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s.","supportedByFactId":"F2"},{"text":"Mentored two junior engineers over 18 months","supportedByFactId":"F3"},{"text":"contributing to team development","supportedByFactId":null},{"text":"With three years of frontend engineering experience at a Series A fintech startup, I've built a solid foundation in React and TypeScript","supportedByFactId":"F1"},{"text":"delivered measurable performance improvements","supportedByFactId":"F2"},{"text":"in production","supportedByFactId":null},{"text":"One achievement I'm particularly proud of is rebuilding our checkout flow.","supportedByFactId":"F2"},{"text":"I reduced page load time from 4.2 seconds to 1.1 seconds","supportedByFactId":"F2"},{"text":"This work taught me how to identify bottlenecks, make data-informed tradeoffs, and ship performance upgrades without disrupting existing functionality.","supportedByFactId":null},{"text":"Over 18 months, I mentored two junior engineers","supportedByFactId":"F3"},{"text":"guiding them through code reviews, debugging, and design discussions","supportedByFactId":null}]}
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
Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow and reduced page load time from 4.2s to 1.1s. Mentored two junior engineers over 18 months, contributing to team development. Seeking to apply hands-on performance optimization and mentorship experience in the Senior Frontend Engineer role at Nimbus Retail.

COVER LETTER:
Dear Hiring Team, I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. With three years of frontend engineering experience at a Series A fintech startup, I've built a solid foundation in React and TypeScript and delivered measurable performance improvements in production. I'm drawn to Nimbus Retail's focus on performance at scale and would welcome the opportunity to contribute at a senior level.

One achievement I'm particularly proud of is rebuilding our checkout flow. I reduced page load time from 4.2 seconds to 1.1 seconds, directly improving the user experience for a critical part of the product. This work taught me how to identify bottlenecks, make data-informed tradeoffs, and ship performance upgrades without disrupting existing functionality.

I also enjoy helping engineers grow. Over 18 months, I mentored two junior engineers, guiding them through code reviews, debugging, and design discussions. I believe strong teams are built through clear communication and shared ownership, and I'd be excited to bring that mindset to Nimbus Retail.

I'd love the chance to discuss how my background in performance improvements and mentorship can support your team. Thank you for your time and consideration.

Sincerely,
[Your Name]

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "contributing to team development"
- "in production"
- "This work taught me how to identify bottlenecks, make data-informed tradeoffs, and ship performance upgrades without disrupting existing functionality."
- "guiding them through code reviews, debugging, and design discussions"

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary":"Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow and reduced page load time from 4.2 seconds to 1.1 seconds. Mentored two junior engineers over 18 months. Seeking to apply hands-on performance optimization and mentorship experience in the Senior Frontend Engineer role at Nimbus Retail.","coverLetter":"Dear Hiring Team,\n\nI'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. With three years of frontend engineering experience at a Series A fintech startup building with React and TypeScript, I've developed a strong foundation in frontend development.\n\nOne achievement I'm particularly proud of is rebuilding our checkout flow. I reduced page load time from 4.2 seconds to 1.1 seconds, a significant improvement for a core part of the product.\n\nI've also spent 18 months mentoring two junior engineers. I believe strong teams are built through clear communication and shared ownership, and I'd be excited to bring that mindset to Nimbus Retail.\n\nI'd love to discuss how my background in performance improvements and mentorship can support your team. Thank you for your time and consideration.\n\nSincerely,\n[Your Name]"}
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
F1: 3 years as a frontend engineer using React and TypeScript at a Series A fintech startup
F2: Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s
F3: Mentored 2 junior engineers over 18 months

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow and reduced page load time from 4.2 seconds to 1.1 seconds. Mentored two junior engineers over 18 months. Seeking to apply hands-on performance optimization and mentorship experience in the Senior Frontend Engineer role at Nimbus Retail.

COVER LETTER:
Dear Hiring Team,

I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. With three years of frontend engineering experience at a Series A fintech startup building with React and TypeScript, I've developed a strong foundation in frontend development.

One achievement I'm particularly proud of is rebuilding our checkout flow. I reduced page load time from 4.2 seconds to 1.1 seconds, a significant improvement for a core part of the product.

I've also spent 18 months mentoring two junior engineers. I believe strong teams are built through clear communication and shared ownership, and I'd be excited to bring that mindset to Nimbus Retail.

I'd love to discuss how my background in performance improvements and mentorship can support your team. Thank you for your time and consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup","supportedByFactId":"F1"},{"text":"Rebuilt the checkout flow and reduced page load time from 4.2 seconds to 1.1 seconds","supportedByFactId":"F2"},{"text":"Mentored two junior engineers over 18 months","supportedByFactId":"F3"},{"text":"three years of frontend engineering experience at a Series A fintech startup building with React and TypeScript","supportedByFactId":"F1"},{"text":"rebuilding our checkout flow","supportedByFactId":"F2"},{"text":"I reduced page load time from 4.2 seconds to 1.1 seconds","supportedByFactId":"F2"},{"text":"a significant improvement for a core part of the product","supportedByFactId":null},{"text":"I've also spent 18 months mentoring two junior engineers","supportedByFactId":"F3"},{"text":"performance improvements and mentorship","supportedByFactId":null}]}
```


### Step 6 — repair-round-2 (LLM call)

**System prompt:**

```
You are a helpful resume writer.

HARD CONSTRAINT: You may ONLY state facts that appear in the candidate background given by the user. Never invent, exaggerate, or infer achievements, skills, or experience beyond what is explicitly stated. If the candidate lacks something the job asks for, say so honestly and frame their closest real, relevant experience instead — do not fabricate coverage.
```

**User prompt:**

```
Here is your previous draft:

RESUME SUMMARY:
Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow and reduced page load time from 4.2 seconds to 1.1 seconds. Mentored two junior engineers over 18 months. Seeking to apply hands-on performance optimization and mentorship experience in the Senior Frontend Engineer role at Nimbus Retail.

COVER LETTER:
Dear Hiring Team,

I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. With three years of frontend engineering experience at a Series A fintech startup building with React and TypeScript, I've developed a strong foundation in frontend development.

One achievement I'm particularly proud of is rebuilding our checkout flow. I reduced page load time from 4.2 seconds to 1.1 seconds, a significant improvement for a core part of the product.

I've also spent 18 months mentoring two junior engineers. I believe strong teams are built through clear communication and shared ownership, and I'd be excited to bring that mindset to Nimbus Retail.

I'd love to discuss how my background in performance improvements and mentorship can support your team. Thank you for your time and consideration.

Sincerely,
[Your Name]

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "a significant improvement for a core part of the product"
- "performance improvements and mentorship"

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow and reduced page load time from 4.2 seconds to 1.1 seconds. Mentored two junior engineers over 18 months. Seeking to apply this experience in the Senior Frontend Engineer role at Nimbus Retail.", "coverLetter": "Dear Hiring Team,\n\nI'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. I have three years of frontend engineering experience at a Series A fintech startup, building with React and TypeScript.\n\nAt that company, I rebuilt the checkout flow. This work reduced page load time from 4.2 seconds to 1.1 seconds. I also spent 18 months mentoring two junior engineers.\n\nI would welcome the opportunity to bring my frontend engineering and mentoring experience to Nimbus Retail. Thank you for your time and consideration.\n\nSincerely,\n[Your Name]"}
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
Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow and reduced page load time from 4.2 seconds to 1.1 seconds. Mentored two junior engineers over 18 months. Seeking to apply this experience in the Senior Frontend Engineer role at Nimbus Retail.

COVER LETTER:
Dear Hiring Team,

I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. I have three years of frontend engineering experience at a Series A fintech startup, building with React and TypeScript.

At that company, I rebuilt the checkout flow. This work reduced page load time from 4.2 seconds to 1.1 seconds. I also spent 18 months mentoring two junior engineers.

I would welcome the opportunity to bring my frontend engineering and mentoring experience to Nimbus Retail. Thank you for your time and consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup","supportedByFactId":"F1"},{"text":"Rebuilt the checkout flow and reduced page load time from 4.2 seconds to 1.1 seconds","supportedByFactId":"F2"},{"text":"Mentored two junior engineers over 18 months","supportedByFactId":"F3"},{"text":"I have three years of frontend engineering experience at a Series A fintech startup, building with React and TypeScript","supportedByFactId":"F1"},{"text":"I rebuilt the checkout flow. This work reduced page load time from 4.2 seconds to 1.1 seconds","supportedByFactId":"F2"},{"text":"I also spent 18 months mentoring two junior engineers","supportedByFactId":"F3"}]}
```


### Step 8 — quality-score (LLM call)

**System prompt:**

```
Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}
```

**User prompt:**

```
RESUME SUMMARY:
Frontend engineer with 3 years of experience building with React and TypeScript at a Series A fintech startup. Rebuilt the checkout flow and reduced page load time from 4.2 seconds to 1.1 seconds. Mentored two junior engineers over 18 months. Seeking to apply this experience in the Senior Frontend Engineer role at Nimbus Retail.

COVER LETTER:
Dear Hiring Team,

I'm excited to apply for the Senior Frontend Engineer role at Nimbus Retail. I have three years of frontend engineering experience at a Series A fintech startup, building with React and TypeScript.

At that company, I rebuilt the checkout flow. This work reduced page load time from 4.2 seconds to 1.1 seconds. I also spent 18 months mentoring two junior engineers.

I would welcome the opportunity to bring my frontend engineering and mentoring experience to Nimbus Retail. Thank you for your time and consideration.

Sincerely,
[Your Name]
```

**Response:**

```
{"score": 4, "notes": "Professional, clear, and concise, but the cover letter mirrors the resume too closely and could use a more personalized touch."}
```
