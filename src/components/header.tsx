"use client";

import React, { useState, useEffect } from "react";
import { Menu, TerminalSquare } from "lucide-react";

import { navLinks, socialLinks, heroData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sectionIds = ["home", ...navLinks.map((l) => l.href.substring(1))];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 160;
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) current = id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={cn(
          "flex w-full max-w-5xl items-center gap-2 rounded-2xl border px-4 py-2.5 transition-all duration-300",
          isScrolled
            ? "glass shadow-lg shadow-black/5"
            : "border-transparent bg-transparent"
        )}
      >
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight"
        >
          <TerminalSquare className="h-5 w-5 text-primary" />
          <span>
            hamza<span className="text-primary">.dev</span>
          </span>
        </a>

        <nav className="mx-auto hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                activeSection === link.href.substring(1)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <div className="hidden items-center gap-1 md:flex">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  <link.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-6 flex flex-col gap-6">
                <a href="#home" className="flex items-center gap-2 font-mono text-sm font-bold">
                  <TerminalSquare className="h-5 w-5 text-primary" />
                  <span>
                    hamza<span className="text-primary">.dev</span>
                  </span>
                </a>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <a
                        href={link.href}
                        onClick={(e) => scrollTo(e, link.href)}
                        className="rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        {link.name}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="flex items-center gap-2 border-t pt-4">
                  {socialLinks.map((link) => (
                    <Button key={link.name} variant="outline" size="icon" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                        <link.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                  <span className="ml-auto font-mono text-xs text-muted-foreground">
                    {heroData.contact.email.split("@")[0]}
                  </span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
