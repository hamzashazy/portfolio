import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
];

export const heroData = {
    name: 'Hamza Shahzad',
    title: 'Full Stack Developer',
    tagline: 'AI Automation & Technical Operations',
    roles: ['Full Stack Developer', 'Flutter Developer', 'AI Automation Engineer', 'MERN Stack Developer'],
    introduction:
        'I build and manage scalable web & mobile products — Next.js CRMs, Flutter apps, and Claude-powered automations. From backend architecture to pixel-level UI, I ship systems that improve how businesses actually operate.',
    availability: 'Building at Miana · Open to interesting problems',
    contact: {
        email: 'hamzashazy.work@gmail.com',
        phone: '+92 315 7575417',
        linkedin: 'https://www.linkedin.com/in/hamzashazy/',
        github: 'https://github.com/hamzashazy',
        portfolio: 'https://hamzashazy.vercel.app/',
    },
    stats: [
        { value: '10+', label: 'Projects shipped' },
        { value: '3', label: 'Stacks mastered' },
        { value: '2026', label: 'CS grad' },
        { value: '3.48', label: 'CGPA' },
    ],
};

export const socialLinks = [
    { name: 'GitHub', url: heroData.contact.github, icon: Github },
    { name: 'LinkedIn', url: heroData.contact.linkedin, icon: Linkedin },
    { name: 'Email', url: `mailto:${heroData.contact.email}`, icon: Mail },
];

export const experienceData = [
    {
        company: 'Miana',
        role: 'Full Stack Web & Mobile Developer',
        period: 'Jan 2026 – Present',
        location: 'Remote',
        current: true,
        highlights: [
            'Managing a Next.js-based Real Estate CRM — shipping new features, AI automations, and UX improvements.',
            'Developed a Flutter restaurant delivery application end-to-end with API integration and responsive UI.',
            'Building full-stack apps with React, Next.js, Node.js, Express, and MongoDB, owning Git workflows and deployments.',
        ],
        stack: ['Next.js', 'Flutter', 'Node.js', 'MongoDB', 'Claude API'],
    },
    {
        company: 'ODL',
        role: 'MERN Stack Development Intern',
        period: 'Jun 2025 – Sep 2025',
        location: 'Islamabad, Pakistan',
        current: false,
        highlights: [
            'Developed full-stack web applications using the MERN stack with clean architecture principles.',
            'Built backend APIs, authentication systems, and dynamic frontend components.',
        ],
        stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    },
    {
        company: 'Mark Mates',
        role: 'Project Management Intern',
        period: 'Jan 2025 – May 2025',
        location: 'Islamabad, Pakistan',
        current: false,
        highlights: [
            'Managed projects using ClickUp, Jira, Slack, and other productivity tooling.',
            'Improved team workflows through automation tools such as Make.com and Zapier.',
        ],
        stack: ['ClickUp', 'Jira', 'Make.com', 'Zapier'],
    },
];

export type Project = {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    stack: string[];
    status: 'in-progress' | 'shipped';
    statusLabel: string;
    featured: boolean;
    accent: 'emerald' | 'violet' | 'amber' | 'sky' | 'rose' | 'lime';
    image?: string;
    github?: string;
    live?: string;
};

export const projectsData: Project[] = [
    {
        title: 'Prep',
        subtitle: 'Restaurant App · Client Project',
        description:
            'A Flutter-based restaurant application being built for a client on a Supabase backend — covering menu browsing, ordering flows, and real-time order state. The MVP is under active development.',
        features: [
            'Cross-platform Flutter app from a single Dart codebase.',
            'Supabase backend — Postgres, Auth, and realtime order updates.',
            'Client-driven MVP scope with iterative weekly builds.',
        ],
        stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL'],
        status: 'in-progress',
        statusLabel: 'In Progress · MVP',
        featured: true,
        accent: 'emerald',
        github: 'https://github.com/hamzashazy',
    },
    {
        title: 'WorkFusion',
        subtitle: 'AI-Powered Hybrid Employment Marketplace · FYP',
        description:
            'A full-stack AI marketplace connecting employers and job seekers, with a Retrieval-Augmented Generation system for intelligent job/candidate matching using vector embeddings and semantic search.',
        features: [
            'RAG matching engine — embeddings, semantic search, similarity retrieval.',
            'Secure hiring workflows with JWT auth and role-based access control.',
            'Profile and review management across employer & candidate roles.',
        ],
        stack: ['Next.js', 'Express', 'MongoDB', 'FastAPI', 'RAG'],
        status: 'in-progress',
        statusLabel: 'Final Year Project',
        featured: true,
        accent: 'violet',
        github: 'https://github.com/hamzashazy',
    },
    {
        title: 'AI Meeting Assistant',
        subtitle: 'Discord Bot',
        description:
            'An AI-powered Discord bot for meeting recording, note generation, summaries, and action-item extraction — wired into Claude Skills & Routines with Supabase for automated team documentation.',
        features: [
            'Automated meeting notes, summaries, and action items.',
            'Claude Skills & Routines integrated with Supabase storage.',
        ],
        stack: ['Discord API', 'Claude API', 'Supabase'],
        status: 'shipped',
        statusLabel: 'Shipped',
        featured: false,
        accent: 'sky',
        github: 'https://github.com/hamzashazy',
    },
    {
        title: 'Campus Management System',
        subtitle: 'Multi-Campus Admin Platform',
        description:
            'A multi-campus management system with role-based access for super admins and campus admins — modules for users, programs, and daily operations across campuses.',
        features: [
            'Multi-tenant architecture with RBAC.',
            'Centralized management of all campus data.',
        ],
        stack: ['MERN', 'JWT', 'Tailwind CSS'],
        status: 'shipped',
        statusLabel: 'Shipped',
        featured: false,
        accent: 'amber',
        image: '/Image1.png',
        github: 'https://github.com/hamzashazy/albn-super',
        live: 'https://albn-super.vercel.app',
    },
    {
        title: 'ZaraiSense',
        subtitle: 'Smart AgriTech Platform',
        description:
            'An AI-powered AgriTech platform helping farmers monitor crop health, optimize irrigation, and receive localized advisory through field agents and intelligent workflows.',
        features: [
            'AI-driven crop health, yield, and irrigation insights.',
            'Google Firebase, Maps, Translate, and Analytics integrations.',
        ],
        stack: ['Next.js', 'Firebase', 'Google Cloud'],
        status: 'in-progress',
        statusLabel: 'In Progress',
        featured: false,
        accent: 'lime',
        image: '/Image2.png',
        github: 'https://github.com/hamzashazy',
        live: 'https://studio--studio-8734384923-1b975.us-central1.hosted.app',
    },
    {
        title: 'Anonymous Messaging Platform',
        subtitle: 'Secure Feedback System',
        description:
            'A secure anonymous feedback system with JWT authentication and an admin moderation dashboard for viewing, managing, and analyzing messages.',
        features: [
            'JWT-authenticated anonymous messaging.',
            'Admin moderation and analytics dashboard.',
        ],
        stack: ['MERN', 'JWT', 'Tailwind CSS'],
        status: 'shipped',
        statusLabel: 'Shipped',
        featured: false,
        accent: 'rose',
        image: '/Image3.png',
        github: 'https://github.com/hamzashazy/hidelybackend',
        live: 'https://hidely.vercel.app',
    },
];

export const skillsData = [
    {
        category: 'Languages',
        skills: ['JavaScript', 'TypeScript', 'Python', 'Dart', 'Java', 'C++', 'SQL'],
    },
    {
        category: 'Frontend',
        skills: ['React', 'Next.js', 'Flutter', 'Tailwind CSS', 'Responsive UI'],
    },
    {
        category: 'Backend & Databases',
        skills: ['Node.js', 'Express', 'Next.js API Routes', 'MongoDB', 'Supabase', 'PostgreSQL', 'REST APIs', 'JWT / RBAC'],
    },
    {
        category: 'AI & Automation',
        skills: ['RAG', 'Vector Embeddings', 'Semantic Search', 'Claude API', 'Claude Skills & Routines', 'Make.com', 'Zapier'],
    },
    {
        category: 'Tools & Platforms',
        skills: ['Git', 'GitHub', 'Postman', 'Vercel', 'MongoDB Atlas', 'Firebase', 'Cursor (MCPs)', 'ClickUp', 'Jira'],
    },
];

export const marqueeTech = [
    'Next.js', 'React', 'Flutter', 'Supabase', 'Node.js', 'MongoDB', 'Express',
    'Claude API', 'RAG', 'FastAPI', 'Tailwind CSS', 'PostgreSQL', 'Firebase', 'TypeScript',
];

export const educationData = [
    {
        institution: 'National Skills University',
        degree: 'BS Computer Science',
        detail: 'CGPA 3.48',
        period: '2022 – 2026',
        location: 'Islamabad, Pakistan',
    },
];

export const certificationsData = [
    {
        title: 'NAVTTC High Impact Training Program',
        detail: 'Data Science, Blockchain & Artificial Intelligence',
        issuer: 'NAVTTC',
    },
    {
        title: 'Python Data Structures',
        detail: 'Programming fundamentals & data structures in Python',
        issuer: 'Coursera',
    },
    {
        title: 'The Power of Object-Oriented Programming',
        detail: 'OOP design principles and patterns',
        issuer: 'Coursera',
    },
];

export const contactData = {
    heading: "Let's build something that ships.",
    subheading:
        "Whether it's a full-stack product, a Flutter app, or an AI automation that saves your team hours — I'm one message away.",
    items: [
        { name: 'Email', value: heroData.contact.email, href: `mailto:${heroData.contact.email}`, icon: Mail },
        { name: 'Phone', value: heroData.contact.phone, href: `tel:${heroData.contact.phone.replace(/\s/g, '')}`, icon: Phone },
        { name: 'LinkedIn', value: 'in/hamzashazy', href: heroData.contact.linkedin, icon: Linkedin },
        { name: 'GitHub', value: 'hamzashazy', href: heroData.contact.github, icon: Github },
    ],
};
