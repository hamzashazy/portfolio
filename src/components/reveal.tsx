"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, delay = 0, className, as = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, ease, delay }}
      className={className}
    >
      {children}
    </Comp>
  );
}

/** `index` and `label` are kept so old callers compile; they are no longer rendered. */
export function SectionHeading({ title, description, className }: { index?: string; label?: string; title: string; description?: string; className?: string }) {
  return (
    <Reveal className={cn("mb-7 sm:mb-10 lg:mb-12", className)}>
      <h2 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05] font-bold tracking-[-0.025em]">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-lg font-light text-pretty text-muted-foreground">{description}</p> : null}
    </Reveal>
  );
}
