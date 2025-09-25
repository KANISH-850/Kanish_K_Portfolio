import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/footer';
import { ScriptProps } from 'next/script';
import { DevToolsBlocker } from '@/components/devtools-blocker';

export const metadata: Metadata = {
  title: 'KanishK.ai | AI Engineer Portfolio',
  description: 'Personal portfolio of Kanish K, an AI Engineer and student at Bannari Amman Institute of Technology, showcasing projects in Machine Learning, NLP, and AI Automation.',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <ScrollToTopScript id="scroll-to-top" />
      </head>
      <body 
        className="font-body antialiased bg-background selection:bg-accent/30"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/noisy.png')" }}
      >
        <DevToolsBlocker />
        <div className="flex flex-col min-h-dvh">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
