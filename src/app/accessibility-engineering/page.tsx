import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Accessibility, Ear, Keyboard, Eye, MonitorSmartphone } from "lucide-react";
import MotionWrap from "@/components/motion-wrap";

const features = [
  { icon: Ear, title: "Screen Reader Support", desc: "100% ARIA labeled with semantic HTML5 for JAWS and NVDA." },
  { icon: ShieldCheck, title: "Senior Citizen Mode", desc: "Progressive disclosure with reduced cognitive load and larger targets." },
  { icon: Keyboard, title: "Keyboard Navigation", desc: "Full tab-indexing with visible focus states and skip-to-content links." },
  { icon: Eye, title: "High Contrast Mode", desc: "WCAG AAA compliant contrast ratios for visually impaired users." },
  { icon: MonitorSmartphone, title: "Voice Navigation", desc: "Native voice commands for form filling and navigation." }
];

export default function AccessibilityEngineeringPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>

          <header className="mb-16 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
              Specialized Domain
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Accessibility <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Engineering</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Building inclusive digital infrastructure that leaves no citizen behind.
            </p>
          </header>

          <div className="space-y-16">
            
            {/* Philosophy */}
            <section className="bg-card p-8 rounded-2xl border border-white/5 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Accessibility className="text-blue-500" /> Engineering Philosophy
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                True accessibility is not a post-development checklist—it is a core architectural requirement. When designing the Aazhi platform for millions of diverse citizens, I engineered the system from the ground up to support cognitive, motor, and visual disabilities natively.
              </p>
            </section>

            {/* Core Features */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Implemented Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-card border border-white/5 rounded-xl shadow-sm hover:border-blue-500/30 transition-all">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Multilingual Support */}
            <section className="bg-gradient-to-br from-card to-blue-900/10 p-8 rounded-2xl border border-white/5">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Language Inclusion (IndicTrans2)</h2>
              <p className="text-foreground/80 mb-6">
                Digital barriers aren't just physical. By integrating state-of-the-art transformer models, the system natively supports seamless translation between Tamil and English, ensuring rural citizens can engage with the government in their mother tongue.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg border border-border">
                  <CheckCircle2 className="text-emerald-500 w-4 h-4" /> Tamil (Native)
                </div>
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg border border-border">
                  <CheckCircle2 className="text-emerald-500 w-4 h-4" /> English (Admin)
                </div>
              </div>
            </section>

            {/* Testing Process */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Testing & Validation Process</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card border-l-4 border-l-blue-500">
                  <h4 className="font-bold">1. Automated Auditing</h4>
                  <p className="text-sm text-muted-foreground">Continuous integration with Axe-core and Lighthouse CI to catch ARIA issues pre-deployment.</p>
                </div>
                <div className="p-4 rounded-lg bg-card border-l-4 border-l-purple-500">
                  <h4 className="font-bold">2. Screen Reader Testing</h4>
                  <p className="text-sm text-muted-foreground">Manual flow validation using NVDA (Windows) and VoiceOver (macOS/iOS) for all interactive components.</p>
                </div>
                <div className="p-4 rounded-lg bg-card border-l-4 border-l-emerald-500">
                  <h4 className="font-bold">3. Cognitive Load Analysis</h4>
                  <p className="text-sm text-muted-foreground">Iterative testing of the 'Senior Mode' to ensure workflows do not exceed 3 choices per screen.</p>
                </div>
              </div>
            </section>

          </div>
        </MotionWrap>
      </div>
    </div>
  );
}
