"use client";

import { motion } from "framer-motion";
import { researchData } from "@/data/research";
import { Microscope, ArrowRight, BookOpen, Target, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResearchPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Microscope className="w-4 h-4" />
            Research & Innovation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Exploring the Frontier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My active areas of study, prototyping, and academic interest. I believe the best engineers are perpetually learning.
          </p>
        </motion.div>

        {/* Research Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {researchData.map((area, idx) => (
            <motion.div
              key={area.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">{area.title}</CardTitle>
                  <p className="text-muted-foreground mt-2">{area.description}</p>
                </CardHeader>
                <CardContent className="flex-1 space-y-6">
                  
                  {/* Current Learning */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2 text-primary">
                      <BookOpen className="w-4 h-4" /> Current Learning
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {area.currentLearning.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-primary/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Future Goals */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2 text-primary">
                      <Target className="w-4 h-4" /> Future Goals
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {area.futureGoals.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-primary/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applied Projects */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2 text-primary">
                      <LinkIcon className="w-4 h-4" /> Applied In Projects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {area.projects.map(project => (
                        <Badge key={project} variant="secondary">{project}</Badge>
                      ))}
                    </div>
                  </div>

                </CardContent>
                <div className="p-6 pt-0 mt-auto border-t bg-muted/20">
                  <p className="text-sm italic text-muted-foreground mt-4">
                    <span className="font-semibold not-italic text-foreground">Direction:</span> {area.researchDirection}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
