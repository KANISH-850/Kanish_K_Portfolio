import Head from 'next/head';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Hero } from '@/components/hero';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { Header } from '@/components/header';
import { Experience } from '@/components/experience';
import { AdvancedSections } from '@/components/advanced-sections';
import { ImpactDashboard } from '@/components/impact-dashboard';
import { WhyHireMe } from '@/components/why-hire-me';
import { GithubEvidence } from '@/components/github-evidence';
import { CurrentlyBuilding } from '@/components/currently-building';

export default function Home() {
  return (
    <>
      <Head>
        <title>KanishK.ai | AI Engineer Portfolio</title>
        <meta name="description" content="Portfolio of Kanish K, an AI Engineer specializing in Machine Learning, NLP, and Full-Stack Development." />
      </Head>

      <Header />
      <Hero />
      <ImpactDashboard />
      <WhyHireMe />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <GithubEvidence />
      <AdvancedSections />
      <CurrentlyBuilding />
      <Contact />
    </>
  );
}
