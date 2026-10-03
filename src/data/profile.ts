export const profile = {
  name: "Hamza Shahzad",
  firstName: "Hamza",
  role: "AI Solutions Developer",
  roleLine: "AI products · Automation · Web & mobile",
  headline: "I build AI-driven products that ship.",
  intro:
    "Recommendation engines, RAG matching, LLM agents and the full-stack products around them, each with a real status in the market. Currently building at Miana and open to interesting problems.",
  availability: "Building at Miana · Open to work",
  location: "Islamabad, Pakistan · Remote",
  email: "hamzashazy.work@gmail.com",
  phone: "+92 315 7575417",
  whatsapp: "https://wa.me/923157575417",
  github: "https://github.com/hamzashazy",
  linkedin: "https://www.linkedin.com/in/hamzashazy/",
  site: "https://hamzashazy.netlify.app",
  resume: "/resume.pdf",
  avatar: "/prof.jpg",
  about: [
    "I am a developer from Islamabad with a BS in Computer Science (class of 2026) who builds AI-driven solutions end to end. I work part-time at Miana, a US real estate company, where I maintain a Next.js CRM and build the Claude-powered automations around it.",
    "Outside work I build my own products: Crave, an AI-driven restaurant management system with a customer app, website and Tauri desktop POS; WorkFusion, a marketplace with RAG-based matching; plus Next.js storefronts on Supabase and Flutter games with real physics. AI is only useful inside a product that works, so I care about the unglamorous parts too: release pipelines, row-level security, offline caches, auto-updates.",
    "I lean on Claude Code and agentic workflows heavily, which is how one person keeps this many products moving.",
  ],
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
