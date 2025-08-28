import HeroTitle from "./components/HeroTitle";
import DynamicTagline from "./components/DynamicTagline";
import TitleList from "./components/TitleList";
import SocialIcons from "./components/SocialIcons";
import AboutMe from "./components/AboutMe";
import Experiences from "./components/Experiences";
import Projects from "./components/Projects";
import { siteConfig } from "./config";
import TableOfContents from "./components/TableOfContents";
import HireMeButton from "./components/HireMeButton";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Technologies from "./components/Technologies";
import OpenToWorkBanner from "./components/OpenToWorkBanner";
import HeroVisual from "./components/HeroVisual";

export default async function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
        keywords: siteConfig.keywords,
    };

    return (
<<<<<<< HEAD
        <main className="w-full min-h-screen px-0 sm:px-0 xl:px-0 2xl:px-0 bg-gradient-to-br from-[#0a0a0f] via-[#131326] to-[#070a0f] relative overflow-x-hidden" id="home">
=======
        <main className="w-full min-h-screen px-0 sm:px-0 xl:px-0 2xl:px-0 bg-gradient-to-br from-[#1a1a2e] via-[#232946] to-[#0f2027] relative overflow-x-hidden" id="home">
>>>>>>> fd00a94e9ab12ecd0508d51673c0b021721be371
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
<<<<<<< HEAD
            <section id="hero" className="relative min-h-[92vh] py-24 px-4 md:px-8 xl:px-20 2xl:px-40">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-br from-pink-500/10 via-indigo-500/10 to-transparent animate-pulse blur-2xl" />
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="max-w-2xl">
                        <HeroTitle />
                        <TitleList titles={siteConfig.titles} />
                        <DynamicTagline
                            taglines={siteConfig.taglines}
                            className="pl-1 text-left text-lg sm:text-xl mt-6 min-h-20 max-w-[560px] text-slate-200 font-semibold"
                        />
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                            <HireMeButton />
                            <a href="#projects" className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:scale-[1.02] active:scale-[0.99] transition-transform duration-200">See Projects</a>
                        </div>
                        <div className="mt-8">
                            <SocialIcons />
                        </div>
                    </div>
                    <div>
                        <HeroVisual />
=======
            <section id="hero" className="relative flex flex-col items-center justify-center min-h-[90vh] py-24 px-4 text-center bg-gradient-to-b from-transparent to-black/60">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Animated background: stars or particles */}
                    <div className="w-full h-full bg-gradient-to-br from-pink-500/10 via-indigo-500/10 to-transparent animate-pulse blur-2xl" />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <HeroTitle />
                    <TitleList titles={siteConfig.titles} />
                    <DynamicTagline
                        taglines={siteConfig.taglines}
                        className="pl-1 text-center text-lg sm:text-xl mt-6 min-h-20 max-w-[500px] text-slate-200 font-semibold"
                    />
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <HireMeButton />
                        <a href="#projects" className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200">See Projects</a>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <SocialIcons />
>>>>>>> fd00a94e9ab12ecd0508d51673c0b021721be371
                    </div>
                </div>
            </section>
            {/* Main Content Sections */}
<<<<<<< HEAD
            <section className="relative z-10 flex flex-col gap-16 md:gap-24 px-4 sm:px-10 xl:px-40 2xl:px-80 mt-[-2rem]">
=======
            <section className="relative z-10 flex flex-col gap-16 md:gap-24 px-4 sm:px-10 xl:px-40 2xl:px-80 mt-[-4rem]">
>>>>>>> fd00a94e9ab12ecd0508d51673c0b021721be371
                <div className="rounded-3xl bg-white/5 backdrop-blur-lg shadow-2xl p-8 md:p-12" id="about">
                    <AboutMe />
                </div>
                <div className="rounded-3xl bg-white/5 backdrop-blur-lg shadow-2xl p-8 md:p-12" id="experience">
                    <Experiences />
                </div>
                <div className="rounded-3xl bg-white/5 backdrop-blur-lg shadow-2xl p-8 md:p-12" id="projects">
                    <Projects />
                </div>
                <div className="rounded-3xl bg-white/5 backdrop-blur-lg shadow-2xl p-8 md:p-12" id="technologies">
                    <Technologies />
                </div>
                <div className="rounded-3xl bg-white/5 backdrop-blur-lg shadow-2xl p-8 md:p-12" id="contact">
                    <ContactForm />
                </div>
            </section>
            <div className="mt-16">
                <Footer />
            </div>
            <OpenToWorkBanner />
        </main>
    );
}