import Image from "next/image";
import type { Category, Screenshot } from "@/data/types";
import { categoryClass, categoryIcon } from "@/lib/categories";
import { cn } from "@/lib/utils";

type Props = {
  shot?: Screenshot;
  /** All of the project's screenshots. A phone cover pulls up to three phone screens from here. */
  shots?: Screenshot[];
  icon?: string;
  title: string;
  category: Category;
  /** Larger images get better `sizes` hints. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** One dark stage behind every thumbnail, tinted by category, so the grid reads as a set. */
function Stage({ category, className, children }: { category: Category; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-bar", className)}>
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 bg-radial-[120%_90%_at_50%_0%] from-current/35 to-transparent", categoryClass[category].text)}
      />
      {children}
    </div>
  );
}

/**
 * Renders a screenshot inside a frame that matches the platform it came from,
 * or a branded placeholder when there is no screenshot yet.
 */
export function DeviceFrame({ shot, shots, icon, title, category, sizes = "(min-width: 1280px) 520px, (min-width: 640px) 50vw, 100vw", priority, className }: Props) {
  const Icon = categoryIcon[category];

  if (!shot) {
    return (
      <Stage category={category} className={className}>
        <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-bar-foreground">
          {icon ? (
            <Image src={icon} alt="" width={96} height={96} className="size-16 rounded-2xl shadow-lg ring-1 ring-white/15" />
          ) : (
            <span className="flex size-14 items-center justify-center rounded-2xl bg-bar-foreground/10 ring-1 ring-bar-foreground/20">
              <Icon className="size-7" strokeWidth={1.5} />
            </span>
          )}
          <span className="text-center font-display text-xl leading-tight font-bold">{title}</span>
        </div>
      </Stage>
    );
  }

  if (shot.frame === "phone") {
    const phones = [shot, ...(shots ?? []).filter((s) => s.frame === "phone" && s.src !== shot.src)].slice(0, 3);
    return (
      <Stage category={category} className={className}>
        <div className="relative flex h-full items-center justify-center gap-[4%]">
          {phones.map((s, i) => (
            // Height-driven so the row fits any tile ratio; every phone is the same size and aligned.
            <div
              key={s.src}
              className="relative aspect-[9/19] h-[80%] overflow-hidden rounded-[1.1rem] border-[3px] border-zinc-800 bg-zinc-900 shadow-xl shadow-black/40 sm:border-4"
            >
              <Image src={s.src} alt={i === 0 ? shot.alt : ""} fill sizes="180px" priority={priority} className="object-cover object-top" />
            </div>
          ))}
        </div>
      </Stage>
    );
  }

  if (shot.frame === "browser" || shot.frame === "desktop") {
    return (
      <Stage category={category} className={className}>
        <div className="relative mx-[5%] mt-[5%] flex h-full flex-col overflow-hidden rounded-t-lg border border-b-0 border-white/15 bg-zinc-950 shadow-2xl shadow-black/50">
          <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-white/10 bg-zinc-900 px-2.5">
            <span className="size-2 rounded-full bg-zinc-600" />
            <span className="size-2 rounded-full bg-zinc-600" />
            <span className="size-2 rounded-full bg-zinc-600" />
            {shot.frame === "browser" ? <span className="ml-2 h-3 flex-1 rounded-sm bg-zinc-800" /> : null}
          </div>
          <div className="relative flex-1">
            <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
          </div>
        </div>
      </Stage>
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-cover object-center" />
    </div>
  );
}
