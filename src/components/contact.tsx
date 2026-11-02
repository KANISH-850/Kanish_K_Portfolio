"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Copy, Check, MessageSquare, Linkedin, Github } from "lucide-react";
import { email, whatsappUrl, socialLinks } from "@/lib/config";
import { WhatsAppIcon } from "@/lib/icons";
import MotionWrap from "./motion-wrap";
import { useState } from "react";

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

  const linkedinLink = socialLinks.find(l => l.label === "LinkedIn")?.href || "https://www.linkedin.com/in/kanish-k-558694251/";
  const githubLink = socialLinks.find(l => l.label === "GitHub")?.href || "https://github.com/KANISH-850";

  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-card/60 border-t border-border/50 relative overflow-hidden"
      aria-label="Contact"
    >
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
              Get in Touch
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Let&apos;s Discuss <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">AI & Engineering Roles</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Open to technical conversations with engineering leaders, recruiters, and teams building real-world machine learning and distributed systems.
            </p>

            {/* Email pill box */}
            <div className="inline-flex items-center gap-3 p-2 pl-4 rounded-xl bg-muted/40 border border-white/10 shadow-sm max-w-full">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span className="font-mono text-xs sm:text-sm text-foreground truncate select-all">
                {email}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyEmail}
                className="h-8 px-3 text-xs gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>

            {/* Direct action buttons */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6" asChild>
                <a href={`mailto:${email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </a>
              </Button>

              <Button size="lg" variant="outline" className="border-border hover:bg-accent/10 px-6" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>

              <Button size="lg" variant="outline" className="border-border hover:bg-accent/10 px-6" asChild>
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4 text-[#0077b5]" />
                  LinkedIn
                </a>
              </Button>

              <Button size="lg" variant="outline" className="border-border hover:bg-accent/10 px-6" asChild>
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
