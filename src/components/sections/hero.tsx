import Link from "next/link";
import Image from "next/image";
import { heroData, projectsData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowDown } from "lucide-react";
import { socialLinks } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { RadialGradient } from "../ui/radial-gradient";

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen min-h-[700px] flex items-center bg-grid-white/[0.02] overflow-hidden">
      <RadialGradient />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative w-44 h-44 md:w-52 md:h-52 mb-6 rounded-full overflow-hidden ring-4 ring-primary/50 shadow-lg">
              <Image
                src="/prof.jpg"
                alt={heroData.name}
                fill
                sizes="(min-width: 768px) 208px, 176px"
                style={{ objectFit: 'cover', objectPosition: '50% 12%' }}
                priority
                data-ai-hint="profile picture"
              />
              {/* decorative waving hand positioned slightly outside the ring */}
              <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-background rounded-full flex items-center justify-center text-2xl animate-wave ring-2 ring-background/60" aria-hidden="true">
                <span className="leading-none">👋</span>
              </div>
            </div>
            
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              {heroData.name}
            </h1>
            <p className="mt-2 font-headline text-2xl md:text-3xl font-medium text-primary">
              {heroData.title}
            </p>
            <p className="mt-4 max-w-lg text-muted-foreground md:text-lg">
              {heroData.introduction}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
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
             <div className="mt-8 flex justify-center md:justify-start gap-4">
              {socialLinks.map((link) => (
                  <Button key={link.name} variant="ghost" size="icon" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                          <link.icon className="h-5 w-5" />
                      </a>
                  </Button>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex justify-center">
             <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                orientation="vertical"
                className="w-full max-w-sm"
              >
                <CarouselContent className="-mt-1 h-[620px]">
            {projectsData.slice(0, 3).map((project, index) => (
                    <CarouselItem key={index} className="pt-1 md:basis-1/3">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        <div className="group relative w-full h-48 rounded-xl p-[2px] bg-gradient-to-br from-primary/40 via-accent/30 to-transparent shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02]">
                          <div className="relative h-full w-full rounded-[10px] overflow-hidden bg-background/60 backdrop-blur-md ring-1 ring-primary/10">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="transition-transform duration-500 ease-out group-hover:scale-110"
                            />
                            {/* gradient glow */}
                            <div className="pointer-events-none absolute -inset-1 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent" />
                            {/* overlay content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute top-3 left-3 z-10">
                              <Badge variant="secondary" className="bg-background/80 backdrop-blur text-foreground/90">
                                {project.stack?.[0] ?? 'Project'}
                              </Badge>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                              <h3 className="text-white font-bold text-base leading-tight drop-shadow">{project.title}</h3>
                              <p className="mt-1 line-clamp-2 text-xs text-white/80">
                                {project.description}
                              </p>
                            </div>
                          </div>
                        </div>
                       </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <a href="#experience" aria-label="Scroll to experience section">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </a>
      </div>
    </section>
  );
}