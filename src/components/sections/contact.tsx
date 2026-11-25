import { MessageCircle, Phone } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/icons";
import { profile } from "@/data/profile";
import { Reveal, SectionHeading } from "@/components/reveal";
import { ContactForm } from "./contact-form";

const items = [
  { name: "WhatsApp", href: profile.whatsapp, icon: MessageCircle },
  { name: "Phone", href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone },
  { name: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { name: "GitHub", href: profile.github, icon: Github },
];

export function Contact() {
  return (
    <section id="contact" className="band scroll-mt-16">
      <div className="shell py-12 sm:py-16 lg:py-24">
        <SectionHeading title="Let's build your next product" description="Send the idea or a rough brief and I'll tell you how I'd build it." />
        <Reveal>
          <a
            href={`mailto:${profile.email}`}
            className="font-numeric text-[clamp(1.1rem,3.4vw,2.4rem)] break-all underline decoration-gold decoration-2 underline-offset-8 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:break-normal"
          >
            {profile.email}
          </a>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="label-mono">Or reach me here</h3>
            <ul className="mt-4 flex flex-wrap gap-2 pointer-coarse:gap-3">
              {items.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="chip min-h-8 cursor-pointer gap-2 transition-colors duration-200 hover:border-gold/60 pointer-coarse:min-h-11 pointer-coarse:px-4 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                  >
                    <Icon className="size-3.5" /> {name}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
