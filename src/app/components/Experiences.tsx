import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { siteConfig } from "@/app/config";

const Experiences = () => (
  <div className="flex flex-col items-center">
    <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-400 mb-8">Experience</h2>
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400/60 to-indigo-400/60 rounded-full" />
      <ul className="space-y-12 pl-12">
        {siteConfig.sections.experiences.map((exp, idx) => (
          <li key={idx} className="relative group">
            <span className="absolute -left-7 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-indigo-400 flex items-center justify-center shadow-lg border-4 border-background">
              <FaBriefcase className="text-white text-lg" />
            </span>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl p-6 transition-transform duration-300 group-hover:scale-105">
              <div className="text-xs text-slate-400 mb-1">{exp.duration}</div>
              <div className="text-lg font-bold text-pink-300 mb-1">{exp.company} — {exp.position}</div>
              <div className="text-slate-200 text-sm">{exp.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Experiences;
