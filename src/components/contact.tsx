"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Copy,
  Check,
  Linkedin,
  Github,
  Download,
  Send,
  Sparkles,
} from "lucide-react";
import { email, cvUrl, showResume, resumeRequestMailto, whatsappUrl, socialLinks } from "@/lib/config";
import { KaggleIcon, LeetCodeIcon, WhatsAppIcon } from "@/lib/icons";
import MotionWrap from "./motion-wrap";

export function Contact() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast({
      title: "Email Copied",
      description: `${email} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const linkedinLink =
    socialLinks.find((l) => l.label === "LinkedIn")?.href ||
    "https://www.linkedin.com/in/kanish-k-558694251/";
  const githubLink =
    socialLinks.find((l) => l.label === "GitHub")?.href ||
    "https://github.com/KANISH-850";
  const kaggleLink =
    socialLinks.find((l) => l.label === "Kaggle")?.href ||
    "https://www.kaggle.com/kanishk2004";
  const leetcodeLink =
    socialLinks.find((l) => l.label === "LeetCode")?.href ||
    "https://leetcode.com/u/Kanish_k_2004/";

  const handleResumeDownload = () => {
    if (showResume) {
      window.open(cvUrl, "_blank");
      toast({
        title: "Opening Resume / CV",
        description: "Direct technical and academic CV for Kanish K.",
      });
    } else {
      window.location.href = resumeRequestMailto;
      toast({
        title: "Resume Request",
        description: "Opening direct email to kanishkgins@gmail.com for verified CV.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-[#030712] border-t border-white/[0.06] relative overflow-hidden"
      aria-label="Contact Section"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-accent/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <MotionWrap>
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-primary text-xs font-mono font-semibold tracking-wider uppercase border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              07 // Connect & Inquiries
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Let&apos;s Build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-accent">
                Intelligent AI Systems
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Open to technical conversations with engineering leaders,
              researchers, and teams building real-world machine learning
              platforms and distributed systems.
            </p>

            {/* Email Pill Box with Copy */}
            <div className="inline-flex items-center gap-3 p-2.5 pl-5 rounded-2xl glass-panel border border-white/10 shadow-2xl max-w-full">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-mono text-xs sm:text-sm text-slate-200 truncate select-all">
                {email}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyEmail}
                className="h-9 px-3.5 text-xs gap-1.5 shrink-0 rounded-xl glass-panel hover:bg-white/[0.08] hover:text-cyan-400 text-slate-300 border border-white/5"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
              {/* Email Button */}
              <Button
                size="lg"
                className="bg-primary text-slate-950 hover:bg-cyan-300 font-bold px-7 h-12 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all"
                asChild
              >
                <a href={`mailto:${email}`}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Direct Email
                </a>
              </Button>

              {/* Resume Download Button */}
              <Button
                size="lg"
                variant="outline"
                onClick={handleResumeDownload}
                className="glass-panel text-white font-semibold px-7 h-12 rounded-xl border-white/20 hover:border-primary/50 hover:bg-white/[0.08]"
              >
                <Download className="mr-2 h-4 w-4 text-primary" />
                {showResume ? "Download Resume" : "Request Resume"}
              </Button>

              {/* LinkedIn Button */}
              <Button
                size="lg"
                variant="outline"
                className="glass-panel text-white font-semibold px-6 h-12 rounded-xl border-white/20 hover:border-[#0077b5]/60 hover:bg-[#0077b5]/10"
                asChild
              >
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="mr-2 h-4 w-4 text-[#0077b5]" />
                  LinkedIn
                </a>
              </Button>

              {/* GitHub Button */}
              <Button
                size="lg"
                variant="outline"
                className="glass-panel text-white font-semibold px-6 h-12 rounded-xl border-white/20 hover:border-primary/50 hover:bg-white/[0.08]"
                asChild
              >
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="mr-2 h-4 w-4 text-slate-200" />
                  GitHub
                </a>
              </Button>
            </div>

            {/* Secondary Verified Handles */}
            <div className="pt-6 flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-slate-400">
              <a
                href={leetcodeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors glass-panel px-3 py-1.5 rounded-lg border border-white/5"
              >
                <LeetCodeIcon className="w-3.5 h-3.5" />
                <span>LeetCode</span>
              </a>

              <a
                href={kaggleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors glass-panel px-3 py-1.5 rounded-lg border border-white/5"
              >
                <KaggleIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Kaggle</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors glass-panel px-3 py-1.5 rounded-lg border border-white/5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
