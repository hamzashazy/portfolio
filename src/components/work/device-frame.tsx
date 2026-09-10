import Image from "next/image";
import type { Category, Screenshot } from "@/data/types";
import { categoryClass, categoryIcon } from "@/lib/categories";
import { cn } from "@/lib/utils";

type Props = {
  shot?: Screenshot;
  icon?: string;
  title: string;
  category: Category;
  /** Larger images get better `sizes` hints. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders a screenshot inside a frame that matches the platform it came from,
 * or a branded placeholder when there is no screenshot yet.
 */
export function DeviceFrame({ shot, icon, title, category, sizes = "(min-width: 1280px) 520px, (min-width: 640px) 50vw, 100vw", priority, className }: Props) {
  const cat = categoryClass[category];
  const Icon = categoryIcon[category];

  if (!shot) {
    return (
      <div className={cn("relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br dot-grid", cat.gradient, className)}>
        {icon ? (
          <Image src={icon} alt="" width={96} height={96} className="size-20 rounded-2xl shadow-lg ring-1 ring-black/10 sm:size-24" />
        ) : (
          <div className={cn("flex size-20 items-center justify-center rounded-2xl bg-background/70 shadow-lg ring-1 ring-border backdrop-blur", cat.text)}>
            <Icon className="size-9" strokeWidth={1.5} />
          </div>
        )}
        <span className="absolute right-3 bottom-2 font-mono text-[10px] text-foreground/50">{title}</span>
      </div>
    );
  }

  if (shot.frame === "phone") {
    return (
      <div className={cn("relative flex h-full w-full items-end justify-center overflow-hidden bg-gradient-to-br dot-grid", cat.gradient, className)}>
        <div className="relative mt-5 aspect-[9/19] h-[112%] overflow-hidden rounded-[1.6rem] border-[5px] border-zinc-900 bg-zinc-900 shadow-2xl">
          <Image src={shot.src} alt={shot.alt} fill sizes="200px" priority={priority} className="object-cover object-top" />
        </div>
      </div>
    );
  }

  if (shot.frame === "browser" || shot.frame === "desktop") {
    return (
      <div className={cn("relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-br", cat.gradient, className)}>
        <div className="mx-4 mt-4 flex flex-1 flex-col overflow-hidden rounded-t-lg border border-b-0 border-black/20 bg-zinc-950 shadow-2xl dark:border-white/10">
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
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-cover object-center" />
    </div>
  );
}
