import { skills } from "@/data/skills";
import { Reveal, SectionHeading } from "@/components/reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-16">
      <div className="shell border-t border-border py-12 sm:py-16 lg:py-24">
        <SectionHeading title="Skills and tools" description="Grouped by where it shows up in the work above." />
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={(i % 3) * 0.05} className="step-card">
              <h3 className="label-mono">{group.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
