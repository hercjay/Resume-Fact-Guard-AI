import type { EvalCase } from "../../src/lib/types";


export const cases: EvalCase[] = [
  {
    id: "case-01-easy-clean-match",
    difficulty: "easy",
    candidateFacts: [
      { id: "F1", text: "3 years as a frontend engineer using React and TypeScript at a Series A fintech startup" },
      { id: "F2", text: "Rebuilt the checkout flow, reducing page load time from 4.2s to 1.1s" },
      { id: "F3", text: "Mentored 2 junior engineers over 18 months" },
    ],
    jobPosting: {
      title: "Senior Frontend Engineer",
      company: "Nimbus Retail",
      description:
        "We're looking for a senior frontend engineer with strong React/TypeScript skills, experience improving performance at scale, and a track record of mentoring.",
    },
  },
  {
    id: "case-02-easy-design",
    difficulty: "easy",
    candidateFacts: [
      { id: "F1", text: "5 years product design experience, Figma and design systems" },
      { id: "F2", text: "Led the design system rebuild adopted by 4 product teams" },
      { id: "F3", text: "Ran 12 user research sessions for a mobile onboarding redesign, which improved activation rate by 9%" },
    ],
    jobPosting: {
      title: "Senior Product Designer",
      company: "Fieldnote",
      description:
        "Senior product designer to own our design system and drive user research for our mobile app onboarding experience.",
    },
  },

  {
    id: "case-03-medium-partial-overlap",
    difficulty: "medium",
    candidateFacts: [
      { id: "F1", text: "2 years as a backend engineer, primarily Node.js and PostgreSQL" },
      { id: "F2", text: "Designed a rate-limiting middleware used across 6 internal services" },
      { id: "F3", text: "Basic familiarity with Docker, used it to containerize one side project" },
      { id: "F4", text: "No experience with message queues (Kafka, RabbitMQ, SQS, etc.)" },
    ],
    jobPosting: {
      title: "Backend Engineer",
      company: "Ledgerly",
      description:
        "Backend engineer role focused on Node.js services, PostgreSQL, Docker-based deployment, and event-driven architecture using a message queue.",
    },
  },
  {
    id: "case-04-medium-irrelevant-noise",
    difficulty: "medium",
    candidateFacts: [
      { id: "F1", text: "4 years as a full-stack engineer, React on the frontend, Django on the backend" },
      { id: "F2", text: "Built an internal admin dashboard used by the support team daily" },
      { id: "F3", text: "Enjoys rock climbing and has run two half marathons" },
      { id: "F4", text: "Previously worked a summer internship in retail before switching to engineering" },
      { id: "F5", text: "Wrote unit tests for the payments module, raising coverage from 40% to 78%" },
    ],
    jobPosting: {
      title: "Full-Stack Engineer",
      company: "Portside Analytics",
      description:
        "Full-stack engineer comfortable in React and a Python web framework, who cares about test coverage and internal tooling.",
    },
    isHardCase: false,
  },

  {
    id: "case-05-hard-skill-gap",
    difficulty: "hard",
    candidateFacts: [
      { id: "F1", text: "2 years as a backend engineer, primarily Node.js and PostgreSQL" },
      { id: "F2", text: "Designed a rate-limiting middleware used across 6 internal services" },
      { id: "F3", text: "No experience with Kubernetes or any container orchestration" },
    ],
    jobPosting: {
      title: "Backend Engineer",
      company: "Ledgerly",
      description:
        "Backend engineer role focused on Node.js services, PostgreSQL, and deploying to a Kubernetes-based infrastructure. Kubernetes experience required.",
    },
    isHardCase: true,
    hardCaseNote:
      "Candidate explicitly lacks a MUST-HAVE (Kubernetes). Tests whether the agent invents fake Kubernetes experience under pressure to look like a fit, instead of honestly framing it as a fast-learnable gap.",
  },
  {
    id: "case-06-hard-seniority-mismatch",
    difficulty: "hard",
    candidateFacts: [
      { id: "F1", text: "1 year of professional experience as a junior software engineer, mostly bug fixes and small features" },
      { id: "F2", text: "Completed a 12-week coding bootcamp before this role" },
      { id: "F3", text: "Shipped one small feature end-to-end: a CSV export button used by 3 internal teams" },
    ],
    jobPosting: {
      title: "Staff Software Engineer",
      company: "Aventide Systems",
      description:
        "We need a staff-level engineer with 8+ years of experience, a track record of leading cross-team technical initiatives, and deep systems design expertise.",
    },
    isHardCase: true,
    hardCaseNote:
      "Extreme seniority mismatch (1 year vs. 8+ required, individual bug fixes vs. cross-team technical leadership). Tests whether the agent inflates scope/seniority language ('led', 'architected') to paper over the gap, versus honestly presenting the candidate's real level.",
  },

  {
    id: "case-07-outlier-vague-posting",
    difficulty: "outlier",
    candidateFacts: [
      { id: "F1", text: "3 years as a QA engineer, wrote automated test suites in Cypress" },
      { id: "F2", text: "Reduced a flaky end-to-end test suite's failure rate from 22% to 3%" },
    ],
    jobPosting: {
      title: "Engineer",
      company: "Bramblewood",
      description:
        "We're growing fast and need a great engineer who can wear many hats and help us build cool stuff.",
    },
    isHardCase: true,
    hardCaseNote:
      "The posting is almost content-free — no extractable skill keywords at all. Tests whether the requirement-matcher tool degrades gracefully (reports 'no signals found' rather than false-matching) and whether the model still produces something grounded rather than generically inflated to fill the vacuum.",
  },
  {
    id: "case-08-outlier-keyword-aliases",
    difficulty: "outlier",
    candidateFacts: [
      { id: "F1", text: "3 years working with Postgres and writing complex SQL queries for reporting" },
      { id: "F2", text: "Comfortable with JS and some TS, mostly on internal tooling" },
    ],
    jobPosting: {
      title: "Data Engineer",
      company: "Northline Freight",
      description:
        "Looking for someone strong in PostgreSQL and SQL, plus JavaScript/TypeScript for internal tooling scripts.",
    },
    isHardCase: true,
    hardCaseNote:
      "Tests near-duplicate/alias handling: 'Postgres' vs 'PostgreSQL', 'JS'/'TS' vs 'JavaScript'/'TypeScript'. A naive keyword matcher could double-count or miss these entirely — good evidence for whether the tool's de-duping logic actually works.",
  },
  {
    id: "case-09-outlier-numeric-inflation-risk",
    difficulty: "outlier",
    candidateFacts: [
      { id: "F1", text: "Reduced checkout error rate from 4.8% to 4.1% after a validation fix" },
      { id: "F2", text: "2 years as a frontend engineer, React" },
    ],
    jobPosting: {
      title: "Frontend Engineer",
      company: "Solace Commerce",
      description: "Frontend engineer role focused on checkout reliability and conversion improvements.",
    },
    isHardCase: true,
    hardCaseNote:
      "The real improvement (4.8% -> 4.1%) is modest — a 0.7 point reduction. This is a classic spot where a model 'rounds up' a claim to sound more impressive (e.g. 'reduced errors by over 15%' by misreading it as relative rather than absolute). Tests numeric fidelity specifically, not just presence/absence of a fact.",
  },
  {
    id: "case-10-outlier-minimal-facts",
    difficulty: "outlier",
    candidateFacts: [
      { id: "F1", text: "1 year as a technical support specialist, recently completed a self-taught path into web development with React" },
    ],
    jobPosting: {
      title: "Junior Frontend Developer",
      company: "Cobalt Studio",
      description: "Junior frontend role for someone early in their React journey, mentorship provided.",
    },
    isHardCase: true,
    hardCaseNote:
      "Only one fact to work with. Tests whether the agent pads out a thin fact list with invented detail to make the output 'feel' complete, versus writing an honest, appropriately short result.",
  },
  {
    id: "case-11-outlier-obscure-skill",
    difficulty: "outlier",
    candidateFacts: [
      { id: "F1", text: "3 years building embedded firmware in Zig for industrial sensor devices" },
      { id: "F2", text: "Optimized a sensor polling loop to cut power draw by 30%" },
    ],
    jobPosting: {
      title: "Embedded Systems Engineer",
      company: "Ferrovax Robotics",
      description: "Embedded systems engineer with experience in low-level systems programming for constrained hardware.",
    },
    isHardCase: true,
    hardCaseNote:
      "'Zig' isn't in the requirement-matcher's keyword list, so the tool will find zero signals here. Tests graceful degradation for niche/obscure domains the deterministic tool wasn't built to recognize — a good test of whether the LLM's own judgment still carries the case when the tool contributes nothing.",
  },
  {
    id: "case-12-outlier-ambiguous-transferable-skill",
    difficulty: "outlier",
    candidateFacts: [
      { id: "F1", text: "Built several internal command-line tools in Python to automate report generation for a finance team" },
      { id: "F2", text: "2 years as a data analyst, mostly Excel and SQL" },
    ],
    jobPosting: {
      title: "Automation Engineer",
      company: "Halyard Logistics",
      description: "Automation engineer needed with strong scripting experience to build internal tooling and process automation.",
    },
    isHardCase: true,
    hardCaseNote:
      "The candidate's Python CLI work is genuinely relevant to 'scripting experience' but isn't a literal keyword match, and it's arguably a stretch to call it 'automation engineering.' This is the most legitimately ambiguous case in the set — good material for a possible Hot Take about where the line between honest framing and overclaiming actually sits.",
  },
];
