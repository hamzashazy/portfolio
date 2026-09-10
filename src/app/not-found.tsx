import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-[1180px] flex-col items-start justify-center px-5 py-16 sm:px-8 lg:px-12 xl:px-16">
      <p className="label-mono">404</p>
      <h1 className="mt-3 text-4xl font-semibold">That page shipped somewhere else.</h1>
      <p className="mt-3 max-w-md text-muted-foreground">The link is broken or the project moved. Everything I have built is one click away.</p>
      <Link href="/#work" className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground">
        <ArrowLeft className="size-4" /> Back to the work
      </Link>
    </div>
  );
}
