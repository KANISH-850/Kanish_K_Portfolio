import MotionWrap from "./motion-wrap";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  "AI & Machine Learning Engineer",
  "Full Stack Developer",
  "Accessibility Engineer",
  "System Design Enthusiast",
  "Government Technology Builder",
  "Problem Solver",
  "Research-Oriented Developer"
];

export function WhyHireMe() {
  return (
    <section className="py-16 md:py-24 bg-background border-y border-border/50">
      <div className="container max-w-5xl mx-auto">
        <MotionWrap>
          <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="md:w-1/3 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                Recruiter Quick Scan
              </div>
              <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
                Why Hire <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Me?</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Delivering end-to-end impact from architecture to deployment.
              </p>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-white/5 shadow-sm hover:border-primary/20 hover:bg-muted/30 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="font-medium text-foreground/90">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
