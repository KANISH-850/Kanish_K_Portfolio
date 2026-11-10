"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, Layers, ZoomIn, ZoomOut } from "lucide-react";

export type ComponentVerificationStatus = "implemented" | "simulated" | "proposed";

export interface ArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  layer: "Ingestion & Input" | "Processing & AI Core" | "Storage & Delivery";
  status: ComponentVerificationStatus;
}

const STATUS_STYLES: Record<
  ComponentVerificationStatus,
  { badge: string; border: string; dot: string; label: string }
> = {
  implemented: {
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
    label: "Implemented",
  },
  simulated: {
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    border: "border-cyan-500/30",
    dot: "bg-cyan-400",
    label: "Simulated / Synthetic",
  },
  proposed: {
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    border: "border-purple-500/30",
    dot: "bg-purple-400",
    label: "Proposed / Planned",
  },
};

const LAYERS: ArchitectureNode["layer"][] = [
  "Ingestion & Input",
  "Processing & AI Core",
  "Storage & Delivery",
];

export function ArchitectureDiagram({
  title,
  nodes,
}: {
  title: string;
  nodes?: ArchitectureNode[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(nodes?.[0]?.id ?? null);
  const [statusFilter, setStatusFilter] = useState<ComponentVerificationStatus | "all">("all");
  const [zoomed, setZoomed] = useState(false);

  if (!nodes || nodes.length === 0) return null;

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? nodes[0];

  return (
    <div className="bg-card p-5 sm:p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Component Architecture &amp; Verification Status
          </h3>
          <p className="text-xs text-muted-foreground">
            {title} — click any component node to inspect its role and verification scope.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Interactive Status Filter & Legend */}
          <div
            role="group"
            aria-label="Filter architecture components by status"
            className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono"
          >
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-2.5 py-1 rounded-full border transition-colors ${
                statusFilter === "all"
                  ? "bg-primary/15 text-primary border-primary/40"
                  : "bg-card/60 text-muted-foreground border-white/10 hover:text-foreground"
              }`}
            >
              All ({nodes.length})
            </button>
            {(Object.keys(STATUS_STYLES) as ComponentVerificationStatus[]).map((status) => {
              const count = nodes.filter((n) => n.status === status).length;
              if (count === 0) return null;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status === statusFilter ? "all" : status)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors ${
                    statusFilter === status
                      ? STATUS_STYLES[status].badge + " ring-1 ring-white/20"
                      : "bg-card/60 text-muted-foreground border-white/10 hover:text-foreground"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${STATUS_STYLES[status].dot}`} aria-hidden="true" />
                  {STATUS_STYLES[status].label} ({count})
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-slate-900/70 text-[11px] font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
            aria-pressed={zoomed}
          >
            {zoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            {zoomed ? "Compact" : "Expand"}
          </button>
        </div>
      </div>

      {/* 3-Stage Responsive Architecture Grid */}
      <div className={`grid gap-4 items-stretch ${zoomed ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"}`}>
        {LAYERS.map((layerName, layerIdx) => {
          const layerNodes = nodes.filter(
            (n) => n.layer === layerName && (statusFilter === "all" || n.status === statusFilter)
          );
          return (
            <div key={layerName} className={`flex ${zoomed ? "flex-col" : "flex-col lg:flex-row"} items-stretch gap-3`}>
              <div className="flex-1 rounded-xl bg-slate-950/60 border border-white/[0.08] p-4 flex flex-col space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold border-b border-white/[0.06] pb-2">
                  {`0${layerIdx + 1} // ${layerName}`}
                </div>

                <div className="space-y-2.5 flex-1">
                  {layerNodes.length === 0 ? (
                    <div className="text-xs text-muted-foreground/70 py-4 text-center font-mono">
                      No nodes match filter
                    </div>
                  ) : (
                    layerNodes.map((node) => {
                      const style = STATUS_STYLES[node.status];
                      const isSelected = selectedNode?.id === node.id;
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => setSelectedId(node.id)}
                          aria-pressed={isSelected}
                          className={`w-full text-left p-3 rounded-lg bg-card/80 border transition-all space-y-1.5 cursor-pointer ${
                            style.border
                          } ${isSelected ? "ring-2 ring-cyan-400/50 bg-slate-900/90" : "hover:bg-slate-900/60"}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                              {node.title}
                            </span>
                            <span
                              className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${style.badge}`}
                            >
                              {node.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            {node.subtitle}
                          </p>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {layerIdx < LAYERS.length - 1 && (
                <div className="flex items-center justify-center text-muted-foreground/60 py-1 lg:py-0">
                  <ArrowDown className={`w-4 h-4 ${zoomed ? "" : "lg:hidden"}`} aria-hidden="true" />
                  {!zoomed && <ArrowRight className="w-4 h-4 hidden lg:block" aria-hidden="true" />}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Component Readout */}
      {selectedNode && (
        <div className="rounded-xl bg-slate-950/70 border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
              Selected Component // {selectedNode.layer}
            </div>
            <div className="text-sm font-semibold text-white">{selectedNode.title}</div>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedNode.subtitle}</p>
          </div>
          <span
            className={`text-[11px] font-mono px-3 py-1 rounded-full border self-start sm:self-center shrink-0 ${
              STATUS_STYLES[selectedNode.status].badge
            }`}
          >
            {STATUS_STYLES[selectedNode.status].label}
          </span>
        </div>
      )}
    </div>
  );
}
