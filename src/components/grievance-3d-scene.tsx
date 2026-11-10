"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, Languages, UserCheck, Bot } from "lucide-react";

interface PipelineStage {
  id: string;
  label: string;
  kind: "input" | "ai" | "gate" | "human" | "output";
  pos: [number, number, number];
  explanation: string;
  sampleIO: string;
}

const STAGES: PipelineStage[] = [
  {
    id: "citizen",
    label: "1. Citizen Input",
    kind: "input",
    pos: [-3.4, 0.5, 0],
    explanation: "Citizen submits multilingual text or voice-transcribed civic complaint.",
    sampleIO: 'Input: "குடிநீர் குழாய் உடைந்துள்ளது" (Tamil)',
  },
  {
    id: "lang",
    label: "2. Language Detect",
    kind: "ai",
    pos: [-2.05, 0.5, 0],
    explanation: "Detects regional language, normalizes Unicode, and sanitizes PII tokens.",
    sampleIO: "Detected: Tamil (ta) • PII Redacted",
  },
  {
    id: "translate",
    label: "3. IndicTrans2",
    kind: "ai",
    pos: [-0.7, 0.5, 0],
    explanation: "Quantized ONNX IndicTrans2 translates regional text to English pivot.",
    sampleIO: 'Pivot: "Drinking water pipe is broken"',
  },
  {
    id: "bert",
    label: "4. BERT + Priority",
    kind: "ai",
    pos: [0.65, 0.5, 0],
    explanation: "Sentence Transformers + BERT classify department and urgency severity.",
    sampleIO: "Dept: Water Supply • Priority: High",
  },
  {
    id: "dispatch",
    label: "5A. AI Auto-Route",
    kind: "gate",
    pos: [2.05, 0.5, -0.95],
    explanation: "AI-assisted automatic dispatch when model confidence >= 85%.",
    sampleIO: "Confidence: 93% -> Auto-routed",
  },
  {
    id: "human",
    label: "5B. Human Review",
    kind: "human",
    pos: [2.05, 0.5, 0.95],
    explanation: "Low-confidence (< 85%) or ambiguous tickets route to human supervisor.",
    sampleIO: "Confidence: 68% -> Human Queue",
  },
  {
    id: "status",
    label: "6. Final Status",
    kind: "output",
    pos: [3.4, 0.5, 0],
    explanation: "PostgreSQL/Prisma records final ticket state and citizen tracking timeline.",
    sampleIO: "Ticket #GRV-418 -> Dispatched",
  },
];

export function GrievancePipeline3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [selectedId, setSelectedId] = useState<string>("translate");
  const [humanReviewPath, setHumanReviewPath] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const selectedRef = useRef(selectedId);
  selectedRef.current = selectedId;
  const humanRef = useRef(humanReviewPath);
  humanRef.current = humanReviewPath;
  const rotatingRef = useRef(isRotating);
  rotatingRef.current = isRotating;

  const activeStage = STAGES.find((s) => s.id === selectedId) || STAGES[0];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030816, 0.035);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 4.4, 8.2);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x1e293b, 2.5));
    const dir = new THREE.DirectionalLight(0xe0f2fe, 2.5);
    dir.position.set(5, 9, 6);
    scene.add(dir);

    const root = new THREE.Group();
    scene.add(root);

    // Stage floor
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(8.4, 0.14, 3.8),
      new THREE.MeshStandardMaterial({ color: 0x091326, roughness: 0.85, metalness: 0.3 })
    );
    base.position.y = -0.07;
    root.add(base);
    const grid = new THREE.GridHelper(8.2, 16, 0x10b981, 0x1e293b);
    grid.position.y = 0.01;
    root.add(grid);

    const colorForKind: Record<PipelineStage["kind"], number> = {
      input: 0x38bdf8,
      ai: 0x10b981,
      gate: 0x22d3ee,
      human: 0xf59e0b,
      output: 0xa855f7,
    };

    const clickable: THREE.Object3D[] = [];
    const nodeRings: Record<string, THREE.Mesh> = {};

    STAGES.forEach((st) => {
      const g = new THREE.Group();
      g.position.set(...st.pos);

      const col = colorForKind[st.kind];
      // Pedestal block
      const ped = new THREE.Mesh(
        new THREE.BoxGeometry(0.75, 0.25, 0.75),
        new THREE.MeshStandardMaterial({ color: 0x111c30, metalness: 0.7, roughness: 0.4 })
      );
      ped.position.y = -0.35;
      g.add(ped);

      // Node core (Octahedron for AI, Box for Human/Input/Output)
      const coreGeo =
        st.kind === "ai" || st.kind === "gate"
          ? new THREE.OctahedronGeometry(0.32, 0)
          : new THREE.BoxGeometry(0.52, 0.52, 0.52);
      const coreMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.35,
        metalness: 0.4,
        roughness: 0.3,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.userData.stageId = st.id;
      clickable.push(core);
      g.add(core);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.42, 0.5, 24),
        new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -0.2;
      g.add(ring);
      nodeRings[st.id] = ring;

      root.add(g);
    });

    // Build path curves (AI Auto-Dispatch vs Human Review branch)
    const aiCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.4, 0.5, 0),
      new THREE.Vector3(-2.05, 0.5, 0),
      new THREE.Vector3(-0.7, 0.5, 0),
      new THREE.Vector3(0.65, 0.5, 0),
      new THREE.Vector3(2.05, 0.5, -0.95),
      new THREE.Vector3(3.4, 0.5, 0),
    ]);
    const humanCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.4, 0.5, 0),
      new THREE.Vector3(-2.05, 0.5, 0),
      new THREE.Vector3(-0.7, 0.5, 0),
      new THREE.Vector3(0.65, 0.5, 0),
      new THREE.Vector3(2.05, 0.5, 0.95),
      new THREE.Vector3(3.4, 0.5, 0),
    ]);

    const aiTubeMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.75 });
    const humanTubeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.35 });
    root.add(new THREE.Mesh(new THREE.TubeGeometry(aiCurve, 48, 0.03, 8, false), aiTubeMat));
    root.add(new THREE.Mesh(new THREE.TubeGeometry(humanCurve, 48, 0.03, 8, false), humanTubeMat));

    // Animated grievance packet sphere
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const packet = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), packetMat);
    root.add(packet);

    // Drag & Click Raycasting
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isDragging = false;
    let moved = 0;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0;
    let targetRotX = 0.05;

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      moved = 0;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      moved += Math.abs(dx) + Math.abs(dy);
      targetRotY += dx * 0.007;
      targetRotX = Math.max(-0.2, Math.min(0.45, targetRotX + dy * 0.004));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      if (moved < 6) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(clickable, false);
        if (hits.length > 0 && hits[0].object.userData.stageId) {
          setSelectedId(hits[0].object.userData.stageId);
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0.1 });
    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let animId = 0;
    let progress = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (!isDragging && !prefersReducedMotion && rotatingRef.current) {
        targetRotY += 0.002;
      }
      root.rotation.y += (targetRotY - root.rotation.y) * 0.08;
      root.rotation.x += (targetRotX - root.rotation.x) * 0.08;

      const isHuman = humanRef.current;
      aiTubeMat.opacity = isHuman ? 0.25 : 0.85;
      humanTubeMat.opacity = isHuman ? 0.85 : 0.25;
      packetMat.color.setHex(isHuman ? 0xf59e0b : 0x22d3ee);

      Object.entries(nodeRings).forEach(([id, ring]) => {
        const isSel = id === selectedRef.current;
        (ring.material as THREE.MeshBasicMaterial).opacity = isSel ? 1.0 : 0.3;
        ring.scale.setScalar(isSel ? 1.3 : 1.0);
      });

      const activeCurve = isHuman ? humanCurve : aiCurve;
      if (!prefersReducedMotion) {
        progress = (progress + 0.0035) % 1;
      }
      packet.position.copy(activeCurve.getPoint(progress));

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (container.contains(dom)) container.removeChild(dom);
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
          else m.material?.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      data-interactive-3d="true"
      className="relative w-full h-[400px] md:h-[460px] bg-gradient-to-br from-[#020611] via-[#04141e] to-[#030816] rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl"
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        title="Click pipeline stages or drag to inspect the grievance processing flow"
      />

      {/* Top Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 text-xs font-mono">
          <Languages className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-300 font-semibold uppercase text-[10px] sm:text-xs">
            Multilingual NLP Pipeline <span className="text-slate-400 font-normal hidden sm:inline">(Illustrative Flow)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => setHumanReviewPath((p) => !p)}
            className={`px-2.5 py-1.5 rounded-lg border text-[10px] sm:text-xs font-mono flex items-center gap-1.5 transition-colors ${
              humanReviewPath
                ? "bg-amber-500/20 border-amber-400/50 text-amber-300"
                : "bg-cyan-500/15 border-cyan-400/40 text-cyan-300"
            }`}
          >
            {humanReviewPath ? <UserCheck className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            <span>{humanReviewPath ? "Path: Human Review (<85%)" : "Path: AI Auto-Dispatch (>=85%)"}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsRotating((p) => !p)}
            className="p-1.5 rounded-lg bg-slate-950/85 border border-white/10 text-slate-300 hover:text-emerald-400"
            aria-label="Toggle 3D rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Stage Detail */}
      <div className="absolute bottom-3 left-3 right-3 z-10 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-emerald-500/30 shadow-xl space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">{activeStage.label}</span>
            <span
              className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                activeStage.kind === "human"
                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                  : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
              }`}
            >
              {activeStage.kind === "human" ? "Human Review" : activeStage.kind === "ai" || activeStage.kind === "gate" ? "AI-Assisted" : "System I/O"}
            </span>
          </div>
          <span className="text-[11px] font-mono text-cyan-300">{activeStage.sampleIO}</span>
        </div>

        <p className="text-[11px] text-slate-300 leading-snug">{activeStage.explanation}</p>

        <div className="flex flex-wrap gap-1 pt-1 border-t border-white/10">
          {STAGES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setSelectedId(st.id)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                selectedId === st.id
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-300 hover:text-emerald-300 border border-white/10"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-2">
          <Languages className="w-8 h-8 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">Multilingual Grievance Pipeline (Illustrative)</h4>
          <p className="text-xs text-slate-300 max-w-sm">
            Citizen Input &rarr; Language Detect &rarr; IndicTrans2 &rarr; BERT &amp; Priority &rarr; Confidence Gate (AI Dispatch or Human Review) &rarr; PostgreSQL Status.
          </p>
        </div>
      )}
    </div>
  );
}

