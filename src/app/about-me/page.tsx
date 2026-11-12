"use client";

import { motion } from "framer-motion";
import { Quote, Target, Brain, Server, Rocket, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutMePage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-foreground py-16 px-4 md:px-8 lg:px-24 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Back Link */}
        <Button variant="ghost" asChild className="text-slate-400 hover:text-cyan-400 -ml-4">
          <Link href="/#about">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Overview
          </Link>
        </Button>

        {/* Branding Statement */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="relative inline-block max-w-full">
            <Quote className="hidden sm:block absolute -top-6 -left-8 w-12 h-12 text-primary/20 rotate-180" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-300 to-accent font-headline">
              Building intelligent systems that solve real-world problems through AI and machine learning.
            </h1>
            <Quote className="hidden sm:block absolute -bottom-8 -right-8 w-12 h-12 text-primary/20" />
          </div>
          <p className="text-sm font-mono text-cyan-400 uppercase tracking-widest">
            AI Engineer &bull; Applied Machine Learning &bull; Backend Systems &bull; Python &amp; TypeScript
          </p>
        </motion.section>

        {/* Professional Story */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="space-y-6 glass-panel p-8 rounded-3xl border border-white/10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-white">
            <BookOpen className="w-7 h-7 text-primary" />
            Academic Background & Engineering Approach
          </h2>
          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Currently a 3rd-year B.E. Computer Science and Engineering undergraduate at Bannari Amman Institute of Technology (Class of 2028, CGPA 7.73/10), I focus on connecting machine learning modeling and empirical evaluation with maintainable backend software engineering.
            </p>
            <p>
              Across national hackathons and collaborative repositories—including Team Oceanberg&apos;s <span className="text-cyan-400 font-medium">Smart India Hackathon 2025 1st Place</span> substation monitoring prototype, the <span className="text-purple-400 font-medium">C-DAC SUVIDHA Runner-up</span> urban kiosk platform, and applied ML/RAG systems—I emphasize honest held-out metrics, clear human review boundaries, and reproducible FastAPI/Express services.
            </p>
          </div>
        </motion.section>

        {/* Philosophies Grid */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div variants={fadeIn} className="glass-panel border-white/10 rounded-2xl p-7 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Engineering Philosophy</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Resilience and low latency are non-negotiable. I believe in designing deterministic, scalable architectures from day one. Ingestion workers, telemetry brokers, and inference microservices must be decoupled to sustain peak operational bursts without UI degradation.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="glass-panel border-white/10 rounded-2xl p-7 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Machine Learning Philosophy</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Models must be grounded in empirical validation rather than opaque promises. I focus on calibrated, inspectable models (such as Random Forest, One-Class SVM, XGBoost, TF-IDF routers, and lightweight MobileNetV3-Small) paired with held-out error analysis and human review gates.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="glass-panel border-white/10 rounded-2xl p-7 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-4">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Telemetry & Systems Architecture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Industrial IoT and edge deployments demand offline tolerance. Architectural designs incorporating asynchronous buffering (SQLite / Redis) and reverse tunneling patterns help disconnected devices recover reliably.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="glass-panel border-white/10 rounded-2xl p-7 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-4">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Career Vision</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              To architect and scale next-generation AI platforms that convert complex telemetry and multimodal data streams into automated operational intelligence, driving measurable efficiency across industry and public infrastructure.
            </p>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}
