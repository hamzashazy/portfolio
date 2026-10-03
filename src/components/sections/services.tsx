import { Smartphone, Sparkles, Store, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";

const services = [
  { icon: Sparkles, title: "AI products", text: "Recommendation engines, RAG search and matching, built into a product people can use." },
  { icon: Workflow, title: "Agents & automation", text: "Claude-powered bots and workflows that take manual steps out of a team's day." },
  { icon: Store, title: "Web platforms", text: "Storefronts, dashboards and CRMs on Next.js and Supabase, with payments and admin." },
  { icon: Smartphone, title: "Mobile & desktop", text: "Flutter and native Android apps, plus Tauri and Electron desktop tools." },
];

export function Services() {
  return (
    <section aria-labelledby="services-heading" className="px-5 pb-4 sm:px-8 lg:px-12 xl:px-16">
      <h2 id="services-heading" className="label-mono">
        What I can build for you
      </h2>
      <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 0.05} className="surface p-4 transition-colors duration-300 hover:border-primary/30">
            <Icon className="size-5 text-primary" strokeWidth={1.75} />
            <h3 className="mt-2.5 text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
