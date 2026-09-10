import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { countByStatus, projects } from "@/data/projects";
import { AnimatedNumber } from "@/components/animated-number";
import { Reveal } from "@/components/reveal";

export function Intro() {
  const stats = [
    { value: countByStatus("live"), label: "Live in market" },
    { value: countByStatus(["testing", "coming-soon"]), label: "In testing or review" },
    { value: countByStatus("shipped"), label: "Shipped" },
    { value: projects.length, label: "Products total" },
  ];

  return (
    <section id="top" className="relative overflow-hidden px-5 pt-10 pb-8 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20 xl:px-16">
      <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-20 dot-grid [mask-image:radial-gradient(60%_50%_at_70%_0%,black,transparent)]" aria-hidden="true" />

      <Reveal>
        <p className="label-mono">Portfolio · {new Date().getFullYear()}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
          {profile.headline}
        </h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">{profile.intro}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          See the work <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
        <a
          href="#contact"
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          Get in touch
        </a>
      </Reveal>

      <Reveal delay={0.2}>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-5 py-4">
              <dd className="font-display text-3xl font-semibold tabular-nums">
                <AnimatedNumber value={s.value} />
              </dd>
              <dt className="mt-1 text-xs text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
