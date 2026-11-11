"use client";

import { useState } from "react";
import MotionWrap from "./motion-wrap";
import { Badge } from "@/components/ui/badge";
import {
  BrainCircuit,
  Cpu,
  Code2,
  Server,
  Layout,
  Database,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface SkillCategory {
  id: string;
  name: string;
  icon: typeof BrainCircuit;
  color: string;
  level: string;
  skills: string[];
  description: string;
}

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Programming Languages",
    icon: Terminal,
    color: "text-amber-400",
    level: "Strong Working Experience",
    description:
      "Multi-language foundation across Python for AI/backends, TypeScript/JavaScript for full-stack apps, SQL, and Java/C++/C.",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "Java", "C++", "C"],
  },
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    icon: BrainCircuit,
    color: "text-cyan-400",
    level: "Project Experience",
    description:
      "Tabular anomaly & leak modeling, computer vision transfer learning, text classification, and local RAG pipelines.",
    skills: [
      "Scikit-learn",
      "XGBoost",
      "PyTorch",
      "TensorFlow",
      "One-Class SVM",
      "Isolation Forest",
      "MobileNetV3",
      "TF-IDF & NLP",
      "Ollama & ChromaDB",
      "NumPy & Pandas",
    ],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    icon: Server,
    color: "text-emerald-400",
    level: "Strong Working Experience",
    description:
      "Building typed REST microservices, streaming SSE responses, authentication flows, and containerized runtimes.",
    skills: [
      "FastAPI",
      "Node.js",
      "Express",
      "REST APIs",
      "JWT / Bcrypt",
      "SSE & WebSockets",
      "Docker",
      "Nginx",
      "Pytest",
    ],
  },
  {
    id: "frontend",
    name: "Frontend & UI",
    icon: Layout,
    color: "text-purple-400",
    level: "Strong Working Experience",
    description:
      "Responsive single-page and static applications with accessible component systems and interactive telemetry dashboards.",
    skills: ["React", "Next.js", "Tailwind CSS", "Vite", "HTML5 / CSS3"],
  },
  {
    id: "databases",
    name: "Databases & Vector Stores",
    icon: Database,
    color: "text-pink-400",
    level: "Project Experience",
    description:
      "Relational schema design, migrations, local SQLite prototyping, and local vector storage for retrieval workflows.",
    skills: ["PostgreSQL", "Prisma", "SQLAlchemy", "Alembic", "SQLite", "ChromaDB"],
  },
  {
    id: "core-cs",
    name: "Core CS & Tooling",
    icon: Cpu,
    color: "text-blue-400",
    level: "Academic & Problem Solving",
    description:
      "Computer science fundamentals paired with daily developer tooling and version control workflows.",
    skills: [
      "DSA",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Git & GitHub",
      "Postman",
      "Linux CLI",
    ],
  },
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].name);

  return (
    <section
      id="skills"
      className="py-20 md:py-28 relative bg-[#030712] border-t border-white/[0.06] overflow-hidden"
      aria-label="Technical Skills and Engineering Stack"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              03 // Technical Stack
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Technical{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                Skills &amp; Tooling
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Organized cleanly by engineering layer and aligned directly with my
              resume and verified GitHub repositories.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {skillCategories.map((group) => {
              const isActive = group.name === activeCategory;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveCategory(group.name)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all duration-300 flex items-center gap-2 border ${
                    isActive
                      ? "bg-primary text-slate-950 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                      : "glass-panel text-slate-300 border-white/10 hover:border-primary/40 hover:text-white"
                  }`}
                >
                  <group.icon className={`w-4 h-4 ${isActive ? "text-slate-950" : group.color}`} />
                  <span>{group.name}</span>
                </button>
              );
            })}
          </div>

          {/* 6 Category Grid */}
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
                      ? "border-primary/60 shadow-[0_0_25px_rgba(0,240,255,0.16)] bg-white/[0.04]"
                      : "border-white/10 hover:border-primary/40 hover:shadow-lg"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                          <Icon className={`w-5 h-5 ${group.color}`} />
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-primary transition-colors">
                          {group.name}
                        </h3>
                      </div>
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
                    <span>{group.level}</span>
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
