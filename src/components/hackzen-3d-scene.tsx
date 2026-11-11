"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, ShieldAlert, Video, Eye } from "lucide-react";

interface SafetyModuleMeta {
  id: "camera" | "worker" | "zone" | "engine";
  label: string;
  name: string;
  description: string;
  nominalState: string;
  intrusionState: string;
  focusPos: [number, number, number];
}

const SAFETY_MODULES: SafetyModuleMeta[] = [
  {
    id: "camera",
    label: "CAMERA",
    name: "RTSP Video Ingestion Mast",
    description: "Streams camera feeds into asyncio frame buffers (~10 FPS loop offloading CV inference).",
    nominalState: "10 FPS • Frame Buffer Active",
    intrusionState: "Frame #412 Triggered Alert",
    focusPos: [-2.6, 0.0, -1.6],
  },
  {
    id: "worker",
    label: "WORKER / PPE",
    name: "YOLO PPE & IOU Tracker",
    description: "Detects Helmet, Vest, Gloves, Goggles, Mask, and Safety Shoes via best.pt + IOU track IDs.",
    nominalState: "Helmet + Vest Verified (Risk: 0.12)",
    intrusionState: "PPE Missing • Track #7 CRITICAL",
    focusPos: [0.0, 0.0, 0.4],
  },
  {
    id: "zone",
    label: "DANGER ZONE",
    name: "Shapely Polygon Geofence",
    description: "Evaluates tracked bounding box footpoints against persisted camera polygon risk zones.",
    nominalState: "Zone Status: SAFE (Perimeter Clear)",
    intrusionState: "CRITICAL Zone Boundary Crossed",
    focusPos: [0.4, 0.0, 0.2],
  },
  {
    id: "engine",
    label: "RISK ENGINE",
    name: "Weighted Risk & Socket.IO Server",
    description: "Renormalizes available signals (PPE 0.3, Zone 0.4, Anomaly 0.2, Trend 0.1) and broadcasts live_frame.",
    nominalState: "Score: 0.12 • Throttled DB Log",
    intrusionState: "Score: 0.88 • Incident Persisted",
    focusPos: [2.7, 0.0, -1.0],
  },
];

export function HackZen3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<SafetyModuleMeta["id"]>("zone");
  const [simulateIntrusion, setSimulateIntrusion] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(true);

  const selectedRef = useRef(selectedId);
  const intrusionRef = useRef(simulateIntrusion);
  const rotatingRef = useRef(isRotating);

  selectedRef.current = selectedId;
  intrusionRef.current = simulateIntrusion;
  rotatingRef.current = isRotating;

  const activeModule = SAFETY_MODULES.find((m) => m.id === selectedId) ?? SAFETY_MODULES[2];

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
    camera.position.set(4.5, 4.6, 6.2);
    camera.lookAt(0, 0.6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x94a3b8, 1.35);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0x38bdf8, 2.0);
    key.position.set(5, 8, 5);
    scene.add(key);

    const root = new THREE.Group();
    scene.add(root);

    const floorGrid = new THREE.GridHelper(9, 18, 0x334155, 0x0f172a);
    (floorGrid.material as THREE.Material).opacity = 0.28;
    (floorGrid.material as THREE.Material).transparent = true;
    root.add(floorGrid);

    const clickable: THREE.Object3D[] = [];
    const registerClick = (obj: THREE.Object3D, id: SafetyModuleMeta["id"]) => {
      obj.userData.moduleId = id;
      clickable.push(obj);
    };

    const makeMat = (color: number, emissive = 0x000000, opacity = 1) =>
      new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity: emissive ? 0.35 : 0,
        metalness: 0.55,
        roughness: 0.3,
        transparent: opacity < 1,
        opacity,
      });

    // 1. Camera Mast + FOV Cone
    const camGroup = new THREE.Group();
    camGroup.position.set(-2.6, 0, -1.6);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 2.6, 12), makeMat(0x475569));
    pole.position.y = 1.3;
    const camHousing = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.25, 0.65), makeMat(0x0f172a, 0x0284c7));
    camHousing.position.set(0.25, 2.55, 0.25);
    camHousing.rotation.set(0.45, -0.65, 0);
    const fovCone = new THREE.Mesh(
      new THREE.ConeGeometry(1.7, 3.8, 20, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.08, side: THREE.DoubleSide })
    );
    fovCone.position.set(1.25, 1.35, 1.05);
    fovCone.rotation.set(0.48, 0, -0.52);
    registerClick(camHousing, "camera");
    registerClick(pole, "camera");
    camGroup.add(pole, camHousing, fovCone);
    root.add(camGroup);

    // 2. Shapely Danger Zone Floor Pad
    const zoneMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.22, side: THREE.DoubleSide });
    const zoneFloor = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.4), zoneMat);
    zoneFloor.rotation.x = -Math.PI / 2;
    zoneFloor.position.set(0.4, 0.02, 0.2);
    registerClick(zoneFloor, "zone");
    root.add(zoneFloor);

    const zoneBorderMat = new THREE.LineBasicMaterial({ color: 0xf59e0b });
    const borderGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(2.6, 0.04, 2.4));
    const zoneBorder = new THREE.LineSegments(borderGeo, zoneBorderMat);
    zoneBorder.position.set(0.4, 0.03, 0.2);
    root.add(zoneBorder);

    // 3. Articulated Worker Figure + PPE Vest & Helmet
    const workerGroup = new THREE.Group();
    workerGroup.position.set(-1.1, 0, 0.8);
    const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.72, 12), makeMat(0x334155));
    legs.position.y = 0.36;
    const vestMat = makeMat(0x10b981, 0x059669);
    const vest = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.6, 12), vestMat);
    vest.position.y = 1.02;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 16), makeMat(0xcbd5e1));
    head.position.y = 1.48;
    const helmetMat = makeMat(0xfacc15, 0xca8a04);
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.19, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), helmetMat);
    helmet.position.y = 1.52;
    registerClick(vest, "worker");
    registerClick(helmet, "worker");
    workerGroup.add(legs, vest, head, helmet);
    root.add(workerGroup);

    // 4. FastAPI Risk Engine Rack + Live HUD Canvas
    const engineGroup = new THREE.Group();
    engineGroup.position.set(2.7, 0, -1.0);
    const rack = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.9, 0.85), makeMat(0x0f172a, 0x0e7490));
    rack.position.y = 0.95;

    const hudCanvas = document.createElement("canvas");
    hudCanvas.width = 256;
    hudCanvas.height = 160;
    const hudCtx = hudCanvas.getContext("2d")!;
    const hudTex = new THREE.CanvasTexture(hudCanvas);

    const drawEngineHud = (intrusion: boolean) => {
      hudCtx.fillStyle = "#020617";
      hudCtx.fillRect(0, 0, 256, 160);
      hudCtx.strokeStyle = intrusion ? "#ef4444" : "#22d3ee";
      hudCtx.lineWidth = 4;
      hudCtx.strokeRect(4, 4, 248, 152);
      hudCtx.fillStyle = intrusion ? "#fca5a5" : "#67e8f9";
      hudCtx.font = "bold 17px monospace";
      hudCtx.fillText(intrusion ? "RISK SCORE: 0.88" : "RISK SCORE: 0.12", 18, 36);
      hudCtx.fillStyle = intrusion ? "#ef4444" : "#10b981";
      hudCtx.font = "bold 14px monospace";
      hudCtx.fillText(intrusion ? "ZONE: CRITICAL" : "ZONE: SAFE", 18, 68);
      hudCtx.fillStyle = "#cbd5e1";
      hudCtx.font = "13px monospace";
      hudCtx.fillText(intrusion ? "PPE: VIOLATION" : "PPE: HELMET + VEST", 18, 96);
      hudCtx.fillText("STREAM: WS /live_frame", 18, 128);
      hudTex.needsUpdate = true;
    };
    drawEngineHud(false);

    const hudScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.56), new THREE.MeshBasicMaterial({ map: hudTex }));
    hudScreen.position.set(0, 1.3, 0.44);
    registerClick(rack, "engine");
    registerClick(hudScreen, "engine");
    engineGroup.add(rack, hudScreen);
    root.add(engineGroup);

    // Selection ring
    const selectRing = new THREE.Mesh(
      new THREE.RingGeometry(0.65, 0.78, 32),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide })
    );
    selectRing.rotation.x = -Math.PI / 2;
    root.add(selectRing);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isDragging = false;
    let prev = { x: 0, y: 0 };
    let down = { x: 0, y: 0 };
    let targetRotY = -0.25;
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
        if (hits.length > 0 && hits[0].object.userData.moduleId) {
          setSelectedId(hits[0].object.userData.moduleId);
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
    let lastIntrusion = false;
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

      const isIntrusion = intrusionRef.current;
      if (isIntrusion !== lastIntrusion) {
        lastIntrusion = isIntrusion;
        drawEngineHud(isIntrusion);
      }

      const targetX = isIntrusion ? 0.35 : -1.25;
      const targetZ = isIntrusion ? 0.25 : 0.9;
      workerGroup.position.x += (targetX - workerGroup.position.x) * 0.08;
      workerGroup.position.z += (targetZ - workerGroup.position.z) * 0.08;

      zoneMat.color.setHex(isIntrusion ? 0xef4444 : 0xf59e0b);
      zoneMat.opacity = isIntrusion && !prefersReducedMotion ? 0.28 + Math.sin(t * 6) * 0.1 : 0.2;
      zoneBorderMat.color.setHex(isIntrusion ? 0xef4444 : 0xf59e0b);
      helmet.visible = !isIntrusion;
      vestMat.color.setHex(isIntrusion ? 0xef4444 : 0x10b981);

      const active = SAFETY_MODULES.find((m) => m.id === selectedRef.current);
      if (active) {
        const fx = active.id === "worker" ? workerGroup.position.x : active.focusPos[0];
        const fz = active.id === "worker" ? workerGroup.position.z : active.focusPos[2];
        selectRing.position.set(fx, 0.03, fz);
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
      hudTex.dispose();
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
      aria-label="Interactive 3D CCTV PPE & Hazard Zone Safety Simulation"
      data-interactive-3d="true"
      className="relative w-full h-[420px] md:h-[470px] bg-gradient-to-br from-[#020611] via-[#130b1f] to-[#040914] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl"
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        title="Drag to rotate or click CCTV, worker, danger zone, or risk engine"
      />

      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-amber-500/30 text-xs font-mono">
          <span className={`h-2 w-2 rounded-full ${simulateIntrusion ? "bg-rose-500 animate-ping" : "bg-emerald-400"}`} />
          <span className="text-amber-300 font-semibold uppercase text-[10px] sm:text-xs">
            CCTV Risk Twin <span className="text-slate-400 font-normal hidden sm:inline">(Simulated Frame)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              setSimulateIntrusion((v) => !v);
              setSelectedId("zone");
            }}
            className={`px-2.5 py-1.5 rounded-lg border text-[10px] sm:text-xs font-mono flex items-center gap-1 transition-colors ${
              simulateIntrusion
                ? "bg-rose-500/20 border-rose-400/50 text-rose-300"
                : "bg-slate-950/85 border-white/10 text-slate-300 hover:border-rose-400/40"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{simulateIntrusion ? "Clear Zone" : "Simulate Zone Intrusion"}</span>
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

      <div className="absolute bottom-3 left-3 right-3 z-10 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-amber-500/30 shadow-xl space-y-2">
        <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
          <span className="text-white font-bold flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-amber-400" />
            {activeModule.name}
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
              simulateIntrusion
                ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                : "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
            }`}
          >
            {simulateIntrusion ? activeModule.intrusionState : activeModule.nominalState}
          </span>
        </div>

        <p className="text-[11px] text-slate-300 leading-snug">{activeModule.description}</p>

        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-white/10">
          {SAFETY_MODULES.map((mod) => (
            <button
              key={mod.id}
              type="button"
              onClick={() => setSelectedId(mod.id)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                selectedId === mod.id
                  ? "bg-amber-400 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-300 hover:text-amber-300 border border-white/10"
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>
      </div>

      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-3">
          <Eye className="w-10 h-10 text-amber-400" />
          <h4 className="text-base font-bold text-white">HackZen CCTV Safety Twin (Static Fallback)</h4>
          <p className="text-xs text-slate-300 max-w-sm">
            WebGL unavailable. Architecture processes RTSP frames with YOLO PPE detection, IOU tracking, Shapely zones, and Socket.IO alerts.
          </p>
        </div>
      )}
    </div>
  );
}

