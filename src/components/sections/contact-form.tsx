"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Send } from "lucide-react";
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

  const field = (name: keyof Values) =>
    cn("h-10 rounded-lg bg-background", errors[name] && "border-destructive focus-visible:ring-destructive/30");

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
            className="flex flex-col items-center gap-3 py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 260, delay: 0.1 }}
              className="inline-flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary"
            >
              <Check className="size-7" />
            </motion.span>
            <h3 className="text-xl font-semibold">Message sent</h3>
            <p className="max-w-sm text-sm text-muted-foreground">Thanks. It landed in my inbox and I usually reply within a day.</p>
            <button type="button" onClick={() => setState("idle")} className="mt-2 cursor-pointer text-sm text-primary underline-offset-4 hover:underline">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" autoComplete="name" placeholder="Your name" className={field("name")} aria-invalid={!!errors.name} {...register("name")} />
                <FieldError message={errors.name?.message} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" className={field("email")} aria-invalid={!!errors.email} {...register("email")} />
                <FieldError message={errors.email?.message} />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is this about?" className={field("subject")} aria-invalid={!!errors.subject} {...register("subject")} />
              <FieldError message={errors.subject?.message} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} placeholder="A few lines about the project, timeline and what you need." className={cn("min-h-28 rounded-lg bg-background", errors.message && "border-destructive")} aria-invalid={!!errors.message} {...register("message")} />
              <FieldError message={errors.message?.message} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">Or email me directly. Both reach the same inbox.</p>
              <button
                type="submit"
                disabled={state === "sending"}
                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 disabled:cursor-wait disabled:opacity-70 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {state === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                {state === "sending" ? "Sending" : "Send message"}
              </button>
            </div>
            <AnimatePresence>
              {state === "error" && serverError ? (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {serverError}. You can also email me directly.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-xs text-destructive">
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
