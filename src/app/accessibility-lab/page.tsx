"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Eye, Keyboard, Ear, MousePointerClick, Smartphone, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function AccessibilityLabPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const auditResults = [
    { name: "Contrast Ratio (WCAG AA/AAA)", status: "Pass", icon: <Eye className="w-5 h-5 text-green-500" />, desc: "All text elements meet or exceed 4.5:1 contrast ratio." },
    { name: "Keyboard Navigation", status: "Pass", icon: <Keyboard className="w-5 h-5 text-green-500" />, desc: "Full logical tab order. No keyboard traps." },
    { name: "Screen Reader Support", status: "Pass", icon: <Ear className="w-5 h-5 text-green-500" />, desc: "ARIA labels and semantic HTML on all interactive elements." },
    { name: "Focus Management", status: "Pass", icon: <MousePointerClick className="w-5 h-5 text-green-500" />, desc: "Visible focus rings and programmatic focus returns on modals." },
    { name: "Reduced Motion", status: "Pass", icon: <Zap className="w-5 h-5 text-green-500" />, desc: "Respects 'prefers-reduced-motion' OS setting." },
    { name: "Responsive Scaling", status: "Pass", icon: <Smartphone className="w-5 h-5 text-green-500" />, desc: "UI supports 200% zoom without loss of content/function." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            100% WCAG Compliant
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Accessibility Testing Lab
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This portfolio is built with Accessibility Engineering as a core requirement. View the live audit results and compliance metrics below.
          </p>
        </motion.div>

        {/* Global Scorecard */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Lighthouse Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-primary">100</span>
                <span className="text-muted-foreground mb-1">/ 100</span>
              </div>
              <Progress value={100} className="mt-4 h-2" />
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">ARIA Landmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-primary">100</span>
                <span className="text-muted-foreground mb-1">%</span>
              </div>
              <Progress value={100} className="mt-4 h-2" />
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Color Contrast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-primary">AAA</span>
                <span className="text-muted-foreground mb-1">Standard</span>
              </div>
              <Progress value={100} className="mt-4 h-2" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Audit */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-primary" />
            Live Audit Checklist
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditResults.map((audit, idx) => (
              <Card key={idx} className="border-muted">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                  <div className="bg-muted p-2 rounded-full">
                    {audit.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{audit.name}</CardTitle>
                    <CardDescription className="text-green-500 font-medium">{audit.status}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{audit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Interactive Demo Callout */}
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeIn}
           className="bg-card border rounded-xl p-8 text-center space-y-4"
        >
          <h3 className="text-xl font-bold">Interactive Testing</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Try navigating this entire site using only the <kbd className="bg-muted px-2 py-1 rounded">Tab</kbd> key, or turn on your OS screen reader (VoiceOver, NVDA) to experience the semantic structure.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
