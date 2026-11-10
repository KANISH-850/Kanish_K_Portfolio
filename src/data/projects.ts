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
  category: "Frontend" | "Backend" | "Database" | "AI/ML" | "Infrastructure" | "Tools";
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
  }
};

export const featuredProjectsList: ProjectCaseStudy[] = [
  projectsData["digital-twin-ehv"],
  projectsData["intelligent-grievance-system"],
  projectsData["aquaguard-ai"],
  projectsData["kiosk-management-system"]
];
