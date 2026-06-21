import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// New Elite Components
import { TechnicalChallenges } from "@/components/technical-challenges";
import { PipelineVisualizer } from "@/components/pipeline-visualizer";
import { SecurityShowcase } from "@/components/security-showcase";
import { DevopsPipeline } from "@/components/devops-pipeline";

export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = projectsData[resolvedParams.slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>
        </Button>

        <header className="mb-12 space-y-4">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-accent font-medium">
            {project.tagline}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            {project.githubUrl && (
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> View Source
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="outline" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            )}
          </div>
        </header>

        <div className="space-y-16">
          {/* 1: Problem Statement */}
          <section className="bg-muted/10 p-6 md:p-8 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-bold mb-4 text-primary">Problem Statement</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">{project.problemStatement}</p>
          </section>

          {/* 2 & 3: Architecture and Data Flow (Architecture First Storytelling) */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">System Architecture</h2>
              <p className="text-foreground/80 leading-relaxed bg-card p-6 border border-white/5 shadow-sm rounded-xl">
                {project.systemArchitecture}
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Data Flow</h2>
              <p className="text-foreground/80 leading-relaxed bg-card p-6 border border-white/5 shadow-sm rounded-xl font-code text-sm">
                {project.dataFlow}
              </p>
            </div>
          </section>

          {/* AI/ML Pipeline */}
          <PipelineVisualizer pipeline={project.mlPipeline} />

          {/* 4 & 5: Technical Challenges & Solutions */}
          <TechnicalChallenges challenges={project.technicalChallenges} />

          {/* 6: Features & Tech Stack */}
          <section className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1.5 text-sm">{tech}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-3">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 7: Security Showcase */}
          <SecurityShowcase features={project.securityFeatures} />

          {/* DevOps Pipeline */}
          <DevopsPipeline pipeline={project.devopsPipeline} />

          {/* 8 & 9: Accessibility & Performance Results */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-500">Accessibility Measures</h3>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80 text-sm">
                {project.accessibilityMeasures.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-purple-500">Performance Results</h3>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80 text-sm">
                {project.performanceMetrics.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </section>

          {/* 10: Lessons Learned */}
          <section className="bg-accent/5 border border-accent/20 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-accent">Lessons Learned</h2>
            <ul className="space-y-4">
              {project.lessonsLearned.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-3 text-lg text-foreground/90 leading-relaxed">
                  <span className="text-accent font-bold">{idx + 1}.</span>
                  {lesson}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
