import MotionWrap from "./motion-wrap";
import { Trophy, Award, CheckCircle2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface Achievement {
  id: string;
  badge: string;
  title: string;
  organization: string;
  projectTitle: string;
  projectSlug: string;
  description: string;
  highlights: string[];
}

const achievements: Achievement[] = [
  {
    id: "sih-winner",
    badge: "1st Place National Winner",
    title: "Smart India Hackathon (SIH)",
    organization: "Ministry of Education & AICTE, Government of India",
    projectTitle: "Digital Twin of EHV Substation Monitoring",
    projectSlug: "digital-twin-ehv",
    description:
      "Awarded 1st place in the national grand finale for developing a predictive digital twin framework that monitors Extra High Voltage (EHV) electrical substations using ~50,000 synthetic and operational telemetry records.",
    highlights: [
      "Real-time SCADA telemetry ingestion & digital twin asset modeling",
      "Semi-supervised deep autoencoders detecting transformer anomalies in < 50ms",
      "Decoupled Web Worker rendering sustaining 60 FPS under heavy data bursts"
    ]
  },
  {
    id: "cdac-runnerup",
    badge: "National Runner-up",
    title: "C-DAC Innovation Challenge",
    organization: "Centre for Development of Advanced Computing (C-DAC)",
    projectTitle: "Kiosk Management System",
    projectSlug: "kiosk-management-system",
    description:
      "Recognized as Runner-up for engineering a secure, centralized device orchestration platform that simplifies kiosk hardware operations, diagnostics, and service deployments.",
    highlights: [
      "Authenticated heartbeat protocol with local SQLite buffering for intermittent connectivity",
      "Outbound-only reverse WebSocket tunneling for secure remote troubleshooting",
      "Automated peripheral diagnostics evaluating touch, cameras, and receipt printers"
    ]
  }
];

export function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-28 bg-card/40 border-y border-border/50 relative" aria-label="Achievements">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
              Verified Honors & Awards
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
              Competitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">Achievements</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              National hackathon victories and peer-reviewed technical challenges evaluated by industry experts and government panels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className="bg-card border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-primary/40 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Badge & Trophy Header */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30">
                      <Trophy className="w-3.5 h-3.5" />
                      {ach.badge}
                    </span>
                    <Award className="w-6 h-6 text-accent" />
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {ach.title}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground mt-1">
                      {ach.organization}
                    </p>
                  </div>

                  {/* Associated Project */}
                  <div className="p-3 rounded-lg bg-muted/20 border border-border/40 text-xs font-mono">
                    <span className="text-muted-foreground block text-[10px] uppercase">Winning System</span>
                    <span className="text-foreground font-semibold">{ach.projectTitle}</span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {ach.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 pt-2 border-t border-border/40">
                    {ach.highlights.map((item, idx) => (
                      <li key={`${ach.id}-h-${idx}`} className="flex items-start gap-2 text-xs md:text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer link to case study */}
                <div className="pt-6 mt-6 border-t border-border/50">
                  <Button variant="outline" size="sm" asChild className="w-full justify-between hover:bg-primary hover:text-primary-foreground group/btn">
                    <Link href={`/projects/${ach.projectSlug}`}>
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
