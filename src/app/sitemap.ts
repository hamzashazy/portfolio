import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { sortedProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: profile.site, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...sortedProjects.map((p) => ({ url: `${profile.site}/work/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
