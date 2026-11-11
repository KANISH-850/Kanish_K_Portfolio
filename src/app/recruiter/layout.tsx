import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter 30-Second Briefing",
  description:
    "Quick recruiter overview for Kanish K — B.E. CSE (2028), Smart India Hackathon Winner, CDAC Runner-up, AI/ML & Python Systems Engineer.",
  alternates: {
    canonical: "https://KANISH-850.github.io/Kanish_K_Portfolio/recruiter/",
  },
  openGraph: {
    title: "Recruiter Briefing | Kanish K",
    description:
      "30-second technical hiring summary for Kanish K — AI Engineer, SIH Winner, and CDAC Runner-up.",
    url: "https://KANISH-850.github.io/Kanish_K_Portfolio/recruiter/",
    images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruiter Briefing | Kanish K",
    description:
      "30-second technical hiring summary for Kanish K — AI Engineer, SIH Winner, and CDAC Runner-up.",
    images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
  },
};

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  return children;
}

