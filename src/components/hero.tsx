"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  Cpu,
  Terminal,
  Github,
  Linkedin,
  Download,
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";
import { cvUrl, showResume, socialLinks } from "@/lib/config";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const verifiedHighlights = [
    {
      icon: Trophy,
      title: "Smart India Hackathon",
      detail: "1st Place National Winner",
      subtext: "Digital Twin of EHV Substation"
    },
    {
      icon: Award,
      title: "CDAC Challenge",
      detail: "National Runner-up",
      subtext: "Kiosk Management System"
    },
    {
      icon: Cpu,
      title: "Production AI Systems",
      detail: "4 Full Architectures",
      subtext: "NLP, Vision, Anomaly, Telemetry"
    },
    {
      icon: Terminal,
      title: "Core Stack",
      detail: "Python, PyTorch, FastAPI",
      subtext: "Next.js, TypeScript, PostgreSQL"
    }
  ];

  const githubLink = socialLinks.find(l => l.label === "GitHub")?.href || "https://github.com/KANISH-850";
  const linkedinLink = socialLinks.find(l => l.label === "LinkedIn")?.href || "https://www.linkedin.com/in/kanish-k-558694251/";

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden flex items-center min-h-[90vh]">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        className="container max-w-6xl mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Positioning & Bio */}
          <div className="lg:col-span-7 text-left space-y-6">

            {/* Status & Position Badge */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Kanish K &bull; AI Engineer
              </span>
              <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
                Machine Learning &bull; Deep Learning &bull; Generative AI &bull; NLP
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Building Robust, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">
                Intelligent Applications
              </span>
            </motion.h1>

            {/* Professional Introduction Statement */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
            >
              I build intelligent applications by combining artificial intelligence, machine learning, and full-stack engineering to solve real-world problems.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-7 text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30" asChild>
                <Link href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              {showResume && (
                <Button size="lg" variant="outline" className="h-12 px-7 text-sm font-semibold border-border hover:bg-accent/10 hover:text-accent" asChild>
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 w-4 h-4" />
                    Download Resume
                  </a>
                </Button>
              )}

              <div className="flex items-center gap-2 pl-2 border-l border-border/50">
                <Button size="icon" variant="ghost" className="h-10 w-10 text-muted-foreground hover:text-foreground" asChild>
                  <a href={githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="h-10 w-10 text-muted-foreground hover:text-foreground" asChild>
                  <a href={linkedinLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Verified Engineering Highlights Grid */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {verifiedHighlights.map((hl) => (
                <div
                  key={hl.title}
                  className="p-5 rounded-2xl bg-card/70 border border-white/10 backdrop-blur-sm shadow-md hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                      <hl.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Verified</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block font-mono">{hl.title}</span>
                    <h3 className="font-bold text-base text-foreground mt-0.5">{hl.detail}</h3>
                    <p className="text-[11px] text-muted-foreground/80 mt-1 leading-snug">{hl.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle glow accents */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/15 rounded-full blur-2xl pointer-events-none" />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
