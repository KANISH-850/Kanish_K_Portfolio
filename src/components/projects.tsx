import { Button } from "./ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  Trophy,
  Cpu,
  Layers,
  CheckCircle2,
  Activity,
  Database,
  Zap,
  ShieldCheck
} from "lucide-react";
import MotionWrap from "./motion-wrap";
import { featuredProjectsList, ProjectCaseStudy } from "@/data/projects";
import { Badge } from "./ui/badge";

function ProjectVisualPreview({ project }: { project: ProjectCaseStudy }) {
  if (project.id === "digital-twin-ehv") {
    return (
      <div className="relative h-full w-full min-h-[280px] bg-gradient-to-br from-card via-background to-primary/5 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-l border-white/5 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "20px 20px" }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-primary flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> SCADA Telemetry Stream
          </span>
          <span className="text-[11px] font-mono text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">
            50,000 Records
          </span>
        </div>

        <div className="relative z-10 my-4 space-y-3">
          <div className="p-3 rounded-lg bg-card/80 border border-white/10 backdrop-blur-sm space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Autoencoder Ingestion</span>
              <span className="text-emerald-400 font-bold">&lt; 50ms</span>
            </div>
            <div className="w-full bg-muted/40 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[94%]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2.5 rounded-md bg-muted/20 border border-border/40">
              <span className="text-muted-foreground block">Anomaly Score</span>
              <span className="text-foreground font-bold text-sm">94.0% Acc</span>
            </div>
            <div className="p-2.5 rounded-md bg-muted/20 border border-border/40">
              <span className="text-muted-foreground block">UI Framerate</span>
              <span className="text-foreground font-bold text-sm">60 FPS</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-muted-foreground font-mono pt-2 border-t border-border/30">
          <span>MQTT &bull; InfluxDB &bull; WebSockets</span>
          <span className="text-primary">EHV Substation</span>
        </div>
      </div>
    );
  }

  if (project.id === "intelligent-grievance-system") {
    return (
      <div className="relative h-full w-full min-h-[280px] bg-gradient-to-br from-card via-background to-accent/5 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-l border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "20px 20px" }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-accent flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Multilingual NLP Pipeline
          </span>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            100% WCAG AAA
          </span>
        </div>

        <div className="relative z-10 my-4 space-y-2.5">
          <div className="p-3 rounded-lg bg-card/80 border border-white/10 backdrop-blur-sm flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-muted-foreground block text-[10px]">Neural Translation Engine</span>
              <span className="text-foreground font-bold">IndicTrans2 (Quantized)</span>
            </div>
            <span className="text-accent font-bold">&lt; 500ms</span>
          </div>

          <div className="p-3 rounded-lg bg-card/80 border border-white/10 backdrop-blur-sm flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-muted-foreground block text-[10px]">Semantic Classifier</span>
              <span className="text-foreground font-bold">Sentence Transformers &bull; BERT</span>
            </div>
            <span className="text-emerald-400 font-bold">92% Acc</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-muted-foreground font-mono pt-2 border-t border-border/30">
          <span>FastAPI &bull; React 19 &bull; PostgreSQL</span>
          <span className="text-accent">Citizen Services</span>
        </div>
      </div>
    );
  }

  if (project.id === "aquaguard-ai") {
    return (
      <div className="relative h-full w-full min-h-[280px] bg-gradient-to-br from-card via-background to-blue-500/5 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-l border-white/5 overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "20px 20px" }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" /> Multi-Model Telemetry
          </span>
          <span className="text-[11px] font-mono text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">
            Campus Resilience
          </span>
        </div>

        <div className="relative z-10 my-4 space-y-2 text-[11px] font-mono">
          <div className="p-2.5 rounded-lg bg-card/80 border border-white/10 flex justify-between items-center">
            <span className="text-foreground font-semibold">One-Class SVM</span>
            <span className="text-blue-400 font-bold">99.89% Acc | 3.92ms</span>
          </div>
          <div className="p-2.5 rounded-lg bg-card/80 border border-white/10 flex justify-between items-center">
            <span className="text-foreground font-semibold">XGBoost Leak Recall</span>
            <span className="text-emerald-400 font-bold">100% | 1.14ms</span>
          </div>
          <div className="p-2.5 rounded-lg bg-card/80 border border-white/10 flex justify-between items-center">
            <span className="text-foreground font-semibold">CatBoost 72h Forecast</span>
            <span className="text-purple-400 font-bold">9.59% MAPE | 70.9 L/h</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-muted-foreground font-mono pt-2 border-t border-border/30">
          <span>Python &bull; Scikit-learn &bull; FastAPI</span>
          <span className="text-blue-400">Neeraran Platform</span>
        </div>
      </div>
    );
  }

  // Kiosk Management System
  return (
    <div className="relative h-full w-full min-h-[280px] bg-gradient-to-br from-card via-background to-primary/5 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-l border-white/5 overflow-hidden">
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "20px 20px" }}
      />
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-primary flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Fleet Management Telemetry
        </span>
        <span className="text-[11px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
          CDAC Runner-up
        </span>
      </div>

      <div className="relative z-10 my-4 space-y-2.5 font-mono text-xs">
        <div className="p-3 rounded-lg bg-card/80 border border-white/10 backdrop-blur-sm space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Kiosk Heartbeat Sync</span>
            <span className="text-emerald-400 font-bold">Active &bull; Real-time</span>
          </div>
          <p className="text-[11px] text-foreground/80 font-normal">
            Automated peripheral diagnostics, crash telemetry, and remote status evaluation.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2 rounded bg-muted/20 border border-border/30">
            <span className="text-muted-foreground block">Communication</span>
            <span className="text-foreground font-bold">Reverse WSS</span>
          </div>
          <div className="p-2 rounded bg-muted/20 border border-border/30">
            <span className="text-muted-foreground block">Deployment</span>
            <span className="text-foreground font-bold">Docker Edge</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-xs text-muted-foreground font-mono pt-2 border-t border-border/30">
        <span>FastAPI &bull; React &bull; PostgreSQL</span>
        <span className="text-primary">Fleet Orchestration</span>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 relative" aria-label="Featured Projects">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
              Featured Engineering Projects
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
              Production-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">AI Systems</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              In-depth architectures, mathematical models, and verifiable technical outcomes across predictive maintenance, multilingual NLP, and IoT telemetry.
            </p>
          </div>

          <div className="space-y-12">
            {featuredProjectsList.map((project, index) => (
              <article
                key={project.id}
                className="group rounded-2xl overflow-hidden border border-white/10 bg-card/60 backdrop-blur-sm shadow-xl hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid md:grid-cols-12 gap-0">

                  {/* Left Column: Detailed Content */}
                  <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">

                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground font-semibold">
                          0{index + 1}
                        </span>
                        {project.achievement && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30">
                            <Trophy className="w-3.5 h-3.5" />
                            {project.achievement}
                          </span>
                        )}
                      </div>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold font-headline text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm md:text-base text-accent font-medium mt-1">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Problem & Overview */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.problemStatement}
                      </p>

                      {/* Key Features Bullet points */}
                      <div className="space-y-2 pt-2">
                        <span className="text-xs font-semibold text-foreground/90 uppercase tracking-wider block">
                          Key Architectural Highlights
                        </span>
                        <ul className="space-y-1.5">
                          {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                            <li key={`${project.id}-feat-${fIdx}`} className="flex items-start gap-2 text-xs md:text-sm text-foreground/80">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Model Evaluation Notice if present */}
                      {project.metricsContextNote && (
                        <p className="text-[11px] text-muted-foreground/80 italic font-mono bg-muted/20 p-2 rounded border border-border/30">
                          {project.metricsContextNote}
                        </p>
                      )}

                      {/* Tech Stack Badges */}
                      <div className="pt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={`${project.id}-${tech}`}
                              variant="secondary"
                              className="text-xs font-mono px-2.5 py-0.5 bg-secondary/60 text-secondary-foreground"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border/50">
                      <Button asChild className="group/btn bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                        <Link href={`/projects/${project.id}`}>
                          Read System Case Study
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>

                      {project.githubUrl && (
                        <Button variant="outline" asChild className="border-border hover:bg-accent/10">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 w-4 h-4" />
                            Source Code
                          </a>
                        </Button>
                      )}

                      {project.liveUrl && (
                        <Button variant="ghost" asChild className="text-primary hover:text-primary/80">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            Live Demo &rarr;
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Telemetry / Architecture Preview */}
                  <div className="md:col-span-5 bg-card/30 flex">
                    <ProjectVisualPreview project={project} />
                  </div>

                </div>
              </article>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
