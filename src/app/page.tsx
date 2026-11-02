import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Achievements } from '@/components/achievements';
import { Experience } from '@/components/experience';
import { Certifications } from '@/components/certifications';
import { TechnicalChallenges } from '@/components/technical-challenges';
import { DevopsPipeline } from '@/components/devops-pipeline';
import { GithubEvidence } from '@/components/github-evidence';
import { Contact } from '@/components/contact';

export const metadata: Metadata = {
  title: 'Kanish K | AI Engineer & Systems Architect',
  description:
    'Portfolio of Kanish K, AI Engineer specializing in Machine Learning, Deep Learning, Generative AI, NLP, and Full-Stack Systems.',
};

export default function Home() {
  return (
    <>
      <Header />
      <div className="space-y-0">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Me & Engineering Philosophy */}
        <About />

        {/* 3. Technical Skills (5 Specified Categories) */}
        <Skills />

        {/* 4. Featured Projects (4 Ordered Systems) */}
        <Projects />

        {/* 5. Achievements (SIH Winner & CDAC Runner-up) */}
        <Achievements />

        {/* 6. Technical Journey & Milestones (Verified, Zero Fake Employment) */}
        <Experience />

        {/* 7. Education & Certifications */}
        <Certifications />

        {/* 8. Technical Challenges & Engineering Diagnostics */}
        <TechnicalChallenges />

        {/* 9. DevOps & Deployment Pipeline */}
        <DevopsPipeline />

        {/* 10. Repository & Open Source Evidence */}
        <GithubEvidence />

        {/* 11. Contact */}
        <Contact />
      </div>
    </>
  );
}
