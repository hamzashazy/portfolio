import Link from "next/link";
import { Download } from "lucide-react";
import { AnimatedNumber } from "@/components/animated-number";
import { Reveal, SectionHeading } from "@/components/reveal";
import { countByStatus, projects, sortedProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import type { Platform } from "@/data/types";

const platformLabel: Record<Platform, string> = { web: "Web", android: "Android", ios: "iOS", desktop: "Desktop", discord: "Discord" };

const stats = [
  { value: countByStatus("live"), label: "Live in market" },
  { value: countByStatus(["testing", "coming-soon"]), label: "In testing or review" },
  { value: countByStatus("shipped"), label: "Shipped" },
  { value: projects.length, label: "Products total" },
];

const active = sortedProjects.filter((p) => ["testing", "coming-soon", "in-development"].includes(p.status)).slice(0, 6);
const platforms = [...new Set(projects.flatMap((p) => p.platforms))].map((p) => platformLabel[p]);

export function Proof() {
  return (
    <section id="proof" className="band scroll-mt-16">
      <div className="shell py-12 sm:py-16 lg:py-24">
        <SectionHeading title="Built, shipped, in market" description="Every project carries its real status, from prototype to live." />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.05} className="surface p-6">
              <AnimatedNumber value={s.value} className="font-numeric text-4xl text-gold sm:text-5xl" />
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <h3 className="label-mono">In progress now</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {active.map((p) => (
                <li key={p.slug} className="relative flex items-center gap-4 py-3.5">
                  <div className="min-w-0 flex-1">
                    <Link href={`/work/${p.slug}`} className="font-medium underline-offset-4 after:absolute after:inset-0 hover:underline focus-visible:underline focus-visible:outline-none">
                      {p.title}
                    </Link>
                    <p className="truncate text-sm text-muted-foreground">{p.statusNote ?? p.tagline}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" /> Active
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="label-mono">Where I work</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {platforms.map((p) => (
                <li key={p} className="chip">{p}</li>
              ))}
            </ul>
            <a href={profile.resume} download="Hamza-Shahzad-Resume.pdf" className="btn-solid mt-8">
              <Download className="size-4" /> Download resume
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
