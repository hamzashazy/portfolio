import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full py-20 bg-gradient-to-b from-background via-background/95 to-background/80"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary/80">
            My Projects
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Some of my recent work — detailed, functional, and designed with love.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-border/40 bg-background/80 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Text Section */}
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Key Features */}
                {project.features && project.features.length > 0 && (
                  <ul className="mb-4 space-y-1 text-sm text-muted-foreground/90">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 before:content-['•'] before:text-primary before:text-lg before:leading-none"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.stack.map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex gap-3">
                  {project.link && (
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={project.link} target="_blank" rel="noopener noreferrer">
                        GitHub <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {project.link2 && (
                    <Button asChild className="flex-1">
                      <Link href={project.link2} target="_blank" rel="noopener noreferrer">
                        Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Glow Hover Border */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md bg-gradient-to-br from-primary/20 via-accent/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
