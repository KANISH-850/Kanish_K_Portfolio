"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileDown,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Briefcase,
  Code2,
  Trophy,
  GraduationCap,
  Copy,
  Check,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/data/projects";
import { timelineData } from "@/data/timeline";
import { resumeConfig, email, socialLinks, profile, whatsappUrl } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function RecruiterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const primaryProjects = [
    projectsData["digital-twin-ehv"],
    projectsData["kiosk-management-system"],
  ].filter(Boolean);

  const additionalProjects = [
    projectsData["intelligent-grievance-system"],
    projectsData["aquaguard-ai"],
  ].filter(Boolean);

  const linkedinUrl =
    socialLinks.find((l) => l.label === "LinkedIn")?.href ||
    "https://www.linkedin.com/in/kanish-k-558694251/";
  const githubUrl =
    socialLinks.find((l) => l.label === "GitHub")?.href ||
    "https://github.com/KANISH-850";

  const copyEmail = () => {
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    toast({
      title: "Email Copied",
      description: `${email} copied to clipboard.`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#030712] text-foreground py-16 px-4 md:px-8 lg:px-24">
      {/* Quick Navigation Panel (Sticky) */}
      <nav
        aria-label="Recruiter briefing quick navigation"
        className="fixed top-24 right-8 hidden xl:flex flex-col gap-4 border-l pl-4 border-white/10 text-xs font-mono"
      >
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Nav</span>
        <a href="#summary" className="text-slate-400 hover:text-cyan-400 transition-colors">Summary</a>
        <a href="#education" className="text-slate-400 hover:text-cyan-400 transition-colors">Education</a>
        <a href="#skills" className="text-slate-400 hover:text-cyan-400 transition-colors">Core Skills</a>
        <a href="#projects" className="text-slate-400 hover:text-cyan-400 transition-colors">Flagship Projects</a>
        <a href="#experience" className="text-slate-400 hover:text-cyan-400 transition-colors">Engineering Record</a>
        <a href="#achievements" className="text-slate-400 hover:text-cyan-400 transition-colors">Achievements</a>
      </nav>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Back Link */}
        <Button variant="ghost" asChild className="text-slate-400 hover:text-cyan-400 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>
        </Button>

        {/* 1. Header / Professional Introduction */}
        <motion.section
          id="summary"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
            <Briefcase className="w-3.5 h-3.5" />
            Recruiter 30-Second Briefing
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white font-headline">
            Kanish <span className="text-cyan-400">K</span>
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl text-cyan-300 font-mono font-medium">
            {profile.headline}
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-300 max-w-2xl">
            B.E. Computer Science Engineering candidate ({profile.graduationYear}) focused on AI/ML modeling, deep autoencoders, multilingual NLP pipelines, and Python/FastAPI backend systems. Smart India Hackathon Grand Finale Winner and C-DAC Innovation Challenge National Runner-up.
          </p>

          {/* 7, 8, 9, 10: Resume, Contact, GitHub, LinkedIn */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" className="bg-primary text-slate-950 hover:bg-cyan-300 font-bold gap-2" asChild>
              <a
                href={resumeConfig.href}
                target={resumeConfig.target}
                download={resumeConfig.download}
                rel="noopener noreferrer"
                aria-label={resumeConfig.ariaLabel}
              >
                <FileDown className="w-4 h-4" />
                {resumeConfig.fullLabel}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="glass-panel text-white hover:text-cyan-400 border-white/20 gap-2" asChild>
              <a href={`mailto:${email}`}>
                <Mail className="w-4 h-4 text-cyan-400" />
                Email Directly
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={copyEmail}
              className="glass-panel text-slate-200 hover:text-cyan-400 border-white/10 gap-2 font-mono text-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : email}
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

        {/* 2. Education & Graduation Year */}
        <motion.section
          id="education"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.45 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
            <GraduationCap className="w-6 h-6 text-primary" />
            Education &amp; Placement Profile
          </h3>
          <Card className="glass-panel border-white/10">
            <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-lg font-bold text-white">{profile.degree}</div>
                <div className="text-sm text-cyan-300 font-mono">{profile.institution}</div>
                <div className="text-xs text-slate-400">
                  Focus: Machine Learning, Deep Learning, NLP, Python Backend Engineering &amp; DSA
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-1 shrink-0">
                <Badge variant="outline" className="font-mono text-xs border-cyan-500/30 text-cyan-300 bg-cyan-500/10">
                  Class of {profile.graduationYear}
                </Badge>
                <span className="text-[11px] font-mono text-slate-400">
                  Targeting AI/ML &amp; SDE Roles
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* 3. Key Technical Skills */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.45 }}
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
              "IndicTrans2 / BERT / NLP",
              "Data Structures & Algorithms",
              "FastAPI / WebSockets",
              "Docker / InfluxDB / PostgreSQL",
            ].map((skill) => (
              <Card key={skill} className="glass-panel border-white/10 text-slate-200">
                <CardContent className="p-3.5 flex items-center justify-center text-center font-mono text-xs sm:text-sm h-full">
                  {skill}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* 4. Featured Projects (All 4 Flagship Systems) */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-2xl font-bold text-white">Flagship Engineering Projects</h3>
            <Link href="/notes/" className="text-xs font-mono text-cyan-400 hover:underline">
              Read Engineering Notes &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {primaryProjects.map((project) => (
              <Card
                key={project.id}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("a, button")) return;
                  router.push(`/projects/${project.id}/`);
                }}
                className="cursor-pointer glass-panel border-white/10 hover:border-primary/50 transition-all flex flex-col justify-between"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] font-mono text-cyan-400 border-cyan-400/30">
                      {project.achievement || "Flagship"}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">
                    <Link href={`/projects/${project.id}/`} className="hover:text-cyan-300 transition-colors">
                      {project.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-xs text-cyan-300 font-mono">{project.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.problemStatement}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="secondary" className="glass-panel text-slate-300 text-[11px] font-mono border-white/10">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <div className="p-6 pt-4 mt-auto flex items-center justify-between border-t border-white/[0.06]">
                  <Button variant="link" className="p-0 h-auto font-semibold gap-1 text-primary hover:text-cyan-300" asChild>
                    <Link href={`/projects/${project.id}/`}>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalProjects.map((project) => (
              <Card
                key={project.id}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("a, button")) return;
                  router.push(`/projects/${project.id}/`);
                }}
                className="cursor-pointer glass-panel border-white/10 hover:border-primary/50 transition-all p-5 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="text-base font-bold text-white">
                    <Link href={`/projects/${project.id}/`} className="hover:text-cyan-300 transition-colors">
                      {project.title}
                    </Link>
                  </div>
                  <div className="text-xs font-mono text-cyan-300">{project.tagline}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{project.impact || project.problemStatement}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <Link href={`/projects/${project.id}/`} className="text-xs font-mono text-primary hover:underline">
                    Case Study &rarr;
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-cyan-400 inline-flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" /> Repo
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* 5. Verified Engineering Milestones (Zero Fake Employment) */}
        <motion.section
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
              <Calendar className="w-6 h-6 text-primary" />
              Verified Engineering Record
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Academic &amp; Hackathon Systems (No Unverified Claims)
            </span>
          </div>
          <div className="space-y-3">
            {timelineData.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="glass-panel border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold">{item.year}</span>
                    <span className="text-sm font-bold text-white">{item.title}</span>
                    {item.achievementBadge && (
                      <Badge variant="outline" className="text-[10px] font-mono text-amber-300 border-amber-400/30 bg-amber-400/10">
                        {item.achievementBadge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">{item.roleOrContext}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 6. Verified Achievements & Contact Strip */}
        <motion.section
          id="achievements"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Trophy className="w-6 h-6 text-amber-400" />
            Verified Honors &amp; System Benchmarks
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

          <div className="glass-panel border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <span>Direct Contact: <strong className="text-white">{email}</strong></span>
            <div className="flex flex-wrap gap-3">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">GitHub</a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">LinkedIn</a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">WhatsApp</a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
