import Image from "next/image";
import Link from "next/link";
import { FileDown, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Nav } from "./nav";
import { SocialLinks } from "./social-links";
import { ThemeToggle } from "@/components/theme-toggle";

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh flex-col border-r border-sidebar-border bg-sidebar px-6 py-7 lg:flex xl:px-8">
      <Link href="/" className="group flex items-center gap-4" aria-label="Home">
        <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border transition-transform duration-300 group-hover:-rotate-2">
          <Image src={profile.avatar} alt={profile.name} fill sizes="64px" priority className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-xl leading-tight font-semibold">{profile.name}</span>
          <span className="block text-sm text-muted-foreground">{profile.role}</span>
        </span>
      </Link>

      <div className="mt-5 flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-foreground/90">
          <span className="size-1.5 rounded-full bg-primary text-primary animate-pulse-dot" aria-hidden="true" />
          {profile.availability}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" /> {profile.location}
        </span>
      </div>

      <div className="mt-8">
        <p className="label-mono mb-2 px-3">Navigate</p>
        <Nav />
      </div>

      <div className="mt-auto flex flex-col gap-4 pt-6">
        <a
          href={profile.resume}
          download="Hamza-Shahzad-Resume.pdf"
          className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <FileDown className="size-4" /> Download resume
        </a>
        <div className="flex items-center justify-between">
          <SocialLinks />
          <ThemeToggle />
        </div>
        <p className="font-mono text-[11px] text-muted-foreground">© {new Date().getFullYear()} · Built with Next.js</p>
      </div>
    </aside>
  );
}
