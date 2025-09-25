import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/config";
import { LeetCodeIcon, WhatsAppIcon } from "@/lib/icons";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          &copy; {year} Kanish. All rights reserved.
        </p>
        <div className="flex items-center gap-1">
          {socialLinks.filter(link => link.label !== "Kaggle").map(({ href, icon: Icon, label }) => (
            <Button key={label} variant="ghost" size="icon" asChild>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
