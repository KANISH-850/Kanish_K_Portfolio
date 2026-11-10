"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Server, Shield, Wifi, HardDrive, RotateCcw, Cpu } from "lucide-react";

interface KioskComponentInfo {
  id: string;
  name: string;
  category: string;
  detail: string;
  status: string;
  position: [number, number, number];
}

const KIOSK_COMPONENTS: KioskComponentInfo[] = [
  {
    id: "touchscreen",
    name: "Interactive Touch Panel",
    category: "Display & User I/O",
    detail: "Full HD capacitive touch with multilingual audio-visual guide",
    status: "Active & Calibrated",
    position: [0, 1.8, 0.4],
  },
  {
    id: "scanner",
    name: "Document Scanner Slot",
    category: "Civic Ingestion Peripheral",
    detail: "Automated identity & application paper feeder with OCR prep",
    status: "Ready",
    position: [0, 1.25, 0.35],
  },
  {
    id: "printer",
    name: "Thermal Receipt Unit",
    category: "Transaction Outflow",
    detail: "High-speed thermal printer with paper-end telemetry sensors",
    status: "Online (Paper OK)",
    position: [0, 0.85, 0.35],
  },
  {
    id: "tunnel",
    name: "Reverse WSS Tunnel Agent",
    category: "Fleet Edge Telemetry",
    detail: "Proposed TLS tunnel + SQLite local buffer architecture specification",
    status: "Heartbeat Synced",
    position: [0, 0.3, 0],
  },
];

export function Kiosk3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [activeComponent, setActiveComponent] = useState<KioskComponentInfo>(KIOSK_COMPONENTS[0]);
  const [isRotating, setIsRotating] = useState(true);
  const [heartbeatCount, setHeartbeatCount] = useState(14820);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeartbeatCount((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060515, 0.05);

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(4.8, 3.2, 5.8);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x130d29, 2.8);
    scene.add(ambientLight);

    const purpleDir = new THREE.DirectionalLight(0xa855f7, 3.5);
    purpleDir.position.set(6, 10, 5);
    scene.add(purpleDir);

    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 2.0);
    cyanRim.position.set(-6, 5, -5);
    scene.add(cyanRim);

    const pedestalGlow = new THREE.PointLight(0xa855f7, 2.2, 8);
    pedestalGlow.position.set(0, -0.2, 0);
    scene.add(pedestalGlow);

    // ROOT KIOSK GROUP
    const kioskGroup = new THREE.Group();
    scene.add(kioskGroup);

    // 1. BASE STAND & PEDESTAL
    const baseGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.18, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x130f26,
      roughness: 0.7,
      metalness: 0.6,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.09;
    kioskGroup.add(baseMesh);

    // Ambient glow ring around base
    const baseGlowRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.45, 0.03, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0xa855f7 })
    );
    baseGlowRing.rotation.x = Math.PI / 2;
    baseGlowRing.position.y = 0.12;
    kioskGroup.add(baseGlowRing);

    // Pedestal Pillar
    const pillarGeo = new THREE.BoxGeometry(0.8, 1.4, 0.6);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x1a1532,
      roughness: 0.4,
      metalness: 0.8,
    });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(0, 0.8, 0);
    kioskGroup.add(pillar);

    // 2. KIOSK MAIN HEAD CHASSIS (Angled Upper Unit)
    const chassisGeo = new THREE.BoxGeometry(1.2, 1.3, 0.45);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x0f0b20,
      roughness: 0.3,
      metalness: 0.9,
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.set(0, 1.9, 0.05);
    chassis.rotation.x = -0.18; // angled upward toward eye-level
    kioskGroup.add(chassis);

    // 3. CAPACITIVE TOUCHSCREEN DISPLAY
    const screenGeo = new THREE.PlaneGeometry(0.95, 0.65);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0b1329,
      emissive: 0x1d2e5c,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.95,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 2.05, 0.29);
    screen.rotation.x = -0.18;
    kioskGroup.add(screen);

    // Screen UI Accent line
    const screenUiLine = new THREE.Mesh(
      new THREE.PlaneGeometry(0.85, 0.04),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff })
    );
    screenUiLine.position.set(0, 2.22, 0.295);
    screenUiLine.rotation.x = -0.18;
    kioskGroup.add(screenUiLine);

    // 4. UPPER CAMERA / PROXIMITY SENSOR
    const cameraBezel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.03, 16),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    cameraBezel.rotation.x = Math.PI / 2 - 0.18;
    cameraBezel.position.set(0, 2.45, 0.22);
    kioskGroup.add(cameraBezel);

    // 5. PERIPHERALS: SCANNER & PRINTER SLOTS
    // Scanner slot
    const scannerSlot = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.05, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x05040a, roughness: 0.9 })
    );
    scannerSlot.position.set(0, 1.48, 0.28);
    scannerSlot.rotation.x = -0.18;
    kioskGroup.add(scannerSlot);

    // Scanner illuminated guide light
    const scannerGuide = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.015, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    scannerGuide.position.set(0, 1.52, 0.29);
    scannerGuide.rotation.x = -0.18;
    kioskGroup.add(scannerGuide);

    // Receipt printer slot
    const printerSlot = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.03, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x05040a, roughness: 0.9 })
    );
    printerSlot.position.set(0, 1.15, 0.32);
    kioskGroup.add(printerSlot);

    // 6. TELEMETRY PULSE BEACONS
    const beacons: { group: THREE.Group; baseScale: number }[] = [];
    KIOSK_COMPONENTS.forEach((comp) => {
      const g = new THREE.Group();
      g.position.set(...comp.position);

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          emissive: 0xa855f7,
          emissiveIntensity: 1.0,
        })
      );
      g.add(dot);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.12, 0.18, 24),
        new THREE.MeshBasicMaterial({
          color: 0xc084fc,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        })
      );
      g.add(ring);

      kioskGroup.add(g);
      beacons.push({ group: g, baseScale: 1 });
    });

    // MOUSE DRAG / ROTATION INTERACTION
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.4;
    let targetRotationX = 0.1;

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
        targetRotationX = Math.max(-0.2, Math.min(0.5, targetRotationX));
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

    // Touch support
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
        targetRotationX = Math.max(-0.2, Math.min(0.5, targetRotationX));
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

    // INTERSECTION OBSERVER
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // RESIZE
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // ANIMATION
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      if (!isDragging && !prefersReducedMotion && isRotating) {
        targetRotationY += 0.003;
      }

      kioskGroup.rotation.y += (targetRotationY - kioskGroup.rotation.y) * 0.06;
      kioskGroup.rotation.x += (targetRotationX - kioskGroup.rotation.x) * 0.06;

      // Animate telemetry rings
      beacons.forEach(({ group }, idx) => {
        const ring = group.children[1] as THREE.Mesh;
        if (ring) {
          const s = 1 + Math.sin(elapsedTime * 3.2 + idx) * 0.2;
          ring.scale.set(s, s, s);
          ring.lookAt(camera.position);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

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

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
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
    <div className="relative w-full h-[400px] md:h-[480px] bg-gradient-to-br from-[#060412] via-[#0d0924] to-[#080517] rounded-2xl overflow-hidden border border-purple-500/30 group shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        title="Click and drag to rotate the 3D Kiosk Device"
      />

      {/* Top Telemetry Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-purple-500/30 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
          <span className="text-purple-400 font-semibold tracking-wide uppercase text-[11px] sm:text-xs">
            AAZHI Fleet Daemon &bull; Architectural 3D Model <span className="text-slate-400 font-normal hidden sm:inline">(Simulated Telemetry)</span>
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-white/10 text-slate-300 hover:text-purple-400 transition-colors text-xs font-mono flex items-center gap-1"
            title="Toggle rotation"
            aria-label="Toggle 3D rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRotating ? "Pause" : "Rotate"}</span>
          </button>
        </div>
      </div>

      {/* Component Inspector Card (Bottom Left) */}
      <div className="absolute bottom-3 left-3 z-10 max-w-[270px] sm:max-w-xs p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-purple-500/30 shadow-xl space-y-2 pointer-events-auto">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1 text-[11px] truncate">
            <Server className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            {activeComponent.category}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 shrink-0">
            Simulated Model
          </span>
        </div>

        <div>
          <div className="text-xs font-bold text-white tracking-wide">{activeComponent.name}</div>
          <div className="text-[11px] text-slate-300 font-mono mt-0.5 leading-snug">
            {activeComponent.detail}
          </div>
          <div className="text-[9px] font-mono text-slate-400 mt-1">
            * Reverse WSS & offline SQLite buffering proposed in CDAC system design
          </div>
        </div>

        {/* Quick Component Switcher */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10">
          {KIOSK_COMPONENTS.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveComponent(comp)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all ${
                activeComponent.id === comp.id
                  ? "bg-purple-600 text-white font-bold"
                  : "bg-slate-900/90 text-slate-300 hover:text-purple-300 border border-white/10"
              }`}
            >
              {comp.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Right Heartbeat Monitor */}
      <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
        <Wifi className="w-4 h-4 text-purple-400 animate-pulse" />
        <div>
          <div className="text-[10px] text-slate-400 uppercase">Simulated Heartbeat</div>
          <div className="font-bold text-purple-300">#{heartbeatCount} &bull; TLS Spec</div>
        </div>
      </div>

      {/* WebGL Fallback */}
      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-3">
          <Server className="w-10 h-10 text-purple-400" />
          <h4 className="text-base font-bold text-white">Kiosk Management System (Simulated)</h4>
          <p className="text-xs text-slate-300 max-w-sm">
            Interactive WebGL is not available on this device. Fleet orchestration design with
            proposed reverse WebSocket and local SQLite crash resilience.
          </p>
        </div>
      )}
    </div>
  );
}
