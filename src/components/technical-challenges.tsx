import { TechChallenge, projectsData } from "@/data/projects";
import { Wrench, CheckCircle2, Code2, LineChart, Cpu } from "lucide-react";
import MotionWrap from "./motion-wrap";

const flagshipChallenges: TechChallenge[] = [
  projectsData["digital-twin-ehv"].technicalChallenges[0],
  projectsData["techspire"].technicalChallenges[0],
  projectsData["intelligent-grievance-system"].technicalChallenges[0],
  projectsData["aquaguard-ai"].technicalChallenges[0],
].filter(Boolean);

export function TechnicalChallenges({ challenges }: { challenges?: TechChallenge[] }) {
  const displayChallenges = challenges && challenges.length > 0 ? challenges : flagshipChallenges;

  if (!displayChallenges || displayChallenges.length === 0) return null;

  const isStandalone = !challenges;

  const content = (
    <div className="space-y-8">
      {isStandalone && (
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
            System Design & Debugging
          </div>
          <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">Challenges & Solutions</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Real engineering bottlenecks overcome during implementation, detailing the diagnostic breakdown, chosen architecture, and verifiable outcome.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 min-w-0">
        {displayChallenges.map((challenge, idx) => (
          <article
            key={challenge.id || `challenge-${idx}`}
            className="min-w-0 bg-card border border-white/10 shadow-md p-5 sm:p-7 rounded-2xl flex flex-col gap-4 hover:border-primary/40 transition-colors"
          >
            {/* Challenge */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 text-destructive font-semibold text-sm font-mono uppercase tracking-wider">
                <Wrench className="w-4 h-4 shrink-0" /> Engineering Challenge
              </div>
              <p className="text-foreground/90 font-medium text-sm leading-relaxed break-words">
                {challenge.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="space-y-1.5 border-t border-border/40 pt-3 min-w-0">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm font-mono uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> Architectural Solution
              </div>
              <p className="text-foreground/80 text-xs md:text-sm leading-relaxed break-words">
                {challenge.solution}
              </p>
            </div>

            {/* Implementation */}
            <div className="space-y-1.5 border-t border-border/40 pt-3 min-w-0">
              <div className="flex items-center gap-2 text-accent font-semibold text-sm font-mono uppercase tracking-wider">
                <Code2 className="w-4 h-4 shrink-0" /> Implementation Details
              </div>
              <p className="text-foreground/80 font-mono text-xs bg-muted/30 p-2.5 rounded-lg border border-white/5 leading-relaxed break-words">
                {challenge.implementation}
              </p>
            </div>

            {/* Result */}
            <div className="mt-auto space-y-1 border-t border-border/40 pt-3 min-w-0">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs font-mono uppercase tracking-wider">
                <LineChart className="w-4 h-4 shrink-0" /> Quantified Outcome
              </div>
              <p className="text-foreground font-bold text-sm break-words">
                {challenge.result}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  if (isStandalone) {
    return (
      <section id="challenges" className="py-20 md:py-28 overflow-hidden" aria-label="Technical Challenges">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <MotionWrap>{content}</MotionWrap>
        </div>
      </section>
    );
  }

  return <section className="space-y-6">{content}</section>;
}
