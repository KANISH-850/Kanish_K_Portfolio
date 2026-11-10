export interface EngineeringNote {
  slug: string;
  title: string;
  publishedAt: string;
  readingTime: string;
  category: "Digital Twins & Telemetry" | "NLP & GenAI" | "Applied Machine Learning" | "Systems Engineering";
  summary: string;
  relatedProjectSlug: string;
  relatedProjectTitle: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
}

export const engineeringNotes: EngineeringNote[] = [
  {
    slug: "building-digital-twin-ehv-substation",
    title: "Building a Digital Twin for EHV Substation Monitoring",
    publishedAt: "2026-10-18",
    readingTime: "4 min read",
    category: "Digital Twins & Telemetry",
    summary:
      "Architectural notes from designing Team Oceanberg's Smart India Hackathon winning EHV substation monitoring framework: decoupling telemetry ingestion from 3D asset rendering and using semi-supervised autoencoders for anomaly detection.",
    relatedProjectSlug: "digital-twin-ehv",
    relatedProjectTitle: "Digital Twin of EHV Substation Monitoring",
    sections: [
      {
        heading: "Why Semi-Supervised Autoencoders Fit Substation Telemetry",
        paragraphs: [
          "Extra High Voltage (EHV) transformers and breakers spend almost their entire lifecycle in nominal operating states. Severe thermal or SF6 pressure faults are rare, making balanced supervised datasets difficult to obtain.",
          "Instead of training a binary classifier on scarce failure labels, we trained a deep autoencoder on nominal operational envelopes (~50,000 synthetic and industry-informed SCADA records). Deviations exceeding 3.5 standard deviations in reconstruction error surface early anomalies before hard protective relay trips."
        ]
      },
      {
        heading: "Separating Telemetry Parsing from 3D Rendering",
        paragraphs: [
          "High-frequency telemetry updates can easily stall main-thread UI interactions when parsed inside React component trees. By isolating rolling-window normalization and FFT feature extraction in backend workers and keeping the Three.js render loop decoupled from state updates, the 3D substation viewport stays responsive during fault simulations."
        ]
      },
      {
        heading: "Distinguishing Prototype Simulation from Utility Deployment",
        paragraphs: [
          "In hackathon evaluation, synthetic and industry-informed SCADA records let us stress-test anomaly scoring pipelines safely. Moving to live utility substations requires strict network isolation, mutual TLS (mTLS) transport, and baseline recalibration against historical utility PMU data—requirements explicitly documented as architectural specifications rather than claimed field deployments."
        ]
      }
    ]
  },
  {
    slug: "multilingual-nlp-indictrans2-bert",
    title: "Designing Multilingual NLP Pipelines with IndicTrans2 and BERT",
    publishedAt: "2026-10-24",
    readingTime: "4 min read",
    category: "NLP & GenAI",
    summary:
      "How combining INT8 quantized IndicTrans2 neural translation, Sentence Transformers, BERT classification, and an 85% confidence fallback gate improves reliability in public-service grievance routing.",
    relatedProjectSlug: "intelligent-grievance-system",
    relatedProjectTitle: "Intelligent Multilingual Grievance Categorization & Dispatch",
    sections: [
      {
        heading: "Quantizing Neural Translation for Interactive Intake",
        paragraphs: [
          "Public grievance portals receive submissions across regional Indian languages. Running unquantized neural machine translation synchronously on every request created initial latencies above 2.5 seconds.",
          "Applying 8-bit dynamic quantization via ONNX Runtime brought translation response time under 500ms in local testing while preserving semantic fidelity for downstream classification."
        ]
      },
      {
        heading: "Why a Confidence Gate Matters More Than Raw Accuracy",
        paragraphs: [
          "Even a classifier scoring 92% accuracy on test categories will encounter noisy, dialect-heavy, or multi-department complaints. Automatically dispatching uncertain grievances causes silent operational delays.",
          "Adding an explicit 85% confidence threshold gate in the FastAPI router isolates ambiguous complaints into a human-in-the-loop supervisory queue before departmental dispatch."
        ]
      }
    ]
  },
  {
    slug: "comparing-ml-models-water-anomaly-detection",
    title: "Comparing Specialized ML Models for Water Telemetry Anomaly & Leak Detection",
    publishedAt: "2026-11-02",
    readingTime: "5 min read",
    category: "Applied Machine Learning",
    summary:
      "Why AquaGuard AI splits consumption anomaly detection (One-Class SVM), pipe leak identification (XGBoost), and 72-hour demand forecasting (CatBoost) into three specialized models instead of one monolithic network.",
    relatedProjectSlug: "aquaguard-ai",
    relatedProjectTitle: "AquaGuard AI (Neeraran)",
    sections: [
      {
        heading: "Matching the Model Family to the Telemetry Task",
        paragraphs: [
          "Water distribution telemetry blends three distinct mathematical problems: boundary outlier detection, supervised rupture classification, and multi-horizon diurnal demand forecasting.",
          "In AquaGuard AI's benchmark evaluation splits, One-Class SVM handled anomaly detection in 3.92 ms (99.89% accuracy, F1 0.7451), XGBoost achieved 100% leak recall at 1.14 ms latency (99.79% accuracy), and CatBoost delivered 72-hour rolling demand forecasts with an MAE of 70.91 L/h and 9.59% MAPE."
        ]
      },
      {
        heading: "Calibrating Metrics Against Test Partitions",
        paragraphs: [
          "High benchmark figures on structured test splits do not automatically guarantee identical field performance across unseen sensor hardware. Separating each model behind explicit evaluation boundaries keeps feature drift transparent and makes per-task recalibration straightforward for campus facilities teams."
        ]
      }
    ]
  },
  {
    slug: "lessons-from-national-hackathons",
    title: "Engineering Lessons from National Hackathons (SIH & C-DAC)",
    publishedAt: "2026-11-06",
    readingTime: "3 min read",
    category: "Systems Engineering",
    summary:
      "Practical engineering takeaways from building and presenting EHV Digital Twin (SIH Winner) and AAZHI Kiosk Management System (C-DAC Runner-up): accessibility, offline tolerance, and honest architectural scoping.",
    relatedProjectSlug: "kiosk-management-system",
    relatedProjectTitle: "Kiosk Management System",
    sections: [
      {
        heading: "Accessibility Belongs in the Architecture, Not Just CSS",
        paragraphs: [
          "Across both the C-DAC SUVIDHA kiosk platform and civic grievance workflows, elderly and non-technical users needed enlarged touch targets, high-contrast palettes, and voice-guided interactions from day one. Treating accessibility as a core requirement improved overall system clarity for operators as well."
        ]
      },
      {
        heading: "Design for Intermittent Networks and Zero-Trust Edges",
        paragraphs: [
          "Public kiosks and industrial substations rarely enjoy uninterrupted data-center connectivity. Architecting local checkpoint buffering and outbound-only reverse telemetry channels early forces clear separation between edge resilience specifications and cloud control planes."
        ]
      }
    ]
  }
];

export const notesBySlug: Record<string, EngineeringNote> = Object.fromEntries(
  engineeringNotes.map((note) => [note.slug, note])
);

