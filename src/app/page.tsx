import Header from "@/components/header";
import HeroSection from "@/components/sections/hero";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import SkillsSection from "@/components/sections/skills";
import EducationSection from "@/components/sections/education";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1 animate-in fade-in duration-500">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
