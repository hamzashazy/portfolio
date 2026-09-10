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

export function SectionHeading({ index, label, title, description, className }: { index: string; label: string; title: string; description?: string; className?: string }) {
  return (
    <Reveal className={cn("mb-8", className)}>
      <p className="label-mono flex items-center gap-2">
        <span className="text-primary">{index}</span>
        <span className="h-px w-6 bg-border" aria-hidden="true" />
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p> : null}
    </Reveal>
  );
}
