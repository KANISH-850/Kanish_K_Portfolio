export interface TechChallenge {
  id: string;
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

export interface ModelMetric {
  model: string;
  task: string;
  accuracyOrMetric: string;
  f1OrDetail: string;
  latency: string;
  context: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  achievement?: string;
  githubUrl?: string;
  liveUrl?: string;
  problemStatement: string;
  systemArchitecture: string;
  dataFlow: string;
  technicalChallenges: TechChallenge[];
  mlPipeline?: MLPipelineStep[];
  modelMetrics?: ModelMetric[];
  securityFeatures: string[];
  devopsPipeline?: string[];
  keyFeatures: string[];
  accessibilityMeasures: string[];
  performanceMetrics: string[];
  lessonsLearned: string[];
  technologies: string[];
  metricsContextNote?: string;
  innovation?: string;
  impact?: string;
  teamContribution?: string;
  scalability?: string;
}

export const projectsData: Record<string, ProjectCaseStudy> = {
  "digital-twin-ehv": {
    id: "digital-twin-ehv",
    title: "Digital Twin of EHV Substation Monitoring",
    tagline: "Predictive Equipment Monitoring & Anomaly Detection Framework",
    achievement: "Smart India Hackathon Winner",
    githubUrl: "https://github.com/KANISH-850/oceanBerg_sih",
    problemStatement:
      "Extra High Voltage (EHV) electrical substations face catastrophic downtime and substantial maintenance costs due to unanticipated equipment degradation and thermal overloading across critical transformers and switchgear.",
    systemArchitecture:
      "A distributed telemetry ingestion and digital twin modeling architecture. High-frequency sensor streams (voltage, current, oil temperature, acoustic vibrations) are ingested through an MQTT broker into InfluxDB time-series storage. Real-time autoencoders evaluate telemetry streams to flag anomalies and drive a 3D digital twin dashboard.",
    dataFlow:
      "Synthetic & Industry-Informed SCADA Telemetry (~50k records) -> MQTT Ingestion Broker (Simulated) -> Python Feature Extraction Worker -> InfluxDB -> TensorFlow Anomaly Engine -> WebSocket Broadcaster -> React 3D Dashboard.",
    technicalChallenges: [
      {
        id: "dt-1",
        challenge: "Visualizing high-frequency SCADA telemetry streams (100+ data points/sec) without causing UI thread stutter or frame drops.",
        solution: "Decoupled data parsing from the React UI thread using background Web Workers and offloaded rendering to HTML5 Canvas.",
        implementation: "Constructed dedicated Web Worker buffers for incoming WebSocket streams and rendered sensor telemetry using double-buffered canvas routines.",
        result: "Targeted a stable 60 FPS rendering loop by isolating data processing from UI updates."
      },
      {
        id: "dt-2",
        challenge: "Accurately identifying rare transformer thermal anomalies from 50,000 synthetic and industry-informed operational records.",
        solution: "Trained semi-supervised deep autoencoders on nominal operational envelopes to detect reconstruction errors.",
        implementation: "Standardized multi-variate rolling averages and FFT frequency-domain features; flagged deviations exceeding 3.5 standard deviations.",
        result: "Achieved 94% anomaly detection accuracy with an internal test benchmark latency targeting ~50ms."
      }
    ],
    mlPipeline: [
      { name: "Telemetry Ingestion", description: "Ingests ~50,000 synthetic and industry-informed operational SCADA telemetry records.", metric: "50k Synthetic Records" },
      { name: "Feature Transformation", description: "Multi-variate rolling windows, frequency domain FFT analysis, and noise filtering." },
      { name: "Autoencoder Scoring", description: "Semi-supervised reconstruction error evaluation for thermal anomaly detection." },
      { name: "Predictive Inference", description: "Scoring incoming streams in real time for early equipment failure warning.", metric: "~50ms target (internal test)" }
    ],
    securityFeatures: [
      "Architectural design: Strict network isolation specification for SCADA telemetry gateways",
      "Proposed architecture: Mutual TLS (mTLS) encrypted WebSocket connections (WSS)",
      "Access control specification: Role-Based Access Control (RBAC) with operator audit trails"
    ],
    devopsPipeline: ["Git Push", "Docker Compose Local Stack", "Automated Integration Tests", "On-Premises Substation Edge Deployment"],
    technologies: ["Python", "TensorFlow", "React", "Next.js", "WebSockets", "InfluxDB", "Docker"],
    keyFeatures: [
      "Digital twin 3D visualization of substation transformer and breaker states.",
      "Intelligent equipment monitoring with dynamic threshold alerts.",
      "Machine learning-based anomaly analysis on multi-variate sensor streams.",
      "Predictive monitoring capabilities to minimize scheduled maintenance outages.",
      "Data-driven operational insights with historical playback tools."
    ],
    accessibilityMeasures: [
      "Color-blind safe palette configurations for critical alarm states.",
      "High contrast visual cues and audible alert toggle support.",
      "Keyboard navigable diagnostic panels."
    ],
    performanceMetrics: [
      "Internal test benchmark: inference latency targeting ~50ms per telemetry burst.",
      "Targeted smooth 60 FPS rendering loop for time-series telemetry charts.",
      "Evaluated across 50,000 synthetic and industry-informed substation records."
    ],
    lessonsLearned: [
      "Industrial IoT requires resilient offline buffering at the edge when connectivity degrades.",
      "Decoupling telemetry ingestion pipelines from visualization layers is critical for responsive operator UIs."
    ],
    innovation:
      "Combined semi-supervised deep autoencoder reconstruction scoring with an interactive 3D substation twin and decoupled telemetry parsing.",
    impact:
      "Smart India Hackathon Grand Finale 1st Place Winner; demonstrated early transformer thermal anomaly detection across ~50,000 synthetic and industry-informed SCADA records.",
    teamContribution: "AI Modeling, Telemetry Pipeline & 3D Twin Integration",
    scalability:
      "Designed around decoupled time-series ingestion (InfluxDB), asynchronous feature workers, and WebSocket event broadcasting for multi-bay monitoring."
  },

  "intelligent-grievance-system": {
    id: "intelligent-grievance-system",
    title: "Intelligent Multilingual Grievance Categorization & Dispatch",
    tagline: "AI-Powered NLP Framework for Automated Public Service Routing",
    githubUrl: "https://github.com/KANISH-850/intelligent-grievance-system",
    problemStatement:
      "Public administration departments receive thousands of citizen complaints across multiple regional languages. Manual sorting causes severe dispatch bottlenecks, delayed SLAs, and misallocated department tickets.",
    systemArchitecture:
      "A dual-layer microservices architecture combining a React 19 / TypeScript frontend with a FastAPI / Node.js backend. Submitted grievances undergo automatic language identification and translation via IndicTrans2, followed by semantic embedding extraction with Sentence Transformers and BERT for department categorization and priority routing in PostgreSQL.",
    dataFlow:
      "Citizen Text/Audio Submission -> API Gateway -> IndicTrans2 Translation -> BERT / Sentence Transformer Classifier -> Department Routing Engine -> PostgreSQL / Prisma -> Admin Review Dashboard.",
    technicalChallenges: [
      {
        id: "igs-1",
        challenge: "Inference latency for regional Indian language translation was initially > 2.5s, impairing real-time feedback during complaint lodging.",
        solution: "Quantized the IndicTrans2 transformer model and deployed it via ONNX Runtime with Redis caching for repeated civic query patterns.",
        implementation: "Applied 8-bit dynamic quantization to the transformer weights and deployed asynchronous inference microservices.",
        result: "Reduced average translation response latency from 2.5s to under 500ms."
      },
      {
        id: "igs-2",
        challenge: "Handling low-confidence grievance classifications to prevent wrong departmental routing.",
        solution: "Engineered a human-in-the-loop review queue for tickets falling below an 85% confidence score.",
        implementation: "Implemented a confidence-scoring threshold gate in the FastAPI dispatch router directing ambiguous tickets to supervisory queues.",
        result: "Zero false-positive automated misdispatches on high-priority civic incidents."
      }
    ],
    mlPipeline: [
      { name: "Language Detection", description: "Identifies regional language and normalizes Unicode text inputs." },
      { name: "IndicTrans2 Translation", description: "Quantized neural machine translation into standard English pivot representation." },
      { name: "Semantic Embedding", description: "Sentence Transformers generate 768-dimensional contextual document vectors." },
      { name: "BERT Classification", description: "Multi-class department categorization and priority classification.", metric: "92% Accuracy" },
      { name: "Automated Dispatch", description: "PostgreSQL Prisma persistence and automated department webhook notification." }
    ],
    securityFeatures: [
      "PII redaction engine sanitizing national IDs, phone numbers, and addresses before NLP scoring",
      "Architectural design: Role-Based Access Control (RBAC) separating citizen, operator, and departmental supervisor views",
      "Data protection specification: End-to-end encryption (AES-256) at rest for all database entries",
      "Rate limiting and CORS policies on public submission endpoints"
    ],
    devopsPipeline: ["GitHub Push", "GitHub Actions CI", "Pytest & Jest Suites", "Docker Container Build", "FastAPI Service Deployment"],
    technologies: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Sentence Transformers",
      "BERT",
      "IndicTrans2"
    ],
    keyFeatures: [
      "Multilingual grievance processing supporting regional Indian languages.",
      "Real-time language detection and neural machine translation.",
      "Intelligent grievance categorization and automated department routing.",
      "Urgency and priority classification based on civic severity.",
      "Human-in-the-loop review system for ambiguous or sensitive submissions.",
      "End-to-end grievance status tracking with transparent audit timelines.",
      "Chatbot assistance guiding citizens through structured evidence submission."
    ],
    accessibilityMeasures: [
      "Senior Citizen Mode with enlarged touch targets and high-contrast typography.",
      "Full ARIA tab-indexing and screen-reader support.",
      "Voice-guided grievance recording and review."
    ],
    performanceMetrics: [
      "Sub-500ms neural translation latency with quantized ONNX runtime.",
      "92% automated classification accuracy across civic department categories.",
      "100/100 Lighthouse Accessibility compliance score."
    ],
    lessonsLearned: [
      "Production NLP pipelines require strict fallback thresholds when user input is noisy or dialect-heavy.",
      "Public-sector software requires accessibility to be baked into the data layer, not treated as surface CSS."
    ],
    innovation:
      "Unified quantized IndicTrans2 neural translation with 768-dimensional Sentence Transformer embeddings, BERT categorization, and human-in-the-loop fallback routing.",
    impact:
      "Automates multilingual civic grievance intake and department dispatch while preserving Senior Citizen accessibility mode and transparent citizen tracking.",
    teamContribution: "NLP Pipeline Architecture & Full-Stack Engineering",
    scalability:
      "Stateless FastAPI inference workers paired with PostgreSQL/Prisma persistence and confidence-threshold human review queues."
  },

  "aquaguard-ai": {
    id: "aquaguard-ai",
    title: "AquaGuard AI (Neeraran)",
    tagline: "AI-Driven Campus Water Resilience & Demand Forecasting Platform",
    githubUrl: "https://github.com/LakshanyaaJ/neeraran",
    problemStatement:
      "Educational and institutional campuses experience substantial unmonitored water loss from hidden distribution pipe leaks, supply-demand mismatches, and delayed maintenance responses during peak operational periods.",
    systemArchitecture:
      "A multi-model AI telemetry architecture engineered for water resilience. Sensor telemetry from campus flowmeters, pressure gauges, and storage tanks feeds into a centralized Python analytics pipeline. Three specialized ML models operate concurrently: One-Class SVM for anomaly detection, XGBoost for leak identification, and CatBoost for 72-hour forward demand forecasting.",
    dataFlow:
      "Flow & Pressure Telemetry -> Data Cleaning & Feature Pipeline -> One-Class SVM (Anomaly Detection) -> XGBoost (Leak Localization) -> CatBoost (72-Hour Demand Forecast) -> Actionable Interventions Engine -> React Dashboard.",
    technicalChallenges: [
      {
        id: "ag-1",
        challenge: "Detecting sudden pipe ruptures versus ordinary daytime demand surges without false alarm cascades.",
        solution: "Ensembled localized pressure drop gradients with historical diurnal demand curves.",
        implementation: "Trained XGBoost on pressure differential slopes and flow ratios, calibrated with One-Class SVM boundary checks.",
        result: "Achieved 100% leak recall with 99.79% overall accuracy on benchmark evaluation datasets."
      },
      {
        id: "ag-2",
        challenge: "Forecasting dynamic 72-hour campus consumption under variable academic schedules and weather conditions.",
        solution: "Deployed CatBoost gradient boosting with time-aware cyclical encodings and weather regressors.",
        implementation: "Structured rolling lag features (24h, 48h, 72h) and temperature correlations with CatBoost optimized for L2 loss.",
        result: "Achieved 72-hour MAE of 70.91 L/h with MAPE of 9.59% and 573.8ms rollout latency."
      }
    ],
    modelMetrics: [
      {
        model: "One-Class SVM",
        task: "Consumption Anomaly Detection",
        accuracyOrMetric: "99.89% Accuracy",
        f1OrDetail: "F1 Score: 0.7451",
        latency: "3.92 ms",
        context: "Evaluated on calibrated campus flow test partition; identifies outlier usage patterns."
      },
      {
        model: "XGBoost",
        task: "Pipe Leak Identification",
        accuracyOrMetric: "99.79% Accuracy",
        f1OrDetail: "100% Leak Recall",
        latency: "1.14 ms",
        context: "Evaluated on benchmark leak telemetry dataset; prioritized zero false-negative rupture detection."
      },
      {
        model: "CatBoost",
        task: "72-Hour Demand Forecasting",
        accuracyOrMetric: "MAE: 70.91 L/h",
        f1OrDetail: "MAPE: 9.59%",
        latency: "573.8 ms rollout",
        context: "Evaluated on continuous 72-hour rolling evaluation horizon under varying schedule loads."
      }
    ],
    metricsContextNote:
      "Evaluation context: Figures reflect verified test benchmark results on calibrated dataset partitions and are presented for technical assessment rather than production SLA guarantees.",
    mlPipeline: [
      { name: "Telemetry Collection", description: "Ingests sensor data from campus flow meters, pressure sensors, and reservoir levels." },
      { name: "Anomaly Detection", description: "One-Class SVM flags consumption anomalies.", metric: "99.89% Acc | 3.92ms" },
      { name: "Leak Identification", description: "XGBoost models identify localized leak signatures.", metric: "99.79% Acc | 1.14ms" },
      { name: "Demand Forecasting", description: "CatBoost predicts 72-hour ahead water demand.", metric: "9.59% MAPE | 573.8ms" },
      { name: "Intervention Routing", description: "Generates prioritized maintenance tickets and valve adjustment guidelines." }
    ],
    securityFeatures: [
      "Hardware authentication keys for IoT sensor gateway transmissions",
      "Encrypted API telemetry payloads over HTTPS/WSS",
      "Restricted operational valve controls reserved for verified facilities staff"
    ],
    devopsPipeline: ["GitHub Push", "Automated Linting & Test Verification", "Containerized Fast Inference API", "Campus Edge Deployment"],
    technologies: ["Python", "One-Class SVM", "XGBoost", "CatBoost", "FastAPI", "React", "TypeScript", "Tailwind CSS"],
    keyFeatures: [
      "Water consumption anomaly detection across institutional zones.",
      "High-recall leak identification to minimize physical distribution losses.",
      "72-hour water demand forecasting with diurnal schedule awareness.",
      "Sensor monitoring dashboard displaying real-time flow rates and pressures.",
      "Water shortage prediction with automated reserve allocation alerts.",
      "Repair prioritization matrix ranking leaks by volume loss severity.",
      "Actionable recommendations for facilities teams to optimize pump runtimes."
    ],
    accessibilityMeasures: [
      "Clear visual telemetry status indicators (safe, warning, critical).",
      "Screen-reader readable metric cards with structured data markup.",
      "Responsive layout optimized for tablet-equipped campus maintenance technicians."
    ],
    performanceMetrics: [
      "One-Class SVM anomaly latency: 3.92 ms.",
      "XGBoost leak identification latency: 1.14 ms (100% recall on test splits).",
      "CatBoost 72-hour forecasting rollout latency: 573.8 ms."
    ],
    lessonsLearned: [
      "Specialized small models tailored to specific telemetry tasks dramatically outperform monolithic architectures in speed and explainability.",
      "Evaluation figures must always be calibrated against test distribution characteristics to ensure robust field reliability."
    ],
    innovation:
      "Orchestrated three specialized, explainable models—One-Class SVM (anomaly), XGBoost (leak detection), and CatBoost (72h forecasting)—instead of a single monolithic black box.",
    impact:
      "Enables campus facilities teams to detect distribution leaks early and schedule proactive pump operations using calibrated 72-hour demand forecasts.",
    teamContribution: "Machine Learning Engineering & Evaluation Benchmarking",
    scalability:
      "Lightweight specialized inference models (sub-4ms anomaly/leak scoring on test splits) served via FastAPI for multi-zone campus sensor networks."
  },

  "kiosk-management-system": {
    id: "kiosk-management-system",
    title: "Kiosk Management System",
    tagline: "Integrated Fleet Management & Device Telemetry Platform",
    achievement: "CDAC Runner-up",
    githubUrl: "https://github.com/KANISH-850/aazhi",
    problemStatement:
      "Public-facing service kiosks distributed across multiple government centers frequently suffer from unmonitored hardware lockups, fragmented update processes, and delayed technician dispatch due to lack of centralized telemetry.",
    systemArchitecture:
      "A centralized device orchestration platform built with Python, FastAPI, React, and PostgreSQL. Client-side kiosk daemons communicate with an administrative control server via authenticated heartbeats, reporting hardware resource consumption, peripheral health (touch, printers, cameras), and application uptime.",
    dataFlow:
      "Kiosk Daemon Telemetry (Simulated) -> Secure API Gateway -> Ingestion Worker -> PostgreSQL / Timescale -> Alert Evaluator -> Administrative Fleet Dashboard.",
    technicalChallenges: [
      {
        id: "kms-1",
        challenge: "Maintaining reliable device heartbeat tracking across kiosks operating on intermittent or slow cellular connections.",
        solution: "Designed an adaptive heartbeat protocol with local SQLite offline caching and exponential backoff synchronization as an edge resilience specification.",
        implementation: "Architected the kiosk agent to buffer status checkpoints locally during network outages and flush chronologically upon link recovery.",
        result: "Demonstrated zero diagnostic log loss across simulated 4-hour connectivity disconnects."
      },
      {
        id: "kms-2",
        challenge: "Enabling remote troubleshooting without exposing kiosks to public internet attack surfaces.",
        solution: "Proposed reverse WebSocket tunnels initiated exclusively outbound from authorized kiosk agents.",
        implementation: "Engineered secure tunnel broker specifications with timed single-use authentication tokens.",
        result: "Demonstrated remote administration architecture eliminating the need for open inbound firewall ports on edge kiosk hardware."
      }
    ],
    mlPipeline: [
      { name: "Device Heartbeat", description: "Collects CPU, memory, storage, and peripheral health reports." },
      { name: "Uptime Telemetry", description: "Aggregates application operational metrics and crash dumps." },
      { name: "Threshold Analysis", description: "Automated flagging of memory leaks and peripheral disconnects." },
      { name: "Fleet Overview", description: "Presents live geographic and operational status to operators." }
    ],
    securityFeatures: [
      "Proposed architecture: Outbound-only reverse WebSocket design eliminating open ingress ports",
      "Architectural specification: Hardware token and mutual TLS authorization model for edge agents",
      "Access control design: Granular role-based permissions separating fleet admins from regional technicians",
      "Telemetry design: Tamper detection telemetry reporting unauthorized physical enclosure access"
    ],
    devopsPipeline: ["Git Push", "Docker Fleet Daemon Builds", "Unit & Integration Tests", "Remote OTA Agent Rollouts"],
    technologies: ["Python", "FastAPI", "React", "Next.js", "TypeScript", "PostgreSQL", "Docker"],
    keyFeatures: [
      "Centralized fleet management portal for distributed physical kiosks.",
      "Real-time heartbeat monitoring and device health telemetry.",
      "Automated peripheral diagnostics (touch panel, camera, document scanner, printer).",
      "Remote service configuration and automated OTA application updates.",
      "Incident alert dispatching to assigned regional maintenance technicians."
    ],
    accessibilityMeasures: [
      "Accessible high-contrast admin dashboard interface for control room operators.",
      "Keyboard navigable device filter lists and action menus."
    ],
    performanceMetrics: [
      "Telemetry ingestion handling concurrent heartbeats from distributed kiosk fleet.",
      "Sub-second alert propagation upon peripheral failure or heartbeat timeout."
    ],
    lessonsLearned: [
      "In distributed hardware management, edge self-healing and local crash recovery are as vital as cloud dashboards.",
      "Zero-trust communication protocols are essential for hardware placed in public spaces."
    ],
    innovation:
      "Designed an edge-resilient fleet orchestration architecture combining peripheral diagnostics, offline SQLite checkpointing, and outbound-only reverse WebSocket tunnel specs.",
    impact:
      "CDAC National Runner-up; centralizes kiosk health monitoring, remote diagnostics, and technician alerting across distributed public service centers.",
    teamContribution: "Systems Architecture, Telemetry API & Fleet Dashboard",
    scalability:
      "Event-driven FastAPI ingestion with PostgreSQL/Timescale telemetry storage and regional role-based operator dashboards."
  }
};

export const featuredProjectsList: ProjectCaseStudy[] = [
  projectsData["digital-twin-ehv"],
  projectsData["intelligent-grievance-system"],
  projectsData["aquaguard-ai"],
  projectsData["kiosk-management-system"]
];
