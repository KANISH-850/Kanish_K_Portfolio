"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, ExternalLink, Github, Linkedin, Briefcase, Award, Code2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/data/projects";
import { cvUrl, showResume, resumeRequestMailto, email, socialLinks } from "@/lib/config";
import Link from "next/link";

export default function RecruiterPage() {
  const topProjects = [
    projectsData["digital-twin-ehv"],
    projectsData["kiosk-management-system"]
  ].filter(Boolean);

  const linkedinUrl = socialLinks.find(l => l.label === "LinkedIn")?.href || "https://www.linkedin.com/in/kanish-k-558694251/";
  const githubUrl = socialLinks.find(l => l.label === "GitHub")?.href || "https://github.com/KANISH-850";

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-foreground py-16 px-4 md:px-8 lg:px-24">
      {/* Quick Navigation Panel (Sticky) */}
      <div className="fixed top-24 right-8 hidden xl:flex flex-col gap-4 border-l pl-4 border-white/10 text-xs font-mono">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Nav</span>
        <a href="#summary" className="text-slate-400 hover:text-cyan-400 transition-colors">Summary</a>
        <a href="#skills" className="text-slate-400 hover:text-cyan-400 transition-colors">Core Skills</a>
        <a href="#projects" className="text-slate-400 hover:text-cyan-400 transition-colors">Top Projects</a>
        <a href="#achievements" className="text-slate-400 hover:text-cyan-400 transition-colors">Achievements</a>
      </div>

      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Back Link */}
        <Button variant="ghost" asChild className="text-slate-400 hover:text-cyan-400 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>
        </Button>

        {/* Header / Summary */}
        <motion.section 
          id="summary"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
            <Briefcase className="w-3.5 h-3.5" />
            Recruiter 60-Second Briefing
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white font-headline">
            Kanish <span className="text-cyan-400">K</span>
          </h1>
          <h2 className="text-lg md:text-xl text-cyan-300 font-mono font-medium">
            AI Engineer | Machine Learning | Deep Learning | Generative AI | NLP | Python | DSA
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-300 max-w-2xl">
            Building intelligent, resilient software systems that bridge mathematical model formulation with production-grade telemetry pipelines and distributed microservices. Grand finale winner of Smart India Hackathon and runner-up in CDAC national innovation challenges.
          </p>
          
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Button size="lg" className="bg-primary text-slate-950 hover:bg-cyan-300 font-bold gap-2" asChild>
              <a
                href={showResume ? cvUrl : resumeRequestMailto}
                target={showResume ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4" />
                {showResume ? "Download Resume / CV" : "Request Resume / CV"}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="glass-panel text-white hover:text-cyan-400 border-white/20 gap-2" asChild>
              <a href={`mailto:${email}`}>
                <Mail className="w-4 h-4 text-cyan-400" />
                Contact Directly
              </a>
            </Button>
            <Button size="icon" variant="outline" className="glass-panel border-white/10 text-slate-300 hover:text-cyan-400" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button size="icon" variant="outline" className="glass-panel border-white/10 text-slate-300 hover:text-cyan-400" asChild>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
              </a>
            </Button>
          </div>
        </motion.section>

        {/* Core Competencies */}
        <motion.section 
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Code2 className="w-6 h-6 text-primary" />
            Core Technical Competencies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Python / NumPy / Pandas",
              "PyTorch / TensorFlow",
              "Deep Autoencoders & ML",
              "Generative AI & LLMs",
              "IndicTrans2 & NLP",
              "Data Structures & Algorithms",
              "FastAPI / WebSockets",
              "Docker / InfluxDB / PostgreSQL"
            ].map((skill, i) => (
              <Card key={i} className="glass-panel border-white/10 text-slate-200">
                <CardContent className="p-3.5 flex items-center justify-center text-center font-mono text-xs sm:text-sm h-full">
                  {skill}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Top Flagship Projects */}
        <motion.section 
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold text-white">Flagship Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topProjects.map((project) => (
              <Card key={project.id} className="glass-panel border-white/10 flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] font-mono text-cyan-400 border-cyan-400/30">
                      {project.achievement || "Flagship"}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                  <CardDescription className="text-xs text-cyan-300 font-mono">{project.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.problemStatement}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map(tech => (
                      <Badge key={tech} variant="secondary" className="glass-panel text-slate-300 text-[11px] font-mono border-white/10">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-white/[0.06]">
                  <Button variant="link" className="p-0 h-auto font-semibold gap-1 text-primary hover:text-cyan-300" asChild>
                    <Link href={`/projects/${project.id}`}>
                      System Case Study <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Verified Achievements */}
        <motion.section 
          id="achievements"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Trophy className="w-6 h-6 text-amber-400" />
            Verified Honors & System Benchmarks
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="glass-panel border-white/10 text-center">
              <CardContent className="p-6 space-y-2">
                <div className="text-3xl font-black text-amber-400 font-headline">1st Place</div>
                <div className="text-xs font-mono text-white font-bold">Smart India Hackathon Winner</div>
                <div className="text-[11px] text-slate-400 font-mono">Grand Finale National Winner</div>
              </CardContent>
            </Card>
            <Card className="glass-panel border-white/10 text-center">
              <CardContent className="p-6 space-y-2">
                <div className="text-3xl font-black text-cyan-400 font-headline">Runner-up</div>
                <div className="text-xs font-mono text-white font-bold">CDAC Innovation Challenge</div>
                <div className="text-[11px] text-slate-400 font-mono">Kiosk Fleet Telemetry Platform</div>
              </CardContent>
            </Card>
            <Card className="glass-panel border-white/10 text-center">
              <CardContent className="p-6 space-y-2">
                <div className="text-3xl font-black text-emerald-400 font-headline">~50ms</div>
                <div className="text-xs font-mono text-white font-bold">Target Anomaly Latency</div>
                <div className="text-[11px] text-slate-400 font-mono">Internal Benchmark Target</div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
