import { Github, Linkedin } from "lucide-react";
import { KaggleIcon, LeetCodeIcon, WhatsAppIcon } from "@/lib/icons";

export const email = "kanishkgins@gmail.com";
export const cvUrl = "/KanishK_CV.pdf";
export const whatsappUrl = "https://wa.me/918508509719"; 

export const socialLinks = [
  {
    href: "https://www.linkedin.com/in/kanish-k-558694251/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "https://github.com/Kanish-K-2004", icon: Github, label: "GitHub" },
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
  { href: "#services", label: "Expertise" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];
