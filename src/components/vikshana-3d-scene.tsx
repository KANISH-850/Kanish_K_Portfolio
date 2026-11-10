"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, Network, SearchCheck, Shield } from "lucide-react";

interface VikshanaStageMeta {
  id: "ksp_db" | "timeline" | "graph" | "dbscan" | "guard";
  label: string;
  title: string;
  role: string;
  nominalSpec: string;
  anomalySpec: string;
  pos: [number, number, number];
}

const VIKSHANA_STAGES: VikshanaStageMeta[] = [
  {
    id: "ksp_db",
    label: "1. KSP Ledger",
    title: "10-Table KSP Datastore (347k+ Records)",
    role: "CaseMaster, Accused, Victim, ArrestSurrender & Catalyst Investigation Copilot tables.",
    nominalSpec: "50,005 Cases Linked",
    anomalySpec: "Cross-Case Evidence Pulled",
    pos: [-3.1, 0.2, 0.4],
  },
  {
    id: "timeline",
    label: "2. Timeline",
    title: "Chronological Timeline & Gap Detector",
    role: "Reconstructs ordered FIR / Arrest / Recovery events and surfaces unexplained time gaps.",
    nominalSpec: "Sequence Verified",
    anomalySpec: "Gap Alert: 2h 45m Unverified Window",
    pos: [-1.45, 0.2, -0.7],
  },
  {
    id: "graph",
    label: "3. Entity Graph",
    title: "Syndicate & Connection Strength Graph",
    role: "Maps suspect, witness, IPC/BNS section & Louvain community clusters via Neo4j/Graph engine.",
    nominalSpec: "Cluster Mapped",
    anomalySpec: "92% Strong Suspect Link Found",
    pos: [0.2, 0.5, 0.85],
  },
  {
    id: "dbscan",
    label: "4. ML & DBSCAN",
    title: "XGBoost + DBSCAN Hotspot Analytics",
    role: "Spatial hotspot clusters (eps=0.05) + temporal-leakage-guarded XGBoost scoring (94.2% acc).",
    nominalSpec: "ROC-AUC 0.968 (Offline Split)",
    anomalySpec: "Hotspot Cluster #3 Elevated",
    pos: [1.7, 0.2, -0.6],
  },
  {
    id: "guard",
    label: "5. Officer Gate",
    title: "HallucinationGuard & Officer Review",
    role: "Attaches provenance citations to every AI output; human officer retains final authority.",
    nominalSpec: "Human-in-the-Loop Ready",
    anomalySpec: "Grounded Citations Required (No Auto-Arrest)",
    pos: [3.1, 0.2, 0.4],
  },
];

export function Vikshana3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<VikshanaStageMeta["id"]>("graph");
  const [anomalyMode, setAnomalyMode] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const selectedRef = useRef(selectedId);
  const anomalyRef = useRef(anomalyMode);
  const rotatingRef = useRef(isRotating);

  selectedRef.current = selectedId;
  anomalyRef.current = anomalyMode;
  rotatingRef.current = isRotating;

  const activeStage = VIKSHANA_STAGES.find((s) => s.id === selectedId) ?? VIKSHANA_STAGES[2];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const testCanvas = document.createElement("canvas");
    if (!(window.WebGLRenderingContext && (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl")))) {
      setWebGLSupported(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0.1, 4.9, 8.1);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x94a3b8, 1.3));
    const key = new THREE.DirectionalLight(0xa855f7, 1.8);
    key.position.set(4, 8, 5);
    scene.add(key);
    const cyan = new THREE.DirectionalLight(0x22d3ee, 1.4);
    cyan.position.set(-5, 6, -3);
    scene.add(cyan);

    const root = new THREE.Group();
    scene.add(root);

    const grid = new THREE.GridHelper(11, 20, 0x6366f1, 0x0f172a);
    grid.position.y = -0.3;
    (grid.material as THREE.Material).opacity = 0.25;
    (grid.material as THREE.Material).transparent = true;
    root.add(grid);

    const clickable: THREE.Object3D[] = [];
    const registerClick = (obj: THREE.Object3D, id: VikshanaStageMeta["id"]) => {
      obj.userData.stageId = id;
      clickable.push(obj);
    };

    const makeMat = (color: number, emissive = 0x000000) =>
      new THREE.MeshStandardMaterial({ color, emissive, emissiveIntensity: 0.35, metalness: 0.6, roughness: 0.28 });

    // 1. KSP Ledger Tower
    const dbTower = new THREE.Group();
    dbTower.position.set(-3.1, 0.2, 0.4);
    for (let i = 0; i < 3; i++) {
      const layer = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.22, 0.95), makeMat(0x0ea5e9, 0x0369a1));
      layer.position.y = i * 0.3 - 0.1;
      registerClick(layer, "ksp_db");
      dbTower.add(layer);
    }
    root.add(dbTower);

    // 2. Timeline Rail + Gap Marker
    const timelineGroup = new THREE.Group();
    timelineGroup.position.set(-1.45, 0.2, -0.7);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 0.35), makeMat(0x1e293b, 0x38bdf8));
    const gapMat = makeMat(0x10b981, 0x059669);
    const gapBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 16), gapMat);
    gapBeacon.position.y = 0.36;
    registerClick(rail, "timeline");
    registerClick(gapBeacon, "timeline");
    timelineGroup.add(rail, gapBeacon);
    root.add(timelineGroup);

    // 3. Entity Relationship Network Constellation
    const graphGroup = new THREE.Group();
    graphGroup.position.set(0.2, 0.55, 0.85);
    const hub = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 0), makeMat(0xa855f7, 0x7e22ce));
    registerClick(hub, "graph");
    graphGroup.add(hub);
    const offsets: [number, number, number][] = [[-0.85, 0.25, -0.3], [0.85, 0.3, -0.25], [0.0, 0.6, 0.65], [-0.4, -0.25, 0.55]];
    offsets.forEach(([ox, oy, oz]) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), makeMat(0x38bdf8, 0x0284c7));
      node.position.set(ox, oy, oz);
      registerClick(node, "graph");
      graphGroup.add(node);
      const edgeCurve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(ox, oy, oz));
      const edge = new THREE.Mesh(
        new THREE.TubeGeometry(edgeCurve, 4, 0.025, 6, false),
        new THREE.MeshBasicMaterial({ color: 0xc084fc })
      );
      graphGroup.add(edge);
    });
    root.add(graphGroup);

    // 4. DBSCAN Spatial Cluster Matrix
    const dbscanGroup = new THREE.Group();
    dbscanGroup.position.set(1.7, 0.0, -0.6);
    const bars = [
      { x: -0.35, z: -0.25, h: 0.45 },
      { x: 0.2, z: -0.2, h: 0.9 },
      { x: -0.1, z: 0.3, h: 0.65 },
      { x: 0.35, z: 0.28, h: 1.15 },
    ];
    bars.forEach((b) => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.26, b.h, 0.26), makeMat(0x22d3ee, 0x0891b2));
      col.position.set(b.x, b.h / 2 - 0.15, b.z);
      registerClick(col, "dbscan");
      dbscanGroup.add(col);
    });
    root.add(dbscanGroup);

    // 5. Officer Decision & HallucinationGuard Pillar
    const guardMat = makeMat(0x10b981, 0x047857);
    const guardGate = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 0), guardMat);
    guardGate.position.set(3.1, 0.45, 0.4);
    registerClick(guardGate, "guard");
    root.add(guardGate);

    // Connecting Pipeline Tube
    const pathCurve = new THREE.CatmullRomCurve3(VIKSHANA_STAGES.map((s) => new THREE.Vector3(...s.pos)));
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
    root.add(new THREE.Mesh(new THREE.TubeGeometry(pathCurve, 48, 0.035, 8, false), tubeMat));

    const packet = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), new THREE.MeshBasicMaterial({ color: 0xc084fc }));
    root.add(packet);

    const selectRing = new THREE.Mesh(
      new THREE.RingGeometry(0.62, 0.74, 32),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide })
    );
    selectRing.rotation.x = -Math.PI / 2;
    root.add(selectRing);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isDragging = false;
    let prev = { x: 0, y: 0 };
    let down = { x: 0, y: 0 };
    let targetRotY = -0.15;
    let targetRotX = 0.06;

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      prev = { x: e.clientX, y: e.clientY };
      down = { x: e.clientX, y: e.clientY };
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      targetRotY += (e.clientX - prev.x) * 0.008;
      targetRotX = Math.max(-0.35, Math.min(0.45, targetRotX + (e.clientY - prev.y) * 0.004));
      prev = { x: e.clientX, y: e.clientY };
    };
    const onUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      isDragging = false;
      if (dist <= 6) {
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
    const obs = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0.1 });
    obs.observe(container);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      if (!isDragging && !prefersReducedMotion && rotatingRef.current) {
        targetRotY += 0.002;
      }
      root.rotation.y += (targetRotY - root.rotation.y) * 0.08;
      root.rotation.x += (targetRotX - root.rotation.x) * 0.08;

      const isAnomaly = anomalyRef.current;
      gapMat.color.setHex(isAnomaly ? 0xf59e0b : 0x10b981);
      gapMat.emissive.setHex(isAnomaly ? 0xd97706 : 0x059669);
      guardMat.color.setHex(isAnomaly ? 0x22d3ee : 0x10b981);

      if (!prefersReducedMotion) {
        graphGroup.rotation.y = t * 0.35;
        guardGate.rotation.y = -t * 0.7;
        packet.position.copy(pathCurve.getPoint((t * 0.22) % 1));
      } else {
        packet.position.copy(pathCurve.getPoint(0.5));
      }

      const active = VIKSHANA_STAGES.find((s) => s.id === selectedRef.current);
      if (active) {
        selectRing.position.set(active.pos[0], -0.25, active.pos[2]);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      obs.disconnect();
      window.removeEventListener("resize", onResize);
      dom.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (container.contains(dom)) container.removeChild(dom);
      scene.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) {
          const m = o as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material)) m.material.forEach((mt) => mt.dispose());
          else m.material?.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      data-interactive-3d="true"
      className="relative w-full h-[420px] md:h-[470px] bg-gradient-to-br from-[#020611] via-[#120826] to-[#040d1d] rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl"
    >
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y" />

      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-purple-500/30 text-xs font-mono">
          <span className={`h-2 w-2 rounded-full ${anomalyMode ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
          <span className="text-purple-300 font-semibold uppercase text-[10px] sm:text-xs">
            Vikshana Case Graph <span className="text-slate-400 font-normal hidden sm:inline">(KSP 10-Table Flow)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              setAnomalyMode((v) => !v);
              setSelectedId("timeline");
            }}
            className={`px-2.5 py-1.5 rounded-lg border text-[10px] sm:text-xs font-mono flex items-center gap-1 transition-colors ${
              anomalyMode
                ? "bg-amber-500/20 border-amber-400/50 text-amber-300"
                : "bg-slate-950/85 border-white/10 text-slate-300 hover:border-purple-400/40"
            }`}
          >
            <SearchCheck className="w-3.5 h-3.5" />
            <span>{anomalyMode ? "Reset Baseline" : "Run Anomaly Check"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRotating((r) => !r)}
            className="p-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 border border-white/10 text-slate-300 hover:text-purple-400 transition-colors"
            aria-label="Toggle 3D rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-10 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-purple-500/30 shadow-xl space-y-2">
        <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
          <span className="text-white font-bold flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5 text-purple-400" />
            {activeStage.title}
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
              anomalyMode
                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                : "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
            }`}
          >
            {anomalyMode ? activeStage.anomalySpec : activeStage.nominalSpec}
          </span>
        </div>

        <p className="text-[11px] text-slate-300 leading-snug">{activeStage.role}</p>

        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-white/10">
          {VIKSHANA_STAGES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setSelectedId(st.id)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                selectedId === st.id
                  ? "bg-purple-500 text-white font-bold"
                  : "bg-slate-900 text-slate-300 hover:text-purple-300 border border-white/10"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-3">
          <Shield className="w-10 h-10 text-purple-400" />
          <h4 className="text-base font-bold text-white">Vikshana Investigation Twin (Static Fallback)</h4>
          <p className="text-xs text-slate-300 max-w-sm">
            WebGL unavailable. Platform connects KSP relational records, Timeline Gap Detector, Entity Graph, DBSCAN Hotspots, and Officer Review Gate.
          </p>
        </div>
      )}
    </div>
  );
}

