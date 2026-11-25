"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { setVisitorName } from "@/hooks/use-visitor-name";
import { cn } from "@/lib/utils";

export function WelcomeGate() {
  const [leaving, setLeaving] = useState(false); // content fading out
  const [panelOut, setPanelOut] = useState(false); // panel sliding away
  const [leaveName, setLeaveName] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const inputId = useId();

  const enter = (skip = false) => {
    if (leaving || timers.current.length) return; // timers guard covers the stale Escape closure
    const name = skip ? "" : (input.current?.value.trim() ?? "");
    const root = document.documentElement;
    const finish = () => {
      setVisitorName(name);
      root.dataset.entered = "1";
      root.style.overflow = "";
    };
    try {
      localStorage.setItem("entered", "1");
    } catch {}
    setLeaveName(name);
    setLeaving(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    // Content fades (250ms), then the panel slides (600ms). Reveal and scroll unlock happen together.
    timers.current.push(
      setTimeout(() => {
        setVisitorName(name);
        setPanelOut(true);
      }, 250),
      setTimeout(finish, 850),
    );
  };

  // Not shown for returning visitors, so skip scroll lock and focus then.
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.entered) return;
    root.style.overflow = "hidden";
    const pending = timers.current;
    input.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      pending.forEach(clearTimeout);
      root.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rise = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <div
      id="welcome-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-bar px-5 text-bar-foreground transition-transform duration-[600ms] ease-[cubic-bezier(0.77,0,0.18,1)]",
        "bg-[radial-gradient(60%_50%_at_50%_40%,color-mix(in_oklch,var(--gold)_16%,transparent),transparent)]",
        panelOut && "-translate-y-full",
      )}
    >
      <style>{`
        .gate-halo::before { content: ""; position: absolute; inset: -10px; border-radius: 9999px; opacity: 0;
          background: conic-gradient(from 0deg, transparent 0 55%, var(--gold) 90%, transparent 100%);
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
          mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px));
          animation: gate-halo 2.4s cubic-bezier(0.4, 0, 0.2, 1) 0.6s 1 both; }
        @keyframes gate-halo { 0% { opacity: 0; transform: rotate(0); } 15%, 85% { opacity: 1; } 100% { opacity: 0; transform: rotate(360deg); } }
      `}</style>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          enter();
        }}
        className={cn(
          "flex max-w-xl flex-col items-center py-10 text-center transition-[translate,opacity] duration-250 ease-out",
          leaving && "-translate-y-3 opacity-0",
        )}
      >
        <span className="gate-halo animate-rise relative size-28 rounded-full" style={rise(0)}>
          <span className="absolute inset-0 overflow-hidden rounded-full ring-2 ring-gold ring-offset-4 ring-offset-bar">
            <Image src={profile.avatar} alt="" fill priority sizes="112px" className="object-cover" />
          </span>
        </span>
        <h2 id={titleId} className="animate-rise mt-8 font-display text-[40px] leading-[1.05] font-bold sm:text-[64px]" style={rise(100)}>
          Hi there, <span className="gold-text">welcome.</span>
        </h2>
        <p className="animate-rise mt-5 text-base leading-relaxed text-bar-foreground/80 sm:text-lg" style={rise(200)}>
          I&apos;m Hamza. I build AI-driven products and the apps around them.
          <br />
          Take a look around, and say hello whenever you&apos;re ready.
        </p>
        <label htmlFor={inputId} className="sr-only">
          Your name (optional)
        </label>
        <input
          ref={input}
          id={inputId}
          type="text"
          maxLength={40}
          autoComplete="given-name"
          placeholder="YOUR NAME (OPTIONAL)"
          className="animate-rise mt-8 h-12 min-h-11 w-full max-w-xs rounded-full border border-bar-foreground/30 bg-transparent px-5 text-center text-base placeholder:font-mono placeholder:text-[11px] placeholder:tracking-[0.12em] placeholder:text-bar-foreground/60 focus-visible:border-gold focus-visible:bg-bar-foreground/10 focus-visible:ring-[3px] focus-visible:ring-gold/70 focus-visible:outline-none"
          style={rise(300)}
        />
        <button
          type="submit"
          className="animate-rise mt-4 inline-flex h-12 max-w-full cursor-pointer items-center rounded-full bg-bar-foreground px-7 font-mono text-[12px] tracking-[0.12em] text-bar uppercase transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bar focus-visible:outline-none"
          style={rise(400)}
        >
          <span className="grid max-w-[18rem]">
            <span
              aria-hidden={leaving}
              className={cn("col-start-1 row-start-1 transition-opacity duration-200", leaving && "opacity-0")}
            >
              Enter the portfolio →
            </span>
            <span
              aria-hidden={!leaving}
              className={cn("col-start-1 row-start-1 truncate opacity-0 transition-opacity duration-200", leaving && "opacity-100")}
            >
              Welcome in{leaveName ? `, ${leaveName}` : ""}
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => enter(true)}
          className="mt-2 inline-flex min-h-11 cursor-pointer items-center rounded-full px-5 font-mono text-[11px] tracking-[0.12em] text-bar-foreground/75 uppercase underline-offset-4 transition-colors hover:text-bar-foreground hover:underline focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bar focus-visible:outline-none"
          style={rise(500)}
        >
          Skip
        </button>
      </form>
    </div>
  );
}
