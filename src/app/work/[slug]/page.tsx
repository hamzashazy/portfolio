import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, ExternalLink, Globe, Monitor, Smartphone, Apple, MessageSquare, Globe2 } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Gallery } from "@/components/work/gallery";
import { DeviceFrame } from "@/components/work/device-frame";
import { StatusPill } from "@/components/work/status-pill";
import { Reveal } from "@/components/reveal";
import { getProject, sortedProjects } from "@/data/projects";
import { CATEGORIES, STATUSES, type Platform } from "@/data/types";
import { categoryClass, categoryIcon } from "@/lib/categories";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return sortedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: `${project.title} · ${profile.name}`, description: project.tagline, type: "article" },
  };
}

const platformMeta: Record<Platform, { label: string; icon: typeof Monitor }> = {
  web: { label: "Web", icon: Globe2 },
  android: { label: "Android", icon: Smartphone },
  ios: { label: "iOS", icon: Apple },
  desktop: { label: "Desktop", icon: Monitor },
  discord: { label: "Discord", icon: MessageSquare },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = sortedProjects.findIndex((p) => p.slug === slug);
  const prev = sortedProjects[(idx - 1 + sortedProjects.length) % sortedProjects.length];
  const next = sortedProjects[(idx + 1) % sortedProjects.length];
  const cat = categoryClass[project.category];
  const Icon = categoryIcon[project.category];
  const category = CATEGORIES.find((c) => c.id === project.category);
  const statusInfo = STATUSES.find((s) => s.id === project.status);

  const linkButtons = [
    project.links.live && { href: project.links.live, label: "Visit live site", icon: ExternalLink, primary: true },
    project.links.releases && { href: project.links.releases, label: "Download installers", icon: Download, primary: true },
    project.links.original && { href: project.links.original, label: "Original product", icon: Globe, primary: !project.links.live && !project.links.releases },
    project.links.playStore && { href: project.links.playStore, label: "Google Play", icon: Smartphone, primary: true },
    project.links.github && { href: project.links.github, label: "Source on GitHub", icon: GithubIcon, primary: false },
  ].filter(Boolean) as { href: string; label: string; icon: typeof ExternalLink; primary: boolean }[];

  const shots = project.screenshots.length > 0 ? project.screenshots : project.cover ? [project.cover] : [];

  return (
    <article className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12 xl:px-16">
      <Reveal>
        <Link href="/#work" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-4" /> All work
        </Link>
      </Reveal>

      <Reveal delay={0.05} className="mt-6 flex flex-wrap items-center gap-3">
        <span className={cn("inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] uppercase", cat.text)}>
          <Icon className="size-3.5" /> {category?.label}
        </span>
        <StatusPill status={project.status} note={project.statusNote} />
        <span className="font-mono text-[11px] text-muted-foreground">{project.year}</span>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{project.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{project.tagline}</p>
      </Reveal>

      {linkButtons.length > 0 ? (
        <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-2">
          {linkButtons.map(({ href, label, icon: LIcon, primary }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl px-4 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                primary ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25" : "border border-border bg-card hover:border-primary/40",
              )}
            >
              <LIcon className="size-4" /> {label}
            </a>
          ))}
        </Reveal>
      ) : null}

      <Reveal delay={0.2} className="mt-8">
        {shots.length > 0 ? (
          <Gallery shots={shots} title={project.title} category={project.category} />
        ) : (
          <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <DeviceFrame icon={project.icon} title={project.title} category={project.category} />
          </div>
        )}
        {shots.length === 0 ? (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {project.role === "Client work" || project.role === "Built at Miana" || project.role === "Client brand" ? "Client work: no public screenshots." : "Screenshots coming soon."}
          </p>
        ) : null}
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-10">
          <Reveal>
            <h2 className="label-mono">The product</h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/90 sm:text-lg">{project.summary}</p>
          </Reveal>
          <Reveal>
            <h2 className="label-mono">Highlights</h2>
            <ul className="mt-3 space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-foreground/90">
                  <span className={cn("mt-[9px] size-1.5 shrink-0 rounded-full", cat.bg, cat.text, "bg-current")} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          {project.next ? (
            <Reveal>
              <h2 className="label-mono">Status and next steps</h2>
              <p className="mt-3 text-foreground/90">
                <span className="font-medium">{statusInfo?.label}.</span> {statusInfo?.description} {project.next}
              </p>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={0.05} className="surface h-fit divide-y divide-border">
          <Meta label="My role">{project.role}</Meta>
          <Meta label="Platforms">
            <ul className="flex flex-wrap gap-2">
              {project.platforms.map((p) => {
                const PIcon = platformMeta[p].icon;
                return (
                  <li key={p} className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs">
                    <PIcon className="size-3.5" /> {platformMeta[p].label}
                  </li>
                );
              })}
            </ul>
          </Meta>
          <Meta label="Stack">
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li key={s} className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </Meta>
          <Meta label="Status">
            {statusInfo?.label}
            {project.statusNote ? <span className="text-muted-foreground"> · {project.statusNote}</span> : null}
          </Meta>
          <Meta label="In market">{project.market ? "Yes" : "No"}</Meta>
        </Reveal>
      </div>

      <nav className="mt-14 grid gap-3 border-t border-border pt-6 sm:grid-cols-2" aria-label="More work">
        <PagerLink project={prev} dir="prev" />
        <PagerLink project={next} dir="next" />
      </nav>
    </article>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4">
      <p className="label-mono">{label}</p>
      <div className="mt-1.5 text-sm">{children}</div>
    </div>
  );
}

function PagerLink({ project, dir }: { project: (typeof sortedProjects)[number]; dir: "prev" | "next" }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group surface flex items-center gap-4 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40",
        dir === "next" ? "sm:flex-row-reverse sm:text-right" : "",
      )}
    >
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:text-primary">
        {dir === "prev" ? <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> : <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
      </span>
      <span className="min-w-0">
        <span className="label-mono block">{dir === "prev" ? "Previous" : "Next"}</span>
        <span className="block truncate font-medium">{project.title}</span>
      </span>
    </Link>
  );
}
