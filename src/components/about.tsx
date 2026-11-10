"use client";

import dynamic from "next/dynamic";
import MotionWrap from "./motion-wrap";
import {
  BrainCircuit,
  Cpu,
  Database,
  Code2,
  CheckCircle2,
  Binary,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

const About3DTensor = dynamic(
  () => import("./about-3d-tensor").then((mod) => mod.About3DTensor),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[320px] md:h-[380px] rounded-2xl glass-panel border border-white/10 animate-pulse bg-slate-950/60" />
    ),
  }
);

export function About() {
  const technicalPillars = [
    {
      name: "Artificial Intelligence",
      desc: "Architecting end-to-end intelligent systems that convert raw sensory signals and unstructured datasets into actionable operational intelligence.",
      icon: BrainCircuit,
      color: "text-cyan-400",
    },
    {
      name: "Machine Learning",
      desc: "Developing gradient boosted trees (XGBoost, CatBoost), One-Class SVMs, and supervised/unsupervised statistical learning pipelines.",
      icon: Cpu,
      color: "text-primary",
    },
    {
      name: "Deep Learning",
      desc: "Training semi-supervised deep autoencoders and neural networks with PyTorch and TensorFlow for high-precision anomaly scoring.",
      icon: Layers,
      color: "text-purple-400",
    },
    {
      name: "Generative AI",
      desc: "Implementing foundation model integration, prompt architectures, and structured LLM workflows.",
      icon: Sparkles,
      color: "text-pink-400",
    },
    {
      name: "Natural Language Processing",
      desc: "Deploying quantized IndicTrans2 neural translation, BERT classifiers, and 768-dimensional Sentence Transformer embeddings.",
      icon: Binary,
      color: "text-emerald-400",
    },
    {
      name: "Python & Systems Engineering",
      desc: "Writing high-performance asynchronous Python (FastAPI, NumPy, Pandas) paired with TypeScript, WebSockets, and distributed microservices.",
      icon: Code2,
      color: "text-amber-400",
    },
  ];

  const verifiedStats = [
    {
      value: "50,000+",
      label: "Synthetic SCADA Records",
      detail: "Evaluated in EHV Digital Twin",
    },
    {
      value: "~50ms",
      label: "Target Anomaly Latency",
      detail: "Internal Benchmark Target",
    },
    {
      value: "1st Place",
      label: "Smart India Hackathon",
      detail: "Grand Finale National Winner",
    },
    {
      value: "Runner-up",
      label: "CDAC Innovation",
      detail: "National Kiosk Management Challenge",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 relative bg-[#030712] border-t border-white/[0.06] overflow-hidden"
      aria-label="About Me - Technical Identity"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              01 // Technical Identity
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Engineering at the Core of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                Artificial Intelligence
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Bridging the gap between mathematical model formulation and
              production-grade full-stack software architectures.
            </p>
          </div>

          {/* Main Grid: Narrative + 3D Tensor Visualizer */}
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Editorial Technical Profile */}
            <div className="lg:col-span-7 space-y-6">
              <div className="prose prose-invert max-w-none space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
                <p>
                  I am an <strong className="text-white font-semibold">AI Engineer</strong> driven
                  by building resilient, intelligent systems that solve authentic real-world challenges.
                  Rather than treating machine learning models as isolated notebooks, I design systems where{" "}
                  <span className="text-cyan-400 font-medium">mathematical modeling</span>,{" "}
                  <span className="text-primary font-medium">telemetry pipelines</span>, and{" "}
                  <span className="text-purple-400 font-medium">real-time interface engineering</span>{" "}
                  operate as a single cohesive unit.
                </p>

                <p className="text-slate-400 text-sm sm:text-base">
                  My core technical competencies include{" "}
                  <strong className="text-white font-medium">Artificial Intelligence</strong>,{" "}
                  <strong className="text-white font-medium">Machine Learning</strong>,{" "}
                  <strong className="text-white font-medium">Deep Learning</strong>,{" "}
                  <strong className="text-white font-medium">Generative AI</strong>,{" "}
                  <strong className="text-white font-medium">Natural Language Processing</strong>, and{" "}
                  <strong className="text-white font-medium">Python</strong> alongside rigorous{" "}
                  <strong className="text-white font-medium">Data Structures and Algorithms</strong>.
                </p>
              </div>

              {/* Technical Identity Focus Badges */}
              <div className="pt-2 flex flex-wrap gap-2">
                {[
                  "Artificial Intelligence",
                  "Machine Learning",
                  "Deep Learning",
                  "Generative AI",
                  "Natural Language Processing",
                  "Python",
                  "Data Structures & Algorithms",
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

            {/* Right Column: 3D Interactive Holographic Tensor */}
            <div className="lg:col-span-5">
              <About3DTensor />
            </div>
          </div>

          {/* Core Technical Pillars Grid */}
          <div className="mt-16 pt-12 border-t border-white/[0.08]">
            <div className="text-center mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Architectural Competencies & Foundations
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Disciplines applied in competitive hackathons and production telemetry software.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {technicalPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.name}
                    className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all duration-300 group flex flex-col justify-between"
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
                      <span>Production Ready</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animated Verified Key Metrics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
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
