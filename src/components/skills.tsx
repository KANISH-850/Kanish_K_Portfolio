import MotionWrap from "./motion-wrap";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Server, Layout, Database, Wrench } from "lucide-react";

interface SkillCategory {
  id: string;
  category: string;
  icon: typeof BrainCircuit;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    category: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Generative AI",
      "PyTorch"
    ]
  },
  {
    id: "backend",
    category: "Backend Systems",
    icon: Server,
    skills: [
      "FastAPI",
      "Node.js",
      "Express",
      "REST APIs"
    ]
  },
  {
    id: "frontend",
    category: "Frontend & UI Engineering",
    icon: Layout,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ]
  },
  {
    id: "database",
    category: "Databases & Storage",
    icon: Database,
    skills: [
      "PostgreSQL",
      "SQL",
      "Prisma"
    ]
  },
  {
    id: "tools",
    category: "Developer Tools & DevOps",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "Docker"
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-muted/10 border-y border-border/50" aria-label="Technical Skills">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
              Verified Technical Stack
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">Competencies</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Curated technologies actively implemented across production AI systems, telemetry pipelines, and scalable web applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.id}
                  className="bg-card border border-white/5 rounded-2xl p-6 shadow-sm hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/40">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base md:text-lg text-foreground">
                        {group.category}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-secondary/60 hover:bg-primary/20 hover:text-primary transition-colors text-xs font-mono px-3 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-border/30 text-[11px] font-mono text-muted-foreground">
                    <span>{group.skills.length} Verified Technologies</span>
                  </div>
                </div>
              );
            })}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
