import MotionWrap from "./motion-wrap";
import { Briefcase, Calendar, Trophy, Rocket, Code2, CheckCircle2 } from "lucide-react";
import { timelineData } from "@/data/timeline";

export function Experience() {
  if (!timelineData || timelineData.length === 0) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hackathon":
        return <Trophy className="w-4 h-4 text-primary" />;
      case "project":
        return <Rocket className="w-4 h-4 text-primary" />;
      default:
        return <Code2 className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <section id="experience" className="py-20 md:py-28 bg-muted/10" aria-label="Technical Journey and Engineering Milestones">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
              Technical Journey & Milestones
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
              Engineering <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">Progression</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              A transparent, verified timeline of major engineering builds, hackathon victories, and machine learning research milestones.
            </p>
          </div>

          <ol className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent list-none p-0">
            {timelineData.map((exp) => (
              <li key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* Timeline Icon Node */}
                <div
                  aria-hidden="true"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/60 bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm shadow-primary/25 z-10 transition-transform duration-300 group-hover:scale-110"
                >
                  {getCategoryIcon(exp.category)}
                </div>

                {/* Milestone Card */}
                <article className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-white/5 bg-card shadow-sm group-hover:border-primary/40 group-hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h3 className="font-bold text-lg md:text-xl text-foreground">{exp.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-accent bg-accent/10 px-2.5 py-1 rounded-md w-fit font-mono">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      <time dateTime={exp.year}>{exp.year}</time>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-primary text-xs font-semibold tracking-wide uppercase">{exp.roleOrContext}</span>
                    {exp.achievementBadge && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30">
                        <Trophy className="w-3 h-3" />
                        {exp.achievementBadge}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                    {exp.technologyLearned.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/50 text-foreground/80 border border-border/30">
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
