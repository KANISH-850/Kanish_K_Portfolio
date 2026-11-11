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
    title: "Building Predictive Fault Diagnostics for EHV Substations",
    publishedAt: "2026-10-18",
    readingTime: "4 min read",
    category: "Digital Twins & Telemetry",
    summary:
      "Architectural notes from Team Oceanberg's Smart India Hackathon winning EHV substation monitoring framework: combining per-asset ensemble detectors, CNN-LSTM fault training, and interactive 3D telemetry playback.",
    relatedProjectSlug: "digital-twin-ehv",
    relatedProjectTitle: "Digital Twin of EHV Substation Monitoring",
    sections: [
      {
        heading: "Combining Asset-Level Ensembles with Anomaly Bounds",
        paragraphs: [
          "Extra High Voltage (EHV) substations monitor heterogeneous assets—power transformers, busbars, instrument transformers, isolators, and circuit breakers—where electrical thermal faults differ across components.",
          "In oceanBerg_sih, component modules pair RandomForest regressors/classifiers with Isolation Forest outlier scoring across simulated SCADA CSV tables (such as 5,000-row training and 6,000-row output logs), alongside a Streamlit trainer for CNN-LSTM waveform fault classification."
        ]
      },
      {
        heading: "Separating Telemetry State from Interactive Visualization",
        paragraphs: [
          "Keeping signal scoring isolated from the interactive Three.js 400kV substation canvas prevents slowdowns while allowing operators and reviewers to inspect fault simulations cleanly per equipment bay."
        ]
      },
      {
        heading: "Distinguishing Hackathon Prototypes from Utility Deployment",
        paragraphs: [
          "Simulated SCADA tables validate classification pipelines safely during competitions. Moving toward live utility environments requires strict network isolation, mutual TLS transport, and historical PMU/SCADA calibration—documented explicitly as proposed future deployment requirements."
        ]
      }
    ]
  },
  {
    slug: "multilingual-nlp-indictrans2-bert",
    title: "Honest Evaluation in Multilingual Civic Triage & Vision Models",
    publishedAt: "2026-10-24",
    readingTime: "4 min read",
    category: "NLP & GenAI",
    summary:
      "Why pairing lightweight TF-IDF routing and MyMemory/LibreTranslate caching with calibrated confidence thresholds and honest held-out vision test metrics beats overclaimed prototype numbers.",
    relatedProjectSlug: "intelligent-grievance-system",
    relatedProjectTitle: "Intelligent Multilingual Grievance Categorization & Dispatch",
    sections: [
      {
        heading: "Deterministic Text Routing + LRU-Cached Translation",
        paragraphs: [
          "Citizen portals accepting regional Indian languages need resilient translation fallbacks rather than fragile heavy pipelines. Pairing LibreTranslate / MyMemory translation with an in-memory LRU cache and TF-IDF n-gram LogisticRegression keeps routing fast across 9 civic departments while surfacing explainable top keyword weights."
        ]
      },
      {
        heading: "Reporting Real Held-Out Vision Errors Instead of Hiding Them",
        paragraphs: [
          "In our PyTorch MobileNetV3-Small civic issue vision benchmark (172 train / 38 val / 38 test samples across 9 classes), held-out test accuracy measured 50.0% at 36.47 ms average CPU latency, with clear confusion between visually similar drainage and garbage scenes.",
          "Exposing calibrated confidence gates and human-in-the-loop officer review protects dispatch accuracy far better than trusting raw uncalibrated image labels."
        ]
      }
    ]
  },
  {
    slug: "comparing-ml-models-water-anomaly-detection",
    title: "Why Accuracy Misleads on Imbalanced Water Telemetry (Neeraran ML Audit)",
    publishedAt: "2026-11-02",
    readingTime: "5 min read",
    category: "Applied Machine Learning",
    summary:
      "Key findings from the Neeraran ML audit suite: why 99.55% accuracy on Isolation Forest hides a 0.1860 F1 score, and why One-Class SVM and XGBoost outperformed baselines across 46,656 test observations.",
    relatedProjectSlug: "aquaguard-ai",
    relatedProjectTitle: "AquaGuard AI (Neeraran)",
    sections: [
      {
        heading: "Why Raw Accuracy Fails on 0.22% Anomaly Partitions",
        paragraphs: [
          "When abnormal campus water consumption events represent only ~0.22% of 5-minute intervals (101 out of 46,656 test rows), predicting Normal everywhere scores 99.78% accuracy. Evaluating Isolation Forest at a calibrated threshold yielded 99.55% accuracy yet only 0.1860 F1 and a 76.2% false negative rate.",
          "Switching to RBF-kernel One-Class SVM lifted F1 to 0.7451 (73.8% precision, 75.2% recall) at 3.92 ms average latency, while tuned XGBoost achieved 100% leak recall and 97.4% leak precision at 2.29 ms average latency."
        ]
      },
      {
        heading: "Decoupling Sensor Health from Leak Alarms",
        paragraphs: [
          "Flatline dropouts and noisy pressure meters frequently mimic real ruptures in downstream models. Introducing an upstream Layer-1 sensor health verifier decoupled broken meters from physical leak dispatches cleanly."
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

