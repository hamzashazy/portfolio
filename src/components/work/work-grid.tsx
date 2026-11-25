"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronUp, Compass, SearchX, X } from "lucide-react";
import { CATEGORIES, STATUSES, type Category, type Status } from "@/data/types";
import { getProject, sortedProjects } from "@/data/projects";
import { categoryIcon } from "@/lib/categories";
import { statusDot } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

type Tab = "all" | Category;
const ease = [0.16, 1, 0.3, 1] as const;
/** The home page shows these; the rest sit behind "Show all". */
const picks = ["restaurant-manager", "oleic", "sababa", "sun-drop", "musafir", "workfusion"].map(getProject).filter((p) => !!p);

export function WorkGrid() {
  const [tab, setTab] = useState<Tab>("all");
  const [status, setStatus] = useState<Status | null>(null);
  /** Collapsed: six picks, no filters. Expanded: every project with the filter bar. */
  const [expanded, setExpanded] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  /** When the filter bar is stuck (the grid is scrolled past), keep the section in view so a shorter result set does not jump the page. */
  const keepInView = () => {
    const bar = barRef.current;
    if (!bar) return;
    const section = document.getElementById("work");
    if (section && bar.getBoundingClientRect().top < 100 && section.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
  };
  const selectTab = (t: Tab) => { keepInView(); setTab(t); };
  const selectStatus = (s: Status | null) => { keepInView(); setStatus(s); };

  const clearFilters = () => { keepInView(); setTab("all"); setStatus(null); };

  const visible = sortedProjects.filter((p) => (tab === "all" || p.category === tab) && (!status || p.status === status));
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: sortedProjects.length };
    for (const p of sortedProjects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);
  const activeCategory = CATEGORIES.find((c) => c.id === tab);

  const collapse = () => {
    setExpanded(false);
    clearFilters();
    document.getElementById("work")?.scrollIntoView({ block: "start" });
  };

  if (!expanded) {
    return (
      <div>
        {/* Phones swipe through the picks; wider screens get a grid. */}
        <div className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pt-1 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:overflow-visible sm:p-0 xl:grid-cols-3">
          {picks.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} className="max-sm:w-[84%] max-sm:shrink-0 max-sm:snap-start" />
          ))}
        </div>
        <div className="mt-6 flex justify-center sm:mt-12">
          <button type="button" onClick={() => setExpanded(true)} aria-expanded={false} className="btn-outline w-full pointer-coarse:h-11 sm:w-auto">
            Show all {sortedProjects.length} projects <ChevronDown className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div ref={barRef} className="sticky top-[3.75rem] z-30 -mx-5 border-y border-border bg-background px-5 py-3 sm:-mx-8 sm:px-8 lg:top-[4.5rem] lg:-mx-10 lg:px-10">
        <div role="tablist" aria-label="Project categories" className="scrollbar-none -mx-1 flex gap-1.5 overflow-x-auto px-1 pointer-coarse:gap-2">
          {([{ id: "all" as const, label: "All", short: "All" }, ...CATEGORIES] as { id: Tab; label: string; short: string }[]).map((c) => {
            const selected = tab === c.id;
            const Icon = c.id === "all" ? Compass : categoryIcon[c.id];
            return (
              <button
                key={c.id}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => selectTab(c.id)}
                className={cn(
                  "chip h-9 shrink-0 pointer-coarse:h-11 cursor-pointer gap-2 rounded-full px-3.5 transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  selected ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                <Icon className="size-3.5" />
                <span className="sm:hidden">{c.short}</span>
                <span className="hidden sm:inline">{c.label}</span>
                <span className={selected ? "text-primary-foreground/80" : "text-muted-foreground/70"}>{counts[c.id] ?? 0}</span>
              </button>
            );
          })}
        </div>

        <div className="scrollbar-none mt-2.5 -mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pointer-coarse:mt-2 pointer-coarse:gap-2" aria-label="Filter by status">
          <span className="label-mono mr-1 shrink-0">Status</span>
          {STATUSES.map((s) => {
            const selected = status === s.id;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={selected}
                onClick={() => selectStatus(selected ? null : s.id)}
                className={cn(
                  "inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-2.5 font-mono text-[11px] transition-colors duration-200 pointer-coarse:h-11 pointer-coarse:px-4 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                <span className={cn("size-1.5 rounded-full", statusDot[s.id].split(" ").slice(0, 1).join(" "))} aria-hidden="true" />
                {s.label}
              </button>
            );
          })}
          <AnimatePresence>
            {status ? (
              <motion.button
                key="clear"
                type="button"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6, transition: { duration: 0.1 } }}
                onClick={() => selectStatus(null)}
                className="inline-flex h-7 shrink-0 cursor-pointer items-center gap-1 rounded-full px-2 font-mono text-[11px] text-muted-foreground hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none pointer-coarse:h-11 pointer-coarse:px-3"
              >
                <X className="size-3" /> clear
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={`${tab}-${status ?? "any"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.18, ease } }}
          exit={{ opacity: 0, transition: { duration: 0.08 } }}
          className="mt-5 text-sm text-muted-foreground"
        >
          {activeCategory ? activeCategory.blurb : "Everything, featured first."}{" "}
          <span className="font-mono text-xs">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </span>
        </motion.p>
      </AnimatePresence>

      {/* key remounts the cards on filter change so they fade in; no layout animation. */}
      <div key={`${tab}-${status ?? "any"}`} className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-10 xl:grid-cols-3">
        {visible.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} compact />
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:mt-12">
        <button type="button" onClick={collapse} aria-expanded className="btn-outline w-full pointer-coarse:h-11 sm:w-auto">
          Show fewer <ChevronUp className="size-4" />
        </button>
      </div>

      {visible.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease }}
          className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-14 text-center"
        >
          <SearchX className="size-8 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
          <p className="font-display text-lg font-semibold">Nothing in this combination yet</p>
          <button type="button" onClick={clearFilters} className="btn-outline pointer-coarse:h-11">
            Clear filters
          </button>
        </motion.div>
      ) : null}
    </div>
  );
}
