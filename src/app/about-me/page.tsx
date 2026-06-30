"use client";

import { motion } from "framer-motion";
import { Quote, Target, Brain, ShieldCheck, Rocket, BookOpen } from "lucide-react";

export default function AboutMePage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-24">
        
        {/* Branding Statement */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <div className="relative inline-block">
            <Quote className="absolute -top-6 -left-8 w-12 h-12 text-primary/20 rotate-180" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              I build AI-powered systems that are scalable, accessible, secure, and solve real-world problems.
            </h1>
            <Quote className="absolute -bottom-8 -right-8 w-12 h-12 text-primary/20" />
          </div>
        </motion.section>

        {/* Professional Story */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Professional Story
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <p>
              My journey began at the intersection of complex data and human-centric design. Early on, I realized that building powerful machine learning models was only half the equation. If the end-user—whether an engineer debugging a digital twin or a senior citizen filing a grievance—couldn't interface with the technology intuitively, the innovation was lost.
            </p>
            <p>
              This realization drove me to specialize as a Full-Stack AI Engineer with a rare, deep focus on Accessibility Engineering. I don't just fine-tune transformers; I build the robust, accessible, and highly-performant microservices that deliver their insights to the world.
            </p>
          </div>
        </motion.section>

        {/* Philosophies Grid */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div variants={fadeIn} className="bg-card border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Engineering Philosophy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Performance and architecture are not afterthoughts. I believe in designing deterministic, highly scalable systems from day one. Microservices should be independently deployable, and frontend applications must be blazingly fast. Every millisecond counts.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-card border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">AI Philosophy</h3>
            <p className="text-muted-foreground leading-relaxed">
              AI should augment, not obscure. I focus on developing transparent AI systems where latency is minimized, and hallucinations are mitigated through strict RAG pipelines and deterministic grounding. AI is a tool, and its integration must be seamless and trustworthy.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-card border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Accessibility Philosophy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Accessibility is an architectural requirement, not a patch applied at the end. An interface that isn't usable by everyone is a broken interface. I rigorously adhere to WCAG 2.1 standards, ensuring screen-reader compatibility, keyboard navigation, and cognitive clarity.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-card border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Career Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              My vision is to lead engineering teams that tackle grand challenges—systems that require massive scale, profound AI insights, and zero-compromise UX. I aim to bridge the gap between AI research and production-grade software engineering.
            </p>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}
