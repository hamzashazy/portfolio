import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { Proof } from "@/components/sections/proof";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Process />
      <Work />
      <Proof />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
