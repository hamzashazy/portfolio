import React from "react";
import { FaDownload } from "react-icons/fa";

const AboutMe = () => (
  <div className="flex flex-col items-center text-center gap-8">
    <div className="w-full max-w-3xl">
      <div className="rounded-2xl p-[2px] bg-gradient-to-br from-pink-500/30 via-violet-500/20 to-transparent">
        <div className="rounded-2xl bg-black/30 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
            <div className="shrink-0">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/Portfolio.png"
                  alt="Hamza Shahzad Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">About Me</h2>
              <p className="text-slate-200 text-base md:text-lg max-w-xl">
                Hi! I'm <span className="font-bold text-orange-400">Hamza Shahzad</span>, a passionate full-stack developer who loves building scalable, beautiful web applications. I believe in clean code, creative solutions, and lifelong learning.
              </p>
              <ul className="flex flex-wrap gap-2 mt-4 text-xs md:text-sm text-slate-300">
                <li className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Remote Friendly</li>
                <li className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Creative Thinker</li>
                <li className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Team Player</li>
              </ul>

              <a
                href="/HamzaShahzad-CV.pdf"
                download
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-transform"
              >
                <FaDownload /> Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutMe;
