"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function HireDock() {
  const pathname = usePathname();
  const [entered, setEntered] = useState(false); // gate gone
  const [shown, setShown] = useState(false); // after the 1.2s delay
  const [dismissed, setDismissed] = useState(true);
  const [atContact, setAtContact] = useState(false);
  const [pastHero, setPastHero] = useState(false); // hero (#top) scrolled off, or page has none

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setEntered(!!root.dataset.entered);
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-entered"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (!entered) return;
    const t = setTimeout(() => {
      try {
        setDismissed(!!sessionStorage.getItem("dockDismissed"));
      } catch {
        setDismissed(false);
      }
      setShown(true);
    }, 1200);
    return () => clearTimeout(t);
  }, [entered]);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting));
    io.observe(el);
    return () => {
      io.disconnect();
      setAtContact(false);
    };
  }, [pathname]);

  useEffect(() => {
    const el = document.getElementById("top");
    if (!el) {
      // No hero on this page (e.g. /work/[slug]): rely on the 1.2s delay alone.
      const t = setTimeout(() => setPastHero(true), 0);
      return () => {
        clearTimeout(t);
        setPastHero(false);
      };
    }
    const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting));
    io.observe(el);
    return () => {
      io.disconnect();
      setPastHero(false);
    };
  }, [pathname]);

  if (dismissed) return null;
  const visible = shown && pastHero && !atContact;

  return (
    <div
      role="region"
      aria-label="Hire me"
      inert={!visible}
      className={cn(
        "fixed bottom-4 left-1/2 z-30 flex w-max max-sm:hidden max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-border bg-card py-2 pr-2 pl-2 shadow-lg shadow-black/10 transition-[translate,opacity]",
        // Enter slowly from below, leave faster.
        visible
          ? "-translate-x-1/2 translate-y-0 opacity-100 duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          : "pointer-events-none -translate-x-1/2 translate-y-6 opacity-0 duration-200 ease-in",
      )}
    >
      <span className="relative size-9 shrink-0">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <Image src={profile.avatar} alt="" fill sizes="36px" className="object-cover" />
        </span>
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 size-2.5 animate-pulse-dot rounded-full bg-current text-emerald-500 ring-2 ring-card"
        />
      </span>
      <span className="min-w-0 truncate text-sm font-medium">Available for work</span>
      <Link href="/#contact" className="btn-solid h-9 shrink-0 px-4 pointer-coarse:h-11">
        Hire me
      </Link>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem("dockDismissed", "1");
          } catch {}
        }}
        className="inline-flex size-8 shrink-0 pointer-coarse:size-11 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
