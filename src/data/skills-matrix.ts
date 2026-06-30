export interface SkillNode {
  id: string;
  name: string;
  category: 'Programming' | 'AI/ML' | 'Frontend' | 'Backend' | 'DevOps' | 'Databases' | 'Cloud' | 'Security';
  level: number; // 1 to 5
  projects: string[];
}

export interface SkillLink {
  source: string;
  target: string;
}

export const skillsNodes: SkillNode[] = [
  { id: "ts", name: "TypeScript", category: "Programming", level: 5, projects: ["aazhi-suvidhaa", "portfolio"] },
  { id: "py", name: "Python", category: "Programming", level: 5, projects: ["digital-twin-ehv", "aazhi-suvidhaa"] },
  { id: "react", name: "React", category: "Frontend", level: 5, projects: ["aazhi-suvidhaa", "digital-twin-ehv", "portfolio"] },
  { id: "next", name: "Next.js", category: "Frontend", level: 5, projects: ["aazhi-suvidhaa", "portfolio"] },
  { id: "fastapi", name: "FastAPI", category: "Backend", level: 4, projects: ["aazhi-suvidhaa"] },
  { id: "tf", name: "TensorFlow", category: "AI/ML", level: 4, projects: ["digital-twin-ehv"] },
  { id: "hf", name: "Hugging Face", category: "AI/ML", level: 4, projects: ["aazhi-suvidhaa"] },
  { id: "pg", name: "PostgreSQL", category: "Databases", level: 4, projects: ["aazhi-suvidhaa"] },
  { id: "docker", name: "Docker", category: "DevOps", level: 4, projects: ["aazhi-suvidhaa", "digital-twin-ehv"] },
  { id: "wcag", name: "WCAG & ARIA", category: "Frontend", level: 5, projects: ["aazhi-suvidhaa"] },
];

export const skillsLinks: SkillLink[] = [
  { source: "ts", target: "react" },
  { source: "react", target: "next" },
  { source: "ts", target: "next" },
  { source: "py", target: "fastapi" },
  { source: "py", target: "tf" },
  { source: "py", target: "hf" },
  { source: "react", target: "wcag" }
];
