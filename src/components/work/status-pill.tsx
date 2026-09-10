import { STATUSES, type Status } from "@/data/types";
import { statusDot } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function StatusPill({ status, note, className }: { status: Status; note?: string; className?: string }) {
  const label = STATUSES.find((s) => s.id === status)?.label ?? status;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[11px] leading-none whitespace-nowrap text-foreground/90 backdrop-blur",
        className,
      )}
    >
      <span className={cn("inline-block size-1.5 rounded-full", statusDot[status])} aria-hidden="true" />
      {label}
      {note ? <span className="hidden text-muted-foreground sm:inline">· {note}</span> : null}
    </span>
  );
}
