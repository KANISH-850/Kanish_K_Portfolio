import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, Layers } from "lucide-react";
import { engineeringNotes, notesBySlug } from "@/data/notes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return engineeringNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notesBySlug[slug];
  if (!note) return { title: "Note Not Found" };

  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: `https://KANISH-850.github.io/Kanish_K_Portfolio/notes/${note.slug}/`,
    },
    openGraph: {
      type: "article",
      title: `${note.title} | Kanish K`,
      description: note.summary,
      url: `https://KANISH-850.github.io/Kanish_K_Portfolio/notes/${note.slug}/`,
      images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
    },
  };
}

export default async function EngineeringNoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notesBySlug[slug];
  if (!note) notFound();

  return (
    <article className="min-h-screen bg-[#030712] text-foreground py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-3xl mx-auto space-y-10">
        <Button variant="ghost" asChild className="text-slate-400 hover:text-cyan-400 -ml-4">
          <Link href="/notes/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Engineering Notes
          </Link>
        </Button>

        <header className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="text-[11px] font-mono text-cyan-300 border-cyan-500/30 bg-cyan-500/10">
              {note.category}
            </Badge>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {note.publishedAt}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {note.readingTime}
            </span>
          </div>

          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {note.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{note.summary}</p>
        </header>

        <div className="space-y-10">
          {note.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">{section.heading}</h2>
              {section.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <footer className="pt-8 border-t border-white/10">
          <div className="glass-panel rounded-2xl border border-white/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-primary" /> Related System Case Study
              </div>
              <div className="text-base font-bold text-white">{note.relatedProjectTitle}</div>
            </div>
            <Button asChild className="bg-primary text-slate-950 hover:bg-cyan-300 font-bold shrink-0">
              <Link href={`/projects/${note.relatedProjectSlug}/`}>
                View Case Study <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </article>
  );
}

