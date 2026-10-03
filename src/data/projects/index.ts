import type { Category, Project, Status } from "../types";
import { ecommerce } from "./ecommerce";
import { games } from "./games";
import { automation } from "./automation";
import { ai } from "./ai";

export const projects: Project[] = [...ai, ...automation, ...ecommerce, ...games];

const categoryRank: Record<Category, number> = { ai: 0, automation: 1, ecommerce: 2, games: 3 };

/** Featured first, then by category, then by each project's own order. */
export const sortedProjects = [...projects].sort((a, b) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  if (a.category !== b.category) return categoryRank[a.category] - categoryRank[b.category];
  return a.order - b.order;
});

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const countByStatus = (status: Status | Status[]) => {
  const set = new Set(Array.isArray(status) ? status : [status]);
  return projects.filter((p) => set.has(p.status)).length;
};
