'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './CinematicLayer.module.css';

const PARTICLE_COUNT = 420;
const PARTICLE_SPREAD = 8;

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ─── Scene & Camera ─────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    // ─── Bokeh Particle Texture (soft glowing circle) ───────────────────────
    const createBokehTexture = () => {
      const size = 128;
      const canvas2 = document.createElement('canvas');
      canvas2.width = size;
      canvas2.height = size;
      const ctx = canvas2.getContext('2d')!;
      const center = size / 2;
      const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.25, 'rgba(255, 200, 150, 0.8)');
      gradient.addColorStop(0.6, 'rgba(255, 100, 40, 0.25)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas2);
    };

    const bokehTexture = createBokehTexture();

    // ─── Particles ──────────────────────────────────────────────────────────
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random positions in a wide flat volume
      positions[i * 3]     = (Math.random() - 0.5) * PARTICLE_SPREAD * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * PARTICLE_SPREAD;
      positions[i * 3 + 2] = (Math.random() - 0.5) * PARTICLE_SPREAD * 0.6;

      // Size: mix of tiny and medium bokeh
      const sizeRoll = Math.random();
      if (sizeRoll < 0.15) {
        sizes[i] = 40 + Math.random() * 60; // large bokeh discs
      } else if (sizeRoll < 0.45) {
        sizes[i] = 15 + Math.random() * 25; // medium
      } else {
        sizes[i] = 4 + Math.random() * 12; // small pinpoints
      }

      // Colors — warm orange, soft gold, near-white
      const palette = Math.random();
      if (palette < 0.35) {
        // warm orange
        colors[i * 3]     = 1.0;
        colors[i * 3 + 1] = 0.42 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.1 + Math.random() * 0.15;
      } else if (palette < 0.6) {
        // soft gold / amber
        colors[i * 3]     = 1.0;
        colors[i * 3 + 1] = 0.75 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.3 + Math.random() * 0.25;
      } else {
        // near-white / cool white
        const w = 0.85 + Math.random() * 0.15;
        colors[i * 3]     = w;
        colors[i * 3 + 1] = w;
        colors[i * 3 + 2] = w;
      }

      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.12 + Math.random() * 0.22;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: true,
      map: bokehTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ─── Base positions (copy) ──────────────────────────────────────────────
    const basePositions = new Float32Array(positions);

    // ─── Mouse parallax ─────────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ─── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ─── Animation loop ──────────────────────────────────────────────────────
    let rafId: number;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const timer = new THREE.Timer();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      timer.update();
      const t = timer.getElapsed();

      // Smooth camera parallax
      targetX += (mouseX * 0.45 - targetX) * 0.04;
      targetY += (mouseY * 0.25 - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Float each particle with sine oscillation
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ph = phases[i];
        const sp = speeds[i];
        posAttr.array[i * 3]     = basePositions[i * 3] + Math.sin(t * sp + ph) * 0.18;
        posAttr.array[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(t * sp * 0.7 + ph) * 0.12;
        posAttr.array[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(t * sp * 0.5 + ph) * 0.08;
      }
      posAttr.needsUpdate = true;

      // Very gentle global drift rotation
      particles.rotation.y = Math.sin(t * 0.04) * 0.06;
      particles.rotation.x = Math.cos(t * 0.03) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      bokehTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
