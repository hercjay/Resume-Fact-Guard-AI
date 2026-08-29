# Trajectory: solution — case-03-medium-partial-overlap

Stage: fact-constraint-context+fact-guard-verification

## Summary
Case: case-03-medium-partial-overlap (medium)
Fabricated claims: 0/5
Quality score: 4/5 (Clear, honest, and professional, though it slightly undersells the candidate's strengths and could be more confident in tone.)
Repair iterations: 2
Tokens: 0 | Time: 67469ms

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
- 2 years as a backend engineer, primarily Node.js and PostgreSQL
- Designed a rate-limiting middleware used across 6 internal services
- Basic familiarity with Docker, used it to containerize one side project
- No experience with message queues (Kafka, RabbitMQ, SQS, etc.)

Job posting:
Title: Backend Engineer
Company: Ledgerly
Description: Backend engineer role focused on Node.js services, PostgreSQL, Docker-based deployment, and event-driven architecture using a message queue.

Write a tailored resume summary and a short cover letter for this candidate applying to this job.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{"resumeSummary": "Backend engineer with 2 years of experience building Node.js services and working with PostgreSQL. Designed and implemented a rate-limiting middleware now used across 6 internal services, demonstrating practical skill in building reusable backend components. Has basic Docker experience, including containerizing a side project, and is comfortable with Docker-based development workflows. Currently expanding into event-driven architecture and message queues, with a strong foundation in backend fundamentals to ramp quickly.", "coverLetter": "Dear Hiring Team,\n\nI'm excited to apply for the Backend Engineer role at Ledgerly. With two years of backend engineering experience focused on Node.js and PostgreSQL, I'm drawn to this role's emphasis on building reliable services and working with modern deployment and event-driven systems.\n\nIn my current work, I designed a rate-limiting middleware that is now used across six internal services. That project gave me hands-on experience creating production-grade backend components, thinking carefully about reliability and cross-service reuse, and collaborating with other engineering teams. I also work regularly with PostgreSQL and have basic Docker experience, including containerizing a side project.\n\nI don't yet have production experience with message queues like Kafka, RabbitMQ, or SQS, but I'm actively building toward that skill and would bring strong backend fundamentals, a collaborative approach, and a genuine eagerness to learn Ledgerly's event-driven architecture.\n\nI'd welcome the chance to talk about how my Node.js and PostgreSQL background can contribute to your team.\n\nBest regards,\n[Your Name]"}
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
F1: 2 years as a backend engineer, primarily Node.js and PostgreSQL
F2: Designed a rate-limiting middleware used across 6 internal services
F3: Basic familiarity with Docker, used it to containerize one side project
F4: No experience with message queues (Kafka, RabbitMQ, SQS, etc.)

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Backend engineer with 2 years of experience building Node.js services and working with PostgreSQL. Designed and implemented a rate-limiting middleware now used across 6 internal services, demonstrating practical skill in building reusable backend components. Has basic Docker experience, including containerizing a side project, and is comfortable with Docker-based development workflows. Currently expanding into event-driven architecture and message queues, with a strong foundation in backend fundamentals to ramp quickly.

COVER LETTER:
Dear Hiring Team,

I'm excited to apply for the Backend Engineer role at Ledgerly. With two years of backend engineering experience focused on Node.js and PostgreSQL, I'm drawn to this role's emphasis on building reliable services and working with modern deployment and event-driven systems.

In my current work, I designed a rate-limiting middleware that is now used across six internal services. That project gave me hands-on experience creating production-grade backend components, thinking carefully about reliability and cross-service reuse, and collaborating with other engineering teams. I also work regularly with PostgreSQL and have basic Docker experience, including containerizing a side project.

I don't yet have production experience with message queues like Kafka, RabbitMQ, or SQS, but I'm actively building toward that skill and would bring strong backend fundamentals, a collaborative approach, and a genuine eagerness to learn Ledgerly's event-driven architecture.

I'd welcome the chance to talk about how my Node.js and PostgreSQL background can contribute to your team.

Best regards,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Backend engineer with 2 years of experience building Node.js services and working with PostgreSQL","supportedByFactId":"F1"},{"text":"Designed a rate-limiting middleware now used across 6 internal services","supportedByFactId":"F2"},{"text":"implemented a rate-limiting middleware now used across 6 internal services","supportedByFactId":null},{"text":"demonstrating practical skill in building reusable backend components","supportedByFactId":null},{"text":"Has basic Docker experience, including containerizing a side project","supportedByFactId":"F3"},{"text":"is comfortable with Docker-based development workflows","supportedByFactId":null},{"text":"Currently expanding into event-driven architecture and message queues","supportedByFactId":null},{"text":"strong foundation in backend fundamentals to ramp quickly","supportedByFactId":null},{"text":"With two years of backend engineering experience focused on Node.js and PostgreSQL","supportedByFactId":"F1"},{"text":"In my current work, I designed a rate-limiting middleware that is now used across six internal services","supportedByFactId":"F2"},{"text":"That project gave me hands-on experience creating production-grade backend components","supportedByFactId":null},{"text":"thinking carefully about reliability and cross-service reuse","supportedByFactId":null},{"text":"collaborating with other engineering teams","supportedByFactId":null},{"text":"I also work regularly with PostgreSQL","supportedByFactId":"F1"},{"text":"have basic Docker experience, including containerizing a side project","supportedByFactId":"F3"},{"text":"I don't yet have production experience with message queues like Kafka, RabbitMQ, or SQS","supportedByFactId":"F4"},{"text":"but I'm actively building toward that skill","supportedByFactId":null},{"text":"would bring strong backend fundamentals, a collaborative approach, and a genuine eagerness to learn Ledgerly's event-driven architecture","supportedByFactId":null},{"text":"my Node.js and PostgreSQL background can contribute","supportedByFactId":"F1"}]}
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
Backend engineer with 2 years of experience building Node.js services and working with PostgreSQL. Designed and implemented a rate-limiting middleware now used across 6 internal services, demonstrating practical skill in building reusable backend components. Has basic Docker experience, including containerizing a side project, and is comfortable with Docker-based development workflows. Currently expanding into event-driven architecture and message queues, with a strong foundation in backend fundamentals to ramp quickly.

COVER LETTER:
Dear Hiring Team,

I'm excited to apply for the Backend Engineer role at Ledgerly. With two years of backend engineering experience focused on Node.js and PostgreSQL, I'm drawn to this role's emphasis on building reliable services and working with modern deployment and event-driven systems.

In my current work, I designed a rate-limiting middleware that is now used across six internal services. That project gave me hands-on experience creating production-grade backend components, thinking carefully about reliability and cross-service reuse, and collaborating with other engineering teams. I also work regularly with PostgreSQL and have basic Docker experience, including containerizing a side project.

I don't yet have production experience with message queues like Kafka, RabbitMQ, or SQS, but I'm actively building toward that skill and would bring strong backend fundamentals, a collaborative approach, and a genuine eagerness to learn Ledgerly's event-driven architecture.

I'd welcome the chance to talk about how my Node.js and PostgreSQL background can contribute to your team.

Best regards,
[Your Name]

Issues found that must be fixed:
[fact-guard-verification] The following claims are NOT supported by any candidate fact and must be removed or corrected:
- "implemented a rate-limiting middleware now used across 6 internal services"
- "demonstrating practical skill in building reusable backend components"
- "is comfortable with Docker-based development workflows"
- "Currently expanding into event-driven architecture and message queues"
- "strong foundation in backend fundamentals to ramp quickly"
- "That project gave me hands-on experience creating production-grade backend components"
- "thinking carefully about reliability and cross-service reuse"
- "collaborating with other engineering teams"
- "but I'm actively building toward that skill"
- "would bring strong backend fundamentals, a collaborative approach, and a genuine eagerness to learn Ledgerly's event-driven architecture"

Rewrite it to address every issue above, while staying consistent with all prior constraints and facts.

Respond ONLY with valid JSON, no markdown fences, no extra prose, in exactly this shape:
{"resumeSummary": "<a tailored 3-5 sentence resume summary>", "coverLetter": "<a complete, short cover letter, 3-4 short paragraphs>"}
```

**Response:**

```
{
  "resumeSummary": "Backend engineer with 2 years of experience building Node.js services and working with PostgreSQL. Has basic Docker experience, including containerizing a side project. Seeking a Backend Engineer role where this hands-on experience can be applied.",
  "coverLetter": "Dear Hiring Team,\n\nI'm excited to apply for the Backend Engineer role at Ledgerly. My background includes two years of backend engineering experience building Node.js services and working with PostgreSQL.\n\nI also have basic Docker experience, including containerizing a side project.\n\nI want to be transparent: I do not yet have production experience with message queues like Kafka, RabbitMQ, or SQS. Ledgerly's event-driven work is a meaningful opportunity to build in that area, and I would welcome the chance to discuss how my Node.js and PostgreSQL experience could contribute to the team.\n\nBest regards,\n[Your Name]"
}
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
F1: 2 years as a backend engineer, primarily Node.js and PostgreSQL
F2: Designed a rate-limiting middleware used across 6 internal services
F3: Basic familiarity with Docker, used it to containerize one side project
F4: No experience with message queues (Kafka, RabbitMQ, SQS, etc.)

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Backend engineer with 2 years of experience building Node.js services and working with PostgreSQL. Has basic Docker experience, including containerizing a side project. Seeking a Backend Engineer role where this hands-on experience can be applied.

COVER LETTER:
Dear Hiring Team,

I'm excited to apply for the Backend Engineer role at Ledgerly. My background includes two years of backend engineering experience building Node.js services and working with PostgreSQL.

I also have basic Docker experience, including containerizing a side project.

I want to be transparent: I do not yet have production experience with message queues like Kafka, RabbitMQ, or SQS. Ledgerly's event-driven work is a meaningful opportunity to build in that area, and I would welcome the chance to discuss how my Node.js and PostgreSQL experience could contribute to the team.

Best regards,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Backend engineer with 2 years of experience building Node.js services and working with PostgreSQL.","supportedByFactId":"F1"},{"text":"Has basic Docker experience, including containerizing a side project.","supportedByFactId":"F3"},{"text":"My background includes two years of backend engineering experience building Node.js services and working with PostgreSQL.","supportedByFactId":"F1"},{"text":"I also have basic Docker experience, including containerizing a side project.","supportedByFactId":"F3"},{"text":"I do not yet have production experience with message queues like Kafka, RabbitMQ, or SQS.","supportedByFactId":"F4"}]}
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
F1: 2 years as a backend engineer, primarily Node.js and PostgreSQL
F2: Designed a rate-limiting middleware used across 6 internal services
F3: Basic familiarity with Docker, used it to containerize one side project
F4: No experience with message queues (Kafka, RabbitMQ, SQS, etc.)

GENERATED TEXT TO AUDIT:
RESUME SUMMARY:
Backend engineer with 2 years of experience building Node.js services and working with PostgreSQL. Has basic Docker experience, including containerizing a side project. Seeking a Backend Engineer role where this hands-on experience can be applied.

COVER LETTER:
Dear Hiring Team,

I'm excited to apply for the Backend Engineer role at Ledgerly. My background includes two years of backend engineering experience building Node.js services and working with PostgreSQL.

I also have basic Docker experience, including containerizing a side project.

I want to be transparent: I do not yet have production experience with message queues like Kafka, RabbitMQ, or SQS. Ledgerly's event-driven work is a meaningful opportunity to build in that area, and I would welcome the chance to discuss how my Node.js and PostgreSQL experience could contribute to the team.

Best regards,
[Your Name]
```

**Response:**

```
{"claims":[{"text":"Backend engineer with 2 years of experience building Node.js services and working with PostgreSQL.","supportedByFactId":"F1"},{"text":"Has basic Docker experience, including containerizing a side project.","supportedByFactId":"F3"},{"text":"My background includes two years of backend engineering experience building Node.js services and working with PostgreSQL.","supportedByFactId":"F1"},{"text":"I also have basic Docker experience, including containerizing a side project.","supportedByFactId":"F3"},{"text":"I do not yet have production experience with message queues like Kafka, RabbitMQ, or SQS.","supportedByFactId":"F4"}]}
```


### Step 7 — quality-score (LLM call)

**System prompt:**

```
Score this resume summary + cover letter draft from 1-5 on overall quality: professionalism, clarity, natural tone, and whether a real person would send it as-is without editing. Respond ONLY as JSON, no markdown fences: {"score": <1-5>, "notes": "<one sentence>"}
```

**User prompt:**

```
RESUME SUMMARY:
Backend engineer with 2 years of experience building Node.js services and working with PostgreSQL. Has basic Docker experience, including containerizing a side project. Seeking a Backend Engineer role where this hands-on experience can be applied.

COVER LETTER:
Dear Hiring Team,

I'm excited to apply for the Backend Engineer role at Ledgerly. My background includes two years of backend engineering experience building Node.js services and working with PostgreSQL.

I also have basic Docker experience, including containerizing a side project.

I want to be transparent: I do not yet have production experience with message queues like Kafka, RabbitMQ, or SQS. Ledgerly's event-driven work is a meaningful opportunity to build in that area, and I would welcome the chance to discuss how my Node.js and PostgreSQL experience could contribute to the team.

Best regards,
[Your Name]
```

**Response:**

```
{"score": 4, "notes": "Clear, honest, and professional, though it slightly undersells the candidate's strengths and could be more confident in tone."}
```
