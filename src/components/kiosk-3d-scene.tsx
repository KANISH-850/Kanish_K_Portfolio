"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, Server, Touchpad, Wifi, ArrowRight } from "lucide-react";

type JourneyStep = 0 | 1 | 2;

const KIOSK_STEPS: {
  step: JourneyStep;
  title: string;
  screenHeading: string;
  screenLines: string[];
  detail: string;
}[] = [
  {
    step: 0,
    title: "1. Service Selection",
    screenHeading: "AAZHI HELP DESK",
    screenLines: [
      "[EN] [TA] [HI] Select Language",
      "> 1. Civic Utility Service",
      "  2. Document Print / Status",
      "  3. Accessible Voice Guide",
    ],
    detail: "Touchscreen renders multilingual options & high-contrast elderly accessibility mode.",
  },
  {
    step: 1,
    title: "2. Verification & Sync",
    screenHeading: "FASTAPI TELEMETRY",
    screenLines: [
      "Scanning Reference QR...",
      "Checking Peripheral Status:",
      "Touch: OK | Cam: OK | Net: Sync",
      "Dispatching Heartbeat...",
    ],
    detail: "Kiosk daemon verifies peripheral readiness and syncs session over FastAPI telemetry.",
  },
  {
    step: 2,
    title: "3. Receipt Output",
    screenHeading: "SERVICE TOKEN READY",
    screenLines: [
      "Token: #AZ-204 Generated",
      "Printing Thermal Receipt...",
      "Collect Slip Below Chute",
      "Session Telemetry Logged",
    ],
    detail: "Thermal printer outputs token slip while fleet portal records transaction uptime.",
  },
];

export function Kiosk3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [step, setStep] = useState<JourneyStep>(0);
  const [isRotating, setIsRotating] = useState(true);

  const stepRef = useRef<JourneyStep>(step);
  stepRef.current = step;
  const rotatingRef = useRef(isRotating);
  rotatingRef.current = isRotating;

  const activeStep = KIOSK_STEPS[step];

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
    scene.fog = new THREE.FogExp2(0x060414, 0.045);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.8, 2.7, 5.4);
    camera.lookAt(0, 1.35, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0x1e1b4b, 2.4));
    const keyLight = new THREE.DirectionalLight(0xe0e7ff, 2.8);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);
    const rimPurple = new THREE.DirectionalLight(0xa855f7, 2.2);
    rimPurple.position.set(-5, 4, -4);
    scene.add(rimPurple);

    const root = new THREE.Group();
    scene.add(root);

    // Floor platform + grid
    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.5, 0.12, 36),
      new THREE.MeshStandardMaterial({ color: 0x0d0a1f, roughness: 0.8, metalness: 0.4 })
    );
    floor.position.y = -0.06;
    root.add(floor);
    const grid = new THREE.GridHelper(4.4, 12, 0xa855f7, 0x1e1b4b);
    grid.position.y = 0.01;
    root.add(grid);

    // KIOSK ENCLOSURE GROUP
    const kiosk = new THREE.Group();
    root.add(kiosk);

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x17142b, metalness: 0.75, roughness: 0.35 });
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x312e81, metalness: 0.85, roughness: 0.25 });

    // Base plate & lower column
    const baseFoot = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.12, 0.85), trimMat);
    baseFoot.position.set(0, 0.06, 0);
    kiosk.add(baseFoot);

    const column = new THREE.Mesh(new THREE.BoxGeometry(0.82, 1.32, 0.52), bodyMat);
    column.position.set(0, 0.78, -0.05);
    kiosk.add(column);

    // Angled Upper Display Head
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.88, 0.05);
    headGroup.rotation.x = -0.22;
    kiosk.add(headGroup);

    const headChassis = new THREE.Mesh(new THREE.BoxGeometry(1.16, 1.12, 0.38), bodyMat);
    headGroup.add(headChassis);

    const bezel = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.82, 0.04), trimMat);
    bezel.position.set(0, 0.05, 0.19);
    headGroup.add(bezel);

    // Dynamic Interactive Touchscreen CanvasTexture
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 384;
    const ctx = canvas.getContext("2d");
    const screenTex = new THREE.CanvasTexture(canvas);

    const drawKioskScreen = (currentStep: JourneyStep) => {
      if (!ctx) return;
      const info = KIOSK_STEPS[currentStep];
      ctx.fillStyle = "#060918";
      ctx.fillRect(0, 0, 512, 384);

      // Header bar
      ctx.fillStyle = currentStep === 2 ? "#065f46" : "#3b0764";
      ctx.fillRect(0, 0, 512, 66);
      ctx.fillStyle = "#22d3ee";
      ctx.font = "bold 24px monospace";
      ctx.fillText(info.screenHeading, 24, 42);

      // Step badge
      ctx.fillStyle = "#a855f7";
      ctx.fillRect(380, 16, 110, 34);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px monospace";
      ctx.fillText(`STEP ${currentStep + 1}/3`, 398, 39);

      // Body rows
      info.screenLines.forEach((line, idx) => {
        const y = 112 + idx * 54;
        ctx.fillStyle = idx === 0 ? "rgba(34,211,238,0.14)" : "rgba(255,255,255,0.05)";
        ctx.fillRect(24, y - 30, 464, 42);
        ctx.strokeStyle = idx === 0 ? "#22d3ee" : "rgba(168,85,247,0.35)";
        ctx.lineWidth = 2;
        ctx.strokeRect(24, y - 30, 464, 42);
        ctx.fillStyle = idx === 0 ? "#67e8f9" : "#e2e8f0";
        ctx.font = "20px monospace";
        ctx.fillText(line, 38, y - 2);
      });

      // Footer prompt
      ctx.fillStyle = "#94a3b8";
      ctx.font = "15px monospace";
      ctx.fillText("Click screen to advance simulated journey ->", 24, 358);
      screenTex.needsUpdate = true;
    };
    drawKioskScreen(0);

    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.96, 0.72),
      new THREE.MeshBasicMaterial({ map: screenTex })
    );
    screenMesh.position.set(0, 0.05, 0.215);
    screenMesh.userData.interactiveScreen = true;
    headGroup.add(screenMesh);

    // Top camera & accessibility light bar
    const camLens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 0.04, 16),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee })
    );
    camLens.rotation.x = Math.PI / 2;
    camLens.position.set(0, 0.51, 0.2);
    headGroup.add(camLens);

    // Peripheral Tray: Scanner bay & Receipt Printer chute
    const tray = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.14, 0.34), trimMat);
    tray.position.set(0, 1.24, 0.22);
    kiosk.add(tray);

    const scannerLight = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.02, 0.18),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    scannerLight.position.set(-0.22, 1.32, 0.25);
    kiosk.add(scannerLight);

    const printerSlot = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.03, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x030712 })
    );
    printerSlot.position.set(0.22, 1.25, 0.37);
    kiosk.add(printerSlot);

    // Animated Thermal Receipt Paper sliding out on Step 2
    const receiptMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.008, 0.28),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 })
    );
    receiptMesh.position.set(0.22, 1.24, 0.36);
    receiptMesh.rotation.x = 0.25;
    receiptMesh.visible = false;
    kiosk.add(receiptMesh);

    // Stylized Citizen Interaction Marker (Front Left)
    const userGroup = new THREE.Group();
    userGroup.position.set(-0.95, 0, 0.95);
    const userBase = new THREE.Mesh(
      new THREE.RingGeometry(0.28, 0.34, 24),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide })
    );
    userBase.rotation.x = -Math.PI / 2;
    userBase.position.y = 0.02;
    userGroup.add(userBase);

    const userTorso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.18, 0.72, 14),
      new THREE.MeshStandardMaterial({ color: 0x0e7490, metalness: 0.3, roughness: 0.6 })
    );
    userTorso.position.y = 0.82;
    userGroup.add(userTorso);

    const userHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 14, 14),
      new THREE.MeshStandardMaterial({ color: 0x22d3ee, metalness: 0.2, roughness: 0.5 })
    );
    userHead.position.y = 1.34;
    userGroup.add(userHead);
    root.add(userGroup);

    // Backend Fleet Control Server Node (Rear Right) + Telemetry Link
    const serverNode = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.9, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x1e1b4b, metalness: 0.8, roughness: 0.3 })
    );
    serverNode.position.set(1.35, 0.45, -1.15);
    root.add(serverNode);

    const serverLed = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.05, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    serverLed.position.set(1.35, 0.75, -0.92);
    root.add(serverLed);

    const linkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.75, -0.3),
      new THREE.Vector3(0.7, 0.4, -0.75),
      new THREE.Vector3(1.35, 0.65, -1.15),
    ]);
    const linkTube = new THREE.Mesh(
      new THREE.TubeGeometry(linkCurve, 20, 0.02, 8, false),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.7 })
    );
    root.add(linkTube);

    const packetMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee })
    );
    root.add(packetMesh);

    // Drag & Screen Click Raycasting
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isDragging = false;
    let moved = 0;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = -0.35;
    let targetRotX = 0.08;

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
      targetRotY += dx * 0.008;
      targetRotX = Math.max(-0.15, Math.min(0.45, targetRotX + dy * 0.005));
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
        const hits = raycaster.intersectObject(screenMesh, false);
        if (hits.length > 0) {
          setStep((prev) => (((prev + 1) % 3) as JourneyStep));
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

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
    let lastDrawnStep: JourneyStep = 0;
    let packetProgress = 0;
    let receiptSlide = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (!isDragging && !prefersReducedMotion && rotatingRef.current) {
        targetRotY += 0.0022;
      }

      root.rotation.y += (targetRotY - root.rotation.y) * 0.08;
      root.rotation.x += (targetRotX - root.rotation.x) * 0.08;

      if (stepRef.current !== lastDrawnStep) {
        lastDrawnStep = stepRef.current;
        drawKioskScreen(lastDrawnStep);
        receiptSlide = 0;
      }

      // Receipt print animation on Step 2
      if (stepRef.current === 2) {
        receiptMesh.visible = true;
        receiptSlide = Math.min(1, receiptSlide + 0.035);
        receiptMesh.position.z = 0.34 + receiptSlide * 0.18;
      } else {
        receiptMesh.visible = false;
      }

      if (!prefersReducedMotion) {
        packetProgress = (packetProgress + 0.008) % 1;
        packetMesh.position.copy(linkCurve.getPoint(packetProgress));
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
      className="relative w-full h-[420px] md:h-[490px] bg-gradient-to-br from-[#060412] via-[#0d0924] to-[#080517] rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl"
    >
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        title="Drag to rotate or click the kiosk touchscreen to step through a user journey"
      />

      {/* Top Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-purple-500/30 text-xs font-mono">
          <span className="h-2 w-2 rounded-full bg-purple-400" />
          <span className="text-purple-300 font-semibold uppercase text-[10px] sm:text-xs">
            AAZHI Self-Service Kiosk <span className="text-slate-400 font-normal hidden sm:inline">(Simulated Journey)</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => setStep((prev) => (((prev + 1) % 3) as JourneyStep))}
            className="px-2.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 border border-purple-400/40 text-purple-200 text-[10px] sm:text-xs font-mono flex items-center gap-1 transition-colors"
          >
            <Touchpad className="w-3.5 h-3.5" />
            <span>Next Step</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            type="button"
            onClick={() => setIsRotating((prev) => !prev)}
            className="p-1.5 rounded-lg bg-slate-950/85 hover:bg-slate-900 border border-white/10 text-slate-300 hover:text-purple-400 transition-colors text-xs font-mono flex items-center gap-1"
            aria-label="Toggle 3D rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Journey Card */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm z-10 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-purple-500/30 shadow-xl space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-purple-300 font-bold">{activeStep.title}</span>
          <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
            Simulated UI
          </span>
        </div>
        <p className="text-[11px] text-slate-300 leading-snug">{activeStep.detail}</p>
        <div className="flex gap-1.5 pt-1 border-t border-white/10">
          {KIOSK_STEPS.map((item) => (
            <button
              key={item.step}
              type="button"
              onClick={() => setStep(item.step)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                step === item.step
                  ? "bg-purple-600 text-white font-bold"
                  : "bg-slate-900 text-slate-300 hover:text-purple-300 border border-white/10"
              }`}
            >
              Step {item.step + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 z-10 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
        <Wifi className="w-4 h-4 text-purple-400" />
        <div>
          <div className="text-slate-400 uppercase">Click 3D Screen</div>
          <div className="font-bold text-emerald-400">Citizen &rarr; Kiosk &rarr; Backend</div>
        </div>
      </div>

      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-3">
          <Server className="w-10 h-10 text-purple-400" />
          <h4 className="text-base font-bold text-white">AAZHI Kiosk Management System (Simulated)</h4>
          <p className="text-xs text-slate-300 max-w-sm">
            WebGL is unavailable on this device. Workflow demonstrates citizen touchscreen selection, FastAPI telemetry verification, and thermal receipt output.
          </p>
        </div>
      )}
    </div>
  );
}
