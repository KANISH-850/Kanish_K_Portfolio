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
    tagline: "Predictive Equipment Diagnostics & Anomaly Scoring Prototype",
    category: "Industrial Telemetry & Applied ML",
    statusLabel: "SIH '25 Winner (Simulated Telemetry Prototype)",
    achievement: "Smart India Hackathon Winner",
    githubUrl: "https://github.com/KANISH-850/oceanBerg_sih",
    overview:
      "Developed by Team Oceanberg (Smart India Hackathon Grand Finale Winner), this repository models Extra High Voltage (EHV) substation components—power transformers, busbars, instrument transformers, isolators, and circuit breakers—using scikit-learn ensemble & Isolation Forest diagnostics, a Keras CNN-LSTM waveform fault trainer, and automated ReportLab PDF / SMTP alerting.",
    problemStatement:
      "Extra High Voltage (EHV) substations face costly equipment stress and unplanned outages when transformer thermal drift, busbar imbalances, or switchgear anomalies go undetected under static single-point alarms.",
    problemSummaryDetail: {
      problemLabel: "Project problem summary (per oceanBerg_sih hackathon codebase)",
      whoFacesIt: "Substation operations engineers, grid reliability teams, and EHV maintenance planners.",
      realWorldProblem: "Substation assets generate multi-sensor readings where single-threshold SCADA triggers miss correlated multi-variable fault patterns.",
      whyNeeded: "Per-component predictive scoring across transformers, busbars, and circuit breakers helps prioritize preventive inspections before protective relay lockouts.",
      existingLimitations: "Conventional tabular SCADA views lack asset-level regression/classification fusion or spatial 3D asset mapping.",
      objective: "Combine component-wise Random Forest and Isolation Forest diagnostics with a Streamlit CNN-LSTM waveform trainer and an interactive 3D bay demonstration."
    },
    proposedSolution:
      "Run modular Python predictors (`transformer.py`, `busbar.py`, `inst_transformer.py`, `cirucit_beraker.py`) paired with a TensorFlow/Keras CNN-LSTM fault classification UI (`app.py`) over CSV telemetry snapshots, emitting JSON state and ReportLab PDF summary reports.",
    systemArchitecture:
      "Modular Python diagnostic scripts load simulated substation CSV datasets (`transformer_training_5000.csv`, `transformer_all_output.csv`, `live_all_readings.csv`), execute RandomForestRegressor/RandomForestClassifier and IsolationForest scoring, trigger ReportLab PDF/email alerts, and pair with an interactive Three.js 400kV bay simulation on this portfolio.",
    dataFlow:
      "Simulated SCADA CSV Logs -> StandardScaler Preprocessing -> RandomForest & IsolationForest Per-Asset Scorers (+ CNN-LSTM Trainer) -> JSON State & ReportLab PDF Alerts -> Portfolio Interactive 3D Bay Twin.",
    architectureNodes: [
      { id: "dt-in-1", title: "Substation Telemetry CSVs", subtitle: "transformer_training_5000.csv (5k rows) & transformer_all_output.csv (6k rows)", layer: "Ingestion & Input", status: "simulated" },
      { id: "dt-in-2", title: "Live MQTT / PMU Broker", subtitle: "Utility-grade telemetry ingestion boundary specification", layer: "Ingestion & Input", status: "proposed" },
      { id: "dt-proc-1", title: "Asset Ensemble Scorers", subtitle: "RandomForest & IsolationForest across transformer, busbar & breaker", layer: "Processing & AI Core", status: "implemented" },
      { id: "dt-proc-2", title: "CNN-LSTM Waveform Trainer", subtitle: "TensorFlow/Keras Streamlit app training fault classifiers on .npy arrays", layer: "Processing & AI Core", status: "implemented" },
      { id: "dt-out-1", title: "Alerting & PDF Reports", subtitle: "latest_status.json state updates & ReportLab PDF / SMTP summaries", layer: "Storage & Delivery", status: "implemented" },
      { id: "dt-out-2", title: "Portfolio 3D Substation Twin", subtitle: "Interactive Three.js 400kV bay simulation for visual asset inspection", layer: "Storage & Delivery", status: "simulated" }
    ],
    technicalChallenges: [
      {
        id: "dt-1",
        challenge: "Modeling heterogeneous EHV equipment (power transformers, busbars, circuit breakers, instrument transformers) cleanly without monolithic scripts.",
        solution: "Decomposed diagnostic pipelines into per-asset Python modules aggregating alerts into `common_alerts.py` and `full_sbstation.py`.",
        implementation: "Implemented separate RandomForestRegressor/Classifier and IsolationForest models tailored per asset channel with StandardScaler preprocessing.",
        result: "Modular per-asset scoring emitting unified `latest_status.json` alerts and ReportLab PDF summaries."
      },
      {
        id: "dt-2",
        challenge: "Providing an intuitive spatial visualization over tabular substation readings during competition evaluations.",
        solution: "Built an interactive Three.js 400kV substation bay demonstration separating canvas rendering from sensor state toggles.",
        implementation: "Mapped transformer, breaker, CT/PT, and busbar geometries with fault injection controls inside the portfolio showcase.",
        result: "Enables reviewers to inspect component telemetry cues directly in 3D space (simulated frontend twin)."
      }
    ],
    mlPipeline: [
      { name: "Simulated Telemetry Load", description: "Reads transformer and substation CSV splits (including 5,000-row training and 6,000-row output logs).", metric: "5,000 Train Rows" },
      { name: "Asset Diagnostics", description: "Runs RandomForestClassifier, RandomForestRegressor, and IsolationForest across transformer, busbar, and breaker channels." },
      { name: "CNN-LSTM Trainer", description: "Streamlit interface trains a TensorFlow/Keras CNN-LSTM fault classifier on sequence waveform inputs." },
      { name: "Automated Alerting", description: "Generates PDF operational summaries via ReportLab and SMTP dispatch triggers." }
    ],
    securityFeatures: [
      "Proposed utility architecture: strict air-gapped / SCADA gateway network isolation specification",
      "Credentials separation via `email_config.json` template (production deployments must use vault/env secrets)",
      "Proposed utility requirement: Mutual TLS (mTLS) and RBAC audit trails before field connection"
    ],
    devopsPipeline: ["Git Push", "Python Module Execution", "Streamlit Model Trainer UI", "Portfolio Static 3D Demo"],
    technologies: ["Python", "Scikit-learn", "TensorFlow", "Streamlit", "Pandas", "ReportLab", "Three.js"],
    keyFeatures: [
      "Per-asset diagnostic Python scripts for transformers, busbars, instrument transformers, isolators, and circuit breakers.",
      "Combines RandomForest regression/classification with unsupervised IsolationForest anomaly detection.",
      "Streamlit CNN-LSTM waveform fault training interface (`app.py` / `digital_twin.py`).",
      "Automated ReportLab PDF alert report generation (`transformer.py`).",
      "Interactive 3D 400kV Substation visualization on this portfolio with simulated fault modes."
    ],
    accessibilityMeasures: [
      "High-contrast warning and critical state color coding across 3D bay indicators.",
      "Keyboard-accessible scene control buttons and structured diagnostic readouts."
    ],
    performanceMetrics: [
      "Evaluated internally on simulated substation CSV datasets (`transformer_training_5000.csv`, `transformer_all_output.csv`, `live_all_readings.csv`).",
      "No independent utility production SLA benchmark or live grid latency is claimed."
    ],
    lessonsLearned: [
      "Decomposing physical substation equipment into dedicated component predictors simplifies debugging over a single black-box predictor.",
      "Competitive prototypes must clearly distinguish simulated CSV datasets and visual twins from live utility grid telemetry."
    ],
    innovation:
      "Unified component-level ML diagnostics, CNN-LSTM sequence fault training, PDF alert reporting, and an interactive 3D bay twin view.",
    impact:
      "Smart India Hackathon 2025 Grand Finale 1st Place Winner (Team Oceanberg).",
    teamContribution: "Team Lead & Core AI Modeling (SIH Grand Finale — Team Oceanberg)",
    individualContributions: [
      "Co-authored the Python diagnostic modules combining Random Forest and Isolation Forest scoring across transformer and switchgear files.",
      "Built the CNN-LSTM fault classification training script and Streamlit workflow integration.",
      "Created the interactive Three.js 400kV EHV substation bay twin simulation for visual architecture walkthroughs."
    ],
    engineeringDecisions: [
      {
        decision: "Modular per-asset Python predictors over one monolithic substation script",
        rationale: "Transformers, busbars, and breakers expose distinct physical features and fault behaviors.",
        tradeoff: "Requires orchestrating shared alert state across asset modules (`common_alerts.py`).",
        status: "Implemented"
      },
      {
        decision: "Interactive Three.js viewport modeled separately as a portfolio visual twin",
        rationale: "Keeps static web demonstration fast and interactive without requiring a live Python/Streamlit server.",
        tradeoff: "Portfolio 3D scene runs simulated telemetry presets rather than live hardware substation streams.",
        status: "Simulated"
      },
      {
        decision: "mTLS and utility SCADA network isolation boundary",
        rationale: "Critical transmission infrastructure requires strict ingress security before field integration.",
        tradeoff: "Scoped as an architectural specification for utility pilots rather than implemented in hackathon code.",
        status: "Proposed"
      }
    ],
    scalability:
      "Modular Python diagnostic scripts export JSON status snapshots cleanly, enabling future containerization behind FastAPI or MQTT workers.",
    media: [
      {
        title: "Portfolio 3D 400kV Substation Simulation",
        caption: "Interactive WebGL viewport demonstrating transformer, breaker, and fault cues (real utility screenshots not applicable to simulated CSV repo).",
        alt: "EHV Substation Digital Twin monitoring simulation preview",
        type: "dashboard"
      },
      {
        title: "Component Diagnostic Modules (oceanBerg_sih)",
        caption: "Source repository implements `transformer.py`, `busbar.py`, `cirucit_beraker.py`, `digital_twin.py`, and `app.py` (inspection via GitHub link).",
        alt: "Oceanberg SIH module architecture overview",
        type: "architecture"
      }
    ],
    futureImprovements: [
      "Publish standardized holdout cross-validation accuracy and precision/recall tables in `oceanBerg_sih/README.md`.",
      "Replace hardcoded config templates with `.env` secret management and FastAPI telemetry endpoints.",
      "Validate models against utility-approved PMU/DGA logs under NDA."
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Simulated SCADA CSV Ingestion",
        whatHappens: "Loads multi-channel transformer and breaker measurements from repository CSV datasets.",
        component: "Python Asset Scripts (transformer.py, busbar.py, full_sbstation.py)",
        input: "transformer_training_5000.csv & live_all_readings.csv",
        output: "Scaled multi-variate feature matrices"
      },
      {
        step: "02",
        title: "Per-Asset ML & Isolation Scoring",
        whatHappens: "Executes RandomForest regressors/classifiers alongside IsolationForest anomaly scoring per substation component.",
        component: "Scikit-learn Ensembles + StandardScaler",
        input: "Preprocessed electrical & thermal readings",
        output: "Per-asset health classification and outlier score"
      },
      {
        step: "03",
        title: "CNN-LSTM Sequence Fault Training",
        whatHappens: "Streamlit interface trains a CNN-LSTM network on `.npy` waveform arrays for multi-class fault recognition.",
        component: "app.py & digital_twin.py (TensorFlow/Keras)",
        input: "Waveform array tensors (N, T, C)",
        output: "Saved Keras fault classifier (`cnn_lstm_fault.h5`)"
      },
      {
        step: "04",
        title: "Status Broadcast & PDF Alert Generation",
        whatHappens: "Aggregates alert states into `latest_status.json` and builds PDF diagnostic summaries via ReportLab.",
        component: "common_alerts.py + ReportLab PDF / SMTP",
        input: "Predicted fault status flags",
        output: "summary.pdf report & operator alert triggers"
      }
    ],
    groupedTechStack: [
      {
        category: "AI/ML",
        items: [
          { name: "Scikit-learn (RandomForest, IsolationForest)", role: "Transformer, busbar & breaker prediction and anomaly scoring", why: "Strong tabular interpretability and fast iterative evaluation" },
          { name: "TensorFlow / Keras (CNN-LSTM)", role: "Waveform sequence fault trainer launched from Streamlit", why: "Captures spatial and temporal waveform fault patterns" }
        ]
      },
      {
        category: "Frontend",
        items: [
          { name: "Streamlit & ReportLab", role: "Interactive model training UI and automated PDF alert reports", why: "Rapid prototyping for hackathon demonstrations" },
          { name: "Three.js (Portfolio Demo)", role: "Interactive 400kV EHV substation 3D visualization", why: "Illustrates equipment bay topology and simulated fault states" }
        ]
      }
    ],
    aiMlDetails: [
      {
        modelName: "RandomForest + IsolationForest + CNN-LSTM Suite",
        problemSolved: "Multi-asset EHV component diagnostics and waveform fault classification using simulated substation datasets.",
        inputs: "CSV electrical/thermal readings (`transformer_training_5000.csv`, etc.) and `.npy` waveform sequences.",
        preprocessing: "StandardScaler normalization and train/test split evaluation.",
        approach: "Supervised ensemble classification/regression combined with unsupervised IsolationForest outlier bounds and CNN-LSTM sequence training.",
        output: "Per-asset health predictions, `latest_status.json` alerts, and PDF reports.",
        evaluation: "Tested on simulated repository CSVs and waveform trainer splits; exact live utility production accuracy is not claimed until field calibration.",
        limitations: "Simulated datasets only; lacks automated pytest/metrics markdown table in `README.md` and relies on local CSV inputs rather than live utility PMUs."
      }
    ],
    databaseAndDataFlow: {
      sources: "Simulated repository CSV datasets (`transformer_training_5000.csv` 5,000 rows, `transformer_all_output.csv` 6,000 rows, `live_all_readings.csv` 1,917 rows).",
      storageModel: "Flat CSV logs, `.pkl` serialized models (`bus_clf.pkl`), and `latest_status.json` operational output.",
      processing: "Synchronous scikit-learn fit/predict scripts plus on-demand CNN-LSTM training in Streamlit.",
      apiCommunication: "File/JSON state updates (`latest_status.json`) and SMTP PDF alert attachments.",
      retrieval: "Streamlit trainer displays test accuracy inline; scripts output summary tables and `summary.pdf`.",
      schemaNote: "Repository stores CSV schemas rather than external InfluxDB DDL."
    },
    contributionBreakdown: {
      mine: [
        "Co-engineered per-component Python diagnostic scripts (RandomForest + IsolationForest) in `oceanBerg_sih`.",
        "Built the CNN-LSTM fault trainer flow and integrated automated PDF summary alerts.",
        "Constructed the interactive Three.js 400kV bay simulation showcased on this portfolio."
      ],
      team: [
        "Team Oceanberg collaborated on hackathon architecture, UI assembly, and National Grand Finale presentation."
      ],
      thirdParty: [
        "Open-source libraries: Scikit-learn, TensorFlow/Keras, Streamlit, Pandas, ReportLab, Three.js."
      ]
    },
    limitations: [
      "Repository relies on simulated CSV files rather than live utility SCADA feeds; standalone `README.md` currently lacks full benchmark printout logs.",
      "MQTT isolation and utility PMU integration remain future engineering specifications.",
      "Portfolio 3D substation scene is a frontend simulation visualizing diagnostic concepts."
    ],
    verificationChecklist: [
      { claim: "Smart India Hackathon 2025 Grand Finale 1st Place Winner (Team Oceanberg)", status: "Verified result" },
      { claim: "RandomForest, IsolationForest, CNN-LSTM (`app.py`), Streamlit & ReportLab codebase in oceanBerg_sih", status: "Verified implementation" },
      { claim: "Interactive 3D 400kV Substation Twin with Fault Simulation on portfolio", status: "Simulated demonstration" },
      { claim: "MQTT utility SCADA isolation & historical PMU validation", status: "Proposed future improvement" }
    ]
  },

  "intelligent-grievance-system": {
    id: "intelligent-grievance-system",
    title: "Intelligent Multilingual Grievance Categorization & Dispatch",
    tagline: "Multilingual Civic NLP, PyTorch Vision Triage & Confidence-Gated Officer Dispatch",
    category: "Multilingual Civic NLP & Vision Triage",
    statusLabel: "Full-Stack Prototype + Benchmarked ML & Vision Suite",
    githubUrl: "https://github.com/KANISH-850/intelligent-grievance-system",
    overview:
      "A full-stack multilingual civic grievance triage platform (modeled on CPGRAMS workflows) pairing a React + TypeScript portal, Node.js/Express + PostgreSQL/Prisma API, and Python FastAPI AI service for language detection, translation (12 Indian + 7 international languages), TF-IDF + LogisticRegression routing, and PyTorch MobileNetV3-Small civic image classification.",
    problemStatement:
      "Public administration centers receive citizen complaints across multiple regional languages alongside uploaded issue photos, leading to manual categorization backlogs and misrouted departmental tickets.",
    problemSummaryDetail: {
      problemLabel: "Repository-verified problem summary",
      whoFacesIt: "Citizens submitting complaints in regional Indian languages and municipal department officers.",
      realWorldProblem: "Manual multilingual complaint review delays urgent civic repairs (water leaks, drainage blocks, streetlights, potholes) and risks routing errors.",
      whyNeeded: "Combining explainable NLP keyword/TF-IDF classification with confidence thresholds keeps uncertain or visually ambiguous tickets under human officer review.",
      existingLimitations: "Small real-world civic image datasets suffer high class confusion when deployed without conservative review flags.",
      objective: "Build an auditable FastAPI + Express + PostgreSQL platform integrating LRU-cached translation, explainable text classification, and calibrated MobileNetV3-Small vision inspection."
    },
    proposedSolution:
      "Pair FastAPI (`ai-service`) with Express + Prisma (`backend`) and React + Vite (`frontend`): detect language, translate via LibreTranslate / MyMemory with an in-memory LRU cache, score text via `TfidfVectorizer + LogisticRegression`, classify uploaded images via PyTorch `MobileNetV3-Small`, and route uncertain predictions cleanly to officers.",
    systemArchitecture:
      "Three-tier full-stack platform: React/TypeScript SPA -> Node.js/Express API with PostgreSQL + Prisma -> Python FastAPI AI service running TF-IDF + LogisticRegression text routing (with XAI token weights), `deep_translator` / LibreTranslate translation cache, and PyTorch MobileNetV3-Small vision inference.",
    dataFlow:
      "Citizen Multilingual Text & Image Upload -> Express Gateway -> FastAPI Language Detection & LRU-Cached Translation -> TF-IDF + LogisticRegression + MobileNetV3-Small Scoring -> Calibrated Review Flag -> PostgreSQL / Prisma Officer Queue.",
    architectureNodes: [
      { id: "igs-in-1", title: "Citizen & Officer Portals", subtitle: "React + TypeScript SPA with multilingual intake & status cards", layer: "Ingestion & Input", status: "implemented" },
      { id: "igs-in-2", title: "Language Detect & LRU Translation", subtitle: "langdetect + LibreTranslate / MyMemoryTranslator (12 Indian languages)", layer: "Ingestion & Input", status: "implemented" },
      { id: "igs-proc-1", title: "TF-IDF + LogisticRegression", subtitle: "n-gram(1,2) 9-department text classifier with XAI token attribution", layer: "Processing & AI Core", status: "implemented" },
      { id: "igs-proc-2", title: "PyTorch MobileNetV3-Small", subtitle: "9-class civic vision model benchmarked on held-out real test split (36.5ms CPU)", layer: "Processing & AI Core", status: "implemented" },
      { id: "igs-out-1", title: "PostgreSQL + Prisma Queue", subtitle: "Department routing, confidence metadata & officer audit timeline", layer: "Storage & Delivery", status: "implemented" },
      { id: "igs-out-2", title: "External Civic Webhooks", subtitle: "Live municipal ERP webhook integration reserved for deployment", layer: "Storage & Delivery", status: "proposed" }
    ],
    technicalChallenges: [
      {
        id: "igs-1",
        challenge: "Vision models trained on limited real civic image sets (172 train / 38 val / 38 test across 9 classes) exhibit cross-class confusion under noisy field lighting.",
        solution: "Executed held-out evaluation scripts (`rigorous_evaluation.py` and `evaluate_cv_model.py`) generating normalized confusion matrices, FPR metrics, and `evaluation_summary.json` rather than shipping unverified predictions.",
        implementation: "Benchmarked `civic_mobilenet_v3_best.pth` on CPU: recorded 50.0% held-out test accuracy (0.5789 best val acc), 93.08ms median / 146.62ms mean CPU latency in `evaluation_summary.json` (36.47ms warm avg in `REAL_WORLD_CV_MODEL_TRAINING_REPORT.md`), and 33.33% FPR on unrelated negatives, then tuned confidence flags.",
        result: "Calibrated confidence gating surfaces uncertain predictions for human officer review instead of silent auto-misrouting."
      },
      {
        id: "igs-2",
        challenge: "Maintaining multilingual translation availability and explainability when external translation APIs rate-limit or timeout.",
        solution: "Implemented an OrderedDict in-memory LRU cache ahead of LibreTranslate / MyMemory providers alongside explicit TF-IDF coefficient feature attributions.",
        implementation: "Preserved untranslated text safely with `requires_review` status on provider failure and surfaced top n-gram weights via `extract_explanation_terms()`.",
        result: "Prevents silent ticket loss during upstream translation throttling while keeping text routing transparent."
      }
    ],
    mlPipeline: [
      { name: "Language & Translation", description: "Detects regional text and translates across 12 Indian + 7 international languages via LibreTranslate / MyMemory + LRU cache." },
      { name: "TF-IDF + LogisticRegression", description: "Evaluated at 1.00 on 102 curated synthetic test samples (`docs/model-evaluation.md`) with token-level XAI explanations.", metric: "9 Departments" },
      { name: "MobileNetV3-Small Vision", description: "Benchmarked on 38 held-out real civic images: 50.0% test acc (`evaluation_summary.json`: 93.1ms median CPU; `REAL_WORLD_CV_MODEL_TRAINING_REPORT.md`: 36.5ms avg); flags ambiguous photos.", metric: "50.0% Held-Out" },
      { name: "Officer Audit Dispatch", description: "Transactional Prisma/PostgreSQL assignment supporting multi-issue complaints." }
    ],
    securityFeatures: [
      "JWT/role-scoped Citizen, Officer, and Admin authentication flows in Express backend",
      "Strict translation provider isolation and safe `requires_review` preservation on API failures",
      "Pytest integration & provider-boundary tests (`ai-service/tests/`)"
    ],
    devopsPipeline: ["GitHub Push", "Pytest AI Service Suite", "Docker Compose Build", "Vercel UI & Render Backend Deploy"],
    technologies: [
      "React",
      "TypeScript",
      "FastAPI",
      "PyTorch (MobileNetV3)",
      "Scikit-learn (TF-IDF)",
      "Node.js / Express",
      "PostgreSQL",
      "Prisma",
      "Docker"
    ],
    keyFeatures: [
      "Multilingual submission supporting 12 Indian languages with LRU-cached translation.",
      "Multi-issue & multi-department grievance extraction with transactional Prisma routing.",
      "Explainable TF-IDF + LogisticRegression department classifier with regional keyword weights.",
      "PyTorch MobileNetV3-Small civic damage vision triage with transparent evaluation charts.",
      "Citizen progress timeline, Officer department queues, and guided intake chatbot."
    ],
    accessibilityMeasures: [
      "Clear multi-step Citizen portal with guided chatbot intake and legible department labels.",
      "Transparent status pills distinguishing AI suggestions from officer final assignments."
    ],
    performanceMetrics: [
      "MobileNetV3-Small CPU evaluation (`ai-service/reports/mobilenetv3_evaluation/evaluation_summary.json`): 50.0% accuracy across 38 held-out test images (93.08 ms median / 146.62 ms mean CPU; `docs/REAL_WORLD_CV_MODEL_TRAINING_REPORT.md` reports 36.47 ms warm avg).",
      "Held-out MobileNetV3 dataset split: 172 train / 38 val / 38 test images (0.5789 best val accuracy) — documented with normalized confusion matrix (`confusion_matrix_normalized.png`).",
      "Text classifier (`docs/model-evaluation.md`): TF-IDF n-gram (1,2) + calibrated LogisticRegression validated on 102 curated CPGRAMS-inspired test samples."
    ],
    lessonsLearned: [
      "Reporting real held-out evaluation errors (50% test accuracy on 38 real civic photos) builds far stronger engineering credibility than hiding behind synthetic scores.",
      "Small image datasets need conservative confidence thresholds and human officer override flows."
    ],
    innovation:
      "Pairs multi-issue multilingual triage and token-level TF-IDF explainability with honest MobileNetV3 failure analysis and human-in-the-loop officer queues.",
    impact:
      "Automates regional grievance translation, multi-department splitting, and transparent audit tracking end-to-end across React, Express, and FastAPI.",
    teamContribution: "Primary Author — Full-Stack Architecture, AI Service & Evaluation Suite",
    individualContributions: [
      "Built the FastAPI `ai-service` integrating language detection, LRU-cached translation, TF-IDF + LogisticRegression XAI, and PyTorch MobileNetV3 inference.",
      "Implemented the `rigorous_evaluation.py` benchmark suite generating normalized confusion matrices and CPU latency percentiles.",
      "Developed transactional multi-issue department routing in Express/Prisma and Citizen/Officer UI workflows."
    ],
    engineeringDecisions: [
      {
        decision: "TF-IDF + LogisticRegression text router over uncalibrated heavy LLMs",
        rationale: "Delivers sub-millisecond deterministic department scoring with inspectable token coefficients.",
        tradeoff: "Relies on upstream translation + keyword fallback for regional scripts.",
        status: "Implemented"
      },
      {
        decision: "Conservative vision calibration after 50% held-out MobileNetV3 test audit",
        rationale: "Revealed confusion between blocked drainage, water leakage, and garbage classes on small datasets.",
        tradeoff: "Routes borderline vision uploads to officer review rather than silent auto-dispatch.",
        status: "Implemented"
      }
    ],
    scalability:
      "Stateless FastAPI inference workers deployed independently behind Express + PostgreSQL/Prisma persistence and LRU translation caching.",
    media: [
      {
        title: "Citizen Multilingual Grievance Submission UI",
        caption: "Actual captured application screenshot from `docs/presentation/screenshots/01_citizen_submission.png`.",
        alt: "Intelligent Grievance System Citizen Submission UI screenshot",
        type: "screenshot",
        src: "/evidence/igs-citizen-submission.png"
      },
      {
        title: "Officer Department Queue & Audit View",
        caption: "Actual captured Officer Portal UI from `docs/presentation/screenshots/03_officer_queue.png`.",
        alt: "Intelligent Grievance System Officer Queue UI screenshot",
        type: "dashboard",
        src: "/evidence/igs-officer-queue.png"
      },
      {
        title: "MobileNetV3-Small Held-Out Confusion Matrix",
        caption: "Genuine Matplotlib evaluation plot (`confusion_matrix_normalized.png`) across 38 real test images (50% accuracy, 36.47ms CPU avg).",
        alt: "MobileNetV3-Small normalized confusion matrix evaluation chart",
        type: "architecture",
        src: "/evidence/igs-mobilenet-confusion.png"
      }
    ],
    futureImprovements: [
      "Expand labeled real-world civic training dataset beyond 172 samples to address drainage/waterlogging class confusion.",
      "Add self-hosted CTranslate2/ONNX NMT weights inside Docker to remove dependency on public translation endpoints."
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Multilingual Citizen Intake",
        whatHappens: "Citizen submits complaint text (12 Indian languages supported) and optional damage photo via React portal.",
        component: "React/TypeScript SPA + Express Gateway",
        input: "Regional language text + image attachment",
        output: "Validated grievance payload"
      },
      {
        step: "02",
        title: "Language Detect & Cached Translation",
        whatHappens: "Identifies source language and translates to English using LibreTranslate/MyMemory with OrderedDict LRU caching.",
        component: "ai-service/translator.py + language_detector.py",
        input: "Raw regional complaint string",
        output: "English pivot text + cache/provider metadata"
      },
      {
        step: "03",
        title: "TF-IDF Routing + MobileNetV3 Triage",
        whatHappens: "TF-IDF + LogisticRegression scores 9 civic categories with token explanations while MobileNetV3 checks uploaded photos.",
        component: "ml/classifier.py + cv_model.py",
        input: "Normalized English text + image tensor",
        output: "Predicted department(s), urgency, and calibrated confidence flags"
      },
      {
        step: "04",
        title: "Transactional Officer Queue Dispatch",
        whatHappens: "Express/Prisma creates department tickets (splitting multi-issue grievances cleanly) with full timeline logs.",
        component: "PostgreSQL + Prisma Officer Queue",
        input: "Routed category & review status",
        output: "Tracked citizen grievance & officer action queue"
      }
    ],
    groupedTechStack: [
      {
        category: "Frontend",
        items: [
          { name: "React & TypeScript (Vite)", role: "Citizen portal, Officer queue, Admin controls & chatbot", why: "Strongly typed UI state and rapid deployment via Vercel" }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js / Express + FastAPI", role: "API persistence gateway and dedicated Python AI inference service", why: "Clean separation between transactional ORM and PyTorch/sklearn inference" }
        ]
      },
      {
        category: "Database",
        items: [
          { name: "PostgreSQL + Prisma", role: "Multi-issue grievance state, user roles & audit history", why: "Relational guarantees across ticket transitions" }
        ]
      },
      {
        category: "AI/ML",
        items: [
          { name: "Scikit-learn (TF-IDF + LogisticRegression)", role: "Explainable 9-department text classification & keyword XAI", why: "Deterministic inference with token contribution visibility" },
          { name: "PyTorch (MobileNetV3-Small)", role: "Lightweight CPU civic issue image classification (50.0% held-out acc; 93.1ms median CPU)", why: "Auditable vision prototype benchmarked with held-out confusion matrices" }
        ]
      }
    ],
    aiMlDetails: [
      {
        modelName: "TF-IDF (1,2-gram) + LogisticRegression Text Classifier",
        problemSolved: "Multi-department categorization across 9 municipal services with token-level explainability.",
        inputs: "Translated grievance text strings.",
        preprocessing: "Lowercasing, n-gram (1,2) TF-IDF vectorization (max 5000 features) + regional keyword dictionaries.",
        approach: "LogisticRegression(C=2.5) paired with `extract_explanation_terms()` coefficient attribution.",
        output: "Department prediction, urgency tier, and top contributing keywords.",
        evaluation: "Achieved 1.00 accuracy on 102 curated synthetic benchmark test samples (`docs/model-evaluation.md`); requires broader noisy production logs for real-world text scoring.",
        limitations: "Synthetic text validation metrics overstate performance relative to code-mixed slang or ambiguous dialect phrases."
      },
      {
        modelName: "PyTorch MobileNetV3-Small Civic Vision Classifier",
        problemSolved: "Image-based verification of uploaded civic issues (potholes, drainage, broken streetlights, garbage).",
        inputs: "224x224 normalized RGB complaint images across 9 classes.",
        preprocessing: "ImageNet normalization (`eval_transforms`) evaluated strictly on isolated test directory (`splits/test`).",
        approach: "ImageNet1K_V1 transfer learning fine-tuned with AdamW and unrelated-negative rejection checks (`civic_mobilenet_v3_best.pth`).",
        output: "Predicted civic class, confidence score, and calibrated review flag.",
        evaluation: "Held-out `ai-service/reports/mobilenetv3_evaluation/evaluation_summary.json`: 50.0% accuracy across 38 test samples (172 train / 38 val), 93.08ms median / 146.62ms mean CPU latency (36.47ms warm avg in `REAL_WORLD_CV_MODEL_TRAINING_REPORT.md`), 33.33% unrelated FPR.",
        limitations: "Small dataset size causes confusion on drainage vs. garbage and waterlogging classes; strict human officer review remains necessary."
      }
    ],
    databaseAndDataFlow: {
      sources: "Multilingual Citizen text submissions and optional civic damage photographs.",
      storageModel: "PostgreSQL managed via Prisma ORM tracking complaints, multi-issue splits, officer remarks, and status history.",
      processing: "Translation (with LRU cache) -> TF-IDF + LogisticRegression -> MobileNetV3 image pass -> transactional ticket dispatch.",
      apiCommunication: "REST endpoints between React SPA, Express gateway, and FastAPI AI microservice.",
      retrieval: "Citizens query real-time progress cards; officers filter queues by department and status.",
      schemaNote: "Prisma schema and FastAPI models reside directly in `KANISH-850/intelligent-grievance-system`."
    },
    contributionBreakdown: {
      mine: [
        "Engineered FastAPI AI pipeline (TF-IDF routing, XAI weights, LRU translation, and MobileNetV3 vision service).",
        "Created the held-out `rigorous_evaluation.py` & `evaluate_cv_model.py` vision audits and normalized confusion matrix reports.",
        "Implemented multi-issue transactional routing and calibrated officer queue UI."
      ],
      team: [],
      thirdParty: [
        "Open-source libraries: PyTorch, Torchvision, Scikit-learn, FastAPI, deep-translator, Express, Prisma, React."
      ]
    },
    limitations: [
      "Held-out vision accuracy is 50.0% on the 38-sample test split; visual triage requires a larger training corpus before autonomous routing.",
      "Text classifier validation accuracy (1.00 in `docs/model-evaluation.md`) reflects curated/synthetic categories rather than messy live municipal logs."
    ],
    verificationChecklist: [
      { claim: "React + Express + Prisma/PostgreSQL + FastAPI AI service in repo", status: "Verified implementation" },
      { claim: "MobileNetV3-Small held-out test audit (50.0% acc) in ai-service/reports/mobilenetv3_evaluation/evaluation_summary.json", status: "Verified result" },
      { claim: "Actual UI screenshots & confusion matrix PNG embedded from repo", status: "Verified result" },
      { claim: "Interactive 3D NLP & Dispatch Twin on portfolio", status: "Simulated demonstration" }
    ]
  },

  "aquaguard-ai": {
    id: "aquaguard-ai",
    title: "AquaGuard AI / Neeraran — Campus Water Resilience ML Audit",
    tagline: "Imbalanced Consumption Anomaly Detection & High-Recall Pipe Leak Identification",
    category: "Water Resilience & Time-Series ML",
    statusLabel: "Collaborative Team Repo • Authored ML Audit & Sensor Health Suite",
    githubUrl: "https://github.com/LakshanyaaJ/neeraran",
    overview:
      "A collaborative campus water resilience platform (`LakshanyaaJ/neeraran`). While teammates built the hydraulic digital twin simulator, 7-agent orchestrator, and Next.js/Vite control center (`main` branch), I authored the comprehensive ML evaluation & sensor-health decoupling suite on the `kanish` branch benchmarking anomaly and leak models over 46,656 simulated telemetry observations.",
    problemStatement:
      "University campuses waste substantial volumes of water through undetected subsurface leaks and faulty flowmeter dropouts, yet naive classifiers optimize accuracy on heavily imbalanced (0.22% anomaly) datasets and trigger false inspection dispatches.",
    problemSummaryDetail: {
      problemLabel: "Verified finding from Kanish's ML Audit (`kanish` branch `MODEL_EVALUATION.md`)",
      whoFacesIt: "Campus water estate teams, ML reliability engineers, and utilities operators.",
      realWorldProblem: "Isolation Forest achieved 99.55% accuracy on test telemetry yet missed 76.2% of real consumption anomalies (0.1860 F1) due to 0.22% anomaly prevalence.",
      whyNeeded: "Switching metrics from raw accuracy to Precision/Recall/F1, event detection delay, and sensor health decoupling avoids false alarms while catching leaks immediately.",
      existingLimitations: "Mixing broken flatline pressure meters into leak classifiers produces phantom rupture dispatches.",
      objective: "Benchmark RBF One-Class SVM vs. LOF/Isolation Forest and XGBoost vs. RF/ExtraTrees, paired with an upstream Layer-1 sensor health verifier."
    },
    proposedSolution:
      "Execute rigorous event-aware chronological evaluation (`run_ml_audit_experiments.py`) comparing anomaly detectors and leak classifiers, deploy One-Class SVM (`32.8 KB`, `3.92 ms`) and XGBoost (`100% leak recall`, `2.29 ms`) behind FastAPI telemetry routes, and isolate sensor faults upstream before leak alerting.",
    systemArchitecture:
      "Collaborative dual-track architecture in `LakshanyaaJ/neeraran`: `kanish` branch delivers Python FastAPI sensor-health decoupling (Layer-1 sensor verifier), chronological ML training/benchmarking pipelines (One-Class SVM, XGBoost, Isolation Forest, LOF), and SHAP/confusion audit reports; `main` branch connects a deterministic simulator (Holt-Winters 24h/72h forecasting) with a React SCADA/GIS UI.",
    dataFlow:
      "Campus Telemetry (46,656 Test Rows) -> Layer-1 Sensor Fault Check -> Chronological Feature Pipeline -> One-Class SVM (Anomaly) & XGBoost (Leak Classifier) -> Decision Engine -> FastAPI & SCADA Dashboard.",
    architectureNodes: [
      { id: "ag-in-1", title: "Simulated Flow & Pressure Telemetry", subtitle: "46,656 untouched test rows across campus zones & meters", layer: "Ingestion & Input", status: "simulated" },
      { id: "ag-in-2", title: "Layer-1 Sensor Health Service", subtitle: "Decouples meter dropouts/flatlines before leak scoring (kanish branch)", layer: "Ingestion & Input", status: "implemented" },
      { id: "ag-proc-1", title: "One-Class SVM Anomaly Detector", subtitle: "0.7451 F1 (99.89% Acc, 3.92 ms avg latency, 32.8 KB model)", layer: "Processing & AI Core", status: "implemented" },
      { id: "ag-proc-2", title: "XGBoost Leak Classifier", subtitle: "100% leak recall, 97.37% precision, 2.29 ms avg (99.79% Acc)", layer: "Processing & AI Core", status: "implemented" },
      { id: "ag-out-1", title: "Holt-Winters Forecaster (Team main)", subtitle: "24h demand sMAPE 6.2% / 72h sMAPE 8.4% documented in docs/EVAL.md", layer: "Storage & Delivery", status: "implemented" },
      { id: "ag-out-2", title: "Automated Valve Hardware Actuation", subtitle: "Reserved for physical operator confirmation (safety guardrail)", layer: "Storage & Delivery", status: "proposed" }
    ],
    technicalChallenges: [
      {
        id: "ag-1",
        challenge: "Exposing why 99.55% accuracy on imbalanced water telemetry (0.22% anomalies across 46,656 rows) still caused 76.2% missed anomalies under Isolation Forest.",
        solution: "Benchmarked Isolation Forest (0.1860 F1), Local Outlier Factor (0.6988 F1), and RBF One-Class SVM (0.7451 F1) using event-level latency and PR-AUC.",
        implementation: "Tuned RBF One-Class SVM over sinusoidal diurnal occupancy curves, achieving 0.7525 recall, 0.7379 precision, 0.0 min detection delay, and 3.92 ms latency.",
        result: "Lifted anomaly F1 4x over Isolation Forest (0.1860 -> 0.7451) in a 32.8 KB serialized footprint (`best_model_summary.json`)."
      },
      {
        id: "ag-2",
        challenge: "Preventing dead pressure sensors from triggering false pipe-leak alarms while catching 100% of simulated ruptures.",
        solution: "Implemented Layer-1 Sensor Health decoupling + XGBoost tuned for 100% leak recall (`test_sensor_health.py`).",
        implementation: "Benchmarked XGBoost (2.29 ms avg, 2.90 ms p95, 1.1 MB) vs Random Forest (47.17 ms) and Extra Trees (62.64 ms).",
        result: "Achieved 100.0% leak recall, 97.37% leak precision, and 0.0% demand-to-leak misclassification on the test partition."
      }
    ],
    modelMetrics: [
      {
        model: "One-Class SVM (RBF)",
        task: "Abnormal Consumption (46,656 Test Rows)",
        accuracyOrMetric: "99.89% Acc (F1: 0.7451)",
        f1OrDetail: "Recall: 75.25% | Size: 32.8 KB",
        latency: "3.92 ms avg (9.73 ms p95)",
        context: "Authored benchmark (`best_model_summary.json`): 4x higher F1 than Isolation Forest baseline (0.1860 F1)."
      },
      {
        model: "XGBoost Classifier",
        task: "Pipe Leak Identification",
        accuracyOrMetric: "99.79% Acc (Macro F1: 0.6254)",
        f1OrDetail: "100% Leak Recall | 97.37% Prec",
        latency: "2.29 ms avg (2.90 ms p95)",
        context: "Zero demand-to-leak false alarms vs. 47.17 ms (Random Forest) and 62.64 ms (Extra Trees)."
      },
      {
        model: "Holt-Winters + Weather (Team `main`)",
        task: "Demand & Tank Reserve Forecasting",
        accuracyOrMetric: "6.2% sMAPE (24h)",
        f1OrDetail: "8.4% sMAPE (72h Demand)",
        latency: "14.2 ms pipeline P50",
        context: "Documented by teammates on `main` (`docs/EVAL.md`) across deterministic digital twin simulations."
      }
    ],
    metricsContextNote:
      "Verified provenance: Anomaly (One-Class SVM) and Leak (XGBoost) metrics come directly from Kanish's audited runs (`kanish:results/best_model_summary.json`) on 46,656 simulated telemetry rows; forecasting & tariff metrics come from `main:docs/EVAL.md`.",
    mlPipeline: [
      { name: "Chronological Event Split", description: "Strict zero-leakage temporal train/test partitioning (`3baa4e9`) across campus zones." },
      { name: "Sensor Health Layer", description: "Detects flatlines and dropouts (`303ca1b`, `test_sensor_health.py`) before ML invocation." },
      { name: "One-Class SVM Anomaly", description: "RBF kernel flags diurnal deviations.", metric: "0.7451 F1 | 3.92ms" },
      { name: "XGBoost Leak Localization", description: "4-class hydraulic classifier with SHAP feature importance.", metric: "100% Recall | 2.29ms" }
    ],
    securityFeatures: [
      "Layer-1 sensor health integrity checks blocking corrupted telemetry packets before model decisions",
      "Verifier Agent groundedness enforcement on `main` linking recommendations to `EVID-*` identifiers",
      "Human approval gate kept mandatory ahead of any simulated distribution valve throttling"
    ],
    devopsPipeline: ["GitHub Feature Branch (kanish)", "Sensor Health & ML Pytest Suite", "Audit Plot Generation", "FastAPI + React SCADA UI"],
    technologies: ["Python", "One-Class SVM", "XGBoost", "Scikit-learn", "FastAPI", "SHAP", "React", "TypeScript"],
    keyFeatures: [
      "ML Audit Suite comparing Isolation Forest, LOF, One-Class SVM, Random Forest, Extra Trees & XGBoost.",
      "Layer-1 Sensor Health Service decoupling broken/flatline meters from genuine pipe leak alerts.",
      "SHAP summary and permutation importance explainability artifacts (`results/figures/`).",
      "Teammates' digital twin simulator, 7-agent orchestrator, and interactive GIS SCADA frontend."
    ],
    accessibilityMeasures: [
      "Clear status state separation (Normal, Sensor Fault, Anomaly, Pipe Leak) across incident cards.",
      "Responsive monitoring dashboard layouts cleanly separating metric tables from alerts."
    ],
    performanceMetrics: [
      "One-Class SVM (`best_model_summary.json`): 0.7451 F1, 99.89% acc, 3.92 ms avg latency, 32.8 KB footprint.",
      "XGBoost (`best_model_summary.json`): 100% leak recall, 97.37% leak precision, 2.29 ms avg latency (2.90 ms p95).",
      "Team `main` Simulator (`docs/EVAL.md`): 24h demand 6.2% sMAPE, 72h demand 8.4% sMAPE, 15.0 min MTTD vs. 65.0 min baseline."
    ],
    lessonsLearned: [
      "High classification accuracy on imbalanced telemetry (99.55% Isolation Forest) completely masks poor F1 (0.1860) and high false negative rates (76.2%).",
      "Decoupling sensor health diagnostics from hydraulic modeling eliminates phantom leak dispatches."
    ],
    innovation:
      "Exposed accuracy deception via rigorous event-level ML auditing and introduced Layer-1 sensor health decoupling ahead of XGBoost leak detection.",
    impact:
      "Demonstrated 4x F1 improvement over Isolation Forest and 100% leak recall at 2.29 ms inference within a multi-contributor TCS Tech Day build.",
    teamContribution: "ML Audit Suite, Model Benchmarking & Sensor Health Service (kanish branch)",
    individualContributions: [
      "Authored the full ML audit & benchmarking pipeline (`run_ml_audit_experiments.py`, `MODEL_EVALUATION.md`, SHAP/confusion plots) on `LakshanyaaJ/neeraran` branch `kanish`.",
      "Implemented Layer-1 sensor-health decoupling, recovery simulation, FastAPI sensor-health endpoints, and `test_sensor_health.py`.",
      "Cleanly attributed teammate Bhadri Prabhu K, Amirtha E & Lakshanyaa J's digital twin simulator, 7-agent verifier, and GIS frontend on `main`."
    ],
    engineeringDecisions: [
      {
        decision: "RBF One-Class SVM over Isolation Forest for diurnal anomaly scoring",
        rationale: "Non-linear RBF boundaries trace cyclical daily campus demand cleanly, lifting F1 from 0.1860 to 0.7451.",
        tradeoff: "Requires scaling calibration when holiday campus occupancy patterns diverge sharply.",
        status: "Implemented"
      },
      {
        decision: "Layer-1 Sensor Health Service ahead of XGBoost leak detection",
        rationale: "Flatline or zero-value sensor freezes produce sharp gradients indistinguishable from bursts if unchecked.",
        tradeoff: "Requires explicit sensor health test thresholds (`test_sensor_health.py`).",
        status: "Implemented"
      },
      {
        decision: "Human-approved valve recommendations instead of autonomous actuation",
        rationale: "Physical valve closure risks block outages without field verification.",
        tradeoff: "Retains human confirmation step in incident workflow.",
        status: "Proposed"
      }
    ],
    scalability:
      "Tiny serialized models (32.8 KB One-Class SVM, 1.1 MB XGBoost) score frames in ~2–4 ms per zone in FastAPI.",
    media: [
      {
        title: "XGBoost Leak Classifier Confusion Matrix",
        caption: "Actual Matplotlib audit plot generated from `kanish` branch (`docs/ml_audit/confusion_matrix_xgboost.png`).",
        alt: "AquaGuard XGBoost normalized confusion matrix plot",
        type: "architecture",
        src: "/evidence/aquaguard-xgboost-cm.png"
      },
      {
        title: "Cross-Model Class Performance Evaluation",
        caption: "Actual Matplotlib class performance chart authored in `kanish:docs/ml_audit/class_performance.png`.",
        alt: "AquaGuard ML model class performance chart",
        type: "architecture",
        src: "/evidence/aquaguard-class-perf.png"
      }
    ],
    futureImprovements: [
      "Merge verified `kanish` branch ML audit pipelines and sensor-health FastAPI modules directly into `main`.",
      "Validate calibrated thresholds against longitudinal hardware flowmeter installations."
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Telemetry Ingestion & Sensor Fault Check",
        whatHappens: "Layer-1 sensor monitor validates incoming zone flow/pressure ticks for dropouts, noise spikes, or flatlines.",
        component: "SensorHealthService (FastAPI)",
        input: "Zone flow rates & line pressures",
        output: "Verified telemetry + health flag"
      },
      {
        step: "02",
        title: "Chronological Features & Boundary Scoring",
        whatHappens: "Diurnal lag/gradient features feed One-Class SVM (`3.92 ms`) to flag consumption anomalies.",
        component: "One-Class SVM (best_anomaly_model.joblib)",
        input: "Preprocessed diurnal feature vectors",
        output: "Outlier score & anomaly state (0.7451 F1)"
      },
      {
        step: "03",
        title: "XGBoost Leak Identification & SHAP Attribution",
        whatHappens: "XGBoost classifies hydraulic states across normal usage, leak, sensor fault, and transient events in 2.29 ms.",
        component: "XGBoost (best_leak_model.joblib)",
        input: "Hydraulic gradient vectors",
        output: "Leak class (100% recall) + feature importance"
      },
      {
        step: "04",
        title: "Incident Decision Engine & SCADA UI",
        whatHappens: "Prioritizes verified leak alerts cleanly without conflating sensor glitches for operator action.",
        component: "Evidence-Based Decision Engine & React UI",
        input: "Health + Anomaly + Leak signals",
        output: "Actionable repair queue & SCADA incident feed"
      }
    ],
    groupedTechStack: [
      {
        category: "Backend",
        items: [
          { name: "Python + FastAPI + Pytest", role: "Telemetry ingestion endpoints, Layer-1 health service & test suite", why: "Fast async typing and reproducible regression checks" }
        ]
      },
      {
        category: "AI/ML",
        items: [
          { name: "One-Class SVM (Scikit-learn)", role: "Unsupervised consumption anomaly detection", why: "F1 0.7451 vs Isolation Forest 0.1860; 32.8 KB / 3.92 ms" },
          { name: "XGBoost + SHAP", role: "Supervised pipe leak classification & feature attribution", why: "100% leak recall, 97.37% precision, 2.29 ms avg inference" },
          { name: "Holt-Winters (Team `main`)", role: "24h & 72h demand forecasting in simulator", why: "Achieved 6.2% / 8.4% sMAPE in team `docs/EVAL.md` benchmarks" }
        ]
      },
      {
        category: "Frontend",
        items: [
          { name: "React + TypeScript + Tailwind", role: "Sensor health dashboard & GIS digital twin control center", why: "Responsive operator monitoring UI across simulated campus zones" }
        ]
      }
    ],
    aiMlDetails: [
      {
        modelName: "One-Class SVM (RBF Kernel)",
        problemSolved: "Detecting abnormal consumption under severe 0.22% class imbalance.",
        inputs: "17 scaled diurnal, occupancy, and flow features across 46,656 test observations.",
        preprocessing: "Strict normal-only fit, chronological event splitting, StandardScaler.",
        approach: "RBF One-Class SVM selected over Isolation Forest & Local Outlier Factor after empirical audit.",
        output: "Anomaly flag and decision margin.",
        evaluation: "99.89% acc, 0.7451 F1, 75.25% recall, 73.79% prec, 3.92 ms avg latency (`best_model_summary.json`).",
        limitations: "Requires re-calibration when seasonal campus schedules diverge sharply from training envelopes."
      },
      {
        modelName: "XGBoost Hydraulic Leak Classifier",
        problemSolved: "Distinguishing physical leaks from normal peak demand and sensor faults.",
        inputs: "5-minute flow and pressure gradient features.",
        preprocessing: "Layer-1 sensor health filtering and temporal window alignment.",
        approach: "Gradient-boosted 4-class classification benchmarked against Random Forest and Extra Trees.",
        output: "Leak probability and repair ranking.",
        evaluation: "99.79% acc, 100% leak recall, 97.37% precision, 2.29 ms avg / 2.90 ms p95 latency (`best_model_summary.json`).",
        limitations: "Benchmarked on simulated campus hydraulic data rather than live municipal flowmeter logs."
      }
    ],
    databaseAndDataFlow: {
      sources: "Simulated campus flowmeter and junction pressure telemetry (46,656 untouched test rows).",
      storageModel: "CSV/JSON experiment outputs on `kanish` branch; SQLite / structured state snapshots in simulator backend.",
      processing: "Layer-1 sensor fault decoupling -> feature normalization -> parallel One-Class SVM & XGBoost scoring.",
      apiCommunication: "FastAPI telemetry endpoints serving SCADA sensor-health and leak alert panels.",
      retrieval: "Operators inspect incident feeds alongside Shapley/confusion audit outputs.",
      schemaNote: "Full audit metrics and evaluation tables are committed under `kanish:docs/ml_audit/` and `results/`."
    },
    contributionBreakdown: {
      mine: [
        "Authored the entire ML comparative audit suite, leakage audit, and SHAP/confusion figures (`kanish` branch).",
        "Built Layer-1 Sensor Health Service, FastAPI telemetry endpoints, SCADA health frontend, and `test_sensor_health.py`."
      ],
      team: [
        "Collaborators Bhadri Prabhu K, Amirtha E & Lakshanyaa J authored the simulator, 7-agent orchestrator, Holt-Winters forecaster, and GIS UI (`main` branch)."
      ],
      thirdParty: [
        "Open-source libraries: Scikit-learn, XGBoost, SHAP, FastAPI, React, TypeScript, Three.js."
      ]
    },
    limitations: [
      "Audit benchmarks use simulated hydraulic datasets rather than live physical campus pipes.",
      "ML audit & sensor-health upgrades sit on branch `kanish` while team simulator orchestration sits on `main`."
    ],
    verificationChecklist: [
      { claim: "One-Class SVM (0.7451 F1, 3.92ms) & XGBoost (100% recall, 2.29ms) in kanish:results/best_model_summary.json", status: "Verified result" },
      { claim: "Layer-1 Sensor Health Service, FastAPI endpoints & test_sensor_health.py by Kanish", status: "Verified implementation" },
      { claim: "Confusion Matrix & Class Performance Matplotlib charts embedded from repo", status: "Verified result" },
      { claim: "Team `main` simulator Holt-Winters forecast benchmarks (6.2% / 8.4% sMAPE)", status: "Simulated demonstration" },
      { claim: "Automated physical valve actuation hardware control", status: "Proposed future improvement" }
    ]
  },

  "kiosk-management-system": {
    id: "kiosk-management-system",
    title: "Kiosk Management System (AAZHI)",
    tagline: "Multilingual Civic Utility Billing, Grievance & Voice Self-Service Kiosk Platform",
    category: "Civic Self-Service Kiosk & Full-Stack AI",
    statusLabel: "C-DAC Runner-up (Team Fork • Verified Frontend/Voice & Platform Integration)",
    achievement: "CDAC Runner-up",
    githubUrl: "https://github.com/KANISH-850/aazhi",
    overview:
      "Built for the C-DAC SUVIDHA Innovation Challenge (National Runner-up, Team Oceanberg), AAZHI (`KANISH-850/aazhi`, forked from `ajaiselvaraj/aazhi`) is a unified civic self-service kiosk platform enabling citizens to pay utility bills (electricity, water, gas, property tax via Razorpay) and lodge multilingual grievances across 11+ Indian languages using voice-guided workflows, real-time QR tracking, and a FastAPI ML triage backend.",
    problemStatement:
      "Citizens in public municipal centers face long service queues, fragmented department counters, and regional language barriers when paying utility bills or filing civic complaints on standard web portals.",
    problemSummaryDetail: {
      problemLabel: "Repository-verified problem summary (AAZHI PROJECT_DOCUMENTATION.md)",
      whoFacesIt: "Citizens at municipal helpdesks (including elderly and regional-language users), utility providers, and civic administrators.",
      realWorldProblem: "Public utility billing and complaint lodging rely on disconnected portals without multilingual voice guidance, accessible kiosk UI modes, or automated complaint triage.",
      whyNeeded: "Combining a touch- and voice-accessible multilingual kiosk UI with unified billing, SLA escalation, tamper-evident audit logging, and offline ML routing streamlines citizen service delivery.",
      existingLimitations: "Standard web forms exclude non-English speakers and lack unified QR tracking, spam screening, and duplicate complaint detection.",
      objective: "Deliver a dual React kiosk/admin platform backed by Express (`pg` + Redis/BullMQ + Socket.IO) and a FastAPI Scikit-learn AI microservice."
    },
    proposedSolution:
      "Pair React 19/TypeScript citizen kiosk UI (with i18next 11-language support and Aria Web Speech voice navigation) and React 18 admin analytics portal with an Express REST/Socket.IO backend (`pg`, Redis/BullMQ, Razorpay, PDFKit) and a local FastAPI Scikit-learn service for spam, duplicate, routing, sentiment, and forecasting inference.",
    systemArchitecture:
      "Dual React/Vite frontends (`Frontend/user` React 19 kiosk app + `Frontend/admin` React 18 Leaflet/Recharts console) communicate with an Express Node.js backend (monolith + microservice gateway option) using PostgreSQL (`pg` / Supabase), Redis (`ioredis` + `BullMQ`), Socket.IO QR tracking, Razorpay billing, SHA-256 HMAC audit chaining, and a FastAPI Python `ai-service`.",
    dataFlow:
      "Citizen Touch / Aria Voice Input (11+ Languages) -> React Kiosk SPA -> Express SecurityEngine & WAF Gateway -> PostgreSQL (`pg`) + Redis/BullMQ + FastAPI ML Triage -> Socket.IO QR Tracking & Admin SLA Console.",
    architectureNodes: [
      { id: "kms-in-1", title: "Citizen Kiosk SPA & Aria Voice", subtitle: "React 19 + i18next (11+ Indian languages) + Unicode-safe VoiceCommandRouter", layer: "Ingestion & Input", status: "implemented" },
      { id: "kms-in-2", title: "Express API & SecurityEngine WAF", subtitle: "Helmet, HPP, Joi validation, leaky-bucket rate limiting & JWT/OTP auth", layer: "Ingestion & Input", status: "implemented" },
      { id: "kms-proc-1", title: "FastAPI Civic AI Engine", subtitle: "LinearSVC/IsolationForest spam check, TF-IDF cosine duplicates & department router", layer: "Processing & AI Core", status: "implemented" },
      { id: "kms-proc-2", title: "Billing, SLA & Queue Workers", subtitle: "Razorpay billing, PDFKit receipts, BullMQ/Redis notifications & SLA cron", layer: "Processing & AI Core", status: "implemented" },
      { id: "kms-out-1", title: "PostgreSQL + SHA-256 Audit Chain", subtitle: "Relational utility/complaint store with HMAC-chained tamper-evident logs", layer: "Storage & Delivery", status: "implemented" },
      { id: "kms-out-2", title: "Admin GIS Console & k6 Stress Suite", subtitle: "React 18 Leaflet/Recharts admin portal, Socket.IO QR tracking & k6/Grafana suite", layer: "Storage & Delivery", status: "implemented" }
    ],
    technicalChallenges: [
      {
        id: "kms-1",
        challenge: "Supporting reliable voice command routing across 11+ Indian regional scripts without stripping non-ASCII Unicode characters.",
        solution: "Built a Unicode-safe `VoiceCommandRouter` sorting command phrases by length descending and checking active tab context before global routes.",
        implementation: "Preserved regional scripts (Hindi, Tamil, Bengali, Assamese, etc.) while stripping only ASCII punctuation inside `Frontend/user` voice modules (`Voice Module` commits).",
        result: "Prevents short generic words (e.g., 'bill') from hijacking specific voice commands like 'electricity bill' across multilingual tabs."
      },
      {
        id: "kms-2",
        challenge: "Ensuring mobile QR status tracking and kiosk keypad flows work consistently across local network demos and cloud SPA hosting.",
        solution: "Parameterized QR tracking URLs via `VITE_APP_URL`, added SPA rewrite routing (`vercel.json`), and constrained keypad length validation.",
        implementation: "Updated QR code URL generation, fixed keypad bounds (`Keypad Length Fix`), and integrated Socket.IO real-time status updates with admin SLA alerts.",
        result: "Clean QR mobile handoff and verified UI state sync across kiosk citizen and admin dashboards."
      }
    ],
    mlPipeline: [
      { name: "Spam & Anomaly Screen", description: "FastAPI `/api/ai/analyze` runs Scikit-learn LinearSVC (`custom_spam_classifier.pkl`) + IsolationForest (`fraud_detector.py`)." },
      { name: "Smart Department Router", description: "Classifies complaints across civic departments with word-level explanations and deterministic keyword fallback." },
      { name: "TF-IDF Duplicate Check", description: "Computes TF-IDF cosine similarity against historical ward complaints to flag duplicate submissions." },
      { name: "Sentiment & Volume Forecast", description: "Evaluates urgency/sentiment and forecasts complaint volume, hotspots, and SLA breach risk." }
    ],
    securityFeatures: [
      "Express SecurityEngine middleware: Helmet headers, HPP parameter guard, XSS-clean, CORS & leaky-bucket rate limiter",
      "Cryptographic SHA-256 HMAC tamper-evident audit chain (`AuditLogger.ts`) linking sequential transaction logs",
      "JWT/OTP authentication flows (`jwt.service.js`, `otp.service.js`) and Joi schema validation",
      "WAF secret header guard (`x-waf-secret`) and Winston structured audit logging"
    ],
    devopsPipeline: ["GitHub Fork (aazhi)", "Docker Compose Microservices / Monolith", "Capacitor Android Kiosk Build", "k6 + Prometheus/Grafana Stress Suite"],
    technologies: ["React", "TypeScript", "Node.js / Express", "PostgreSQL", "Redis", "FastAPI", "Scikit-learn", "Socket.IO", "Razorpay", "Docker"],
    keyFeatures: [
      "Multilingual citizen kiosk UI (11+ Indian languages) with Aria Voice Assistant speech-to-text & TTS navigation.",
      "Integrated utility bill payments (electricity, water, gas, property tax) via Razorpay with PDFKit downloadable receipts.",
      "Dynamic civic grievance & service request portals with SLA countdown timers, escalation cron, and QR mobile tracking.",
      "Local FastAPI Scikit-learn engine for spam screening, department routing, TF-IDF duplicate detection, and forecasting.",
      "Tamper-evident SHA-256 HMAC audit chain, Redis/BullMQ notification queues, and Capacitor Android kiosk packaging."
    ],
    accessibilityMeasures: [
      "Voice-guided navigation and text-to-speech prompts (`VoiceAssistantContext`, `speak.ts`) for low-literacy and elderly users.",
      "Portrait kiosk orientation support (`OrientationContext`) and multilingual `i18next` localization across 11+ languages."
    ],
    performanceMetrics: [
      "Includes a dedicated `stress-testing/` k6 load-testing suite (10 concurrent user/DB/AI scenarios) wired to Prometheus and Grafana dashboards.",
      "Redis (`ioredis`) rate-limiting/BullMQ job queues with automatic graceful fallback if Redis is unreachable (`redisClient.js`)."
    ],
    lessonsLearned: [
      "In multilingual voice UIs, naive punctuation regexes break Indic scripts; Unicode-safe normalization and longest-phrase-first matching are essential.",
      "Clearly attributing team-authored backend/ML infrastructure alongside personal frontend/voice/integration commits keeps collaborative repositories transparent."
    ],
    innovation:
      "Unifies multilingual voice-guided utility billing (Razorpay + PDF receipts) and civic grievance routing with a SHA-256 tamper-evident audit chain and offline-capable FastAPI ML triage.",
    impact:
      "C-DAC SUVIDHA Innovation Challenge National Runner-up (Team Oceanberg); bridges regional language and accessibility gaps in public civic service delivery.",
    teamContribution: "Team Fork Contributor — Kiosk UI, Voice Modules, Billing/Admin Fixes & Integration",
    individualContributions: [
      "Contributed 78 commits on `KANISH-850/aazhi` (forked from `ajaiselvaraj/aazhi`), implementing and integrating `Voice Module` / Aria voice navigation, keypad validation fixes, and `Print Form` / `Admin Page` views.",
      "Built and fixed Gas utility billing flows, SLA countdown & Admin alert sections, History services, and ML/Emergency UI module wiring.",
      "Fixed QR mobile tracking URLs (`VITE_APP_URL`) and Vercel SPA routing for live kiosk handoffs."
    ],
    engineeringDecisions: [
      {
        decision: "Dual-mode Express monolith + optional containerized microservices gateway",
        rationale: "Allows rapid hackathon single-process demos while preserving clean domain boundaries (auth, gas, electricity, municipal services) in Docker.",
        tradeoff: "Maintaining both monolith routes and microservice proxies increases structural duplication across the repo.",
        status: "Implemented"
      },
      {
        decision: "Local Scikit-learn FastAPI microservice (`ai-service`) with keyword fallback",
        rationale: "Keeps spam screening, duplicate detection, and department routing fast and offline-capable without blocking on external LLM APIs.",
        tradeoff: "Custom-trained `.pkl` classifiers rely on hackathon-curated training datasets rather than municipal historical archives.",
        status: "Implemented"
      },
      {
        decision: "Graceful Redis / BullMQ fallback in `redisClient.js`",
        rationale: "Prevents local/demo kiosk servers from crashing after 3 failed Redis connection attempts when Redis is disabled or offline.",
        tradeoff: "Disables distributed BullMQ queues and Socket.IO Redis adapter scaling in fallback mode.",
        status: "Implemented"
      }
    ],
    scalability:
      "Supports PostgreSQL (`pg` / Supabase), `ioredis` + `BullMQ` background queues, `@socket.io/redis-adapter`, Docker Compose microservices, and k6 stress-test scenarios.",
    media: [
      {
        title: "AAZHI Multilingual Citizen Kiosk & Voice Interface",
        caption: "UI slot for 11-language utility billing, grievance intake, and Aria voice command routing (`Frontend/user`).",
        alt: "AAZHI Kiosk citizen interface screenshot",
        type: "screenshot"
      },
      {
        title: "Admin Analytics, SLA Alerts & AI Triage Console",
        caption: "Admin portal slot (`Frontend/admin`) displaying Recharts analytics, Leaflet complaint maps, and SLA alerts (screenshots not committed in repo).",
        alt: "AAZHI Admin analytics dashboard preview",
        type: "dashboard"
      }
    ],
    futureImprovements: [
      "Consolidate monolith and `microservices/` folders under one unified workspace test pipeline in GitHub Actions.",
      "Publish executed k6 HTML/JSON benchmark reports and held-out `ai-service` precision/recall tables in `README.md`.",
      "Replace debug/mock login helpers (`aazhi` demo endpoints) strictly behind explicit development-only environment flags."
    ],
    workflowSteps: [
      {
        step: "01",
        title: "Multilingual & Aria Voice Kiosk Intake",
        whatHappens: "Citizen picks one of 11+ Indian languages and navigates utility bill payment or grievance filing via touch or Aria speech commands.",
        component: "Frontend/user (React 19 + i18next + VoiceCommandRouter)",
        input: "Touch selection or spoken regional/English command",
        output: "Routed billing or grievance workflow form"
      },
      {
        step: "02",
        title: "WAF Screening & FastAPI ML Triage",
        whatHappens: "Express SecurityEngine validates payloads and forwards grievance text to FastAPI (`ai-service`) for LinearSVC spam checks, TF-IDF duplicate detection, and department routing.",
        component: "Express Gateway + FastAPI AI Microservice",
        input: "Validated complaint payload",
        output: "Spam flag, duplicate score, department & priority"
      },
      {
        step: "03",
        title: "Billing, PostgreSQL Persistence & Audit Chain",
        whatHappens: "Processes Razorpay utility transactions or stores complaints in PostgreSQL (`pg`) while appending SHA-256 HMAC-linked rows to the tamper-evident audit log and BullMQ queues.",
        component: "PostgreSQL (`pg`) + Redis/BullMQ + AuditLogger",
        input: "Payment or routed service request",
        output: "ACID record + cryptographic audit hash + PDF receipt"
      },
      {
        step: "04",
        title: "QR Tracking & Admin SLA Console",
        whatHappens: "Citizens scan a generated QR receipt URL (`VITE_APP_URL`) synced via Socket.IO while municipal admins monitor Leaflet maps, SLA countdowns, and alerts.",
        component: "Socket.IO + Frontend/admin (React 18 + Leaflet)",
        input: "Tracked ticket ID & SLA state",
        output: "Real-time citizen status & admin escalation view"
      }
    ],
    groupedTechStack: [
      {
        category: "Frontend",
        items: [
          { name: "React 19 / React 18 + TypeScript + Vite", role: "Citizen kiosk SPA (`Frontend/user`), Aria Voice UI, and Admin GIS/Recharts portal (`Frontend/admin`)", why: "Responsive touch kiosk states with i18next localization across 11+ languages" }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js + Express + Socket.IO + Razorpay + PDFKit", role: "API monolith/gateway, WAF security middleware, utility billing, PDF receipts & QR live sync", why: "Unifies transactional civic services, payment webhooks, and real-time tracking" },
          { name: "Python + FastAPI + Scikit-learn", role: "Local ML service for spam/anomaly screening, TF-IDF duplicate matching, routing & forecasting", why: "Keeps NLP triage fast and functional offline without external LLM dependencies" }
        ]
      },
      {
        category: "Database",
        items: [
          { name: "PostgreSQL (`pg` / Supabase) + Redis (`ioredis` / `BullMQ`)", role: "Relational civic records, SHA-256 HMAC audit chain, notification queues & rate-limit cache", why: "Durable relational auditability paired with asynchronous queue processing" }
        ]
      },
      {
        category: "Infrastructure",
        items: [
          { name: "Docker + Capacitor + k6 / Prometheus / Grafana", role: "Microservice containers, Android kiosk packaging, and 10-scenario stress-testing suite", why: "Supports both standalone kiosk deployment and load-verified microservice scaling" }
        ]
      }
    ],
    aiMlDetails: [
      {
        modelName: "FastAPI Civic Intelligence Suite (LinearSVC, IsolationForest, TF-IDF, RandomForest)",
        problemSolved: "Automated spam/fraud filtering, duplicate complaint clustering, department routing, and workload forecasting.",
        inputs: "Cleaned complaint text descriptions, extracted keywords, and ward metadata.",
        preprocessing: "Text cleaning (`clean_text`), keyword extraction, and TF-IDF vectorization.",
        approach: "Local serialized Scikit-learn models (`custom_spam_classifier.pkl`, `department_router.pkl`) with deterministic keyword fallbacks.",
        output: "Spam boolean, cosine duplicate percentage, routed department, urgency/sentiment, and SLA forecast.",
        evaluation: "Documented in `PROJECT_AI_AUDIT_REPORT.md` and `ai-service/README.md`; trained on project-curated civic text datasets rather than live municipal archives.",
        limitations: "Static `.pkl` models require retraining on real municipal ticket distributions; committed stress-test reports are not pre-populated in `README.md`."
      }
    ],
    databaseAndDataFlow: {
      sources: "Citizen utility account lookups, Razorpay payment callbacks, multilingual complaints, and Aria voice transcripts.",
      storageModel: "PostgreSQL (`pg` pool / Supabase) storing citizens, utility accounts, complaints, service requests, workflows, and SHA-256 HMAC-chained audit logs, plus Redis (`ioredis`) queues.",
      processing: "SecurityEngine WAF -> FastAPI ML triage -> transactional PostgreSQL persistence -> BullMQ/Twilio/SendGrid notification sweep.",
      apiCommunication: "REST `/api/*` endpoints + Socket.IO real-time events for QR mobile tracking.",
      retrieval: "Citizens track requests via QR/receipt IDs; admins inspect Leaflet heatmaps, SLA countdowns, and alerts.",
      schemaNote: "Verified directly from `KANISH-850/aazhi` `PROJECT_DOCUMENTATION.md`, `backend/schema.js`, `backend/config/redisClient.js`, and `backend/package.json` (uses `pg`, not Prisma)."
    },
    contributionBreakdown: {
      mine: [
        "78 commits on `KANISH-850/aazhi` (forked from `ajaiselvaraj/aazhi`): built/integrated Aria Voice Assistant (`Voice Module`, `Voice--Modules`), keypad validation, print forms, and admin/alert views.",
        "Implemented Gas utility consumer fixes, SLA countdown UI, history services, ML/Emergency UI wiring, and QR/Vercel SPA routing fixes (`VITE_APP_URL`)."
      ],
      team: [
        "Collaborators `ajaiselvaraj` (223 commits), `LakshanyaaJ` (15), and `Prem-333` (13) authored the upstream Express monolith/microservices gateway, PostgreSQL/Supabase schemas, SHA-256 audit chain, Redis/BullMQ queue infrastructure, FastAPI ML models, and k6 stress-test suite."
      ],
      thirdParty: [
        "Open-source & SDK stack: React, Vite, i18next, Express, pg, ioredis, BullMQ, Socket.IO, FastAPI, Scikit-learn, Razorpay, PDFKit, Capacitor, k6."
      ]
    },
    limitations: [
      "Forked collaborative team repository (`ajaiselvaraj/aazhi` upstream); backend microservice infrastructure, `pg` schemas, and ML model training were primarily authored by teammates while Kanish led kiosk frontend, voice, billing/admin, and integration modules.",
      "Pre-executed k6 stress-test HTML/JSON summaries and live municipal deployment metrics are not committed to the public repo."
    ],
    verificationChecklist: [
      { claim: "C-DAC SUVIDHA Innovation Challenge National Runner-up (Team Oceanberg)", status: "Verified result" },
      { claim: "React 19/18 kiosk & admin portals, Express (pg + ioredis/BullMQ + Socket.IO), Razorpay & FastAPI ML service in KANISH-850/aazhi", status: "Verified implementation" },
      { claim: "Kanish's 78 fork commits: Voice Module, Gas/Print/Admin/Alert/SLA UI & QR tracking fixes", status: "Verified implementation" },
      { claim: "Interactive 3D Smart Kiosk Workflow + Receipt Animation on portfolio", status: "Simulated demonstration" },
      { claim: "Unified CI pipeline & executed k6 benchmark report artifacts", status: "Proposed future improvement" }
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
  projectsData["techspire"],
  projectsData["intelligent-grievance-system"],
  projectsData["aquaguard-ai"],
  projectsData["webscraper"],
  projectsData["vikshana"]
];
