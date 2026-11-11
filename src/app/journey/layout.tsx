import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Journey & Milestones",
  description:
    "Chronological AI/ML engineering timeline and verified hackathon milestones of Kanish K.",
  alternates: {
    canonical: "https://KANISH-850.github.io/Kanish_K_Portfolio/journey/",
  },
  openGraph: {
    title: "Engineering Journey & Milestones | Kanish K",
    description:
      "Chronological AI/ML engineering timeline and verified hackathon milestones of Kanish K.",
    url: "https://KANISH-850.github.io/Kanish_K_Portfolio/journey/",
    images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Journey & Milestones | Kanish K",
    description:
      "Chronological AI/ML engineering timeline and verified hackathon milestones of Kanish K.",
    images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
  },
};

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

