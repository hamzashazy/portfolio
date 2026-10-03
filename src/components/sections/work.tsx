import { SectionHeading } from "@/components/reveal";
import { WorkGrid } from "@/components/work/work-grid";

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 px-5 py-10 sm:px-8 lg:px-12 lg:py-14 xl:px-16">
      <SectionHeading
        index="01"
        label="Work"
        title="AI-driven products, with their real status"
        description="Every card says where the thing actually is: live, in testing, waiting on a store review, shipped, or still being built."
      />
      <WorkGrid />
    </section>
  );
}
