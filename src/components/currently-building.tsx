import MotionWrap from "./motion-wrap";
import { Hammer, Lightbulb } from "lucide-react";
import { Badge } from "./ui/badge";

const researchAreas = [
  "Artificial Intelligence",
  "Machine Learning",
  "NLP",
  "Deep Learning",
  "Generative AI",
  "Accessibility Systems",
  "Predictive Maintenance"
];

export function CurrentlyBuilding() {
  return (
    <section className="py-20 bg-card border-y border-border/50">
      <div className="container max-w-4xl mx-auto">
        <MotionWrap>
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Active Project */}
            <div className="md:w-1/2 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Hammer className="w-6 h-6 text-primary animate-pulse" />
                <h2 className="text-2xl font-bold font-headline uppercase tracking-wider text-muted-foreground">Currently Building</h2>
              </div>
              <div className="p-6 rounded-2xl bg-background border border-primary/20 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                <h3 className="text-xl font-bold text-foreground mb-2">Digital Twin of EHV Substation</h3>
                <p className="text-muted-foreground mb-4">
                  Integrating real-time SCADA data with deep learning models to predict anomalous events in extra high voltage infrastructure.
                </p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-medium text-emerald-500">Active Development</span>
                </div>
              </div>
            </div>

            {/* Research Areas */}
            <div className="md:w-1/2 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold font-headline uppercase tracking-wider text-muted-foreground">Research Areas</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {researchAreas.map((area, idx) => (
                  <Badge key={idx} variant="outline" className="px-4 py-2 text-sm bg-accent/5 hover:bg-accent/20 hover:text-accent transition-colors border-accent/20">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
