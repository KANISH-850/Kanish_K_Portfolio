import { Github, Linkedin } from "lucide-react";
import { KaggleIcon, LeetCodeIcon, WhatsAppIcon } from "@/lib/icons";

export const email = "kanishkgins@gmail.com";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const cvUrl = `${basePath}/KanishK_CV.pdf`;
// Hidden temporarily until genuine resume is provided by user (prevents publishing placeholder stub)
export const showResume = false;
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
