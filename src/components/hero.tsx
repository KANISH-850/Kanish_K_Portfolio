"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      className="py-20 md:py-32"
    >
      <motion.div 
        className="container text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {profileImage && (
          <motion.div variants={itemVariants}>
            <Image
              src={profileImage.imageUrl}
              alt={profileImage.description}
              data-ai-hint={profileImage.imageHint}
              width={160}
              height={160}
              className="rounded-full mx-auto mb-8 border-4 border-card shadow-lg aspect-square object-cover"
              priority
            />
          </motion.div>
        )}
        <motion.h1 
          variants={itemVariants}
          className="font-headline text-2xl md:text-3xl font-bold tracking-tighter mb-4" 
          style={{color: '#030303', textShadow: '1px 1px 3px rgba(0,0,0,0.1)'}}
        >
          Hi, I'm Kanish 👋
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="font-headline text-4xl md:text-6xl max-w-3xl mx-auto mb-8 bg-gradient-to-r from-[#030303] to-[#575956] bg-clip-text text-transparent font-bold"
        >
          Exploring AI through Machine Learning, NLP, and Automation.
        </motion.p>
        <motion.div variants={itemVariants} whileHover={{ scale: 1.1 }} className="inline-block">
          <Button size="lg" asChild>
            <Link href="#projects">View Projects</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
