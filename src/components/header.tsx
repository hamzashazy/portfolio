"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Code } from "lucide-react";

import { navLinks, socialLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks
        .map(link => (typeof link.href === 'string' ? document.querySelector(link.href.startsWith('#') ? link.href : `#${link.href}`) : null))
        .filter(Boolean) as HTMLElement[];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          setActiveSection(section.id);
          // Update URL without page reload
          window.history.replaceState(null, '', `/${section.id}`);
          return;
        }
      }
      
      if (window.scrollY < 200) {
        setActiveSection("home");
        window.history.replaceState(null, '', '/');
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/${sectionId}`);
    }
  };

  const NavLink = ({ href, children, sectionId }: { href: string; children: React.ReactNode, sectionId: string }) => (
    <a
      href={href}
      onClick={(e) => handleNavClick(e, href, sectionId)}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
        activeSection === sectionId ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </a>
  );

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b transition-colors", isScrolled ? "border-border bg-background/80 backdrop-blur-sm" : "border-transparent bg-background")}>
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home', 'home')}
          className="mr-6 flex items-center gap-2 font-headline text-lg font-bold cursor-pointer"
        >
          <Code className="h-6 w-6 text-primary" />
          <span>Hamza's Hub</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} sectionId={link.href.substring(1)}>
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
                {socialLinks.map((link) => (
                    <Button key={link.name} variant="ghost" size="icon" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                            <link.icon className="h-4 w-4" />
                        </a>
                    </Button>
                ))}
                <ThemeToggle />
            </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <a 
                  href="#home" 
                  onClick={(e) => handleNavClick(e, '#home', 'home')}
                  className="flex items-center gap-2 font-headline text-lg font-bold cursor-pointer"
                >
                    <Code className="h-6 w-6 text-primary" />
                    <span>Hamza's Hub</span>
                </a>
                <nav className="grid gap-2">
                    {navLinks.map((link) => (
                        <SheetClose key={link.href} asChild>
                            <a 
                              href={link.href} 
                              onClick={(e) => handleNavClick(e, link.href, link.href.substring(1))}
                              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                            >
                                {link.name}
                            </a>
                        </SheetClose>
                    ))}
                </nav>
                <div className="mt-4 flex items-center justify-center gap-4">
                    {socialLinks.map((link) => (
                        <Button key={link.name} variant="ghost" size="icon" asChild>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                                <link.icon className="h-5 w-5" />
                            </a>
                        </Button>
                    ))}
                    <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
