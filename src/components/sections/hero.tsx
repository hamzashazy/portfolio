"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, FileText, Sparkles } from "lucide-react";

import { heroData, socialLinks, marqueeTech } from "@/lib/data";
import { Button } from "@/components/ui/button";

function useTypewriter(words: string[], typeSpeed = 70, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 35 : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, pause]);

  return text;
}

export default function HeroSection() {
  const typedRole = useTypewriter(heroData.roles);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      {/* Backdrop */}
      <div className="bg-dot-grid bg-dot-grid-fade absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          {/* Left — intro */}
          <div className="flex flex-col items-start">
            <div className="glass mb-6 flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4">
              <span className="relative flex h-7 w-7 overflow-hidden rounded-full ring-1 ring-primary/40">
                <Image src="/prof.jpg" alt={heroData.name} fill sizes="28px" style={{ objectFit: "cover", objectPosition: "50% 12%" }} />
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">{heroData.availability}</span>
            </div>

            <h1 className="font-headline text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              Hamza
              <br />
              <span className="text-gradient">Shahzad</span>
            </h1>

            <p className="mt-5 h-7 font-mono text-base text-primary md:text-lg">
              <span className="text-muted-foreground">&gt; </span>
              {typedRole}
              <span className="animate-blink">▊</span>
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {heroData.introduction}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="glow-primary rounded-full px-7" asChild>
                <a href="#projects" onClick={(e) => scrollTo(e, "#projects")}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  See my work
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-7" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
              <div className="flex items-center gap-1">
                {socialLinks.map((link) => (
                  <Button key={link.name} variant="ghost" size="icon" className="rounded-full" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                      <link.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-12 grid w-full max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border/60 sm:grid-cols-4">
              {heroData.stats.map((stat) => (
                <div key={stat.label} className="bg-background/80 px-4 py-4 backdrop-blur">
                  <p className="font-headline text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — terminal card */}
          <div className="relative hidden lg:block">
            <div
              className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="glass overflow-hidden rounded-2xl shadow-2xl shadow-black/20">
              <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">hamza@dev — ~/portfolio</span>
              </div>
              <div className="space-y-4 p-6 font-mono text-sm leading-relaxed">
                <div>
                  <p className="text-muted-foreground">
                    <span className="text-primary">$</span> whoami
                  </p>
                  <p className="mt-1 text-foreground">{heroData.name} · {heroData.tagline}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    <span className="text-primary">$</span> cat stack.json
                  </p>
                  <pre className="mt-1 overflow-x-auto text-xs leading-relaxed text-muted-foreground">
{`{
  "web":    ["Next.js", "React", "Node.js"],
  "mobile": ["Flutter", "Dart"],
  "data":   ["MongoDB", "Supabase", "Postgres"],
  "ai":     ["Claude API", "RAG", "Embeddings"]
}`}
                  </pre>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    <span className="text-primary">$</span> git log --oneline -3
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    <span className="text-accent">a3f21c9</span> feat: prep restaurant app — MVP ordering flow
                    <br />
                    <span className="text-accent">7b90d2e</span> feat: real-estate CRM ai automations
                    <br />
                    <span className="text-accent">c14e8aa</span> feat: workfusion RAG matching engine
                  </p>
                </div>
                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> <span className="animate-blink">▊</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech marquee */}
        <div className="marquee-mask mt-16 overflow-hidden md:mt-20">
          <div className="animate-marquee flex w-max items-center gap-10">
            {[...marqueeTech, ...marqueeTech].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted-foreground/70"
              >
                {tech}
                <span className="text-primary/40">◆</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 hidden justify-center md:flex">
          <a
            href="#experience"
            onClick={(e) => scrollTo(e, "#experience")}
            className="text-muted-foreground/60 transition-colors hover:text-primary"
            aria-label="Scroll to experience"
          >
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
