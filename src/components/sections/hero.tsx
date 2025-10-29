"use client";

import Link from "next/link";
import Image from "next/image";
import { heroData, projectsData, socialLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { RadialGradient } from "../ui/radial-gradient";

export default function HeroSection() {
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector("#projects");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[500px] flex items-center py-2 bg-grid-white/[0.02] overflow-hidden"
    >
      <RadialGradient />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-center md:items-start justify-start text-center md:text-left">
            <div className="relative w-48 h-48 md:w-30 md:h-30 mb-3 rounded-full overflow-hidden ring-2 ring-primary/40 shadow-md hover:scale-105 transition-transform duration-300">
              <Image
                src="/prof.jpg"
                alt={heroData.name}
                fill
                sizes="(min-width: 768px) 176px, 144px"
                style={{ objectFit: "cover", objectPosition: "50% 12%" }}
                priority
              />
              <div
                className="absolute -bottom-2 -right-2 w-9 h-9 bg-background rounded-full flex items-center justify-center text-2xl animate-wave ring-2 ring-background/60"
                aria-hidden="true"
              >
                <span className="leading-none">👋</span>
              </div>
            </div>

            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {heroData.name}
            </h1>
            <p className="mt-1 font-headline text-lg md:text-xl font-medium text-primary/90">
              {heroData.title}
            </p>
            <p className="mt-3 max-w-md text-muted-foreground text-sm md:text-base leading-relaxed">
              {heroData.introduction}
            </p>

            <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
              <Button asChild size="lg">
                <Link href="#contact">Contact Me</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2" />
                  View Resume
                </a>
              </Button>
            </div>

            <div className="mt-5 flex justify-center md:justify-start gap-3">
              {socialLinks.map((link) => (
                <Button key={link.name} variant="ghost" size="icon" asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE — CAROUSEL */}
          <div className="hidden md:flex justify-center">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              orientation="vertical"
              className="w-full max-w-sm"
            >
              <CarouselContent className="-mt-1 h-[500px] md:h-[520px]">
                {projectsData.slice(0, 3).map((project, index) => (
                  <CarouselItem key={index} className="pt-1 md:basis-1/3">
                    <a href="#projects" onClick={handleCardClick}>
                      {/* CARD CONTAINER */}
                      <div className="group relative w-full h-40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.04] hover:-translate-y-1">
                        {/* neon glowing frame */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/40 via-accent/30 to-transparent opacity-70 group-hover:opacity-100 blur-[1px] transition-all duration-500"></div>

                        {/* background glass layer */}
                        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-background/30 backdrop-blur-md border border-white/10 shadow-xl">
                          {/* project image */}
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-2xl transition-transform duration-700 ease-out group-hover:scale-110"
                          />

                          {/* dark fade overlay for text visibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                          {/* glossy reflection */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-40 group-hover:opacity-70 transition-opacity duration-700 mix-blend-overlay" />

                          {/* animated glossy shine */}
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60"></div>
                          </div>

                          {/* floating badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <Badge className="bg-background/60 backdrop-blur text-foreground/90 shadow-md">
                              {project.stack?.[0] ?? "Project"}
                            </Badge>
                          </div>

                          {/* text overlay */}
                          <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                            <h3 className="text-white font-bold text-lg tracking-tight drop-shadow-md">
                              {project.title}
                            </h3>
                            <p className="mt-1 text-white/80 text-xs leading-snug line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
