"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, ExternalLink, Globe } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import { motion } from "motion/react";
import type { Project } from "@/data/types";
import { CATEGORIES } from "@/data/types";
import { categoryClass, categoryIcon } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { DeviceFrame } from "./device-frame";
import { StatusPill } from "./status-pill";

function ExternalIcons({ project }: { project: Project }) {
  const items = [
    project.links.live && { href: project.links.live, label: "Live site", icon: ExternalLink },
    project.links.original && { href: project.links.original, label: "Original product", icon: Globe },
    project.links.releases && { href: project.links.releases, label: "Download installers", icon: Download },
    project.links.github && { href: project.links.github, label: "Source on GitHub", icon: Github },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];
  if (items.length === 0) return null;
  return (
    <div className="relative z-10 flex items-center gap-1.5 pointer-coarse:gap-2">
      {items.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}: ${label}`}
          title={label}
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-[transform,color,border-color] duration-200 pointer-coarse:size-11 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Icon className="size-3.5" />
        </a>
      ))}
    </div>
  );
}

/** `compact` turns the card into a thumbnail row on phones (used for the long, filterable list). */
export function ProjectCard({ project, index = 0, compact = false, className }: { project: Project; index?: number; compact?: boolean; className?: string }) {
  const cat = categoryClass[project.category];
  const Icon = categoryIcon[project.category];
  const catLabel = CATEGORIES.find((c) => c.id === project.category)?.label;

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.012, 0.06) }}
      className={cn("group relative flex gap-4 transition-[scale] duration-150 ease-out active:scale-[0.99] has-[:focus-visible]:[&_.tile-img]:border-primary/60", compact ? "gap-4 sm:flex-col sm:gap-0" : "flex-col", className)}
    >
      <Link href={`/work/${project.slug}`} className="absolute -inset-2 z-[1] rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" aria-label={`${project.title}: open case study`} />

      {/* Only the image lifts on hover (transform), nothing around it moves. */}
      <div className={cn("tile-img relative shrink-0 overflow-hidden rounded-xl border border-border transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:duration-300 group-hover:ease-out-expo group-has-[:focus-visible]:-translate-y-1", compact ? "min-h-[96px] w-[104px] sm:aspect-[16/10] sm:min-h-0 sm:w-auto" : "aspect-[16/10]")}>
        {compact && project.cover ? (
          <Image src={project.cover.src} alt={project.cover.alt} fill sizes="104px" className="object-cover object-top sm:hidden" />
        ) : null}
        <div className={cn("h-full w-full", compact && project.cover && "hidden sm:block")}>
          <DeviceFrame shot={project.cover} shots={project.screenshots} icon={project.icon} title={project.title} category={project.category} priority={index < 2} />
        </div>
      </div>

      <div className={cn("flex min-w-0 flex-1 flex-col", compact ? "sm:pt-4" : "pt-4")}>
        <div className="flex items-center justify-between gap-3">
          <span className={cn("inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] sm:text-[11px]", cat.text)}>
            <Icon className="size-3.5" /> {catLabel}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">{project.year}</span>
        </div>
        <h3 className="mt-1.5 flex items-center gap-1.5 font-display text-lg leading-tight font-bold sm:text-xl">
          {project.title}
          <ArrowRight className="size-4 shrink-0 -translate-x-1 opacity-0 transition-[translate,opacity] duration-150 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:duration-300 group-hover:ease-out-expo group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100" aria-hidden="true" />
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground sm:text-sm">{project.tagline}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <StatusPill status={project.status} note={project.statusNote} />
          <span className="hidden sm:block">
            <ExternalIcons project={project} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
