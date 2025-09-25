import Head from 'next/head';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Education } from '@/components/education';
import { Hero } from '@/components/hero';
import { Projects } from '@/components/projects';
import { Services } from '@/components/services';
import { Skills } from '@/components/skills';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio - Home</title>
        <meta name="description" content="Welcome to my portfolio website showcasing my skills, projects, and experience." />
        <meta name="keywords" content="portfolio, web developer, React, Next.js, Firebase, Kanish, CSE" />
        <meta property="og:title" content="My Portfolio - Home" />
        <meta property="og:description" content="Welcome to my portfolio website showcasing my skills, projects, and experience." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.yourwebsite.com/og-image.jpg" />
      </Head>

      <Header />
      <Hero />
      <Skills />
      <About />
      <Services />
      <Projects />
      <Education />
      <Contact />
    </>
  );
}
