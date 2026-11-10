"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RotateCcw } from "lucide-react";

interface ConstellationProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

const CATEGORY_COLORS: Record<string, number> = {
  "Machine Learning": 0x00f0ff, // Cyan
  "Deep Learning": 0xa855f7, // Purple
  "Generative AI": 0xf472b6, // Pink
  "NLP": 0x10b981, // Emerald
  "Python": 0xfbbf24, // Amber
  "DSA": 0x60a5fa, // Blue
};

export function Skills3DConstellation({
  activeCategory,
  onSelectCategory,
  categories,
}: ConstellationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const onSelectRef = useRef(onSelectCategory);
  onSelectRef.current = onSelectCategory;

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

    // SCENE & CAMERA
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.05);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 9.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 1. CENTRAL AI CORE (Inner wireframe icosahedron + outer quantum ring)
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    constellationGroup.add(coreMesh);

    const coreRingGeo = new THREE.TorusGeometry(1.2, 0.015, 16, 64);
    const coreRingMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.6,
    });
    const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat);
    coreRing.rotation.x = Math.PI / 3;
    constellationGroup.add(coreRing);

    // 2. ORBITAL RINGS & 6 CATEGORY NODES
    const nodeSpheres: THREE.Mesh[] = [];
    const ringLines: THREE.Line[] = [];
    const haloRings: THREE.Mesh[] = [];

    categories.forEach((cat, index) => {
      const radius = 2.4 + index * 0.48;
      const colVal = CATEGORY_COLORS[cat] || (index % 2 === 0 ? 0x00f0ff : 0xa855f7);

      // Orbital ellipse
      const ringGeo = new THREE.BufferGeometry();
      const segments = 64;
      const ringPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      ringGeo.setFromPoints(ringPoints);

      const ringMat = new THREE.LineBasicMaterial({
        color: colVal,
        transparent: true,
        opacity: 0.22,
      });

      const ringLine = new THREE.Line(ringGeo, ringMat);
      ringLine.rotation.x = 0.22 * ((index % 3) - 1);
      ringLine.rotation.z = 0.15 * ((index % 2) === 0 ? 1 : -1);
      constellationGroup.add(ringLine);
      ringLines.push(ringLine);

      // Node Sphere
      const nodeGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: colVal });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = {
        category: cat,
        orbitRadius: radius,
        speed: 0.25 + index * 0.05,
        angle: (index / categories.length) * Math.PI * 2,
        tiltX: ringLine.rotation.x,
        tiltZ: ringLine.rotation.z,
        baseColor: colVal,
      };
      constellationGroup.add(nodeMesh);
      nodeSpheres.push(nodeMesh);

      // Halo ring around each node
      const haloGeo = new THREE.RingGeometry(0.28, 0.36, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: colVal,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      constellationGroup.add(haloMesh);
      haloRings.push(haloMesh);
    });

    // 3. CONSTELLATION CONNECTION LINES
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const lineGeo = new THREE.BufferGeometry();
    const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
    constellationGroup.add(constellationLines);

    // 4. RAYCASTING INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const dom = renderer.domElement;

    const onPointerMove = (e: MouseEvent) => {
      const rect = dom.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeSpheres);

      if (intersects.length > 0) {
        dom.style.cursor = "pointer";
      } else {
        dom.style.cursor = isDragging ? "grabbing" : "grab";
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = dom.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeSpheres);

      if (intersects.length > 0) {
        const hitNode = intersects[0].object as THREE.Mesh;
        const cat = hitNode.userData.category;
        if (cat) {
          onSelectRef.current(cat);
        }
      }
    };

    dom.addEventListener("mousemove", onPointerMove);
    dom.addEventListener("click", onClick);

    // MOUSE DRAG / PARALLAX
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0.2;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onWindowMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.005;
        targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onWindowMouseMove);
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
        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.005;
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
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // RESIZE
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      // Core rotation
      coreMesh.rotation.y = t * 0.35;
      coreMesh.rotation.x = t * 0.2;
      coreRing.rotation.z = t * 0.25;

      if (!isDragging && !prefersReducedMotion && isRotating) {
        targetRotationY += 0.003;
      }

      constellationGroup.rotation.y += (targetRotationY - constellationGroup.rotation.y) * 0.06;
      constellationGroup.rotation.x += (targetRotationX - constellationGroup.rotation.x) * 0.06;

      // Update positions of category nodes along orbits
      const positions: number[] = [];

      nodeSpheres.forEach((node, i) => {
        const data = node.userData;
        const angle = data.angle + t * data.speed * 0.3;
        const r = data.orbitRadius;

        // Base 3D orbit coordinate
        const localPos = new THREE.Vector3(Math.cos(angle) * r, 0, Math.sin(angle) * r);
        localPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), data.tiltX);
        localPos.applyAxisAngle(new THREE.Vector3(0, 0, 1), data.tiltZ);

        node.position.copy(localPos);

        // Highlight active category
        const isActive = data.category === activeCategory;
        const targetScale = isActive ? 1.6 : 1.0;
        node.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Halo ring follow
        const halo = haloRings[i];
        if (halo) {
          halo.position.copy(localPos);
          halo.lookAt(camera.position);
          const haloScale = isActive ? 1.5 + Math.sin(t * 3.5) * 0.2 : 1.0;
          halo.scale.set(haloScale, haloScale, 1);
        }

        // Connection line to Core
        positions.push(0, 0, 0);
        positions.push(localPos.x, localPos.y, localPos.z);

        // Connection to adjacent node
        if (i > 0) {
          const prevPos = nodeSpheres[i - 1].position;
          positions.push(prevPos.x, prevPos.y, prevPos.z);
          positions.push(localPos.x, localPos.y, localPos.z);
        }
      });

      // Connect last to first
      if (nodeSpheres.length > 1) {
        const first = nodeSpheres[0].position;
        const last = nodeSpheres[nodeSpheres.length - 1].position;
        positions.push(last.x, last.y, last.z);
        positions.push(first.x, first.y, first.z);
      }

      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("mousemove", onPointerMove);
      dom.removeEventListener("click", onClick);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (container.contains(dom)) {
        container.removeChild(dom);
      }

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh || (obj as THREE.Line).isLine) {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, [activeCategory, categories, isRotating]);

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] bg-gradient-to-br from-[#020512] via-[#080d22] to-[#040816] rounded-3xl border border-primary/20 overflow-hidden group select-none shadow-2xl">
      {/* Three.js WebGL Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y"
        title="Interactive 3D Skill Constellation. Click any node or drag to rotate."
      />

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 px-3.5 py-1.5 rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          Neural Skill Constellation
        </span>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors text-xs font-mono flex items-center gap-1 shadow-lg"
            title="Toggle rotation"
            aria-label="Toggle 3D constellation rotation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isRotating ? "Pause" : "Rotate"}</span>
          </button>
        </div>
      </div>

      {/* Bottom active readout */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-xs font-mono pointer-events-none shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Selected Domain:</span>
          <span className="text-cyan-300 font-bold tracking-wide">{activeCategory}</span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Click 3D node or pills below to switch focus
        </span>
      </div>

      {/* WebGL Fallback */}
      {!webGLSupported && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center space-y-3">
          <Sparkles className="w-10 h-10 text-cyan-400" />
          <h4 className="text-base font-bold text-white">Neural Skill Constellation</h4>
          <p className="text-xs text-slate-300 max-w-sm">
            Interactive WebGL is disabled or unsupported. Explore the skills matrix below.
          </p>
        </div>
      )}
    </div>
  );
}
