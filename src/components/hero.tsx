"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Terminal, Code2, Trophy, Cpu } from 'lucide-react';

export function Hero() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const stats = [
    { icon: Terminal, label: "4+ Major Projects", value: "Deployed" },
    { icon: Trophy, label: "Hackathons", value: "Winner/Finalist" },
    { icon: Cpu, label: "AI Models", value: "Trained & Tuned" },
    { icon: Code2, label: "100+ Commits", value: "Open Source" },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div 
        className="container relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-left space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              AI & Machine Learning Engineer
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              Architecting <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Intelligent Systems
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Building scalable AI solutions, advancing Natural Language Processing, and engineering accessible, high-performance web applications.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]" asChild>
                <Link href="#projects">View Case Studies</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-border hover:bg-accent/10" asChild>
                <Link href="#contact">Let's Talk</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Visual/Stats */}
          <motion.div variants={itemVariants} className="relative">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-card border border-white/5 shadow-xl backdrop-blur-sm flex flex-col gap-4"
                >
                  <div className="p-3 bg-accent/10 w-fit rounded-lg">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-xl md:text-2xl text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Glowing decorative dot */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
