"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { getProject } from "@/data/projects";
import type { Project } from "@/data/types";
import { DeviceFrame } from "@/components/work/device-frame";
import { cn } from "@/lib/utils";

// Hand-picked order for the intro showcase.
const featured = ["oleic", "sababa", "sun-drop", "musafir"]
  .map(getProject)
  .filter((p): p is Project => !!p?.cover);

export function Showcase() {
  const [i, setI] = useState(0);
  if (!featured.length) return null;
  const current = featured[i];

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
        {featured.map((p, idx) => (
          <div
            key={p.slug}
            className={cn("absolute inset-0 transition-opacity duration-500", idx === i ? "opacity-100" : "opacity-0")}
            aria-hidden={idx !== i}
          >
            <DeviceFrame shot={p.cover} shots={p.screenshots} icon={p.icon} title={p.title} category={p.category} priority={idx === 0} />
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div role="group" aria-label="Featured projects" className="flex rounded-full border border-border bg-card p-1">
          {featured.map((p, idx) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setI(idx)}
              aria-pressed={idx === i}
              className={cn(
                "cursor-pointer rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.06em] whitespace-nowrap uppercase transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none pointer-coarse:min-h-11",
                idx === i ? "bg-bar text-bar-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {p.title}
            </button>
          ))}
        </div>
        <Link
          href={`/work/${current.slug}`}
          aria-label={`View ${current.title}`}
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] uppercase underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none pointer-coarse:min-h-11"
        >
          View project
          <ArrowRight className="size-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
