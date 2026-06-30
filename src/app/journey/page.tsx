"use client";

import { motion } from "framer-motion";
import { timelineData } from "@/data/timeline";
import { Calendar, Code2, Rocket, Trophy, Target } from "lucide-react";

export default function JourneyPage() {
  const getIcon = (category: string) => {
    switch (category) {
      case 'learning': return <Code2 className="w-5 h-5" />;
      case 'project': return <Rocket className="w-5 h-5" />;
      case 'hackathon': return <Trophy className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 lg:px-24 overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-16 relative">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Engineering Timeline</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A chronological journey of continuous learning, building, and scaling.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0 md:pl-0">
          {timelineData.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="mb-12 ml-8 md:ml-12 relative group"
            >
              {/* Timeline dot */}
              <span className="absolute flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full -left-[56px] md:-left-[72px] ring-4 ring-background text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {getIcon(event.category)}
              </span>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Year Marker */}
                <div className="flex-shrink-0 pt-1">
                  <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <Calendar className="w-5 h-5" />
                    {event.year}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-card border rounded-xl p-6 flex-1 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2">{event.achievement}</h3>
                  <p className="text-muted-foreground mb-4">{event.outcome}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {event.technologyLearned.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
