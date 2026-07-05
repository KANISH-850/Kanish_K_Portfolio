import MotionWrap from "./motion-wrap";
import { Network, Github, Accessibility, Landmark, Lightbulb } from "lucide-react";
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
            
            {/* System Design */}
            <Card className="p-8 bg-card border-white/5 shadow-lg flex flex-col gap-6 group hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Network className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">System Design</h3>
                <p className="text-muted-foreground">
                  Exploring scalable architectures, data pipelines, distributed systems, and performance optimization.
                </p>
              </div>
              <div className="mt-auto pt-4 text-primary font-medium group-hover:underline cursor-pointer flex items-center">
                Explore Gallery →
              </div>
            </Card>

            {/* Open Source */}
            <Card className="p-8 bg-card border-white/5 shadow-lg flex flex-col gap-6 group hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Github className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Open Source</h3>
                <p className="text-muted-foreground">
                  Active contributor to the tech community. I maintain repositories focusing on automation and accessible tools.
                </p>
              </div>
              <div className="mt-auto pt-4 text-emerald-500 font-medium group-hover:underline cursor-pointer flex items-center">
                View GitHub →
              </div>
            </Card>

            {/* Accessibility Engineering */}
            <Card className="p-8 bg-card border-white/5 shadow-lg flex flex-col gap-6 group hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Accessibility className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Accessibility Engineering</h3>
                <p className="text-muted-foreground">
                  Building inclusive interfaces and championing web accessibility standards (WCAG) for all users.
                </p>
              </div>
              <div className="mt-auto pt-4 text-blue-500 font-medium group-hover:underline cursor-pointer flex items-center">
                View Impact →
              </div>
            </Card>

            {/* Government Technology */}
            <Card className="p-8 bg-card border-white/5 shadow-lg flex flex-col gap-6 group hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Landmark className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Government Technology</h3>
                <p className="text-muted-foreground">
                  Innovating digital public infrastructure and building AI-driven, citizen-centric governance platforms.
                </p>
              </div>
              <div className="mt-auto pt-4 text-accent font-medium group-hover:underline cursor-pointer flex items-center">
                Read Case Studies →
              </div>
            </Card>

            {/* AI Research */}
            <Card className="p-8 bg-card border-white/5 shadow-lg flex flex-col gap-6 group hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">AI Research</h3>
                <p className="text-muted-foreground">
                  Transforming research papers into practical prototypes using emerging ML models and edge computing.
                </p>
              </div>
              <div className="mt-auto pt-4 text-purple-500 font-medium group-hover:underline cursor-pointer flex items-center">
                View Prototypes →
              </div>
            </Card>

          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
