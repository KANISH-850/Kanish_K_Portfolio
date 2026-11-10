import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import { engineeringNotes } from "@/data/notes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Engineering Notes",
  description:
    "Technical notes on Digital Twins, multilingual NLP pipelines, anomaly detection benchmarks, and systems architecture by Kanish K.",
  alternates: {
    canonical: "https://KANISH-850.github.io/Kanish_K_Portfolio/notes/",
  },
  openGraph: {
    title: "Engineering Notes | Kanish K",
    description:
      "Technical architecture and ML engineering notes grounded in Kanish K's verified projects.",
    url: "https://KANISH-850.github.io/Kanish_K_Portfolio/notes/",
    images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
  },
};

export default function EngineeringNotesPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-foreground py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <Button variant="ghost" asChild className="text-slate-400 hover:text-cyan-400 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>
        </Button>

        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
            <BookOpen className="w-3.5 h-3.5" />
            Engineering Notes
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Technical Writing &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
              Architecture Notes
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Concise engineering write-ups documenting real architectural decisions, model trade-offs, and system lessons from verified projects.
          </p>
        </header>

        <div className="grid gap-6">
          {engineeringNotes.map((note) => (
            <article
              key={note.slug}
              className="glass-panel rounded-2xl border border-white/10 hover:border-primary/40 transition-all p-6 sm:p-8 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="outline" className="text-[11px] font-mono text-cyan-300 border-cyan-500/30 bg-cyan-500/10">
                  {note.category}
                </Badge>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {note.publishedAt}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {note.readingTime}
                  </span>
                </div>
              </div>

              <h2 className="font-headline text-xl sm:text-2xl font-bold text-white">
                <Link href={`/notes/${note.slug}/`} className="hover:text-cyan-400 transition-colors">
                  {note.title}
                </Link>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">{note.summary}</p>

              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/projects/${note.relatedProjectSlug}/`}
                  className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Related Project: {note.relatedProjectTitle}
                </Link>
                <Button variant="link" className="p-0 h-auto text-primary font-mono text-xs" asChild>
                  <Link href={`/notes/${note.slug}/`}>
                    Read Note <ArrowRight className="ml-1 w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

