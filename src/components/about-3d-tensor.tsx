"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function About3DTensor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState("Hidden Layer 12");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let glSupported = true;
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) glSupported = false;
    } catch {
      glSupported = false;
    }

    if (!glSupported) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // SCENE & CAMERA
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const tensorGroup = new THREE.Group();
    scene.add(tensorGroup);

    // 1. 3D TENSOR CUBE (Matrix representation)
    const boxSize = 2.4;
    const cubeGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const cubeWireGeo = new THREE.EdgesGeometry(cubeGeo);
    const cubeWireMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.8,
    });
    const cubeWire = new THREE.LineSegments(cubeWireGeo, cubeWireMat);
    tensorGroup.add(cubeWire);

    // 2. INNER 3D GRID OF TENSOR NODES (3x3x3 grid)
    const gridSize = 3;
    const spacing = boxSize / (gridSize - 1);
    const nodeSpheres: THREE.Mesh[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const sphereMatCyan = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const sphereMatViolet = new THREE.MeshBasicMaterial({ color: 0xa855f7 });

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const sphere = new THREE.Mesh(
            sphereGeo,
            (x + y + z) % 2 === 0 ? sphereMatCyan : sphereMatViolet
          );
          sphere.position.set(
            (x - (gridSize - 1) / 2) * spacing,
            (y - (gridSize - 1) / 2) * spacing,
            (z - (gridSize - 1) / 2) * spacing
          );
          tensorGroup.add(sphere);
          nodeSpheres.push(sphere);
        }
      }
    }

    // 3. FLOATING COORDINATE AXES RINGS
    const ringGeo = new THREE.RingGeometry(1.8, 1.83, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    tensorGroup.add(ringMesh);

    // 4. DATA PACKET FLOW (Animated along diagonal)
    const packetGeo = new THREE.SphereGeometry(0.12, 10, 10);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const packet = new THREE.Mesh(packetGeo, packetMat);
    tensorGroup.add(packet);

    // MOUSE DRAG / ROTATION
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      tensorGroup.rotation.y += deltaX * 0.01;
      tensorGroup.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // RESIZE & VISIBILITY
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        isVisible = e.isIntersecting;
      });
    });
    observer.observe(container);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ANIMATE
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      if (!prefersReducedMotion && !isDragging) {
        tensorGroup.rotation.y = t * 0.25;
        tensorGroup.rotation.x = Math.sin(t * 0.2) * 0.2;
      }

      // Animate floating packet along tensor boundary
      const cycle = (t * 0.8) % 4;
      if (cycle < 1) {
        packet.position.set(-1.2 + cycle * 2.4, -1.2, -1.2);
      } else if (cycle < 2) {
        packet.position.set(1.2, -1.2 + (cycle - 1) * 2.4, -1.2);
      } else if (cycle < 3) {
        packet.position.set(1.2, 1.2, -1.2 + (cycle - 2) * 2.4);
      } else {
        packet.position.set(1.2 - (cycle - 3) * 2.4, 1.2, 1.2);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      cubeGeo.dispose();
      cubeWireGeo.dispose();
      cubeWireMat.dispose();
      sphereGeo.dispose();
      sphereMatCyan.dispose();
      sphereMatViolet.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl glass-panel border border-white/10 p-4 flex flex-col justify-between overflow-hidden group select-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating HUD Overlays */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-mono uppercase tracking-wider text-primary flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          Interactive 3D Tensor
        </span>
        <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
          Drag to Rotate
        </span>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="relative z-10 grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-950/70 backdrop-blur-md p-3 rounded-xl border border-white/10">
        <div>
          <span className="text-slate-400 block">Tensor Topology</span>
          <span className="text-white font-semibold">Rank-3 &bull; [3, 3, 3]</span>
        </div>
        <div>
          <span className="text-slate-400 block">Vector Embeddings</span>
          <span className="text-cyan-400 font-semibold">768-Dim Latent</span>
        </div>
        <div>
          <span className="text-slate-400 block">Inference Target</span>
          <span className="text-purple-400 font-semibold">ONNX Dynamic INT8</span>
        </div>
        <div>
          <span className="text-slate-400 block">Telemetry Stream</span>
          <span className="text-emerald-400 font-semibold">Real-Time Ingestion</span>
        </div>
      </div>
    </div>
  );
}
