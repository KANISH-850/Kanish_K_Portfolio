"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cvUrl, email, socialLinks, navItems } from '@/lib/config';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';

export function Header() {
  const { toast } = useToast();
  const headerSocialLinks = socialLinks.filter(link => link.label !== 'Kaggle' && link.label !== 'WhatsApp');
  const mobileSocialLinks = socialLinks.filter(link => link.label !== 'WhatsApp');

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast({
      title: 'Email Copied!',
      description: 'The email address has been copied to your clipboard.',
    });
  };

  return (
    <header 
      className="w-full bg-transparent px-[3vw]"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container flex h-16 items-center"
      >
        <div className="hidden md:flex items-center gap-4">
          <p className="font-medium text-xs">{email}</p>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button variant="solid" onClick={copyEmail} className="w-[81px] h-[25px] px-1 text-xs">
              Copy
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button variant="solid" asChild className="w-[81px] h-[25px] px-1 text-xs">
              <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                CV
              </a>
            </Button>
          </motion.div>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <nav className="hidden md:flex items-center gap-x-[5px]">
            {headerSocialLinks.map((item, index) => (
              <React.Fragment key={item.label}>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button variant="link" asChild className="text-xs font-medium px-0">
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  </Button>
                </motion.div>
                {index < headerSocialLinks.length - 1 && <span className="text-muted-foreground">/</span>}
              </React.Fragment>
            ))}
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col h-full py-6">
                  <div className="space-y-4 mb-8">
                     <p className="font-medium">{email}</p>
                     <Button variant="outline" size="sm" onClick={copyEmail} className="w-full">
                       Copy Email
                     </Button>
                     <Button variant="outline" asChild className="w-full">
                       <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                         Download CV
                       </a>
                     </Button>
                  </div>
                  <nav className="flex flex-col gap-4 mb-8">
                    {navItems.map(item => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="text-lg font-medium text-muted-foreground hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto flex flex-col items-start space-y-2">
                     {mobileSocialLinks.map(({ href, label }) => (
                      <Button key={label} variant="link" className="px-0 text-lg text-foreground hover:text-accent" asChild>
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          {label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
