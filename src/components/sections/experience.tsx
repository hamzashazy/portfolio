import { Briefcase, MapPin } from "lucide-react";

import { experienceData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Reveal, SectionHeading } from "@/components/reveal";
import { cn } from "@/lib/utils";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          index="01"
          label="Experience"
          title="Where I've been building"
          description="From project management to full-stack ownership — each role sharpened a different edge."
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute bottom-4 left-[19px] top-2 w-px bg-gradient-to-b from-primary via-border to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-10">
            {experienceData.map((job, index) => (
              <Reveal key={job.company} delay={index * 100} className="relative pl-14">
                <span
                  className={cn(
                    "absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-full border bg-card",
                    job.current ? "border-primary/50 glow-primary" : "border-border"
                  )}
                >
                  <Briefcase className={cn("h-4 w-4", job.current ? "text-primary" : "text-muted-foreground")} />
                </span>

                <div className="glass rounded-2xl p-6 transition-colors hover:border-primary/30">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="font-headline text-xl font-bold">{job.company}</h3>
                    {job.current && (
                      <Badge className="border-primary/30 bg-primary/10 text-primary hover:bg-primary/15">
                        Current
                      </Badge>
                    )}
                    <span className="ml-auto font-mono text-xs text-muted-foreground">{job.period}</span>
                  </div>

                  <p className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground/80">{job.role}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                  </p>

                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
