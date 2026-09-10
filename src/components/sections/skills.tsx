import { skills } from "@/data/skills";
import { Reveal, SectionHeading } from "@/components/reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 px-5 py-10 sm:px-8 lg:px-12 lg:py-14 xl:px-16">
      <SectionHeading index="03" label="Skills" title="What I build with" description="Grouped by where it shows up in the work above." />
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.05} className="surface p-5 transition-colors duration-300 hover:border-primary/30">
            <h3 className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">{group.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((s) => (
                <li key={s} className="rounded-lg border border-border bg-background px-2.5 py-1 text-sm transition-colors duration-200 hover:border-primary/40 hover:text-primary">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
