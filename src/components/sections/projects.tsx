import Image from "next/image";
import { ArrowUpRight, CircleDashed, CheckCircle2, Github, Smartphone, BrainCircuit, Bot, Building2, Sprout, MessageSquareLock } from "lucide-react";

import { projectsData, type Project } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/reveal";
import { cn } from "@/lib/utils";

const accentStyles: Record<Project["accent"], { gradient: string; text: string; chip: string }> = {
  emerald: {
    gradient: "from-emerald-500/25 via-emerald-500/5 to-transparent",
    text: "text-emerald-500 dark:text-emerald-400",
    chip: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  violet: {
    gradient: "from-violet-500/25 via-violet-500/5 to-transparent",
    text: "text-violet-500 dark:text-violet-400",
    chip: "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  sky: {
    gradient: "from-sky-500/25 via-sky-500/5 to-transparent",
    text: "text-sky-500 dark:text-sky-400",
    chip: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  amber: {
    gradient: "from-amber-500/25 via-amber-500/5 to-transparent",
    text: "text-amber-500 dark:text-amber-400",
    chip: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  lime: {
    gradient: "from-lime-500/25 via-lime-500/5 to-transparent",
    text: "text-lime-600 dark:text-lime-400",
    chip: "border-lime-500/30 bg-lime-500/10 text-lime-600 dark:text-lime-400",
  },
  rose: {
    gradient: "from-rose-500/25 via-rose-500/5 to-transparent",
    text: "text-rose-500 dark:text-rose-400",
    chip: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
};

const projectIcons: Record<string, React.ElementType> = {
  Prep: Smartphone,
  WorkFusion: BrainCircuit,
  "AI Meeting Assistant": Bot,
  "Campus Management System": Building2,
  ZaraiSense: Sprout,
  "Anonymous Messaging Platform": MessageSquareLock,
};

function StatusBadge({ project }: { project: Project }) {
  const accent = accentStyles[project.accent];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium",
        accent.chip
      )}
    >
      {project.status === "in-progress" ? (
        <CircleDashed className="h-3 w-3 animate-[spin_3s_linear_infinite]" />
      ) : (
        <CheckCircle2 className="h-3 w-3" />
      )}
      {project.statusLabel}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-2">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub`}
          className="rounded-full border border-border/60 bg-background/60 p-2 text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Github className="h-4 w-4" />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live demo`}
          className="rounded-full border border-border/60 bg-background/60 p-2 text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-primary"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

function FeaturedCard({ project, delay }: { project: Project; delay: number }) {
  const accent = accentStyles[project.accent];
  const Icon = projectIcons[project.title] ?? Smartphone;

  return (
    <Reveal delay={delay} className="group">
      <div className="glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70", accent.gradient)} aria-hidden="true" />

        <div className="relative flex h-full flex-col p-7 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className={cn("rounded-2xl border border-border/60 bg-background/50 p-3 backdrop-blur", accent.text)}>
              <Icon className="h-7 w-7" />
            </div>
            <StatusBadge project={project} />
          </div>

          <h3 className="mt-6 font-headline text-2xl font-bold tracking-tight md:text-3xl">{project.title}</h3>
          <p className={cn("mt-1 font-mono text-xs", accent.text)}>{project.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{project.description}</p>

          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2.5">
                <span className={cn("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-current", accent.text)} />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-md bg-secondary/80 px-2 py-1 font-mono text-xs text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function CompactCard({ project, delay }: { project: Project; delay: number }) {
  const accent = accentStyles[project.accent];
  const Icon = projectIcons[project.title] ?? Smartphone;

  return (
    <Reveal delay={delay} className="group h-full">
      <div className="glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
        {project.image ? (
          <div className="relative h-40 overflow-hidden border-b border-border/60">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          </div>
        ) : (
          <div className={cn("relative flex h-40 items-center justify-center border-b border-border/60 bg-gradient-to-br", accent.gradient)}>
            <Icon className={cn("h-12 w-12 opacity-80", accent.text)} />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-headline text-lg font-bold">{project.title}</h3>
            <StatusBadge project={project} />
          </div>
          <p className={cn("mt-0.5 font-mono text-[11px]", accent.text)}>{project.subtitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((tech) => (
                <span key={tech} className="rounded-md bg-secondary/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function ProjectsSection() {
  const featured = projectsData.filter((p) => p.featured);
  const rest = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div
        className="absolute right-0 top-40 -z-10 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          index="02"
          label="Projects"
          title="Selected work"
          description="Client apps, AI systems, and platforms — from in-progress MVPs to shipped products."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((project, i) => (
            <FeaturedCard key={project.title} project={project} delay={i * 100} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {rest.map((project, i) => (
            <CompactCard key={project.title} project={project} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
