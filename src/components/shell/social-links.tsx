import { Mail, MessageCircle } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/icons";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export const socials = [
  { name: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { name: "GitHub", href: profile.github, icon: Github },
  { name: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { name: "WhatsApp", href: profile.whatsapp, icon: MessageCircle },
];

export function SocialLinks({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map(({ name, href, icon: Icon }) => (
        <li key={name}>
          <a
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              size === "sm" ? "size-8" : "size-9",
            )}
          >
            <Icon className={size === "sm" ? "size-3.5" : "size-4"} />
          </a>
        </li>
      ))}
    </ul>
  );
}
