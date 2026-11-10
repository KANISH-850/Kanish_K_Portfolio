"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface SynapsePulse {
  start: THREE.Vector3;
  end: THREE.Vector3;
  progress: number;
  speed: number;
  color: THREE.Color;
  mesh: THREE.Mesh;
}

export function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. WebGL Support Verification
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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 2. SCENE & FOG
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.032);

    // 3. CAMERA SETUP
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    // Initial camera position for smooth entrance glide
    camera.position.set(0, 0, isMobile ? 16 : 17);
    const targetCameraZ = isMobile ? 14 : 12.5;

    // 4. RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 5. ROOT GROUP
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 6. PROCEDURAL NEURAL INTELLIGENCE CORE
    // A. Inner Plasma Core
    const innerCoreGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x0284c7,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.92,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    rootGroup.add(innerCoreMesh);

    // B. Middle Faceted Icosahedral Shell
    const midShellGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const midShellMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0369a1,
      emissiveIntensity: 0.5,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: false,
      transparent: true,
      opacity: 0.65,
    });
    const midShellMesh = new THREE.Mesh(midShellGeo, midShellMat);
    rootGroup.add(midShellMesh);

    // C. Outer Geometric Lattice Cage
    const outerLatticeGeo = new THREE.IcosahedronGeometry(2.15, 1);
    const outerLatticeMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const outerLatticeMesh = new THREE.Mesh(outerLatticeGeo, outerLatticeMat);
    rootGroup.add(outerLatticeMesh);

    // D. Dual Concentric Quantum Precision Rings
    const ringGeo1 = new THREE.TorusGeometry(3.4, 0.018, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    rootGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(3.9, 0.014, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 5;
    rootGroup.add(ringMesh2);

    // 7. NEURAL NETWORK TOPOLOGY (NODES & SYNAPSES)
    const nodeCount = isMobile ? 42 : 72;
    const nodes: THREE.Vector3[] = [];
    const nodeSpheres: THREE.Mesh[] = [];

    const nodeGeo = new THREE.SphereGeometry(0.075, 10, 10);
    const nodeMatCyan = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.1,
      roughness: 0.1,
    });
    const nodeMatViolet = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 1.1,
      roughness: 0.1,
    });

    const radiusBase = isMobile ? 3.6 : 4.4;
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const r = radiusBase + (Math.random() - 0.5) * 1.5;
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

    // Synapse Lines with Gradient Coloring
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const maxConnectDistance = isMobile ? 2.3 : 2.7;
    const cyanColor = new THREE.Color(0x00f0ff);
    const violetColor = new THREE.Color(0x8b5cf6);

    interface ConnectionEdge {
      p1: THREE.Vector3;
      p2: THREE.Vector3;
    }
    const connectionEdges: ConnectionEdge[] = [];

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

          if (connectionEdges.length < 30) {
            connectionEdges.push({ p1: nodes[i], p2: nodes[j] });
          }
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
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    rootGroup.add(linesMesh);

    // 8. ACTIVE SIGNAL TRANSMISSION PULSES (Visualizing Real-Time AI Inference)
    const pulses: SynapsePulse[] = [];
    const pulseCount = isMobile ? 8 : 16;
    const pulseGeo = new THREE.SphereGeometry(0.065, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    if (connectionEdges.length > 0 && !prefersReducedMotion) {
      for (let i = 0; i < Math.min(pulseCount, connectionEdges.length); i++) {
        const edge = connectionEdges[i % connectionEdges.length];
        const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
        rootGroup.add(pulseMesh);
        pulses.push({
          start: edge.p1,
          end: edge.p2,
          progress: Math.random(),
          speed: 0.25 + Math.random() * 0.35,
          color: i % 2 === 0 ? cyanColor : violetColor,
          mesh: pulseMesh,
        });
      }
    }

    // 9. DUAL-LAYER AMBIENT LATENT DATA DUST
    const particleCount = isMobile ? 140 : 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const pR = 4.8 + Math.random() * 6.5;
      const pTheta = Math.random() * Math.PI * 2;
      const pPhi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = pR * Math.sin(pPhi) * Math.cos(pTheta);
      particlePositions[i * 3 + 1] = pR * Math.sin(pPhi) * Math.sin(pTheta);
      particlePositions[i * 3 + 2] = pR * Math.cos(pPhi);

      const isCyan = Math.random() > 0.45;
      particleColors[i * 3] = isCyan ? 0.0 : 0.68;
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
      size: isMobile ? 0.045 : 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 10. BALANCED CINEMATIC LIGHTING
    const ambientLight = new THREE.AmbientLight(0x0a1024, 2.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 4.0, 22);
    cyanLight.position.set(4, 5, 5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 3.5, 22);
    violetLight.position.set(-5, -4, 4);
    scene.add(violetLight);

    const coreGlowLight = new THREE.PointLight(0x00f0ff, 2.5, 8);
    coreGlowLight.position.set(0, 0, 0);
    scene.add(coreGlowLight);

    // 11. MOUSE PARALLAX & CAMERA DAMPING
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.4;
      targetMouseY = y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 12. RESPONSIVE RESIZE
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 13. VISIBILITY OBSERVER (Pause animation when offscreen)
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

    // 14. ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth entrance glide for camera Z
      camera.position.z += (targetCameraZ - camera.position.z) * 0.035;

      // Smooth mouse damping
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Parallax camera offset
      camera.position.x = currentMouseX * 1.6;
      camera.position.y = currentMouseY * 1.2;
      camera.lookAt(0, 0, 0);

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        rootGroup.rotation.y = elapsedTime * 0.1 + currentMouseX * 0.6;
        rootGroup.rotation.x =
          Math.sin(elapsedTime * 0.08) * 0.12 - currentMouseY * 0.5;

        // Counter-rotation of core shells
        innerCoreMesh.rotation.y = -elapsedTime * 0.3;
        innerCoreMesh.rotation.x = elapsedTime * 0.2;

        midShellMesh.rotation.y = elapsedTime * 0.18;
        midShellMesh.rotation.z = -elapsedTime * 0.15;

        outerLatticeMesh.rotation.y = -elapsedTime * 0.12;
        outerLatticeMesh.rotation.x = -elapsedTime * 0.1;

        ringMesh1.rotation.z = elapsedTime * 0.14;
        ringMesh2.rotation.z = -elapsedTime * 0.11;

        // Pulsing core breathing
        const corePulse = 1.0 + Math.sin(elapsedTime * 2.0) * 0.06;
        innerCoreMesh.scale.set(corePulse, corePulse, corePulse);

        // Slow ambient particle field drift
        particleSystem.rotation.y = elapsedTime * 0.025 + currentMouseX * 0.2;
        particleSystem.rotation.x = currentMouseY * 0.15;

        // Animate neural signal pulses across synapses
        for (let i = 0; i < pulses.length; i++) {
          const pulse = pulses[i];
          pulse.progress += delta * pulse.speed;
          if (pulse.progress > 1.0) {
            pulse.progress = 0;
          }
          pulse.mesh.position.lerpVectors(
            pulse.start,
            pulse.end,
            pulse.progress
          );
        }

        // Gentle node breathing
        const nodePulse = 1.0 + Math.sin(elapsedTime * 2.4) * 0.08;
        for (let i = 0; i < nodeSpheres.length; i += 3) {
          nodeSpheres[i].scale.set(nodePulse, nodePulse, nodePulse);
        }
      } else {
        rootGroup.rotation.y = currentMouseX * 0.25;
        rootGroup.rotation.x = -currentMouseY * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 15. RESOURCE DISPOSAL & CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      midShellGeo.dispose();
      midShellMat.dispose();
      outerLatticeGeo.dispose();
      outerLatticeMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMatCyan.dispose();
      nodeMatViolet.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-gradient-to-tr from-primary/20 via-accent/20 to-transparent blur-3xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
