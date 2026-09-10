"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Compass, X } from "lucide-react";
import { CATEGORIES, STATUSES, type Category, type Status } from "@/data/types";
import { sortedProjects } from "@/data/projects";
import { categoryIcon } from "@/lib/categories";
import { statusDot } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

type Tab = "all" | Category;
const ease = [0.16, 1, 0.3, 1] as const;

export function WorkGrid() {
  const [tab, setTab] = useState<Tab>("all");
  const [status, setStatus] = useState<Status | null>(null);

  const visible = useMemo(
    () => sortedProjects.filter((p) => (tab === "all" || p.category === tab) && (!status || p.status === status)),
    [tab, status],
  );
  const showLarge = tab === "all" && !status;
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: sortedProjects.length };
    for (const p of sortedProjects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);
  const activeCategory = CATEGORIES.find((c) => c.id === tab);

  return (
    <div>
      <div className="sticky top-[61px] z-30 -mx-5 border-y border-border bg-background/85 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:top-0 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16">
        <div role="tablist" aria-label="Project categories" className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-1">
          <LayoutGroup id="work-tabs">
            {([{ id: "all" as const, label: "All", short: "All" }, ...CATEGORIES] as { id: Tab; label: string; short: string }[]).map((c) => {
              const selected = tab === c.id;
              const Icon = c.id === "all" ? Compass : categoryIcon[c.id];
              return (
                <button
                  key={c.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setTab(c.id)}
                  className={cn(
                    "relative inline-flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-full px-3.5 text-sm transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    selected ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {selected ? (
                    <motion.span layoutId="work-tab-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  ) : null}
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <Icon className="size-3.5" />
                    <span className="sm:hidden">{c.short}</span>
                    <span className="hidden sm:inline">{c.label}</span>
                    <span className={cn("font-mono text-[10px]", selected ? "text-primary-foreground/80" : "text-muted-foreground/70")}>{counts[c.id] ?? 0}</span>
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>

        <div className="scrollbar-none mt-2.5 -mx-1 flex items-center gap-1.5 overflow-x-auto px-1" aria-label="Filter by status">
          <span className="label-mono mr-1 shrink-0">Status</span>
          {STATUSES.map((s) => {
            const selected = status === s.id;
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setStatus(selected ? null : s.id)}
                className={cn(
                  "inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-2.5 font-mono text-[11px] transition-all duration-200 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  selected ? "border-foreground/40 bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
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
                exit={{ opacity: 0, x: -6 }}
                onClick={() => setStatus(null)}
                className="inline-flex h-7 shrink-0 cursor-pointer items-center gap-1 rounded-full px-2 font-mono text-[11px] text-muted-foreground hover:text-foreground"
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
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease }}
          className="mt-5 text-sm text-muted-foreground"
        >
          {activeCategory ? activeCategory.blurb : "Everything, featured first."}{" "}
          <span className="font-mono text-xs">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </span>
        </motion.p>
      </AnimatePresence>

      <LayoutGroup id="work-grid">
        <motion.div layout className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} large={showLarge && p.featured} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <AnimatePresence>
        {visible.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-14 text-center"
          >
            <motion.span animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="text-muted-foreground">
              <Compass className="size-8" strokeWidth={1.5} />
            </motion.span>
            <p className="text-sm text-muted-foreground">Nothing in this category has that status yet.</p>
            <button type="button" onClick={() => setStatus(null)} className="cursor-pointer text-sm text-primary underline-offset-4 hover:underline">
              Clear the status filter
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
