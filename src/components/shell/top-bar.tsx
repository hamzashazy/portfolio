"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { useVisitorName } from "@/hooks/use-visitor-name";
import { cn } from "@/lib/utils";
import { SocialLinks } from "./social-links";

const ids = nav.map((n) => n.id);
const focus = "focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none";

export function TopBar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);
  const name = useVisitorName();
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // A 1px sentinel at the top of the page tells us when the page has scrolled.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
    <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-px w-px" />
    <header
      data-scrolled={scrolled || undefined}
      className="group sticky top-0 z-40 h-[60px] border-b border-gold/30 bg-bar text-bar-foreground lg:h-[72px]"
    >
      <div className="shell flex h-full items-center gap-3">
        <Link href="/" aria-label="Home" className={cn("flex shrink-0 items-center gap-3 rounded-full", focus)}>
          {/* Avatar hangs below the bar on desktop; the header does not clip. */}
          <span className="relative z-10 size-11 overflow-hidden rounded-full ring-2 ring-gold lg:size-14 lg:translate-y-[18px]">
            <Image src={profile.avatar} alt="" fill priority sizes="56px" className="object-cover" />
          </span>
          <span className="hidden max-w-[14rem] truncate font-display text-[15px] font-medium sm:block">
            Hi{" "}
            <span key={name ?? "there"} className="name-in inline-block max-w-[10ch] truncate align-bottom text-gold">
              {name ?? "there"}
            </span>
            , welcome.
          </span>
        </Link>

        <nav aria-label="Sections" className="ml-auto hidden lg:block">
          <ul className="flex items-center">
            {nav.map((item) => (
              <li key={item.id} className="px-4">
                <Link
                  href={`/#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative inline-block rounded py-2 font-mono text-[12px] tracking-[0.08em] uppercase transition-opacity hover:opacity-100",
                    "after:absolute after:inset-x-0 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 hover:after:scale-x-100 aria-[current=true]:after:scale-x-100",
                    focus,
                    active === item.id ? "opacity-100" : "opacity-[0.72]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <ThemeToggle className="border-bar-foreground/40 bg-transparent text-bar-foreground hover:bg-bar-foreground/10 focus-visible:ring-2 focus-visible:ring-gold" />
          <Link
            href="/#contact"
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-full bg-bar-foreground px-3 pointer-coarse:h-11 sm:px-4 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap text-bar uppercase transition-transform hover:-translate-y-0.5",
              focus,
            )}
          >
            <span className="size-2 shrink-0 animate-pulse-dot rounded-full bg-current text-emerald-600" aria-hidden="true" />
            <span className="hidden md:inline">Available for work – Start a project</span>
            <span className="md:hidden">Start a project</span>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-bar-foreground/40 text-bar-foreground hover:bg-bar-foreground/10 pointer-coarse:size-11 lg:hidden",
                  focus,
                )}
              >
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] gap-0 p-0">
              <SheetHeader className="border-b border-border p-5">
                <SheetTitle className="font-display">Menu</SheetTitle>
                <SheetDescription className="sr-only">Jump to a section of the page.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex flex-col items-start gap-2">
                  <span className="chip max-w-full gap-2 whitespace-normal">
                    <span className="size-2 shrink-0 animate-pulse-dot rounded-full bg-current text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    {profile.availability}
                  </span>
                  <span className="label-mono">{profile.location}</span>
                </div>
                <nav aria-label="Sections">
                  <ul className="flex flex-col gap-2">
                    {nav.map((item, i) => (
                      <li key={item.id} className="sheet-item" style={{ "--i": i } as React.CSSProperties}>
                        <Link
                          href={`/#${item.id}`}
                          onClick={() => setOpen(false)}
                          aria-current={active === item.id ? "true" : undefined}
                          className={cn(
                            "flex min-h-11 items-center rounded-lg px-3 font-mono text-xs tracking-[0.08em] uppercase focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                            active === item.id ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-auto flex flex-col gap-4 pt-6">
                  <a href={profile.resume} download="Hamza-Shahzad-Resume.pdf" className="btn-solid h-10 text-sm">
                    <FileDown className="size-4" /> Download resume
                  </a>
                  <SocialLinks />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* CSS-only scroll progress; hidden where scroll timelines are unsupported. */}
      <div
        aria-hidden="true"
        className="scroll-progress pointer-events-none absolute inset-x-0 bottom-0 hidden h-[3px] origin-left bg-gold"
      />
      {/* Soft shadow, faded in by opacity only once the page has scrolled. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-full h-5 bg-linear-to-b from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-data-[scrolled]:opacity-100"
      />
      <style>{`@supports (animation-timeline: scroll()) {
        .scroll-progress { display: block; animation: scroll-progress linear both; animation-timeline: scroll(root); }
      }
      @keyframes name-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      @keyframes sheet-in { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: none; } }
      .name-in { animation: name-in 350ms cubic-bezier(0.16, 1, 0.3, 1) both; }
      .sheet-item { animation: sheet-in 350ms cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: calc(var(--i, 0) * 40ms + 80ms); }
      @media (prefers-reduced-motion: reduce) { .name-in, .sheet-item { animation: none; } }`}</style>
    </header>
    </>
  );
}
