"use client";

import { MLPipelineStep } from "@/data/projects";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export function PipelineVisualizer({ pipeline }: { pipeline?: MLPipelineStep[] }) {
  if (!pipeline || pipeline.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 border-b border-border/50 pb-2">AI/ML Pipeline</h2>
      <div className="flex flex-col items-center">
        {pipeline.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center w-full max-w-lg">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="w-full bg-card border border-white/10 shadow-lg p-4 rounded-xl flex items-center justify-between group hover:border-primary/50 transition-colors cursor-default"
            >
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary">{step.name}</span>
                <span className="text-sm text-muted-foreground">{step.description}</span>
              </div>
              {step.metric && (
                <div className="bg-accent/10 text-accent font-mono text-sm px-3 py-1 rounded-full border border-accent/20">
                  {step.metric}
                </div>
              )}
            </motion.div>
            
            {idx < pipeline.length - 1 && (
              <div className="h-8 flex items-center justify-center text-muted-foreground/50">
                <ArrowDown className="w-5 h-5 animate-pulse" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
