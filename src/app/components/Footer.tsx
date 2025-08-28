"use client";

import Link from "next/link";
import { siteConfig } from "../config";

export default function Footer({ isSticky, noAnimate }: { isSticky?: boolean; noAnimate?: boolean }) {
    return (
        <footer className={`w-full mt-8 ${noAnimate && '!block lg:!block p-2 lg:!text-center'} ${
            isSticky ? "hidden lg:block" : "lg:hidden"
        }`}>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-pink-500/10 via-violet-600/10 to-transparent p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* CTA */}
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">Let's build something bold together</h3>
                        <p className="text-slate-300 text-sm mb-4">Available for freelance and full-time opportunities. I design, build, and ship scalable apps.</p>
                        <Link
                            href={`mailto:${siteConfig.email}`}
                            className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-transform"
                        >
                            Get in touch
                        </Link>
                    </div>
                    {/* Socials */}
                    <ul className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full md:w-auto">
                        {siteConfig.socialLinks.map((link) => (
                            <li key={link.url} className="">
                                <Link
                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-black/40 border border-white/10 hover:border-pink-500/40 hover:scale-105 transition"
                                    href={link.url}
                                    target="_blank"
                                    aria-label={link.url}
                                >
                                    <span className="text-lg">{link.icon}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
                    <p className="mb-1">&copy; 2024 {siteConfig.title}. All rights reserved.</p>
                    <p>
                        Built by <Link className="underline font-semibold hover:text-pink-400" href={siteConfig.socialLinks.find((l) => l.url.includes("github"))?.url ?? "/"}>{siteConfig.alias}</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
