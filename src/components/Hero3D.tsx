"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ChevronRight } from "lucide-react";

export function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    // 1. Initialize Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    const scene = new THREE.Scene();
    
    // Initial Camera Setup (Dimensions will be corrected immediately by ResizeObserver)
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0x111122, 1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00b4ff, 1.5);
    rimLight.position.set(-3, 1, -3);
    scene.add(rimLight);

    const bottomLight = new THREE.PointLight(0x004466, 1, 10);
    bottomLight.position.set(0, -3, 2);
    scene.add(bottomLight);

    const cobLight = new THREE.PointLight(0x88ddff, 3, 8);
    cobLight.position.set(0, 1.2, 0.6);
    scene.add(cobLight);

    // --- Bulb Group ---
    const bulbGroup = new THREE.Group();
    scene.add(bulbGroup);

    // Green Heat Sink Body
    const heatSinkMat = new THREE.MeshStandardMaterial({ color: 0x2d6e3e, metalness: 0.8, roughness: 0.3 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 1.6, 32), heatSinkMat);
    body.position.y = -0.2;
    bulbGroup.add(body);

    const finMat = new THREE.MeshStandardMaterial({ color: 0x3a8a50, metalness: 0.9, roughness: 0.2 });
    for (let i = 0; i < 8; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 0.12), finMat);
      fin.position.y = -0.8 + i * 0.22;
      fin.rotation.y = (i % 2) * 0.15;
      bulbGroup.add(fin);
    }
    for (let i = 0; i < 12; i++) {
      const rfin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.4, 0.25), finMat);
      const angle = (i / 12) * Math.PI * 2;
      rfin.position.set(Math.cos(angle) * 0.62, -0.2, Math.sin(angle) * 0.62);
      rfin.rotation.y = -angle;
      bulbGroup.add(rfin);
    }

    // Blue Metallic Top Cap
    const capMat = new THREE.MeshStandardMaterial({ color: 0x1a3a6e, metalness: 1.0, roughness: 0.1 });
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.52, 0.35, 32), capMat);
    cap.position.y = 0.85;
    bulbGroup.add(cap);

    // COB LED Face
    const cobMat = new THREE.MeshStandardMaterial({ color: 0xaaddff, emissive: 0x55aaff, emissiveIntensity: 3, metalness: 0.1, roughness: 0.4 });
    const cob = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 0.28), cobMat);
    cob.position.set(0, 1.08, 0.18);
    bulbGroup.add(cob);

    const chipMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x99ccff, emissiveIntensity: 5 });
    for (let cx = -2; cx <= 2; cx++) {
      for (let cz = -1; cz <= 1; cz++) {
        const chip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.06), chipMat);
        chip.position.set(cx * 0.13, 1.1, 0.18 + cz * 0.08);
        bulbGroup.add(chip);
      }
    }

    // Light Beam
    const beamMat = new THREE.MeshBasicMaterial({ color: 0x88ccff, transparent: true, opacity: 0.07, side: THREE.BackSide, depthWrite: false });
    const beam = new THREE.Mesh(new THREE.ConeGeometry(1.2, 3, 32, 1, true), beamMat);
    beam.position.set(0, 2.6, 0.2);
    beam.rotation.x = Math.PI;
    bulbGroup.add(beam);

    const beamCoreMat = new THREE.MeshBasicMaterial({ color: 0xaaddff, transparent: true, opacity: 0.12, side: THREE.BackSide, depthWrite: false });
    const beamCore = new THREE.Mesh(new THREE.ConeGeometry(0.3, 2, 16, 1, true), beamCoreMat);
    beamCore.position.set(0, 2.2, 0.2);
    beamCore.rotation.x = Math.PI;
    bulbGroup.add(beamCore);

    // Driver & Wire
    const driver = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.38), new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.6, roughness: 0.5 }));
    driver.position.set(1.1, -0.3, 0);
    bulbGroup.add(driver);
    
    const label = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.06, 0.3), new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 }));
    label.position.set(1.1, -0.08, 0.2);
    bulbGroup.add(label);

    const wireMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const wirePoints = [];
    for (let t = 0; t <= 20; t++) {
      const p = t / 20;
      wirePoints.push(new THREE.Vector3(0.6 + p * 0.45, -0.15 - Math.sin(p * Math.PI) * 0.18, 0));
    }
    bulbGroup.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wirePoints), 20, 0.025, 8, false), wireMat));

    // Base & Pins
    const conn = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 0.4, 6), new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7, metalness: 0.3 }));
    conn.position.y = -1.2;
    bulbGroup.add(conn);

    const pinMat = new THREE.MeshStandardMaterial({ color: 0xccaa44, metalness: 1, roughness: 0.1 });
    [-0.15, 0, 0.15].forEach((ox) => {
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8), pinMat);
      pin.position.set(ox, -1.55, 0);
      bulbGroup.add(pin);
      
      const wPts = [new THREE.Vector3(ox, -1.65, 0), new THREE.Vector3(ox + (Math.random()-0.5)*0.1, -2.0, 0.05), new THREE.Vector3(ox + (Math.random()-0.5)*0.15, -2.4, -0.05)];
      bulbGroup.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(wPts), 12, 0.02, 6, false), wireMat));
    });

    bulbGroup.position.y = 0.3;

    // --- Interaction ---
    let isDragging = false;
    let autoRotate = true;
    let prevMouse = { x: 0, y: 0 };
    let rotY = 0, rotX = 0.1;
    let velX = 0, velY = 0.004;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true; autoRotate = false;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouse = { x: clientX, y: clientY };
      velX = 0; velY = 0;
    };
    
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - prevMouse.x;
      const dy = clientY - prevMouse.y;
      velY = dx * 0.012; velX = dy * 0.008;
      rotY += velY; rotX += velX;
      rotX = Math.max(-0.6, Math.min(0.6, rotX));
      prevMouse = { x: clientX, y: clientY };
    };

    const onUp = () => { isDragging = false; autoRotate = true; };

    // Attach interaction events to the container, not window, to prevent global hijacking
    container.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    container.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    // --- Foolproof Resizing using ResizeObserver ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return; // Prevent 0 size crashes
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize(); // Initial call

    // --- Animation Loop ---
    let t = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      t += 0.016;

      if (autoRotate) rotY += 0.007;
      else if (!isDragging) { velY *= 0.95; velX *= 0.95; rotY += velY; rotX += velX; }

      bulbGroup.rotation.y = rotY;
      bulbGroup.rotation.x = rotX;

      const pulse = 2.5 + Math.sin(t * 2.5) * 0.8;
      cobMat.emissiveIntensity = pulse;
      chipMat.emissiveIntensity = pulse * 1.8;
      cobLight.intensity = 2 + Math.sin(t * 2.5) * 0.8;

      beamMat.opacity = 0.06 + Math.sin(t * 3) * 0.02;
      beamCoreMat.opacity = 0.1 + Math.sin(t * 3) * 0.03;
      bulbGroup.position.y = 0.3 + Math.sin(t * 0.8) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    // --- Strict Mode Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      container.removeEventListener('mousedown', onDown);
      container.removeEventListener('touchstart', onDown);
      
      // Prevent WebGL context leaks
      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []); // Empty dependency array ensures this runs once

  return (
    <section className="relative w-full h-[85vh] bg-black overflow-hidden font-sans select-none border-b-2 border-[#1F1F69]">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#0a1628_0%,#000_70%)] z-0" />
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,180,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.04) 1px, transparent 1px)', 
          backgroundSize: '60px 60px' 
        }} 
      />
      
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-10 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing outline-none block" />
      </div>

      {/* Tailwind UI Overlays */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-20 w-full pointer-events-none">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-[0.2em] uppercase drop-shadow-lg">
          <span className="text-[#00b4ff]">7M</span> LED Headlamp
        </h1>
        <p className="text-[#00b4ff] text-xs md:text-sm tracking-[0.3em] mt-2 uppercase opacity-80">
          Motorcycle COB Series — H4 Pro
        </p>
      </div>

      <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white/40 text-xs tracking-widest uppercase z-20 pointer-events-none">
        <div className="w-8 h-8 rounded-full border border-[#00b4ff]/40 flex items-center justify-center animate-pulse">
          <ChevronRight className="w-4 h-4 text-[#00b4ff]" />
        </div>
        Drag to rotate 360°
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-4 md:gap-10 z-20 pointer-events-none w-max">
        {[
          { title: "COB", sub: "Technology" },
          { title: "6000K", sub: "Cool White" },
          { title: "40W", sub: "High Power" },
          { title: "1 Year", sub: "Warranty" }
        ].map((spec, i) => (
          <div key={i} className="text-center">
            <strong className="block text-[#00b4ff] font-bold text-lg md:text-xl">{spec.title}</strong>
            <span className="text-[10px] md:text-xs text-white/60 tracking-widest uppercase">{spec.sub}</span>
          </div>
        ))}
      </div>

      <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-4 z-20 pointer-events-none">
        {[{ t: "H4", b: "Base" }, { t: "IP65", b: "Rated" }].map((badge, i) => (
          <div key={i} className="bg-[#00b4ff]/10 border border-[#00b4ff]/30 rounded-lg px-4 py-3 text-center text-white/90 text-xs tracking-wider uppercase backdrop-blur-sm shadow-xl">
            <strong className="block text-[#00b4ff] text-lg mb-1">{badge.t}</strong>
            {badge.b}
          </div>
        ))}
      </div>
    </section>
  );
}