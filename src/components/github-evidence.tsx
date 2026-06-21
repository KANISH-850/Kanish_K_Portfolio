import MotionWrap from "./motion-wrap";
import { Github, GitBranch, Star, Code2 } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const topRepos = [
  {
    name: "aazhi-suvidhaa",
    description: "Multilingual AI-Powered Grievance Redressal Platform with IndicTrans2.",
    language: "TypeScript",
    color: "bg-blue-400",
    stars: 12,
    forks: 3
  },
  {
    name: "digital-twin-ehv",
    description: "Digital Twin & Anomaly Detection for Extra High Voltage Substations.",
    language: "Python",
    color: "bg-yellow-400",
    stars: 8,
    forks: 1
  },
  {
    name: "nlp-sentiment-models",
    description: "Fine-tuned HuggingFace models for regional language sentiment analysis.",
    language: "Jupyter Notebook",
    color: "bg-orange-500",
    stars: 15,
    forks: 5
  },
  {
    name: "auto-slot-bot",
    description: "Selenium-based automation bot for course slot reservation.",
    language: "Python",
    color: "bg-yellow-400",
    stars: 5,
    forks: 2
  }
];

export function GithubEvidence() {
  return (
    <section className="py-20 bg-muted/10 border-y border-border/50">
      <div className="container max-w-6xl mx-auto">
        <MotionWrap>
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-4">
                Evidence Over Claims
              </div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                Open Source <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Contributions</span>
              </h2>
            </div>
            <div className="mt-6 md:mt-0 flex gap-4 text-center">
              <div className="flex flex-col bg-card border border-white/5 p-4 rounded-xl shadow-sm">
                <span className="text-2xl font-bold text-foreground">250+</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Commits</span>
              </div>
              <div className="flex flex-col bg-card border border-white/5 p-4 rounded-xl shadow-sm">
                <span className="text-2xl font-bold text-foreground">12</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Repositories</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {topRepos.map((repo, idx) => (
              <Card key={idx} className="p-6 bg-card border-white/5 shadow-md hover:border-emerald-500/30 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <a href="#" className="flex items-center gap-2 text-xl font-bold text-emerald-500 hover:underline">
                    <Github className="w-5 h-5" />
                    {repo.name}
                  </a>
                  <Badge variant="outline" className="bg-background">Public</Badge>
                </div>
                <p className="text-muted-foreground mb-6 h-12">
                  {repo.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${repo.color}`} />
                    {repo.language}
                  </div>
                  <div className="flex items-center gap-1 group-hover:text-yellow-500 transition-colors">
                    <Star className="w-4 h-4" /> {repo.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4" /> {repo.forks}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-8 rounded-2xl bg-card border border-white/5 flex flex-col md:flex-row items-center gap-8 justify-between">
             <div className="space-y-2">
               <h3 className="text-xl font-bold flex items-center gap-2"><Code2 className="text-emerald-500" /> Top Languages</h3>
               <p className="text-muted-foreground">Python, TypeScript, JavaScript, Jupyter Notebook</p>
             </div>
             {/* Mock Contribution Graph representation */}
             <div className="flex gap-1 overflow-x-hidden opacity-80">
                {Array.from({length: 20}).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1">
                     {Array.from({length: 5}).map((_, j) => (
                        <div key={`${i}-${j}`} className={`w-3 h-3 rounded-sm ${Math.random() > 0.6 ? 'bg-emerald-500' : Math.random() > 0.3 ? 'bg-emerald-800' : 'bg-emerald-900/30'}`} />
                     ))}
                  </div>
                ))}
             </div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
