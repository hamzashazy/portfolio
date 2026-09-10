export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Miana",
    role: "Full Stack Web & Mobile Developer",
    period: "Jan 2026 – Present",
    location: "Remote · US · Part-time",
    current: true,
    highlights: [
      "Own a production Next.js real estate CRM: new features, AI automations and UX improvements.",
      "Built a Flutter restaurant delivery app end to end with API integration.",
      "Ship full-stack features with React, Next.js, Node.js, Express and MongoDB, and run the Git workflow and deployments.",
    ],
    stack: ["Next.js", "Flutter", "Node.js", "MongoDB", "Claude API"],
  },
  {
    company: "ODL",
    role: "MERN Stack Development Intern",
    period: "Jun 2025 – Sep 2025",
    location: "Islamabad, Pakistan",
    highlights: [
      "Built full-stack web applications on the MERN stack with clean architecture.",
      "Backend APIs, authentication and dynamic front-end components.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    company: "Mark Mates",
    role: "Project Management Intern",
    period: "Jan 2025 – May 2025",
    location: "Islamabad, Pakistan",
    highlights: [
      "Ran projects in ClickUp, Jira and Slack.",
      "Automated team workflows with Make.com and Zapier.",
    ],
    stack: ["ClickUp", "Jira", "Make.com", "Zapier"],
  },
];
