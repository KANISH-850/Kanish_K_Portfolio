export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  currentLearning: string[];
  projects: string[];
  futureGoals: string[];
  researchDirection: string;
}

export const researchData: ResearchArea[] = [
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    description: "Exploring foundational and advanced machine learning techniques to solve real-world problems.",
    currentLearning: [
      "Advanced model quantization techniques",
      "Federated learning for privacy-preserving AI",
      "Reinforcement learning for dynamic systems"
    ],
    projects: ["aazhi-suvidhaa", "digital-twin-ehv"],
    futureGoals: [
      "Publish a paper on low-latency inference",
      "Contribute to open-source ML frameworks"
    ],
    researchDirection: "Focusing on edge AI and deploying robust models on resource-constrained devices."
  },
  {
    id: "generative-ai",
    title: "Generative AI & NLP",
    description: "Building systems that understand and generate human-like text and media.",
    currentLearning: [
      "Retrieval-Augmented Generation (RAG) architectures",
      "Agentic workflows with LLMs",
      "Multilingual transformer models"
    ],
    projects: ["aazhi-suvidhaa"],
    futureGoals: [
      "Build a multi-agent system for complex task delegation",
      "Improve hallucination detection in RAG pipelines"
    ],
    researchDirection: "Developing highly reliable, deterministic outputs from probabilistic generative models."
  },
  {
    id: "accessibility",
    title: "Accessibility Engineering",
    description: "Designing digital experiences that are inclusive and usable by everyone.",
    currentLearning: [
      "Advanced ARIA state management",
      "Voice-first interface design",
      "Cognitive load reduction in complex UIs"
    ],
    projects: ["aazhi-suvidhaa"],
    futureGoals: [
      "Develop automated accessibility testing tools",
      "Establish a firm set of 'Senior-First' design principles"
    ],
    researchDirection: "Bridging the gap between AI automation and highly accessible, human-centric interfaces."
  }
];
