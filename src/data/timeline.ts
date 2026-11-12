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
    id: "timeline-2026-techspire",
    year: "2026",
    title: "TechSpire AI Hospital Management System",
    roleOrContext: "Full-Stack Architecture & Local Ollama RAG",
    technologyLearned: ["FastAPI", "PostgreSQL 16", "Alembic", "Ollama (qwen3:4b)", "ChromaDB", "React 19"],
    description: "Unified 5 prototype hospital modules behind Nginx + FastAPI + 14 SQLAlchemy models, on-premise Ollama RAG, RandomForest demand/revenue forecasts, and ReportLab/OpenPyXL exports.",
    category: "project"
  },
  {
    id: "timeline-2026-igs",
    year: "2026",
    title: "Intelligent Multilingual Grievance Framework",
    roleOrContext: "Applied NLP, Vision & Full-Stack Dispatch",
    technologyLearned: ["TF-IDF + LogisticRegression", "PyTorch MobileNetV3", "FastAPI", "PostgreSQL", "Prisma", "React"],
    description: "Built multilingual complaint triage pairing TF-IDF text classification, held-out evaluated MobileNetV3-Small civic vision, MyMemory/LibreTranslate APIs, and human-in-the-loop officer queues.",
    category: "project"
  },
  {
    id: "timeline-2025-sih",
    year: "2025",
    title: "Digital Twin of EHV Substation Monitoring",
    roleOrContext: "AI Modeling & Substation Telemetry",
    achievementBadge: "Smart India Hackathon Winner",
    technologyLearned: ["Python", "Scikit-learn", "TensorFlow CNN-LSTM", "Isolation Forest", "Streamlit", "ReportLab"],
    description: "Won 1st Place at Smart India Hackathon (Team Oceanberg) building per-asset fault classification & Isolation Forest anomaly modules over simulated EHV SCADA datasets.",
    category: "hackathon"
  },
  {
    id: "timeline-2024-aquaguard",
    year: "2024–2026",
    title: "Neeraran (AquaGuard AI) Water Resilience Audit",
    roleOrContext: "ML Benchmarking & Sensor Health (kanish branch)",
    technologyLearned: ["One-Class SVM", "XGBoost", "Isolation Forest", "FastAPI", "Scikit-learn"],
    description: "Contributed the ML evaluation & sensor-health decoupling suite benchmarking One-Class SVM (0.7451 F1, 3.92 ms) and XGBoost leak detection (100% recall, 2.29 ms) on simulated campus telemetry.",
    category: "project"
  },
  {
    id: "timeline-2024-cdac",
    year: "2024",
    title: "Kiosk Management System (AAZHI)",
    roleOrContext: "Kiosk UI, Aria Voice & Platform Integration (Team Fork)",
    achievementBadge: "CDAC Runner-up",
    technologyLearned: ["React", "Express", "PostgreSQL", "Redis", "FastAPI", "k6"],
    description: "Recognized as C-DAC Innovation Challenge National Runner-up for a multilingual civic utility billing & grievance kiosk platform with Aria voice navigation, FastAPI ML routing, and k6 stress-testing.",
    category: "hackathon"
  },
  {
    id: "timeline-2024-foundation",
    year: "2024",
    title: "B.E. CSE Foundation & Core Engineering",
    roleOrContext: "Bannari Amman Institute of Technology (BITSathy • 2024–2028)",
    technologyLearned: ["Python", "Java", "C++", "C", "DSA", "OOP", "DBMS", "SQL"],
    description: "Started B.E. Computer Science and Engineering (current CGPA 7.73/10), building foundations across Data Structures, Databases, Operating Systems, and software architecture.",
    category: "learning"
  }
];
