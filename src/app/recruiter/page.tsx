"use client";

import { motion } from "framer-motion";
import { Download, Mail, ExternalLink, Github, Linkedin, Briefcase, Award, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/data/projects";

export default function RecruiterPage() {
  const topProjects = [projectsData["aazhi-suvidhaa"], projectsData["digital-twin-ehv"]];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 md:px-8 lg:px-24">
      {/* Quick Navigation Panel (Sticky) */}
      <div className="fixed top-24 right-8 hidden xl:flex flex-col gap-4 border-l pl-4 border-muted">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quick Nav</span>
        <a href="#summary" className="text-sm hover:text-primary transition-colors">Summary</a>
        <a href="#skills" className="text-sm hover:text-primary transition-colors">Core Skills</a>
        <a href="#projects" className="text-sm hover:text-primary transition-colors">Top Projects</a>
        <a href="#stats" className="text-sm hover:text-primary transition-colors">GitHub Stats</a>
      </div>

      <div className="max-w-4xl mx-auto space-y-24">
        
        {/* Header / Summary */}
        <motion.section 
          id="summary"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Briefcase className="w-4 h-4" />
            Recruiter 60-Second Overview
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Kanish K.
          </h1>
          <h2 className="text-2xl text-muted-foreground font-medium">
            Full-Stack AI Engineer & Accessibility Advocate
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            I build highly scalable AI-powered systems with a strict focus on accessibility (100 WCAG), performance, and security. Experienced in deploying microservices and production LLM wrappers.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="gap-2">
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Mail className="w-4 h-4" />
              Contact Me
            </Button>
            <Button size="icon" variant="ghost">
              <Github className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>
        </motion.section>

        {/* Core Skills */}
        <motion.section 
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            Core Competencies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "TypeScript / React / Next.js",
              "Python / FastAPI / TensorFlow",
              "PostgreSQL / Redis / InfluxDB",
              "Docker / GCP / GitHub Actions",
              "WCAG 2.1 / ARIA",
              "LLM Deployment & RAG",
              "Microservices Architecture",
              "Performance Optimization"
            ].map((skill, i) => (
              <Card key={i} className="bg-card/50 border-muted">
                <CardContent className="p-4 flex items-center justify-center text-center font-medium text-sm h-full">
                  {skill}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Top Projects */}
        <motion.section 
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold">Top Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topProjects.map((project) => (
              project && (
                <Card key={project.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.tagline}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground">{project.problemStatement}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map(tech => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Button variant="link" className="p-0 h-auto font-semibold gap-1">
                      View Deep Dive <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              )
            ))}
          </div>
        </motion.section>

        {/* GitHub Stats & Achievements */}
        <motion.section 
          id="stats"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Impact & Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl font-black text-primary">100</div>
                <div className="text-sm font-medium">Lighthouse Score</div>
                <div className="text-xs text-muted-foreground">Accessibility & Perf</div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl font-black text-primary">1st</div>
                <div className="text-sm font-medium">Hackathon Winner</div>
                <div className="text-xs text-muted-foreground">National Level</div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-4xl font-black text-primary">&lt;50ms</div>
                <div className="text-sm font-medium">Inference Latency</div>
                <div className="text-xs text-muted-foreground">ML Optimization</div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
