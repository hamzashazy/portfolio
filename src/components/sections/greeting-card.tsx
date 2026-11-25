"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { setVisitorName, useVisitorName } from "@/hooks/use-visitor-name";

const ease = [0.16, 1, 0.3, 1] as const;
const fmt = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" });

export function GreetingCard() {
  const name = useVisitorName();
  const [now, setNow] = useState<Date | null>(null);
  const [draft, setDraft] = useState("");
  /** Name just submitted: shows the thank-you for a moment before the regular row. */
  const [ack, setAck] = useState<string | null>(null);

  useEffect(() => {
    if (!ack) return;
    const id = setTimeout(() => setAck(null), 2400);
    return () => clearTimeout(id);
  }, [ack]);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const h = now?.getHours();
  const hello = h === undefined ? "Hello" : h >= 5 && h < 12 ? "Good morning" : h >= 12 && h < 17 ? "Good afternoon" : "Good evening";
  const heading = name ? `${hello}, ${name}.` : `${hello}.`;
  const rows = [
    ["Your time", now ? fmt.format(now) : "--:--"],
    ["Replies", "within a day"],
    ["Status", "Open to work"],
  ];

  return (
    <div className="surface p-6 shadow-[0_18px_50px_-24px_color-mix(in_oklch,var(--gold)_55%,transparent)]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.h2
          key={heading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3, ease } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          className="text-3xl"
        >
          {heading}
        </motion.h2>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {name && ack ? (
          <motion.p key="ack" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3, ease } }} exit={{ opacity: 0, transition: { duration: 0.12 } }} className="mt-3 min-h-11 text-sm text-foreground">
            Nice to meet you, {ack}.
          </motion.p>
        ) : name ? (
          <motion.div key="known" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3, ease } }} exit={{ opacity: 0, transition: { duration: 0.12 } }} className="mt-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
            <p>Good to have you here.</p>
            <button
              type="button"
              onClick={() => setVisitorName("")}
              className="inline-flex min-h-8 cursor-pointer items-center px-2 underline underline-offset-4 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none pointer-coarse:min-h-11 pointer-coarse:px-3"
            >
              Not you?
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              const v = draft.trim().slice(0, 40);
              if (!v) return;
              setAck(v);
              setVisitorName(v);
              setDraft("");
            }}
          >
            <label htmlFor="visitor-name" className="text-sm text-muted-foreground">
              May I know your good name?
            </label>
            <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background py-1 pr-1 pl-4 focus-within:ring-3 focus-within:ring-ring/50">
              <input
                id="visitor-name"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={40}
                placeholder="Type your name here"
                autoComplete="given-name"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Save name"
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none pointer-coarse:size-11"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <dl className="mt-6 divide-y divide-border border-t border-border text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between py-3">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
