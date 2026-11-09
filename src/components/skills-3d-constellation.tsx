"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ConstellationProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

export function Skills3DConstellation({
  activeCategory,
  onSelectCategory,
  categories,
}: ConstellationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 1. CENTRAL AI SPHERE (Core)
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    constellationGroup.add(coreMesh);

    // 2. ORBITAL RINGS & CATEGORY NODES
    const orbitCount = categories.length; // 8 categories
    const categorySpheres: THREE.Mesh[] = [];
    const ringMeshes: THREE.Line[] = [];

    const cyanColor = new THREE.Color(0x00f0ff);
    const purpleColor = new THREE.Color(0xa855f7);

    categories.forEach((cat, index) => {
      const radius = 2.0 + (index * 0.45);
      const ringGeo = new THREE.BufferGeometry();
      const segments = 64;
      const ringPoints: THREE.Vector3[] = [];

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPoints.push(
          new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius)
        );
      }
      ringGeo.setFromPoints(ringPoints);

      const ringMat = new THREE.LineBasicMaterial({
        color: index % 2 === 0 ? cyanColor : purpleColor,
        transparent: true,
        opacity: 0.22,
      });

      const ringLine = new THREE.Line(ringGeo, ringMat);
      ringLine.rotation.x = 0.25 * (index % 3);
      ringLine.rotation.z = 0.15 * (index % 2);
      constellationGroup.add(ringLine);
      ringMeshes.push(ringLine);

      // Node Sphere on Orbit
      const nodeGeo = new THREE.SphereGeometry(0.16, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? 0x00f0ff : 0xa855f7,
      });
      const nodeSphere = new THREE.Mesh(nodeGeo, nodeMat);
      nodeSphere.userData = { category: cat, orbitRadius: radius, speed: 0.3 + index * 0.08, angle: (index / orbitCount) * Math.PI * 2 };
      constellationGroup.add(nodeSphere);
      categorySpheres.push(nodeSphere);
    });

    // 3. CONSTELLATION CONNECTION LINES
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const lineGeo = new THREE.BufferGeometry();
    const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
    constellationGroup.add(constellationLines);

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
      constellationGroup.rotation.y += deltaX * 0.008;
      constellationGroup.rotation.x += deltaY * 0.008;
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
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
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

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      // Core rotation
      coreMesh.rotation.y = t * 0.4;
      coreMesh.rotation.x = t * 0.25;

      if (!prefersReducedMotion && !isDragging) {
        constellationGroup.rotation.y = t * 0.06;
      }

      // Update positions of category nodes along orbits
      const positions: number[] = [];
      categorySpheres.forEach((node, i) => {
        const data = node.userData;
        const currentAngle = data.angle + t * data.speed * 0.3;
        const x = Math.cos(currentAngle) * data.orbitRadius;
        const z = Math.sin(currentAngle) * data.orbitRadius;
        const y = Math.sin(t * 0.8 + i) * 0.3;

        node.position.set(x, y, z);

        // Highlight active category
        if (data.category === activeCategory) {
          node.scale.set(1.6, 1.6, 1.6);
        } else {
          node.scale.set(1.0, 1.0, 1.0);
        }

        // Connect adjacent nodes
        if (i > 0) {
          const prev = categorySpheres[i - 1].position;
          positions.push(prev.x, prev.y, prev.z);
          positions.push(node.position.x, node.position.y, node.position.z);
        }
      });

      // Connect last to first
      if (categorySpheres.length > 1) {
        const first = categorySpheres[0].position;
        const last = categorySpheres[categorySpheres.length - 1].position;
        positions.push(last.x, last.y, last.z);
        positions.push(first.x, first.y, first.z);
      }

      lineGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );

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

      coreGeo.dispose();
      coreMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, [activeCategory, categories]);

  return (
    <div className="relative w-full h-[340px] sm:h-[420px] glass-panel rounded-3xl border border-white/10 overflow-hidden group select-none">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />
      {/* Top Floating Controls */}
      <div className="relative z-10 p-5 flex items-center justify-between pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-wider text-primary flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          Interactive 3D Constellation
        </span>
        <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/5">
          Drag to Orbit &bull; Click Node
        </span>
      </div>

      {/* Bottom active readout */}
      <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-mono pointer-events-none">
        <span className="text-slate-400">Focused Cluster:</span>
        <span className="text-cyan-400 font-bold">{activeCategory}</span>
      </div>
    </div>
  );
}
