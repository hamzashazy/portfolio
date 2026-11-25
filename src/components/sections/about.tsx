import Image from "next/image";
import { Award, GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";
import { certifications, education } from "@/data/education";
import { Reveal, SectionHeading } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-16">
      <div className="shell border-t border-border py-12 sm:py-16 lg:py-24">
      <SectionHeading title="About" />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]">
        <Reveal className="max-w-[65ch] space-y-5 text-lg leading-relaxed font-light text-foreground/90 max-lg:order-2">
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
        <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 max-lg:order-1 sm:grid-cols-[12rem_minmax(0,1fr)] lg:flex lg:flex-col">
          <Reveal className="relative aspect-[4/5] w-full self-start overflow-hidden rounded-2xl ring-1 ring-border">
            <Image src={profile.avatar} alt={profile.name} fill sizes="(min-width: 1280px) 384px, (min-width: 1024px) 352px, (min-width: 640px) 192px, 160px" className="object-cover" />
          </Reveal>
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
          <Reveal delay={0.1} className="surface col-span-2 p-5">
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
      </div>
    </section>
  );
}
