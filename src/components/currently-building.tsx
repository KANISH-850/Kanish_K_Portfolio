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
          <div className="flex flex-col gap-12">
            
            {/* Research Areas */}
            <div className="w-full space-y-6">
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
