"use client";

import MotionWrap from "./motion-wrap";
import { GraduationCap, BookOpen, Wrench, CheckCircle2 } from "lucide-react";

interface EducationBlock {
  id: string;
  title: string;
  issuerOrFocus: string;
  categoryBadge: string;
  footerLabel: string;
  icon: "academic" | "coursework" | "applied";
  highlights: string[];
}

const educationBlocks: EducationBlock[] = [
  {
    id: "degree-be-cse",
    title: "B.E. Computer Science and Engineering",
    issuerOrFocus: "Bannari Amman Institute of Technology (BITSathy) • 2024 – 2028",
    categoryBadge: "Academic Degree",
    footerLabel: "CGPA: 7.73 / 10",
    icon: "academic",
    highlights: [
      "3rd-year undergraduate majoring in Computer Science & Engineering (Class of 2028).",
      "National Grand Finale Winner (Smart India Hackathon 2025) & C-DAC Runner-up (2024).",
      "Applied project work spanning Python, ML/DL models, FastAPI/Express APIs, and SQL databases.",
    ],
  },
  {
    id: "core-cs-coursework",
    title: "Core Computer Science Foundations",
    issuerOrFocus: "Undergraduate Academic Curriculum & Independent Study",
    categoryBadge: "Core CS Foundations",
    footerLabel: "Listed on Resume",
    icon: "coursework",
    highlights: [
      "Data Structures & Algorithms (DSA) and Object-Oriented Programming (OOP).",
      "Database Management Systems (DBMS), relational modeling (PostgreSQL/Prisma/SQLAlchemy).",
      "Operating Systems (OS) fundamentals and Computer Networks / REST API communication.",
    ],
  },
  {
    id: "applied-ml-stack",
    title: "Applied ML & Full-Stack Practice",
    issuerOrFocus: "Hands-On Repository Evidence (No Self-Awarded Certifications)",
    categoryBadge: "Applied Focus",
    footerLabel: "Verified in GitHub Repos",
    icon: "applied",
    highlights: [
      "ML evaluation & audit suites using Scikit-learn, XGBoost, PyTorch MobileNetV3, and TensorFlow.",
      "Containerized FastAPI & Express backends paired with React / Next.js and Alembic migrations.",
      "Local air-gapped RAG pipelines with Ollama (qwen3:4b) and ChromaDB vector retrieval.",
    ],
  },
];

export function Certifications() {
  return (
    <section
      id="certifications"
      className="py-20 md:py-28 relative bg-[#030712] border-t border-white/[0.06] overflow-hidden"
      aria-label="Education and Core CS Foundations"
    >
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              06 // Academic Background
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Education &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                Core CS Foundations
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Academic degree, foundational computer science coursework, and practical
              skills exercised in codebases.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {educationBlocks.map((cred) => (
              <div
                key={cred.id}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                      {cred.icon === "academic" ? (
                        <GraduationCap className="w-5 h-5 text-cyan-400" />
                      ) : cred.icon === "coursework" ? (
                        <BookOpen className="w-5 h-5 text-purple-400" />
                      ) : (
                        <Wrench className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded border border-white/5">
                      {cred.categoryBadge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-headline text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug">
                      {cred.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mt-1">
                      {cred.issuerOrFocus}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-white/[0.08]">
                    {cred.highlights.map((item, idx) => (
                      <li
                        key={`${cred.id}-h-${idx}`}
                        className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-6 border-t border-white/[0.06] text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Verification Basis</span>
                  <span className="text-emerald-400 font-semibold">{cred.footerLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
