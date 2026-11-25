import { experience } from "@/data/experience";
import { Reveal, SectionHeading } from "@/components/reveal";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16">
      <div className="shell py-12 sm:py-16 lg:py-24">
        <SectionHeading title="Experience" />
        <ol className="space-y-10">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.company} className="step-card grid gap-4 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-8">
              <span className="font-numeric text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-2xl font-bold">{job.company}</h3>
                <p className="mt-1 text-muted-foreground">{job.role}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  {job.period}
                  <br />
                  {job.location}
                </p>
              </div>
              <div>
                <ul className="space-y-2 text-foreground/90">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-[11px] size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
                  {job.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
