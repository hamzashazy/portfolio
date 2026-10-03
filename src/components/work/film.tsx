"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Film as FilmData } from "@/data/types";
import { cn } from "@/lib/utils";

/** Shows only the poster until the visitor presses play, so the video never costs anything on page load. */
export function Film({ film, title, className }: { film: FilmData; title: string; className?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-2xl border border-border bg-black", className)}>
      {playing ? (
        <video src={film.src} poster={film.poster} controls autoPlay playsInline preload="auto" className="h-full w-full" />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play the ${title} film (${film.seconds} seconds)`}
          className="group absolute inset-0 cursor-pointer focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Image src={film.poster} alt="" fill sizes="(min-width: 1280px) 900px, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]" />
          <span className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10" aria-hidden="true" />
          <span className="absolute top-1/2 left-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 group-hover:scale-110">
            <Play className="size-6 translate-x-0.5 fill-current" />
          </span>
          <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
            0:{String(film.seconds).padStart(2, "0")} · with sound
          </span>
        </button>
      )}
    </div>
  );
}
