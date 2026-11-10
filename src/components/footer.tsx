"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { socialLinks, email, navItems } from "@/lib/config";
import { ArrowUp, Sparkles, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030712] border-t border-white/[0.08] text-foreground relative z-10">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/[0.06] items-start">
          {/* Brand & Positioning */}
          <div className="md:col-span-5 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-headline font-black text-lg tracking-tight group"
            >
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-accent flex items-center justify-center text-slate-950 font-black text-sm shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
                K
              </span>
              <span className="font-bold tracking-tight">
                Kanish <span className="text-cyan-400">K</span>
              </span>
            </Link>
            <p className="text-xs font-mono text-cyan-400">
              AI Engineer &bull; Machine Learning &bull; Deep Learning &bull; Generative AI
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Architecting production-grade machine learning pipelines, digital twins, and distributed systems.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold block">
              Quick Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={`/${item.href}`}
                  className="text-slate-400 hover:text-cyan-400 transition-colors py-1"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/recruiter"
                className="text-slate-400 hover:text-cyan-400 transition-colors py-1"
              >
                Recruiter Brief
              </Link>
              <Link
                href="/judge"
                className="text-slate-400 hover:text-cyan-400 transition-colors py-1"
              >
                Judge Mode
              </Link>
            </div>
          </div>

          {/* Social Presence & Direct Contact */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold block">
              Connect & Verify
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 glass-panel hover:bg-white/[0.08] hover:text-cyan-400 text-slate-300 border border-white/5 rounded-xl"
                  asChild
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-cyan-400 transition-colors pt-1"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{email}</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p className="text-center sm:text-left">
            &copy; {year} <span className="text-slate-200 font-semibold">Kanish K</span>. All rights reserved.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="h-8 px-3 text-xs font-mono text-slate-400 hover:text-cyan-400 hover:bg-white/[0.05] gap-1.5 rounded-lg"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
