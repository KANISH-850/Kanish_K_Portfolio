"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import MotionWrap from "./motion-wrap";
import { Github, GitBranch, Code2, ExternalLink, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const verifiedRepos = [
  {
    id: "repo-digital-twin",
    caseStudySlug: "digital-twin-ehv",
    name: "oceanBerg_sih (Digital Twin EHV)",
    url: "https://github.com/KANISH-850/oceanBerg_sih",
    roleLabel: "Team Lead / Core AI Contributor (SIH '25)",
    description: "Smart India Hackathon winning EHV substation monitoring prototype using Random Forest, Isolation Forest, and CNN-LSTM models with Streamlit & ReportLab alerts.",
    language: "Python",
    color: "bg-yellow-400",
    tags: ["Scikit-learn", "TensorFlow", "Streamlit", "SIH Winner"]
  },
  {
    id: "repo-kiosk",
    caseStudySlug: "kiosk-management-system",
    name: "aazhi (Kiosk Management System)",
    url: "https://github.com/KANISH-850/aazhi",
    roleLabel: "Voice, Kiosk UI & Integration (C-DAC Fork)",
    description: "C-DAC SUVIDHA Runner-up civic utility & grievance kiosk platform combining React/Vite portals, Aria voice navigation, Express (pg + Redis), FastAPI ML routing, and k6.",
    language: "TypeScript / Python",
    color: "bg-purple-400",
    tags: ["Express / pg", "Redis", "FastAPI", "React"]
  },
  {
    id: "repo-techspire",
    caseStudySlug: "techspire",
    name: "techspire (AI Hospital HMS)",
    url: "https://github.com/KANISH-850/techspire",
    roleLabel: "Primary Author & Integrator",
    description: "4-container HMS unifying 14 SQLAlchemy clinical models, PostgreSQL 16, local Ollama RAG (qwen3:4b + ChromaDB), RandomForest forecasts & PDF/Excel reports.",
    language: "Python / TypeScript",
    color: "bg-emerald-400",
    tags: ["FastAPI", "Ollama RAG", "PostgreSQL", "Docker"]
  },
  {
    id: "repo-igs",
    caseStudySlug: "intelligent-grievance-system",
    name: "intelligent-grievance-system",
    url: "https://github.com/KANISH-850/intelligent-grievance-system",
    roleLabel: "Primary Author",
    description: "Multilingual civic grievance framework pairing TF-IDF + LogisticRegression routing, PyTorch MobileNetV3-Small civic vision (eval benchmarked), and translation APIs.",
    language: "TypeScript / Python",
    color: "bg-blue-400",
    tags: ["FastAPI", "PyTorch", "PostgreSQL", "React"]
  },
  {
    id: "repo-neeraran",
    caseStudySlug: "aquaguard-ai",
    name: "neeraran (AquaGuard AI)",
    url: "https://github.com/LakshanyaaJ/neeraran",
    roleLabel: "ML Audit & Sensor Health (kanish branch)",
    description: "Water resilience team repo; authored ML audit benchmarking One-Class SVM (0.7451 F1, 3.92ms) & XGBoost (100% leak recall, 2.29ms) plus sensor-health suite.",
    language: "Python / TypeScript",
    color: "bg-cyan-400",
    tags: ["One-Class SVM", "XGBoost", "FastAPI", "Team Repo"]
  },
  {
    id: "repo-webscraper",
    caseStudySlug: "webscraper",
    name: "webscraper (HealScrape AI)",
    url: "https://github.com/KANISH-850/webscraper",
    roleLabel: "Co-Author (Ingestion & Scraper Engine)",
    description: "Self-healing web extraction engine combining Bright Data & Cheerio with Groq-assisted selector repair and Prisma/SQLite persistence.",
    language: "TypeScript",
    color: "bg-sky-400",
    tags: ["Express 5", "Prisma", "Cheerio", "Bright Data"]
  },
  {
    id: "repo-vikshana",
    caseStudySlug: "vikshana",
    name: "Vikshana (Crime Intelligence AI)",
    url: "https://github.com/KANISH-850/Vikshana",
    roleLabel: "Supporting Team Project (Datathon)",
    description: "Collaborative datathon platform on Zoho Catalyst over KSP relational tables; contributed casefile & package setup alongside teammates' UI/ML modules.",
    language: "JavaScript / Node.js",
    color: "bg-indigo-400",
    tags: ["Zoho Catalyst", "Node.js", "Collaboration"]
  }
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
                      {repo.roleLabel}
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

          {/* Top Languages & Public Profile Bar */}
          <div className="mt-8 p-6 rounded-2xl bg-card border border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
                <Code2 className="text-emerald-400 w-4 h-4" /> Core Engineering Stack Across Repositories
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                Python (FastAPI, PyTorch, Scikit-learn, XGBoost), TypeScript, React / Next.js, PostgreSQL
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/KANISH-850?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 hover:bg-emerald-500/20 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" /> Browse All Repositories
              </a>
              <a
                href="https://leetcode.com/u/Kanish_k_2004/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/50 text-xs font-mono text-foreground hover:border-primary/40 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> LeetCode Profile
              </a>
            </div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
