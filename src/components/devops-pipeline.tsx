"use client";

import { Server, ArrowRight } from "lucide-react";

export function DevopsPipeline({ pipeline }: { pipeline?: string[] }) {
  if (!pipeline || pipeline.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 border-b border-border/50 pb-2">Deployment & DevOps</h2>
      <div className="flex flex-wrap items-center gap-2 md:gap-4 p-6 bg-card border border-white/5 rounded-2xl shadow-sm overflow-x-auto">
        {pipeline.map((step, idx) => (
          <div key={idx} className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border border-border rounded-lg text-sm font-code text-foreground/80">
              <Server className="w-4 h-4 text-accent" />
              {step}
            </div>
            {idx < pipeline.length - 1 && (
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
