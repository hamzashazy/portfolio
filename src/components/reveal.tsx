"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
};

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Huge top margin so elements skipped past in a fast scroll still register
      // as intersecting and reveal — a plain 0px margin leaves them invisible forever.
      { threshold: 0, rootMargin: "9999px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(visible ? "reveal-visible" : "reveal-hidden", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="section-label mb-3">
        <span className="text-muted-foreground/60">{index} /</span> {label}
      </p>
      <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
