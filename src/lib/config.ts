import { Github, Linkedin } from "lucide-react";
import { KaggleIcon, LeetCodeIcon, WhatsAppIcon } from "@/lib/icons";

export const email = "kanishkgins@gmail.com";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
// Target URL for physical resume PDF once dropped into /public
export const cvUrl = `${basePath}/KanishK_CV.pdf`;
// Controlled availability flag: false directs recruiters to request CV directly, preventing 404 errors
export const showResume = false;
export const resumeRequestMailto = `mailto:${email}?subject=Resume%20Request%20-%20Kanish%20K&body=Hi%20Kanish,%0D%0A%0D%0AI%20reviewed%20your%20portfolio%20and%20would%20like%20to%20request%20a%20copy%20of%20your%20official%20resume.%0D%0A%0D%0AThank%20you!`;
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
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#experience", label: "Journey" },
  { href: "#contact", label: "Contact" },
];
