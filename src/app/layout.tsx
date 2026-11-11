import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/footer';
import { ScriptProps } from 'next/script';
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingCTA } from "@/components/floating-cta";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://KANISH-850.github.io/Kanish_K_Portfolio"),
  title: {
    default: "Kanish K | AI Engineer — Applied ML & Backend Systems",
    template: "%s | Kanish K",
  },
  description:
    "Portfolio of Kanish K (B.E. CSE '28, BITSathy): AI Engineer & Full-Stack Developer building ML pipelines, FastAPI microservices, PyTorch/TensorFlow models, and RAG systems. SIH '25 Winner & C-DAC Runner-up.",
  authors: [{ name: "Kanish K", url: "https://github.com/KANISH-850" }],
  creator: "Kanish K",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://KANISH-850.github.io/Kanish_K_Portfolio/",
    title: "Kanish K | AI Engineer — Applied ML & Backend Systems",
    description:
      "AI Engineer & Full-Stack Developer building ML pipelines, FastAPI microservices, PyTorch/TensorFlow models, and RAG systems. SIH '25 Winner & C-DAC Runner-up.",
    siteName: "Kanish K Portfolio",
    images: [
      {
        url: "https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kanish K | AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanish K | AI Engineer — Applied ML & Backend Systems",
    description:
      "AI Engineer & Full-Stack Developer building ML pipelines, FastAPI microservices, PyTorch/TensorFlow models, and RAG systems.",
    images: ["https://KANISH-850.github.io/Kanish_K_Portfolio/og-image.png"],
  },
  icons: {
    icon: `${basePath}/favicon.ico`,
  },
  alternates: {
    canonical: "https://KANISH-850.github.io/Kanish_K_Portfolio/",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kanish K",
  jobTitle: "AI Engineer",
  url: "https://KANISH-850.github.io/Kanish_K_Portfolio/",
  email: "mailto:kanishkgins@gmail.com",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bannari Amman Institute of Technology",
  },
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "Natural Language Processing",
    "Python",
    "Data Structures and Algorithms",
  ],
  sameAs: [
    "https://github.com/KANISH-850",
    "https://www.linkedin.com/in/kanish-k-558694251/",
    "https://www.kaggle.com/kanishk2004",
    "https://leetcode.com/u/Kanish_k_2004/",
  ],
};

function ScrollToTopScript(props: ScriptProps) {
  return (
    <script
      {...props}
      dangerouslySetInnerHTML={{
        __html: `
          history.scrollRestoration = "manual";
          window.onbeforeunload = function () {
            window.scrollTo(0, 0);
          };
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ScrollToTopScript id="scroll-to-top" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-accent/30">
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-dvh">
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <FloatingCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}
