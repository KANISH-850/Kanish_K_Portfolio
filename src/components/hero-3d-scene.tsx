"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.035);

    // CAMERA
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ROOT 3D GROUP (for mouse tilt and continuous rotation)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. NEURAL CORE (Floating Icosahedron with outer wireframe cage)
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    rootGroup.add(coreMesh);

    const wireGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    rootGroup.add(wireMesh);

    // Outer subtle geometric ring
    const ringGeo = new THREE.TorusGeometry(3.6, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    rootGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat.clone());
    ringMesh2.rotation.y = Math.PI / 2.5;
    rootGroup.add(ringMesh2);

    // 2. NEURAL NETWORK NODES & SYNAPSE CONNECTIONS
    const isMobile = width < 768;
    const nodeCount = isMobile ? 48 : 80;
    const nodes: THREE.Vector3[] = [];
    const nodeSpheres: THREE.Mesh[] = [];

    const nodeGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const nodeMatCyan = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });
    const nodeMatViolet = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.9,
      roughness: 0.1,
    });

    const radiusBase = 4.2;
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      // Add controlled jitter for organic distribution
      const r = radiusBase + (Math.random() - 0.5) * 1.6;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodes.push(pos);

      const sphere = new THREE.Mesh(
        nodeGeo,
        i % 3 === 0 ? nodeMatViolet : nodeMatCyan
      );
      sphere.position.copy(pos);
      rootGroup.add(sphere);
      nodeSpheres.push(sphere);
    }

    // SYNAPTIC CONNECTION LINES
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const maxConnectDistance = isMobile ? 2.4 : 2.8;

    const cyanColor = new THREE.Color(0x00f0ff);
    const violetColor = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < maxConnectDistance) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);

          const alpha = 1.0 - dist / maxConnectDistance;
          const chosenColor = (i + j) % 2 === 0 ? cyanColor : violetColor;
          lineColors.push(
            chosenColor.r * alpha,
            chosenColor.g * alpha,
            chosenColor.b * alpha
          );
          lineColors.push(
            chosenColor.r * alpha,
            chosenColor.g * alpha,
            chosenColor.b * alpha
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    rootGroup.add(linesMesh);

    // 3. AMBIENT DATA PARTICLES (Outer field)
    const particleCount = isMobile ? 180 : 360;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const pR = 5.0 + Math.random() * 6.0;
      const pTheta = Math.random() * Math.PI * 2;
      const pPhi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = pR * Math.sin(pPhi) * Math.cos(pTheta);
      particlePositions[i * 3 + 1] = pR * Math.sin(pPhi) * Math.sin(pTheta);
      particlePositions[i * 3 + 2] = pR * Math.cos(pPhi);

      const isCyan = Math.random() > 0.4;
      particleColors[i * 3] = isCyan ? 0.0 : 0.65;
      particleColors[i * 3 + 1] = isCyan ? 0.94 : 0.35;
      particleColors[i * 3 + 2] = 1.0;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.05 : 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(
      particleGeometry,
      particleMaterial
    );
    scene.add(particleSystem);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x081026, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3.5, 25);
    cyanLight.position.set(4, 5, 6);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 3.0, 25);
    violetLight.position.set(-5, -4, 4);
    scene.add(violetLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
    frontLight.position.set(0, 8, 10);
    scene.add(frontLight);

    // MOUSE TRACKING & PARALLAX
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // VISIBILITY OBSERVER (Pause animation loop when section is scrolled out of viewport)
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (!prefersReducedMotion) {
        // Continuous auto-rotation with mouse offset
        rootGroup.rotation.y = elapsedTime * 0.12 + currentX * 1.2;
        rootGroup.rotation.x =
          Math.sin(elapsedTime * 0.08) * 0.15 - currentY * 0.9;

        // Counter-rotate the inner core and outer cage
        coreMesh.rotation.y = -elapsedTime * 0.25;
        coreMesh.rotation.x = elapsedTime * 0.18;

        wireMesh.rotation.y = elapsedTime * 0.2;
        wireMesh.rotation.z = -elapsedTime * 0.15;

        ringMesh1.rotation.z = elapsedTime * 0.15;
        ringMesh2.rotation.z = -elapsedTime * 0.12;

        // Subtle pulsing scale of core
        const coreScale = 1.0 + Math.sin(elapsedTime * 1.8) * 0.06;
        coreMesh.scale.set(coreScale, coreScale, coreScale);

        // Slow drift of particle cloud
        particleSystem.rotation.y = elapsedTime * 0.03 + currentX * 0.4;
        particleSystem.rotation.x = currentY * 0.3;

        // Subtle node breathing
        const nodePulse = 1.0 + Math.sin(elapsedTime * 2.2) * 0.12;
        for (let i = 0; i < nodeSpheres.length; i += 4) {
          nodeSpheres[i].scale.set(nodePulse, nodePulse, nodePulse);
        }
      } else {
        // Reduced motion: static gentle tilt only
        rootGroup.rotation.y = currentX * 0.3;
        rootGroup.rotation.x = -currentY * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      nodeGeo.dispose();
      nodeMatCyan.dispose();
      nodeMatViolet.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-primary/20 via-accent/20 to-transparent blur-3xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  );
}
