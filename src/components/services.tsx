'use client';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, MessageSquare, Bot, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from 'framer-motion';
import MotionWrap from "./motion-wrap";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: BrainCircuit,
    title: "Machine Learning",
    description: "Building predictive models and intelligent algorithms to uncover insights from data."
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Developing conversational AI, sentiment analysis models, and text understanding systems."
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Designing intelligent workflows and end-to-end pipelines to automate complex tasks."
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Expertise in handling, cleaning, and visualizing data to prepare it for machine learning."
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container">
        <MotionWrap>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              My Areas of <span className="bg-gradient-to-r from-[#030303] to-[#575956] bg-clip-text text-transparent">Expertise</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card className="flex flex-col items-center text-center p-6 shadow-md h-full">
                  <CardHeader className="p-0 flex flex-col items-center">
                    <div className="bg-accent/10 p-4 rounded-full mb-4">
                      <service.icon className="h-8 w-8 text-foreground" />
                    </div>
                    <CardTitle className="text-xl font-semibold mb-2">{service.title}</CardTitle>
                  </CardHeader>
                  <CardDescription>{service.description}</CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
