"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, ExternalLink, Globe, Play } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import { motion } from "motion/react";
import type { Project } from "@/data/types";
import { CATEGORIES } from "@/data/types";
import { categoryClass, categoryIcon } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { DeviceFrame } from "./device-frame";
import { StatusPill } from "./status-pill";

const ease = [0.16, 1, 0.3, 1] as const;

function ExternalIcons({ project }: { project: Project }) {
  const items = [
    project.links.live && { href: project.links.live, label: "Live site", icon: ExternalLink },
    project.links.original && { href: project.links.original, label: "Original product", icon: Globe },
    project.links.releases && { href: project.links.releases, label: "Download installers", icon: Download },
    project.links.github && { href: project.links.github, label: "Source on GitHub", icon: Github },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];
  if (items.length === 0) return null;
  return (
    <div className="relative z-10 flex items-center gap-1.5">
      {items.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}: ${label}`}
          title={label}
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Icon className="size-3.5" />
        </a>
      ))}
    </div>
  );
}

export function ProjectCard({ project, large = false, index = 0, mobileHidden = false }: { project: Project; large?: boolean; index?: number; mobileHidden?: boolean }) {
  const cat = categoryClass[project.category];
  const Icon = categoryIcon[project.category];
  const catLabel = CATEGORIES.find((c) => c.id === project.category)?.label;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
      transition={{ duration: 0.4, ease, delay: Math.min(index * 0.04, 0.3), layout: { duration: 0.4, ease } }}
      className={cn(
        "group relative flex overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-xl hover:shadow-black/10 focus-within:border-primary/50",
        // Phones get a compact row (thumbnail + text); the full card starts at sm.
        large ? "sm:col-span-2" : "sm:flex-col",
        mobileHidden && "max-sm:hidden",
      )}
    >
      <Link href={`/work/${project.slug}`} className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline-none" aria-label={`${project.title}: open case study`} />

      <div className={cn("relative w-[104px] min-h-[112px] shrink-0 overflow-hidden sm:min-h-0", large ? "sm:w-[52%]" : "sm:aspect-[16/10] sm:w-auto")}>
        {project.cover ? (
          <Image src={project.cover.src} alt={project.cover.alt} fill sizes="104px" className="object-cover object-top sm:hidden" />
        ) : null}
        <div className={cn("h-full w-full", project.cover && "hidden sm:block")}>
          <DeviceFrame shot={project.cover} icon={project.icon} title={project.title} category={project.category} priority={index < 2} className="transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-16 bg-gradient-to-t from-card/70 to-transparent sm:block" aria-hidden="true" />
        <StatusPill status={project.status} note={project.statusNote} className="absolute top-3 left-3 z-[2] hidden sm:inline-flex" />
        {project.film ? (
          <span className="absolute top-3 right-3 z-[2] hidden items-center gap-1 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[11px] leading-none text-foreground/90 backdrop-blur sm:inline-flex">
            <Play className="size-3 fill-current" /> Film
          </span>
        ) : null}
      </div>

      <div className={cn("flex min-w-0 flex-1 flex-col p-3.5 sm:p-5", large && "sm:p-6")}>
        <div className="flex items-center justify-between gap-3">
          <span className={cn("inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] sm:text-[11px]", cat.text)}>
            <Icon className="size-3.5" /> {catLabel}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">{project.year}</span>
        </div>
        <h3 className={cn("mt-1.5 text-base font-semibold sm:mt-2", large ? "sm:text-2xl" : "sm:text-lg")}>{project.title}</h3>
        <p className={cn("mt-1 line-clamp-2 text-[13px] text-muted-foreground sm:mt-1.5 sm:text-sm", large && "sm:line-clamp-3")}>{project.tagline}</p>

        {large ? <p className="mt-3 hidden text-sm text-muted-foreground/90 sm:line-clamp-3">{project.summary}</p> : null}

        <div className="mt-auto flex items-center gap-2 pt-2.5 sm:hidden">
          <StatusPill status={project.status} className="px-2 py-0.5" />
          {project.film ? (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
              <Play className="size-3 fill-current" /> Film
            </span>
          ) : null}
        </div>

        <div className="mt-auto hidden items-end justify-between gap-3 pt-4 sm:flex">
          <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
            {project.stack.slice(0, large ? 5 : 3).map((s) => (
              <li key={s} className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                {s}
              </li>
            ))}
          </ul>
          <ExternalIcons project={project} />
        </div>
        <span className="pointer-events-none absolute right-4 bottom-4 hidden translate-y-1 text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block" aria-hidden="true">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </motion.article>
  );
}
