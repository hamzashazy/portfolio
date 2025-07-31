import React from "react";
import { FaDownload } from "react-icons/fa";

const AboutMe = () => (
  <div className="flex flex-col items-center text-center gap-6">
    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg mb-4">
      <img
        src="/Portfolio.png"
        alt="Hamza Shahzad Avatar"
        className="w-full h-full object-cover"
      />
    </div>
    <h2 className="text-2xl md:text-3xl font-extrabold text-pink-400 mb-2">About Me</h2>
    <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto">
      Hi! I'm <span className="font-bold text-orange-400">Hamza Shahzad</span>, a passionate full-stack developer who loves building scalable, beautiful web applications. I believe in clean code, creative solutions, and lifelong learning.
    </p>
    <ul className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-slate-300">
      <li className="bg-orange-500/10 px-4 py-2 rounded-full border border-orange-400/30">Remote Friendly</li>
      <li className="bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-400/30">Creative Thinker</li>
      <li className="bg-green-500/10 px-4 py-2 rounded-full border border-green-400/30">Team Player</li>
    </ul>
    <a
      href="/hamza-cv.pdf"
      download
      className="mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200"
    >
      <FaDownload /> Download CV
    </a>
  </div>
);

export default AboutMe;
