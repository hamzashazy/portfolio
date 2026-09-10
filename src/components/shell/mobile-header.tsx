"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileDown, MapPin, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/data/profile";
import { Nav } from "./nav";
import { SocialLinks } from "./social-links";

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur lg:hidden">
      <Link href="/" className="flex min-w-0 flex-1 items-center gap-3" aria-label="Home">
        <span className="relative size-9 shrink-0 overflow-hidden rounded-xl ring-1 ring-border">
          <Image src={profile.avatar} alt="" fill sizes="36px" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-base leading-tight font-semibold">{profile.name}</span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="truncate">{profile.availability}</span>
          </span>
        </span>
      </Link>
      <ThemeToggle />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
          >
            <Menu className="size-4" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] gap-0 p-0">
          <SheetHeader className="border-b border-border p-5">
            <SheetTitle className="font-display">Menu</SheetTitle>
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5" /> {profile.location}
            </p>
          </SheetHeader>
          <div className="flex flex-1 flex-col p-5">
            <Nav onNavigate={() => setOpen(false)} />
            <div className="mt-auto flex flex-col gap-4 pt-6">
              <a
                href={profile.resume}
                download="Hamza-Shahzad-Resume.pdf"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground"
              >
                <FileDown className="size-4" /> Download resume
              </a>
              <SocialLinks />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
