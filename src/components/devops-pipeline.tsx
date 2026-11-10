"use client";

import { Server, ArrowRight, GitCommit, ShieldCheck, CheckCircle } from "lucide-react";
import MotionWrap from "./motion-wrap";

const defaultPipeline = [
  "Code Push (Git)",
  "Automated Lint & Typecheck (CI)",
  "Pytest & Benchmark Verification",
  "Docker Containerization",
  "Model Weights Integrity Check",
  "Production Edge & Cloud Deploy"
];

export function DevopsPipeline({ pipeline }: { pipeline?: string[] }) {
  const steps = pipeline && pipeline.length > 0 ? pipeline : defaultPipeline;
  const isStandalone = !pipeline;

  const content = (
    <div className="space-y-6">
      {isStandalone && (
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
            Automated Delivery & Verification
          </div>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
            DevOps & Deployment <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">Pipelines</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Continuous integration and continuous deployment workflows ensuring strict reproducible quality, automated testing, and edge runtime reliability.
          </p>
        </div>
      )}

      {!isStandalone && (
        <h2 className="text-3xl font-bold mb-6 border-b border-border/50 pb-2">
          Deployment & DevOps Pipeline
        </h2>
      )}

      <div className="p-4 sm:p-6 md:p-8 bg-card border border-white/10 rounded-2xl shadow-sm overflow-x-auto max-w-full min-w-0">
        <ol
          aria-label="DevOps pipeline stages"
          className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4 list-none p-0 m-0"
        >
          {steps.map((step, idx) => (
            <li key={step} className="flex items-center gap-2 md:gap-3 min-w-0 max-w-full md:shrink-0">
              <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 bg-muted/30 border border-border/50 rounded-xl text-xs md:text-sm font-mono text-foreground/90 shadow-sm hover:border-primary/40 transition-colors max-w-full min-w-0">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold shrink-0">
                  {idx + 1}
                </span>
                <Server className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                <span className="break-words">{step}</span>
              </div>
              {idx < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground/60 shrink-0 hidden sm:inline" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );

  if (isStandalone) {
    return (
      <section id="devops" className="py-20 md:py-28 bg-muted/10 border-t border-border/50" aria-label="DevOps Pipeline">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <MotionWrap>{content}</MotionWrap>
        </div>
      </section>
    );
  }

  return <section className="space-y-6">{content}</section>;
}
