import { experienceData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase, CheckCircle2 } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full bg-secondary py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Experience
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            A timeline of my professional work and contributions.
          </p>
        </div>
        <div className="relative mx-auto max-w-4xl">
           <div className="absolute left-6 top-0 h-full w-0.5 bg-border" aria-hidden="true" />
           <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-background ring-8 ring-background">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle>{exp.role}</CardTitle>
                    <CardDescription>
                      {exp.company} • {exp.period}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
