import { FaGithub, FaFacebook } from "react-icons/fa";
import { FaLinkedin, FaSquareXTwitter, FaDiscord, FaThreads, FaReact } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { SiBluesky } from "react-icons/si";
import {
    RiNextjsFill,
    RiTailwindCssFill,
    RiOpenaiFill,
    RiWordpressFill,
} from "react-icons/ri";
import {
    SiZapier,
    SiPython,
    SiN8N,
    SiWoocommerce,
    SiReact,
    SiExpress,
    SiHtml5,
    SiCss3,
    SiNodedotjs,
    SiMysql,
    SiMongodb,
    SiFramer,
    SiGit,
} from "react-icons/si";
import { TbApi, TbBrandReactNative } from "react-icons/tb";


export const siteConfig = {
    name: "Hamza Shahzad",
    title: "Hamza Shahzad | Full-Stack Developer",
    email: "hamzashazy.work@gmail.com",
    alias: "hamzashazy",
    description:
        "Hamza Shahzad is a web developer who builds scalable, user-centric applications using Next.js, Node.js, React.js, WordPress, and other frameworks. With a focus on performance, accessibility, and clean code, Alvin creates digital solutions that are both functional and aesthetically pleasing.",
    keywords:
        "Hamza Shahzad, full-stack developer, web development, Next.js, WordPress, React, Node.js, scalable applications, clean code",
    url: "https://hamzashazy.github.io/portfolio",
    taglines: [
        "Simplicity Meets Brilliance: Turning Code into Clever Solutions, One Idea at a Time. Let’s architect digital magic from scratch—no fluff, just impact.",
        "Code Like Art, Build Like a Pro: From eye-catching interfaces to robust backend engines, I design experiences that users remember and systems that just work.",
        "Beyond the Screen, Into the Future: Let's craft digital worlds that flow, function, and feel right—one pixel-perfect, problem-solving line at a time."
      ],
    titles: ["Full-Stack Developer", "MERN Stack Developer", "NextJS Developer"],
    socialLinks: [
        {
            icon: <FaGithub />,
            url: "https://github.com/hamzashazy",
        },
        {
            icon: <FaLinkedin />,
            url: "https://www.linkedin.com/in/hamzashazy/",
        },
        {
            icon: <FaSquareXTwitter />,
            url: "https://x.com/hamzashazy",
        },
        {
            icon: <FaThreads />,
            url: "https://www.threads.com/@hamzashazy",
        },
        {
            icon: <SiBluesky />,
            url: "https://bsky.app/profile/hamzashazy",
        },
        {
            icon: <FaDiscord />,
            url: "https://discord.gg",
        },
        {
            icon: <IoIosMail />,
            url: "hamzashazy.work@gmail.com",
        },
    ],
    sections: {
        tableOfContents: [
            {
                id: "about-me",
                label: "ABOUT ME",
            },
            {
                id: "experiences",
                label: "EXPERIENCES",
            },
            {
                id: "projects",
                label: "PROJECTS",
            },
            {
                id: "technologies",
                label: "TECHNOLOGIES",
            },
            {
                id: "blogs",
                label: "BLOGS",
            },
            {
                id: "contact",
                label: "CONTACT",
            },
        ],
        aboutMe: `
            <p style="margin-bottom: 1rem;">
              Hi! I'm Hamza — a <strong>full-stack web developer</strong> with a passion for building <strong>clean</strong>, <strong>responsive</strong>, and <strong>scalable</strong> web applications.
             From sleek front-end interfaces to powerful back-end systems, I love crafting web experiences that are intuitive, scalable, and performance-driven — whether it’s an e-commerce platform, an admin dashboard, or a custom solution built from scratch.
             </p>
            <p style="margin-bottom: 1rem;">
                When I’m not coding, you’ll likely find me traveling, exploring new places, or discovering local culture and hidden gems.<br>Let’s connect and bring your next <strong>web or API project</strong> to life! 🚀
            </p>
        `,
        experiences: [
            {
                company: "ODL.",
                position: "Full Stack Development intern",
                duration: "2025-Present",
                description:
                    "Contributed to full-stack web development using the MERN stack and Tailwind CSS, focusing on API integration, authentication flows, and dynamic UI components. Applied clean code practices, version control, and component-based architecture in a collaborative team environment.",
            },
            {
                company: "Mark Mates",
                position: "IT Project Management intern",
                duration: "",
                description:
                    "Managed client projects using ClickUp, Jira, and Slack, while optimizing workflows through automation with Make.com and Zapier. Coordinated remote teams and ensured timely project delivery with effective tracking and communication.",
            },
        ],
        projects: [
            {
                title: "Hamza Shahzad | Portfolio Website",
                description:
                    "Built a personal portfolio website using Next.js, React.js, and Tailwind CSS to showcase my projects and skills. The site features interactive project displays with media previews, tech stacks, and direct links to live demos and GitHub repositories. It delivers a modern, responsive, and optimized experience with smooth animations, lazy-loaded images, and clean, component-based code for easy scalability.",
                logo: "/projects/portfolio/portfolio-logo.webp",
                thumbnail: "/projects/portfolio/thumbnail.png",
                repoLink: "https://github.com/hamzashazy/portfolio",
                technologies: [
                    {
                        icon: < FaReact  className="text-[#FFF]" />,
                        name: "React.js",
                    },
                    {
                        icon: <RiTailwindCssFill className="text-[#06B6D4]" />,
                        name: "Tailwind CSS",
                    },
                    {
                        icon: <RiNextjsFill className="text-[#FFF]" />,
                        name: "Next.js",
                    },
                ],
                link: "https://portfolio-wine-theta-35.vercel.app/",
                previewImages: [
                    "/projects/portfolio/1.webp",
                    "/projects/portfolio/2.webp",
                    "/projects/portfolio/3.webp",
                    "/projects/portfolio/4.webp",
                    "/projects/portfolio/5.webp",
                    "/projects/portfolio/6.webp"
                ],
                previewVideos: [
                    "https://video-proxy-worker.alvs131313.workers.dev/portfolio-video-4k/output.m3u8"
                ]
            },
            {
                title: "E-commerce Website",
                description:
                    "Developed a full-stack e-commerce store using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Tailwind CSS for responsive styling and JWT for secure authentication. The platform features distinct dashboards for admins and users, enabling seamless role-based access. Implemented RESTful APIs for managing products, carts, and orders, along with protected routes and Axios-based data handling. The admin panel includes intuitive interfaces for real-time management of products, orders, and users, ensuring efficient store operations and a smooth user experience.",
                logo: "/projects/ecommerce/logo.png",
                thumbnail: "/projects/ecommerce/ecomth.png",
                repoLink: "https://github.com/hamzashazy/ecommerce-project",
                technologies: [
                    {
                        icon: <SiNodedotjs className="text-[#FFF]" />,
                        name: "Node.js",
                    },
                    {
                        icon: <FaReact className="text-[#412991]" />,
                        name: "React.js",
                    },
                    {
                        icon: <RiTailwindCssFill className="text-[#06B6D4]" />,
                        name: "Tailwind CSS",
                    },
                    {
                        icon: <SiExpress className="text-[#3178C6]" />,
                        name: "Express.js",
                    },
                ],
                link: "https://ecommerce-project-leww.vercel.app/",
                previewImages: [
                    "/projects/genz/1.webp",
                    "/projects/genz/2.webp",
                    "/projects/genz/3.webp",
                    "/projects/genz/4.webp",
                    "/projects/genz/5.webp"
                ],
                previewVideos: [
                    "https://video-proxy-worker.alvs131313.workers.dev/genz-video-4k/output.m3u8"
                ]
            },
        ],
        technologies: {
            main: [
                {
                    name: "Next.js",
                    icon: <FaReact className="text-[#FFF]" />,
                    description: "A React framework",
                },
                {
                    name: "React",
                    icon: <SiReact className="text-[#61DAFB]" />,
                    description: "A JavaScript UI library",
                },
                {
                    name: "Tailwind CSS",
                    icon: <RiTailwindCssFill className="text-[#06B6D4]" />,
                    description: "A CSS framework",
                },
                {
                    name: "Node.js",
                    icon: <SiNodedotjs className="text-[#ffffff]" />,
                    description: "for REST API's",
                },
                {
                    name: "Git",
                    icon: <SiGit className="text-[#F05032]" />,
                    description: "A version control system",
                },
                {
                    name: "WordPress",
                    icon: <RiWordpressFill className="text-[#ffffff]" />,
                    description: "A CMS for websites",
                },
                {
                    name: "Express.js",
                    icon: <SiExpress className="text-[#FFF]" />, // ORIGINALLY BLACK
                    description: "A Node.js framework",
                },
                {
                    name: "N8N",
                    icon: <SiN8N className="text-[#FFF]" />, // ORIGINALLY BLACK
                    description: "for automations",
                },
                {
                    name: "MongoDB",
                    icon: <SiMongodb className="text-[#47A248]" />,
                    description: "database",
                },
            ],
            other: [
                {
                    name: "HTML5",
                    icon: <SiHtml5 className="text-[#E34F26]" />,
                },
                {
                    name: "CSS",
                    icon: <SiCss3 className="text-[#009df7]" />,
                },
                {
                    name: "Python",
                    icon: <SiPython className="text-[#009df7]" />,
                },
                {
                    name: "Zapier",
                    icon: <SiZapier className="text-[#F7DF1E]" />,
                },
                {
                    name: "MySQL",
                    icon: <SiMysql className="text-[#5798ca]" />,
                },
                {
                    name: "RESTful API",
                    icon: <TbApi className="text-[#FF5733]" />,
                },
                {
                    name: "Framer Motion",
                    icon: <SiFramer className="text-[#0055FF]" />,
                },
                {
                    name: "WooCommerce",
                    icon: <SiWoocommerce className="text-[#ffffff]" />,
                },
                {
                    name: "React Native",
                    icon: <TbBrandReactNative className="text-[#61DAFB]" />,
                },
            ],
        },
    },
};
