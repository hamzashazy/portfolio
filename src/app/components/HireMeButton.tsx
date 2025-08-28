"use client";

import Link from "next/link";
import { siteConfig } from "../config";

export default function HireMeButton() {
    return (
        <Link
            href={`mailto:${siteConfig.email}?subject=Let's work together!&body=Hi Hamza,%0D%0A%0D%0AI'd like to discuss a project with you.%0D%0A%0D%0ABest regards,`}
            target="_blank"
            className="group relative"
        >
            <div className="relative w-28 h-9 lg:w-32 lg:h-10 overflow-hidden p-[1px] rounded-sm hover:scale-110 transition-all duration-300 ease-in-out">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-sm"></div>
                <button className="text-white text-[10px] lg:text-[11px] border border-[rgba(255,255,255,0.3)] font-bold tracking-widest bg-background relative z-10 w-full h-full rounded-sm hover:bg-transparent transition-all duration-300">
                    HIRE ME
                </button>
            </div>
        </Link>
    );
}
