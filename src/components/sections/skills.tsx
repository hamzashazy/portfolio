import { Code2, MonitorSmartphone, Database, BrainCircuit, Wrench } from "lucide-react";

import { skillsData } from "@/lib/data";
import { Reveal, SectionHeading } from "@/components/reveal";

const categoryIcons: Record<string, React.ElementType> = {
  Languages: Code2,
  Frontend: MonitorSmartphone,
  "Backend & Databases": Database,
  "AI & Automation": BrainCircuit,
  "Tools & Platforms": Wrench,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          index="03"
          label="Skills"
          title="The toolbox"
          description="The languages, frameworks, and systems I reach for when it's time to ship."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((group, index) => {
            const Icon = categoryIcons[group.category] ?? Code2;
            return (
              <Reveal
                key={group.category}
                delay={index * 80}
                className={index === skillsData.length - 1 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <div className="glass h-full rounded-2xl p-6 transition-colors hover:border-primary/30">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl border border-primary/20 bg-primary/10 p-2.5 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-headline text-lg font-bold">{group.category}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-border/60 bg-secondary/60 px-3 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
