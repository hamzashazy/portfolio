import { ArrowUpRight } from "lucide-react";

import { contactData, heroData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading index="05" label="Contact" title={contactData.heading} description={contactData.subheading} />

        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="glass flex h-full flex-col items-start justify-between gap-8 rounded-3xl p-8 md:p-10">
              <div>
                <p className="font-mono text-sm text-primary">// currently</p>
                <p className="mt-3 max-w-md text-2xl font-bold leading-snug md:text-3xl">
                  Building the <span className="text-gradient">Prep</span> restaurant MVP and shipping AI
                  automations at Miana.
                </p>
              </div>
              <Button size="lg" className="glow-primary rounded-full px-8" asChild>
                <a href={`mailto:${heroData.contact.email}`}>
                  Start a conversation
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {contactData.items.map((item, index) => (
              <Reveal key={item.name} delay={index * 70}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="glass group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30"
                >
                  <span className="rounded-xl border border-border/60 bg-secondary/60 p-2.5 text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{item.name}</span>
                    <span className="block truncate font-mono text-sm">{item.value}</span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-primary" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
