import { Intro } from "@/components/sections/intro";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1180px]">
      <Intro />
      <Work />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </div>
  );
}
