import { skills } from "@/data/skills";
import { Reveal, SectionHeading } from "@/components/reveal";

const steps = [
  { n: "01", title: "Brief", text: "The problem, the users, and what done looks like." },
  { n: "02", title: "Build", text: "Working software early, on a preview link you can open." },
  { n: "03", title: "Ship", text: "Deployed with auth, payments and admin wired in." },
  { n: "04", title: "Support", text: "Fixes, releases and the next feature after launch." },
];

// First few items of each skill group, deduplicated, about 10 in total.
const chips = [...new Set(skills.flatMap((g) => g.items.slice(0, 2)))].slice(0, 10);

export function Process() {
  return (
    <section id="process" className="scroll-mt-16">
      <div className="shell border-t border-border py-12 sm:py-16 lg:py-24">
        <SectionHeading title="From idea to shipped product" description="Each stage ends with something you can try before the next one starts." />
        <div className="relative">
          {/* Thin rail joining the four steps on desktop; the step cards' own top rules sit on it. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-0.5 bg-primary/20 lg:block" aria-hidden="true" />
        <ol className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.06} className="step-card">
              <span className="font-numeric text-2xl text-gold">{s.n}</span>
              <h3 className="mt-3 text-lg font-medium">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>
        </div>
        <Reveal className="mt-12">
          <ul className="flex flex-wrap gap-2" aria-label="Tools I build with">
            {chips.map((c) => (
              <li key={c} className="chip">{c}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
