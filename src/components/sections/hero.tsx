import { Rocket, Sparkles } from "lucide-react";
import { countByStatus, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { ProjectGlobe } from "@/components/work/project-globe";

export function Hero() {
  const inMarket = countByStatus(["live", "shipped", "testing", "coming-soon"]);
  const stats = [
    `${countByStatus("live")} live in market`,
    `${countByStatus("testing")} in testing`,
    `${countByStatus("shipped")} shipped`,
    `${projects.length} products`,
  ];

  return (
    <section id="top" className="shell flex flex-col items-center pt-6 pb-12 text-center lg:pt-8">
      <p className="animate-rise rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-foreground">
        {profile.role} · {inMarket} products shipped or in market
      </p>

      <h1
        className="animate-rise mt-4 font-display text-[clamp(2.6rem,7vw,5.25rem)] leading-[0.98] font-extrabold tracking-[-0.04em]"
        style={{ animationDelay: "80ms" }}
      >
        <span className="block">
          <Sparkles className="mr-[0.2em] inline-block size-[0.6em] align-[0.05em] text-gold" aria-hidden="true" />
          AI Products,
        </span>
        <span className="block">
          Made Real
          <Rocket className="ml-[0.2em] inline-block size-[0.6em] align-[0.05em] text-gold" aria-hidden="true" />
        </span>
      </h1>

      <div className="mt-2 w-full">
        <ProjectGlobe />
      </div>

      <p className="mt-5 font-hand text-2xl text-muted-foreground">Replies within a day</p>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <a href="#contact" className="btn-solid">Start a project</a>
        <a href="#work" className="btn-outline">See the work</a>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 font-mono sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-4 text-[12px] tracking-[0.08em] text-muted-foreground">
        {stats.map((s, i) => (
          <li key={s} className="flex items-center gap-2 sm:gap-4">
            <span className={i > 0 ? "size-1.5 shrink-0 rotate-45 bg-gold" : "size-1.5 shrink-0 rotate-45 bg-gold sm:hidden"} aria-hidden="true" />
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
