import { profile } from "@/data/profile";
import { countByStatus, projects } from "@/data/projects";
import { GreetingCard } from "@/components/sections/greeting-card";
import { Showcase } from "@/components/work/showcase";

export function Intro() {
  const stats = [
    { value: countByStatus("live"), label: "Live products" },
    { value: projects.length, label: "Total builds" },
  ];

  return (
    <section className="shell border-t border-border py-16">
      <div className="grid items-start gap-10 lg:grid-cols-[25fr_45fr_30fr] lg:gap-8">
        <div>
          <p className="text-lg font-light text-muted-foreground">{profile.intro}</p>
          <dl className="mt-8 flex gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-numeric text-3xl">{s.value}</dd>
                <dt className="label-mono mt-2">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
        <Showcase />
        <GreetingCard />
      </div>
    </section>
  );
}
