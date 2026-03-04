"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ChevronRight, Loader2 } from "lucide-react";

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    // 2. Renderer with explicit context settings
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 3. Branded Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const blueRim = new THREE.DirectionalLight(0x1F1F69, 4); // Brand Navy
    blueRim.position.set(-5, 2, -5);
    scene.add(blueRim);

    // 4. Building the 7M Bulb Model
    const bulbGroup = new THREE.Group();
    scene.add(bulbGroup);

    const HS_MAT = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.1 });
    const NAVY_MAT = new THREE.MeshStandardMaterial({ color: 0x1F1F69, metalness: 0.7, roughness: 0.3 });
    const LED_MAT = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2 });

    // Body
    const mainBody = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 1.8, 32), HS_MAT);
    bulbGroup.add(mainBody);

    // Navy Cap
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 0.4, 32), NAVY_MAT);
    cap.position.y = 1.1;
    bulbGroup.add(cap);

    // Cooling Fins
    for (let i = 0; i < 12; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.5, 0.3), HS_MAT);
      const angle = (i / 12) * Math.PI * 2;
      fin.position.set(Math.cos(angle) * 0.65, 0, Math.sin(angle) * 0.65);
      fin.rotation.y = -angle;
      bulbGroup.add(fin);
    }

    // LED Plate
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.2, 0.3), LED_MAT);
    led.position.set(0, 0.6, 0.2);
    bulbGroup.add(led);

    // Connector Base
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.45, 0.5, 6), HS_MAT);
    base.position.y = -1.3;
    bulbGroup.add(base);

    // 5. Animation & Interaction Logic
    let isDragging = false;
    let autoRotate = true;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const onMouseDown = (e: MouseEvent) => { isDragging = true; autoRotate = false; mouseX = e.clientX; mouseY = e.clientY; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      targetRotationY += (e.clientX - mouseX) * 0.01;
      targetRotationX += (e.clientY - mouseY) * 0.01;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseUp = () => { isDragging = false; autoRotate = true; };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getElapsedTime();
      frameId = requestAnimationFrame(animate);

      if (autoRotate) {
        bulbGroup.rotation.y += 0.01;
      } else {
        bulbGroup.rotation.y += (targetRotationY - bulbGroup.rotation.y) * 0.1;
        bulbGroup.rotation.x += (targetRotationX - bulbGroup.rotation.x) * 0.1;
      }

      // Floating Effect
      bulbGroup.position.y = Math.sin(delta * 1.5) * 0.2;
      
      // Pulse LED
      LED_MAT.emissiveIntensity = 2 + Math.sin(delta * 4) * 1;

      renderer.render(scene, camera);
      if (loading) setLoading(false);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[85vh] bg-[#020617] overflow-hidden flex items-center justify-center border-b-4 border-[#1F1F69]"
    >
      {/* Background Layer: Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#000000_100%)]" />
      
      {/* Grid Layer */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}
      />

      {loading && (
        <div className="absolute z-50 flex flex-col items-center gap-4 text-white">
          <Loader2 className="animate-spin text-[#3b82f6]" size={40} />
          <p className="text-xs tracking-widest uppercase opacity-50">Initializing 3D Engine...</p>
        </div>
      )}

      {/* The 3D Canvas - Elevated Z-index */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing outline-none block"
      />

      {/* Hero Content Overlay */}
      <div className="absolute top-16 left-0 w-full text-center z-20 pointer-events-none px-6">
        <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
          <span className="text-[#1F1F69] drop-shadow-[0_0_10px_rgba(31,31,105,0.8)]">7M</span> ACCESSORIES
        </h1>
        <p className="text-[#3b82f6] text-sm md:text-base font-bold tracking-[0.4em] mt-2 uppercase opacity-80">
          Precision Engineering — Pro Series
        </p>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center gap-6 md:gap-16 z-20 pointer-events-none px-6">
        {[
          { label: "LUMENS", val: "8000LM" },
          { label: "COLOR", val: "6500K" },
          { label: "LIFETIME", val: "50,000H" }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-[#1F1F69] font-black text-xl md:text-2xl italic leading-none">{stat.val}</p>
            <p className="text-white/40 text-[10px] tracking-widest font-bold mt-1 uppercase">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/20 text-[10px] tracking-[0.3em] uppercase z-20 pointer-events-none">
        <ChevronRight size={14} className="animate-pulse" />
        Drag to inspect components
      </div>
    </section>
  );
}