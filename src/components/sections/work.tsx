import { SectionHeading } from "@/components/reveal";
import { WorkGrid } from "@/components/work/work-grid";

export function Work() {
  return (
    <section id="work" className="scroll-mt-16">
      <div className="shell border-t border-border py-12 sm:py-16 lg:py-24">
        <SectionHeading title="Selected work" description="Products, stores, systems and games, each with its real status." />
        <WorkGrid />
      </div>
    </section>
  );
}
