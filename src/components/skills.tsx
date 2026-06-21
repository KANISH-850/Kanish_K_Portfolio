import MotionWrap from "./motion-wrap";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    category: "AI & Machine Learning",
    skills: ["PyTorch", "TensorFlow", "HuggingFace", "Scikit-learn", "LangChain", "OpenAI API", "IndicTrans2", "NumPy", "Pandas"],
  },
  {
    category: "Backend & Systems",
    skills: ["Python", "FastAPI", "Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase", "REST APIs"],
  },
  {
    category: "Frontend & Accessibility",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WCAG", "ARIA", "Semantic HTML"],
  },
  {
    category: "DevOps & Tools",
    skills: ["Linux", "Git", "Docker", "n8n (Automation)", "Firebase", "Vercel", "GCP"],
  },
];

export function Skills() {
  return (
    <section className="py-20 bg-muted/30 border-y border-border/50">
      <div className="container max-w-5xl mx-auto">
        <MotionWrap>
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold mb-4">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Arsenal</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building end-to-end AI applications, from model training to accessible user interfaces.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((group, idx) => (
              <div key={idx} className="bg-card p-6 rounded-2xl border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-4 text-foreground/90 border-b border-border/50 pb-2">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
