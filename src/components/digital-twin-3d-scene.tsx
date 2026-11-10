"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Activity, Cpu, RotateCcw, Zap, AlertTriangle } from "lucide-react";

interface SubstationComponent {
  id: "transformer" | "breaker" | "isolator" | "busbar" | "sensor";
  name: string;
  subsystem: string;
  role: string;
  nominal: string;
  simulatedNormal: string;
  simulatedWarning: string;
  unit: string;
  focusPos: [number, number, number];
}

const SUBSTATION_COMPONENTS: SubstationComponent[] = [
  {
    id: "transformer",
    name: "400kV Power Transformer",
    subsystem: "Main Tank & Cooling Radiators",
    role: "Steps down EHV transmission voltage; monitored for top-oil thermal rise and winding hotspots.",
    nominal: "< 85.0 °C",
    simulatedNormal: "68.4 °C",
    simulatedWarning: "91.2 °C (Thermal Drift)",
    unit: "Top-Oil Temp",
    focusPos: [0, 1.3, 0],
  },
  {
    id: "breaker",
    name: "SF6 Circuit Breaker Bay",
    subsystem: "3-Pole Interrupter Columns",
    role: "Interrupts fault currents within cycles; monitors SF6 gas density and trip-coil readiness.",
    nominal: "0.62–0.68 MPa",
    simulatedNormal: "0.65 MPa (Closed)",
    simulatedWarning: "0.58 MPa (Low Pressure)",
    unit: "SF6 Gas",
    focusPos: [0, 1.1, 2.0],
  },
  {
    id: "isolator",
    name: "Motorized Isolator Switch",
    subsystem: "Center-Break Disconnects",
    role: "Provides visible air-gap isolation during maintenance windows after breaker opening.",
    nominal: "Locked / Closed",
    simulatedNormal: "Closed (Nominal)",
    simulatedWarning: "Contact Temp +14°C",
    unit: "Switch State",
    focusPos: [-1.8, 1.3, 1.0],
  },
  {
    id: "busbar",
    name: "400kV Busbar & Insulators",
    subsystem: "Gantry Towers & Ceramic Strings",
    role: "Distributes 3-phase power across bays via ribbed porcelain suspension insulators.",
    nominal: "400 kV ± 5%",
    simulatedNormal: "402.1 kV",
    simulatedWarning: "381.4 kV (Sag)",
    unit: "Line Voltage",
    focusPos: [0, 3.4, -1.9],
  },
  {
    id: "sensor",
    name: "CT/PT Sensors & Digital Twin Rack",
    subsystem: "Edge Autoencoder Inference",
    role: "Samples multi-variate telemetry to compute reconstruction error in the digital twin.",
    nominal: "MSE < 0.045",
    simulatedNormal: "MSE 0.0142",
    simulatedWarning: "MSE 0.0784 (Anomaly)",
    unit: "Autoencoder Score",
    focusPos: [2.2, 1.0, 0.7],
  },
];

export function DigitalTwin3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [selectedId, setSelectedId] = useState<SubstationComponent["id"]>("transformer");
  const [isRotating, setIsRotating] = useState(true);
  const [simulateFault, setSimulateFault] = useState(false);

  const selectedRef = useRef(selectedId);
  selectedRef.current = selectedId;
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;
  const faultRef = useRef(simulateFault);
  faultRef.current = simulateFault;

  const activeComponent =
    SUBSTATION_COMPONENTS.find((c) => c.id === selectedId) || SUBSTATION_COMPONENTS[0];

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
    scene.fog = new THREE.FogExp2(0x030816, 0.038);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(6.8, 4.9, 7.6);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0x1e293b, 2.2));
    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.8);
    keyLight.position.set(8, 12, 7);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-8, 6, -6);
    scene.add(rimLight);
    const accentLight = new THREE.PointLight(0x8b5cf6, 1.5, 14);
    accentLight.position.set(3, 3, 3);
    scene.add(accentLight);

    const root = new THREE.Group();
    scene.add(root);

    // Base foundation pad + perimeter posts
    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(7.6, 0.22, 6.4),
      new THREE.MeshStandardMaterial({ color: 0x0b1528, roughness: 0.85, metalness: 0.35 })
    );
    pad.position.y = -0.11;
    root.add(pad);

    const grid = new THREE.GridHelper(7.2, 16, 0x0ea5e9, 0x1e293b);
    grid.position.y = 0.01;
    root.add(grid);

    const postMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.4 });
    [
      [-3.5, -2.9], [0, -2.9], [3.5, -2.9],
      [-3.5, 2.9], [3.5, 2.9],
      [-3.5, 0], [3.5, 0],
    ].forEach(([px, pz]) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.65, 8), postMat);
      post.position.set(px, 0.32, pz);
      root.add(post);
    });

    // Helper to tag interactive meshes with componentId
    const clickableMeshes: THREE.Object3D[] = [];
    const componentGroups: Record<string, THREE.Group> = {};
    const registerGroup = (id: SubstationComponent["id"], group: THREE.Group) => {
      group.userData.componentId = id;
      group.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.userData.componentId = id;
          clickableMeshes.push(child);
        }
      });
      componentGroups[id] = group;
      root.add(group);
    };

    // 1. MAIN 400kV POWER TRANSFORMER
    const transformerGroup = new THREE.Group();
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.35 });
    const radiatorMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.75, roughness: 0.4 });
    const porcelainMat = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, metalness: 0.2, roughness: 0.25 });

    const mainTank = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.75, 1.6), steelMat);
    mainTank.position.set(0, 0.9, 0);
    transformerGroup.add(mainTank);

    // Cooling radiator banks on left & right
    [-1.28, -1.42, 1.28, 1.42].forEach((xFin) => {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.35, 1.25), radiatorMat);
      fin.position.set(xFin, 0.9, 0);
      transformerGroup.add(fin);
    });

    // Overhead oil conservator drum
    const conservatorGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.75, 20);
    conservatorGeo.rotateZ(Math.PI / 2);
    const conservator = new THREE.Mesh(
      conservatorGeo,
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.3 })
    );
    conservator.position.set(0, 2.2, 0.42);
    transformerGroup.add(conservator);

    // 3 Ribbed porcelain HV bushings
    const bushingXs = [-0.65, 0, 0.65];
    bushingXs.forEach((bx) => {
      for (let s = 0; s < 4; s++) {
        const skirt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08 - s * 0.008, 0.14 - s * 0.012, 0.18, 14),
          porcelainMat
        );
        skirt.position.set(bx, 1.88 + s * 0.2, -0.38);
        transformerGroup.add(skirt);
      }
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, emissive: 0x00f0ff, emissiveIntensity: 0.5 })
      );
      cap.position.set(bx, 2.7, -0.38);
      transformerGroup.add(cap);
    });
    registerGroup("transformer", transformerGroup);

    // 2. SF6 CIRCUIT BREAKER BAY (Front Z = +2.0)
    const breakerGroup = new THREE.Group();
    const cabinet = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.48, 0.52), steelMat);
    cabinet.position.set(0, 0.26, 2.0);
    breakerGroup.add(cabinet);

    const statusLedMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    bushingXs.forEach((bx) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 1.15, 14), porcelainMat);
      col.position.set(bx, 1.05, 2.0);
      breakerGroup.add(col);

      const tHead = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.16, 0.42), steelMat);
      tHead.position.set(bx, 1.68, 2.0);
      breakerGroup.add(tHead);

      const ledRing = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 10, 20), statusLedMat);
      ledRing.rotation.x = Math.PI / 2;
      ledRing.position.set(bx, 1.52, 2.0);
      breakerGroup.add(ledRing);
    });
    registerGroup("breaker", breakerGroup);

    // 3. MOTORIZED ISOLATOR BAY (Left X = -2.1, Z = 1.0)
    const isolatorGroup = new THREE.Group();
    const isoFrame = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55, 1.7), steelMat);
    isoFrame.position.set(-2.15, 0.28, 1.0);
    isolatorGroup.add(isoFrame);
    [-0.55, 0.55].forEach((zOff) => {
      const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.05, 12), porcelainMat);
      stack.position.set(-2.15, 1.05, 1.0 + zOff);
      isolatorGroup.add(stack);
    });
    const switchArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.05, 1.1),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.2 })
    );
    switchArm.position.set(-2.15, 1.62, 1.0);
    isolatorGroup.add(switchArm);
    registerGroup("isolator", isolatorGroup);

    // 4. OVERHEAD GANTRY TOWERS, INSULATORS & 400kV BUSBARS (Rear Z = -1.9)
    const busbarGroup = new THREE.Group();
    [-2.7, 2.7].forEach((tx) => {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.8, 0.22), steelMat);
      tower.position.set(tx, 1.9, -1.9);
      busbarGroup.add(tower);
    });
    const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.16, 0.18), steelMat);
    crossBeam.position.set(0, 3.65, -1.9);
    busbarGroup.add(crossBeam);

    const conductorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    [-0.18, 0, 0.18].forEach((yOff, idx) => {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 6.2, 8), conductorMat);
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, 3.45 - idx * 0.16, -1.9 + yOff);
      busbarGroup.add(bar);
    });

    // Dropper curves connecting busbar -> transformer -> breaker
    const flowCurves: THREE.CatmullRomCurve3[] = [];
    bushingXs.forEach((bx, idx) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(bx, 3.45 - idx * 0.16, -1.9),
        new THREE.Vector3(bx, 3.1, -1.1),
        new THREE.Vector3(bx, 2.7, -0.38),
        new THREE.Vector3(bx, 2.2, 0.9),
        new THREE.Vector3(bx, 1.72, 2.0),
      ]);
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 24, 0.022, 6, false),
        new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.75 })
      );
      busbarGroup.add(tube);
      flowCurves.push(curve);
    });
    registerGroup("busbar", busbarGroup);

    // 5. CT/PT MONITORING SENSORS + DIGITAL TWIN RACK (Right X = +2.3, Z = 0.7)
    const sensorGroup = new THREE.Group();
    const rack = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 1.45, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.3 })
    );
    rack.position.set(2.3, 0.75, 0.7);
    sensorGroup.add(rack);

    // CanvasTexture mini monitoring screen on the Digital Twin rack
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 256;
    screenCanvas.height = 160;
    const sCtx = screenCanvas.getContext("2d");
    const screenTex = new THREE.CanvasTexture(screenCanvas);
    const drawMiniHud = (fault: boolean) => {
      if (!sCtx) return;
      sCtx.fillStyle = "#030712";
      sCtx.fillRect(0, 0, 256, 160);
      sCtx.strokeStyle = fault ? "#f59e0b" : "#22d3ee";
      sCtx.lineWidth = 3;
      sCtx.strokeRect(4, 4, 248, 152);
      sCtx.fillStyle = fault ? "#fbbf24" : "#22d3ee";
      sCtx.font = "bold 18px monospace";
      sCtx.fillText("DIGITAL TWIN HUD", 16, 32);
      sCtx.fillStyle = "#e2e8f0";
      sCtx.font = "14px monospace";
      sCtx.fillText(fault ? "STATE: ANOMALY SIM" : "STATE: NOMINAL", 16, 62);
      sCtx.fillText(fault ? "MSE: 0.0784" : "MSE: 0.0142", 16, 86);
      // Waveform bars
      sCtx.fillStyle = fault ? "#f59e0b" : "#10b981";
      for (let i = 0; i < 14; i++) {
        const h = fault ? 20 + ((i * 19) % 35) : 12 + ((i * 7) % 18);
        sCtx.fillRect(16 + i * 16, 140 - h, 10, h);
      }
      screenTex.needsUpdate = true;
    };
    drawMiniHud(false);

    const hudPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(0.56, 0.36),
      new THREE.MeshBasicMaterial({ map: screenTex })
    );
    hudPlane.position.set(2.3, 1.1, 0.985);
    sensorGroup.add(hudPlane);

    // Sensor beacon ring on transformer & rack
    const sensorRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide });
    const sensorBeacon = new THREE.Mesh(new THREE.RingGeometry(0.18, 0.25, 24), sensorRingMat);
    sensorBeacon.rotation.x = Math.PI / 2;
    sensorBeacon.position.set(2.3, 1.55, 0.7);
    sensorGroup.add(sensorBeacon);
    registerGroup("sensor", sensorGroup);

    // Selection Highlight Ring (tracks active component)
    const selectRing = new THREE.Mesh(
      new THREE.RingGeometry(0.55, 0.65, 32),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
    );
    selectRing.rotation.x = -Math.PI / 2;
    selectRing.position.set(0, 0.05, 0);
    root.add(selectRing);

    // Animated energy pulses along transmission curves
    const pulseGeo = new THREE.SphereGeometry(0.055, 10, 10);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const pulses: { mesh: THREE.Mesh; progress: number; speed: number; curve: THREE.CatmullRomCurve3 }[] = [];
    flowCurves.forEach((curve, idx) => {
      for (let p = 0; p < 2; p++) {
        const mesh = new THREE.Mesh(pulseGeo, pulseMat);
        root.add(mesh);
        pulses.push({ mesh, progress: (p * 0.5 + idx * 0.2) % 1, speed: 0.0055, curve });
      }
    });

    // Pointer drag + click raycasting
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isDragging = false;
    let movedDist = 0;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0.45;
    let targetRotX = 0.14;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      movedDist = 0;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      movedDist += Math.abs(dx) + Math.abs(dy);
      targetRotY += dx * 0.008;
      targetRotX = Math.max(-0.15, Math.min(0.55, targetRotX + dy * 0.005));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      if (movedDist < 6) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(clickableMeshes, false);
        if (hits.length > 0 && hits[0].object.userData.componentId) {
          setSelectedId(hits[0].object.userData.componentId);
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
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
    let lastFault = false;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      if (!isDragging && !prefersReducedMotion && isRotatingRef.current) {
        targetRotY += 0.0025;
      }

      root.rotation.y += (targetRotY - root.rotation.y) * 0.08;
      root.rotation.x += (targetRotX - root.rotation.x) * 0.08;

      if (faultRef.current !== lastFault) {
        lastFault = faultRef.current;
        drawMiniHud(lastFault);
        statusLedMat.color.setHex(lastFault ? 0xf59e0b : 0x10b981);
        pulseMat.color.setHex(lastFault ? 0xf59e0b : 0x22d3ee);
        sensorRingMat.color.setHex(lastFault ? 0xf59e0b : 0x00f0ff);
      }

      // Position highlight ring under selected component
      const activeMeta = SUBSTATION_COMPONENTS.find((c) => c.id === selectedRef.current);
      if (activeMeta) {
        selectRing.position.set(activeMeta.focusPos[0], 0.04, activeMeta.focusPos[2]);
        const pulseScale = 1 + Math.sin(t * 3) * 0.06;
        selectRing.scale.set(pulseScale, pulseScale, 1);
      }

      if (!prefersReducedMotion) {
        pulses.forEach((p) => {
          p.progress = (p.progress + p.speed) % 1;
          p.mesh.position.copy(p.curve.getPoint(p.progress));
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      if (container.contains(dom)) container.removeChild(dom);
      screenTex.dispose();
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
      className="relative w-full h-[420px] md:h-[490px] bg-gradient-to-br from-[#020611] via-[#050f24] to-[#030816] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl"
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        title="Drag to rotate or click electrical components to inspect"
      />

      {/* Top Status & Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-xs font-mono">
          <span className={`h-2 w-2 rounded-full ${simulateFault ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
          <span className="text-cyan-300 font-semibold uppercase text-[10px] sm:text-xs">
            400kV EHV Twin <span className="text-slate-400 font-normal hidden sm:inline">(Simulated Demo)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => setSimulateFault((prev) => !prev)}
            className={`px-2.5 py-1.5 rounded-lg border text-[10px] sm:text-xs font-mono flex items-center gap-1 transition-colors ${
              simulateFault
                ? "bg-amber-500/20 border-amber-400/50 text-amber-300"
                : "bg-slate-950/85 border-white/10 text-slate-300 hover:border-amber-400/40"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{simulateFault ? "Reset Nominal" : "Simulate Fault"}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRotating((prev) => !prev)}
            className="p-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors text-xs font-mono flex items-center gap-1"
            aria-label="Toggle 3D rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRotating ? "Pause" : "Rotate"}</span>
          </button>
        </div>
      </div>

      {/* Bottom Inspector Card */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm z-10 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 shadow-xl space-y-2">
        <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
          <span className="text-slate-400 flex items-center gap-1 truncate">
            <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            {activeComponent.subsystem}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border shrink-0 ${
              simulateFault
                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                : "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
            }`}
          >
            {simulateFault ? "Simulated Fault" : "Simulated Nominal"}
          </span>
        </div>

        <div>
          <div className="text-xs font-bold text-white">{activeComponent.name}</div>
          <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{activeComponent.role}</p>
          <div className="flex items-baseline gap-2 mt-1.5 font-mono">
            <span className={`text-sm font-bold ${simulateFault ? "text-amber-300" : "text-cyan-300"}`}>
              {simulateFault ? activeComponent.simulatedWarning : activeComponent.simulatedNormal}
            </span>
            <span className="text-[10px] text-slate-400">Nominal: {activeComponent.nominal}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-white/10">
          {SUBSTATION_COMPONENTS.map((comp) => (
            <button
              key={comp.id}
              type="button"
              onClick={() => setSelectedId(comp.id)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                selectedId === comp.id
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-300 hover:text-cyan-300 border border-white/10"
              }`}
            >
              {comp.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Right Pipeline Cue */}
      <div className="absolute bottom-3 right-3 z-10 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
        <Cpu className="w-4 h-4 text-cyan-400" />
        <div>
          <div className="text-slate-400 uppercase">Click 3D Equipment</div>
          <div className="font-bold text-emerald-400">Physical &rarr; Sensor &rarr; Twin</div>
        </div>
      </div>

      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-3">
          <Zap className="w-10 h-10 text-cyan-400" />
          <h4 className="text-base font-bold text-white">EHV Substation Digital Twin (Simulated)</h4>
          <p className="text-xs text-slate-300 max-w-sm">
            WebGL is unavailable on this device. Architecture models 400kV transformer, SF6 breakers, isolators, busbars, and autoencoder monitoring.
          </p>
        </div>
      )}
    </div>
  );
}
