"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Mail,
  Trophy,
  Award,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cvUrl, socialLinks } from "@/lib/config";
import { Hero3DScene } from "./hero-3d-scene";
import { useToast } from "@/hooks/use-toast";

export function Hero() {
  const { toast } = useToast();

  const handleResumeDownload = () => {
    // Open resume or notify if pending custom PDF drop
    window.open(cvUrl, "_blank");
    toast({
      title: "Opening Resume / CV",
      description: "Direct academic and technical CV for Kanish K.",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const verifiedAchievements = [
    {
      icon: Trophy,
      title: "SIH Winner",
      subtitle: "1st Place National Finale",
      accent: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    },
    {
      icon: Award,
      title: "CDAC Runner-up",
      subtitle: "National Challenge",
      accent: "text-primary border-primary/30 bg-primary/10",
    },
    {
      icon: Cpu,
      title: "Production AI",
      subtitle: "Digital Twins & NLP",
      accent: "text-accent border-accent/30 bg-accent/10",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#030712] text-foreground">
      {/* 3D Interactive Three.js Neural Network Canvas */}
      <Hero3DScene />

      {/* Cyber Grid & Ambient Gradient Overlays */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20 -z-10" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Radial fade to preserve text contrast over 3D scene */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030712]/60 to-[#030712] pointer-events-none -z-10" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Top Status Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-xs font-mono tracking-wider uppercase border border-white/10 shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-foreground/90 font-medium">Available for AI Engineering Roles</span>
            <span className="text-muted-foreground/60">&bull;</span>
            <span className="text-primary font-bold">2026 Ready</span>
          </motion.div>

          {/* Main Heading: Kanish K */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-primary/90 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Next-Gen Systems &bull; Deep Learning Architecture</span>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>

            <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white">
              Kanish{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent drop-shadow-[0_0_35px_rgba(0,240,255,0.35)]">
                K
              </span>
            </h1>

            {/* Professional Title */}
            <p className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-slate-200">
              AI Engineer{" "}
              <span className="text-primary font-light px-1">|</span> Machine
              Learning <span className="text-primary font-light px-1">|</span>{" "}
              Deep Learning <span className="text-primary font-light px-1">|</span>{" "}
              Generative AI
            </p>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Building intelligent systems that solve real-world problems through
            AI, machine learning, and emerging technologies.
          </motion.p>

          {/* Glowing Interactive CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            {/* CTA 1: Explore My Work */}
            <Button
              size="lg"
              className="relative group overflow-hidden bg-primary text-slate-950 font-bold px-8 h-12 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all duration-300 hover:scale-[1.02] border border-cyan-300/40"
              asChild
            >
              <Link href="#projects">
                <span className="relative z-10 flex items-center gap-2">
                  Explore My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>

            {/* CTA 2: Download Resume */}
            <Button
              size="lg"
              variant="outline"
              onClick={handleResumeDownload}
              className="glass-panel text-white font-semibold px-7 h-12 rounded-xl border-white/20 hover:border-primary/60 hover:bg-white/[0.08] hover:text-primary transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              <Download className="mr-2 w-4 h-4 text-primary" />
              Download Resume
            </Button>

            {/* CTA 3: Contact Me */}
            <Button
              size="lg"
              variant="outline"
              className="glass-panel text-white font-semibold px-7 h-12 rounded-xl border-white/20 hover:border-accent/60 hover:bg-accent/10 hover:text-accent transition-all duration-300 hover:scale-[1.02] shadow-lg"
              asChild
            >
              <Link href="#contact">
                <Mail className="mr-2 w-4 h-4 text-accent" />
                Contact Me
              </Link>
            </Button>
          </motion.div>

          {/* Verified Achievements Quick Badges */}
          <motion.div
            variants={itemVariants}
            className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto"
          >
            {verifiedAchievements.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="glass-panel p-3.5 rounded-xl border border-white/10 flex items-center gap-3 text-left hover:border-primary/40 transition-colors"
                >
                  <div className={`p-2 rounded-lg border ${item.accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide">
                      {item.title}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-auto"
      >
        <Link
          href="#about"
          className="group flex flex-col items-center gap-1.5 text-slate-400 hover:text-primary transition-colors"
          aria-label="Scroll to About Me section"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors">
            Scroll Down
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-primary flex items-start justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
