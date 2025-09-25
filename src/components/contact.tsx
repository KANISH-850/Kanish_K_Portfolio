"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Handshake, Mail } from "lucide-react";
import { email, whatsappUrl } from "@/lib/config";
import { WhatsAppIcon } from "@/lib/icons";
import MotionWrap from "./motion-wrap";
import { motion } from "framer-motion";

export function Contact() {
  const { toast } = useToast();

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast({
      title: 'Email Copied!',
      description: 'The email address has been copied to your clipboard.',
    });
  };

  return (
    <section 
      id="contact" 
      className="py-20 md:py-32 bg-white rounded-t-[100px]"
      style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/noisy.png')" }}
    >
      <div className="container">
        <MotionWrap>
          <div className="max-w-2xl mx-auto text-center">
             <div className="inline-block p-5 bg-card/80 rounded-full mb-8 border border-border/50">
               <Handshake className="h-10 w-10 text-foreground" />
             </div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-10">
              Tell me about your next project
            </h2>
            <div className="flex justify-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button size="lg" variant="solid" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href={`mailto:${email}`}>
                    <Mail className="mr-2 h-5 w-5" />
                    Email Me
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button size="lg" variant="outline" className="bg-card hover:bg-card/80" asChild>
                   <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                     <WhatsAppIcon className="mr-2 h-5 w-5" />
                     WhatsApp
                   </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
