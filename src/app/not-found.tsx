import Link from "next/link";
import { ArrowLeft, Briefcase, Layers, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#030712] text-foreground flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-lg w-full text-center glass-panel border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
          404 // Route Not Found
        </div>

        <h1 className="font-headline text-4xl sm:text-5xl font-black text-white tracking-tight">
          Signal <span className="text-cyan-400">Lost</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          The page or project route you requested does not exist in this portfolio build.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild className="bg-primary text-slate-950 hover:bg-cyan-300 font-bold">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
          <Button variant="outline" asChild className="glass-panel border-white/20 text-white hover:text-cyan-400">
            <Link href="/#projects">
              <Layers className="mr-2 h-4 w-4 text-cyan-400" />
              Projects
            </Link>
          </Button>
        </div>

        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
          <Link href="/recruiter/" className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors">
            <Briefcase className="w-3.5 h-3.5" /> Recruiter Briefing
          </Link>
          <Link href="/judge/" className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors">
            <Trophy className="w-3.5 h-3.5" /> Judge Evaluation
          </Link>
        </div>
      </div>
    </div>
  );
}

