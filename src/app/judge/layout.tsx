import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hackathon Judge Evaluation",
  description:
    "Structured 3-minute technical evaluation breakdown of Kanish K's flagship AI systems, problem statements, security models, and benchmarks.",
  alternates: {
    canonical: "https://KANISH-850.github.io/Kanish_K_Portfolio/judge/",
  },
  openGraph: {
    title: "Judge Evaluation Mode | Kanish K",
    description:
      "Rapid technical assessment view for Kanish K's Smart India Hackathon and C-DAC architectures.",
    url: "https://KANISH-850.github.io/Kanish_K_Portfolio/judge/",
    images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Judge Evaluation Mode | Kanish K",
    description:
      "Rapid technical assessment view for Kanish K's Smart India Hackathon and C-DAC architectures.",
    images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
  },
};

export default function JudgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

