"use client";

import MotionWrap from "./motion-wrap";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";

interface CertificationItem {
  id: string;
  title: string;
  issuerOrFocus: string;
  type: "academic" | "certification";
  highlights: string[];
}

const credentials: CertificationItem[] = [
  {
    id: "degree-be-cse",
    title: "B.E. Computer Science and Engineering",
    issuerOrFocus: "Bannari Amman Institute of Technology (BITSathy)",
    type: "academic",
    highlights: [
      "Rigorous foundations in Machine Learning, Deep Neural Networks, and Distributed Systems",
      "Hands-on research in real-time SCADA digital twins and accessible public-sector platforms",
      "Lead developer for national hackathon-winning architectures (SIH & CDAC)",
    ],
  },
  {
    id: "cert-deep-learning",
    title: "Deep Learning & Transformer Architectures",
    issuerOrFocus: "Specialized Machine Learning Curriculum",
    type: "certification",
    highlights: [
      "Trained autoencoders, CNNs, and recurrent models with PyTorch and TensorFlow",
      "Quantization, pruning, and ONNX Runtime inference optimization on resource-constrained devices",
      "Fine-tuned multilingual models including IndicTrans2 and BERT embeddings",
    ],
  },
  {
    id: "cert-cloud-systems",
    title: "Cloud Infrastructure & Distributed Systems",
    issuerOrFocus: "Systems Engineering & Telemetry",
    type: "certification",
    highlights: [
      "Microservice deployment using FastAPI, Node.js, and Docker containerization",
      "Time-series data architecture with InfluxDB, WebSockets, and Redis caching",
      "Relational schema modeling and query optimization with PostgreSQL and Prisma",
    ],
  },
];

export function Certifications() {
  return (
    <section
      id="certifications"
      className="py-24 md:py-36 relative bg-[#030712] border-t border-white/[0.06] overflow-hidden"
      aria-label="Education and Certifications"
    >
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              06 // Academic & Specialized Credentials
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Education &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                Specializations
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Formal computer science foundations combined with continuous applied
              learning across modern machine learning and distributed systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                      {cred.type === "academic" ? (
                        <GraduationCap className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <Award className="w-5 h-5 text-purple-400" />
                      )}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded border border-white/5">
                      {cred.type === "academic"
                        ? "Academic Degree"
                        : "Applied Specialization"}
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
                  <span>Verified Credentials</span>
                  <span className="text-emerald-400 font-bold">&bull; Authentic</span>
                </div>
              </div>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
