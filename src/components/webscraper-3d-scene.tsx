"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, AlertTriangle, Code2, Cpu, Layers } from "lucide-react";

interface ScraperStageMeta {
  id: "target" | "extractor" | "validator" | "repair" | "sqlite";
  label: string;
  title: string;
  role: string;
  nominalSpec: string;
  driftSpec: string;
  pos: [number, number, number];
}

const SCRAPER_STAGES: ScraperStageMeta[] = [
  {
    id: "target",
    label: "1. Target DOM",
    title: "Target Webpage & SSRF Guard",
    role: "Public HTTP/HTTPS HTML document checked against SSRF loopback allowlist rules.",
    nominalSpec: "HTTP 200 • DOM Intact",
    driftSpec: "DOM Mutated • Container Changed",
    pos: [-3.2, 0.3, 0.2],
  },
  {
    id: "extractor",
    label: "2. Fetch & Cheerio",
    title: "Bright Data / Cheerio Extractor",
    role: "Executes CSS extraction plan (or Bright Data Collector fallback) into JSON records.",
    nominalSpec: "100 Records • Selector Valid",
    driftSpec: "Empty / Missing Fields Detected",
    pos: [-1.4, 0.3, 0.2],
  },
  {
    id: "validator",
    label: "3. Schema Check",
    title: "Type-Aware Schema Validator",
    role: "Scores dataQuality against stored ScraperSchema rules (URL, string, number checks).",
    nominalSpec: "Quality: 100% (HEALTHY)",
    driftSpec: "Quality: 24% (SCHEMA DRIFT)",
    pos: [0.5, 0.3, 0.2],
  },
  {
    id: "repair",
    label: "4. AI Auto-Heal",
    title: "LLM Drift Diagnosis (Groq / Gemini)",
    role: "Analyzes failed HTML snippet + validation errors and synthesizes repaired CSS plan.",
    nominalSpec: "Standby (No Drift)",
    driftSpec: "HEALED • Plan Repaired (Conf: 0.95)",
    pos: [0.5, 1.55, -1.35],
  },
  {
    id: "sqlite",
    label: "5. Prisma SQLite",
    title: "Prisma ORM & SQLite Persistence",
    role: "Stores ScraperRun, ScraperResult JSON payloads, ScraperSchema, and HealingAttempt.",
    nominalSpec: "Run Saved • HEALTHY",
    driftSpec: "Attempt Logged • Status: HEALED",
    pos: [2.7, 0.3, 0.2],
  },
];

export function WebScraper3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<ScraperStageMeta["id"]>("validator");
  const [simulateDrift, setSimulateDrift] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const selectedRef = useRef(selectedId);
  const driftRef = useRef(simulateDrift);
  const rotatingRef = useRef(isRotating);

  selectedRef.current = selectedId;
  driftRef.current = simulateDrift;
  rotatingRef.current = isRotating;

  const activeStage = SCRAPER_STAGES.find((s) => s.id === selectedId) ?? SCRAPER_STAGES[2];

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
    camera.position.set(0.1, 4.4, 8.2);
    camera.lookAt(0, 0.4, -0.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x94a3b8, 1.35);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0x38bdf8, 2.0);
    key.position.set(5, 9, 6);
    scene.add(key);
    const healLight = new THREE.PointLight(0xf59e0b, 1.8, 10);
    healLight.position.set(0.5, 3.0, -1.2);
    scene.add(healLight);

    const root = new THREE.Group();
    scene.add(root);

    const grid = new THREE.GridHelper(11, 20, 0x0ea5e9, 0x0f172a);
    grid.position.y = -0.35;
    (grid.material as THREE.Material).opacity = 0.25;
    (grid.material as THREE.Material).transparent = true;
    root.add(grid);

    const clickable: THREE.Object3D[] = [];
    const registerClick = (obj: THREE.Object3D, id: ScraperStageMeta["id"]) => {
      obj.userData.stageId = id;
      clickable.push(obj);
    };

    const makeMat = (color: number, emissive = 0x000000, opacity = 1) =>
      new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity: emissive ? 0.35 : 0,
        metalness: 0.6,
        roughness: 0.28,
        transparent: opacity < 1,
        opacity,
      });

    // 1. Target DOM Slab (HTML Tree blocks)
    const targetGroup = new THREE.Group();
    targetGroup.position.set(-3.2, 0.2, 0.2);
    const domSlab = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.9, 0.9), makeMat(0x0ea5e9, 0x0284c7, 0.88));
    targetGroup.add(domSlab);
    for (let r = 0; r < 3; r++) {
      const tagBar = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.1, 0.08), makeMat(0xbae6fd, 0x38bdf8));
      tagBar.position.set(0, 0.24 - r * 0.24, 0.46);
      targetGroup.add(tagBar);
    }
    registerClick(domSlab, "target");
    root.add(targetGroup);

    // 2. Extractor Core (Octahedral parsing prism)
    const extractorMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.52, 0.85, 6),
      makeMat(0x1e293b, 0x06b6d4)
    );
    extractorMesh.position.set(-1.4, 0.2, 0.2);
    registerClick(extractorMesh, "extractor");
    root.add(extractorMesh);

    // 3. Schema Validator Gate
    const validatorMat = makeMat(0x10b981, 0x059669);
    const validatorMesh = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.95, 0.9), validatorMat);
    validatorMesh.position.set(0.5, 0.22, 0.2);
    registerClick(validatorMesh, "validator");
    root.add(validatorMesh);

    // 4. AI Drift Diagnosis Node (Elevated feedback brain)
    const repairMat = makeMat(0xf59e0b, 0xd97706);
    const repairMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), repairMat);
    repairMesh.position.set(0.5, 1.55, -1.35);
    registerClick(repairMesh, "repair");
    root.add(repairMesh);

    // 5. Prisma SQLite Database Cylinder Stack
    const sqliteGroup = new THREE.Group();
    sqliteGroup.position.set(2.7, 0.0, 0.2);
    for (let d = 0; d < 3; d++) {
      const disk = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.22, 24), makeMat(0x8b5cf6, 0x6d28d9));
      disk.position.y = d * 0.28 - 0.1;
      registerClick(disk, "sqlite");
      sqliteGroup.add(disk);
    }
    root.add(sqliteGroup);

    // Paths: Main pipeline + Repair feedback loop
    const mainCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.2, 0.25, 0.2),
      new THREE.Vector3(-1.4, 0.25, 0.2),
      new THREE.Vector3(0.5, 0.25, 0.2),
      new THREE.Vector3(2.7, 0.25, 0.2),
    ]);
    const mainTubeMat = makeMat(0x22d3ee, 0x06b6d4, 0.6);
    root.add(new THREE.Mesh(new THREE.TubeGeometry(mainCurve, 32, 0.045, 8, false), mainTubeMat));

    const repairCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.5, 0.5, 0.1),
      new THREE.Vector3(0.5, 1.55, -1.35),
      new THREE.Vector3(-1.4, 0.65, -0.35),
      new THREE.Vector3(-1.4, 0.3, 0.2),
    ]);
    const repairTubeMat = makeMat(0xf59e0b, 0xd97706, 0.25);
    root.add(new THREE.Mesh(new THREE.TubeGeometry(repairCurve, 32, 0.04, 8, false), repairTubeMat));

    // Selection ring
    const selectRing = new THREE.Mesh(
      new THREE.RingGeometry(0.7, 0.82, 32),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide })
    );
    selectRing.rotation.x = -Math.PI / 2;
    root.add(selectRing);

    // Animated Data Packets
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const mainPacket = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), packetMat);
    root.add(mainPacket);

    const repairPacketMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.25 });
    const repairPacket = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 14), repairPacketMat);
    root.add(repairPacket);

    // Orbit & Raycast
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

      const isDrift = driftRef.current;
      validatorMat.color.setHex(isDrift ? 0xf59e0b : 0x10b981);
      validatorMat.emissive.setHex(isDrift ? 0xd97706 : 0x059669);
      repairTubeMat.opacity = isDrift ? 0.92 : 0.22;
      repairPacketMat.opacity = isDrift ? 1.0 : 0.18;
      packetMat.color.setHex(isDrift ? 0xfbbf24 : 0x34d399);

      if (!prefersReducedMotion) {
        repairMesh.rotation.y = t * 0.9;
        extractorMesh.rotation.y = t * 0.5;
        mainPacket.position.copy(mainCurve.getPoint((t * 0.28) % 1));
        repairPacket.position.copy(repairCurve.getPoint((t * 0.38) % 1));
      } else {
        mainPacket.position.copy(mainCurve.getPoint(0.5));
        repairPacket.position.copy(repairCurve.getPoint(0.35));
      }

      const active = SCRAPER_STAGES.find((s) => s.id === selectedRef.current);
      if (active) {
        selectRing.position.set(active.pos[0], -0.28, active.pos[2]);
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
      role="region"
      aria-label="Interactive 3D Self-Healing Web Scraper Pipeline Simulation"
      data-interactive-3d="true"
      className="relative w-full h-[420px] md:h-[470px] bg-gradient-to-br from-[#020611] via-[#041224] to-[#080d1d] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl"
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        title="Drag to rotate or click extraction stages to inspect"
      />

      {/* Top Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-xs font-mono">
          <span className={`h-2 w-2 rounded-full ${simulateDrift ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
          <span className="text-cyan-300 font-semibold uppercase text-[10px] sm:text-xs">
            Self-Healing Pipeline <span className="text-slate-400 font-normal hidden sm:inline">(Demo Mode Flow)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              setSimulateDrift((v) => !v);
              setSelectedId("repair");
            }}
            className={`px-2.5 py-1.5 rounded-lg border text-[10px] sm:text-xs font-mono flex items-center gap-1 transition-colors ${
              simulateDrift
                ? "bg-amber-500/20 border-amber-400/50 text-amber-300"
                : "bg-slate-950/85 border-white/10 text-slate-300 hover:border-amber-400/40"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{simulateDrift ? "Reset Healthy" : "Simulate DOM Drift"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRotating((r) => !r)}
            className="p-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
            aria-label="Toggle 3D rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Inspector */}
      <div className="absolute bottom-3 left-3 right-3 z-10 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 shadow-xl space-y-2">
        <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
          <span className="text-white font-bold flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            {activeStage.title}
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
              simulateDrift
                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                : "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
            }`}
          >
            {simulateDrift ? activeStage.driftSpec : activeStage.nominalSpec}
          </span>
        </div>

        <p className="text-[11px] text-slate-300 leading-snug">{activeStage.role}</p>

        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-white/10">
          {SCRAPER_STAGES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setSelectedId(st.id)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                selectedId === st.id
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-300 hover:text-cyan-300 border border-white/10"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-3">
          <Layers className="w-10 h-10 text-cyan-400" />
          <h4 className="text-base font-bold text-white">HealScrape Extraction Pipeline (Static Fallback)</h4>
          <p className="text-xs text-slate-300 max-w-sm flex items-center gap-2 justify-center">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            Target DOM -&gt; Bright Data / Cheerio -&gt; Schema Validation -&gt; AI Selector Repair -&gt; Prisma SQLite.
          </p>
        </div>
      )}
    </div>
  );
}

