"use client";

import React from "react";
import { siteConfig } from "../config";

const Technologies = () => (
  <div className="flex flex-col items-center">
    <h2 className="text-2xl md:text-3xl font-extrabold text-green-400 mb-8">Technologies</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
      {siteConfig.sections.technologies.main.map((tech, idx) => (
        <div
          key={idx}
          className="relative rounded-xl p-[1px] bg-gradient-to-br from-green-500/20 via-violet-600/10 to-transparent"
        >
          <div className="bg-black/30 rounded-xl p-5 flex flex-col items-center gap-2 border border-white/10 transition-transform duration-300 hover:scale-105">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 mb-1">
              {tech.icon}
            </div>
            <span className="text-sm font-semibold text-green-200">
              {tech.name}
            </span>
            <span className="text-[10px] text-slate-400">{tech.description}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full">
      {siteConfig.sections.technologies.other.map((tech, idx) => (
        <div key={idx} className="flex flex-col items-center gap-1 text-xs text-slate-300 hover:text-green-400 transition-colors">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 mb-1">
            {tech.icon}
          </div>
          {tech.name}
        </div>
      ))}
    </div>
  </div>
);

export default Technologies;
