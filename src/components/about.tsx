import MotionWrap from "./motion-wrap";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const philosophies = [
    "AI is only as good as the data and architecture behind it.",
    "Accessibility is an engineering requirement, not an afterthought.",
    "System Design must prioritize both scalability and maintainability.",
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="container max-w-4xl mx-auto">
        <MotionWrap>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                Engineering <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Philosophy</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I operate at the intersection of Artificial Intelligence and Full-Stack Engineering. My goal isn't just to train models—it's to deploy them into robust, accessible systems that solve real-world problems. I specialize in building end-to-end ML pipelines, from data engineering to scalable API deployment.
              </p>
              <div className="space-y-3 pt-4">
                {philosophies.map((ph, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <p className="text-foreground font-medium">{ph}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              {/* T-shaped visual or abstract code block */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transform rotate-3 scale-105 -z-10 blur-xl" />
              <div className="bg-card border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4 border-b border-border pb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" style={{backgroundColor: '#eab308'}} />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <pre className="text-sm font-code text-muted-foreground overflow-x-auto">
                  <code>
<span className="text-primary">class</span> <span className="text-accent">EngineerProfile</span>:<br/>
{"    "}def <span className="text-blue-400">__init__</span>(self):<br/>
{"        "}self.role = <span className="text-green-400">"AI/ML Engineer"</span><br/>
{"        "}self.focus = [<br/>
{"            "}<span className="text-green-400">"Deep Learning"</span>,<br/>
{"            "}<span className="text-green-400">"NLP"</span>,<br/>
{"            "}<span className="text-green-400">"System Design"</span><br/>
{"        "}]<br/>
<br/>
{"    "}def <span className="text-blue-400">build</span>(self, problem):<br/>
{"        "}<span className="text-primary">return</span> self._architect_solution(<br/>
{"            "}problem, scalable=<span className="text-orange-400">True</span><br/>
{"        "})
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
