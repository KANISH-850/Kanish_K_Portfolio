import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  CheckCircle2,
  Trophy,
  BarChart3,
  Compass,
  Scale,
  UserCheck,
  Sparkles,
  Lightbulb,
  Database,
  Brain,
  Cpu,
  Users,
  Layers,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  projectsData,
  featuredProjectsList,
  type VerificationStatus,
} from "@/data/projects";
import { engineeringNotes } from "@/data/notes";
import { TechnicalChallenges } from "@/components/technical-challenges";
import { PipelineVisualizer } from "@/components/pipeline-visualizer";
import { SecurityShowcase } from "@/components/security-showcase";
import { DevopsPipeline } from "@/components/devops-pipeline";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ProjectDemonstration } from "@/components/project-demonstration";

const SLUG_ALIASES: Record<string, string> = {
  "digital-twin-ehv-substation": "digital-twin-ehv",
};

function resolveProject(slug: string) {
  const canonicalSlug = SLUG_ALIASES[slug] ?? slug;
  return projectsData[canonicalSlug];
}

const VERIFICATION_STYLES: Record<VerificationStatus, string> = {
  "Verified implementation": "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  "Verified result": "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  "Simulated demonstration": "bg-amber-500/10 text-amber-300 border-amber-500/30",
  "Proposed future improvement": "bg-purple-500/10 text-purple-300 border-purple-500/30",
  "Unknown / needs confirmation": "bg-slate-500/10 text-slate-300 border-slate-500/30",
};

export function generateStaticParams() {
  const canonicalSlugs = Object.keys(projectsData);
  const aliasSlugs = Object.keys(SLUG_ALIASES);
  return [...canonicalSlugs, ...aliasSlugs].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = resolveProject(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: project.title,
    description: `${project.tagline}. ${project.overview || project.problemStatement}`,
    alternates: {
      canonical: `https://KANISH-850.github.io/Kanish_K_Portfolio/projects/${project.id}/`,
    },
    openGraph: {
      title: `${project.title} | Kanish K`,
      description: project.tagline,
      url: `https://KANISH-850.github.io/Kanish_K_Portfolio/projects/${project.id}/`,
      images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = resolveProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const currentIdx = featuredProjectsList.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIdx > 0 ? featuredProjectsList[currentIdx - 1] : null;
  const nextProject =
    currentIdx >= 0 && currentIdx < featuredProjectsList.length - 1
      ? featuredProjectsList[currentIdx + 1]
      : null;
  const relatedProjects = featuredProjectsList.filter((p) => p.id !== project.id);
  const relatedNotes = engineeringNotes.filter(
    (note) => note.relatedProjectSlug === project.id
  );

  const tocSections = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "architecture", label: "Architecture" },
    { id: "workflow", label: "Workflow" },
    { id: "tech-stack", label: "Tech Stack" },
    { id: "ai-ml", label: "AI/ML" },
    { id: "data-flow", label: "Data Flow" },
    { id: "contribution", label: "Contribution" },
    { id: "challenges", label: "Challenges" },
    { id: "results", label: "Results" },
    { id: "demonstration", label: "3D & Media" },
    { id: "limitations", label: "Limitations" },
    { id: "links", label: "Links" },
    { id: "verification", label: "Verification" },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-20 bg-background text-foreground overflow-x-clip">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 min-w-0">
        {/* Top Breadcrumb & Back link */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <Button
            variant="ghost"
            asChild
            className="-ml-3 text-muted-foreground hover:text-foreground"
          >
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Featured Projects
            </Link>
          </Button>
          <span className="text-xs font-mono text-muted-foreground">
            {"Case Study"} {"//"} {project.id}
          </span>
        </div>

        {/* 1. PROJECT HERO */}
        <header id="overview" className="mb-10 space-y-5 scroll-mt-24">
          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-slate-900 text-cyan-300 border border-cyan-500/25">
                {project.category}
              </span>
            )}
            {project.achievement && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30">
                <Trophy className="w-3.5 h-3.5" />
                {project.achievement}
              </span>
            )}
            {project.statusLabel && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                {project.statusLabel}
              </span>
            )}
          </div>

          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-accent font-medium leading-relaxed">
            {project.tagline}
          </p>

          {project.overview && (
            <div className="bg-card/80 p-5 sm:p-6 rounded-2xl border border-white/10 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-primary flex items-center gap-1.5">
                <Compass className="w-4 h-4" /> Executive Overview
              </div>
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                {project.overview}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            {project.githubUrl && project.githubUrl !== "#" && (
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> View Verified Repository
                </a>
              </Button>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <Button variant="outline" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Verified Live Demo
                </a>
              </Button>
            )}
            <Button variant="outline" asChild>
              <a href="#demonstration">
                Jump to Interactive 3D Twin
              </a>
            </Button>
          </div>
        </header>

        {/* SECTION TABLE OF CONTENTS */}
        <nav
          aria-label="Case study section navigation"
          className="mb-12 p-3 rounded-2xl bg-slate-950/75 border border-white/10 backdrop-blur-md"
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 shrink-0">
              Sections:
            </span>
            {tocSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="text-xs font-mono px-2.5 py-1.5 rounded-lg bg-slate-900/80 text-slate-300 border border-white/5 hover:text-cyan-300 hover:border-cyan-500/35 transition-colors whitespace-nowrap shrink-0"
              >
                {sec.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-16">
          {/* 2. PROBLEM STATEMENT */}
          <section id="problem" className="scroll-mt-24 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                2. Problem Statement
              </h2>
              {project.problemSummaryDetail && (
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-white/10">
                  {project.problemSummaryDetail.problemLabel}
                </span>
              )}
            </div>

            <div className="bg-card p-6 rounded-2xl border border-white/10 space-y-4">
              <p className="text-sm md:text-base text-foreground/95 leading-relaxed">
                {project.problemStatement}
              </p>

              {project.problemSummaryDetail && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-3 border-t border-white/10">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-cyan-400">Who Faces It</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.problemSummaryDetail.whoFacesIt}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-amber-400">Existing Limitations</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.problemSummaryDetail.existingLimitations}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1 sm:col-span-2 lg:col-span-1">
                    <div className="text-[10px] font-mono uppercase text-emerald-400">Core Objective</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{project.problemSummaryDetail.objective}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 3. PROPOSED SOLUTION */}
          <section id="solution" className="scroll-mt-24 space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-400 flex items-center gap-2 border-b border-border/50 pb-2">
              <Lightbulb className="w-6 h-6" /> 3. Proposed Solution
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-2xl border border-white/10 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Core Engineering Approach</h3>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                  {project.proposedSolution || project.systemArchitecture}
                </p>
                {project.innovation && (
                  <p className="text-xs md:text-sm text-emerald-300/90 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20 leading-relaxed">
                    <strong>Key Differentiator:</strong> {project.innovation}
                  </p>
                )}
              </div>

              <div className="bg-card p-6 rounded-2xl border border-white/10 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Key Architectural Features</h3>
                <ul className="space-y-2">
                  {project.keyFeatures.map((feature, idx) => (
                    <li key={`${project.id}-feat-${idx}`} className="flex items-start gap-2 text-xs md:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 4. SYSTEM ARCHITECTURE */}
          <section id="architecture" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
              <Layers className="w-6 h-6 text-primary" /> 4. System Architecture
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 border border-white/10 rounded-2xl space-y-2">
                <h3 className="text-base font-bold text-foreground">Architectural Overview</h3>
                <p className="text-foreground/85 leading-relaxed text-sm">
                  {project.systemArchitecture}
                </p>
              </div>
              <div className="bg-card p-6 border border-white/10 rounded-2xl space-y-2">
                <h3 className="text-base font-bold text-foreground">End-to-End Flow Summary</h3>
                <p className="text-cyan-300/90 leading-relaxed font-mono text-xs md:text-sm break-words">
                  {project.dataFlow}
                </p>
              </div>
            </div>

            <ArchitectureDiagram title={project.title} nodes={project.architectureNodes} />
          </section>

          {/* 5. HOW THE SYSTEM WORKS */}
          <section id="workflow" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
              <Cpu className="w-6 h-6 text-cyan-400" /> 5. How the System Works (Step-by-Step)
            </h2>

            {project.workflowSteps && project.workflowSteps.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {project.workflowSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 rounded-2xl bg-card border border-white/10 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          STEP {step.step}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 truncate">
                          {step.component}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{step.title}</h3>
                      <p className="text-xs md:text-sm text-foreground/85 leading-relaxed">
                        {step.whatHappens}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/10 grid grid-cols-1 gap-1.5 text-[11px] font-mono">
                      <div>
                        <span className="text-slate-400">Input: </span>
                        <span className="text-slate-200">{step.input}</span>
                      </div>
                      <div>
                        <span className="text-emerald-400">Output: </span>
                        <span className="text-emerald-200">{step.output}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {project.mlPipeline && project.mlPipeline.length > 0 && (
              <PipelineVisualizer pipeline={project.mlPipeline} />
            )}
          </section>

          {/* 6. TECHNOLOGY STACK */}
          <section id="tech-stack" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold border-b border-border/50 pb-2">
              6. Technology Stack (Categorized)
            </h2>

            {project.groupedTechStack && project.groupedTechStack.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-5">
                {project.groupedTechStack.map((group) => (
                  <div
                    key={group.category}
                    className="bg-card p-5 rounded-2xl border border-white/10 space-y-3"
                  >
                    <div className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                      {group.category}
                    </div>
                    <div className="space-y-3">
                      {group.items.map((tech) => (
                        <div
                          key={tech.name}
                          className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1"
                        >
                          <div className="text-sm font-semibold text-white">{tech.name}</div>
                          <div className="text-xs text-cyan-300/90">Role: {tech.role}</div>
                          <div className="text-xs text-muted-foreground">Why used: {tech.why}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card p-6 rounded-2xl border border-white/10 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1 font-mono text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </section>

          {/* 7. AI/ML MODEL DETAILS */}
          <section id="ai-ml" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
              <Brain className="w-6 h-6 text-purple-400" /> 7. AI / ML Model Details
            </h2>

            {project.aiMlDetails && project.aiMlDetails.length > 0 ? (
              <div className="space-y-4">
                {project.aiMlDetails.map((model) => (
                  <div
                    key={model.modelName}
                    className="bg-card p-6 rounded-2xl border border-white/10 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold text-white">{model.modelName}</h3>
                      <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/25">
                        {model.problemSolved}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
                      <div>
                        <div className="font-mono text-[11px] uppercase text-slate-400 mb-1">Input Features</div>
                        <p className="text-foreground/90 leading-relaxed">{model.inputs}</p>
                      </div>
                      <div>
                        <div className="font-mono text-[11px] uppercase text-slate-400 mb-1">Preprocessing</div>
                        <p className="text-foreground/90 leading-relaxed">{model.preprocessing}</p>
                      </div>
                      <div>
                        <div className="font-mono text-[11px] uppercase text-slate-400 mb-1">Training / Inference Approach</div>
                        <p className="text-foreground/90 leading-relaxed">{model.approach}</p>
                      </div>
                      <div>
                        <div className="font-mono text-[11px] uppercase text-slate-400 mb-1">Prediction Output</div>
                        <p className="text-foreground/90 leading-relaxed">{model.output}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                        <div className="font-mono text-[11px] uppercase text-emerald-400 mb-1">Evaluation Benchmark</div>
                        <p className="text-emerald-100 leading-relaxed">{model.evaluation}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                        <div className="font-mono text-[11px] uppercase text-amber-400 mb-1">Model Limitations</div>
                        <p className="text-amber-100 leading-relaxed">{model.limitations}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card p-6 rounded-2xl border border-white/10 text-sm text-foreground/85 leading-relaxed">
                {project.aiMlSummaryNote ||
                  "Deterministic threshold and systems engineering architecture without supervised predictive model weights."}
              </div>
            )}
          </section>

          {/* 8. DATABASE & DATA FLOW */}
          <section id="data-flow" className="scroll-mt-24 space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
              <Database className="w-6 h-6 text-cyan-400" /> 8. Database &amp; Data Flow
            </h2>

            {project.databaseAndDataFlow && (
              <div className="bg-card p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs md:text-sm">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                    <div className="font-mono text-[10px] uppercase text-cyan-400">Data Sources</div>
                    <p className="text-foreground/90 leading-relaxed">{project.databaseAndDataFlow.sources}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                    <div className="font-mono text-[10px] uppercase text-cyan-400">Storage Engine</div>
                    <p className="text-foreground/90 leading-relaxed">{project.databaseAndDataFlow.storageModel}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                    <div className="font-mono text-[10px] uppercase text-cyan-400">Processing Pipeline</div>
                    <p className="text-foreground/90 leading-relaxed">{project.databaseAndDataFlow.processing}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                    <div className="font-mono text-[10px] uppercase text-cyan-400">API Communication</div>
                    <p className="text-foreground/90 leading-relaxed">{project.databaseAndDataFlow.apiCommunication}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1 sm:col-span-2">
                    <div className="font-mono text-[10px] uppercase text-cyan-400">Retrieval &amp; Visualization</div>
                    <p className="text-foreground/90 leading-relaxed">{project.databaseAndDataFlow.retrieval}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic bg-muted/20 p-3 rounded-lg border border-border/40">
                  <strong>Schema transparency note:</strong> {project.databaseAndDataFlow.schemaNote}
                </p>
              </div>
            )}
          </section>

          {/* 9. INDIVIDUAL CONTRIBUTION */}
          <section id="contribution" className="scroll-mt-24 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-cyan-400" /> 9. Individual Contribution
              </h2>
              {project.teamContribution && (
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Role Focus: {project.teamContribution}
                </span>
              )}
            </div>

            {project.contributionBreakdown ? (
              <div className="grid md:grid-cols-3 gap-5">
                <div className="bg-card p-5 rounded-2xl border border-cyan-500/25 space-y-3">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-2">
                    <UserCheck className="w-4 h-4" /> What I Implemented
                  </h3>
                  <ul className="space-y-2 text-xs md:text-sm text-foreground/90">
                    {project.contributionBreakdown.mine.map((item, i) => (
                      <li key={`mine-${i}`} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card p-5 rounded-2xl border border-white/10 space-y-3">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                    <Users className="w-4 h-4" /> Team &amp; Collaborators
                  </h3>
                  <ul className="space-y-2 text-xs md:text-sm text-foreground/85">
                    {project.contributionBreakdown.team.map((item, i) => (
                      <li key={`team-${i}`} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card p-5 rounded-2xl border border-white/10 space-y-3">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Open-Source &amp; Tooling
                  </h3>
                  <ul className="space-y-2 text-xs md:text-sm text-foreground/85">
                    {project.contributionBreakdown.thirdParty.map((item, i) => (
                      <li key={`tp-${i}`} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </section>

          {/* 10. CHALLENGES & SOLUTIONS + ENGINEERING DECISIONS */}
          <section id="challenges" className="scroll-mt-24 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold border-b border-border/50 pb-2">
              10. Engineering Challenges &amp; Solutions
            </h2>

            {project.technicalChallenges && project.technicalChallenges.length > 0 && (
              <>
                <div className="md:hidden space-y-3">
                  {project.technicalChallenges.map((c) => (
                    <div key={`mob-${c.id}`} className="p-4 rounded-2xl border border-white/10 bg-card space-y-2 text-xs">
                      <div className="font-semibold text-white">{c.challenge}</div>
                      <p className="text-foreground/85">{c.solution}</p>
                      <p className="text-muted-foreground">{c.implementation}</p>
                      <p className="text-emerald-300 font-medium">{c.result}</p>
                    </div>
                  ))}
                </div>
                <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-card">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-slate-950/70 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        <th className="p-4">Challenge</th>
                        <th className="p-4">Solution &amp; Implementation</th>
                        <th className="p-4">Measured Outcome</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-xs md:text-sm">
                      {project.technicalChallenges.map((c) => (
                        <tr key={c.id} className="align-top">
                          <td className="p-4 font-medium text-white">{c.challenge}</td>
                          <td className="p-4 text-foreground/85 space-y-1">
                            <p>{c.solution}</p>
                            <p className="text-xs text-muted-foreground">{c.implementation}</p>
                          </td>
                          <td className="p-4 text-emerald-300 font-medium">{c.result}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <TechnicalChallenges challenges={project.technicalChallenges} />

            {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" /> Engineering Decisions &amp; Trade-offs
                </h3>
                <div className="grid gap-4">
                  {project.engineeringDecisions.map((item, idx) => (
                    <div
                      key={`${project.id}-dec-${idx}`}
                      className="bg-card p-5 rounded-xl border border-white/10 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-base font-semibold text-foreground">{item.decision}</h4>
                        <Badge variant="outline" className="text-[10px] font-mono shrink-0">
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-xs md:text-sm text-foreground/85">
                        <strong className="text-primary">Rationale:</strong> {item.rationale}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        <strong className="text-foreground/80">Trade-off:</strong> {item.tradeoff}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 11. RESULTS & ACHIEVEMENTS */}
          <section id="results" className="scroll-mt-24 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border/50 pb-2">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" /> 11. Results &amp; Evaluation
              </h2>
              {project.achievement && (
                <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/25">
                  {project.achievement}
                </span>
              )}
            </div>

            {project.modelMetrics && project.modelMetrics.length > 0 && (
              <div className="space-y-4">
                {project.metricsContextNote && (
                  <p className="text-xs text-muted-foreground italic bg-muted/20 p-3 rounded-lg border border-border/40">
                    {project.metricsContextNote}
                  </p>
                )}
                <div className="grid md:grid-cols-3 gap-4">
                  {project.modelMetrics.map((m) => (
                    <div
                      key={m.model}
                      className="p-5 rounded-xl bg-card border border-white/10 flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <span className="text-xs font-mono text-primary font-bold uppercase">
                          {m.model}
                        </span>
                        <h3 className="font-semibold text-sm text-foreground mt-0.5">{m.task}</h3>
                        <div className="mt-3 space-y-1">
                          <div className="text-xl font-bold text-foreground">
                            {m.accuracyOrMetric}
                          </div>
                          <div className="text-xs text-accent font-mono">{m.f1OrDetail}</div>
                          <div className="text-xs text-muted-foreground font-mono">
                            Latency: {m.latency}
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground/80 pt-2 border-t border-border/40 leading-snug">
                        {m.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-2xl border border-white/10 space-y-3">
                <h3 className="text-lg font-semibold text-purple-400">Results &amp; Evaluation Notes</h3>
                <ul className="space-y-2 text-foreground/85 text-xs md:text-sm">
                  {project.performanceMetrics.map((item, idx) => (
                    <li key={`${project.id}-perf-${idx}`} className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-white/10 space-y-3">
                <h3 className="text-lg font-semibold text-blue-400">Accessibility Measures</h3>
                <ul className="space-y-2 text-foreground/85 text-xs md:text-sm">
                  {project.accessibilityMeasures.map((item, idx) => (
                    <li key={`${project.id}-a11y-${idx}`} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {project.securityFeatures.length > 0 && (
              <SecurityShowcase features={project.securityFeatures} />
            )}
            {project.devopsPipeline && project.devopsPipeline.length > 0 && (
              <DevopsPipeline pipeline={project.devopsPipeline} />
            )}
          </section>

          {/* 12. SCREENSHOTS & INTERACTIVE 3D DEMONSTRATION */}
          <section id="demonstration" className="scroll-mt-24 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold border-b border-border/50 pb-2">
              12. Interactive 3D Twin &amp; Demonstration Media
            </h2>
            <ProjectDemonstration
              projectId={project.id}
              projectTitle={project.title}
              media={project.media}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          </section>

          {/* 13. LIMITATIONS, LESSONS & FUTURE IMPROVEMENTS */}
          <section id="limitations" className="scroll-mt-24 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
              <Sparkles className="w-6 h-6 text-primary" /> 13. Limitations, Lessons &amp; Future Roadmap
            </h2>

            {project.limitations && project.limitations.length > 0 && (
              <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-2xl space-y-3">
                <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Current Engineering Limitations
                </h3>
                <ul className="space-y-2 text-xs md:text-sm text-foreground/90">
                  {project.limitations.map((lim, i) => (
                    <li key={`lim-${i}`} className="flex items-start gap-2">
                      <span className="text-amber-400 font-mono">!</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-accent/5 border border-accent/20 p-6 rounded-2xl space-y-4">
                <h3 className="text-xl font-bold text-accent">Engineering Lessons</h3>
                <ul className="space-y-3">
                  {project.lessonsLearned.map((lesson, idx) => (
                    <li
                      key={`${project.id}-lesson-${idx}`}
                      className="flex items-start gap-3 text-xs md:text-sm text-foreground/90 leading-relaxed"
                    >
                      <span className="text-accent font-bold font-mono">{idx + 1}.</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.futureImprovements && project.futureImprovements.length > 0 && (
                <div className="bg-card border border-white/10 p-6 rounded-2xl space-y-4">
                  <h3 className="text-xl font-bold text-primary">Planned Future Improvements</h3>
                  <ul className="space-y-3">
                    {project.futureImprovements.map((item, idx) => (
                      <li
                        key={`${project.id}-future-${idx}`}
                        className="flex items-start gap-2.5 text-xs md:text-sm text-foreground/90 leading-relaxed"
                      >
                        <span className="text-primary font-mono">&rarr;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* 14. PROJECT LINKS & RELATED ENGINEERING NOTES */}
          <section id="links" className="scroll-mt-24 space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
              <FileText className="w-6 h-6 text-primary" /> 14. Project Links &amp; Documentation
            </h2>

            <div className="bg-card p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex flex-wrap gap-3">
                {project.githubUrl && project.githubUrl !== "#" && (
                  <Button asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub Repository
                    </a>
                  </Button>
                )}
                {project.liveUrl && project.liveUrl !== "#" ? (
                  <Button variant="outline" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Deployment
                    </a>
                  </Button>
                ) : (
                  <span className="inline-flex items-center px-3 py-2 rounded-lg text-xs font-mono bg-slate-950/60 text-slate-400 border border-white/10">
                    Public live server URL: Not hosted externally (run via source repository)
                  </span>
                )}
              </div>

              {relatedNotes.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Related Engineering Notes
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {relatedNotes.map((note) => (
                      <Link
                        key={note.slug}
                        href={`/notes/${note.slug}/`}
                        className="p-4 rounded-xl bg-slate-950/60 border border-white/10 hover:border-cyan-500/40 transition-colors flex flex-col justify-between gap-2"
                      >
                        <div className="text-sm font-semibold text-white">{note.title}</div>
                        <span className="text-xs font-mono text-cyan-300 flex items-center gap-1">
                          Read Engineering Note <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 15A. CONTENT VERIFICATION CHECKLIST */}
          {project.verificationChecklist && project.verificationChecklist.length > 0 && (
            <section id="verification" className="scroll-mt-24 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" /> Content Verification Checklist
              </h2>
              <div className="md:hidden space-y-2.5">
                {project.verificationChecklist.map((row, idx) => (
                  <div key={`chk-mob-${idx}`} className="p-4 rounded-xl border border-white/10 bg-card space-y-2">
                    <div className="text-xs text-foreground/90">{row.claim}</div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${
                        VERIFICATION_STYLES[row.status]
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-card">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-950/70 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      <th className="p-4">Project Claim / Component</th>
                      <th className="p-4">Verification Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-xs md:text-sm">
                    {project.verificationChecklist.map((row, idx) => (
                      <tr key={`chk-${idx}`}>
                        <td className="p-4 text-foreground/90">{row.claim}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${
                              VERIFICATION_STYLES[row.status]
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 15B. RELATED PROJECTS & PREV/NEXT NAVIGATION */}
          <section className="space-y-6 pt-6 border-t border-white/10">
            <div className="grid sm:grid-cols-2 gap-4">
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.id}/`}
                  className="p-4 rounded-2xl bg-card border border-white/10 hover:border-cyan-500/40 transition-colors flex items-center gap-3"
                >
                  <ArrowLeft className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Previous Project</div>
                    <div className="text-sm font-semibold text-white truncate">{prevProject.title}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextProject && (
                <Link
                  href={`/projects/${nextProject.id}/`}
                  className="p-4 rounded-2xl bg-card border border-white/10 hover:border-cyan-500/40 transition-colors flex items-center justify-end gap-3 text-right"
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Next Project</div>
                    <div className="text-sm font-semibold text-white truncate">{nextProject.title}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-cyan-400 shrink-0" />
                </Link>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Explore Other Case Studies</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedProjects.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/projects/${rel.id}/`}
                    className="p-4 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-cyan-500/40 transition-colors flex flex-col justify-between gap-2"
                  >
                    <div className="space-y-1">
                      {rel.achievement && (
                        <span className="text-[10px] font-mono text-cyan-300 uppercase">
                          {rel.achievement}
                        </span>
                      )}
                      <div className="text-sm font-bold text-white">{rel.title}</div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{rel.tagline}</p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 pt-1">
                      Open Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" asChild>
                  <Link href="/#projects">
                    <ArrowLeft className="mr-2 h-4 w-4" /> All Projects
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/">Back to Portfolio</Link>
                </Button>
              </div>
              <Button asChild>
                <Link href="/#contact">
                  <Mail className="mr-2 h-4 w-4" /> Contact About This Work
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
