"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { sortedProjects } from "@/data/projects";
import { CATEGORIES } from "@/data/types";
import { StatusPill } from "@/components/work/status-pill";

const N = sortedProjects.length;
const MERIDIANS = 12;
const PARALLELS = 9;
const SEG = 48;
const TILT = 0.35; // axial tilt, rad
const TURN_MS = 40000;
const DRAG_PX = 6;
const TAU = Math.PI * 2;
const HOVER_SCALE = 1.15;

// Line points are built once: each polyline is a run of xyz triples.
function buildLines() {
  const lines: Float32Array[] = [];
  for (let m = 0; m < MERIDIANS; m++) {
    const lon = (m / MERIDIANS) * Math.PI * 2;
    const a = new Float32Array((SEG + 1) * 3);
    for (let i = 0; i <= SEG; i++) {
      const lat = -Math.PI / 2 + (i / SEG) * Math.PI;
      a[i * 3] = Math.cos(lat) * Math.sin(lon);
      a[i * 3 + 1] = Math.sin(lat);
      a[i * 3 + 2] = Math.cos(lat) * Math.cos(lon);
    }
    lines.push(a);
  }
  for (let p = 1; p <= PARALLELS; p++) {
    const lat = -Math.PI / 2 + (p / (PARALLELS + 1)) * Math.PI;
    const a = new Float32Array((SEG + 1) * 3);
    for (let i = 0; i <= SEG; i++) {
      const lon = (i / SEG) * Math.PI * 2;
      a[i * 3] = Math.cos(lat) * Math.sin(lon);
      a[i * 3 + 1] = Math.sin(lat);
      a[i * 3 + 2] = Math.cos(lat) * Math.cos(lon);
    }
    lines.push(a);
  }
  return lines;
}

function buildDots() {
  const a = new Float32Array(N * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - ((i + 0.5) / N) * 2;
    const r = Math.sqrt(1 - y * y);
    a[i * 3] = Math.cos(golden * i) * r;
    a[i * 3 + 1] = y;
    a[i * 3 + 2] = Math.sin(golden * i) * r;
  }
  return a;
}

const LINES = buildLines();
const DOTS = buildDots();
const INITIALS = sortedProjects.map((p) => p.title.charAt(0).toUpperCase());

export function ProjectGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number>(-1);
  const [selected, setSelected] = useState<number>(-1);
  const [explored, setExplored] = useState(false);
  const wake = useRef<() => void>(() => {});
  const selectedRef = useRef(-1);
  const hoverRef = useRef(-1);

  const select = useCallback((i: number) => {
    selectedRef.current = i;
    setSelected(i);
    if (i >= 0) setExplored(true);
    wake.current();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let size = 0;
    let dpr = 1;
    let yaw = 0.6;
    let pitch = 0;
    let vYaw = 0;
    let vPitch = 0;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let px = -1;
    let py = -1;
    let inView = false;
    let visible = !document.hidden;
    let raf = 0;
    let dirty = true;
    const colors = { gold: "#b8962e", bar: "#0b2a20", card: "#ffffff", font: "ui-sans-serif, system-ui, sans-serif" };
    // Per-dot fill and letter colour, rebuilt on theme change.
    const fills: string[] = new Array(N).fill("#b8962e");
    const inks: string[] = new Array(N).fill("#ffffff");
    let grad: CanvasGradient | null = null;
    let fontStr = "700 12px sans-serif";
    // Per-dot screen x, y, z (preallocated, reused every frame).
    const proj = new Float32Array(N * 3);
    // Per-dot hover scale, eased toward its target each frame.
    const scale = new Float32Array(N).fill(1);
    const order = Array.from({ length: N }, (_, i) => i);
    const byDepth = (a: number, b: number) => proj[a * 3 + 2] - proj[b * 3 + 2];

    // Built once per resize or theme change, never per frame.
    const buildGrad = () => {
      if (!size) return;
      const c = size / 2;
      const R = size * 0.46;
      try {
        const g = ctx.createRadialGradient(c - R * 0.4, c - R * 0.4, R * 0.05, c + R * 0.1, c + R * 0.1, R * 1.1);
        g.addColorStop(0, `color-mix(in oklab, ${colors.gold} 22%, ${colors.card})`);
        g.addColorStop(1, `color-mix(in oklab, ${colors.gold} 55%, ${colors.card})`);
        grad = g;
      } catch {
        grad = null;
      }
    };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors.gold = cs.getPropertyValue("--gold").trim() || colors.gold;
      colors.bar = cs.getPropertyValue("--bar").trim() || colors.bar;
      colors.card = cs.getPropertyValue("--card").trim() || colors.card;
      colors.font = getComputedStyle(document.body).fontFamily || colors.font;
      for (let i = 0; i < N; i++) {
        const v = cs.getPropertyValue(`--cat-${sortedProjects[i].category}`).trim() || colors.gold;
        fills[i] = v;
        // Light fills take the dark bar colour, mid and dark fills take white.
        const L = /oklch\(\s*([\d.]+)/.exec(v);
        inks[i] = L && parseFloat(L[1]) > 0.65 ? colors.bar : "#ffffff";
      }
      fontStr = `700 ${Math.round(dotR() * 0.95)}px ${colors.font}`;
      buildGrad();
      dirty = true;
      kick();
    };

    const rotate = (x: number, y: number, z: number, out: number[]) => {
      // Ry(yaw) then Rx(pitch + tilt)
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const p = pitch + TILT;
      const cp = Math.cos(p), sp = Math.sin(p);
      out[0] = x1;
      out[1] = y * cp - z1 * sp;
      out[2] = y * sp + z1 * cp;
    };
    const tmp = [0, 0, 0];

    const hit = () => {
      if (px < 0) return -1;
      const rad = dotR() + 6;
      let best = -1;
      let bestZ = -2;
      for (let i = 0; i < N; i++) {
        const z = proj[i * 3 + 2];
        if (z < 0) continue;
        const dx = proj[i * 3] - px;
        const dy = proj[i * 3 + 1] - py;
        if (dx * dx + dy * dy <= rad * rad && z > bestZ) {
          best = i;
          bestZ = z;
        }
      }
      return best;
    };
    const dotR = () => Math.max(10, 15 * (size / 520));

    const draw = () => {
      const c = size / 2;
      const R = size * 0.46;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // Soft sphere body under the wires.
      if (grad) {
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c, c, R, 0, TAU);
        ctx.fill();
      }

      ctx.strokeStyle = colors.gold;
      ctx.lineWidth = 1;
      // Back and front segments are batched into one path each.
      for (let pass = 0; pass < 2; pass++) {
        ctx.globalAlpha = pass === 0 ? 0.18 : 0.65;
        ctx.beginPath();
        for (let l = 0; l < LINES.length; l++) {
          const line = LINES[l];
          let pxs = 0, pys = 0, pz = 0;
          for (let i = 0; i <= SEG; i++) {
            rotate(line[i * 3], line[i * 3 + 1], line[i * 3 + 2], tmp);
            const sx = c + tmp[0] * R;
            const sy = c - tmp[1] * R;
            if (i > 0 && (pz + tmp[2] >= 0 ? 1 : 0) === pass) {
              ctx.moveTo(pxs, pys);
              ctx.lineTo(sx, sy);
            }
            pxs = sx; pys = sy; pz = tmp[2];
          }
        }
        ctx.stroke();
      }
      // Outer silhouette.
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, TAU);
      ctx.stroke();
      ctx.globalAlpha = 1;

      for (let i = 0; i < N; i++) {
        rotate(DOTS[i * 3], DOTS[i * 3 + 1], DOTS[i * 3 + 2], tmp);
        proj[i * 3] = c + tmp[0] * R;
        proj[i * 3 + 1] = c - tmp[1] * R;
        proj[i * 3 + 2] = tmp[2];
      }
      order.sort(byDepth);
      const r0 = dotR();
      ctx.font = fontStr;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let k = 0; k < N; k++) {
        const i = order[k];
        const z = proj[i * 3 + 2];
        const f = z >= 0;
        const r = (f ? r0 * (0.85 + 0.15 * z) : r0 * 0.55) * scale[i];
        const x = proj[i * 3];
        const y = proj[i * 3 + 1];
        ctx.globalAlpha = f ? 1 : 0.28;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fillStyle = fills[i];
        ctx.fill();
        ctx.lineWidth = f ? 2 : 1;
        ctx.strokeStyle = colors.card;
        ctx.stroke();
        if (f) {
          ctx.fillStyle = inks[i];
          ctx.fillText(INITIALS[i], x, y + 0.5);
        }
        if (i === selectedRef.current && f) {
          ctx.beginPath();
          ctx.arc(x, y, r + 4, 0, TAU);
          ctx.strokeStyle = colors.gold;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // Hover test follows the moving dots; state changes only when the target changes.
      const h = dragging ? -1 : hit();
      canvas.style.cursor = h >= 0 ? "pointer" : "";
      if (h !== hoverRef.current) {
        hoverRef.current = h;
        setHover(h);
      }
      const label = labelRef.current;
      if (label && h >= 0) label.style.transform = `translate(${proj[h * 3]}px, ${proj[h * 3 + 1] - r0 * HOVER_SCALE - 8}px) translate(-50%, -100%)`;
    };

    // Eases per-dot scale toward its hover target. Returns true while any dot is still moving.
    const easeScales = (dt: number) => {
      const k = reduce ? 1 : 1 - Math.exp(-dt / 70);
      let busy = false;
      for (let i = 0; i < N; i++) {
        const target = i === hoverRef.current ? HOVER_SCALE : 1;
        const d = target - scale[i];
        if (d === 0) continue;
        if (Math.abs(d) < 0.002) scale[i] = target;
        else {
          scale[i] += d * k;
          busy = true;
        }
      }
      return busy;
    };

    const frame = (t: number) => {
      raf = 0;
      const dt = lastT ? Math.min(64, t - lastT) : 16;
      lastT = t;
      let moving = false;
      if (!dragging) {
        if (Math.abs(vYaw) > 1e-5 || Math.abs(vPitch) > 1e-5) {
          yaw += vYaw * dt;
          pitch = Math.max(-1.1, Math.min(1.1, pitch + vPitch * dt));
          const k = Math.pow(0.0015, dt / 1000); // decays to ~0 in about a second
          vYaw *= k;
          vPitch *= k;
          moving = true;
        } else if (!reduce && selectedRef.current < 0) {
          yaw += ((Math.PI * 2) / TURN_MS) * dt;
          moving = true;
        }
      }
      if (easeScales(dt)) moving = true;
      if (moving || dirty || dragging) {
        draw();
        dirty = false;
        // Hover may have changed inside draw: keep the loop alive until scales settle.
        for (let i = 0; i < N && !moving; i++) if (scale[i] !== (i === hoverRef.current ? HOVER_SCALE : 1)) moving = true;
      }
      if ((moving || dragging) && inView && visible) raf = requestAnimationFrame(frame);
      else lastT = 0;
    };

    function kick() {
      if (!raf && inView && visible) raf = requestAnimationFrame(frame);
    }
    wake.current = () => {
      dirty = true;
      kick();
    };

    const resize = () => {
      const w = Math.round(wrap.clientWidth);
      if (!w) return;
      size = w;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      fontStr = `700 ${Math.round(dotR() * 0.95)}px ${colors.font}`;
      buildGrad();
      dirty = true;
      kick();
    };

    const pos = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      px = ((e.clientX - b.left) / b.width) * size;
      py = ((e.clientY - b.top) / b.height) * size;
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      vYaw = vPitch = 0;
      canvas.setPointerCapture(e.pointerId);
      pos(e);
      kick();
    };
    const onMove = (e: PointerEvent) => {
      pos(e);
      if (!dragging) {
        if (!raf) {
          // Idle globe: still refresh hover.
          const h = hit();
          canvas.style.cursor = h >= 0 ? "pointer" : "";
          if (h !== hoverRef.current) {
            hoverRef.current = h;
            setHover(h);
            const label = labelRef.current;
            if (label && h >= 0) label.style.transform = `translate(${proj[h * 3]}px, ${proj[h * 3 + 1] - dotR() * HOVER_SCALE - 8}px) translate(-50%, -100%)`;
            kick();
          }
        }
        return;
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      const k = 0.0075;
      yaw += dx * k;
      pitch = Math.max(-1.1, Math.min(1.1, pitch + dy * k));
      // Velocity per ms, smoothed, for inertia on release.
      vYaw = (dx * k) / 16;
      vPitch = (dy * k) / 16;
      dirty = true;
      kick();
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      pos(e);
      if (moved < DRAG_PX) {
        vYaw = vPitch = 0;
        const h = hit();
        if (h >= 0) select(h);
      } else if (reduce) {
        vYaw = vPitch = 0;
      }
      dirty = true;
      kick();
    };
    const onLeave = () => {
      if (dragging) return;
      px = py = -1;
      if (hoverRef.current !== -1) {
        hoverRef.current = -1;
        setHover(-1);
        kick();
      }
      canvas.style.cursor = "";
    };

    const io = new IntersectionObserver(([en]) => {
      inView = en.isIntersecting;
      if (inView) kick();
    });
    const ro = new ResizeObserver(resize);
    const mo = new MutationObserver(readColors);
    const onVis = () => {
      visible = !document.hidden;
      if (visible) kick();
    };

    readColors();
    resize();
    // First frame is on the canvas before the entrance fade starts.
    if (size) {
      draw();
      dirty = false;
    }
    io.observe(canvas);
    ro.observe(wrap);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    document.addEventListener("visibilitychange", onVis);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      wake.current = () => {};
    };
  }, [select]);

  const sel = selected >= 0 ? sortedProjects[selected] : null;

  return (
    <div className="mx-auto w-full">
      <div className="animate-in fade-in zoom-in-[0.94] fill-mode-both delay-200 duration-700 ease-out-expo mx-auto w-[min(100%,520px,max(300px,calc(100svh-290px)))]">
        <div ref={wrapRef} className="relative aspect-square w-full">
          <div
            className="pointer-events-none absolute inset-x-[14%] bottom-[2%] h-[7%] rounded-[50%] bg-foreground/15 blur-xl"
            aria-hidden="true"
          />
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Globe of projects. Drag to rotate, select a dot to open a project."
            className="absolute inset-0 size-full"
            style={{ touchAction: "pan-y" }}
          />
          <div
            ref={labelRef}
            className={`pointer-events-none absolute top-0 left-0 rounded-full bg-bar px-3 py-1 font-mono text-[11px] whitespace-nowrap text-bar-foreground ${hover >= 0 && !sel ? "opacity-100" : "opacity-0"}`}
            aria-hidden="true"
          >
            {hover >= 0 ? sortedProjects[hover].title : ""}
          </div>
          {sel ? (
            <div
              key={sel.slug}
              className="surface animate-in fade-in zoom-in-[0.97] slide-in-from-bottom-2 fill-mode-both absolute inset-x-2 bottom-2 rounded-2xl p-4 text-left shadow-lg duration-[350ms] ease-out-expo"
              role="group"
              aria-label="Selected project"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg leading-tight font-bold">{sel.title}</h3>
                <StatusPill status={sel.status} />
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{sel.tagline}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <Link
                  href={`/work/${sel.slug}`}
                  className="group inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none pointer-coarse:min-h-11"
                >
                  View project
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]" aria-hidden="true">→</span>
                </Link>
                <button
                  type="button"
                  onClick={() => select(-1)}
                  className="inline-flex cursor-pointer items-center rounded-full border border-border px-3 py-1 text-xs focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none pointer-coarse:min-h-11 pointer-coarse:px-4"
                >
                  Back to globe
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <p
        className={`mx-auto mt-2 w-fit rounded-full bg-bar px-4 py-1.5 font-mono text-[11px] tracking-[0.1em] text-bar-foreground ${explored ? "" : "motion-safe:animate-pulse motion-safe:[animation-duration:3.5s]"}`}
      >
        <span className="pointer-coarse:hidden">Click a dot to explore my work</span>
        <span className="hidden pointer-coarse:inline">Tap a dot to explore my work</span>
      </p>

      <ul className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase" aria-label="Dot colours">
        {CATEGORIES.map((c) => (
          <li key={c.id} className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: `var(--cat-${c.id})` }} aria-hidden="true" />
            {c.short}
          </li>
        ))}
      </ul>

      <ul className="sr-only">
        {sortedProjects.map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
