import { TechChallenge } from "@/data/projects";
import { Wrench, CheckCircle2, Code2, LineChart } from "lucide-react";

export function TechnicalChallenges({ challenges }: { challenges: TechChallenge[] }) {
  if (!challenges || challenges.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 border-b border-border/50 pb-2">Technical Challenges</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {challenges.map((challenge, idx) => (
          <div key={idx} className="bg-card border border-white/5 shadow-md p-6 rounded-2xl flex flex-col gap-4">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-destructive font-semibold">
                <Wrench className="w-4 h-4" /> Challenge
              </div>
              <p className="text-foreground/90">{challenge.challenge}</p>
            </div>

            <div className="space-y-2 border-t border-border/50 pt-4">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Solution
              </div>
              <p className="text-foreground/80">{challenge.solution}</p>
            </div>

            <div className="space-y-2 border-t border-border/50 pt-4">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Code2 className="w-4 h-4" /> Implementation
              </div>
              <p className="text-foreground/80 font-code text-sm bg-muted/20 p-2 rounded-md border border-white/5">{challenge.implementation}</p>
            </div>

            <div className="mt-auto space-y-2 border-t border-border/50 pt-4">
              <div className="flex items-center gap-2 text-emerald-500 font-semibold">
                <LineChart className="w-4 h-4" /> Result
              </div>
              <p className="text-foreground font-bold">{challenge.result}</p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
