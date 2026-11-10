import { Github, Linkedin } from "lucide-react";
import { KaggleIcon, LeetCodeIcon, WhatsAppIcon } from "@/lib/icons";

export const email = "kanishkgins@gmail.com";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
// Target URL for physical resume PDF once dropped into /public/KanishK_CV.pdf
export const cvUrl = `${basePath}/KanishK_CV.pdf`;
// Controlled availability flag: keep false until public/KanishK_CV.pdf is supplied (prevents 404s)
export const showResume = false;
export const resumeRequestMailto = `mailto:${email}?subject=Resume%20Request%20-%20Kanish%20K&body=Hi%20Kanish,%0D%0A%0D%0AI%20reviewed%20your%20portfolio%20and%20would%20like%20to%20request%20a%20copy%20of%20your%20official%20resume.%0D%0A%0D%0AThank%20you!`;

export const resumeConfig = {
  available: showResume,
  href: showResume ? cvUrl : resumeRequestMailto,
  download: showResume ? "KanishK_CV.pdf" : undefined,
  target: showResume ? ("_blank" as const) : undefined,
  shortLabel: showResume ? "Resume PDF" : "Resume",
  fullLabel: showResume ? "Download Resume (PDF)" : "Request Resume / CV",
  ariaLabel: showResume
    ? "Download Kanish K official resume PDF"
    : "Request Kanish K official resume via email",
} as const;

export const profile = {
  name: "Kanish K",
  role: "AI Engineer",
  headline: "AI Engineer | Machine Learning | Deep Learning | Generative AI | NLP | Python | DSA",
  degree: "B.E. Computer Science Engineering",
  institution: "Bannari Amman Institute of Technology",
  graduationYear: "2028",
  siteUrl: "https://KANISH-850.github.io/Kanish_K_Portfolio/",
} as const;
export const whatsappUrl = "https://wa.me/918508509719"; 

export const socialLinks = [
  {
    href: "https://www.linkedin.com/in/kanish-k-558694251/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "https://github.com/KANISH-850", icon: Github, label: "GitHub" },
  {
    href: "https://www.kaggle.com/kanishk2004",
    icon: KaggleIcon,
    label: "Kaggle",
  },
  {
    href: "https://leetcode.com/u/Kanish_k_2004/",
    icon: LeetCodeIcon,
    label: "LeetCode",
  },
  {
    href: whatsappUrl,
    icon: WhatsAppIcon,
    label: "WhatsApp"
  }
];

export const navItems = [
  { id: "about", href: "/#about", label: "About" },
  { id: "projects", href: "/#projects", label: "Projects" },
  { id: "skills", href: "/#skills", label: "Skills" },
  { id: "achievements", href: "/#achievements", label: "Achievements" },
  { id: "experience", href: "/#experience", label: "Journey" },
  { id: "contact", href: "/#contact", label: "Contact" },
] as const;
