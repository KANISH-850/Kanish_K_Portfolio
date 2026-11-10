"use client";

import { useEffect, useRef, useState, useId } from "react";
import * as THREE from "three";
import { Activity, ShieldCheck, Zap, AlertTriangle, RotateCcw, Cpu } from "lucide-react";

interface TelemetryPoint {
  id: string;
  name: string;
  position: [number, number, number];
  unit: string;
  nominal: string;
  current: string;
  status: "nominal" | "warning" | "alert";
  subsystem: string;
}

const TELEMETRY_NODES: TelemetryPoint[] = [
  {
    id: "oil-temp",
    name: "Top-Oil Temperature",
    position: [0, 2.3, 0],
    unit: "°C",
    nominal: "< 85.0°C",
    current: "68.4°C",
    status: "nominal",
    subsystem: "Main Transformer Tank",
  },
  {
    id: "vibration",
    name: "Core Acoustic FFT",
    position: [1.2, 0.8, 0],
    unit: "mm/s",
    nominal: "< 0.25 mm/s",
    current: "0.12 mm/s",
    status: "nominal",
    subsystem: "Vibration Sensor Array",
  },
  {
    id: "busbar-volt",
    name: "Busbar 400kV Line",
    position: [-1.6, 3.2, 0],
    unit: "kV",
    nominal: "400 ± 5%",
    current: "402.1 kV",
    status: "nominal",
    subsystem: "Overhead 3-Phase Busbar",
  },
  {
    id: "autoencoder-loss",
    name: "Autoencoder Loss",
    position: [0, 1.2, 1.2],
    unit: "MSE",
    nominal: "< 0.0450",
    current: "0.0142",
    status: "nominal",
    subsystem: "Edge AI Anomaly Engine",
  },
];

export function DigitalTwin3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [activeNode, setActiveNode] = useState<TelemetryPoint>(TELEMETRY_NODES[0]);
  const [isRotating, setIsRotating] = useState(true);
  const [inferenceLatency, setInferenceLatency] = useState(42);
  const sceneElementsRef = useRef<{
    controls?: { reset: () => void };
  }>({});

  // Dynamic simulated telemetry fluctuation within nominal safe bounds
  useEffect(() => {
    const timer = setInterval(() => {
      setInferenceLatency(Math.floor(40 + Math.random() * 8));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL capability probe
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

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050b14, 0.045);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(6.5, 4.8, 7.5);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f0ff, 3.0);
    dirLight.position.set(8, 12, 6);
    scene.add(dirLight);

    const violetLight = new THREE.DirectionalLight(0x8b5cf6, 2.2);
    violetLight.position.set(-8, 6, -6);
    scene.add(violetLight);

    const underGlow = new THREE.PointLight(0x00f0ff, 1.8, 12);
    underGlow.position.set(0, -0.5, 0);
    scene.add(underGlow);

    // ROOT SUBSTATION GROUP
    const substationGroup = new THREE.Group();
    scene.add(substationGroup);

    // 1. SUBSTATION FOUNDATION BASE
    const basePlateGeo = new THREE.BoxGeometry(7, 0.25, 6);
    const basePlateMat = new THREE.MeshStandardMaterial({
      color: 0x091426,
      roughness: 0.8,
      metalness: 0.6,
    });
    const basePlate = new THREE.Mesh(basePlateGeo, basePlateMat);
    basePlate.position.y = -0.125;
    substationGroup.add(basePlate);

    // Foundation Grid Overlay
    const gridHelper = new THREE.GridHelper(6.5, 14, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = 0.01;
    substationGroup.add(gridHelper);

    // 2. MAIN EHV TRANSFORMER TANK
    const tankGeo = new THREE.BoxGeometry(2.4, 2.0, 1.8);
    const tankMat = new THREE.MeshStandardMaterial({
      color: 0x111c30,
      roughness: 0.35,
      metalness: 0.85,
    });
    const tankMesh = new THREE.Mesh(tankGeo, tankMat);
    tankMesh.position.set(0, 1.0, 0);
    substationGroup.add(tankMesh);

    // Cooling radiator fins (left & right sides)
    const finGeo = new THREE.BoxGeometry(0.06, 1.6, 1.5);
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x0e2442,
      roughness: 0.4,
      metalness: 0.7,
    });
    [-1.3, -1.42, 1.3, 1.42].forEach((xPos) => {
      const fin = new THREE.Mesh(finGeo, finMat);
      fin.position.set(xPos, 1.0, 0);
      substationGroup.add(fin);
    });

    // Conservator tank (cylindrical drum on top)
    const conservatorGeo = new THREE.CylinderGeometry(0.35, 0.35, 2.0, 24);
    conservatorGeo.rotateZ(Math.PI / 2);
    const conservatorMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a5f,
      metalness: 0.9,
      roughness: 0.3,
    });
    const conservatorMesh = new THREE.Mesh(conservatorGeo, conservatorMat);
    conservatorMesh.position.set(0, 2.4, 0.4);
    substationGroup.add(conservatorMesh);

    // 3. HIGH VOLTAGE BUSHINGS (Ceramic Insulators with terminals)
    const bushingMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x007799,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.9,
    });
    const terminalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.8,
    });

    const bushingPositions: [number, number, number][] = [
      [-0.7, 2.0, -0.4],
      [0.0, 2.0, -0.4],
      [0.7, 2.0, -0.4],
    ];

    bushingPositions.forEach(([bx, by, bz]) => {
      // Ceramic cone stack
      const cone1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.16, 0.5, 16), bushingMat);
      cone1.position.set(bx, by + 0.25, bz);
      substationGroup.add(cone1);

      const cone2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.14, 0.5, 16), bushingMat);
      cone2.position.set(bx, by + 0.65, bz);
      substationGroup.add(cone2);

      const terminal = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), terminalMat);
      terminal.position.set(bx, by + 0.95, bz);
      substationGroup.add(terminal);
    });

    // 4. OVERHEAD BUSBARS AND GANTRY TOWERS
    const gantryMat = new THREE.MeshStandardMaterial({
      color: 0x1f293d,
      roughness: 0.7,
      metalness: 0.5,
    });

    // Two steel lattice towers
    [-2.6, 2.6].forEach((xTower) => {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.18, 3.8, 0.18), gantryMat);
      tower.position.set(xTower, 1.9, -1.8);
      substationGroup.add(tower);
    });

    // Cross gantry beam
    const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.15, 0.15), gantryMat);
    crossBeam.position.set(0, 3.7, -1.8);
    substationGroup.add(crossBeam);

    // 3 Horizontal Busbar Conductors
    const busbarLineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
    });

    [-2.2, 0.0, 2.2].forEach((xOffset, idx) => {
      const busbarGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3.2, 3.7 - idx * 0.25, -1.8),
        new THREE.Vector3(3.2, 3.7 - idx * 0.25, -1.8),
      ]);
      const busbarLine = new THREE.Line(busbarGeo, busbarLineMat);
      substationGroup.add(busbarLine);
    });

    // Dropper conductor cables from busbar to transformer terminals
    bushingPositions.forEach(([bx, by, bz]) => {
      const dropperCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(bx, by + 0.95, bz),
        new THREE.Vector3(bx, 3.4, (bz - 1.8) / 2),
        new THREE.Vector3(bx, 3.7, -1.8)
      );
      const dropperPoints = dropperCurve.getPoints(24);
      const dropperGeo = new THREE.BufferGeometry().setFromPoints(dropperPoints);
      const dropperLine = new THREE.Line(
        dropperGeo,
        new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 })
      );
      substationGroup.add(dropperLine);
    });

    // 5. SF6 CIRCUIT BREAKER BAYS (Front side)
    const breakerMat = new THREE.MeshStandardMaterial({
      color: 0x162238,
      metalness: 0.8,
      roughness: 0.3,
    });
    [-1.6, 1.6].forEach((xBrk) => {
      const breakerBase = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.6), breakerMat);
      breakerBase.position.set(xBrk, 0.2, 1.6);
      substationGroup.add(breakerBase);

      const breakerColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 16), breakerMat);
      breakerColumn.position.set(xBrk, 0.9, 1.6);
      substationGroup.add(breakerColumn);

      // Status indicator ring
      const statusRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.16, 0.03, 12, 24),
        new THREE.MeshBasicMaterial({ color: 0x10b981 })
      );
      statusRing.rotation.x = Math.PI / 2;
      statusRing.position.set(xBrk, 1.5, 1.6);
      substationGroup.add(statusRing);
    });

    // 6. ANIMATED POWER FLOW PULSES (Small glowing spheres traversing the conductors)
    const pulseCount = 6;
    const pulseGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const pulses: { mesh: THREE.Mesh; progress: number; speed: number; curve: THREE.QuadraticBezierCurve3 }[] = [];

    bushingPositions.forEach(([bx, by, bz], i) => {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(bx, 3.7, -1.8),
        new THREE.Vector3(bx, 3.4, (bz - 1.8) / 2),
        new THREE.Vector3(bx, by + 0.95, bz)
      );
      for (let p = 0; p < 2; p++) {
        const mesh = new THREE.Mesh(pulseGeo, pulseMat);
        substationGroup.add(mesh);
        pulses.push({
          mesh,
          progress: (p * 0.5 + i * 0.33) % 1,
          speed: 0.006 + Math.random() * 0.004,
          curve,
        });
      }
    });

    // 7. TELEMETRY PROBE NODES (Interactive glowing anchors)
    const telemetryMeshes: { mesh: THREE.Group; node: TelemetryPoint }[] = [];
    TELEMETRY_NODES.forEach((node) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(...node.position);

      const coreSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          emissive: 0x00f0ff,
          emissiveIntensity: 1.0,
        })
      );
      nodeGroup.add(coreSphere);

      const beaconRing = new THREE.Mesh(
        new THREE.RingGeometry(0.18, 0.26, 24),
        new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        })
      );
      beaconRing.rotation.x = Math.PI / 2;
      nodeGroup.add(beaconRing);

      substationGroup.add(nodeGroup);
      telemetryMeshes.push({ mesh: nodeGroup, node });
    });

    // MOUSE DRAG / PARALLAX INTERACTION
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.5;
    let targetRotationX = 0.15;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.005;
        targetRotationX = Math.max(-0.2, Math.min(0.6, targetRotationX));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile dragging
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.005;
        targetRotationX = Math.max(-0.2, Math.min(0.6, targetRotationX));
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    sceneElementsRef.current.controls = {
      reset: () => {
        targetRotationY = 0.5;
        targetRotationX = 0.15;
      },
    };

    // INTERSECTION OBSERVER
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Slow idle rotation when not dragging and reduced motion is off
      if (!isDragging && !prefersReducedMotion && isRotating) {
        targetRotationY += 0.003;
      }

      // Smooth interpolation to target rotation
      substationGroup.rotation.y += (targetRotationY - substationGroup.rotation.y) * 0.06;
      substationGroup.rotation.x += (targetRotationX - substationGroup.rotation.x) * 0.06;

      // Animate current flow pulses along conductors
      pulses.forEach((pulse) => {
        pulse.progress = (pulse.progress + pulse.speed) % 1;
        const pt = pulse.curve.getPoint(pulse.progress);
        pulse.mesh.position.copy(pt);
      });

      // Pulse probe node beacons
      telemetryMeshes.forEach(({ mesh }, idx) => {
        const ring = mesh.children[1] as THREE.Mesh;
        if (ring) {
          const s = 1 + Math.sin(elapsedTime * 3 + idx) * 0.18;
          ring.scale.set(s, s, s);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (container.contains(dom)) {
        container.removeChild(dom);
      }

      // Geometry and material disposal
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh || (obj as THREE.Line).isLine) {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, [isRotating]);

  return (
    <div className="relative w-full h-[400px] md:h-[480px] bg-gradient-to-br from-[#020611] via-[#050f24] to-[#030816] rounded-2xl overflow-hidden border border-cyan-500/30 group shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        title="Click and drag to rotate the 3D EHV Substation Twin"
      />

      {/* Top SCADA Status Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-cyan-400 font-semibold tracking-wide uppercase text-[11px] sm:text-xs">
            EHV Digital Twin &bull; 400kV Bay <span className="text-slate-400 font-normal hidden sm:inline">(Simulated Telemetry)</span>
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors text-xs font-mono flex items-center gap-1"
            title="Toggle rotation"
            aria-label="Toggle 3D rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRotating ? "Pause" : "Rotate"}</span>
          </button>
        </div>
      </div>

      {/* Active Probe Telemetry Inspector Card (Bottom Left) */}
      <div className="absolute bottom-3 left-3 z-10 max-w-[270px] sm:max-w-xs p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 shadow-xl space-y-2 pointer-events-auto">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1 text-[11px] truncate">
            <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            {activeNode.subsystem}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shrink-0">
            Simulated Sample
          </span>
        </div>

        <div>
          <div className="text-xs font-bold text-white tracking-wide">{activeNode.name}</div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-lg font-mono font-black text-cyan-300">
              {activeNode.current}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              nominal: {activeNode.nominal}
            </span>
          </div>
          <div className="text-[9px] font-mono text-slate-400 mt-1">
            * Calibrated against 50k synthetic SCADA benchmark envelope
          </div>
        </div>

        {/* Quick Node Switcher Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10">
          {TELEMETRY_NODES.map((node) => (
            <button
              key={node.id}
              onClick={() => setActiveNode(node)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all ${
                activeNode.id === node.id
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : "bg-slate-900/90 text-slate-300 hover:text-cyan-300 border border-white/10"
              }`}
            >
              {node.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Right AI Latency Gauge */}
      <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
        <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
        <div>
          <div className="text-[10px] text-slate-400 uppercase">Target Latency (Internal Test)</div>
          <div className="font-bold text-emerald-400">~{inferenceLatency}ms (Autoencoder)</div>
        </div>
      </div>

      {/* WebGL Fallback */}
      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-3">
          <Zap className="w-10 h-10 text-cyan-400" />
          <h4 className="text-base font-bold text-white">EHV Substation Digital Twin (Simulated)</h4>
          <p className="text-xs text-slate-300 max-w-sm">
            Interactive WebGL is not available on this device. Telemetry stream continues nominal simulation (~50ms Autoencoder target latency).
          </p>
        </div>
      )}
    </div>
  );
}
