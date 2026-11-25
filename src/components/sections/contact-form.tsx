"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Loader2, RotateCw, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Tell me your name"),
  email: z.string().email("That email does not look right"),
  subject: z.string().min(3, "A short subject helps"),
  message: z.string().min(20, "Say a little more, at least 20 characters"),
});
type Values = z.infer<typeof schema>;

const ease = [0.16, 1, 0.3, 1] as const;

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", subject: "", message: "" } });
  const { register, handleSubmit, formState: { errors }, reset } = form;
  const sending = state === "sending";

  async function onSubmit(values: Values) {
    setState("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Could not send the message");
      setState("sent");
      reset();
    } catch (e) {
      setServerError((e as Error).message);
      setState("error");
    }
  }

  // Tuned for the emerald band: soft red that keeps contrast on the dark surface in both themes.
  const bad = "aria-invalid:border-[oklch(0.76_0.13_25)] aria-invalid:ring-[oklch(0.76_0.13_25)]/25 dark:aria-invalid:border-[oklch(0.76_0.13_25)] dark:aria-invalid:ring-[oklch(0.76_0.13_25)]/25";
  const field = "h-11 rounded-xl border-border bg-card px-3.5 dark:bg-card " + bad;
  const describe = (name: keyof Values) => (errors[name] ? `${name}-error` : undefined);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {state === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              role="status"
              className="surface flex flex-col items-center gap-4 px-6 py-12 text-center"
            >
              <span className="inline-flex size-16 items-center justify-center rounded-full border border-gold/50 text-gold">
                <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, ease, delay: 0.15 }} />
                </svg>
              </span>
              <p className="font-display text-xl font-semibold">Message sent. I&apos;ll reply within a day.</p>
              <button type="button" onClick={() => setState("idle")} className="btn-solid mt-1 pointer-coarse:h-12">
                Send another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25, ease }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="grid gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" autoComplete="name" placeholder="Your name" className={field} aria-invalid={!!errors.name} aria-describedby={describe("name")} {...register("name")} />
                  <FieldError id="name-error" message={errors.name?.message} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" className={field} aria-invalid={!!errors.email} aria-describedby={describe("email")} {...register("email")} />
                  <FieldError id="email-error" message={errors.email?.message} />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is this about?" className={field} aria-invalid={!!errors.subject} aria-describedby={describe("subject")} {...register("subject")} />
                <FieldError id="subject-error" message={errors.subject?.message} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} placeholder="A few lines about the project, timeline and what you need." className={cn("min-h-28 rounded-xl border-border bg-card px-3.5 py-2.5 dark:bg-card", bad)} aria-invalid={!!errors.message} aria-describedby={describe("message")} {...register("message")} />
                <FieldError id="message-error" message={errors.message?.message} />
              </div>
              {state === "error" && serverError ? (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease }} role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[oklch(0.76_0.13_25)]/40 bg-[oklch(0.76_0.13_25)]/10 px-3 py-2 text-sm text-[oklch(0.86_0.09_25)]">
                  <p>{serverError}. You can also email me directly.</p>
                  <button type="submit" className="inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full border border-current px-3 font-medium focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none pointer-coarse:min-h-11">
                    <RotateCw className="size-3.5" aria-hidden="true" /> Retry
                  </button>
                </motion.div>
              ) : null}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">Or email me directly. Both reach the same inbox.</p>
                <button type="submit" disabled={sending} aria-busy={sending} className="btn-solid min-w-44 disabled:cursor-wait disabled:opacity-70 pointer-coarse:h-12">
                  {sending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
                  {sending ? "Sending" : "Send message"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <motion.p id={id} role="alert" initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease }} className="text-xs text-[oklch(0.86_0.09_25)]">
      {message}
    </motion.p>
  );
}
