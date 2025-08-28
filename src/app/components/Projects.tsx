import React from "react";
import { siteConfig } from "../config";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const Projects = () => (
  <div className="flex flex-col items-center">
    <h2 className="text-2xl md:text-3xl font-extrabold text-orange-400 mb-8">Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      {siteConfig.sections.projects.map((project, idx) => (
        <div
          key={idx}
          className="relative bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col gap-4 transition-transform duration-300 hover:scale-105 group border border-orange-400/10"
        >
          <div className="w-full h-40 rounded-xl overflow-hidden mb-3 bg-black/20 flex items-center justify-center">
            <img
              src={project.thumbnail}
              alt={project.title + " thumbnail"}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <img src={project.logo} alt={project.title + " logo"} className="w-8 h-8 rounded-full bg-white/20 p-1" />
            <span className="text-lg font-bold text-orange-300">{project.title}</span>
          </div>
          <p className="text-slate-200 text-sm mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="flex items-center gap-1 px-3 py-1 bg-orange-500/10 border border-orange-400/30 rounded-full text-xs text-orange-200">
                {tech.icon}
                {tech.name}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-auto">
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-pink-400 transition-colors text-lg"
                title="View Source on GitHub"
              >
                <FaGithub />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200 flex items-center gap-2"
                title="View Project"
              >
                View Project <FaExternalLinkAlt className="text-xs" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Projects;
