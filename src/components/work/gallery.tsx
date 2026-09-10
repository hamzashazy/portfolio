"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Category, Screenshot } from "@/data/types";
import { cn } from "@/lib/utils";
import { DeviceFrame } from "./device-frame";

const ease = [0.16, 1, 0.3, 1] as const;

export function Gallery({ shots, title, category }: { shots: Screenshot[]; title: string; category: Category }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [open, setOpen] = useState(false);
  const shot = shots[index];
  const portrait = shot.frame === "phone";

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex((next + shots.length) % shots.length);
  };

  return (
    <div>
      <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-card", portrait ? "aspect-[16/11] sm:aspect-[16/9]" : "aspect-[16/10]")}>
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={shot.src}
            custom={dir}
            initial={{ opacity: 0, x: dir * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * 24, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.35, ease }}
            className="absolute inset-0"
          >
            <DeviceFrame shot={shot} title={title} category={category} sizes="(min-width: 1280px) 900px, 100vw" priority />
          </motion.div>
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open full size"
          className="absolute top-3 right-3 z-10 inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <Maximize2 className="size-4" />
        </button>
        {shots.length > 1 ? (
          <>
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous screenshot" className="absolute top-1/2 left-3 z-10 inline-flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-colors hover:text-primary">
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next screenshot" className="absolute top-1/2 right-3 z-10 inline-flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-colors hover:text-primary">
              <ChevronRight className="size-4" />
            </button>
          </>
        ) : null}
      </div>
      <p className="mt-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>{shot.alt}</span>
        <span>
          {index + 1} / {shots.length}
        </span>
      </p>
      {shots.length > 1 ? (
        <ul className="scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Screenshots">
          {shots.map((s, i) => (
            <li key={s.src} className="shrink-0">
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Show screenshot ${i + 1}: ${s.alt}`}
                aria-current={i === index}
                className={cn(
                  "relative block h-16 w-24 cursor-pointer overflow-hidden rounded-lg border transition-all duration-200",
                  i === index ? "border-primary ring-2 ring-primary/30" : "border-border opacity-70 hover:opacity-100",
                )}
              >
                <Image src={s.src} alt="" fill sizes="96px" className="object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] w-[min(96vw,1200px)] max-w-none overflow-hidden border-border bg-background p-2 sm:max-w-none">
          <DialogTitle className="sr-only">{shot.alt}</DialogTitle>
          <div className="relative h-[80vh] w-full">
            <Image src={shot.src} alt={shot.alt} fill sizes="96vw" className="object-contain" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
