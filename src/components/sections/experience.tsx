import { experience } from "@/data/experience";
import { Reveal, SectionHeading } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 px-5 py-10 sm:px-8 lg:px-12 lg:py-14 xl:px-16">
      <SectionHeading index="02" label="Experience" title="Where I have worked" />
      <ol className="relative ml-2 border-l border-border">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.company} delay={i * 0.08} className="relative pb-10 pl-8 last:pb-0">
            <span
              className={cn(
                "absolute top-1.5 -left-[5px] size-2.5 rounded-full ring-4 ring-background",
                job.current ? "bg-primary text-primary animate-pulse-dot" : "bg-muted-foreground/60",
              )}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold">
                {job.role} <span className="text-muted-foreground">· {job.company}</span>
              </h3>
              <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{job.location}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span className="mt-[9px] size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {job.stack.map((s) => (
                <li key={s} className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
