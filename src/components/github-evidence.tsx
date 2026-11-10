"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import MotionWrap from "./motion-wrap";
import { Github, GitBranch, Star, Code2, ExternalLink, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const verifiedRepos = [
  {
    id: "repo-igs",
    caseStudySlug: "intelligent-grievance-system",
    name: "intelligent-grievance-system",
    url: "https://github.com/KANISH-850/intelligent-grievance-system",
    description: "AI-powered multilingual grievance categorization and automated department routing with IndicTrans2 and BERT.",
    language: "TypeScript / Python",
    color: "bg-blue-400",
    tags: ["React 19", "FastAPI", "NLP", "PostgreSQL"]
  },
  {
    id: "repo-neeraran",
    caseStudySlug: "aquaguard-ai",
    name: "neeraran (AquaGuard AI)",
    url: "https://github.com/LakshanyaaJ/neeraran",
    description: "Campus water resilience analytics platform: anomaly detection (One-Class SVM), leak detection (XGBoost), demand forecasting (CatBoost).",
    language: "Python",
    color: "bg-emerald-400",
    tags: ["Scikit-learn", "XGBoost", "CatBoost", "FastAPI"]
  },
  {
    id: "repo-digital-twin",
    caseStudySlug: "digital-twin-ehv",
    name: "oceanBerg_sih (Digital Twin EHV)",
    url: "https://github.com/KANISH-850/oceanBerg_sih",
    description: "Smart India Hackathon winning predictive monitoring digital twin for EHV substations evaluated across ~50,000 synthetic and industry-informed SCADA records.",
    language: "Python / React",
    color: "bg-yellow-400",
    tags: ["TensorFlow", "WebSockets", "InfluxDB", "SIH Winner"]
  },
  {
    id: "repo-kiosk",
    caseStudySlug: "kiosk-management-system",
    name: "aazhi (Kiosk Management System)",
    url: "https://github.com/KANISH-850/aazhi",
    description: "CDAC Runner-up fleet orchestration platform with heartbeat telemetry and automated device diagnostics.",
    language: "Python / TypeScript",
    color: "bg-purple-400",
    tags: ["FastAPI", "Docker", "PostgreSQL", "CDAC"]
  }
];

// Deterministic contribution activity grid matrix (avoiding SSR hydration mismatch from Math.random)
const deterministicActivity = [
  [1, 2, 3, 0, 2], [2, 1, 0, 3, 2], [3, 2, 1, 2, 3], [0, 1, 2, 3, 1],
  [2, 3, 2, 1, 2], [1, 2, 3, 2, 0], [3, 1, 2, 3, 2], [2, 0, 1, 2, 3],
  [1, 3, 2, 1, 2], [2, 2, 3, 0, 1], [3, 1, 2, 3, 2], [0, 2, 1, 2, 3],
  [2, 3, 2, 1, 2], [1, 2, 3, 2, 1], [3, 1, 2, 0, 2], [2, 2, 1, 3, 3]
];

export function GithubEvidence() {
  const router = useRouter();

  return (
    <section className="py-20 bg-muted/10 border-y border-border/50" aria-label="Open Source & GitHub Evidence">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wide uppercase border border-emerald-500/20 mb-3">
                Evidence Over Claims
              </div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                Open Source & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Repository Evidence</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl">
                Direct links to verified repositories, technical architectures, and machine learning implementations.
              </p>
            </div>

            <a
              href="https://github.com/KANISH-850"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-foreground hover:text-emerald-400 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>github.com/KANISH-850</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {verifiedRepos.map((repo) => (
              <Card
                key={repo.id}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("a, button")) return;
                  router.push(`/projects/${repo.caseStudySlug}/`);
                }}
                className="min-w-0 p-6 bg-card border-white/5 shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
                    <Link
                      href={`/projects/${repo.caseStudySlug}/`}
                      className="flex items-center gap-2 min-w-0 flex-1 text-base md:text-lg font-bold text-emerald-400 hover:underline"
                    >
                      <Github className="w-4 h-4 shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </Link>
                    <Badge variant="outline" className="text-[10px] font-mono bg-background shrink-0">
                      Verified
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 min-h-[40px]">
                    {repo.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-border/40">
                  <div className="flex flex-wrap gap-1.5">
                    {repo.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted/40 text-muted-foreground border border-border/30">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground font-mono pt-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${repo.color}`} />
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/projects/${repo.caseStudySlug}/`}
                        className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Case Study <ArrowRight className="w-3 h-3" />
                      </Link>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Inspect Code <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Top Languages & Contribution Snapshot */}
          <div className="mt-8 p-6 rounded-2xl bg-card border border-white/5 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
                <Code2 className="text-emerald-400 w-4 h-4" /> Primary Engineering Languages
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                Python (FastAPI, PyTorch, Scikit-learn), TypeScript, React, SQL
              </p>
            </div>

            {/* Static, deterministic activity matrix representation */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end gap-2 max-w-full opacity-90" aria-hidden="true">
              <span className="text-[10px] font-mono text-muted-foreground">Activity (Illustrative)</span>
              <div className="flex gap-1 overflow-x-hidden max-w-full">
                {deterministicActivity.map((col, colIdx) => (
                  <div key={`col-${colIdx}`} className="flex flex-col gap-1">
                    {col.map((intensity, rowIdx) => {
                      const bg =
                        intensity === 3 ? "bg-emerald-500" :
                        intensity === 2 ? "bg-emerald-700" :
                        intensity === 1 ? "bg-emerald-900/60" : "bg-muted/40";
                      return <div key={`cell-${colIdx}-${rowIdx}`} className={`w-2.5 h-2.5 rounded-sm ${bg}`} />;
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
