"use client";

import MotionWrap from "./motion-wrap";
import {
  BrainCircuit,
  Cpu,
  Code2,
  CheckCircle2,
  Binary,
  Layers,
  Sparkles,
  GraduationCap,
} from "lucide-react";

export function About() {
  const technicalPillars = [
    {
      name: "Applied Machine Learning",
      desc: "Building anomaly detection and classification models with Scikit-learn (One-Class SVM, Isolation Forest, Random Forest) and XGBoost.",
      icon: Cpu,
      color: "text-primary",
    },
    {
      name: "Deep Learning & Computer Vision",
      desc: "Training MobileNetV3 transfer-learning image classifiers in PyTorch and CNN-LSTM fault models in TensorFlow/Keras with held-out evaluation splits.",
      icon: Layers,
      color: "text-purple-400",
    },
    {
      name: "Multilingual NLP & Local RAG",
      desc: "Implementing TF-IDF + LogisticRegression text routing, multilingual translation workflows, and local Ollama (qwen3:4b) + ChromaDB document retrieval.",
      icon: Binary,
      color: "text-emerald-400",
    },
    {
      name: "Backend & API Systems",
      desc: "Engineering modular FastAPI and Node.js/Express REST services with Alembic/Prisma migrations, JWT authentication, and Docker Compose.",
      icon: Code2,
      color: "text-amber-400",
    },
    {
      name: "AI Auditing & Calibration",
      desc: "Evaluating leakage, F1/recall tradeoffs on imbalanced datasets, confidence threshold routing gates, and human-in-the-loop review queues.",
      icon: BrainCircuit,
      color: "text-cyan-400",
    },
    {
      name: "Generative AI Workflows",
      desc: "Applying structured LLM extraction and retrieval pipelines paired with deterministic fallback logic when external model calls are offline.",
      icon: Sparkles,
      color: "text-pink-400",
    },
  ];

  const verifiedStats = [
    {
      value: "7.73 / 10",
      label: "B.E. CSE CGPA",
      detail: "BITSathy • Class of 2028",
    },
    {
      value: "1st Place",
      label: "Smart India Hackathon",
      detail: "Grand Finale Winner (2025)",
    },
    {
      value: "Runner-up",
      label: "C-DAC Innovation",
      detail: "SUVIDHA Kiosk Challenge (2024)",
    },
    {
      value: "7 Repos",
      label: "Verified Codebases",
      detail: "AI/ML, Full-Stack & Data Systems",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 relative bg-[#030712] border-t border-white/[0.06] overflow-hidden"
      aria-label="About Me - Technical Identity"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              01 // Academic &amp; Technical Identity
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Applied{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                AI &amp; Backend Engineering
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              3rd-year B.E. Computer Science student connecting machine learning
              evaluation with FastAPI, Express, and PostgreSQL application engineering.
            </p>
          </div>

          {/* Main Grid: Narrative + Structured Profile Card */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Editorial Technical Profile */}
            <div className="lg:col-span-7 space-y-5">
              <div className="prose prose-invert max-w-none space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
                <p>
                  I am a <strong className="text-white font-semibold">3rd-year B.E. Computer Science student</strong>{" "}
                  at Bannari Amman Institute of Technology (graduating <strong className="text-white font-semibold">2028</strong>),
                  focused on building practical AI/ML and full-stack software systems.
                  Rather than stopping at standalone notebooks, I integrate trained models into{" "}
                  <span className="text-cyan-400 font-medium">FastAPI services</span>,{" "}
                  <span className="text-primary font-medium">relational data models</span>, and{" "}
                  <span className="text-purple-400 font-medium">inspectable web interfaces</span>.
                </p>

                <p className="text-slate-400 text-sm sm:text-base">
                  My technical focus spans{" "}
                  <strong className="text-white font-medium">Python, Java, C++, C, JavaScript, and SQL</strong>,
                  applied across supervised/unsupervised ML, PyTorch computer vision, local Ollama RAG workflows,
                  and backend APIs while actively strengthening{" "}
                  <strong className="text-white font-medium">DSA, OOP, DBMS, OS, and Computer Networks</strong>.
                </p>
              </div>

              {/* Technical Identity Focus Badges */}
              <div className="pt-1 flex flex-wrap gap-2">
                {[
                  "Python & FastAPI",
                  "Scikit-learn & XGBoost",
                  "PyTorch & TensorFlow",
                  "Local RAG (Ollama + ChromaDB)",
                  "PostgreSQL & Prisma",
                  "React / TypeScript",
                  "DSA & Core CS",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="glass-panel text-xs font-mono text-slate-200 px-3 py-1.5 rounded-lg border border-white/10 hover:border-primary/40 transition-colors"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Concise Recruiter Identity Snapshot */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Engineering Profile</h3>
                      <p className="text-xs font-mono text-slate-400">Coimbatore, Tamil Nadu</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Class of 2028
                  </span>
                </div>

                <dl className="space-y-3 text-xs sm:text-sm font-mono">
                  <div className="flex justify-between gap-4 border-b border-white/[0.05] pb-2">
                    <dt className="text-slate-400">Degree</dt>
                    <dd className="text-white text-right">B.E. CSE (2024–2028)</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/[0.05] pb-2">
                    <dt className="text-slate-400">Institution</dt>
                    <dd className="text-white text-right">BITSathy, Sathyamangalam</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/[0.05] pb-2">
                    <dt className="text-slate-400">CGPA</dt>
                    <dd className="text-cyan-300 font-bold text-right">7.73 / 10</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/[0.05] pb-2">
                    <dt className="text-slate-400">Target Roles</dt>
                    <dd className="text-slate-200 text-right">AI/ML Intern &bull; SWE Intern</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Hackathons</dt>
                    <dd className="text-amber-300 text-right">SIH &apos;25 Winner &bull; C-DAC Runner-up</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Core Technical Pillars Grid */}
          <div className="mt-14 pt-12 border-t border-white/[0.08]">
            <div className="text-center mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Core Engineering Areas
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Technical domains directly exercised across my open-source repositories.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {technicalPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.name}
                    className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.12)] transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                          <Icon className={`w-5 h-5 ${pillar.color}`} />
                        </div>
                        <h4 className="font-bold text-base text-white group-hover:text-primary transition-colors">
                          {pillar.name}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Applied in Projects</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verified Credentials & Highlights */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {verifiedStats.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel p-5 rounded-2xl border border-white/10 text-center hover:border-primary/40 transition-colors"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-primary to-accent font-headline">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
