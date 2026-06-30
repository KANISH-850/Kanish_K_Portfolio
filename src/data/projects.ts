export interface TechChallenge {
  challenge: string;
  solution: string;
  implementation: string;
  result: string;
}

export interface MLPipelineStep {
  name: string;
  description: string;
  metric?: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  githubUrl?: string;
  liveUrl?: string;
  problemStatement: string;
  
  // Phase 2: Architecture
  systemArchitecture: string;
  dataFlow: string;

  // Phase 3: Technical Challenges
  technicalChallenges: TechChallenge[];
  
  // Phase 5: Pipeline
  mlPipeline?: MLPipelineStep[];
  
  // Phase 6: Security
  securityFeatures: string[];
  
  // Phase 7: DevOps
  devopsPipeline?: string[];

  keyFeatures: string[];
  accessibilityMeasures: string[];
  performanceMetrics: string[];
  lessonsLearned: string[];
  technologies: string[];

  // V3 Elite Enhancements: Lessons Learned
  engineeringChallenges?: string[];
  mistakesMade?: string[];
  failedApproaches?: string[];
  optimizationStrategies?: string[];
  futureImprovements?: string[];

  // V3 Elite Enhancements: Hackathon Judge Metrics
  innovation?: string;
  scalability?: string;
  impact?: string;
  teamContribution?: string;
}

export const projectsData: Record<string, ProjectCaseStudy> = {
  "aazhi-suvidhaa": {
    id: "aazhi-suvidhaa",
    title: "Aazhi / Suvidhaa",
    tagline: "Multilingual AI-Powered Grievance Redressal System",
    githubUrl: "#",
    liveUrl: "#",
    problemStatement: "Citizens faced massive barriers lodging grievances due to language constraints, inaccessible interfaces, and opaque resolution lifecycles.",
    systemArchitecture: "Microservices-based architecture deployed on scalable infrastructure. The frontend Next.js app communicates with a FastAPI Python backend via REST, which interfaces with a local instance of the IndicTrans2 transformer model for real-time translation.",
    dataFlow: "User Audio/Text -> Frontend -> API Gateway -> Auth Middleware -> NLP Translation Engine (IndicTrans2) -> Processing -> PostgreSQL DB -> Admin Dashboard.",
    technicalChallenges: [
      {
        challenge: "Real-time regional language translation latency was too high for interactive voice use.",
        solution: "Optimized model inference and implemented a caching layer.",
        implementation: "Quantized the IndicTrans2 model and deployed it using ONNX Runtime with Redis for caching common queries.",
        result: "Reduced translation latency from 2.5s to < 500ms."
      },
      {
        challenge: "Ensuring WCAG accessibility for complex grievance forms.",
        solution: "Built a 'Senior Mode' with progressive disclosure.",
        implementation: "Used Radix UI primitives and custom ARIA state management in React.",
        result: "Achieved a 100/100 Lighthouse Accessibility Score."
      }
    ],
    mlPipeline: [
      { name: "Dataset", description: "Collected 50k+ multilingual grievance records.", metric: "50k records" },
      { name: "Cleaning", description: "Removed PII and normalized text encodings." },
      { name: "Translation", description: "IndicTrans2 inference for EN conversion." },
      { name: "Classification", description: "Zero-shot classification for department routing.", metric: "92% Acc" },
      { name: "Deployment", description: "FastAPI endpoints via Docker." }
    ],
    securityFeatures: [
      "Role-Based Access Control (RBAC) for Admins/Operators",
      "JWT-based Authentication with short-lived tokens",
      "End-to-end encryption (AES-256) for Citizen PII data",
      "Rate Limiting on public submission APIs"
    ],
    devopsPipeline: ["GitHub Push", "GitHub Actions (CI)", "Docker Build", "Pytest (Unit Tests)", "Vercel Deploy (FE)", "GCP Cloud Run (BE)"],
    technologies: ["React", "Next.js", "FastAPI", "IndicTrans2", "PostgreSQL"],
    keyFeatures: ["Voice-assisted complaint lodging.", "Multilingual support.", "SLA tracking and escalation.", "Senior Citizen Mode."],
    accessibilityMeasures: ["100% WCAG compliance.", "Screen-reader optimized.", "High-contrast mode.", "Keyboard navigation."],
    performanceMetrics: ["Lighthouse Score: 98", "Translation Latency < 500ms", "Handles 10k+ concurrent connections."],
    lessonsLearned: ["Deploying LLMs/Transformers requires extensive infrastructure planning.", "Accessibility must be an architectural requirement, not a patch."]
  },
  "digital-twin-ehv": {
    id: "digital-twin-ehv",
    title: "Digital Twin of EHV Substation",
    tagline: "AI Anomaly Detection and Predictive Maintenance",
    problemStatement: "Extra High Voltage (EHV) substations suffer from unanticipated equipment failures leading to massive downtimes and maintenance costs.",
    systemArchitecture: "An event-driven architecture ingesting high-frequency SCADA telemetry via WebSockets into a time-series database. Anomaly detection models poll this DB to trigger alerts on a 3D React-based Dashboard.",
    dataFlow: "SCADA Sensors -> MQTT Broker -> Python Data Processor -> InfluxDB -> TensorFlow Model -> WebSocket Server -> React Dashboard.",
    technicalChallenges: [
      {
        challenge: "Ingesting and visualizing 100+ sensor data points per second without freezing the UI.",
        solution: "Decoupled data ingestion from visualization.",
        implementation: "Implemented WebWorkers in React to handle WebSocket parsing and used canvas-based rendering.",
        result: "Achieved smooth 60fps rendering of real-time telemetry."
      }
    ],
    mlPipeline: [
      { name: "Telemetry", description: "Raw SCADA sensor data ingestion." },
      { name: "Feature Eng.", description: "Rolling averages, frequency domain transformations." },
      { name: "Training", description: "Trained Autoencoders for anomaly detection." },
      { name: "Inference", description: "Real-time scoring of incoming streams.", metric: "< 50ms latency" }
    ],
    securityFeatures: [
      "Strict network isolation for SCADA interfaces",
      "Secure WebSocket (WSS) with mutual TLS",
      "Audit logging of all operator actions"
    ],
    devopsPipeline: ["GitLab CI", "Docker Compose", "Automated Integration Tests", "On-Premises Deployment"],
    technologies: ["Python", "TensorFlow", "React", "WebSocket", "InfluxDB"],
    keyFeatures: ["Real-time asset modeling.", "Predictive maintenance alerts.", "Historical analysis dashboard."],
    accessibilityMeasures: ["Color-blind friendly data visualization charts.", "Clear alert contrast."],
    performanceMetrics: ["Anomaly detection accuracy: 94%", "Data ingestion latency: < 50ms"],
    lessonsLearned: ["Mastered dealing with time-series data at scale.", "Bridged the gap between hardware engineering and software analytics."]
  }
};
