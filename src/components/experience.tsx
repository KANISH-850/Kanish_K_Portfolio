"use client";

import MotionWrap from "./motion-wrap";
import {
  Calendar,
  Trophy,
  Rocket,
  Code2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { timelineData } from "@/data/timeline";

export function Experience() {
  if (!timelineData || timelineData.length === 0) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hackathon":
        return <Trophy className="w-4 h-4 text-cyan-400" />;
      case "project":
        return <Rocket className="w-4 h-4 text-primary" />;
      case "learning":
        return <GraduationCap className="w-4 h-4 text-purple-400" />;
      default:
        return <Code2 className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section
      id="experience"
      className="py-24 md:py-36 relative bg-[#030712] border-t border-white/[0.06] overflow-hidden"
      aria-label="Technical Journey and Engineering Milestones"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        <MotionWrap>
          {/* Header */}
          <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              05 // Engineering Timeline
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Technical Journey &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                Milestones
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Verifiable timeline of competitive hackathon victories, machine
              learning architectures, and distributed systems engineering.
            </p>
          </div>

          {/* Timeline */}
          <ol className="space-y-10 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyan-500/40 before:to-transparent list-none p-0">
            {timelineData.map((exp) => (
              <li
                key={exp.id}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Timeline Center Glowing Node */}
                <div
                  aria-hidden="true"
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-cyan-400/50 glass-panel shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(0,240,255,0.4)] z-10 transition-transform duration-300 group-hover:scale-125 bg-slate-950"
                >
                  {getCategoryIcon(exp.category)}
                </div>

                {/* Milestone Card */}
                <article className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 sm:p-7 rounded-2xl border border-white/10 glass-panel shadow-xl group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2.5 gap-2">
                    <h3 className="font-headline font-bold text-lg md:text-xl text-white group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-md w-fit font-mono border border-cyan-500/20">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      <time dateTime={exp.year}>{exp.year}</time>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-primary text-xs font-mono font-semibold tracking-wide uppercase">
                      {exp.roleOrContext}
                    </span>
                    {exp.achievementBadge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                        <Trophy className="w-3 h-3 text-amber-400" />
                        {exp.achievementBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.08]">
                    {exp.technologyLearned.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono glass-panel text-slate-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </MotionWrap>
      </div>
    </section>
  );
}
