import { Mail, MessageCircle, Phone } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/icons";
import { profile } from "@/data/profile";
import { Reveal, SectionHeading } from "@/components/reveal";
import { ContactForm } from "./contact-form";

const items = [
  { name: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { name: "WhatsApp", value: profile.phone, href: profile.whatsapp, icon: MessageCircle },
  { name: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone },
  { name: "LinkedIn", value: "in/hamzashazy", href: profile.linkedin, icon: Linkedin },
  { name: "GitHub", value: "hamzashazy", href: profile.github, icon: Github },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 px-5 py-10 pb-16 sm:px-8 lg:px-12 lg:py-14 xl:px-16">
      <SectionHeading
        index="05"
        label="Contact"
        title="Let's build something that ships"
        description="A full-stack product, a Flutter app, a desktop tool, or an automation that saves your team hours. One message away."
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Reveal className="surface p-5 sm:p-6">
          <ContactForm />
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {items.map(({ name, value, href, icon: Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{name}</span>
                    <span className="block truncate text-sm font-medium">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
