import { Gamepad2, ShoppingBag, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import type { Category, Status } from "@/data/types";

export const categoryIcon: Record<Category, LucideIcon> = {
  ai: Sparkles,
  automation: Workflow,
  ecommerce: ShoppingBag,
  games: Gamepad2,
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
  automation: {
    text: "text-cat-automation",
    bg: "bg-cat-automation/12",
    ring: "ring-cat-automation/30",
    gradient: "from-cat-automation/35 via-cat-automation/10 to-transparent",
  },
  ai: {
    text: "text-cat-ai",
    bg: "bg-cat-ai/12",
    ring: "ring-cat-ai/30",
    gradient: "from-cat-ai/35 via-cat-ai/10 to-transparent",
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
