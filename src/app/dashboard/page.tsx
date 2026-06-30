"use client";

import { motion } from "framer-motion";
import { Activity, GitMerge, Code2, Microscope, ShieldCheck, Zap, Server, Eye, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projectsData } from "@/data/projects";
import { InteractiveSkillsMatrix } from "@/components/interactive-skills-matrix";

export default function DashboardPage() {
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const projectCount = Object.keys(projectsData).length;

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              Command Center
            </h1>
            <p className="text-muted-foreground mt-2">Real-time overview of portfolio metrics and engineering activities.</p>
          </div>
          <div className="text-sm font-mono bg-muted/50 px-4 py-2 rounded-md">
            Status: <span className="text-green-500">All Systems Operational</span>
          </div>
        </div>

        {/* Top KPI Row */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          <motion.div variants={fadeIn}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lighthouse Score</CardTitle>
                <Zap className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100/100</div>
                <p className="text-xs text-muted-foreground">Perf & Access.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Major Projects</CardTitle>
                <FileText className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projectCount}</div>
                <p className="text-xs text-muted-foreground">Production Grade</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">GitHub Contributions</CardTitle>
                <GitMerge className="w-4 h-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,240+</div>
                <p className="text-xs text-muted-foreground">Last 12 months</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0 Active</div>
                <p className="text-xs text-muted-foreground">Dependabot Clear</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Skills Module */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Code2 className="w-5 h-5 text-primary" /> Core Stack</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span>TypeScript / React</span> <span>95%</span></div>
                <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-[95%]"></div></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span>Python / FastAPI</span> <span>90%</span></div>
                <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-[90%]"></div></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span>Docker / CI/CD</span> <span>85%</span></div>
                <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-[85%]"></div></div>
              </div>
            </CardContent>
          </Card>

          {/* Research Module */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Microscope className="w-5 h-5 text-primary" /> Active Research</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4 text-sm">
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> Building low-latency LLM inference engines.</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> Accessible charting architectures for screen readers.</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" /> Edge-deployment of quantized vision models.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Infrastructure Module */}
          <Card className="flex flex-col lg:col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Server className="w-5 h-5 text-primary" /> App Infrastructure</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 text-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-lg border text-center">
                  <div className="text-muted-foreground mb-1">Frontend</div>
                  <div className="font-semibold">Vercel Edge</div>
                </div>
                <div className="bg-muted p-3 rounded-lg border text-center">
                  <div className="text-muted-foreground mb-1">Database</div>
                  <div className="font-semibold">Supabase (PG)</div>
                </div>
                <div className="bg-muted p-3 rounded-lg border text-center">
                  <div className="text-muted-foreground mb-1">Compute</div>
                  <div className="font-semibold">GCP Cloud Run</div>
                </div>
                <div className="bg-muted p-3 rounded-lg border text-center">
                  <div className="text-muted-foreground mb-1">AI APIs</div>
                  <div className="font-semibold">Genkit / Gemini</div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Interactive Skills Matrix Section */}
        <div className="pt-12 border-t space-y-6">
          <div className="flex items-center gap-3">
            <Code2 className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">Interactive Skills Graph</h2>
          </div>
          <p className="text-muted-foreground">Explore my technical ecosystem. Click nodes to see relationships and project applications.</p>
          <div className="mt-8">
            <InteractiveSkillsMatrix />
          </div>
        </div>
      </div>
    </div>
  );
}
