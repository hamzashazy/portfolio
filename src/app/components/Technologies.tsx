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
          className="relative bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110 border border-green-400/10 group"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400/30 to-pink-400/20 shadow-lg group-hover:shadow-green-400/40 mb-2 animate-pulse-slow">
            {tech.icon}
          </div>
          <span className="text-sm font-semibold text-green-200 group-hover:text-white transition-colors duration-200">
            {tech.name}
          </span>
          <span className="absolute left-1/2 -bottom-6 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none bg-black/80 text-xs text-white px-3 py-1 rounded shadow-lg transition-all duration-200">
            {tech.description}
          </span>
        </div>
      ))}
    </div>
    <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full">
      {siteConfig.sections.technologies.other.map((tech, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center gap-1 text-xs text-slate-300 hover:text-green-400 transition-colors"
        >
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
