"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cvUrl, email, socialLinks, navItems } from "@/lib/config";
import { Menu, Sparkles, Download, Copy, Check } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast({
      title: "Email Copied!",
      description: "kanishkgins@gmail.com has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const desktopNav = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#achievements", label: "Achievements" },
    { href: "#experience", label: "Journey" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6"
      >
        {/* Brand / Logo */}
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
          <span className="text-[10px] font-mono text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded border border-white/10 hidden sm:inline">
            AI Engineer
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-white/10">
          {desktopNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-mono font-medium text-slate-300 hover:text-cyan-400 px-3 py-1 rounded-full transition-colors hover:bg-white/[0.05]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Desktop Utilities */}
        <div className="hidden md:flex items-center gap-2.5">
          <Button
            size="sm"
            variant="ghost"
            onClick={copyEmail}
            className="h-8 px-2.5 text-xs font-mono glass-panel text-slate-300 hover:text-cyan-400 border border-white/10 gap-1.5"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>Email</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            asChild
            className="h-8 px-3 text-xs font-mono glass-panel text-white hover:text-cyan-400 border-white/20 gap-1.5 hover:border-primary/50"
          >
            <a href={cvUrl} target="_blank" rel="noopener noreferrer">
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </a>
          </Button>

          <div className="pl-1">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 glass-panel border-white/10"
              >
                <Menu className="w-4 h-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-slate-950/95 backdrop-blur-2xl border-white/10 text-white"
            >
              <div className="flex flex-col h-full py-6 space-y-6">
                <div>
                  <h3 className="font-headline font-bold text-lg text-white">
                    Kanish K
                  </h3>
                  <p className="text-xs font-mono text-cyan-400">
                    AI Engineer &bull; Deep Learning &bull; Generative AI
                  </p>
                </div>

                <nav className="flex flex-col gap-3">
                  {desktopNav.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1 border-b border-white/[0.04]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyEmail}
                    className="w-full justify-start glass-panel border-white/10 text-xs font-mono"
                  >
                    <Copy className="mr-2 h-3.5 w-3.5" />
                    Copy Email Address
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full justify-start glass-panel border-white/10 text-xs font-mono"
                  >
                    <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-3.5 w-3.5 text-cyan-400" />
                      Download Resume / CV
                    </a>
                  </Button>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 flex flex-wrap gap-2 text-xs font-mono">
                  {socialLinks.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-panel px-3 py-1 rounded text-slate-300 hover:text-cyan-400 border border-white/10"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </header>
  );
}
