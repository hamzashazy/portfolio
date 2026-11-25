import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { nav, profile } from "@/data/profile";
import { SocialLinks } from "./social-links";

const link =
  "inline-flex items-center gap-1.5 rounded font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none pointer-coarse:min-h-11";

export function Footer() {
  return (
    // pb-28 keeps the floating hire dock clear of the last row.
    <footer className="shell pb-28">
      <div className="border-t border-border pt-8">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col gap-1">
            <p className="label-mono text-foreground">{profile.name}</p>
            <p className="label-mono">
              {profile.location.split(" · ")[0]} · © {new Date().getFullYear()}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-center">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link href={`/#${item.id}`} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end">
            <SocialLinks size="sm" />
            <a href="#" className={`${link} group`}>
              Back to top
              <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
