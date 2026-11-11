"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, Building2, MessageSquareCode, Server } from "lucide-react";

interface HospitalModuleMeta {
  id: "ward" | "fastapi" | "postgres" | "ollama";
  label: string;
  name: string;
  description: string;
  nominalSpec: string;
  ragSpec: string;
  pos: [number, number, number];
}

const HOSPITAL_MODULES: HospitalModuleMeta[] = [
  {
    id: "ward",
    label: "1. Clinical SPA",
    name: "React 19 + Nginx Hospital Ward Console",
    description: "Manages MRN patient registry, appointments, admissions, ICU bed occupancy grids, and AI reports.",
    nominalSpec: "Port 8080 • 5 Wards Active",
    ragSpec: "SSE Prompt -> /api/v1/chatbot",
    pos: [-2.8, 0.2, 0.5],
  },
  {
    id: "fastapi",
    label: "2. FastAPI Core",
    name: "FastAPI + JWT + ML & Report Engine",
    description: "HS256 JWT auth, RandomForestRegressor forecasts (Revenue/Admissions), ReportLab PDF & OpenPyXL exports.",
    nominalSpec: "Port 8000 • 20/20 Pytest",
    ragSpec: "Streaming Top-3 SOP Chunks",
    pos: [-0.8, 0.3, -0.4],
  },
  {
    id: "postgres",
    label: "3. Postgres 16",
    name: "PostgreSQL 16 + Alembic (14 ORM Models)",
    description: "Stores patients, beds, admissions, inventory_items, purchase_orders, transactions, and chat history.",
    nominalSpec: "Port 5432 • Schema 001_hms",
    ragSpec: "Chat Message Logged to DB",
    pos: [1.1, 0.2, -1.2],
  },
  {
    id: "ollama",
    label: "4. Local Ollama",
    name: "Air-Gapped Ollama (qwen3:4b + ChromaDB)",
    description: "On-premise RAG with nomic-embed-text (768-d) over 500-char hospital SOP chunks; zero external cloud calls.",
    nominalSpec: "Port 11434 • On-Prem Standby",
    ragSpec: "SSE Token Stream Active (Local)",
    pos: [2.7, 0.4, 0.7],
  },
];

export function TechSpire3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<HospitalModuleMeta["id"]>("ollama");
  const [simulateRag, setSimulateRag] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const selectedRef = useRef(selectedId);
  const ragRef = useRef(simulateRag);
  const rotatingRef = useRef(isRotating);

  selectedRef.current = selectedId;
  ragRef.current = simulateRag;
  rotatingRef.current = isRotating;

  const activeModule = HOSPITAL_MODULES.find((m) => m.id === selectedId) ?? HOSPITAL_MODULES[3];

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
    camera.position.set(0.1, 4.8, 8.0);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x94a3b8, 1.35));
    const key = new THREE.DirectionalLight(0x10b981, 1.8);
    key.position.set(5, 8, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x38bdf8, 1.4);
    fill.position.set(-4, 5, -3);
    scene.add(fill);

    const root = new THREE.Group();
    scene.add(root);

    const grid = new THREE.GridHelper(11, 20, 0x10b981, 0x0f172a);
    grid.position.y = -0.3;
    (grid.material as THREE.Material).opacity = 0.25;
    (grid.material as THREE.Material).transparent = true;
    root.add(grid);

    const clickable: THREE.Object3D[] = [];
    const registerClick = (obj: THREE.Object3D, id: HospitalModuleMeta["id"]) => {
      obj.userData.modId = id;
      clickable.push(obj);
    };

    const makeMat = (color: number, emissive = 0x000000, opacity = 1) =>
      new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity: 0.35,
        metalness: 0.55,
        roughness: 0.3,
        transparent: opacity < 1,
        opacity,
      });

    // 1. Ward & ICU Bed Floor Module
    const wardGroup = new THREE.Group();
    wardGroup.position.set(-2.8, 0, 0.5);
    const wardFloor = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.14, 1.4), makeMat(0x0f172a, 0x0284c7));
    wardFloor.position.y = -0.15;
    registerClick(wardFloor, "ward");
    wardGroup.add(wardFloor);
    for (let bx = -0.5; bx <= 0.5; bx += 0.5) {
      for (let bz = -0.35; bz <= 0.35; bz += 0.7) {
        const bed = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.48), makeMat(0x38bdf8, 0x0369a1));
        bed.position.set(bx, 0.05, bz);
        registerClick(bed, "ward");
        wardGroup.add(bed);
      }
    }
    root.add(wardGroup);

    // 2. FastAPI + Alembic + ML Container
    const apiBox = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.25, 1.0), makeMat(0x0d9488, 0x0f766e));
    apiBox.position.set(-0.8, 0.45, -0.4);
    registerClick(apiBox, "fastapi");
    root.add(apiBox);

    // 3. PostgreSQL 16 Database Stack
    const pgGroup = new THREE.Group();
    pgGroup.position.set(1.1, 0, -1.2);
    for (let i = 0; i < 3; i++) {
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.24, 24), makeMat(0x3b82f6, 0x1d4ed8));
      cyl.position.y = i * 0.3;
      registerClick(cyl, "postgres");
      pgGroup.add(cyl);
    }
    root.add(pgGroup);

    // 4. On-Premise Ollama + ChromaDB inside translucent privacy dome
    const ollamaGroup = new THREE.Group();
    ollamaGroup.position.set(2.7, 0.35, 0.7);
    const ollamaCoreMat = makeMat(0x10b981, 0x059669);
    const ollamaCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), ollamaCoreMat);
    const privacyShield = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 1.35, 24, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.14, side: THREE.DoubleSide })
    );
    registerClick(ollamaCore, "ollama");
    registerClick(privacyShield, "ollama");
    ollamaGroup.add(ollamaCore, privacyShield);
    root.add(ollamaGroup);

    // Connecting Docker Network Tubes
    const ragCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.8, 0.25, 0.5),
      new THREE.Vector3(-0.8, 0.45, -0.4),
      new THREE.Vector3(2.7, 0.45, 0.7),
      new THREE.Vector3(1.1, 0.35, -1.2),
    ]);
    root.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(ragCurve, 44, 0.04, 8, false),
        new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.55 })
      )
    );

    const ssePacketMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const ssePacket = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), ssePacketMat);
    root.add(ssePacket);

    const selectRing = new THREE.Mesh(
      new THREE.RingGeometry(0.7, 0.82, 32),
      new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
    );
    selectRing.rotation.x = -Math.PI / 2;
    root.add(selectRing);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isDragging = false;
    let prev = { x: 0, y: 0 };
    let down = { x: 0, y: 0 };
    let targetRotY = -0.15;
    let targetRotX = 0.05;

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
        if (hits.length > 0 && hits[0].object.userData.modId) {
          setSelectedId(hits[0].object.userData.modId);
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

      const activeRag = ragRef.current;
      ollamaCoreMat.emissive.setHex(activeRag ? 0x10b981 : 0x059669);
      ssePacketMat.color.setHex(activeRag ? 0x22d3ee : 0x34d399);

      if (!prefersReducedMotion) {
        ollamaCore.rotation.y = t * (activeRag ? 1.4 : 0.45);
        const speed = activeRag ? 0.45 : 0.18;
        ssePacket.position.copy(ragCurve.getPoint((t * speed) % 1));
      } else {
        ssePacket.position.copy(ragCurve.getPoint(0.5));
      }

      const active = HOSPITAL_MODULES.find((m) => m.id === selectedRef.current);
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
      role="region"
      aria-label="Interactive 3D TechSpire Containerized Hospital System & Local Ollama RAG Twin"
      data-interactive-3d="true"
      className="relative w-full h-[420px] md:h-[470px] bg-gradient-to-br from-[#020611] via-[#041d19] to-[#050d1a] rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl"
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        title="Drag to rotate or click hospital containers to inspect"
      />

      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-emerald-500/30 text-xs font-mono">
          <span className={`h-2 w-2 rounded-full ${simulateRag ? "bg-cyan-400 animate-ping" : "bg-emerald-400"}`} />
          <span className="text-emerald-300 font-semibold uppercase text-[10px] sm:text-xs">
            TechSpire HMS <span className="text-slate-400 font-normal hidden sm:inline">(4-Container Docker Stack)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              setSimulateRag((v) => !v);
              setSelectedId("ollama");
            }}
            className={`px-2.5 py-1.5 rounded-lg border text-[10px] sm:text-xs font-mono flex items-center gap-1 transition-colors ${
              simulateRag
                ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300"
                : "bg-slate-950/85 border-white/10 text-slate-300 hover:border-emerald-400/40"
            }`}
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>{simulateRag ? "Stop RAG Query" : "Simulate Clinical RAG"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRotating((r) => !r)}
            className="p-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 border border-white/10 text-slate-300 hover:text-emerald-400 transition-colors"
            aria-label="Toggle 3D rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-10 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-emerald-500/30 shadow-xl space-y-2">
        <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
          <span className="text-white font-bold flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            {activeModule.name}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-emerald-500/10 text-emerald-300 border-emerald-500/25">
            {simulateRag ? activeModule.ragSpec : activeModule.nominalSpec}
          </span>
        </div>

        <p className="text-[11px] text-slate-300 leading-snug">{activeModule.description}</p>

        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-white/10">
          {HOSPITAL_MODULES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedId(m.id)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                selectedId === m.id
                  ? "bg-emerald-400 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-300 hover:text-emerald-300 border border-white/10"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-3">
          <Server className="w-10 h-10 text-emerald-400" />
          <h4 className="text-base font-bold text-white">TechSpire 4-Container HMS Architecture (Static Fallback)</h4>
          <p className="text-xs text-slate-300 max-w-sm">
            WebGL unavailable. Docker stack connects Nginx + React 19 (8080) -&gt; FastAPI (8000) -&gt; PostgreSQL 16 (5432) &amp; Ollama qwen3:4b (11434).
          </p>
        </div>
      )}
    </div>
  );
}

