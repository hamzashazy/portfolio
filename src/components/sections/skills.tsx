"use client";

import { useState } from "react";
import { skillsData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SimpleIcon } from "simple-icons";
import {
  siJavascript,
  siPython,
  siOpenjdk,
  siCplusplus,
  siDotnet,
  siHtml5,
  siReact,
  siNodedotjs,
  siExpress,
  siMongodb,
  siTailwindcss,
  siJsonwebtokens,
  siGit,
  siPostman,
  siNextdotjs,
  siVscodium,
  siGithub,
  siGooglesheets,
  siZapier,
  siMake,
} from "simple-icons/icons";

// import siVisualstudiocode from "simple-icons/icons/visualstudiocode.js";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ALL_SKILLS = "All";

export default function SkillsSection() {
  const [filter, setFilter] = useState(ALL_SKILLS);
  const categories = [ALL_SKILLS, ...skillsData.categories];

  const filteredSkills = skillsData.skills.filter(
    (skill) => filter === ALL_SKILLS || skill.category === filter
  );

  return (
    <section id="skills" className="w-full bg-secondary py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Technical Skills
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            The tools and technologies I use to build things.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredSkills.map((skill, index) => (
                  <TooltipProvider key={skill.name} delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="group flex flex-col items-center gap-2 text-center animate-in fade-in-50 slide-in-from-bottom-1"
                          style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'both' }}
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-primary/10 bg-background/60 p-3 shadow-sm ring-1 ring-primary/5 backdrop-blur transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] group-hover:shadow-primary/20 group-hover:ring-primary/20">
                            {renderIcon(skill.name)}
                          </div>
                          <span className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                            {skill.name}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="center" className="px-2 py-1 text-xs">
                        {skill.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function renderIcon(name: string) {
  const icon = getIconForSkill(name);
  if (!icon) {
    return (
      <span className="text-base font-semibold text-muted-foreground">
        {name.substring(0, 2)}
      </span>
    );
  }
  return (
    <svg
      role="img"
      aria-label={name}
      viewBox="0 0 24 24"
      className="h-full w-full"
      style={{ color: `#${icon.hex}` }}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

function getIconForSkill(name: string): SimpleIcon | null {
  const key = name.toLowerCase();
  const ICON_MAP: Record<string, SimpleIcon> = {
    "javascript": siJavascript,
    "python": siPython,
    "java": siOpenjdk,
    "c++": siCplusplus,
  "c#": siDotnet,
    "html/css": siHtml5,
    "html5": siHtml5,
    "react.js": siReact,
    "react": siReact,
    "next.js": siNextdotjs,
    "next": siNextdotjs,
    "node.js": siNodedotjs,
    "node": siNodedotjs,
    "express.js": siExpress,
    "express": siExpress,
    "mongodb": siMongodb,
    "mongodb atlas": siMongodb,
    "tailwind css": siTailwindcss,
    "jwt": siJsonwebtokens,
    "git": siGit,
    "postman": siPostman,
    "vs code": siVscodium,
    "vscode": siVscodium,
    "visual studio code": siVscodium,
    "github": siGithub,
    "cursor": undefined as unknown as SimpleIcon,
    "google sheets": siGooglesheets,
    "zapier": siZapier,
    "make.com": siMake,
    "make": siMake,
  };
  return ICON_MAP[key] ?? null;
}
