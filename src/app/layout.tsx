import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/footer';
import { ScriptProps } from 'next/script';
import { DevToolsBlocker } from '@/components/devtools-blocker';
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingCTA } from "@/components/floating-cta";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://KANISH-850.github.io/Kanish_K_Portfolio"),
  title: {
    default: "Kanish K | AI Engineer & Systems Architect",
    template: "%s | Kanish K",
  },
  description:
    "Production AI Engineer specializing in Machine Learning, Deep Learning, Generative AI, NLP, and Full-Stack Systems. Smart India Hackathon Winner and CDAC Runner-up.",
  authors: [{ name: "Kanish K", url: "https://github.com/KANISH-850" }],
  creator: "Kanish K",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://KANISH-850.github.io/Kanish_K_Portfolio/",
    title: "Kanish K | AI Engineer & Systems Architect",
    description:
      "Production AI Engineer specializing in Machine Learning, Deep Learning, Generative AI, NLP, and Full-Stack Systems.",
    siteName: "Kanish K Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanish K | AI Engineer & Systems Architect",
    description:
      "Production AI Engineer specializing in Machine Learning, Deep Learning, Generative AI, NLP, and Full-Stack Systems.",
  },
  icons: {
    icon: `${basePath}/favicon.ico`,
  },
  alternates: {
    canonical: "https://KANISH-850.github.io/Kanish_K_Portfolio/",
  },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <ScrollToTopScript id="scroll-to-top" />
      </head>
      <body className={`${inter.className} font-body antialiased bg-background text-foreground selection:bg-accent/30`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <DevToolsBlocker />
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
