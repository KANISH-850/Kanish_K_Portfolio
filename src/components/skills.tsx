"use client";

import { useState } from "react";
import MotionWrap from "./motion-wrap";
import { Badge } from "@/components/ui/badge";
import {
  BrainCircuit,
  Cpu,
  Sparkles,
  Binary,
  Code2,
  Server,
  Layout,
  Wrench,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { Skills3DConstellation } from "./skills-3d-constellation";

interface SkillCategory {
  id: string;
  name: string;
  icon: typeof BrainCircuit;
  color: string;
  skills: string[];
  description: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: "machine-learning",
    name: "Machine Learning",
    icon: BrainCircuit,
    color: "text-cyan-400",
    description:
      "Supervised & semi-supervised statistical learning, ensemble trees, anomaly scoring, and time-series pipelines.",
    skills: [
      "Python",
      "Scikit-learn",
      "XGBoost",
      "CatBoost",
      "One-Class SVM",
      "Time-Series Modeling",
      "Anomaly Scoring",
      "Feature Engineering",
    ],
  },
  {
    id: "deep-learning",
    name: "Deep Learning",
    icon: Layers,
    color: "text-purple-400",
    description:
      "Deep neural network architectures, reconstruction autoencoders for telemetry analysis, and low-latency inference.",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Deep Autoencoders",
      "Convolutional Networks",
      "Model Quantization (INT8)",
      "ONNX Runtime",
      "Hyperparameter Tuning",
    ],
  },
  {
    id: "generative-ai",
    name: "Generative AI",
    icon: Sparkles,
    color: "text-pink-400",
    description:
      "Transformer foundation model orchestration, multilingual translation pipelines, and structured generation.",
    skills: [
      "LLM Integration",
      "IndicTrans2",
      "Foundation Models",
      "Prompt Engineering",
      "RAG Pipelines",
      "Context Caching",
      "Structured Output Parsing",
    ],
  },
  {
    id: "nlp",
    name: "NLP",
    icon: Binary,
    color: "text-emerald-400",
    description:
      "Semantic embedding extraction, vector search, regional language translation, and high-accuracy intent categorization.",
    skills: [
      "IndicTrans2 Translation",
      "Sentence Transformers",
      "BERT",
      "Semantic Embeddings",
      "Text Classification",
      "Multilingual Normalization",
    ],
  },
  {
    id: "python",
    name: "Python",
    icon: Code2,
    color: "text-amber-400",
    description:
      "Production Python engineering, asynchronous microservices, real-time telemetry streaming, and containerized deployment.",
    skills: [
      "Python 3.12+",
      "FastAPI",
      "NumPy & Pandas",
      "AsyncIO / WebSockets",
      "Docker",
      "PostgreSQL",
      "InfluxDB",
      "Pytest",
    ],
  },
  {
    id: "dsa",
    name: "DSA",
    icon: Cpu,
    color: "text-blue-400",
    description:
      "Algorithmic problem solving, rigorous space-time complexity analysis, and scalable data structure design.",
    skills: [
      "Graph Traversal (BFS/DFS)",
      "Dynamic Programming",
      "Tree Structures & Heaps",
      "Hash Maps & Sets",
      "Time & Space Optimization",
      "Greedy Algorithms",
      "Two Pointers & Sliding Window",
    ],
  },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>(
    skillCategories[0].name
  );

  const categoryNames = skillCategories.map((c) => c.name);
  const activeCategoryData = skillCategories.find(
    (c) => c.name === activeCategory
  ) || skillCategories[0];

  return (
    <section
      id="skills"
      className="py-24 md:py-36 relative bg-[#030712] border-t border-white/[0.06] overflow-hidden"
      aria-label="Technical Skills - 3D Skill Constellation"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              03 // Interactive Constellation
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Technical{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                Competencies & Stack
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Curated technologies verified across production AI systems,
              telemetry ingest engines, and full-stack applications.
            </p>
          </div>

          {/* 3D Skill Constellation Component */}
          <div className="mb-12">
            <Skills3DConstellation
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              categories={categoryNames}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {skillCategories.map((group) => {
              const isActive = group.name === activeCategory;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveCategory(group.name)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all duration-300 flex items-center gap-2 border ${
                    isActive
                      ? "bg-primary text-slate-950 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105"
                      : "glass-panel text-slate-300 border-white/10 hover:border-primary/40 hover:text-white"
                  }`}
                >
                  <group.icon className={`w-4 h-4 ${isActive ? "text-slate-950" : group.color}`} />
                  <span>{group.name}</span>
                </button>
              );
            })}
          </div>

          {/* 6 Core Competency Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((group) => {
              const Icon = group.icon;
              const isSelected = group.name === activeCategory;

              return (
                <div
                  key={group.id}
                  onClick={() => setActiveCategory(group.name)}
                  className={`glass-panel p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? "border-primary/60 shadow-[0_0_30px_rgba(0,240,255,0.18)] bg-white/[0.04]"
                      : "border-white/10 hover:border-primary/40 hover:shadow-lg"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                      <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                        <Icon className={`w-5 h-5 ${group.color}`} />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-primary transition-colors">
                        {group.name}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                      {group.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {group.skills.map((skill) => (
                        <Badge
                          key={`${group.id}-${skill}`}
                          variant="secondary"
                          className="glass-panel text-slate-200 text-[11px] font-mono px-2.5 py-0.5 rounded-md border border-white/10 hover:border-primary/40 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{group.skills.length} Technologies</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
