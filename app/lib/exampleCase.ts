export interface ExampleCase {
  jobTitle: string;
  company: string;
  jobDescription: string;
  facts: string[];
}

export const EXAMPLE_CASE: ExampleCase = {
  jobTitle: "Frontend Engineer, Growth Team",
  company: "SaaSify",
  jobDescription: `SaaSify is hiring a Frontend Engineer to scale our marketing site and onboarding flows.

What the role requires:
- 2+ years of professional React and TypeScript experience
- Hands-on Next.js App Router and Tailwind CSS expertise
- Experience running A/B testing experiments on signup funnels

Happy to have exceptional talents join our team!`,
  facts: [
    "2 years of professional frontend experience building single-page React and TypeScript apps",
    "Used Tailwind CSS extensively for UI component styling",
    "Never worked with Next.js App Router or run A/B tests",
  ],
};


