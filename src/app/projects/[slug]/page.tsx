import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Trophy, BarChart3, ShieldCheck, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Elite Subcomponents
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
    <div className="min-h-screen pt-24 pb-20 bg-background text-foreground">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">

        {/* Navigation back */}
        <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Featured Projects
          </Link>
        </Button>

        {/* Header */}
        <header className="mb-12 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-primary uppercase font-bold tracking-wider">
              System Architecture & Case Study
            </span>
            {project.achievement && (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30">
                <Trophy className="w-3.5 h-3.5" />
                {project.achievement}
              </span>
            )}
          </div>

          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-accent font-medium leading-relaxed">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {project.githubUrl && (
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> View Verified Repository
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="outline" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Verified Live Demo
                </a>
              </Button>
            )}
          </div>
        </header>

        <div className="space-y-16">

          {/* 1: Problem Statement */}
          <section className="bg-card p-6 md:p-8 rounded-2xl border border-white/10 shadow-sm space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
              Problem Statement & Domain Context
            </h2>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              {project.problemStatement}
            </p>
          </section>

          {/* 2 & 3: Architecture and Data Flow */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">System Architecture</h2>
              <div className="text-foreground/80 leading-relaxed bg-card p-6 border border-white/5 shadow-sm rounded-xl text-sm md:text-base">
                {project.systemArchitecture}
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground">Data Flow Pipeline</h2>
              <div className="text-foreground/80 leading-relaxed bg-card p-6 border border-white/5 shadow-sm rounded-xl font-mono text-xs md:text-sm">
                {project.dataFlow}
              </div>
            </div>
          </section>

          {/* Specialized Model Metrics (AquaGuard AI or other evaluated models) */}
          {project.modelMetrics && project.modelMetrics.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-primary" /> Verified Model Evaluation Benchmarks
                </h2>
                <span className="text-xs font-mono text-muted-foreground bg-muted/40 px-2.5 py-1 rounded">
                  Test Partition Results
                </span>
              </div>

              {project.metricsContextNote && (
                <p className="text-xs text-muted-foreground italic bg-muted/20 p-3 rounded-lg border border-border/40">
                  {project.metricsContextNote}
                </p>
              )}

              <div className="grid md:grid-cols-3 gap-4">
                {project.modelMetrics.map((m) => (
                  <div key={m.model} className="p-5 rounded-xl bg-card border border-white/10 flex flex-col justify-between space-y-3 shadow-sm">
                    <div>
                      <span className="text-xs font-mono text-primary font-bold uppercase">{m.model}</span>
                      <h3 className="font-semibold text-sm text-foreground mt-0.5">{m.task}</h3>
                      <div className="mt-3 space-y-1">
                        <div className="text-xl font-bold text-foreground">{m.accuracyOrMetric}</div>
                        <div className="text-xs text-accent font-mono">{m.f1OrDetail}</div>
                        <div className="text-xs text-muted-foreground font-mono">Latency: {m.latency}</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground/80 pt-2 border-t border-border/40 leading-snug">
                      {m.context}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AI/ML Pipeline Visualization */}
          {project.mlPipeline && project.mlPipeline.length > 0 && (
            <PipelineVisualizer pipeline={project.mlPipeline} />
          )}

          {/* Technical Challenges & Solutions */}
          {project.technicalChallenges && project.technicalChallenges.length > 0 && (
            <TechnicalChallenges challenges={project.technicalChallenges} />
          )}

          {/* Features & Tech Stack */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-2xl border border-white/5 space-y-4">
              <h2 className="text-xl font-bold">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1 font-mono text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-white/5 space-y-4">
              <h2 className="text-xl font-bold">Key Architectural Features</h2>
              <ul className="space-y-2.5">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={`${project.id}-feat-${idx}`} className="flex items-start gap-2 text-xs md:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Security Showcase */}
          {project.securityFeatures && project.securityFeatures.length > 0 && (
            <SecurityShowcase features={project.securityFeatures} />
          )}

          {/* DevOps Pipeline */}
          {project.devopsPipeline && project.devopsPipeline.length > 0 && (
            <DevopsPipeline pipeline={project.devopsPipeline} />
          )}

          {/* Accessibility & Performance Results */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-blue-400">Accessibility Measures</h3>
              <ul className="space-y-2 text-foreground/80 text-xs md:text-sm">
                {project.accessibilityMeasures.map((item, idx) => (
                  <li key={`${project.id}-a11y-${idx}`} className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-purple-400">Performance Results</h3>
              <ul className="space-y-2 text-foreground/80 text-xs md:text-sm">
                {project.performanceMetrics.map((item, idx) => (
                  <li key={`${project.id}-perf-${idx}`} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Lessons Learned */}
          <section className="bg-accent/5 border border-accent/20 p-6 md:p-8 rounded-2xl space-y-4">
            <h2 className="text-2xl font-bold text-accent">Engineering Lessons & Retrospective</h2>
            <ul className="space-y-3">
              {project.lessonsLearned.map((lesson, idx) => (
                <li key={`${project.id}-lesson-${idx}`} className="flex items-start gap-3 text-sm md:text-base text-foreground/90 leading-relaxed">
                  <span className="text-accent font-bold font-mono">{idx + 1}.</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
