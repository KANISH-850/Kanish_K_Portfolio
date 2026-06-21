"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-8 right-8 z-50 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <Link href="/projects/aazhi-suvidhaa">
        <button className="group relative flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300">
          <Star className="w-4 h-4 fill-primary-foreground" />
          <span>VIEW MY BEST PROJECT</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          
          {/* Glowing ring effect */}
          <span className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/50 transition-colors" />
        </button>
      </Link>
    </motion.div>
  );
}
