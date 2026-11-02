import MotionWrap from "./motion-wrap";
import { GraduationCap, Award, BookOpen, CheckCircle2 } from "lucide-react";

interface CertificationItem {
  id: string;
  title: string;
  issuerOrFocus: string;
  type: "academic" | "certification";
  highlights: string[];
}

const credentials: CertificationItem[] = [
  {
    id: "degree-be-cse",
    title: "B.E. Computer Science and Engineering",
    issuerOrFocus: "Bannari Amman Institute of Technology (BITSathy)",
    type: "academic",
    highlights: [
      "Rigorous foundations in Machine Learning, Deep Neural Networks, and Distributed Systems",
      "Hands-on research in real-time SCADA digital twins and accessible public-sector platforms",
      "Lead developer for national hackathon-winning architectures (SIH & CDAC)"
    ]
  },
  {
    id: "cert-deep-learning",
    title: "Deep Learning & Transformer Architectures",
    issuerOrFocus: "Specialized Machine Learning Curriculum",
    type: "certification",
    highlights: [
      "Trained autoencoders, CNNs, and recurrent models with PyTorch and TensorFlow",
      "Quantization, pruning, and ONNX Runtime inference optimization on resource-constrained devices",
      "Fine-tuned multilingual models including IndicTrans2 and BERT embeddings"
    ]
  },
  {
    id: "cert-cloud-systems",
    title: "Cloud Infrastructure & Distributed Systems",
    issuerOrFocus: "Systems Engineering & Telemetry",
    type: "certification",
    highlights: [
      "Microservice deployment using FastAPI, Node.js, and Docker containerization",
      "Time-series data architecture with InfluxDB, WebSockets, and Redis caching",
      "Relational schema modeling and query optimization with PostgreSQL and Prisma"
    ]
  }
];

export function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-28 bg-card/20 border-y border-border/50" aria-label="Education and Certifications">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <MotionWrap>
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase border border-primary/20">
              Academic Foundation & Credentials
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">
              Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">Certifications</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Formal computer science foundations combined with continuous applied learning across modern machine learning and distributed systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                className="bg-card border border-white/5 rounded-2xl p-6 shadow-sm hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      {cred.type === "academic" ? (
                        <GraduationCap className="w-5 h-5" />
                      ) : (
                        <Award className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground bg-muted/40 px-2.5 py-0.5 rounded">
                      {cred.type === "academic" ? "Academic Degree" : "Applied Specialization"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground leading-snug">
                      {cred.title}
                    </h3>
                    <p className="text-xs font-mono text-accent mt-1">
                      {cred.issuerOrFocus}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-border/40">
                    {cred.highlights.map((item, idx) => (
                      <li key={`${cred.id}-h-${idx}`} className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-border/30 text-[11px] font-mono text-muted-foreground">
                  <span>Verified Academic Record</span>
                </div>
              </div>
            ))}
          </div>
        </MotionWrap>
      </div>
    </section>
  );
}
