import { TerminalSquare } from "lucide-react";

import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row md:px-6">
        <p className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <TerminalSquare className="h-4 w-4 text-primary" />
          hamza<span className="text-primary">.dev</span>
        </p>
        <p className="font-mono text-xs text-muted-foreground/70">
          Designed & built by Hamza Shahzad · Next.js + Tailwind
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
