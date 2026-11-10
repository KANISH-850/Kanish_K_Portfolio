"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Trophy } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 400);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`fixed bottom-6 right-6 z-50 ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <Link href="/#projects">
        <button
          type="button"
          aria-label="Jump to featured engineering projects"
          className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs tracking-wider uppercase shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Featured Projects</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

          {/* Subtle ring */}
          <span className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors pointer-events-none" />
        </button>
      </Link>
    </motion.div>
  );
}
