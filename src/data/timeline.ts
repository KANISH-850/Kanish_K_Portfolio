export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  roleOrContext: string;
  achievementBadge?: string;
  technologyLearned: string[];
  description: string;
  category: 'hackathon' | 'project' | 'research' | 'learning';
}

export const timelineData: TimelineEvent[] = [
  {
    id: "timeline-2026-igs",
    year: "2026",
    title: "Intelligent Multilingual Grievance Framework",
    roleOrContext: "AI Engineering & NLP Architecture",
    technologyLearned: ["IndicTrans2", "Sentence Transformers", "BERT", "FastAPI", "React 19", "PostgreSQL"],
    description: "Architected end-to-end automated civic grievance categorization and dispatch using quantized IndicTrans2 and BERT embeddings with human-in-the-loop validation.",
    category: "project"
  },
  {
    id: "timeline-2025-sih",
    year: "2025",
    title: "Digital Twin of EHV Substation Monitoring",
    roleOrContext: "AI Model Development & Real-Time Telemetry",
    achievementBadge: "Smart India Hackathon Winner",
    technologyLearned: ["Python", "TensorFlow", "Autoencoders", "WebSockets", "InfluxDB", "React"],
    description: "Won 1st Place at Smart India Hackathon for designing a predictive digital twin evaluated across ~50,000 synthetic and industry-informed SCADA records with autoencoder anomaly scoring.",
    category: "hackathon"
  },
  {
    id: "timeline-2024-cdac",
    year: "2024",
    title: "Kiosk Management System",
    roleOrContext: "Full-Stack & Systems Architecture",
    achievementBadge: "CDAC Runner-up",
    technologyLearned: ["FastAPI", "Python", "React", "Next.js", "PostgreSQL", "Docker"],
    description: "Recognized as CDAC Runner-up for creating an integrated device telemetry and management platform providing automated configuration, heartbeats, and diagnostics.",
    category: "hackathon"
  },
  {
    id: "timeline-2024-aquaguard",
    year: "2024",
    title: "AquaGuard AI (Neeraran) Water Resilience",
    roleOrContext: "Machine Learning Engineering",
    technologyLearned: ["One-Class SVM", "XGBoost", "CatBoost", "FastAPI", "Time-Series Analysis"],
    description: "Developed multi-model machine learning architecture for campus water leak identification (XGBoost), anomaly detection (One-Class SVM), and 72-hour demand forecasting (CatBoost).",
    category: "project"
  },
  {
    id: "timeline-2023-foundation",
    year: "2023",
    title: "Core AI & Systems Engineering Foundation",
    roleOrContext: "B.E. Computer Science Engineering, Bannari Amman Institute of Technology",
    technologyLearned: ["Python", "Machine Learning", "Deep Learning", "PyTorch", "TypeScript", "SQL"],
    description: "Built strong mathematical foundations in machine learning algorithms, deep neural architectures, full-stack web applications, and accessible system design.",
    category: "learning"
  }
];
