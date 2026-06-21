"use client";

import { motion } from "framer-motion";
import MotionWrap from "./motion-wrap";

const impactStats = [
  { label: "Major Projects Built", value: "4+" },
  { label: "AI/ML Models Deployed", value: "6" },
  { label: "GitHub Contributions", value: "250+" },
  { label: "Accessibility Features", value: "15+" },
  { label: "Hackathons Participated", value: "3" },
  { label: "Core Technologies", value: "12+" }
];

export function ImpactDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 border-b border-border/50 bg-muted/5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <MotionWrap>
          <div className="text-center mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              Engineering Impact Dashboard
            </h2>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {impactStats.map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center shadow-lg hover:bg-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-3xl font-bold font-headline bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </MotionWrap>
      </div>
    </section>
  );
}
