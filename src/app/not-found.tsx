import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70dvh] flex-col items-start justify-center pt-12 pb-16">
      <p className="label-mono">404</p>
      <h1 className="mt-3 font-display text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.05] font-bold tracking-[-0.025em]">That page shipped somewhere else.</h1>
      <p className="mt-3 max-w-md text-lg font-light text-muted-foreground">The link is broken or the project moved. Everything I have built is one click away.</p>
      <Link href="/#work" className="btn-solid mt-8">
        <ArrowLeft className="size-4" /> Back to the work
      </Link>
    </div>
  );
}
