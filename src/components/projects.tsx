import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Github } from "lucide-react";
import MotionWrap from "./motion-wrap";

const projects = [
  {
    id: "chatbot",
    title: "Chatbot with NLP",
    description: "Developed a chatbot using NLP techniques for conversational AI.",
    href: "#",
    githubUrl: "#",
  },
  {
    id: "ml-pipeline",
    title: "Automated ML Pipeline",
    description: "Created an automated machine learning pipeline for efficient model training and deployment.",
    href: "#",
    githubUrl: "#",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis Model",
    description: "Built a sentiment analysis model to analyze text data and determine sentiment.",
    href: "#",
    githubUrl: "#",
  },
  {
    id: "task-scheduler",
    title: "AI Task Scheduler",
    description: "An automation tool that uses intelligent decision-making to manage and prioritize tasks.",
    href: "#",
    githubUrl: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container">
        <MotionWrap>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#030303] to-[#575956] bg-clip-text text-transparent">Projects</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-16">
            {projects.map((project) => {
              const projectImage = PlaceHolderImages.find(p => p.id === project.id);
              return (
                <Card key={project.id} className="grid md:grid-cols-2 gap-8 md:gap-12 p-8 items-center shadow-lg overflow-hidden">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                    <div className="flex gap-4">
                      <Button asChild variant="outline">
                        <Link href={project.href}>Explore</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div>
                    {projectImage && (
                       <Image
                        src={projectImage.imageUrl}
                        alt={projectImage.description}
                        data-ai-hint={projectImage.imageHint}
                        width={600}
                        height={400}
                        className="rounded-lg object-cover aspect-[4/3]"
                      />
                    )}
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
