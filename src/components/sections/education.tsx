import { educationData } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function EducationSection() {
  return (
    <section id="education" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Education
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            My academic journey and qualifications.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8">
          {educationData.map((edu, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="grid gap-1">
                  <CardTitle className="text-xl font-semibold">{edu.institution}</CardTitle>
                  <CardDescription>{edu.degree}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-sm text-muted-foreground">{edu.period}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
