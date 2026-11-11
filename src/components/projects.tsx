"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  Trophy,
  Award,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import MotionWrap from "./motion-wrap";
import { projectsData } from "@/data/projects";
import { ProjectScenePreview } from "./project-demonstration";

// 3D Tilt Card Container component with full-card navigation guard
function TiltProjectCard({
  children,
  className = "",
  onNavigate,
}: {
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -3;
    const rY = ((x - centerX) / centerX) * 3;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onNavigate) return;
    const target = e.target as HTMLElement;
    if (target.closest("a, button, [data-interactive-3d]")) return;
    onNavigate();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={`preserve-3d ${className}`}
    >
      {children}
    </div>
  );
}

export function Projects() {
  const router = useRouter();
  const [domainFilter, setDomainFilter] = useState<"all" | "ai-ml" | "systems">("all");
  const sihProject = projectsData["digital-twin-ehv"];
  const cdacProject = projectsData["kiosk-management-system"];

  const navigateToProject = (slug: string) => {
    router.push(`/projects/${slug}/`);
  };

  const appliedSystems = [
    { project: projectsData["intelligent-grievance-system"], domain: "ai-ml" as const },
    { project: projectsData["aquaguard-ai"], domain: "ai-ml" as const },
    { project: projectsData["vikshana"], domain: "ai-ml" as const },
    { project: projectsData["techspire"], domain: "ai-ml" as const },
    { project: projectsData["hackzen"], domain: "ai-ml" as const },
    { project: projectsData["webscraper"], domain: "systems" as const },
  ].filter((item) => Boolean(item.project));

  const filteredApplied = appliedSystems.filter(
    (item) => domainFilter === "all" || item.domain === domainFilter
  );

  const showMajor = (id: string) => {
    if (domainFilter === "all") return true;
    if (domainFilter === "ai-ml") return id === "digital-twin-ehv";
    return id === "kiosk-management-system" || id === "digital-twin-ehv";
  };

  const majorProjects = [
    {
      data: sihProject,
      badgeText: "Smart India Hackathon Winner",
      badgeIcon: Trophy,
      badgeColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
      accentGlow: "from-cyan-500/20 via-primary/10 to-transparent",
      accentBorder: "hover:border-cyan-400/50",
      number: "01",
      previewComponent: <ProjectScenePreview projectId="digital-twin-ehv" />,
      summaryDesc:
        "An intelligent digital twin platform for monitoring and analyzing Extra High Voltage electrical substations.",
    },
    {
      data: cdacProject,
      badgeText: "CDAC Project Competition Runner-up",
      badgeIcon: Award,
      badgeColor: "text-purple-400 border-purple-400/30 bg-purple-400/10",
      accentGlow: "from-purple-500/20 via-accent/10 to-transparent",
      accentBorder: "hover:border-purple-400/50",
      number: "02",
      previewComponent: <ProjectScenePreview projectId="kiosk-management-system" />,
      summaryDesc:
        "A smart kiosk management solution developed as part of the CDAC project competition.",
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 md:py-36 relative bg-[#030712] border-t border-white/[0.06] overflow-hidden"
      aria-label="Featured Projects - 3D Project Showcase"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              02 // Featured 3D Showcase
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Eight Flagship{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                AI &amp; Systems Projects
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Interactive 3D visualizations and verified architectural case studies spanning power-grid digital twins, multilingual NLP, vision safety, healthcare RAG, and self-healing pipelines.
            </p>

            {/* Domain Filter Bar */}
            <div
              role="group"
              aria-label="Filter flagship projects by domain"
              className="flex flex-wrap items-center justify-center gap-2 pt-2"
            >
              {[
                { key: "all", label: "All Flagship (8)" },
                { key: "ai-ml", label: "Applied AI & ML" },
                { key: "systems", label: "Systems, IoT & Automation" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setDomainFilter(tab.key as "all" | "ai-ml" | "systems")}
                  aria-pressed={domainFilter === tab.key}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono border transition-colors ${
                    domainFilter === tab.key
                      ? "bg-primary text-slate-950 border-primary font-bold"
                      : "glass-panel text-slate-300 border-white/10 hover:border-cyan-400/40 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards (Top Award-Winning Systems) */}
          <div className="space-y-16">
            {majorProjects
              .filter(({ data }) => data && showMajor(data.id))
              .map(({ data, badgeText, badgeIcon: BadgeIcon, badgeColor, accentBorder, number, previewComponent, summaryDesc }) => {
              if (!data) return null;

              return (
                <TiltProjectCard
                  key={data.id}
                  onNavigate={() => navigateToProject(data.id)}
                  className={`cursor-pointer min-w-0 max-w-full rounded-3xl border border-white/10 glass-panel overflow-hidden shadow-2xl transition-all duration-300 ${accentBorder}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-w-0">
                    {/* Left Column: Project Overview & Specs */}
                    <div className="lg:col-span-7 min-w-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-xs font-mono text-slate-400 font-bold bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/5">
                            PROJECT {number}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}`}
                          >
                            <BadgeIcon className="w-3.5 h-3.5" />
                            {badgeText}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h3 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                            <Link href={`/projects/${data.id}/`} className="hover:text-cyan-300 transition-colors">
                              {data.title}
                            </Link>
                          </h3>
                          <p className="text-sm sm:text-base text-cyan-400 font-medium mt-1">
                            {data.tagline}
                          </p>
                        </div>

                        {/* Prompt-mandated Summary Description */}
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                          {summaryDesc}
                        </p>

                        {/* Problem & Architectural Solution */}
                        <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.08] text-xs sm:text-sm text-slate-400 leading-relaxed space-y-2">
                          <span className="text-slate-300 font-semibold block text-xs uppercase tracking-wider">
                            System Architecture
                          </span>
                          <p>{data.systemArchitecture}</p>
                        </div>

                        {/* Key Architectural Highlights */}
                        <div className="space-y-2 pt-1">
                          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                            Key Capabilities
                          </span>
                          <ul className="space-y-1.5">
                            {data.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                              <li
                                key={`${data.id}-f-${fIdx}`}
                                className="flex items-start gap-2 text-xs sm:text-sm text-slate-300"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technology Stack Labels */}
                        <div className="pt-2">
                          <div className="flex flex-wrap gap-1.5">
                            {data.technologies.map((tech) => (
                              <Badge
                                key={`${data.id}-${tech}`}
                                variant="secondary"
                                className="glass-panel text-slate-200 text-xs font-mono px-3 py-1 rounded-lg border border-white/10 hover:border-primary/40 transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons: Case Study Navigation & GitHub */}
                      <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/[0.08]">
                        <Button
                          size="lg"
                          className="bg-primary text-slate-950 hover:bg-cyan-300 font-bold px-6 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all group/btn"
                          asChild
                        >
                          <Link href={`/projects/${data.id}/`}>
                            Explore System Case Study
                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>

                        {data.githubUrl ? (
                          <Button
                            size="lg"
                            variant="outline"
                            className="glass-panel text-white font-semibold rounded-xl border-white/20 hover:border-primary/50 hover:bg-white/[0.08]"
                            asChild
                          >
                            <a
                              href={data.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 w-4 h-4 text-primary" />
                              GitHub Repo
                            </a>
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            variant="outline"
                            className="glass-panel text-white font-semibold rounded-xl border-white/20 hover:border-primary/50 hover:bg-white/[0.08]"
                            asChild
                          >
                            <a
                              href="https://github.com/KANISH-850"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 w-4 h-4 text-primary" />
                              GitHub Profile
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Interactive 3D Telemetry Preview */}
                    <div className="lg:col-span-5 min-w-0 p-6 sm:p-8 flex flex-col justify-center bg-slate-950/40">
                      {previewComponent}
                    </div>
                  </div>
                </TiltProjectCard>
              );
            })}
          </div>

          {/* Additional AI Engineering Systems */}
          <div className="mt-16 space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Applied AI, Data &amp; Full-Stack Systems (Projects 03&ndash;08)
              </h3>
              <span className="text-xs font-mono text-slate-400">
                NLP &bull; Water ML &bull; Investigation AI &bull; Hospital RAG &bull; Vision Safety &bull; Self-Healing Scraper
              </span>
            </div>

            <div className="space-y-10">
              {filteredApplied.map(({ project: proj }, idx) => (
                  <div
                    key={proj.id}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.closest("a, button, [data-interactive-3d]")) return;
                      navigateToProject(proj.id);
                    }}
                    className="cursor-pointer min-w-0 max-w-full glass-panel rounded-3xl border border-white/10 hover:border-primary/50 transition-all overflow-hidden shadow-xl"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-w-0">
                      <div className="lg:col-span-6 min-w-0 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                              {`PROJECT 0${idx + 3} // SYSTEM CASE STUDY`}
                            </span>
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>Source</span>
                              </a>
                            )}
                          </div>
                          <h4 className="font-headline text-2xl sm:text-3xl font-bold text-white">
                            <Link href={`/projects/${proj.id}/`} className="hover:text-cyan-300 transition-colors">
                              {proj.title}
                            </Link>
                          </h4>
                          <p className="text-xs sm:text-sm text-cyan-300 font-mono">
                            {proj.tagline}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {proj.overview || proj.problemStatement}
                          </p>
                          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.08] text-xs text-slate-400 leading-relaxed space-y-1">
                            <span className="text-slate-300 font-semibold block text-[11px] uppercase tracking-wider">
                              Architecture Summary
                            </span>
                            <p className="line-clamp-3">{proj.systemArchitecture}</p>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                          <div className="flex flex-wrap gap-1.5">
                            {proj.technologies.slice(0, 6).map((tech) => (
                              <Badge
                                key={`${proj.id}-${tech}`}
                                variant="secondary"
                                className="glass-panel text-slate-300 text-[11px] font-mono px-2.5 py-0.5 border border-white/10"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto glass-panel text-white border-white/20 hover:border-primary/50 hover:text-cyan-400 font-mono text-xs"
                            asChild
                          >
                            <Link href={`/projects/${proj.id}/`}>
                              Explore Full Case Study
                              <ArrowRight className="ml-2 w-3.5 h-3.5" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <div className="lg:col-span-6 min-w-0 p-6 sm:p-8 flex flex-col justify-center bg-slate-950/40">
                        <ProjectScenePreview projectId={proj.id} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
