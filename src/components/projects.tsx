import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Activity, Zap } from "lucide-react";
import MotionWrap from "./motion-wrap";
import { projectsData } from "@/data/projects";

export function Projects() {
  const projectList = Object.values(projectsData);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="container">
        <MotionWrap>
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Featured Work
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Impact</span>
            </h2>
            <p className="text-muted-foreground text-lg">Deep dives into the architecture, challenges, and outcomes of my most significant ML & Full-Stack systems.</p>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-16">
            {projectList.map((project) => {
              // Map to placeholders (aazhi-suvidhaa -> suvidha, etc.)
              const imageId = project.id === 'aazhi-suvidhaa' ? 'suvidha' : project.id === 'digital-twin-ehv' ? 'digital-twin-ehv' : 'suvidha';
              const projectImage = PlaceHolderImages.find(p => p.id === imageId);
              
              return (
                <Card key={project.id} className="group grid md:grid-cols-2 gap-0 overflow-hidden border-white/10 shadow-2xl bg-card hover:border-primary/30 transition-all duration-500">
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold font-headline">{project.title}</h3>
                      <p className="text-accent font-medium">{project.tagline}</p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {project.problemStatement}
                    </p>

                    <div className="flex gap-4 pb-4">
                       <div className="flex items-center gap-2 text-sm font-medium text-foreground/80 bg-background/50 px-3 py-1.5 rounded-md border border-border">
                          <Activity className="w-4 h-4 text-emerald-500" />
                          Performance Metrics
                       </div>
                       <div className="flex items-center gap-2 text-sm font-medium text-foreground/80 bg-background/50 px-3 py-1.5 rounded-md border border-border">
                          <Zap className="w-4 h-4 text-primary" />
                          Highly Scalable
                       </div>
                    </div>

                    <div className="pt-4 border-t border-border/50">
                      <Button asChild className="w-full sm:w-auto group/btn">
                        <Link href={`/projects/${project.id}`}>
                          Read Case Study 
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative h-64 md:h-auto overflow-hidden bg-muted/20">
                    {projectImage ? (
                       <Image
                        src={projectImage.imageUrl}
                        alt={projectImage.description}
                        data-ai-hint={projectImage.imageHint}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-muted-foreground font-code text-sm">System Architecture Preview</span>
                      </div>
                    )}
                    {/* Glass gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-card/90" />
                  </div>
                </Card>
              );
            })}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
