import MotionWrap from "./motion-wrap";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    role: "AI & ML Engineer",
    company: "Freelance / Projects",
    duration: "2023 - Present",
    description: "Architected end-to-end ML pipelines and full-stack web applications. Developed scalable APIs using FastAPI and React. Integrated real-time NLP translation models (IndicTrans2) into production.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "Tech Startup",
    duration: "Summer 2024",
    description: "Contributed to building high-performance, accessible user interfaces using Next.js and Tailwind CSS. Optimized database queries in PostgreSQL, reducing latency by 30%.",
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 bg-muted/10">
      <div className="container max-w-4xl mx-auto">
        <MotionWrap>
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Career Journey
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              Professional <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Experience</span>
            </h2>
          </div>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(0,240,255,0.2)] z-10">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-white/5 bg-card shadow-sm group-hover:border-primary/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <h3 className="font-bold text-xl text-foreground">{exp.role}</h3>
                    <div className="flex items-center gap-1 text-sm text-accent bg-accent/10 px-2 py-1 rounded-md w-fit">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </div>
                  </div>
                  <div className="text-primary font-medium mb-4">{exp.company}</div>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
