import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { countByStatus, projects } from "@/data/projects";

export const alt = `${profile.name} portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#1a1917", color: "#f4f2ee", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 24, color: "#a8a49c", letterSpacing: 2, textTransform: "uppercase" }}>Portfolio</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>{profile.headline}</div>
          <div style={{ fontSize: 34, color: "#c9c5bd", maxWidth: 1000 }}>{`${projects.length} products · ${countByStatus("live")} live · AI products, automation, commerce, games`}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a8a49c" }}>
          <span>{`${profile.name} · ${profile.role}`}</span>
          <span style={{ color: "#5ee0a8" }}>{profile.site.replace("https://", "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
