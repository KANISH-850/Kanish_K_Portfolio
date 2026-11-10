"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Trophy, Lightbulb, ShieldCheck, Zap, Code2, Users, Activity, Eye, Play } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/data/projects";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function JudgePage() {
  const router = useRouter();
  const projects = Array.from(new Map(Object.values(projectsData).map(p => [p.id, p])).values());

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8 lg:px-24">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Back Link */}
        <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>
        </Button>

        {/* Header */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Trophy className="w-4 h-4" />
            Hackathon Judge Evaluation Mode
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Rapid Project Assessment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Optimized for 3-minute evaluations. Discover problem statements, architectural innovations, security models, and scalability metrics instantly.
          </p>
        </motion.section>

        {/* Projects Breakdown */}
        <div className="space-y-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="border-2 overflow-hidden hover:border-primary/40 transition-colors">
                <CardHeader
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a, button")) return;
                    router.push(`/projects/${project.id}/`);
                  }}
                  className="bg-muted/50 border-b cursor-pointer group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl md:text-3xl">
                        <Link href={`/projects/${project.id}/`} className="hover:text-primary transition-colors">
                          {project.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-base mt-2">{project.tagline}</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      <Button className="gap-2" asChild>
                        <Link href={`/projects/${project.id}/`}>
                          Case Study <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <Button variant="secondary" className="gap-2" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Play className="w-4 h-4" /> Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <Button variant="outline" className="gap-2" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" /> Repository
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-b">
                    <div className="p-6 space-y-3">
                      <h4 className="font-semibold flex items-center gap-2 text-primary">
                        <Activity className="w-4 h-4" /> The Problem
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.problemStatement}
                      </p>
                    </div>
                    <div className="p-6 space-y-3">
                      <h4 className="font-semibold flex items-center gap-2 text-primary">
                        <Lightbulb className="w-4 h-4" /> Innovation
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.innovation || project.tagline}
                      </p>
                    </div>
                    <div className="p-6 space-y-3">
                      <h4 className="font-semibold flex items-center gap-2 text-primary">
                        <Users className="w-4 h-4" /> Impact & Team
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.impact || project.keyFeatures[0]}
                      </p>
                      <p className="text-xs font-medium bg-muted px-2 py-1 rounded inline-block">
                        Role: {project.teamContribution || "AI & Full-Stack Engineering"}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="architecture">
                        <AccordionTrigger className="text-base font-semibold hover:text-primary">
                          <div className="flex items-center gap-2"><Code2 className="w-5 h-5" /> Technical Architecture & Data Flow</div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 text-muted-foreground pt-4">
                          <p><strong>Architecture:</strong> {project.systemArchitecture}</p>
                          <p><strong>Data Flow:</strong> {project.dataFlow}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.map(tech => (
                              <Badge key={tech} variant="secondary">{tech}</Badge>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="accessibility-security">
                        <AccordionTrigger className="text-base font-semibold hover:text-primary">
                          <div className="flex items-center gap-2"><Eye className="w-5 h-5" /> Accessibility, Security & Scalability</div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-foreground mb-2 flex items-center gap-2"><Eye className="w-4 h-4" /> Accessibility</h5>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              {project.accessibilityMeasures.map((measure, i) => <li key={i}>{measure}</li>)}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-foreground mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Security</h5>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              {project.securityFeatures.map((feature, i) => <li key={i}>{feature}</li>)}
                            </ul>
                          </div>
                          <div className="md:col-span-2">
                             <h5 className="font-medium text-foreground mb-2 flex items-center gap-2"><Zap className="w-4 h-4" /> Scalability & Performance</h5>
                             <p className="text-sm text-muted-foreground">
                               {project.scalability || project.systemArchitecture}
                             </p>
                             <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                              {project.performanceMetrics.map((metric, i) => <li key={i}>{metric}</li>)}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
