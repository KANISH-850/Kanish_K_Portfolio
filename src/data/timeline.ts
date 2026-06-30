export interface TimelineEvent {
  year: string;
  achievement: string;
  technologyLearned: string[];
  outcome: string;
  category: 'learning' | 'project' | 'hackathon' | 'milestone';
}

export const timelineData: TimelineEvent[] = [
  {
    year: "2023",
    achievement: "Started Web Development Journey",
    technologyLearned: ["HTML", "CSS", "JavaScript", "React"],
    outcome: "Built first portfolio and basic web applications.",
    category: "learning"
  },
  {
    year: "2024",
    achievement: "First Major Hackathon Win",
    technologyLearned: ["Next.js", "Node.js", "MongoDB"],
    outcome: "Developed a full-stack application under 48 hours, winning Best Innovation.",
    category: "hackathon"
  },
  {
    year: "2025",
    achievement: "Launched Digital Twin Project",
    technologyLearned: ["Python", "TensorFlow", "WebSockets", "InfluxDB"],
    outcome: "Successfully deployed predictive maintenance dashboard for EHV substations.",
    category: "project"
  },
  {
    year: "2026",
    achievement: "Aazhi Multilingual Kiosk",
    technologyLearned: ["FastAPI", "IndicTrans2", "Radix UI", "PostgreSQL"],
    outcome: "Deployed an accessible grievance redressal system for senior citizens.",
    category: "project"
  }
];
