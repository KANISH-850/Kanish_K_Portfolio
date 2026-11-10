"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ImageIcon, MonitorPlay, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const DigitalTwin3DScene = dynamic(
  () => import("./digital-twin-3d-scene").then((mod) => mod.DigitalTwin3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] md:h-[480px] rounded-2xl bg-slate-950/60 border border-cyan-500/20 animate-pulse" />
    ),
  }
);

const Kiosk3DScene = dynamic(
  () => import("./kiosk-3d-scene").then((mod) => mod.Kiosk3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] md:h-[480px] rounded-2xl bg-slate-950/60 border border-purple-500/20 animate-pulse" />
    ),
  }
);

const GrievancePipeline3DScene = dynamic(
  () => import("./grievance-3d-scene").then((mod) => mod.GrievancePipeline3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] md:h-[460px] rounded-2xl bg-slate-950/60 border border-emerald-500/20 animate-pulse" />
    ),
  }
);

const AquaGuard3DScene = dynamic(
  () => import("./aquaguard-3d-scene").then((mod) => mod.AquaGuard3DScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] md:h-[470px] rounded-2xl bg-slate-950/60 border border-sky-500/20 animate-pulse" />
    ),
  }
);

export interface ProjectMediaItem {
  title: string;
  caption: string;
  alt: string;
  type: "screenshot" | "dashboard" | "architecture" | "video";
  src?: string;
}

export function ProjectScenePreview({ projectId }: { projectId: string }) {
  switch (projectId) {
    case "digital-twin-ehv":
      return <DigitalTwin3DScene />;
    case "kiosk-management-system":
      return <Kiosk3DScene />;
    case "intelligent-grievance-system":
      return <GrievancePipeline3DScene />;
    case "aquaguard-ai":
      return <AquaGuard3DScene />;
    default:
      return null;
  }
}

export function ProjectDemonstration({
  projectId,
  projectTitle,
  media,
  githubUrl,
  liveUrl,
}: {
  projectId: string;
  projectTitle: string;
  media?: ProjectMediaItem[];
  githubUrl?: string;
  liveUrl?: string;
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const hasInteractive3D =
    projectId === "digital-twin-ehv" ||
    projectId === "kiosk-management-system" ||
    projectId === "intelligent-grievance-system" ||
    projectId === "aquaguard-ai";

  return (
    <section className="space-y-6" aria-label="Screenshots and Demonstrations">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <MonitorPlay className="w-6 h-6 text-primary" />
            Demonstrations &amp; Visual Artifacts
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Interactive simulation models and verified artifact placeholders for {projectTitle}.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {githubUrl && (
            <Button size="sm" variant="outline" asChild className="font-mono text-xs">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-3.5 h-3.5 mr-1.5" />
                Source Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button size="sm" asChild className="font-mono text-xs">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Interactive 3D Simulation Viewport */}
      {hasInteractive3D && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>Interactive 3D System Visualization (Simulated / Illustrative)</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              WebGL Simulation
            </span>
          </div>
          <ProjectScenePreview projectId={projectId} />
        </div>
      )}

      {/* Responsive Screenshot / Media Gallery (real assets or honest empty states) */}
      {media && media.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {media.map((item) => {
            const resolvedSrc = item.src
              ? item.src.startsWith("http")
                ? item.src
                : `${basePath}${item.src}`
              : undefined;

            return (
              <figure
                key={item.title}
                className="bg-card border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                {resolvedSrc ? (
                  <div className="relative aspect-video bg-slate-950 overflow-hidden">
                    <Image
                      src={resolvedSrc}
                      alt={item.alt}
                      fill
                      unoptimized
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-950/80 border-b border-white/[0.06] flex flex-col items-center justify-center p-6 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-muted-foreground">
                      <ImageIcon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="text-xs font-mono text-slate-300 font-semibold">
                      {item.title}
                    </div>
                    <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                      Visual capture slot reserved. Actual project screenshot not bundled in this static portfolio repository.
                    </p>
                  </div>
                )}

                <figcaption className="p-4 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-foreground">{item.title}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-muted/40 text-muted-foreground">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.caption}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}
    </section>
  );
}
