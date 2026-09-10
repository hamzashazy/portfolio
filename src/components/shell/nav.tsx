"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { nav } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const ids = nav.map((n) => n.id);

export function Nav({ orientation = "vertical", onNavigate }: { orientation?: "vertical" | "horizontal"; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = useActiveSection(ids);
  const isHome = pathname === "/";

  return (
    <nav aria-label="Sections">
      <ul className={cn(orientation === "vertical" ? "flex flex-col gap-1" : "flex items-center gap-1")}>
        {nav.map((item) => {
          const isActive = isHome && active === item.id;
          return (
            <li key={item.id} className="relative">
              <Link
                href={isHome ? `#${item.id}` : `/#${item.id}`}
                onClick={onNavigate}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId={`nav-active-${orientation}`}
                    className="absolute inset-0 rounded-lg bg-sidebar-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10 flex items-center gap-2">
                  <span className={cn("h-1.5 w-1.5 rounded-full transition-colors", isActive ? "bg-primary" : "bg-transparent")} aria-hidden="true" />
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
