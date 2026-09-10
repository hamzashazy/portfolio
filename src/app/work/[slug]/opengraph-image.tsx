import { ImageResponse } from "next/og";
import { getProject, sortedProjects } from "@/data/projects";
import { CATEGORIES, STATUSES } from "@/data/types";
import { profile } from "@/data/profile";

export const alt = "Project preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return sortedProjects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const category = CATEGORIES.find((c) => c.id === project?.category)?.label ?? "";
  const status = STATUSES.find((s) => s.id === project?.status)?.label ?? "";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#1a1917", color: "#f4f2ee", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a8a49c", letterSpacing: 2, textTransform: "uppercase" }}>
          <span>{category}</span>
          <span style={{ color: "#5ee0a8" }}>{`● ${status}`}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>{project?.title ?? "Work"}</div>
          <div style={{ fontSize: 34, color: "#c9c5bd", lineHeight: 1.3, maxWidth: 1000 }}>{project?.tagline ?? ""}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a8a49c" }}>
          <span>{`${profile.name} · ${profile.role}`}</span>
          <span>{profile.site.replace("https://", "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
