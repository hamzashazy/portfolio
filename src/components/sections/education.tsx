import { GraduationCap, Award, MapPin } from "lucide-react";

import { educationData, certificationsData } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/reveal";

export default function EducationSection() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          index="04"
          label="Education & Certifications"
          title="Foundations"
        />

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {educationData.map((edu) => (
            <Reveal key={edu.institution}>
              <div className="glass relative h-full overflow-hidden rounded-2xl p-7">
                <div
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3">
                  <span className="rounded-xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{edu.period}</span>
                </div>
                <h3 className="mt-5 font-headline text-2xl font-bold">{edu.degree}</h3>
                <p className="mt-1 text-lg text-muted-foreground">{edu.institution}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                    {edu.detail}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {edu.location}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={120}>
            <div className="glass h-full rounded-2xl p-7">
              <div className="flex items-center gap-3">
                <span className="rounded-xl border border-accent/30 bg-accent/10 p-2.5 text-accent">
                  <Award className="h-5 w-5" />
                </span>
                <h3 className="font-headline text-lg font-bold">Certifications</h3>
              </div>
              <ul className="mt-5 space-y-4">
                {certificationsData.map((cert) => (
                  <li key={cert.title} className="border-l-2 border-border pl-4 transition-colors hover:border-accent">
                    <p className="font-medium leading-snug">{cert.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{cert.detail}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground/70">{cert.issuer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
