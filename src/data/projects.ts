import type { ArchitectureNode } from "@/components/architecture-diagram";
import type { ProjectMediaItem } from "@/components/project-demonstration";

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

export interface EngineeringDecision {
  decision: string;
  rationale: string;
  tradeoff: string;
  status: "Implemented" | "Simulated" | "Proposed";
}

export interface ProblemSummaryDetail {
  problemLabel: string;
  whoFacesIt: string;
  realWorldProblem: string;
  whyNeeded: string;
  existingLimitations: string;
  objective: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  whatHappens: string;
  component: string;
  input: string;
  output: string;
}

export interface GroupedTechCategory {
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "AI/ML"
    | "APIs & Integrations"
    | "Infrastructure"
    | "Tools"
    | "DevTools & Testing";
  items: { name: string; role: string; why: string }[];
}

export interface AiMlDetail {
  modelName: string;
  problemSolved: string;
  inputs: string;
  preprocessing: string;
  approach: string;
  output: string;
  evaluation: string;
  limitations: string;
}

export interface DatabaseAndDataFlow {
  sources: string;
  storageModel: string;
  processing: string;
  apiCommunication: string;
  retrieval: string;
  schemaNote: string;
}

export interface ContributionBreakdown {
  mine: string[];
  team: string[];
  thirdParty: string[];
}

export type VerificationStatus =
  | "Verified implementation"
  | "Verified result"
  | "Simulated demonstration"
  | "Proposed future improvement"
  | "Unknown / needs confirmation";

export interface VerificationItem {
  claim: string;
  status: VerificationStatus;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  category?: string;
  statusLabel?: string;
  achievement?: string;
  githubUrl?: string;
  liveUrl?: string;
  overview?: string;
  problemStatement: string;
  problemSummaryDetail?: ProblemSummaryDetail;
  proposedSolution?: string;
  systemArchitecture: string;
  dataFlow: string;
  architectureNodes?: ArchitectureNode[];
  workflowSteps?: WorkflowStep[];
  groupedTechStack?: GroupedTechCategory[];
  aiMlDetails?: AiMlDetail[] | null;
  aiMlSummaryNote?: string;
  databaseAndDataFlow?: DatabaseAndDataFlow;
  technicalChallenges: TechChallenge[];
  engineeringDecisions?: EngineeringDecision[];
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
  individualContributions?: string[];
  contributionBreakdown?: ContributionBreakdown;
  scalability?: string;
  media?: ProjectMediaItem[];
  limitations?: string[];
  futureImprovements?: string[];
  verificationChecklist?: VerificationItem[];
}

export const projectsData: Record<string, ProjectCaseStudy> = {
  "digital-twin-ehv": {
    id: "digital-twin-ehv",
    title: "Digital Twin of EHV Substation Monitoring",
    tagline: "Predictive Equipment Monitoring & Anomaly Detection Framework",
    category: "Industrial IoT & Predictive AI",
    statusLabel: "SIH Winner (Prototype + Synthetic Evaluation)",
    achievement: "Smart India Hackathon Winner",
    githubUrl: "https://github.com/KANISH-850/oceanBerg_sih",
    overview:
      "Developed by Team Oceanberg for the Smart India Hackathon Grand Finale under the Ministry of Power / Power Grid domain, this system models Extra High Voltage (EHV) substation assets as an interactive 3D digital twin driven by semi-supervised autoencoder anomaly scoring on synthetic and industry-informed SCADA telemetry.",
    problemStatement:
      "Extra High Voltage (EHV) electrical substations face catastrophic downtime and substantial maintenance costs due to unanticipated equipment degradation and thermal overloading across critical transformers and switchgear.",
    problemSummaryDetail: {
      problemLabel: "Project problem summary (official SIH PS number & verbatim PS text awaiting confirmation)",
      whoFacesIt: "Transmission utilities, substation control-room operators, and EHV maintenance engineers.",
      realWorldProblem: "Unexpected transformer winding thermal stress, SF6 breaker pressure decay, and switchgear faults cause cascading grid downtime when only reactive threshold alarms are used.",
      whyNeeded: "Moving from scheduled/reactive maintenance to continuous multi-variate anomaly detection gives operators earlier intervention windows.",
      existingLimitations: "Conventional SCADA panels show tabular single-point alarms without spatial 3D equipment localization or reconstruction-based multivariate scoring.",
      objective: "Pair multi-variate autoencoder anomaly detection with an interactive 3D substation viewport synchronizing transformer, breaker, CT/PT, and busbar states."
    },
    proposedSolution:
      "Combine multi-variate SCADA sensor ingestion, time-series feature extraction, and semi-supervised deep autoencoder reconstruction error scoring to flag thermal or electrical deviations before threshold tripping, synchronized with an interactive Three.js substation viewport.",
    systemArchitecture:
      "A distributed telemetry ingestion and digital twin modeling architecture. High-frequency sensor streams (voltage, current, oil temperature, acoustic vibrations) are ingested through an MQTT broker into InfluxDB time-series storage. Real-time autoencoders evaluate telemetry streams to flag anomalies and drive a 3D digital twin dashboard.",
    dataFlow:
      "Synthetic & Industry-Informed SCADA Telemetry (~50k records) -> MQTT Ingestion Broker (Simulated) -> Python Feature Extraction Worker -> InfluxDB -> TensorFlow Anomaly Engine -> WebSocket Broadcaster -> React 3D Dashboard.",
    architectureNodes: [
      { id: "dt-in-1", title: "SCADA Sensor Stream", subtitle: "~50k synthetic & industry-informed transformer/breaker records", layer: "Ingestion & Input", status: "simulated" },
      { id: "dt-in-2", title: "MQTT Telemetry Broker", subtitle: "Decoupled sensor message ingestion bus", layer: "Ingestion & Input", status: "proposed" },
      { id: "dt-proc-1", title: "Feature Extraction Worker", subtitle: "Rolling windows & FFT spectral normalization", layer: "Processing & AI Core", status: "implemented" },
      { id: "dt-proc-2", title: "Deep Autoencoder Engine", subtitle: "Semi-supervised reconstruction error scoring", layer: "Processing & AI Core", status: "implemented" },
      { id: "dt-out-1", title: "InfluxDB & WebSocket Feed", subtitle: "Time-series storage and low-latency state broadcast", layer: "Storage & Delivery", status: "implemented" },
      { id: "dt-out-2", title: "Three.js 3D Substation Twin", subtitle: "Interactive 400kV bay inspection & fault HUD", layer: "Storage & Delivery", status: "simulated" }
    ],
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
    individualContributions: [
      "Designed and trained the semi-supervised deep autoencoder reconstruction model on synthetic and industry-informed SCADA envelopes.",
      "Implemented rolling-window and FFT feature normalization pipelines in Python for multi-variate transformer monitoring.",
      "Integrated live anomaly status signaling into the interactive Three.js substation viewport and WebSocket HUD."
    ],
    engineeringDecisions: [
      {
        decision: "Semi-supervised Autoencoder over supervised binary classifiers",
        rationale: "Real substation failures are severely class-imbalanced; learning nominal operating envelopes generalizes better to unseen thermal fault signatures.",
        tradeoff: "Requires periodic recalibration when ambient seasonal load baselines shift.",
        status: "Implemented"
      },
      {
        decision: "InfluxDB time-series storage separated from WebSocket broadcast",
        rationale: "Allows historical fault playback without blocking live telemetry stream updates.",
        tradeoff: "Adds operational overhead of maintaining dual write paths in prototype deployments.",
        status: "Implemented"
      },
      {
        decision: "mTLS and isolated SCADA gateway network specification",
        rationale: "Critical utility infrastructure requires strict ingress boundaries before field connection.",
        tradeoff: "Specified at architecture level for utility rollout rather than active inside hackathon sandbox.",
        status: "Proposed"
      }
    ],
    scalability:
      "Designed around decoupled time-series ingestion (InfluxDB), asynchronous feature workers, and WebSocket event broadcasting for multi-bay monitoring.",
    media: [
      {
        title: "400kV Substation Dashboard & Telemetry Overlay",
        caption: "Operator dashboard slot for transformer winding temperature, SF6 pressure, and anomaly reconstruction score timelines.",
        alt: "EHV Substation Digital Twin monitoring dashboard preview",
        type: "dashboard"
      },
      {
        title: "Autoencoder Anomaly Threshold Analysis",
        caption: "Evaluation plot slot showing nominal vs. fault reconstruction error spikes across synthetic SCADA records.",
        alt: "Autoencoder reconstruction error evaluation chart",
        type: "architecture"
      }
    ],
    futureImprovements: [
      "Validate anomaly thresholds against anonymized utility-grade PMU/SCADA historical logs under NDA.",
      "Add edge quantization (ONNX Runtime / TFLite) for substation gateway inference without cloud dependency.",
      "Implement automated drift detection to recalibrate baseline reconstruction envelopes seasonally."
    ],
    workflowSteps: [
      {
        step: "01",
        title: "SCADA Sensor Simulation & Ingestion",
        whatHappens: "Transformer oil/winding temperature, SF6 breaker pressure, and electrical measurements stream into the preprocessing queue.",
        component: "SCADA Sensor Stream / MQTT Spec",
        input: "Multi-variate time-series telemetry (~50k synthetic & industry-informed records)",
        output: "Windowed JSON/frame batches queued for feature extraction"
      },
      {
        step: "02",
        title: "Rolling Window & FFT Feature Transformation",
        whatHappens: "Signals are normalized using rolling statistics and frequency-domain Fast Fourier Transform features.",
        component: "Python Feature Extraction Worker",
        input: "Raw sensor burst frames",
        output: "Standardized feature vectors"
      },
      {
        step: "03",
        title: "Autoencoder Reconstruction Scoring",
        whatHappens: "Deep autoencoder reconstructs nominal equipment signatures; deviations exceeding 3.5 standard deviations trigger anomaly flags.",
        component: "TensorFlow Deep Autoencoder Engine",
        input: "Normalized feature vectors",
        output: "Reconstruction error score + anomaly status"
      },
      {
        step: "04",
        title: "Time-Series Persistence & Live Dispatch",
        whatHappens: "Telemetry slices persist to InfluxDB while live state pushes over WebSockets to the 3D substation canvas.",
        component: "InfluxDB + WebSocket Broadcaster + Three.js Twin",
        input: "Scored telemetry frames",
        output: "Interactive 3D equipment highlighting & operator alerts"
      }
    ],
    groupedTechStack: [
      {
        category: "Frontend",
        items: [
          { name: "React / Next.js", role: "Operator dashboard and interactive route shells", why: "Component modularity and responsive state updates" },
          { name: "Three.js", role: "Interactive 400kV EHV substation 3D visualization", why: "Enables raycasted asset inspection and visual thermal fault cues" }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Python & WebSockets", role: "Feature worker and low-latency telemetry stream server", why: "Seamless integration with TensorFlow scoring loops" }
        ]
      },
      {
        category: "Database",
        items: [
          { name: "InfluxDB", role: "High-frequency time-series telemetry persistence", why: "Optimized storage for timestamped sensor intervals and playback" }
        ]
      },
      {
        category: "AI/ML",
        items: [
          { name: "TensorFlow", role: "Semi-supervised deep autoencoder training and inference", why: "Captures multivariate nominal envelopes without abundant labeled failures" }
        ]
      },
      {
        category: "Infrastructure",
        items: [
          { name: "Docker / MQTT (Spec)", role: "Containerized stack and isolated SCADA ingestion design", why: "Reproducible local deployment and decoupled broker boundary" }
        ]
      }
    ],
    aiMlDetails: [
      {
        modelName: "Semi-Supervised Deep Autoencoder",
        problemSolved: "Detecting rare transformer thermal stress and switchgear degradation where labeled failure examples are scarce.",
        inputs: "Multi-variate SCADA sensor readings (voltage, current, winding/oil temperature, acoustic/vibration channels).",
        preprocessing: "Rolling-window aggregation, Z-score standardization, and FFT spectral transformations.",
        approach: "Trained exclusively on nominal operational envelopes; anomalies flagged when reconstruction MSE exceeds 3.5 standard deviations.",
        output: "Scalar reconstruction error score, severity threshold flag, and affected asset telemetry trace.",
        evaluation: "Reported 94% anomaly detection accuracy and ~50ms internal test inference target across ~50,000 synthetic and industry-informed records.",
        limitations: "Evaluated on synthetic and industry-informed records rather than live utility PMU/SCADA logs; requires seasonal baseline recalibration."
      }
    ],
    databaseAndDataFlow: {
      sources: "Synthetic and industry-informed SCADA telemetry streams (~50,000 records) representing transformer temperatures, SF6 breaker pressure, and busbar load.",
      storageModel: "InfluxDB time-series buckets paired with in-memory WebSocket state frames.",
      processing: "Python workers compute rolling-window averages and FFT features before passing vectors to TensorFlow autoencoder scoring.",
      apiCommunication: "WebSocket stream pushes state deltas to frontend Web Workers / Canvas renderers.",
      retrieval: "Operators inspect live anomaly alerts or replay historical telemetry intervals.",
      schemaNote: "Specific InfluxDB measurement/tag schema definitions are stored in the project source repository and not duplicated verbatim inside this portfolio workspace."
    },
    contributionBreakdown: {
      mine: [
        "Designed and trained the semi-supervised deep autoencoder reconstruction pipeline.",
        "Built rolling-window and FFT feature normalization workers in Python.",
        "Integrated live anomaly status signaling into the Three.js 3D substation scene and portfolio demonstration."
      ],
      team: [
        "Team Oceanberg collaborators contributed to full-stack integration, hackathon system wiring, and presentation delivery (exact teammate breakdown not individually enumerated in local portfolio files)."
      ],
      thirdParty: [
        "Open-source runtime stack: TensorFlow, InfluxDB, React, Next.js, Three.js, and Docker."
      ]
    },
    limitations: [
      "Trained and evaluated on ~50,000 synthetic and industry-informed records rather than proprietary utility substation feeds.",
      "MQTT broker isolation, mTLS tunnels, and edge RBAC remain architectural deployment specifications rather than live utility integration.",
      "No independent utility production SLA benchmark exists yet."
    ],
    verificationChecklist: [
      { claim: "Smart India Hackathon Grand Finale 1st Place Winner (Team Oceanberg)", status: "Verified result" },
      { claim: "Semi-supervised autoencoder & FFT/rolling feature extraction architecture", status: "Verified implementation" },
      { claim: "~50,000 synthetic/industry-informed records & 94% test anomaly detection", status: "Simulated demonstration" },
      { claim: "Interactive 3D 400kV Substation Twin with Fault Simulation on portfolio", status: "Simulated demonstration" },
      { claim: "MQTT isolation, mTLS WebSockets & edge ONNX deployment", status: "Proposed future improvement" },
      { claim: "Official SIH Problem Statement number & verbatim wording", status: "Unknown / needs confirmation" }
    ]
  },

  "intelligent-grievance-system": {
    id: "intelligent-grievance-system",
    title: "Intelligent Multilingual Grievance Categorization & Dispatch",
    tagline: "AI-Powered NLP Framework for Automated Public Service Routing",
    category: "Multilingual Civic NLP & Workflow Automation",
    statusLabel: "Implemented NLP & Confidence-Gated Dispatch Pipeline",
    githubUrl: "https://github.com/KANISH-850/intelligent-grievance-system",
    overview:
      "A multilingual civic NLP and ticketing framework engineered to normalize regional Indian language citizen complaints, categorize departmental ownership, prioritize urgent incidents, and preserve human oversight for low-confidence cases.",
    problemStatement:
      "Public administration departments receive thousands of citizen complaints across multiple regional languages. Manual sorting causes severe dispatch bottlenecks, delayed SLAs, and misallocated department tickets.",
    problemSummaryDetail: {
      problemLabel: "Project problem summary",
      whoFacesIt: "Citizens filing grievances in regional Indian languages and municipal department dispatch operators.",
      realWorldProblem: "Manual multilingual complaint triage creates ticket backlogs, inconsistent severity tagging, and frequent misrouting across public departments.",
      whyNeeded: "Accessible civic portals require language-agnostic intake alongside deterministic accountability so uncertain cases are never misrouted silently.",
      existingLimitations: "Monolingual keyword rules fail on regional scripts/transliteration, while unconstrained LLMs risk hallucinated categories without audit confidence gates.",
      objective: "Translate regional grievances rapidly with quantized IndicTrans2, embed with Sentence Transformers, classify via BERT, and enforce an 85% confidence threshold."
    },
    proposedSolution:
      "Build an end-to-end NLP routing pipeline pairing quantized IndicTrans2 translation, 768-dimensional Sentence Transformer embeddings, and BERT classification with an explicit confidence gate that routes uncertain tickets to human reviewers.",
    systemArchitecture:
      "A dual-layer microservices architecture combining a React 19 / TypeScript frontend with a FastAPI / Node.js backend. Submitted grievances undergo automatic language identification and translation via IndicTrans2, followed by semantic embedding extraction with Sentence Transformers and BERT for department categorization and priority routing in PostgreSQL.",
    dataFlow:
      "Citizen Text/Audio Submission -> API Gateway -> IndicTrans2 Translation -> BERT / Sentence Transformer Classifier -> Department Routing Engine -> PostgreSQL / Prisma -> Admin Review Dashboard.",
    architectureNodes: [
      { id: "igs-in-1", title: "Multilingual Citizen Portal", subtitle: "React 19 + Senior Citizen high-contrast accessibility mode", layer: "Ingestion & Input", status: "implemented" },
      { id: "igs-in-2", title: "Language Detection & Normalization", subtitle: "Unicode normalization and PII sanitization pre-filter", layer: "Ingestion & Input", status: "implemented" },
      { id: "igs-proc-1", title: "IndicTrans2 (INT8 ONNX)", subtitle: "Regional language to English pivot translation", layer: "Processing & AI Core", status: "implemented" },
      { id: "igs-proc-2", title: "Sentence Transformers + BERT", subtitle: "768-d embeddings, department & urgency scoring + 85% confidence gate", layer: "Processing & AI Core", status: "implemented" },
      { id: "igs-out-1", title: "PostgreSQL + Prisma Dispatch", subtitle: "Department routing, human review queue & audit timeline", layer: "Storage & Delivery", status: "implemented" },
      { id: "igs-out-2", title: "Department Webhook & Encryption-at-Rest", subtitle: "External departmental webhook & AES-256 storage specification", layer: "Storage & Delivery", status: "proposed" }
    ],
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
    individualContributions: [
      "Architected the quantized IndicTrans2 -> Sentence Transformers -> BERT classification pipeline in FastAPI.",
      "Implemented the 85% confidence threshold router to isolate ambiguous complaints for human review.",
      "Designed Senior Citizen accessibility mode and Prisma/PostgreSQL ticket tracking workflows."
    ],
    engineeringDecisions: [
      {
        decision: "INT8 quantized ONNX IndicTrans2 pivot translation + BERT rather than a large generative LLM",
        rationale: "Deterministic multi-class categorization with sub-second response and predictable memory footprint without external API billing.",
        tradeoff: "Requires fine-tuning when new civic department taxonomy categories are introduced.",
        status: "Implemented"
      },
      {
        decision: "Mandatory 85% confidence gate before automated dispatch",
        rationale: "Prevents high-urgency civic issues from being misrouted silently by low-confidence predictions.",
        tradeoff: "Increases operator review volume during initial cold-start rollout.",
        status: "Implemented"
      },
      {
        decision: "Field-level PII redaction & AES-256 database encryption model",
        rationale: "Citizen submissions often contain sensitive IDs and addresses that must be protected from model logs.",
        tradeoff: "Full HSM-backed key rotation is scoped as an operational deployment spec.",
        status: "Proposed"
      }
    ],
    scalability:
      "Stateless FastAPI inference workers paired with PostgreSQL/Prisma persistence and confidence-threshold human review queues.",
    media: [
      {
        title: "Multilingual Citizen Grievance Intake & Senior Mode",
        caption: "UI capture slot for regional text input, voice capture, and enlarged accessibility target controls.",
        alt: "Intelligent Grievance System multilingual citizen form",
        type: "screenshot"
      },
      {
        title: "Department Routing & Human-in-the-Loop Queue",
        caption: "Admin dashboard slot showing confidence scores, automated category tags, and manual review escalations.",
        alt: "Grievance dispatch queue dashboard preview",
        type: "dashboard"
      }
    ],
    futureImprovements: [
      "Add regional dialect speech-to-text evaluation benchmarks across Tamil, Hindi, and Telugu audio inputs.",
      "Integrate automated duplicate-ticket clustering using pgvector cosine similarity.",
      "Publish end-to-end containerized load test benchmarks for concurrent FastAPI workers."
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Multilingual Citizen Intake & Normalization",
        whatHappens: "Citizen submits text or voice grievance; Unicode normalization and PII sanitization clean sensitive IDs.",
        component: "React 19 Citizen Portal + PII Pre-filter",
        input: "Regional Indian language complaint text / voice transcript",
        output: "Sanitized UTF-8 complaint payload + detected language tag"
      },
      {
        step: "02",
        title: "Quantized Pivot Translation",
        whatHappens: "IndicTrans2 INT8 ONNX model translates non-English text into canonical English with Redis caching for repeated queries.",
        component: "IndicTrans2 ONNX Service",
        input: "Sanitized regional text",
        output: "English pivot text + translation latency telemetry (<500ms)"
      },
      {
        step: "03",
        title: "Semantic Embedding & BERT Categorization",
        whatHappens: "Sentence Transformers extract 768-d vectors and BERT classifies department category + urgency.",
        component: "Sentence Transformers + BERT Classifier (FastAPI)",
        input: "Normalized English pivot text",
        output: "Predicted department, urgency tier, and softmax confidence score"
      },
      {
        step: "04",
        title: "Confidence Gate & Dispatch Persistence",
        whatHappens: "Scores >=85% auto-route to the target department in PostgreSQL/Prisma; scores <85% route to Human Review.",
        component: "Confidence Router + PostgreSQL/Prisma",
        input: "Department label + confidence score",
        output: "Auto-dispatched ticket or queued human review task + audit trail"
      }
    ],
    groupedTechStack: [
      {
        category: "Frontend",
        items: [
          { name: "React 19 & TypeScript", role: "Citizen portal & supervisor triage views", why: "Strong type safety and accessible form state management" },
          { name: "Tailwind CSS", role: "Responsive styling + Senior Citizen high-contrast mode", why: "Consistent enlarged targets and WCAG-focused layout primitives" }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "FastAPI (Python) & Node.js/Express", role: "ML inference endpoints and API gateway orchestration", why: "Async concurrency for transformer scoring paired with clean API routing" }
        ]
      },
      {
        category: "Database",
        items: [
          { name: "PostgreSQL + Prisma", role: "Ticket persistence, department assignment, and status audit logs", why: "Relational integrity with typed Prisma ORM queries" }
        ]
      },
      {
        category: "AI/ML",
        items: [
          { name: "IndicTrans2 (INT8 ONNX)", role: "Low-latency regional Indian language translation", why: "Reduces translation latency from >2.5s to <500ms in local runtime tests" },
          { name: "Sentence Transformers + BERT", role: "768-d semantic embeddings and department/urgency classification", why: "Deterministic supervised routing with inspectable confidence scores" }
        ]
      },
      {
        category: "Infrastructure",
        items: [
          { name: "Docker & GitHub Actions CI", role: "Containerized FastAPI workers and Pytest/Jest CI suites", why: "Portable deployment parity across local and staging environments" }
        ]
      }
    ],
    aiMlDetails: [
      {
        modelName: "IndicTrans2 (8-bit ONNX Quantized)",
        problemSolved: "Normalizing multi-script regional Indian language complaints before downstream classification.",
        inputs: "Unicode-normalized, PII-sanitized citizen complaint strings.",
        preprocessing: "Script/language identification, PII masking of IDs and phone numbers, and Redis cache lookup.",
        approach: "Dynamic INT8 quantization via ONNX Runtime to cut neural machine translation latency.",
        output: "English pivot text for downstream semantic encoding.",
        evaluation: "Reduced average translation latency from >2.5s to <500ms in internal benchmark tests.",
        limitations: "Code-mixed transliterated slang and noisy dialect ASR transcripts can reduce translation fidelity."
      },
      {
        modelName: "Sentence Transformers + BERT Classifier",
        problemSolved: "Multi-class civic department routing and urgency classification with safe abstention.",
        inputs: "Translated English text + 768-dimensional contextual document embeddings.",
        preprocessing: "Tokenization and embedding pooling prior to classification head.",
        approach: "Supervised multi-class BERT classification gated by an explicit 85% confidence threshold.",
        output: "Department route, urgency label, and confidence score routing uncertain tickets to human review.",
        evaluation: "92% classification accuracy on evaluation categories and zero false-positive automated misdispatches under 85% threshold gating.",
        limitations: "Adding new municipal department classes requires labeled retraining; full live civic deployment metrics are not yet published."
      }
    ],
    databaseAndDataFlow: {
      sources: "Multilingual citizen text submissions and Senior Citizen voice-assisted grievance transcripts.",
      storageModel: "PostgreSQL managed via Prisma ORM storing ticket state, confidence metadata, and operator audit timelines.",
      processing: "PII sanitization -> ONNX IndicTrans2 translation -> Sentence Transformer 768-d embedding -> BERT scoring -> 85% threshold branch.",
      apiCommunication: "REST endpoints between React 19 UI, Node.js/Express gateway, and Python FastAPI ML workers.",
      retrieval: "Citizens query ticket audit timelines; supervisors filter human-in-the-loop escalations.",
      schemaNote: "Full Prisma schema/migration files reside in the source repository and are not mirrored inside this portfolio workspace."
    },
    contributionBreakdown: {
      mine: [
        "Architected the quantized IndicTrans2 -> Sentence Transformers -> BERT routing pipeline in FastAPI.",
        "Engineered the 85% confidence gate separating automated routing from human supervisory review.",
        "Built Senior Citizen accessibility mode and Prisma/PostgreSQL ticket tracking flows."
      ],
      team: [
        "Collaborators / repository contributors (individual collaborator split not separately itemized in local portfolio metadata — needs confirmation if collaborative credits apply)."
      ],
      thirdParty: [
        "Open-source models & libraries: AI4Bharat IndicTrans2, Hugging Face BERT & Sentence Transformers, ONNX Runtime, FastAPI, React 19, Prisma, PostgreSQL."
      ]
    },
    limitations: [
      "Evaluated on curated category test splits rather than municipal production complaint traffic.",
      "External departmental webhooks and HSM-managed AES-256 database encryption remain proposed operational specifications."
    ],
    verificationChecklist: [
      { claim: "React 19 + FastAPI + PostgreSQL/Prisma architecture & 85% human review gate", status: "Verified implementation" },
      { claim: "INT8 ONNX IndicTrans2 (<500ms test latency) & 92% BERT evaluation accuracy", status: "Verified result" },
      { claim: "100/100 Lighthouse Accessibility score (internal test)", status: "Verified result" },
      { claim: "Interactive 3D NLP Pipeline Visualizer (Auto-Route vs. Human Review)", status: "Simulated demonstration" },
      { claim: "External municipal webhook dispatch & AES-256 HSM encryption-at-rest", status: "Proposed future improvement" }
    ]
  },

  "aquaguard-ai": {
    id: "aquaguard-ai",
    title: "AquaGuard AI (Neeraran)",
    tagline: "AI-Driven Campus Water Resilience & Demand Forecasting Platform",
    category: "Water Resilience & Time-Series ML",
    statusLabel: "Benchmarked Multi-Model ML System",
    githubUrl: "https://github.com/LakshanyaaJ/neeraran",
    overview:
      "A specialized multi-model water resilience analytics platform built to monitor institutional flow/pressure networks, detect consumption anomalies, isolate distribution leaks with zero false-negative rupture misses on test splits, and forecast 72-hour campus water demand.",
    problemStatement:
      "Educational and institutional campuses experience substantial unmonitored water loss from hidden distribution pipe leaks, supply-demand mismatches, and delayed maintenance responses during peak operational periods.",
    problemSummaryDetail: {
      problemLabel: "Project problem summary",
      whoFacesIt: "Campus facilities engineers, estate water-supply operators, and sustainability teams.",
      realWorldProblem: "Subsurface pipe leaks and diurnal demand swings cause hidden water waste, tank depletion, and reactive pump scheduling.",
      whyNeeded: "Distinguishing a real pipe rupture from ordinary daytime hostel/academic usage peaks requires calibrated pressure-flow ML models.",
      existingLimitations: "Static threshold alarms either flood operators with false alerts at peak hours or miss gradual distribution leaks.",
      objective: "Combine unsupervised anomaly detection (One-Class SVM), supervised leak localization (XGBoost), and 72-hour demand forecasting (CatBoost)."
    },
    proposedSolution:
      "Deploy three specialized tabular/time-series models behind FastAPI—One-Class SVM for unsupervised consumption anomaly detection, XGBoost for leak localization, and CatBoost for 72-hour rolling demand forecasting—feeding an actionable facilities dashboard.",
    systemArchitecture:
      "A multi-model AI telemetry architecture engineered for water resilience. Sensor telemetry from campus flowmeters, pressure gauges, and storage tanks feeds into a centralized Python analytics pipeline. Three specialized ML models operate concurrently: One-Class SVM for anomaly detection, XGBoost for leak identification, and CatBoost for 72-hour forward demand forecasting.",
    dataFlow:
      "Flow & Pressure Telemetry -> Data Cleaning & Feature Pipeline -> One-Class SVM (Anomaly Detection) -> XGBoost (Leak Localization) -> CatBoost (72-Hour Demand Forecast) -> Actionable Interventions Engine -> React Dashboard.",
    architectureNodes: [
      { id: "ag-in-1", title: "Flow & Pressure Telemetry", subtitle: "Zone flowmeters, tank level sensors & pressure gauges", layer: "Ingestion & Input", status: "simulated" },
      { id: "ag-in-2", title: "Feature & Lag Pipeline", subtitle: "24h/48h/72h rolling lags, pressure gradients & cyclical time encodings", layer: "Ingestion & Input", status: "implemented" },
      { id: "ag-proc-1", title: "One-Class SVM + XGBoost", subtitle: "Anomaly boundary detection (3.92ms) & leak classifier (1.14ms)", layer: "Processing & AI Core", status: "implemented" },
      { id: "ag-proc-2", title: "CatBoost 72h Forecaster", subtitle: "Horizon rollout demand prediction (MAE 70.91 L/h, MAPE 9.59%)", layer: "Processing & AI Core", status: "implemented" },
      { id: "ag-out-1", title: "FastAPI Analytics & Dashboard", subtitle: "Prioritized leak alerts & reserve status interface", layer: "Storage & Delivery", status: "implemented" },
      { id: "ag-out-2", title: "Automated Valve Actuation", subtitle: "Hardware valve control interface reserved for facilities staff", layer: "Storage & Delivery", status: "proposed" }
    ],
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
    individualContributions: [
      "Trained and benchmarked One-Class SVM (anomaly), XGBoost (leak detection), and CatBoost (72-hour forecasting) models on calibrated campus water telemetry splits.",
      "Engineered rolling 24h/48h/72h lag features and pressure gradient ratios to separate sudden pipe leaks from normal peak demand.",
      "Built FastAPI inference endpoints exposing model evaluation outputs and maintenance prioritization alerts."
    ],
    engineeringDecisions: [
      {
        decision: "Three task-specific models (One-Class SVM, XGBoost, CatBoost) over one monolithic neural model",
        rationale: "Tabular sensor telemetry responds better in accuracy, sub-4ms anomaly/leak latency, and explainability with gradient-boosted trees and one-class boundaries.",
        tradeoff: "Requires maintaining three separate training and feature pipelines.",
        status: "Implemented"
      },
      {
        decision: "Prioritizing 100% leak recall in XGBoost threshold tuning",
        rationale: "A missed pipe rupture costs substantially more in water loss than an extra maintenance inspection alert.",
        tradeoff: "Slightly higher sensitivity to sharp pressure transients.",
        status: "Implemented"
      },
      {
        decision: "Automated remote valve actuation",
        rationale: "Closing distribution valves remotely carries operational safety risks without physical verification.",
        tradeoff: "Kept as a proposed facilities-approved extension rather than autonomous execution.",
        status: "Proposed"
      }
    ],
    scalability:
      "Lightweight specialized inference models (sub-4ms anomaly/leak scoring on test splits) served via FastAPI for multi-zone campus sensor networks.",
    media: [
      {
        title: "Model Comparison & 72-Hour Demand Forecast",
        caption: "Evaluation plot slot showing CatBoost 72-hour demand rollout vs. ground-truth flow curves.",
        alt: "AquaGuard AI 72-hour demand forecasting evaluation chart",
        type: "architecture"
      },
      {
        title: "Zone Leak Detection & Repair Prioritization View",
        caption: "Dashboard capture slot displaying zone pressure differentials, leak severity ranking, and reserve alerts.",
        alt: "AquaGuard AI zone monitoring dashboard preview",
        type: "dashboard"
      }
    ],
    futureImprovements: [
      "Conduct longitudinal field calibration across live campus flowmeter hardware over full monsoon/summer seasons.",
      "Add automated SHAP feature-attribution summaries inside operator leak tickets.",
      "Integrate acoustic hydrophone sensor signals alongside pressure/flow telemetry."
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Zone Flow & Pressure Ingestion",
        whatHappens: "Flowmeters, overhead reservoir level sensors, and zone pressure gauges feed time-indexed readings into the pipeline.",
        component: "Flow & Pressure Telemetry Ingestion",
        input: "Campus zone flow rates (L/min) & line pressure readings",
        output: "Validated time-series telemetry records"
      },
      {
        step: "02",
        title: "Rolling Lag & Pressure Differential Feature Pipeline",
        whatHappens: "Computes 24h/48h/72h rolling demand lags, cyclical schedule/time features, temperature regressors, and pressure drop slopes.",
        component: "Python Feature Engineering Worker",
        input: "Cleaned time-series telemetry",
        output: "Aligned tabular & horizon feature matrices"
      },
      {
        step: "03",
        title: "Multi-Model Inference Triad",
        whatHappens: "One-Class SVM detects outlier consumption, XGBoost localizes leaks, and CatBoost rolls out a 72-hour consumption forecast.",
        component: "One-Class SVM + XGBoost + CatBoost (FastAPI)",
        input: "Engineered feature vectors",
        output: "Anomaly flag, leak probability/zone, and 72h L/h demand curve"
      },
      {
        step: "04",
        title: "Prioritized Maintenance & Reserve Alerts",
        whatHappens: "Ranks suspected leaks by estimated water loss severity and recommends pump/valve checks to facilities teams.",
        component: "Actionable Interventions Engine & React Dashboard",
        input: "Model predictions & reserve thresholds",
        output: "Prioritized repair queue & reserve shortage alerts"
      }
    ],
    groupedTechStack: [
      {
        category: "Frontend",
        items: [
          { name: "React / TypeScript / Tailwind CSS", role: "Facilities telemetry dashboard & repair priority queue", why: "Responsive status cards usable on maintenance technicians' tablets" }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Python & FastAPI", role: "Real-time inference serving & feature pipeline execution", why: "Sub-4ms anomaly/leak scoring endpoints cleanly typed with Pydantic" }
        ]
      },
      {
        category: "AI/ML",
        items: [
          { name: "One-Class SVM (Scikit-learn)", role: "Unsupervised consumption anomaly detection", why: "Models nominal operating envelope cleanly (3.92 ms test latency)" },
          { name: "XGBoost", role: "Supervised distribution pipe leak identification", why: "Captures nonlinear pressure-slope/flow interactions with 100% leak recall on test splits (1.14 ms)" },
          { name: "CatBoost", role: "72-hour forward campus water demand forecasting", why: "Strong categorical/cyclical schedule handling (MAE 70.91 L/h, MAPE 9.59%)" }
        ]
      },
      {
        category: "Infrastructure",
        items: [
          { name: "Docker & Automated Test Suites", role: "Containerized FastAPI inference service and verification checks", why: "Reproducible campus edge deployment packaging" }
        ]
      }
    ],
    aiMlDetails: [
      {
        modelName: "One-Class SVM",
        problemSolved: "Unsupervised detection of abnormal zone consumption without requiring exhaustive labeled anomaly classes.",
        inputs: "Zone flow rates, time-of-day diurnal features, and baseline variance ratios.",
        preprocessing: "Feature scaling calibrated on normal operating demand intervals.",
        approach: "One-class boundary separation flagging out-of-distribution demand bursts.",
        output: "Binary anomaly signal + boundary margin score.",
        evaluation: "99.89% accuracy, F1 Score 0.7451, 3.92 ms inference latency on calibrated test partition.",
        limitations: "Extreme holiday/exam campus schedule shifts require updated nominal calibration intervals."
      },
      {
        modelName: "XGBoost Leak Classifier",
        problemSolved: "Separating true subsurface pipe leaks from normal peak student hostel or academic block usage.",
        inputs: "Pressure differential slopes, flow ratios, and baseline diurnal residuals.",
        preprocessing: "Pressure gradient extraction and class-imbalance threshold tuning.",
        approach: "Gradient-boosted decision trees tuned to prioritize zero false-negative rupture misses.",
        output: "Zone leak probability and severity ranking for repair dispatch.",
        evaluation: "99.79% accuracy, 100% leak recall, 1.14 ms inference latency on benchmark leak dataset.",
        limitations: "High recall threshold can trigger extra inspection tickets during sudden transient pressure drops."
      },
      {
        modelName: "CatBoost 72-Hour Demand Forecaster",
        problemSolved: "Short-horizon reserve planning across shifting academic schedules and ambient conditions.",
        inputs: "24h/48h/72h rolling consumption lags, cyclical time encodings, and temperature regressors.",
        preprocessing: "Windowed lag alignment and missing-interval interpolation.",
        approach: "Symmetric oblivious trees trained with L2 regression loss for recursive 72h rollouts.",
        output: "Hourly consumption forecast curve (L/h) for the next 72 hours.",
        evaluation: "MAE 70.91 L/h, MAPE 9.59%, 573.8 ms 72-hour rollout latency.",
        limitations: "Accuracy across multi-season monsoon vs. summer shifts awaits longitudinal hardware telemetry."
      }
    ],
    databaseAndDataFlow: {
      sources: "Flowmeters, overhead storage tank levels, and zone pressure sensors (calibrated benchmark splits & live twin simulation).",
      storageModel: "Python telemetry frames and evaluated dataset partitions; dedicated external production DB schema not embedded in portfolio metadata.",
      processing: "Feature worker constructs 24h/48h/72h lags and pressure gradients prior to parallel One-Class SVM / XGBoost / CatBoost scoring.",
      apiCommunication: "FastAPI inference routes return scored anomaly flags, leak rankings, and 72h demand horizons to React frontend.",
      retrieval: "Facilities teams view per-zone leak priority cards and pump schedule advisories.",
      schemaNote: "Repository primarily focuses on ML training, evaluation pipelines, and FastAPI analytics; persistent SQL table DDL is not stored in this portfolio repo."
    },
    contributionBreakdown: {
      mine: [
        "Trained and benchmarked One-Class SVM, XGBoost, and CatBoost pipelines on calibrated campus water telemetry partitions.",
        "Engineered 24h/48h/72h rolling lag features and pressure-slope leak indicators.",
        "Implemented FastAPI model inference routes and interactive Zone B leak digital twin preview."
      ],
      team: [
        "Built in collaboration under the Neeraran repository (`LakshanyaaJ/neeraran`); exact contributor commit split across teammates is not enumerated locally."
      ],
      thirdParty: [
        "Open-source libraries: Scikit-learn, XGBoost, CatBoost, FastAPI, React, TypeScript, Tailwind CSS, Three.js."
      ]
    },
    limitations: [
      "Reported metrics reflect calibrated dataset test partitions rather than multi-month physical utility field trials.",
      "Automated physical valve actuation remains an unimplemented facilities-safety proposal."
    ],
    verificationChecklist: [
      { claim: "One-Class SVM (99.89% Acc, 0.7451 F1, 3.92ms) on test partition", status: "Verified result" },
      { claim: "XGBoost leak detection (99.79% Acc, 100% recall, 1.14ms) on test dataset", status: "Verified result" },
      { claim: "CatBoost 72h forecast (MAE 70.91 L/h, MAPE 9.59%, 573.8ms)", status: "Verified result" },
      { claim: "FastAPI inference pipeline & React monitoring interface", status: "Verified implementation" },
      { claim: "Interactive 3D Campus Water Network with Zone B Leak Simulation", status: "Simulated demonstration" },
      { claim: "Automated physical valve actuation hardware control", status: "Proposed future improvement" }
    ]
  },

  "kiosk-management-system": {
    id: "kiosk-management-system",
    title: "Kiosk Management System",
    tagline: "Integrated Fleet Management & Device Telemetry Platform",
    category: "Civic Hardware & Fleet Telemetry",
    statusLabel: "CDAC Runner-up (Core Fleet Platform + Architectural Specs)",
    achievement: "CDAC Runner-up",
    githubUrl: "https://github.com/KANISH-850/aazhi",
    overview:
      "Built for the C-DAC SUVIDHA Innovation Challenge (National Runner-up, Team Oceanberg), AAZHI combines a multilingual citizen-facing service kiosk interface with a centralized fleet management and peripheral telemetry orchestration platform.",
    problemStatement:
      "Public-facing service kiosks distributed across multiple government centers frequently suffer from unmonitored hardware lockups, fragmented update processes, and delayed technician dispatch due to lack of centralized telemetry.",
    problemSummaryDetail: {
      problemLabel: "Project problem summary (official C-DAC SUVIDHA problem text awaiting confirmation)",
      whoFacesIt: "Public municipal kiosk citizens, regional field technicians, and civic IT fleet administrators.",
      realWorldProblem: "Distributed public-service kiosks silently go offline due to thermal printer paper jams, camera/touch freezes, or intermittent cellular dropouts.",
      whyNeeded: "Without centralized heartbeat health telemetry and accessible UI fallbacks, citizens cannot complete essential services and technicians lack fault visibility.",
      existingLimitations: "Opening inbound SSH/VPN ports on unattended kiosks exposes public infrastructure to security threats, while connectivity outages drop diagnostic logs.",
      objective: "Combine an elderly-friendly multilingual citizen interface with a FastAPI/PostgreSQL fleet portal and edge-resilient telemetry specs."
    },
    proposedSolution:
      "Deliver a centralized FastAPI/PostgreSQL fleet orchestration portal paired with lightweight edge kiosk telemetry agents that report CPU/memory/peripheral states, buffer intermittent outages via SQLite specs, and expose safe outbound diagnostic channels.",
    systemArchitecture:
      "A centralized device orchestration platform built with Python, FastAPI, React, and PostgreSQL. Client-side kiosk daemons communicate with an administrative control server via authenticated heartbeats, reporting hardware resource consumption, peripheral health (touch, printers, cameras), and application uptime.",
    dataFlow:
      "Kiosk Daemon Telemetry (Simulated) -> Secure API Gateway -> Ingestion Worker -> PostgreSQL / Timescale -> Alert Evaluator -> Administrative Fleet Dashboard.",
    architectureNodes: [
      { id: "kms-in-1", title: "Kiosk Citizen UI & Accessibility", subtitle: "Voice-guided multilingual interface with elderly-friendly touch mode", layer: "Ingestion & Input", status: "implemented" },
      { id: "kms-in-2", title: "Edge Daemon & SQLite Buffer", subtitle: "Peripheral polling (touch, printer, camera) + offline buffering spec", layer: "Ingestion & Input", status: "proposed" },
      { id: "kms-proc-1", title: "FastAPI Telemetry Gateway", subtitle: "Heartbeat ingestion, crash aggregation & threshold evaluation", layer: "Processing & AI Core", status: "implemented" },
      { id: "kms-proc-2", title: "Outbound Reverse WSS Broker", subtitle: "Zero-open-port remote diagnostics tunnel specification", layer: "Processing & AI Core", status: "proposed" },
      { id: "kms-out-1", title: "PostgreSQL Fleet State Store", subtitle: "Device inventory, uptime history & alert routing", layer: "Storage & Delivery", status: "implemented" },
      { id: "kms-out-2", title: "Admin Fleet & 3D Hardware Twin", subtitle: "Operator portal and interactive 3D peripheral simulation", layer: "Storage & Delivery", status: "simulated" }
    ],
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
    individualContributions: [
      "Built the FastAPI telemetry ingestion service and PostgreSQL fleet status models for device heartbeats and peripheral monitoring.",
      "Implemented the React/Next.js administrative dashboard and accessible kiosk UI components.",
      "Designed the offline SQLite buffering and outbound-only reverse WebSocket specification for field-resilient kiosk operations."
    ],
    engineeringDecisions: [
      {
        decision: "Outbound-only reverse WebSocket tunnel model instead of SSH/inbound VPN ports",
        rationale: "Public kiosks sit behind NAT and municipal firewalls; outbound agent initiation eliminates public port exposure.",
        tradeoff: "Requires stateful broker connection tracking on the control plane (scoped as proposed production spec).",
        status: "Proposed"
      },
      {
        decision: "FastAPI + PostgreSQL core with Dockerized daemon packaging",
        rationale: "Provides strong schema typing, async heartbeat concurrency, and consistent environment parity.",
        tradeoff: "High-frequency metric rollups require Timescale or retention compaction over multi-year runs.",
        status: "Implemented"
      },
      {
        decision: "Dedicated elderly-friendly & multilingual kiosk accessibility modes",
        rationale: "Public civic kiosks serve citizens with diverse literacy and visual abilities.",
        tradeoff: "Increases UI state matrix testing across voice and high-contrast modes.",
        status: "Implemented"
      }
    ],
    scalability:
      "Event-driven FastAPI ingestion with PostgreSQL/Timescale telemetry storage and regional role-based operator dashboards.",
    media: [
      {
        title: "AAZHI Smart Urban Kiosk Citizen Interface",
        caption: "UI capture slot for multilingual touch workflows and voice-assisted elderly accessibility mode.",
        alt: "AAZHI Kiosk citizen interface screenshot",
        type: "screenshot"
      },
      {
        title: "Fleet Health & Peripheral Telemetry Console",
        caption: "Admin dashboard slot displaying kiosk heartbeat timelines, printer paper alerts, and camera status.",
        alt: "Kiosk Management System fleet dashboard preview",
        type: "dashboard"
      }
    ],
    futureImprovements: [
      "Implement signed cryptographic OTA bundle verification (Ed25519) inside the edge daemon.",
      "Benchmark 1,000+ concurrent simulated kiosk heartbeats against TimescaleDB hypertables.",
      "Add hardware watchdog integration for automated USB peripheral power-cycling."
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Citizen Service Selection & Accessibility Mode",
        whatHappens: "Citizen chooses utility billing, grievance intake, or certificate services using multilingual touch or elderly high-contrast controls.",
        component: "AAZHI Kiosk Citizen Interface",
        input: "Touch / voice-assisted citizen selection",
        output: "Active service workflow payload & UI telemetry state"
      },
      {
        step: "02",
        title: "Heartbeat & Peripheral Health Polling",
        whatHappens: "Kiosk telemetry agent collects CPU/memory metrics alongside thermal printer, touch panel, and scanner status (with SQLite buffering spec on link drops).",
        component: "FastAPI Telemetry Gateway + Edge Daemon Spec",
        input: "Device health JSON heartbeats",
        output: "Validated fleet status update or queued offline checkpoint"
      },
      {
        step: "03",
        title: "Threshold Evaluation & Fleet Storage",
        whatHappens: "Control server evaluates missed heartbeats, paper-out warnings, and crash dumps before persisting device inventory states.",
        component: "PostgreSQL Fleet Store + Alert Evaluator",
        input: "Normalized telemetry payload",
        output: "Updated kiosk health record & regional technician alert"
      },
      {
        step: "04",
        title: "Receipt Output & Admin Fleet Console",
        whatHappens: "Kiosk issues physical confirmation receipt to the citizen while admins monitor distributed status on the portal.",
        component: "Thermal Receipt Workflow + Admin Dashboard",
        input: "Completed service transaction & fleet state",
        output: "Printed token receipt + live fleet control plane UI"
      }
    ],
    groupedTechStack: [
      {
        category: "Frontend",
        items: [
          { name: "React / Next.js / TypeScript", role: "Citizen kiosk UI and fleet administration portal", why: "Shared typed components supporting high-contrast accessibility and control room tables" }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Python & FastAPI", role: "Asynchronous heartbeat ingestion and peripheral alert evaluation API", why: "High-concurrency async route handling and automatic OpenAPI validation" }
        ]
      },
      {
        category: "Database",
        items: [
          { name: "PostgreSQL (+ SQLite edge buffer spec)", role: "Centralized fleet inventory/uptime state and offline edge checkpoint design", why: "Relational durability centrally paired with lightweight zero-config edge queueing" }
        ]
      },
      {
        category: "Infrastructure",
        items: [
          { name: "Docker & Outbound WSS Spec", role: "Containerized services and NAT-safe reverse diagnostic tunnel design", why: "Standardized fleet runtime without exposing inbound kiosk firewall ports" }
        ]
      }
    ],
    aiMlDetails: null,
    aiMlSummaryNote:
      "AAZHI is primarily a distributed systems, human-computer accessibility, and telemetry orchestration platform rather than a predictive ML model project; automated diagnostics rely on deterministic heartbeat timeouts and peripheral threshold rules.",
    databaseAndDataFlow: {
      sources: "Simulated kiosk heartbeat telemetry (CPU, memory, disk, touch/printer/camera states) and citizen service session interactions.",
      storageModel: "PostgreSQL central fleet state store paired with a local SQLite offline buffer architectural specification at the edge.",
      processing: "FastAPI ingestion worker validates heartbeat intervals, detects missed pings or peripheral faults, and triggers technician alerts.",
      apiCommunication: "REST heartbeat endpoints centrally plus proposed outbound-only reverse WebSocket diagnostic tunnel specification.",
      retrieval: "Fleet administrators inspect regional device status, uptime timelines, and peripheral alert queues.",
      schemaNote: "Full SQL table migrations reside inside the source repository (`KANISH-850/aazhi`) and are not duplicated verbatim in this portfolio site."
    },
    contributionBreakdown: {
      mine: [
        "Built the FastAPI telemetry ingestion service and PostgreSQL fleet status tracking core.",
        "Implemented React/Next.js fleet monitoring views and accessible kiosk UI components.",
        "Designed the SQLite offline buffering and outbound reverse WebSocket resilience specification."
      ],
      team: [
        "Team Oceanberg collaborators contributed to challenge ideation, citizen UI modules, and hardware demo presentation for the C-DAC SUVIDHA Innovation Challenge."
      ],
      thirdParty: [
        "Open-source stack: FastAPI, PostgreSQL, React, Next.js, TypeScript, Docker, Three.js."
      ]
    },
    limitations: [
      "4-hour connectivity dropout recovery and reverse WSS tunneling were validated in simulated/architectural prototypes rather than municipal field kiosks.",
      "TimescaleDB 1,000+ device concurrency benchmarking and Ed25519 signed OTA verification remain future engineering tasks."
    ],
    verificationChecklist: [
      { claim: "C-DAC SUVIDHA Innovation Challenge National Runner-up (Team Oceanberg)", status: "Verified result" },
      { claim: "FastAPI telemetry backend, PostgreSQL fleet state & accessible kiosk UI", status: "Verified implementation" },
      { claim: "Interactive 3D Smart Kiosk Workflow + Receipt Animation on portfolio", status: "Simulated demonstration" },
      { claim: "Simulated 4-hour offline buffering test scenario", status: "Simulated demonstration" },
      { claim: "Outbound reverse WSS broker, mTLS hardware tokens & TimescaleDB scale", status: "Proposed future improvement" },
      { claim: "Official C-DAC SUVIDHA PS wording / competition score breakdown", status: "Unknown / needs confirmation" }
    ]
  },

  "webscraper": {
    id: "webscraper",
    title: "HealScrape — AI Self-Healing Web Scraper",
    tagline: "Schema-Drift Detecting Extraction Platform with Automated LLM Selector Repair",
    category: "Data Pipelines & Self-Healing AI",
    statusLabel: "Implemented Prototype (Bright Data + LLM Drift Repair)",
    githubUrl: "https://github.com/KANISH-850/webscraper",
    overview:
      "HealScrape is a full-stack web data extraction and monitoring platform engineered to detect HTML structural changes automatically, diagnose broken CSS selectors using LLM reasoning, and repair failing extraction pipelines without manual developer intervention.",
    problemStatement:
      "Traditional CSS/DOM web scrapers are brittle: when a target webpage changes markup or API shapes, scrapers silently return empty fields or crash, requiring engineers to manually inspect HTML diffs, rewrite selectors, and redeploy.",
    problemSummaryDetail: {
      problemLabel: "Repository-documented problem summary (HealScrape README)",
      whoFacesIt: "Data engineers, research analysts, and automation pipelines relying on recurring structured web extraction.",
      realWorldProblem: "Target DOM layout updates invalidate hard-coded CSS selectors and output field types, breaking downstream data feeds silently.",
      whyNeeded: "Validating extracted records against inferred expected schemas enables automatic failure detection and automated repair.",
      existingLimitations: "Static scrapers lack quality scoring, expected schema tracking, and automated selector regeneration.",
      objective: "Combine type-aware schema validation with a dual-path healing workflow: Bright Data schema synchronization and LLM-driven HTML selector repair."
    },
    proposedSolution:
      "Orchestrate natural-language scraper creation, Bright Data collector / direct Cheerio extraction, type-aware schema validation (computing dataQuality scores), and automatic dual-path recovery via schema synchronization or LLM CSS plan regeneration persisted in SQLite via Prisma.",
    systemArchitecture:
      "React 19 + TypeScript Vite SPA communicates via REST with an Express 5 / TypeScript backend backed by SQLite + Prisma ORM (5 models). Extraction combines Bright Data Collector API (with mock fallback when credentials are omitted) and Cheerio DOM querying, while aiPlanner.ts and aiDiagnosis.ts call Groq SDK JSON-mode models (and include @google/generative-ai dependencies).",
    dataFlow:
      "Target HTTP/HTTPS URL (SSRF Checked) -> Bright Data Collector / Direct HTML -> Cheerio ExtractionPlan -> Type-Aware Validator (dataQuality) -> On Drift: Schema Sync OR LLM Selector Repair -> Re-Run & Validate -> Prisma SQLite.",
    architectureNodes: [
      { id: "ws-in-1", title: "Scraper Config & SSRF Guard", subtitle: "Natural-language prompt & public HTTP/HTTPS URL validator", layer: "Ingestion & Input", status: "implemented" },
      { id: "ws-in-2", title: "Bright Data / Cheerio Fetcher", subtitle: "Collector API with recursive normalizer + data.json demo fallback", layer: "Ingestion & Input", status: "implemented" },
      { id: "ws-proc-1", title: "Type-Aware Schema Validator", subtitle: "Scores URL/string/number conformance & strips obsolete links", layer: "Processing & AI Core", status: "implemented" },
      { id: "ws-proc-2", title: "Dual-Path Healing Engine", subtitle: "Path 1: Schema sync; Path 2: LLM HTML & CSS selector diagnosis", layer: "Processing & AI Core", status: "implemented" },
      { id: "ws-out-1", title: "Prisma SQLite Store (5 Models)", subtitle: "Scraper, ScraperRun, ScraperResult, ScraperSchema & HealingAttempt", layer: "Storage & Delivery", status: "implemented" },
      { id: "ws-out-2", title: "Demo Failure & Terminal Log UI", subtitle: "Simulated structural breakage mode + Recharts health dashboard", layer: "Storage & Delivery", status: "simulated" }
    ],
    workflowSteps: [
      {
        step: "01",
        title: "URL Registration & SSRF Screening",
        whatHappens: "User submits target URL and natural-language extraction prompt; Express middleware rejects localhost, 127.0.0.1, 0.0.0.0, and non-HTTP/HTTPS schemes.",
        component: "Express Route Guard (scrapers.ts)",
        input: "Target URL + optional extraction_prompt",
        output: "Persisted Scraper + default ScraperSchema"
      },
      {
        step: "02",
        title: "Acquisition & Cheerio Plan Execution",
        whatHappens: "Fetches data via Bright Data Collector API (or fallback mock data.json / direct HTML) and applies Cheerio relative container/field selectors.",
        component: "brightData.ts + cheerioExtractor.ts",
        input: "Scraper URL & ExtractionPlan JSON",
        output: "Structured array of extracted JSON records"
      },
      {
        step: "03",
        title: "Type-Aware Schema Validation",
        whatHappens: "Compares returned records against expected ScraperSchema types (URL, STRING, NUMBER, BOOLEAN, ARRAY, OBJECT) and scores dataQuality.",
        component: "validation.ts (validateScrapedData)",
        input: "Extracted JSON records + expected_schema",
        output: "isValid boolean, dataQuality score & validation_errors"
      },
      {
        step: "04",
        title: "Dual-Path Self-Healing & Re-Run",
        whatHappens: "On validation failure, triggerHealingProcess() synchronizes Bright Data schemas or prompts the LLM with pruned HTML to emit a repaired ExtractionPlan and re-runs.",
        component: "healing.ts + aiDiagnosis.ts + aiPlanner.ts",
        input: "Pruned HTML snippet + failed plan + error messages",
        output: "HealingAttempt record + HEALED ScraperRun"
      }
    ],
    groupedTechStack: [
      {
        category: "Frontend",
        items: [
          { name: "React 19 + TypeScript + Vite 8", role: "Dashboard, Scrapers list & ScraperDetail inspection views", why: "Fast client routing with React Router DOM v7 and strong typing" },
          { name: "Tailwind CSS v4 + Recharts 3 + Lucide React", role: "Dark-mode operator UI, health charts & activity terminal", why: "Responsive status visualization for HEALTHY / FAILED / HEALED runs" }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js + Express 5 + TypeScript", role: "REST API for scraper CRUD, runs, healing & system diagnostics", why: "Async route orchestration across scraping, validation, and LLM calls" },
          { name: "Cheerio + Axios + https-proxy-agent", role: "Lightweight server-side HTML DOM parsing and proxy HTTP transport", why: "Fast CSS selector querying without full headless browser overhead" }
        ]
      },
      {
        category: "Database",
        items: [
          { name: "Prisma ORM 5.10 + SQLite (dev.db)", role: "5 relational models storing configs, runs, JSON results, schemas & repairs", why: "Zero-setup local relational persistence with typed Prisma queries" }
        ]
      },
      {
        category: "AI/ML",
        items: [
          { name: "Groq SDK & @google/generative-ai", role: "Generates initial CSS ExtractionPlan JSON & diagnoses DOM drift", why: "Source code uses Groq JSON-object completions alongside Gemini SDK support" }
        ]
      },
      {
        category: "APIs & Integrations",
        items: [
          { name: "Bright Data Collector API", role: "Managed proxy-enabled web scraping with recursive payload normalization", why: "Handles anti-bot/proxy acquisition cleanly when API keys are supplied" }
        ]
      },
      {
        category: "DevTools & Testing",
        items: [
          { name: "tsx, oxlint, QA & API test scripts", role: "qa.ts, verify.ts, audit_script.js & Bright Data async/sync API checks", why: "Validates collector triggers, schema normalization, and DB persistence" }
        ]
      }
    ],
    aiMlDetails: null,
    aiMlSummaryNote:
      "HealScrape uses structured LLM prompting (JSON-object mode via Groq SDK in aiPlanner.ts / aiDiagnosis.ts, with Google Generative AI referenced in README/dependencies) rather than custom-trained ML weights to synthesize and repair CSS extraction plans.",
    databaseAndDataFlow: {
      sources: "Target HTTP/HTTPS webpages via Bright Data Collector API or local fallback mock data (data.json).",
      storageModel: "SQLite (backend/prisma/dev.db) modeled via Prisma: Scraper -> ScraperRun -> ScraperResult & HealingAttempt, plus Scraper -> ScraperSchema.",
      processing: "Recursive normalizer standardizes collector outputs; sanitizeExpectedSchema strips obsolete fields; validateScrapedData computes health scores.",
      apiCommunication: "Express REST routes (/scrapers, /:id/run, auto-heal triggers) consumed by React Router frontend.",
      retrieval: "Users inspect run tables, raw JSON payloads, inferred schemas, and healing attempt logs per scraper.",
      schemaNote: "Verified directly from backend/prisma/schema.prisma (5 models with cascading deletes on ScraperResult, ScraperSchema, and HealingAttempt)."
    },
    contributionBreakdown: {
      mine: [
        "Built core Express + Prisma backend, Bright Data collector integration with recursive normalizer, and self-healing diagnostic workflow (commits 52cb80f, 5403a5a, a4f0b51)."
      ],
      team: [
        "Collaborator ajaiselvaraj contributed bug-fix commit 63146d7."
      ],
      thirdParty: [
        "Groq SDK / Google Generative AI, Bright Data Collector API, Prisma ORM, Express 5, Cheerio, React 19, Recharts, Three.js."
      ]
    },
    technicalChallenges: [
      {
        id: "ws-1",
        challenge: "Differentiating API collector schema mismatches from target website HTML layout changes during failures.",
        solution: "Split healing into two explicit paths inside triggerHealingProcess(): collector schema synchronization vs. HTML CSS selector regeneration.",
        implementation: "Inspected validation_errors strings for output_schema_incompatible / BRIGHT_DATA_TRIGGER_FAILED before falling back to pruned-HTML LLM selector repair.",
        result: "Allows structured API mismatches to heal via schema resync before invoking full HTML selector synthesis."
      },
      {
        id: "ws-2",
        challenge: "Preventing LLM markdown fencing or obsolete fields (such as 'links') from corrupting schema validation.",
        solution: "Added type-aware validation rules and regex fence stripping before JSON parsing.",
        implementation: "Implemented sanitizeExpectedSchema() to enforce URL/string/number types and clean responses before DB persistence.",
        result: "Ensured consistent HEALTHY / FAILED / HEALED state transitions across live and Demo Mode runs."
      }
    ],
    engineeringDecisions: [
      {
        decision: "Cheerio CSS selector execution paired with on-demand LLM plan repair",
        rationale: "Avoids invoking expensive LLM inference on every scrape run; AI runs only at initial plan creation or when schema validation detects drift.",
        tradeoff: "Targets server-rendered/HTML DOM pages unless Bright Data Collector handles JS rendering.",
        status: "Implemented"
      },
      {
        decision: "SSRF URL screening middleware on scraper creation and execution routes",
        rationale: "User-supplied scrape URLs must not probe loopback interfaces (localhost, 127.0.0.1, 0.0.0.0).",
        tradeoff: "Checks common loopback hostnames rather than full DNS-rebinding IP range resolution.",
        status: "Implemented"
      }
    ],
    securityFeatures: [
      "SSRF middleware blocking localhost, 127.0.0.1, 0.0.0.0 and non-HTTP/HTTPS protocols",
      "Environment-scoped credential loading (.env.example separating BRIGHT_DATA_API_KEY and AI_API_KEY)",
      "Safe fallback mock mode (data.json) preventing credential leakage or crashes when API keys are omitted"
    ],
    devopsPipeline: ["Git Push", "TypeScript Check (tsc -b)", "oxlint Lint Check", "Prisma Schema Sync (prisma db push)", "API & QA Verification Scripts"],
    technologies: ["React 19", "TypeScript", "Express 5", "Prisma", "SQLite", "Cheerio", "Bright Data API", "Groq SDK", "Tailwind CSS v4", "Recharts"],
    keyFeatures: [
      "Natural-language scraper configuration and automatic CSS ExtractionPlan synthesis.",
      "Type-aware schema validation computing per-run dataQuality scores.",
      "Dual-path AI auto-healing: Bright Data schema resync + LLM HTML drift diagnosis.",
      "Built-in Demo Failure mode simulating structural DOM drift without external breakage.",
      "Live Activity Log terminal + Recharts dashboard tracking HEALTHY vs HEALED states."
    ],
    accessibilityMeasures: [
      "Semantic status badges pairing text labels (HEALTHY, FAILED, HEALING, HEALED) with color cues.",
      "Structured JSON and tabular result inspector toggle for extracted datasets."
    ],
    performanceMetrics: [
      "Verification scripts (qa.ts, verify.ts, testApi*.js) validate Bright Data sync/async polling and healing state persistence locally.",
      "No production multi-tenant throughput benchmarks or latency SLAs claimed."
    ],
    lessonsLearned: [
      "Keeping LLMs on the exception/repair path rather than every scrape execution drastically improves determinism and cost.",
      "Noticeable divergence between README mentions (Gemini) and actual code (Groq SDK alongside @google/generative-ai) highlights why code audits catch stale docs."
    ],
    innovation:
      "Couples type-aware schema validation with a two-path autonomous recovery loop (collector schema resync + pruned-HTML selector repair).",
    impact:
      "Reduces manual scraper maintenance during target website DOM changes through inspectable self-healing attempts.",
    teamContribution: "Backend Architecture, Bright Data Integration & AI Healing Loop",
    scalability:
      "Decoupled Express REST API and Prisma models; production scale would swap SQLite (dev.db) for PostgreSQL and background job queues.",
    media: [
      {
        title: "HealScrape Scraper Health Dashboard",
        caption: "UI slot for HEALTHY / FAILED / HEALING / HEALED status transitions and Recharts run history (actual UI screenshot not stored in repo).",
        alt: "HealScrape health monitoring dashboard preview",
        type: "dashboard"
      },
      {
        title: "Prisma 5-Model Extraction Schema",
        caption: "Relational flow across Scraper, ScraperRun, ScraperResult, ScraperSchema, and HealingAttempt verified in backend/prisma/schema.prisma.",
        alt: "HealScrape database relationship diagram slot",
        type: "architecture"
      }
    ],
    limitations: [
      "Uses SQLite (dev.db) designed for local/single-instance prototypes rather than distributed concurrent workers.",
      "README references Gemini AI whereas aiPlanner.ts and aiDiagnosis.ts invoke groq-sdk (with @google/generative-ai also in package.json).",
      "No real production scraping accuracy benchmark or live deployment URL is included in the repository."
    ],
    futureImprovements: [
      "Migrate Prisma datasource from SQLite to PostgreSQL and enqueue healing jobs via Redis/BullMQ.",
      "Expand SSRF protection to resolve hostnames and block private RFC1918 IP ranges.",
      "Capture and publish automated Vitest/Playwright end-to-end test reports for Demo Failure recovery."
    ],
    verificationChecklist: [
      { claim: "Express 5 + Prisma 5-model SQLite schema + SSRF check + Cheerio extractor", status: "Verified implementation" },
      { claim: "Dual-path healing (Bright Data schema sync + Groq LLM HTML repair)", status: "Verified implementation" },
      { claim: "Interactive 3D Self-Healing Scraper Twin & DOM Drift Simulation on portfolio", status: "Simulated demonstration" },
      { claim: "Built-in Hackathon Demo Mode using data.json fallback", status: "Simulated demonstration" },
      { claim: "PostgreSQL queue scaling & full RFC1918 DNS SSRF guard", status: "Proposed future improvement" }
    ]
  },

  "hackzen": {
    id: "hackzen",
    title: "HackZen — Real-Time Unsafe Human Activity & Safety Risk Engine",
    tagline: "Multi-Camera PPE Compliance, Polygon Zone Monitoring & Weighted Risk Scoring",
    category: "Computer Vision & Workplace Safety",
    statusLabel: "Dockerized Vision Prototype (Core PPE + Zone Risk Implemented)",
    githubUrl: "https://github.com/KANISH-850/HackZen",
    overview:
      "HackZen is a real-time industrial CCTV safety prototype combining Ultralytics YOLO PPE detection, IOU multi-object tracking, Shapely polygon danger-zone evaluation, weighted risk computation, and Socket.IO live frame streaming to a React operator dashboard.",
    problemStatement:
      "Manual monitoring of multi-camera industrial or construction CCTV feeds leads to fatigue and delayed intervention when workers enter restricted hazard zones or omit mandatory PPE (helmets, vests, gloves, safety shoes).",
    problemSummaryDetail: {
      problemLabel: "Repository-documented problem summary",
      whoFacesIt: "Industrial EHS safety supervisors, plant control-room operators, and site engineers.",
      realWorldProblem: "Delayed detection of PPE non-compliance or restricted hazard-zone entry increases workplace injury severity.",
      whyNeeded: "Automated frame ingestion paired with configurable polygon zones and throttled incident logging prioritizes live alerts.",
      existingLimitations: "Rigid vision pipelines often crash or silently output fake 0-risk scores when optional pose or anomaly models are unavailable.",
      objective: "Build a fault-isolated multi-camera FastAPI + Socket.IO pipeline that scores active detections gracefully and persists zone policies and incidents."
    },
    proposedSolution:
      "Run concurrent RTSP video ingestion feeding an asyncio ~10 FPS processing loop that offloads YOLO/pose inference to worker threads, checks Shapely danger-zone polygons, computes a weight-renormalized risk score, persists throttled database logs, and emits Socket.IO frames.",
    systemArchitecture:
      "Docker Compose orchestrates a Python FastAPI + Socket.IO (/ws) backend with async SQLAlchemy (SQLite / PostgreSQL via asyncpg) and a React 18 + TypeScript + Vite dashboard. Ultralytics YOLO (backend/models/best.pt) detects PPE items; optional person/pose/IsolationForest/ONNX models load only if present while risk_engine.py renormalizes active weights dynamically.",
    dataFlow:
      "RTSP Feeds -> ingestion.py FrameBuffer -> asyncio.to_thread(YOLO Detector + IOU Tracker + Pose) -> ZoneManager (Shapely) -> compute_risk_score -> Throttled SQLAlchemy DB + Socket.IO live_frame -> React Dashboard.",
    architectureNodes: [
      { id: "hz-in-1", title: "RTSP Ingestion & Frame Buffer", subtitle: "Per-camera concurrent ingestion loops isolating stream errors", layer: "Ingestion & Input", status: "implemented" },
      { id: "hz-proc-1", title: "YOLO PPE & IOU Tracker", subtitle: "Bundled best.pt (Gloves, Vest, Goggles, Helmet, Mask, Shoe)", layer: "Processing & AI Core", status: "implemented" },
      { id: "hz-proc-2", title: "Shapely Zone & Risk Engine", subtitle: "Polygon intrusion checks + weight renormalization (0.3/0.4/0.2/0.1)", layer: "Processing & AI Core", status: "implemented" },
      { id: "hz-proc-3", title: "Action Rec, Anomaly & ONNX Trend", subtitle: "training/*.py & optional weights excluded gracefully if absent", layer: "Processing & AI Core", status: "proposed" },
      { id: "hz-out-1", title: "SQLAlchemy 5-Table DB & REST", subtitle: "workers, cameras, zones, incidents, risk_logs (/api/*)", layer: "Storage & Delivery", status: "implemented" },
      { id: "hz-out-2", title: "Socket.IO /ws & React Dashboard", subtitle: "Streams live_frame base64 JPEG + AlertPanel & Zone views", layer: "Storage & Delivery", status: "implemented" }
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Camera Startup & Zone Restoration",
        whatHappens: "FastAPI lifespan loads .pt weights from backend/models/, initializes 5 DB tables, restores persisted camera polygon zones, and starts RTSP readers.",
        component: "main.py + model_manager.py + ZoneManager",
        input: "RTSP_URLS env list + stored Zone polygons",
        output: "Initialized camera buffers & loaded YOLO weights"
      },
      {
        step: "02",
        title: "Non-Blocking Vision Inference Loop (~10 FPS)",
        whatHappens: "Offloads YOLO detection & pose estimation to background threads via asyncio.to_thread and associates detections across frames using IOU tracking.",
        component: "detector.py + tracker.py + pose_estimator.py",
        input: "Latest OpenCV frame from camera buffer",
        output: "Tracked worker bounding boxes + PPE flags"
      },
      {
        step: "03",
        title: "Geofence Check & Weighted Risk Scoring",
        whatHappens: "Checks tracked positions against Shapely Zone polygons and calls compute_risk_score() renormalizing available PPE (0.3), Zone (0.4), Anomaly (0.2), Trend (0.1) weights.",
        component: "zone_manager.py + risk_engine.py",
        input: "Tracked PPE flags + Zone risk_level + optional scores",
        output: "Clamped risk score in [0.0, 1.0]"
      },
      {
        step: "04",
        title: "Throttled Persistence & Socket.IO Broadcast",
        whatHappens: "Logs risk_logs to DB at most every 5 seconds per worker, triggers AlertManager incidents, and broadcasts base64 JPEG + detections over /ws.",
        component: "alert_manager.py + crud.py + socket_manager.py",
        input: "Scored frame & detections",
        output: "Socket.IO live_frame event + REST /api/incidents"
      }
    ],
    groupedTechStack: [
      {
        category: "Frontend",
        items: [
          { name: "React 18 + TypeScript + Vite 5 + Tailwind CSS", role: "Operator dashboard, live camera grid & alert panels", why: "Sub-second WebSocket state rendering across Dashboard, LiveFeedGrid & AlertPanel" },
          { name: "socket.io-client + Axios", role: "Real-time /ws telemetry subscription and zone/incident REST queries", why: "Persistent duplex frame streaming paired with REST zone updates" }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Python FastAPI + Uvicorn + python-socketio", role: "REST API (/api/cameras, /zones, /incidents, /risk_logs) & /ws events", why: "Async concurrency isolating video frames from HTTP/WS event loops" },
          { name: "OpenCV (headless) + Shapely", role: "Frame capture/JPEG encoding and 2D polygon zone containment tests", why: "Fast CPU geometric intersection checks per tracked person" }
        ]
      },
      {
        category: "Database",
        items: [
          { name: "SQLAlchemy Async + Alembic (aiosqlite / asyncpg)", role: "Persists workers, cameras, JSON zone polygons, incidents & risk_logs", why: "Supports zero-setup SQLite (unsafe_db.db) locally or PostgreSQL in production" }
        ]
      },
      {
        category: "AI/ML",
        items: [
          { name: "Ultralytics YOLO (best.pt)", role: "Detects 6 PPE classes (Gloves, Vest, goggles, helmet, mask, safety_shoe)", why: "Bundled 5.6MB model auto-discovered by filename stem" },
          { name: "Scikit-learn & ONNX Runtime (Optional Hooks)", role: "Hooks for Isolation Forest anomaly scoring & ONNX risk trajectory", why: "Configured in model_manager & risk_engine without faking missing outputs" }
        ]
      },
      {
        category: "Infrastructure",
        items: [
          { name: "Docker & Docker Compose", role: "Multi-container backend (port 8000) and frontend (port 5173) orchestration", why: "Standardized reproducible OpenCV/YOLO system environment" }
        ]
      }
    ],
    aiMlDetails: [
      {
        modelName: "Ultralytics YOLO PPE Detector (best.pt) + IOU Tracker",
        problemSolved: "Detecting mandatory protective gear per worker across live camera feeds without frame drops.",
        inputs: "Latest BGR OpenCV camera frame from asynchronous FrameBuffer.",
        preprocessing: "Auto-discovered .pt weights on CUDA or CPU; thread-pool execution via asyncio.to_thread.",
        approach: "YOLO object detection predicting 6 PPE classes combined with IOU bounding-box tracking across frames.",
        output: "Per-track bounding boxes, track IDs, and PPE boolean compliance flags.",
        evaluation: "Inference loop verified structurally via RTSP/Socket.IO integration (test_sio.py); no offline mAP benchmark score is stored in the repository.",
        limitations: "Optional person.pt, pose.pt, anomaly_model.pkl, and risk_predictor.onnx files and training/*.py scripts are omitted/empty in the repo; best.pt is the bundled weight file."
      },
      {
        modelName: "Weight-Renormalized Weighted Risk Engine",
        problemSolved: "Preventing unloaded optional models from artificially deflating worker risk scores toward 0.",
        inputs: "PPE violation score (weight 0.3), Shapely zone severity (weight 0.4), optional anomaly (0.2), optional trend (0.1).",
        preprocessing: "Excludes None scores from total_weight denominator before normalizing.",
        approach: "Deterministic weighted average normalized across active available detectors and clamped to [0, 1].",
        output: "Per-worker composite risk score + SAFE / CAUTION / CRITICAL zone escalation.",
        evaluation: "Implemented and wired directly into main.py per-frame evaluation and 5s throttled DB logging.",
        limitations: "Training pipelines in training/action_recognition and training/anomaly_model remain empty placeholder files."
      }
    ],
    databaseAndDataFlow: {
      sources: "Configured RTSP camera URLs producing live video frames (~10 FPS loop cap).",
      storageModel: "5 SQLAlchemy models in backend/app/db/models.py: workers, cameras, zones (polygon JSON), incidents (severity & JSON details), and risk_logs.",
      processing: "CV inference runs off the asyncio loop via asyncio.to_thread; RiskLog DB writes throttle to 5 seconds per worker to prevent write saturation.",
      apiCommunication: "REST endpoints under /api/* manage cameras, zone polygons (hot-reloading ZoneManager), incidents, and risk history; Socket.IO /ws emits live_frame.",
      retrieval: "React dashboard renders live JPEG streams, active alerts, and camera zones.",
      schemaNote: "Verified directly from backend/app/db/models.py; SQLite file backend/unsafe_db.db exists alongside Postgres asyncpg support."
    },
    contributionBreakdown: {
      mine: [
        "Initial repository setup, core FastAPI + SQLAlchemy backend, YOLO ModelManager, ZoneManager, Socket.IO streaming, Docker stack, and README documentation (commits 5d22e88 through fbcf2f6)."
      ],
      team: [
        "Collaborator ajai1422 contributed subsequent integration/refinement commits (7952728, 3620d89)."
      ],
      thirdParty: [
        "Ultralytics YOLO, OpenCV, Shapely, FastAPI, python-socketio, SQLAlchemy, React 18, Vite, Docker."
      ]
    },
    technicalChallenges: [
      {
        id: "hz-1",
        challenge: "Running synchronous CPU/GPU vision inference inside FastAPI without stalling Socket.IO broadcasts and REST APIs.",
        solution: "Offloaded detector and pose estimation calls to worker threads via asyncio.to_thread and ran cameras concurrently with asyncio.gather(..., return_exceptions=True).",
        implementation: "Wrapped process_camera() error handling per camera ID and capped the loop at 0.1s intervals (~10 FPS).",
        result: "Prevents one stalled camera stream or slow model pass from blocking other feeds or WebSocket I/O."
      },
      {
        id: "hz-2",
        challenge: "Avoiding false 'zero risk' readings when optional anomaly or trajectory ONNX models are not mounted, and avoiding DB flooding.",
        solution: "Renormalized active risk weights dynamically in compute_risk_score() and throttled DB risk_logs writes to 5s per worker.",
        implementation: "Excluded None inputs from weight sums and tracked _last_risk_log_time[worker_id] while keeping real-time WS frames unthrottled.",
        result: "Preserves honest risk sensitivity when only PPE + Zone signals are loaded while protecting SQLite/Postgres write throughput."
      }
    ],
    engineeringDecisions: [
      {
        decision: "Exclude missing optional models from weight denominators instead of defaulting to 0",
        rationale: "Silently scoring unavailable anomaly/trend predictions as 0.0 would under-report genuine PPE/zone violations.",
        tradeoff: "Composite risk reflects only currently loaded weights until optional ONNX/pkl models are supplied.",
        status: "Implemented"
      },
      {
        decision: "Auto-discover .pt models by filename stem while keeping training scripts modular",
        rationale: "Decouples offline model training from FastAPI startup stability.",
        tradeoff: "training/*.py files and action_recognizer.py remain 0-byte stubs in the inspected commit.",
        status: "Implemented"
      }
    ],
    securityFeatures: [
      "Environment-variable configuration via backend/.env.example isolating RTSP URLs and database credentials",
      "Dynamic Zone polygon updates validated and synchronized safely via ZoneManager"
    ],
    devopsPipeline: ["Git Push", "Docker Compose Multi-Container Build", "FastAPI Lifespan DB Migration", "Socket.IO Connectivity Test (test_sio.py)"],
    technologies: ["Python", "FastAPI", "Ultralytics YOLO", "OpenCV", "Shapely", "Socket.IO", "SQLAlchemy", "React 18", "TypeScript", "Docker"],
    keyFeatures: [
      "Multi-camera concurrent RTSP ingestion with per-camera fault isolation.",
      "Ultralytics YOLO PPE compliance detection (Helmet, Vest, Gloves, Goggles, Mask, Shoe) + IOU tracking.",
      "Configurable Shapely polygon hazard zones persisted per camera.",
      "Weight-renormalized risk scoring engine with 5-second throttled DB history.",
      "Live JPEG + detection streaming over Socket.IO (/ws)."
    ],
    accessibilityMeasures: [
      "Severity-labeled alert states (CRITICAL, CAUTION, SAFE) rather than color-only cues.",
      "Responsive React grid separating camera stream previews from alert history panels."
    ],
    performanceMetrics: [
      "~10 FPS processing cap with offloaded asyncio.to_thread model inference and 5-second per-worker DB write throttling.",
      "No formal precision/recall or production FPS benchmark report is stored in the repository."
    ],
    lessonsLearned: [
      "Explicitly auditing optional model state prevents silent zero-risk bias in ensemble safety engines.",
      "Keeping training stubs cleanly isolated allows core PPE + zone detection to deploy reliably first."
    ],
    innovation:
      "Fault-isolated async vision loop combining bundled YOLO PPE detection, Shapely polygon geofencing, and non-deceptive dynamic risk weight renormalization.",
    impact:
      "Demonstrates practical multi-camera industrial hazard monitoring with graceful degradation across hardware configurations.",
    teamContribution: "Vision Pipeline Architecture, Database Schema & Documentation",
    scalability:
      "Async camera gathering and SQLAlchemy support upgrading from SQLite (unsafe_db.db) to PostgreSQL (asyncpg) cleanly.",
    media: [
      {
        title: "HackZen Live CCTV & Zone Monitoring Architecture",
        caption: "Real-time stream flow across RTSP cameras, FrameBuffer, YOLO best.pt, Shapely zones, and Socket.IO /ws (UI screenshots not stored in repo).",
        alt: "HackZen industrial safety system architecture slot",
        type: "architecture"
      },
      {
        title: "Worker Risk Score & Incident Feed Layout",
        caption: "Dashboard preview slot for LiveFeedGrid, AlertPanel, and Zone configurations.",
        alt: "HackZen operator safety dashboard slot",
        type: "dashboard"
      }
    ],
    limitations: [
      "training/*.py scripts and backend/app/models/action_recognizer.py are empty 0-byte stubs in the repository.",
      "frontend/src/components/RiskHeatmap.tsx and ZoneEditor.tsx are minimal 12-line components; node_modules were previously committed under frontend/.",
      "Only backend/models/best.pt is bundled; person.pt, pose.pt, anomaly_model.pkl, and risk_predictor.onnx are optional external weights."
    ],
    futureImprovements: [
      "Implement ST-GCN action recognition, Isolation Forest training, and ONNX export scripts under training/.",
      "Build full interactive polygon drawing UI inside ZoneEditor.tsx and frame-coordinate overlays in RiskHeatmap.tsx.",
      "Remove committed frontend/node_modules from Git history/tracking via .gitignore cleanup and publish YOLO validation mAP curves."
    ],
    verificationChecklist: [
      { claim: "FastAPI + Socket.IO /ws + SQLAlchemy 5-table DB + Shapely ZoneManager + risk_engine.py", status: "Verified implementation" },
      { claim: "Bundled Ultralytics YOLO weights (backend/models/best.pt) & 5s DB write throttling", status: "Verified implementation" },
      { claim: "Interactive 3D CCTV Danger-Zone & PPE Intrusion Twin on portfolio", status: "Simulated demonstration" },
      { claim: "Full ST-GCN / IsolationForest training scripts & rich heatmap UI", status: "Proposed future improvement" }
    ]
  },

  "vikshana": {
    id: "vikshana",
    title: "Vikshana — AI Crime Investigation Intelligence & Foresight Platform",
    tagline: "Evidence-Grounded Case Timelines, Entity Networks, DBSCAN Hotspots & XGBoost Decision Support",
    category: "Applied ML, Graph Analytics & Explainable AI",
    statusLabel: "Collaborative Datathon Team Project (Benchmarked Prototype)",
    githubUrl: "https://github.com/KANISH-850/Vikshana",
    overview:
      "Developed collaboratively by a datathon team (Abarna T, ajaiselvaraj, and Kanish K), Vikshana transforms structured police records (347,000+ entries across 10 Karnataka State Police tables) into explainable investigation timelines, entity relationship graphs, DBSCAN spatial hotspot maps, and evidence-cited copilot workflows.",
    problemStatement:
      "Law enforcement investigators sifting through massive relational FIR, accused, victim, arrest, and chargesheet archives struggle to spot unexplained timeline gaps, cross-jurisdiction syndicate links, and non-linear crime patterns without risking ungrounded AI hallucinations.",
    problemSummaryDetail: {
      problemLabel: "Repository-documented problem summary (Vikshana README & docs)",
      whoFacesIt: "Human investigators, forensic analysts, and law enforcement supervisors.",
      realWorldProblem: "Fragmented case records hide temporal alibi gaps, cross-case offender connections, and multi-district spatial hotspots.",
      whyNeeded: "Investigative software must prioritize explainability, provenance citations, and strict human-in-the-loop accountability (non-autonomous).",
      existingLimitations: "Unconstrained LLM summaries risk hallucinating facts without row/document provenance, while naive ML splits leak future temporal features.",
      objective: "Combine a 10-table police datastore with deterministic fallback engines, HallucinationGuard provenance scoring, XGBoost + DBSCAN analytics, and React graph/map dashboards."
    },
    proposedSolution:
      "Build a Zoho Catalyst Node.js 20.x Express serverless backend orchestrating specialized investigative agents/controllers over 10 KSP tables + 7 Copilot tables, enforcing temporal leakage guards on XGBoost training, DBSCAN spatial clustering, and deterministic offline fallbacks paired with React 19 + Leaflet + ForceGraph visuals.",
    systemArchitecture:
      "React 19 SPA (@xyflow/react, react-force-graph-2d, Leaflet, Recharts, Mermaid) connects to Express on Node.js 20.x Serverless Functions for Zoho Catalyst (zcatalyst-sdk-node) with Neo4j driver support, Google GenAI integration + deterministic fallback engine, HallucinationGuardService, and local JSON/CSV dataset loading.",
    dataFlow:
      "10 KSP Tables (347k+ records) + Copilot Datastore -> Multi-Agent Controllers (Timeline / Relationship / FIR / Evidence) -> Temporal-Guarded XGBoost & DBSCAN -> HallucinationGuard Citation Tagging -> React Graph / Map / Investigation Workspace.",
    architectureNodes: [
      { id: "vk-in-1", title: "10 KSP Relational CSV / Tables", subtitle: "347k+ records (CaseMaster 50,005; Accused 69,848; Victim 56,783)", layer: "Ingestion & Input", status: "implemented" },
      { id: "vk-in-2", title: "7 Catalyst Copilot Tables", subtitle: "UserMaster, AuditLog, AIInteractionLog, Conversation, Message, Memory, Attachment", layer: "Ingestion & Input", status: "implemented" },
      { id: "vk-proc-1", title: "Investigation Agents & Controllers", subtitle: "EvidenceAgent, PlannerAgent, RelationshipAgent, ReportAgent + deterministic fallback", layer: "Processing & AI Core", status: "implemented" },
      { id: "vk-proc-2", title: "XGBoost + DBSCAN + Community Graph", subtitle: "94.2% offline test acc (temporal leakage guard) & Louvain clustering", layer: "Processing & AI Core", status: "implemented" },
      { id: "vk-proc-3", title: "HallucinationGuard & Officer Gate", subtitle: "Provenance citations & strict non-autonomous approval workflow", layer: "Processing & AI Core", status: "implemented" },
      { id: "vk-out-1", title: "React 19 Investigation Workspace", subtitle: "ForceGraph 2D, ReactFlow DAG, Leaflet Heatmaps, Recharts & Docket UI", layer: "Storage & Delivery", status: "implemented" }
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Case Ingestion & Multi-Table Normalization",
        whatHappens: "Loads CaseMaster, Accused, Victim, ArrestSurrender, ChargesheetDetails, and ActSectionAssociation records linked via case_id conventions.",
        component: "InvestigationDataController & ZCQL / Local Fallback",
        input: "KSP CSV dataset + uploaded case attachments",
        output: "Unified case graph & normalized entity profiles"
      },
      {
        step: "02",
        title: "Timeline Intelligence & Contradiction Spotting",
        whatHappens: "Builds ordered chronological event sequences, calculates unexplained gaps, and flags conflicting evidence/statement timestamps.",
        component: "Timeline & Forensic Controllers",
        input: "FIR occurrence dates, arrest dates & witness logs",
        output: "Interactive chronological timeline + gap warnings"
      },
      {
        step: "03",
        title: "Relationship Graph, XGBoost & DBSCAN Scoring",
        whatHappens: "Computes cross-case offender connectivity, runs DBSCAN hotspot detection (eps=0.05), and scores temporal-leakage-guarded features via XGBoost.",
        component: "RelationshipAgent + Foresight / MLPipeline Controllers",
        input: "Cyclical time features, 5km density & historical MO links",
        output: "Cluster IDs, hotspot intensity & explainable feature breakdown"
      },
      {
        step: "04",
        title: "HallucinationGuard & Officer Review Gate",
        whatHappens: "Tags every recommendation with source record provenance (falling back to deterministic templates if LLM APIs fail) for officer approval or dismissal.",
        component: "HallucinationGuardService + DecisionSupportController",
        input: "Candidate AI summary + evidence IDs",
        output: "Audited Next-Best-Action card queued for human approval"
      }
    ],
    groupedTechStack: [
      {
        category: "Frontend",
        items: [
          { name: "React 19 + Framer Motion + Recharts 3", role: "Interactive investigation tabs, dashboards & timeline intelligence views", why: "Supports complex analytical tabs alongside smooth state transitions" },
          { name: "@xyflow/react + Dagre + react-force-graph-2d + Leaflet", role: "Interactive relationship networks, flow DAGs & spatial crime hotspot maps", why: "Provides inspectable spatial and network drilldowns per case" }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js 20.x + Express + Zoho Catalyst SDK", role: "Serverless function backend hosting 20+ specialized intelligence controllers", why: "Deploys natively on Zoho Catalyst or locally via standalone server.js" },
          { name: "pdf-parse, mammoth, csv-parse & multer", role: "Ingests uploaded PDF, DOCX, and CSV investigative case attachments", why: "Extracts plain text into Attachment records for copilot indexing" }
        ]
      },
      {
        category: "Database",
        items: [
          { name: "Zoho Catalyst Datastore + Neo4j Driver", role: "10 KSP domain tables (347k+ rows) + 7 Copilot tables + graph traversal", why: "Normalized tabular records paired with multi-hop entity relationship queries" }
        ]
      },
      {
        category: "AI/ML",
        items: [
          { name: "XGBoost + DBSCAN (Scikit-learn)", role: "Temporal-guarded classification (94.2% acc) & spatial hotspot clustering", why: "Selected in documented benchmark matrix over Random Forest (91.8%) and Logistic Regression (83.5%)" },
          { name: "Google GenAI + HallucinationGuard + Deterministic Fallback", role: "Citation-checked copilot synthesis with deterministic template fallback", why: "Guarantees investigation summaries never fail silently or omit evidence provenance" }
        ]
      }
    ],
    aiMlDetails: [
      {
        modelName: "XGBoost Classifier (Temporal-Leakage Guarded)",
        problemSolved: "Modeling non-linear spatial-temporal risk signals without future-record look-ahead bias.",
        inputs: "4 time-window buckets, cyclical sin/cos hour & day-of-week encodings, 5km spatial frequency, and historical repeat-offender counts computed strictly before T_split.",
        preprocessing: "Strict temporal train/test split; normalization & historical-only aggregation windows.",
        approach: "Selected over Random Forest (100 trees) and L2 Logistic Regression across 50,000+ KSP records.",
        output: "Risk class score alongside additive explainable feature contributions.",
        evaluation: "Documented in docs/DATA_ANALYSIS.md: 94.2% Accuracy, 93.8% Precision, 92.5% Recall, 93.1% F1, 0.968 ROC-AUC, 12ms inference.",
        limitations: "Synthetic demo datasets are also bundled (demo_socioeconomic_data.csv, financial_transactions_demo.csv) for advanced tabs and require explicit separation from police CSV records."
      },
      {
        modelName: "DBSCAN Spatial Clustering + Louvain Community Detection",
        problemSolved: "Discovering irregular geographic hotspots and multi-case associate networks without fixing cluster count k.",
        inputs: "Incident spatial coordinates (eps=0.05 ~5km, min_samples=5) and shared-case entity adjacency edges.",
        preprocessing: "Spatial noise filtering and edge weight normalization.",
        approach: "Density-based spatial clustering (DBSCAN) plus Connected Components / Louvain modularity clustering.",
        output: "Hotspot cluster labels & neutral association-network flags requiring human investigator review.",
        evaluation: "Documented in DATA_ANALYSIS.md alongside Responsible AI non-causation disclaimers (Correlation != Causation).",
        limitations: "Must strictly serve as investigative decision support; never autonomous arrest or sentencing criteria."
      }
    ],
    databaseAndDataFlow: {
      sources: "10 KSP CSV tables (347,000+ rows including CaseMaster 50,005, Accused 69,848, Victim 56,783), synthetic socioeconomic/financial demo CSVs, and uploaded PDF/DOCX attachments.",
      storageModel: "Zoho Catalyst Datastore (7 documented Investigation Copilot tables in DATASTORE_SCHEMA.md) + optional Neo4j graph + local fallback engine.",
      processing: "Controllers aggregate timelines, run DBSCAN/XGBoost scoring, apply HallucinationGuard provenance validation, and log AuditLog & AIInteractionLog.",
      apiCommunication: "Express REST API endpoints (/health, /dashboard, /cases, /forensics/evidence/case/:id, /audit, /intelligence/forecast/overview).",
      retrieval: "Analysts inspect interactive timelines, force graphs, Leaflet maps, and provenance-cited recommendations.",
      schemaNote: "All 7 Copilot table columns and 10 KSP table names/row counts are explicitly verified in DATASTORE_SCHEMA.md and DATA_ANALYSIS.md."
    },
    contributionBreakdown: {
      mine: [
        "Collaborator and listed package author (kanishk.cs24@bitsathy.ac.in in vikshana_function/package.json); contributed backend commits 0602f41 ('Casefile update') and d964991 ('Final'). Exact module-level split across the multi-person team is not itemized in local commit messages."
      ],
      team: [
        "Collaborators Abarna T (Abarna25) and ajaiselvaraj authored extensive controller, ML benchmark, frontend visualization, Catalyst schema, and verification commits."
      ],
      thirdParty: [
        "Zoho Catalyst SDK, Neo4j Driver, Google GenAI, Express, React 19, ReactFlow, Leaflet, Recharts, XGBoost, Scikit-learn, Three.js."
      ]
    },
    technicalChallenges: [
      {
        id: "vk-1",
        challenge: "Preventing LLM unreliability or hallucinated narrative leaps in sensitive investigative workflows.",
        solution: "Built HallucinationGuard citation checks paired with a deterministic fallback engine when GenAI calls are unconfigured or fail.",
        implementation: "Structured message citations [{type, refId, label, confidence}] and deterministic timeline/summary synthesis.",
        result: "Preserves workspace usability and strict evidence provenance even offline without external LLM connectivity."
      },
      {
        id: "vk-2",
        challenge: "Eliminating look-ahead target leakage in crime risk modeling over historical FIR timestamps.",
        solution: "Implemented a Temporal Leakage Guard enforcing strict chronological split boundaries before aggregating station and repeat-offender counts.",
        implementation: "Separated pre-cutoff training windows strictly from future records across 50,000+ KSP entries.",
        result: "Ensured documented XGBoost benchmark metrics (94.2% Accuracy, 0.968 ROC-AUC) reflect leak-free temporal validation."
      }
    ],
    engineeringDecisions: [
      {
        decision: "Strict non-autonomous human-in-the-loop officer approval gate",
        rationale: "Law enforcement analytics carry high ethical consequences; AI insights must remain explainable support tools.",
        tradeoff: "Every recommendation requires explicit human approval/dismissal actions and audit logging.",
        status: "Implemented"
      },
      {
        decision: "Deterministic fallback intelligence engine alongside Google GenAI",
        rationale: "External LLM keys or rate limits must not break core investigation timelines or report generation.",
        tradeoff: "Fallback summaries follow structured evidence templates rather than generative phrasing.",
        status: "Implemented"
      }
    ],
    securityFeatures: [
      "Mandatory 32+ character JWT_SECRET policy with disabled query-token extraction in production docs",
      "AuditLog & AIInteractionLog persistence tracking user actions, prompts, models, and evidence_ids",
      "Environment-scoped CORS and explicit DEMO_MODE banners separating synthetic socioeconomic/financial CSVs"
    ],
    devopsPipeline: ["Git Push", "Jest / React Testing Library Suites", "Local API Benchmark (120 Req)", "Zoho Catalyst Serverless Deploy"],
    technologies: ["React 19", "Node.js 20", "Express", "Zoho Catalyst", "Neo4j", "XGBoost", "DBSCAN", "Leaflet", "ReactFlow", "Google GenAI"],
    keyFeatures: [
      "Master FIR & structured entity extraction across 10 normalized police dataset tables.",
      "Timeline Intelligence automatically highlighting unexplained alibi or arrest gaps.",
      "Interactive Entity Relationship Network with connection strength & Louvain community detection.",
      "Anomaly Sentinel spotting evidence contradictions with provenance links.",
      "Temporal-guarded XGBoost scoring & DBSCAN spatial hotspot visualization."
    ],
    accessibilityMeasures: [
      "Theme-adaptive React components supporting high-contrast forensic legibility.",
      "Multi-language UI translation support documented across investigation tabs."
    ],
    performanceMetrics: [
      "Localhost API benchmark (2026-09-01, 120 requests): 100.0% success across 6 endpoints (/dashboard 28.3ms avg, /cases 11.6ms avg, /forensics/evidence 0.55ms avg).",
      "Offline ML benchmark (DATA_ANALYSIS.md): XGBoost 94.2% Accuracy, 93.1% F1, 0.968 ROC-AUC, 12ms inference across 50,000+ KSP records."
    ],
    lessonsLearned: [
      "Deterministic fallback paths are indispensable when building AI tools for high-reliability workflows.",
      "Clear dataset provenance banners prevent analysts from confusing synthetic enhancement modules with historical records."
    ],
    innovation:
      "Pairs temporal-leakage-guarded XGBoost/DBSCAN modeling with multi-agent evidence provenance and zero-hallucination human-in-the-loop controls.",
    impact:
      "Demonstrated end-to-end investigative triage across 347,000+ structured records in a datathon-winning multi-contributor build.",
    teamContribution: "Collaborative Datathon Team Build (Backend Contributor & Package Author)",
    scalability:
      "Built for Zoho Catalyst serverless I/O functions paired with Neo4j graph queries and 10 normalized Catalyst Datastore tables.",
    media: [
      {
        title: "Vikshana Investigation & Relationship Workspace",
        caption: "Interactive ReactFlow / ForceGraph case relationship and Timeline Intelligence slot (UI screenshots not committed inside repo).",
        alt: "Vikshana case investigation workspace slot",
        type: "dashboard"
      },
      {
        title: "ML Evaluation & Local API Benchmark Summary",
        caption: "Visual artifact slot summarizing docs/DATA_ANALYSIS.md (XGBoost 0.968 AUC) and functions/docs/benchmarks/benchmark-report.md (120 reqs, 100% pass).",
        alt: "Vikshana ML and API benchmark report slot",
        type: "architecture"
      }
    ],
    limitations: [
      "Multi-person collaborative repository: individual line-by-line authorship beyond Kanish's git commits and package authorship is not separately itemized.",
      "Localhost API benchmark (50,005 records in memory) and DEMO_MODE synthetic CSVs do not constitute live state-police production deployment."
    ],
    futureImprovements: [
      "Publish automated CI test reports alongside Catalyst Data Store provisioning-as-code migrations.",
      "Benchmark distributed Neo4j query latency across multi-million node syndicates."
    ],
    verificationChecklist: [
      { claim: "10 KSP tables (347k+ rows) & 7 Copilot Catalyst tables in DATASTORE_SCHEMA.md", status: "Verified implementation" },
      { claim: "XGBoost 94.2% acc / 0.968 AUC & 120-req localhost API benchmark (benchmark-report.md)", status: "Verified result" },
      { claim: "Kanish listed as package author + commits 0602f41 & d964991 (Team repo with Abarna25 & ajaiselvaraj)", status: "Verified implementation" },
      { claim: "Interactive 3D Case Graph & Contradiction Simulation on portfolio", status: "Simulated demonstration" },
      { claim: "Live production Zoho Catalyst police deployment metrics", status: "Unknown / needs confirmation" }
    ]
  },

  "techspire": {
    id: "techspire",
    title: "TechSpire — Unified AI Hospital Management System",
    tagline: "Full-Stack Clinical Operations, Air-Gapped Ollama RAG Assistant & Predictive Analytics",
    category: "Enterprise Healthcare Systems & Local RAG AI",
    statusLabel: "Individual Full-Stack Dockerized Prototype (20/20 Pytest)",
    githubUrl: "https://github.com/KANISH-850/techspire",
    overview:
      "TechSpire is a containerized Hospital Management System (HMS) unifying clinical CRUD workflows (patients, appointments, admissions, ward beds, inventory, procurement), on-premise Ollama RAG clinical Q&A, Scikit-Learn predictive forecasting, and automated PDF/Excel executive reporting.",
    problemStatement:
      "Hospital administrators and clinical coordinators frequently rely on disconnected billing, inventory, and EHR spreadsheets while facing strict data-privacy barriers that prohibit sending patient or operational context to third-party cloud LLM APIs.",
    problemSummaryDetail: {
      problemLabel: "Repository-documented problem summary (TechSpire README & architecture)",
      whoFacesIt: "Hospital executives, ward coordinators, pharmacy inventory managers, and clinical support staff.",
      realWorldProblem: "Siloed ward occupancy, revenue, and stockout data delays procurement and executive reporting, while cloud AI poses PHI/privacy compliance risks.",
      whyNeeded: "An on-premise containerized stack keeps LLM embeddings and SQL records strictly within local infrastructure.",
      existingLimitations: "Separate prototype scripts lack unified authentication, schema migrations, and privacy-preserving RAG streaming.",
      objective: "Consolidate 11 React clinical modules, 14 SQLAlchemy ORM tables, Alembic migrations, local Ollama RAG (ChromaDB + qwen3:4b), and ReportLab/OpenPyXL reporting inside 4 Docker services."
    },
    proposedSolution:
      "Orchestrate Nginx + React 19 SPA, FastAPI backend, PostgreSQL 16 (with Alembic migrations), and local Ollama (`qwen3:4b` + `nomic-embed-text` + ChromaDB) via Docker Compose, pairing HS256 JWT/Bcrypt auth with SSE-streamed local RAG and Scikit-Learn regressors.",
    systemArchitecture:
      "Modular monolithic FastAPI backend paired with a React 19 + Vite SPA served behind Nginx (port 8080) with /api/v1 reverse proxying. Backend (port 8000) connects via SQLAlchemy 2.0 to PostgreSQL 16 (port 5432; SQLite fallback locally) and via local HTTP/JSON (port 11434) to Ollama + ChromaDB for 100% on-premise AI.",
    dataFlow:
      "React 19 SPA -> Nginx Proxy (/api/v1) -> FastAPI + JWT/Bcrypt Auth -> PostgreSQL 16 (14 Models via Alembic) & Local Ollama/ChromaDB (500-char SOP chunks, Top-3 retrieval) -> SSE Chat Stream + ReportLab PDF / OpenPyXL Excel.",
    architectureNodes: [
      { id: "ts-in-1", title: "Nginx + React 19 Clinical SPA", subtitle: "11 modules: Patients, Beds, Admissions, Inventory, Chatbot, Reports", layer: "Ingestion & Input", status: "implemented" },
      { id: "ts-proc-1", title: "FastAPI + HS256 JWT & Bcrypt", subtitle: "Modular clinical, dashboard, procurement & SSE chatbot routers", layer: "Processing & AI Core", status: "implemented" },
      { id: "ts-proc-2", title: "Local Ollama RAG (qwen3:4b)", subtitle: "nomic-embed-text (768-d) + ChromaDB Top-3 SOP retrieval (on-prem)", layer: "Processing & AI Core", status: "implemented" },
      { id: "ts-proc-3", title: "Predictive ML & Report Builder", subtitle: "RandomForestRegressor forecasts + ReportLab PDF / OpenPyXL Excel", layer: "Processing & AI Core", status: "implemented" },
      { id: "ts-out-1", title: "PostgreSQL 16 + Alembic (14 Models)", subtitle: "Normalized clinical, vendor, purchase order & chat tables", layer: "Storage & Delivery", status: "implemented" },
      { id: "ts-out-2", title: "Synthetic Seed Hospital Data", subtitle: "Fictitious patients & metrics generated via app/db/seed.py", layer: "Storage & Delivery", status: "simulated" }
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Authenticated Clinical & Operational Access",
        whatHappens: "Users authenticate via OAuth2 Password Bearer flow issuing HS256 JWT tokens backed by passlib Bcrypt password hashes.",
        component: "Nginx -> FastAPI Auth + User Model",
        input: "Username & password credentials",
        output: "Signed JWT access token & ProtectedRoute session"
      },
      {
        step: "02",
        title: "Clinical, Bed & Inventory Transactions",
        whatHappens: "FastAPI routers update MRN patient records, outpatient appointments, ward bed allocations, admissions, and medicine stock levels via parameterized SQLAlchemy 2.0.",
        component: "Clinical, Beds & Inventory Routers + Postgres 16",
        input: "Validated Pydantic schemas",
        output: "ACID-persisted clinical & inventory rows"
      },
      {
        step: "03",
        title: "On-Premise RAG Clinical Assistant (SSE)",
        whatHappens: "Embeds user query via nomic-embed-text (768-d), fetches top-3 500-char chunks from ChromaDB hospital_knowledge, and streams qwen3:4b response via SSE.",
        component: "Ollama Container + ChromaDB + Chatbot Router",
        input: "Staff clinical/operational question",
        output: "Streamed grounded reply saved to Conversation & Message tables"
      },
      {
        step: "04",
        title: "Predictive Forecasting & Report Compilation",
        whatHappens: "Runs RandomForestRegressor revenue/admission forecasts and Reorder Point stock checks, exporting styled PDF (ReportLab) and multi-tab Excel (OpenPyXL).",
        component: "PredictiveService + Report Builder",
        input: "Historical synthetic DB records",
        output: "Forecast horizons + downloadable .pdf / .xlsx artifacts"
      }
    ],
    groupedTechStack: [
      {
        category: "Frontend",
        items: [
          { name: "React 19 + Vite 6 + Tailwind CSS v4", role: "Unified 11-page hospital portal (Patients, Beds, Chatbot, Predictive, Reports)", why: "Consolidated prior standalone prototypes into one SPA shell" },
          { name: "Axios + Recharts + react-markdown + Lucide", role: "API client, JWT ProtectedRoute flows, executive KPI charts & markdown chat UI", why: "Clean charting and formatted streaming assistant responses" }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Python 3.11 + FastAPI + Uvicorn", role: "Async REST API, SSE RAG streaming, Pydantic validation & executive report routes", why: "High-throughput typed API layer uniting clinical and AI endpoints" },
          { name: "ReportLab + OpenPyXL + PyJWT + Bcrypt", role: "Programmatic PDF/Excel report compilation and salted HS256 auth", why: "Produces real downloadable .pdf/.xlsx artifacts and enforces auth boundaries" }
        ]
      },
      {
        category: "Database",
        items: [
          { name: "PostgreSQL 16 + SQLAlchemy 2.0 + Alembic", role: "14 ORM models across clinical care, procurement, billing & chat persistence", why: "Parameterized queries prevent SQL injection with versioned migrations" }
        ]
      },
      {
        category: "AI/ML",
        items: [
          { name: "Ollama (qwen3:4b) + nomic-embed-text + ChromaDB", role: "100% local RAG pipeline over 500-char hospital SOP document chunks", why: "Zero external cloud API calls so hospital data remains air-gapped on-premise" },
          { name: "Scikit-Learn RandomForestRegressor + Pandas", role: "Forecasts Financial Revenue (R²=0.82), Admissions (R²=0.74) & Reorder Points", why: "Explains operational trends & stockout risk deterministically on tabular history" }
        ]
      },
      {
        category: "Infrastructure",
        items: [
          { name: "Docker Compose (4 Services) + Nginx Alpine", role: "Orchestrates db, ollama, backend (8000), and frontend (8080) with volumes", why: "One-command portable setup with persistent Postgres and Ollama storage" }
        ]
      },
      {
        category: "DevTools & Testing",
        items: [
          { name: "Pytest Test Suite (backend/tests/)", role: "Integration, ORM, predictive ML, and negative security tests (20/20 documented pass)", why: "Verifies schema invariants, auth rejections, and forecast non-negativity" }
        ]
      }
    ],
    aiMlDetails: [
      {
        modelName: "On-Premise Ollama RAG (qwen3:4b + nomic-embed-text + ChromaDB)",
        problemSolved: "Answering hospital policy, SOP, and FAQ queries internally without transmitting data to third-party cloud LLM providers.",
        inputs: "Staff prompt + 500-character document chunks from hospital_knowledge ChromaDB collection.",
        preprocessing: "Document loading, 500-character chunking, and 768-dimensional nomic-embed-text embedding ingestion.",
        approach: "Top-3 vector similarity retrieval augmented with SQL conversation history, streamed over Server-Sent Events (SSE).",
        output: "Grounded markdown response streamed to React Chatbot UI and saved to PostgreSQL.",
        evaluation: "End-to-end SSE streaming & RAG scripts verified locally (test_ollama.py, test_rag.py); LLM quality depends on local hardware/GPU resources.",
        limitations: "Evaluated against sample internal FAQ/visiting-hours/service documents; not clinically certified for autonomous diagnosis."
      },
      {
        modelName: "Scikit-Learn Predictive Forecasters (Revenue & Admissions)",
        problemSolved: "Forecasting short-term hospital financial revenue, inpatient admissions, bed occupancy, and medicine reorder points.",
        inputs: "Time-indexed clinical, bed, revenue, and pharmacy transaction histories seeded in SQL.",
        preprocessing: "Date lag feature extraction (BaseForecaster.extract_features) + non-negative prediction clipping.",
        approach: "RandomForestRegressor for Revenue & Admissions; bounded linear trends for Bed Occupancy; moving averages + Reorder Point math for Inventory.",
        output: "Forecast horizons with MAE, RMSE, and R² diagnostics plus stockout risk alerts.",
        evaluation: "README documents RandomForestRegressor R² = 0.82 (Revenue) and R² = 0.74 (Admissions) alongside passing unit checks in test_predictive_ml.py.",
        limitations: "Trained and evaluated strictly on synthetic seeded hospital data (app/db/seed.py), not live clinical EHR history."
      }
    ],
    databaseAndDataFlow: {
      sources: "Synthetic hospital seed script (app/db/seed.py), interactive clinical SPA forms, and local SOP text files (faq.txt, hospital_services.txt, visiting_hours.txt).",
      storageModel: "14 SQLAlchemy ORM models in backend/app/models/: User, Department, Patient, Appointment, Bed, Admission, InventoryItem, Transaction, Vendor, PurchaseOrder, PurchaseOrderItem, Alert, Conversation, Message.",
      processing: "Pydantic validates request payloads; predictive services compute rolling forecasts; ReportLab & OpenPyXL write artifact bundles under backend/storage/reports/.",
      apiCommunication: "Nginx proxies /api/v1/* from React SPA to FastAPI backend; backend queries Postgres (5432) and local Ollama (11434).",
      retrieval: "Executive dashboard fetches aggregated KPIs and forecasts; Chatbot streams SSE chunks; Reports endpoint serves compiled PDF/XLSX files.",
      schemaNote: "Verified directly from backend/app/models/*.py and backend/alembic migrations."
    },
    contributionBreakdown: {
      mine: [
        "Sole author in Git history (`KANISH <kanishkgin@gmail.com>`): designed and unified all sub-modules into the cohesive 4-container Docker Compose FastAPI + PostgreSQL + React 19 + Ollama HMS architecture, Alembic schema, predictive services, PDF/Excel reports, and Pytest suite."
      ],
      team: [
        "No external co-authors recorded in Git history for KANISH-850/techspire."
      ],
      thirdParty: [
        "FastAPI, SQLAlchemy, Alembic, PostgreSQL, Ollama (qwen3:4b / nomic-embed-text), ChromaDB, Scikit-Learn, ReportLab, OpenPyXL, React 19, Vite, Nginx, Docker, Three.js."
      ]
    },
    technicalChallenges: [
      {
        id: "ts-1",
        challenge: "Consolidating 5 separate prototype sub-modules (Chatbot, Procurement, Report Builder, CEO Dashboard, Predictive Analytics) into one cohesive system.",
        solution: "Unified schemas, authentication, and routers into a modular monolithic FastAPI backend paired with a shared ProtectedRoute React 19 SPA and Nginx reverse proxy.",
        implementation: "Merged 14 SQLAlchemy models under Alembic migrations (001_initial_hms) and standardized frontend API clients.",
        result: "Eliminated cross-origin port fragmentation behind a single port 8080 entrypoint via Docker Compose."
      },
      {
        id: "ts-2",
        challenge: "Providing hospital AI Q&A and forecasting without sending patient/operational context to external cloud LLM APIs.",
        solution: "Embedded an Ollama local container serving qwen3:4b and nomic-embed-text alongside ChromaDB vector retrieval and local Scikit-Learn models.",
        implementation: "Integrated ChromaDB top-3 retrieval over 500-char SOP chunks with SSE streaming and Postgres chat persistence.",
        result: "Achieves air-gapped local inference and verifiable zero external LLM egress inside the Docker network."
      }
    ],
    engineeringDecisions: [
      {
        decision: "On-premise Ollama (qwen3:4b) + ChromaDB instead of external hosted LLM APIs",
        rationale: "Healthcare operations demand strict privacy guarantees with zero third-party data transmission.",
        tradeoff: "Requires local CPU/RAM/GPU resources inside Docker to keep token streaming responsive.",
        status: "Implemented"
      },
      {
        decision: "Synthetic database seeding (seed.py) cleanly decoupled from production EHR integration",
        rationale: "Demonstrates complete forecasting and PDF/Excel report workflows safely without real patient PII.",
        tradeoff: "R² metrics (0.82 Revenue, 0.74 Admissions) validate synthetic pattern capture rather than real clinical hospital load.",
        status: "Implemented"
      }
    ],
    securityFeatures: [
      "OAuth2 Password Bearer flow issuing HS256 JWT tokens + salted Bcrypt password hashing (passlib[bcrypt])",
      "100% parameterized SQLAlchemy 2.0 ORM queries preventing SQL injection (verified via test_negative_security.py)",
      "Production secret-key governance checks preventing default dev keys in production mode"
    ],
    devopsPipeline: ["Git Push", "Pytest Suite (Integration, ORM, ML, Security)", "Alembic Schema Check", "React Vite Build", "4-Container Docker Compose"],
    technologies: ["Python 3.11", "FastAPI", "PostgreSQL 16", "React 19", "Ollama (qwen3:4b)", "ChromaDB", "Scikit-Learn", "Alembic", "Docker", "Nginx"],
    keyFeatures: [
      "CEO Executive AI Dashboard tracking admissions, bed utilization, revenue & risk alerts.",
      "Complete Patient, Appointment, Inpatient Admission & ICU/Ward Bed Allocation workflows.",
      "Air-gapped Local Hospital RAG Chatbot (Ollama qwen3:4b + ChromaDB + SSE streaming).",
      "Scikit-Learn RandomForestRegressor forecasting + deterministic Reorder Point inventory alerts.",
      "Automated PDF (ReportLab) & multi-tab Excel (OpenPyXL) report generation."
    ],
    accessibilityMeasures: [
      "Shared TechSpire shell navigation with clear status pills across clinical modules.",
      "Responsive SPA layouts adapting CEO charts and ward bed grids across screen sizes."
    ],
    performanceMetrics: [
      "README documents 20/20 Pytest tests passing across API integration, ORM models, negative security tests, and predictive ML checks.",
      "README documents RandomForestRegressor evaluation R² = 0.82 (Financial Revenue) and R² = 0.74 (Inpatient Admissions) on synthetic seeded data."
    ],
    lessonsLearned: [
      "A modular monolith with unified Alembic migrations beats maintaining five fragmented microservice demos during rapid iteration.",
      "Explicit synthetic-data disclaimers maintain engineering integrity on healthcare AI prototypes."
    ],
    innovation:
      "Unifies full-stack HMS CRUD, local air-gapped Ollama RAG, predictive ML forecasting, and automated PDF/Excel reporting in one privacy-first Docker stack.",
    impact:
      "Demonstrates production-structured healthcare engineering (14 ORM models, JWT/Bcrypt, Alembic, Pytest, Docker) as a solo full-stack build.",
    teamContribution: "Solo End-to-End Engineering (Backend, Frontend, RAG, ML, Docker)",
    scalability:
      "Containerized 4-service Docker Compose architecture with Nginx static caching, PostgreSQL persistent volumes, and decoupled Ollama inference.",
    media: [
      {
        title: "TechSpire 4-Container Docker Architecture",
        caption: "Traffic flow across Nginx/React (8080) -> FastAPI (8000) -> Postgres 16 (5432) & Ollama (11434) (UI screenshots not committed in repo).",
        alt: "TechSpire containerized HMS architecture slot",
        type: "architecture"
      },
      {
        title: "Executive AI Dashboard, RAG Chat & Reports",
        caption: "Module preview slot covering Revenue/Admission forecasts and ReportLab PDF + OpenPyXL export samples generated in backend/storage/reports/.",
        alt: "TechSpire executive dashboard and reporting slot",
        type: "dashboard"
      }
    ],
    limitations: [
      "Evaluated strictly on synthetic seeded data generated by app/db/seed.py; not cleared for live clinical patient care or PHI storage.",
      "Pytest (20/20) and RandomForest R² (0.82 / 0.74) figures are taken from the repository README rather than re-executed in this static portfolio sandbox.",
      "Localhost Ollama qwen3:4b latency depends on host GPU availability."
    ],
    futureImprovements: [
      "Integrate HL7 FHIR import/export adapters for standardized clinical interoperability.",
      "Add role-based clinical audit middleware across doctor, pharmacist, and admin personas.",
      "Publish automated GitHub Actions Docker CI runs executing pytest and Vite builds on every push."
    ],
    verificationChecklist: [
      { claim: "14 SQLAlchemy ORM models, Alembic migrations, HS256 JWT + Bcrypt & 4-service Docker Compose", status: "Verified implementation" },
      { claim: "Ollama qwen3:4b + ChromaDB RAG, Scikit-Learn RandomForest & ReportLab/OpenPyXL exports", status: "Verified implementation" },
      { claim: "20/20 Pytest & RandomForest R²=0.82 / R²=0.74 (per README on synthetic seed data)", status: "Simulated demonstration" },
      { claim: "Interactive 3D Docker & Local RAG Hospital Twin on portfolio", status: "Simulated demonstration" },
      { claim: "HL7 FHIR hospital interoperability & live clinical production deployment", status: "Proposed future improvement" }
    ]
  }
};

export const featuredProjectsList: ProjectCaseStudy[] = [
  projectsData["digital-twin-ehv"],
  projectsData["kiosk-management-system"],
  projectsData["intelligent-grievance-system"],
  projectsData["aquaguard-ai"],
  projectsData["vikshana"],
  projectsData["techspire"],
  projectsData["hackzen"],
  projectsData["webscraper"]
];
