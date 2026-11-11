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
  title: 'Kanish K | AI Engineer — Applied ML & Backend Systems',
  description:
    'Portfolio of Kanish K (B.E. CSE 2028, BITSathy): Applied Machine Learning, NLP/RAG pipelines, FastAPI & Express backends, SIH 2025 Winner and C-DAC Runner-up.',
};

export default function Home() {
  return (
    <>
      <Header />
      <div className="space-y-0">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Me & Academic Profile */}
        <About />

        {/* 3. Featured Engineering Projects (Promoted for Recruiter Scanning) */}
        <Projects />

        {/* 4. Competitive Achievements (SIH Winner & C-DAC Runner-up) */}
        <Achievements />

        {/* 5. Technical Stack & Tooling */}
        <Skills />

        {/* 6. Engineering Timeline (Verified Milestones) */}
        <Experience />

        {/* 7. Education & Core CS Foundations */}
        <Certifications />

        {/* 8. Technical Challenges & Solutions */}
        <TechnicalChallenges />

        {/* 9. DevOps & Verification Workflows */}
        <DevopsPipeline />

        {/* 10. Verified GitHub Repositories */}
        <GithubEvidence />

        {/* 11. Contact */}
        <Contact />
      </div>
    </>
  );
}
