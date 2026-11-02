import MotionWrap from "./motion-wrap";
import { CheckCircle2, Cpu, Database, Network, ShieldCheck } from "lucide-react";

export function About() {
  const corePrinciples = [
    {
      title: "End-to-End System Ownership",
      desc: "Bridging the gap between mathematical model training and production-ready full-stack software architectures."
    },
    {
      title: "Data Integrity & Real-World Telemetry",
      desc: "Engineering resilient ingestion pipelines capable of handling high-frequency SCADA streams and IoT sensors under real-world noise."
    },
    {
      title: "Architectural Accessibility & Inclusion",
      desc: "Designing inclusive digital platforms natively supporting multilingual translation, senior citizen modes, and full WCAG compliance."
    },
    {
      title: "Production Performance Rigor",
      desc: "Optimizing neural transformer inference via quantization, ONNX Runtime, and decoupled asynchronous microservice queues."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative" aria-label="About Me">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
                About Me & Core Engineering
              </div>

              <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
                Architecting at the Intersection of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">AI & Full-Stack Systems</span>
              </h2>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                I build intelligent applications by combining artificial intelligence, machine learning, and full-stack engineering to solve real-world problems. Rather than viewing machine learning models in isolation, I treat model architecture, API interfaces, data engineering, and frontend accessibility as a unified system.
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                My work spans designing national hackathon-winning digital twins for Extra High Voltage substations, architecting high-throughput multilingual grievance processing engines, and engineering multi-model water consumption forecasting platforms.
              </p>

              {/* Core Principles Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                {corePrinciples.map((item) => (
                  <div key={item.title} className="p-4 rounded-xl bg-card border border-white/5 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Technical Blueprint Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl transform rotate-2 scale-105 -z-10 blur-xl" />

              <div className="bg-card border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">system_manifest.py</span>
                </div>

                <pre className="text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed">
                  <code>
<span className="text-primary font-semibold">from</span> dataclasses <span className="text-primary font-semibold">import</span> dataclass<br/>
<span className="text-primary font-semibold">from</span> typing <span className="text-primary font-semibold">import</span> List<br/><br/>
@dataclass<br/>
<span className="text-primary">class</span> <span className="text-accent font-bold">AIEngineer</span>:<br/>
{"    "}name: str = <span className="text-emerald-400">&quot;Kanish K&quot;</span><br/>
{"    "}role: str = <span className="text-emerald-400">&quot;AI Engineer&quot;</span><br/>
{"    "}domains: List[str] = [<br/>
{"        "}<span className="text-emerald-400">&quot;Machine Learning&quot;</span>,<br/>
{"        "}<span className="text-emerald-400">&quot;Deep Learning&quot;</span>,<br/>
{"        "}<span className="text-emerald-400">&quot;Generative AI&quot;</span>,<br/>
{"        "}<span className="text-emerald-400">&quot;Natural Language Processing&quot;</span>,<br/>
{"        "}<span className="text-emerald-400">&quot;Full-Stack Systems&quot;</span><br/>
{"    "}]<br/>
{"    "}hardware_interface: str = <span className="text-emerald-400">&quot;SCADA / IoT Telemetry&quot;</span><br/>
{"    "}inference_runtime: str = <span className="text-emerald-400">&quot;FastAPI + ONNX Runtime&quot;</span><br/>
{"    "}database: str = <span className="text-emerald-400">&quot;PostgreSQL &amp; InfluxDB&quot;</span><br/><br/>
{"    "}<span className="text-primary">def</span> <span className="text-blue-400">deploy_solution</span>(self, problem):<br/>
{"        "}<span className="text-primary">return</span> {"{"}<br/>
{"            "}<span className="text-muted-foreground">&quot;architectural_rigor&quot;</span>: <span className="text-orange-400">True</span>,<br/>
{"            "}<span className="text-muted-foreground">&quot;reproducible_metrics&quot;</span>: <span className="text-orange-400">True</span>,<br/>
{"            "}<span className="text-muted-foreground">&quot;accessible_ux&quot;</span>: <span className="text-orange-400">True</span><br/>
{"        }"}
                  </code>
                </pre>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5 text-primary">
                    <Cpu className="w-3.5 h-3.5" /> High Performance
                  </span>
                  <span className="flex items-center gap-1.5 text-accent">
                    <Database className="w-3.5 h-3.5" /> Relational & Time-Series
                  </span>
                </div>
              </div>
            </div>

          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
