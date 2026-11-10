"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Droplets, RotateCcw, AlertTriangle, Activity } from "lucide-react";

interface CampusZone {
  id: "tank" | "zone-a" | "zone-b" | "zone-c";
  name: string;
  pos: [number, number, number];
  normalFlow: string;
  leakFlow: string;
  catboost72h: string;
  modelNote: string;
}

const CAMPUS_ZONES: CampusZone[] = [
  {
    id: "tank",
    name: "Central Overhead Reservoir",
    pos: [0, 0.2, -1.9],
    normalFlow: "142 kL (78% Reserve)",
    leakFlow: "118 kL (Rapid Drawdown)",
    catboost72h: "CatBoost 72h Forecast: 138 kL/day",
    modelNote: "CatBoost uses rolling 24h/48h/72h lags to schedule pump refill cycles.",
  },
  {
    id: "zone-a",
    name: "Zone A: Academic Complex",
    pos: [-2.2, 0.2, 1.1],
    normalFlow: "480 L/h • 3.2 bar",
    leakFlow: "485 L/h • 3.1 bar (Nominal)",
    catboost72h: "Peak Window: 09:00–16:00",
    modelNote: "One-Class SVM validates consumption against class-schedule baselines.",
  },
  {
    id: "zone-b",
    name: "Zone B: Hostel Wing Pipeline",
    pos: [0, 0.2, 1.6],
    normalFlow: "620 L/h • 3.0 bar",
    leakFlow: "1,190 L/h • 1.8 bar (Simulated Leak)",
    catboost72h: "Baseline Expected: 610 L/h",
    modelNote: "XGBoost flags localized pressure-drop & flow-ratio leak signatures.",
  },
  {
    id: "zone-c",
    name: "Zone C: Research Labs",
    pos: [2.2, 0.2, 1.1],
    normalFlow: "290 L/h • 3.3 bar",
    leakFlow: "292 L/h • 3.2 bar (Nominal)",
    catboost72h: "Steady Cooling Loop Load",
    modelNote: "Continuous flow/pressure telemetry separates diurnal load from ruptures.",
  },
];

export function AquaGuard3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [selectedId, setSelectedId] = useState<CampusZone["id"]>("zone-b");
  const [simulateLeak, setSimulateLeak] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  const selectedRef = useRef(selectedId);
  selectedRef.current = selectedId;
  const leakRef = useRef(simulateLeak);
  leakRef.current = simulateLeak;
  const rotatingRef = useRef(isRotating);
  rotatingRef.current = isRotating;

  const activeZone = CAMPUS_ZONES.find((z) => z.id === selectedId) || CAMPUS_ZONES[2];

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
    scene.fog = new THREE.FogExp2(0x030b16, 0.036);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(5.4, 4.4, 6.4);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x1e293b, 2.5));
    const keyLight = new THREE.DirectionalLight(0xbae6fd, 2.6);
    keyLight.position.set(6, 10, 6);
    scene.add(keyLight);

    const root = new THREE.Group();
    scene.add(root);

    // Campus Ground Base
    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.16, 5.8),
      new THREE.MeshStandardMaterial({ color: 0x091628, roughness: 0.85, metalness: 0.3 })
    );
    ground.position.y = -0.08;
    root.add(ground);
    const grid = new THREE.GridHelper(6.8, 14, 0x0284c7, 0x1e293b);
    grid.position.y = 0.01;
    root.add(grid);

    const clickable: THREE.Object3D[] = [];
    const registerClickable = (id: CampusZone["id"], group: THREE.Group) => {
      group.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.userData.zoneId = id;
          clickable.push(child);
        }
      });
      root.add(group);
    };

    // 1. ELEVATED WATER STORAGE TANK (Rear Z = -1.9)
    const tankGroup = new THREE.Group();
    const legMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.4 });
    [
      [-0.45, -2.25], [0.45, -2.25], [-0.45, -1.55], [0.45, -1.55],
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.35, 10), legMat);
      leg.position.set(lx, 0.67, lz);
      tankGroup.add(leg);
    });
    const tankDrum = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.75, 1.1, 24),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.78, roughness: 0.2, metalness: 0.3 })
    );
    tankDrum.position.set(0, 1.88, -1.9);
    tankGroup.add(tankDrum);
    const tankCap = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.08, 24), legMat);
    tankCap.position.set(0, 2.45, -1.9);
    tankGroup.add(tankCap);
    registerClickable("tank", tankGroup);

    // 2. CAMPUS BUILDINGS (Zone A, Zone B, Zone C)
    const buildingMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5, roughness: 0.45 });
    const windowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });

    const createBuilding = (id: CampusZone["id"], x: number, z: number, w: number, h: number, d: number) => {
      const g = new THREE.Group();
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMat);
      b.position.set(x, h / 2, z);
      g.add(b);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.08, 0.06, d + 0.08), windowMat);
      roof.position.set(x, h + 0.03, z);
      g.add(roof);
      // Flowmeter collar
      const meter = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.24, 0.24),
        new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.4 })
      );
      meter.position.set(x, 0.18, z - d / 2 - 0.16);
      g.add(meter);
      registerClickable(id, g);
      return meter;
    };

    createBuilding("zone-a", -2.2, 1.1, 1.2, 1.1, 1.0);
    const zoneBMeter = createBuilding("zone-b", 0, 1.6, 1.35, 0.85, 0.95);
    createBuilding("zone-c", 2.2, 1.1, 1.1, 1.35, 1.0);

    // 3. WATER DISTRIBUTION PIPELINES + ANIMATED FLOW PARTICLES
    const pipeRoutes: { id: CampusZone["id"]; curve: THREE.CatmullRomCurve3 }[] = [
      {
        id: "zone-a",
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 1.35, -1.9),
          new THREE.Vector3(0, 0.18, -1.4),
          new THREE.Vector3(-2.2, 0.18, -0.4),
          new THREE.Vector3(-2.2, 0.18, 0.45),
        ]),
      },
      {
        id: "zone-b",
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 1.35, -1.9),
          new THREE.Vector3(0, 0.18, -1.0),
          new THREE.Vector3(0, 0.18, 0.95),
        ]),
      },
      {
        id: "zone-c",
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 1.35, -1.9),
          new THREE.Vector3(0, 0.18, -1.4),
          new THREE.Vector3(2.2, 0.18, -0.4),
          new THREE.Vector3(2.2, 0.18, 0.45),
        ]),
      },
    ];

    const zoneBPipeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 });
    const droplets: { mesh: THREE.Mesh; progress: number; curve: THREE.CatmullRomCurve3; id: string }[] = [];
    const dropGeo = new THREE.SphereGeometry(0.06, 10, 10);

    pipeRoutes.forEach((route) => {
      const mat =
        route.id === "zone-b"
          ? zoneBPipeMat
          : new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 });
      const pipe = new THREE.Mesh(new THREE.TubeGeometry(route.curve, 24, 0.045, 8, false), mat);
      root.add(pipe);

      for (let i = 0; i < 3; i++) {
        const dropMat = new THREE.MeshBasicMaterial({ color: 0x7dd3fc });
        const drop = new THREE.Mesh(dropGeo, dropMat);
        root.add(drop);
        droplets.push({ mesh: drop, progress: i / 3, curve: route.curve, id: route.id });
      }
    });

    // Zone B Leak Warning Beacon
    const leakBeacon = new THREE.Mesh(
      new THREE.RingGeometry(0.24, 0.34, 24),
      new THREE.MeshBasicMaterial({ color: 0xf43f5e, side: THREE.DoubleSide, transparent: true, opacity: 0.9 })
    );
    leakBeacon.rotation.x = -Math.PI / 2;
    leakBeacon.position.set(0, 0.05, 0.2);
    leakBeacon.visible = false;
    root.add(leakBeacon);

    // Selection Highlight Ring
    const selectRing = new THREE.Mesh(
      new THREE.RingGeometry(0.85, 0.95, 32),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
    );
    selectRing.rotation.x = -Math.PI / 2;
    selectRing.position.set(0, 0.03, 1.6);
    root.add(selectRing);

    // Drag & Click Raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isDragging = false;
    let moved = 0;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = -0.3;
    let targetRotX = 0.1;

    const onDown = (e: PointerEvent) => { isDragging = true; moved = 0; prevX = e.clientX; prevY = e.clientY; };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      moved += Math.abs(dx) + Math.abs(dy);
      targetRotY += dx * 0.008;
      targetRotX = Math.max(-0.15, Math.min(0.5, targetRotX + dy * 0.005));
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
        if (hits.length > 0 && hits[0].object.userData.zoneId) {
          setSelectedId(hits[0].object.userData.zoneId);
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
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      if (!isDragging && !prefersReducedMotion && rotatingRef.current) {
        targetRotY += 0.0022;
      }
      root.rotation.y += (targetRotY - root.rotation.y) * 0.08;
      root.rotation.x += (targetRotX - root.rotation.x) * 0.08;

      const isLeak = leakRef.current;
      zoneBPipeMat.color.setHex(isLeak ? 0xf43f5e : 0x38bdf8);
      (zoneBMeter.material as THREE.MeshStandardMaterial).color.setHex(isLeak ? 0xf43f5e : 0x10b981);
      (zoneBMeter.material as THREE.MeshStandardMaterial).emissive.setHex(isLeak ? 0xf43f5e : 0x10b981);
      leakBeacon.visible = isLeak;
      if (isLeak) {
        const s = 1 + Math.sin(t * 5) * 0.25;
        leakBeacon.scale.set(s, s, 1);
      }

      const zMeta = CAMPUS_ZONES.find((z) => z.id === selectedRef.current);
      if (zMeta) {
        selectRing.position.set(zMeta.pos[0], 0.03, zMeta.pos[2]);
      }

      if (!prefersReducedMotion) {
        droplets.forEach((d) => {
          const spd = isLeak && d.id === "zone-b" ? 0.012 : 0.006;
          d.progress = (d.progress + spd) % 1;
          d.mesh.position.copy(d.curve.getPoint(d.progress));
          (d.mesh.material as THREE.MeshBasicMaterial).color.setHex(
            isLeak && d.id === "zone-b" ? 0xfda4af : 0x7dd3fc
          );
        });
      }

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
      className="relative w-full h-[420px] md:h-[470px] bg-gradient-to-br from-[#020611] via-[#041426] to-[#030816] rounded-2xl overflow-hidden border border-sky-500/30 shadow-2xl"
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        title="Click campus zones or drag to inspect water pipelines and sensors"
      />

      {/* Top Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-sky-500/30 text-xs font-mono">
          <Droplets className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-sky-300 font-semibold uppercase text-[10px] sm:text-xs">
            Campus Water Twin <span className="text-slate-400 font-normal hidden sm:inline">(Synthetic Telemetry)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              setSimulateLeak((p) => !p);
              setSelectedId("zone-b");
            }}
            className={`px-2.5 py-1.5 rounded-lg border text-[10px] sm:text-xs font-mono flex items-center gap-1 transition-colors ${
              simulateLeak
                ? "bg-rose-500/20 border-rose-400/50 text-rose-300"
                : "bg-slate-950/85 border-white/10 text-slate-300 hover:border-rose-400/40"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{simulateLeak ? "Clear Leak Sim" : "Simulate Leak (Zone B)"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRotating((p) => !p)}
            className="p-1.5 rounded-lg bg-slate-950/85 border border-white/10 text-slate-300 hover:text-sky-400"
            aria-label="Toggle 3D rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Zone Inspector */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md z-10 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-sky-500/30 shadow-xl space-y-2">
        <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
          <span className="text-sky-300 font-bold flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" />
            {activeZone.name}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-sky-500/10 text-sky-300 border border-sky-500/20">
            Sample Data
          </span>
        </div>

        <div className="space-y-1">
          <div className={`text-xs sm:text-sm font-mono font-bold ${simulateLeak && activeZone.id === "zone-b" ? "text-rose-300" : "text-white"}`}>
            {simulateLeak ? activeZone.leakFlow : activeZone.normalFlow}
          </div>
          <div className="text-[11px] font-mono text-emerald-300">{activeZone.catboost72h}</div>
          <p className="text-[11px] text-slate-400 leading-snug">{activeZone.modelNote}</p>
        </div>

        <div className="flex flex-wrap gap-1 pt-1 border-t border-white/10">
          {CAMPUS_ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => setSelectedId(z.id)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                selectedId === z.id
                  ? "bg-sky-500 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-300 hover:text-sky-300 border border-white/10"
              }`}
            >
              {z.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-2">
          <Droplets className="w-8 h-8 text-sky-400" />
          <h4 className="text-sm font-bold text-white">AquaGuard AI Campus Water Twin (Synthetic)</h4>
          <p className="text-xs text-slate-300 max-w-sm">
            Models overhead campus storage, Zone A/B/C distribution pipelines, One-Class SVM anomaly detection, XGBoost leak identification, and CatBoost 72h demand forecasting.
          </p>
        </div>
      )}
    </div>
  );
}

