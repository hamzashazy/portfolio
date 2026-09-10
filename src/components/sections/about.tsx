import Image from "next/image";
import { Award, GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";
import { certifications, education } from "@/data/education";
import { Reveal, SectionHeading } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 px-5 py-10 sm:px-8 lg:px-12 lg:py-14 xl:px-16">
      <SectionHeading index="04" label="About" title="One developer, eighteen products" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Reveal className="space-y-4 text-base leading-relaxed text-foreground/90">
          <div className="relative float-right mb-2 ml-5 size-28 overflow-hidden rounded-2xl ring-1 ring-border sm:size-36">
            <Image src={profile.avatar} alt={profile.name} fill sizes="144px" className="object-cover" />
          </div>
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
        <div className="flex flex-col gap-4">
          <Reveal delay={0.05} className="surface p-5">
            <h3 className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              <GraduationCap className="size-4 text-primary" /> Education
            </h3>
            <p className="mt-3 text-lg font-semibold">{education.degree}</p>
            <p className="text-sm text-muted-foreground">{education.institution}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {education.period} · {education.detail} · {education.location}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="surface p-5">
            <h3 className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              <Award className="size-4 text-primary" /> Certifications
            </h3>
            <ul className="mt-3 space-y-3">
              {certifications.map((c) => (
                <li key={c.title}>
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {c.issuer}
                    {c.year ? ` · ${c.year}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
