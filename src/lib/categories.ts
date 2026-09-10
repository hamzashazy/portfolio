import { Bot, Gamepad2, LayoutDashboard, ShoppingBag, type LucideIcon } from "lucide-react";
import type { Category, Status } from "@/data/types";

export const categoryIcon: Record<Category, LucideIcon> = {
  ecommerce: ShoppingBag,
  games: Gamepad2,
  systems: LayoutDashboard,
  "ai-web": Bot,
};

/** Tailwind classes keyed by category. Kept as full literals so Tailwind can see them. */
export const categoryClass: Record<Category, { text: string; bg: string; ring: string; gradient: string }> = {
  ecommerce: {
    text: "text-cat-ecommerce",
    bg: "bg-cat-ecommerce/12",
    ring: "ring-cat-ecommerce/30",
    gradient: "from-cat-ecommerce/35 via-cat-ecommerce/10 to-transparent",
  },
  games: {
    text: "text-cat-games",
    bg: "bg-cat-games/12",
    ring: "ring-cat-games/30",
    gradient: "from-cat-games/35 via-cat-games/10 to-transparent",
  },
  systems: {
    text: "text-cat-systems",
    bg: "bg-cat-systems/12",
    ring: "ring-cat-systems/30",
    gradient: "from-cat-systems/35 via-cat-systems/10 to-transparent",
  },
  "ai-web": {
    text: "text-cat-ai-web",
    bg: "bg-cat-ai-web/12",
    ring: "ring-cat-ai-web/30",
    gradient: "from-cat-ai-web/35 via-cat-ai-web/10 to-transparent",
  },
};

export const statusDot: Record<Status, string> = {
  live: "bg-emerald-500 text-emerald-500 animate-pulse-dot",
  testing: "bg-amber-400 text-amber-400",
  "coming-soon": "bg-sky-400 text-sky-400",
  shipped: "bg-primary text-primary",
  "in-development": "bg-violet-400 text-violet-400",
  prototype: "bg-zinc-400 text-zinc-400",
};
