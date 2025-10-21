import { Github, Linkedin, Mail, Phone, FileText } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
];

export const heroData = {
    name: 'Hamza Shahzad',
    title: 'MERN Stack Developer',
    introduction: 'A passionate Full Stack Developer who loves turning ideas into fast, reliable web applications. Working with the MERN stack, I focus on building strong backends and smooth, user-friendly experiences. Clean code, scalability, and real-world impact — that’s what drives my work.',
    contact: {
        email: 'hamzashazy.work@gmail.com',
        phone: '+92 329 4455669',
        linkedin: 'https://www.linkedin.com/in/hamzashazy/',
        github: 'https://github.com/hamzashazy',
        portfolio: 'https://hamzashazy.vercel.app/',
    }
};

export const socialLinks = [
    { name: 'LinkedIn', url: heroData.contact.linkedin, icon: Linkedin },
    { name: 'GitHub', url: heroData.contact.github, icon: Github },
    { name: 'Email', url: `mailto:${heroData.contact.email}`, icon: Mail },
];

export const aboutData = {
    bio: "I am a dedicated and results-oriented MERN Stack Developer with a strong foundation in computer science and real-world experience in full-stack development and project management. My goal is to build high-quality, impactful web applications that solve real-world problems. I thrive in collaborative environments and am always eager to learn new technologies and improve my craft. I'm passionate about backend systems, API design, and creating efficient, maintainable code."
};

export const educationData = [
    {
        institution: 'National Skills University',
        degree: 'BS Computer Science',
        period: 'Sep 2022 – June 2026 (Expected)',
    },
    {
        institution: 'IMCB G-10/4',
        degree: 'FSC Pre Engineering',
        period: 'Aug 2020 – May 2022',
    },
];

export const experienceData = [
    {
        company: 'ODL',
        role: 'MERN Stack Development Intern',
        period: 'June 2025 – September 2025',
        responsibilities: [
            'Developed and maintained server-side applications using Node.js and Express.js.',
            'Designed and implemented RESTful APIs for client-server communication.',
            'Worked with MongoDB for database design and management.',
            'Collaborated with the frontend team to integrate user-facing elements.'
        ]
    },
    {
        company: 'Mark Mates',
        role: 'Project Management Intern',
        period: 'Jan 2025 – May 2025',
        responsibilities: [
            'Assisted in planning and executing project timelines.',
            'Coordinated with cross-functional teams to ensure project milestones were met.',
            'Prepared project status reports and documentation.',
            'Utilized project management tools to track progress and resource allocation.'
        ]
    }
];

export const projectsData = [
    {
        title: 'Campus Management System – Super Admin & Campus Admin Panel',
        description: 'A unified admin panel where Super Admins manage multiple campuses, administrators, and global settings, while Campus Admins handle students, faculty, courses, and daily campus operations.',
        features: [
            'Secure multi-tenant architecture.',
            'Role-based access control (RBAC).',
            'Centralized management of all campuses data.',
            'Integrated real-time notifications',
        ],
        stack: ['MERN', 'Tailwind CSS', 'JWT'],
        image: "/Image1.png",
        link: 'https://github.com/hamzashazy/albn-super',
        link2: 'https://albn-super.vercel.app',
    },
    {
        title: 'ZaraiSense – Smart AgriTech Platform(In Progress)',
description: 'An AI-powered AgriTech platform built with Firebase, helping farmers monitor crop health, optimize irrigation, and receive localized advisory through field agents and intelligent workflows.',
features: [
    'Crop health, yield, and irrigation optimization powered by AI.',
    'Seamless integration with Google Firebase, Maps, Translate, and Analytics.',
],
stack: ['Firebase Studio', 'Next.js', 'Tailwind CSS', 'Google Cloud APIs'],

        image: "/Image2.png",
        link: 'https://github.com/hamzashazy',
        link2: 'https://studio--studio-8734384923-1b975.us-central1.hosted.app',
    },
    {
        title: 'Anonymous Messaging Platform',
        description: 'A web application that allows users to send and receive anonymous messages, fostering open and honest communication.',
        features: [
            'User authentication with JWT.',
            'Admin dashboard to view, manage, and analyze messages.',
            'Secure and private message handling.'
        ],
        stack: ['MERN Stack', 'Tailwind CSS', 'JWT'],
        image: "/Image3.png",
        link: 'https://github.com/hamzashazy/hidelybackend',
        link2: 'https://hidely.vercel.app',
    }
];

const SKILL_CATEGORIES = {
    LANGUAGES: 'Languages',
    FRAMEWORKS: 'Frameworks/Libraries',
    TOOLS: 'Tools',
} as const;

export const skillsData = {
    categories: ['Frontend', 'Backend', 'Databases', 'Tools', 'Cloud', 'Version Control'],
    skills: [
        // Frontend
        { name: 'React.js', category: 'Frontend' },
        { name: 'Next.js', category: 'Frontend' },
        { name: 'Tailwind CSS', category: 'Frontend' },
        { name: 'HTML/CSS', category: 'Frontend' },
        { name: 'JavaScript', category: 'Frontend' },

        // Backend
        { name: 'Node.js', category: 'Backend' },
        { name: 'Express.js', category: 'Backend' },
        { name: 'JWT', category: 'Backend' },
        { name: 'Python', category: 'Backend' },
        { name: 'Java', category: 'Backend' },

        // Databases
        { name: 'MongoDB', category: 'Databases' },
        { name: 'MongoDB Atlas', category: 'Databases' },
        { name: 'SQL', category: 'Databases' },

        // Tools
        { name: 'Git', category: 'Tools' },
        { name: 'Postman', category: 'Tools' },
        { name: 'VS Code', category: 'Tools' },
        { name: 'Cursor', category: 'Tools' },
        { name: 'Google Sheets', category: 'Tools' },
        { name: 'Zapier', category: 'Tools' },
        { name: 'Make.com', category: 'Tools' },

        // Cloud
        { name: 'Firebase', category: 'Cloud' },

        // Version Control
        { name: 'GitHub', category: 'Version Control' },
    ]
};
