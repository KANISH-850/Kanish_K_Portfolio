"use client";

import MotionWrap from "./motion-wrap";
import {
  Trophy,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Building2,
  FileCheck,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface VerifiedAchievement {
  id: string;
  badge: string;
  year: string;
  title: string;
  organization: string;
  projectTitle: string;
  projectSlug: string;
  description: string;
  highlights: string[];
  badgeColor: string;
}

const verifiedAchievements: VerifiedAchievement[] = [
  {
    id: "sih-winner",
    badge: "1st Place National Winner",
    year: "2025",
    title: "Smart India Hackathon (SIH)",
    organization: "Ministry of Education & AICTE, Government of India",
    projectTitle: "Digital Twin of EHV Substation Monitoring",
    projectSlug: "digital-twin-ehv",
    description:
      "Awarded 1st place in the national grand finale (Team Oceanberg) for building an EHV substation monitoring prototype combining Random Forest, Isolation Forest, and CNN-LSTM fault classifiers with a real-time Streamlit & PDF alerting pipeline.",
    highlights: [
      "Per-component ML telemetry diagnostics across transformers, busbars, and circuit breakers",
      "Evaluated on simulated operational SCADA CSV splits with automated ReportLab PDF alerts",
      "Paired on this portfolio with an interactive Three.js 3D substation visualization demo",
    ],
    badgeColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  },
  {
    id: "cdac-runnerup",
    badge: "National Runner-up",
    year: "2024",
    title: "C-DAC Innovation Challenge (SUVIDHA)",
    organization: "Centre for Development of Advanced Computing (C-DAC)",
    projectTitle: "Kiosk Management System (AAZHI)",
    projectSlug: "kiosk-management-system",
    description:
      "Recognized as National Runner-up for engineering a multilingual civic utility billing & grievance self-service kiosk platform pairing React citizen/admin portals, Aria voice navigation, Express/PostgreSQL/Redis APIs, and a FastAPI ML routing & duplicate-detection service.",
    highlights: [
      "React 19 kiosk & React 18 admin portals, Express (pg + Redis/BullMQ) API, and FastAPI AI microservice",
      "TF-IDF cosine duplicate detection, LinearSVC/IsolationForest spam screening & RandomForest volume forecasting",
      "11+ regional languages with Aria voice routing, Razorpay utility billing, SHA-256 audit chain & k6 load suite",
    ],
    badgeColor: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  },
];

export function Achievements() {
  return (
    <section
      id="achievements"
      className="py-24 md:py-36 relative bg-[#030712] border-t border-white/[0.06] overflow-hidden"
      aria-label="Verified Achievements & Awards"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              04 // Competitive Honors
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Verified{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                National Achievements
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Grand finale victories evaluated by industry technical panels,
              government research agencies, and academic authorities.
            </p>
          </div>

          {/* Achievements Grid with 3D Depth */}
          <div className="grid md:grid-cols-2 gap-8 min-w-0">
            {verifiedAchievements.map((ach) => (
              <div
                key={ach.id}
                className="min-w-0 glass-panel p-5 sm:p-8 rounded-3xl border border-white/10 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(0,240,255,0.15)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  {/* Badge & Year */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold border ${ach.badgeColor}`}
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      {ach.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1 bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/5">
                      <Calendar className="w-3.5 h-3.5" /> {ach.year}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {ach.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {ach.organization}
                    </p>
                  </div>

                  {/* Winning System Pill */}
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.08] text-xs font-mono">
                    <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                      Winning System Architecture
                    </span>
                    <span className="text-cyan-300 font-semibold text-sm">
                      {ach.projectTitle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {ach.description}
                  </p>

                  {/* Verified Highlights */}
                  <ul className="space-y-2 pt-3 border-t border-white/[0.08]">
                    {ach.highlights.map((item, idx) => (
                      <li
                        key={`${ach.id}-h-${idx}`}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link */}
                <div className="pt-6 mt-6 border-t border-white/[0.08]">
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="w-full justify-between glass-panel text-white font-semibold rounded-xl border-white/20 hover:border-primary/50 hover:bg-primary hover:text-slate-950 group/btn transition-all"
                  >
                    <Link href={`/projects/${ach.projectSlug}/`}>
                      <span>Explore Verified Case Study</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
