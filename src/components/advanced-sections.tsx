import MotionWrap from "./motion-wrap";
import { Network, Trophy, Github } from "lucide-react";
import { Card } from "./ui/card";

export function AdvancedSections() {
  return (
    <section className="py-20 md:py-28 border-t border-border/50">
      <div className="container">
        <MotionWrap>
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              Beyond The <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Code</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Open source contributions, system designs, and competitive programming achievements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Architecture Gallery */}
            <Card className="p-8 bg-card border-white/5 shadow-lg flex flex-col gap-6 group hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Network className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">System Design</h3>
                <p className="text-muted-foreground">
                  View high-level architecture diagrams mapping out microservices, data pipelines, and ML model deployments.
                </p>
              </div>
              <div className="mt-auto pt-4 text-primary font-medium group-hover:underline cursor-pointer flex items-center">
                Explore Gallery →
              </div>
            </Card>

            {/* Hackathons & Competitions */}
            <Card className="p-8 bg-card border-white/5 shadow-lg flex flex-col gap-6 group hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Hackathons</h3>
                <p className="text-muted-foreground">
                  Demonstrated ability to build MVP AI solutions under extreme time constraints and present technical concepts to judges.
                </p>
              </div>
              <ul className="space-y-2 text-sm mt-auto border-t border-border/50 pt-4">
                <li className="flex justify-between"><span>Smart India Hackathon</span> <span className="text-accent">Finalist</span></li>
                <li className="flex justify-between"><span>AI Buildathon</span> <span className="text-accent">Winner</span></li>
              </ul>
            </Card>

            {/* Open Source / GitHub Analytics */}
            <Card className="p-8 bg-card border-white/5 shadow-lg flex flex-col gap-6 group hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Github className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Open Source</h3>
                <p className="text-muted-foreground">
                  Active contributor to the ML community. I maintain repositories focusing on automation and accessible UI components.
                </p>
              </div>
              <div className="mt-auto pt-4 flex gap-4 text-sm font-medium">
                <div className="flex flex-col">
                  <span className="text-emerald-500 text-xl font-bold">150+</span>
                  <span className="text-muted-foreground">Contributions</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-emerald-500 text-xl font-bold">12</span>
                  <span className="text-muted-foreground">Repositories</span>
                </div>
              </div>
            </Card>

          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
