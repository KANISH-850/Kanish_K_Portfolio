import { ShieldCheck } from "lucide-react";

export function SecurityShowcase({ features }: { features: string[] }) {
  if (!features || features.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 border-b border-border/50 pb-2">Security Architecture</h2>
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 shadow-sm">
        <ul className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-foreground/90 font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
