"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  Trophy,
  Award,
  Cpu,
  Activity,
  Layers,
  CheckCircle2,
  Zap,
  Server,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import MotionWrap from "./motion-wrap";
import { projectsData } from "@/data/projects";

// Telemetry visualizer for Digital Twin EHV
function DigitalTwin3DPreview() {
  return (
    <div className="relative w-full h-full min-h-[320px] bg-gradient-to-br from-slate-950 via-[#070e1d] to-[#041226] p-6 flex flex-col justify-between overflow-hidden border border-cyan-500/20 rounded-2xl group">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
            SCADA Telemetry Stream
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-300 bg-white/[0.05] px-2.5 py-0.5 rounded border border-white/10">
          50,000 Records
        </span>
      </div>

      {/* Middle: Live Anomaly Scoring Gauges */}
      <div className="relative z-10 space-y-3.5 my-3">
        {/* Autoencoder Inference Gauge */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Autoencoder Inference Latency</span>
            <span className="text-emerald-400 font-bold">&lt; 50ms</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-[94%] animate-pulse" />
          </div>
        </div>

        {/* Live Substation Sensor Metrics */}
        <div className="grid grid-cols-2 gap-2.5 text-[11px] font-mono">
          <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase">
              Anomaly Accuracy
            </span>
            <span className="text-white font-bold text-sm text-cyan-300">
              94.0%
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Semi-Supervised
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase">
              Rendering Loop
            </span>
            <span className="text-white font-bold text-sm text-emerald-400">
              60 FPS
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Decoupled Worker
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Protocol Footer */}
      <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/[0.08]">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Activity className="w-3.5 h-3.5" /> MQTT &bull; InfluxDB &bull; WSS
        </span>
        <span className="text-[11px] text-slate-400">EHV Substation Twin</span>
      </div>
    </div>
  );
}

// Telemetry visualizer for Kiosk Management System
function KioskManagement3DPreview() {
  return (
    <div className="relative w-full h-full min-h-[320px] bg-gradient-to-br from-slate-950 via-[#100b1e] to-[#080516] p-6 flex flex-col justify-between overflow-hidden border border-purple-500/20 rounded-2xl group">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
          </span>
          <span className="text-xs font-mono font-semibold tracking-wider text-purple-400 uppercase">
            Fleet Telemetry Engine
          </span>
        </div>
        <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
          CDAC Runner-up
        </span>
      </div>

      {/* Middle: Active Fleet Diagnostics */}
      <div className="relative z-10 space-y-3.5 my-3">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Kiosk Daemon Heartbeat</span>
            <span className="text-emerald-400 font-bold">Synchronized</span>
          </div>
          <p className="text-[11px] text-slate-300 font-mono">
            Automated peripheral diagnostics, crash telemetry, and remote status evaluation.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 text-[11px] font-mono">
          <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase">
              Tunnel Architecture
            </span>
            <span className="text-white font-bold text-sm text-purple-300">
              Reverse WSS
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Zero Ingress Ports
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase">
              Offline Resilience
            </span>
            <span className="text-white font-bold text-sm text-emerald-400">
              SQLite Buffer
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Zero Diagnostic Loss
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Protocol Footer */}
      <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono pt-3 border-t border-white/[0.08]">
        <span className="flex items-center gap-1.5 text-purple-400">
          <Server className="w-3.5 h-3.5" /> FastAPI &bull; PostgreSQL &bull; Docker
        </span>
        <span className="text-[11px] text-slate-400">Fleet Control Portal</span>
      </div>
    </div>
  );
}

// 3D Tilt Card Container component
function TiltProjectCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
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

    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
  // STRICTLY showcase ONLY the two major projects specified in the prompt:
  // 1. Digital Twin of EHV Substation Monitoring (SIH Winner)
  // 2. Kiosk Management System (CDAC Runner-up)
  const sihProject = projectsData["digital-twin-ehv"];
  const cdacProject = projectsData["kiosk-management-system"];

  const majorProjects = [
    {
      data: sihProject,
      badgeText: "Smart India Hackathon Winner",
      badgeIcon: Trophy,
      badgeColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
      accentGlow: "from-cyan-500/20 via-primary/10 to-transparent",
      accentBorder: "hover:border-cyan-400/50",
      number: "01",
      previewComponent: <DigitalTwin3DPreview />,
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
      previewComponent: <KioskManagement3DPreview />,
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
              Flagship{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                AI Engineering Projects
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Showcasing verified national hackathon triumphs with full-stack
              telemetry, predictive anomaly modeling, and edge device orchestration.
            </p>
          </div>

          {/* Project Cards (Showcase ONLY 2 Major Projects) */}
          <div className="space-y-16">
            {majorProjects.map(({ data, badgeText, badgeIcon: BadgeIcon, badgeColor, accentBorder, number, previewComponent, summaryDesc }) => {
              if (!data) return null;

              return (
                <TiltProjectCard
                  key={data.id}
                  className={`rounded-3xl border border-white/10 glass-panel overflow-hidden shadow-2xl transition-all duration-300 ${accentBorder}`}
                >
                  <div className="grid lg:grid-cols-12 gap-0">
                    {/* Left Column: Project Overview & Specs */}
                    <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
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
                            {data.title}
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
                          <Link href={`/projects/${data.id}`}>
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
                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center bg-slate-950/40">
                      {previewComponent}
                    </div>
                  </div>
                </TiltProjectCard>
              );
            })}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
