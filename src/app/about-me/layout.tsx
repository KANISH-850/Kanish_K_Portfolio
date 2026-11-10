import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Engineering Philosophy",
  description:
    "Engineering philosophy, machine learning principles, and academic background of Kanish K at Bannari Amman Institute of Technology.",
  alternates: {
    canonical: "https://KANISH-850.github.io/Kanish_K_Portfolio/about-me/",
  },
  openGraph: {
    title: "About & Engineering Philosophy | Kanish K",
    description:
      "Engineering philosophy, machine learning principles, and academic background of Kanish K at Bannari Amman Institute of Technology.",
    url: "https://KANISH-850.github.io/Kanish_K_Portfolio/about-me/",
    images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
  },
};

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

