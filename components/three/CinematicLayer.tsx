'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createBokehTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);
  const r = size / 2;
  const g = ctx.createRadialGradient(r, r, 0, r, r, r);
  g.addColorStop(0,    'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.6)');
  g.addColorStop(0.6,  'rgba(255,255,255,0.12)');
  g.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

const PALETTE = [0xfff4e0, 0xffcc88, 0xff9944, 0xffeedd, 0xffddaa, 0xffffff];

export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.z = 6;

    const tex = createBokehTexture();
    const orbs: THREE.Sprite[] = [];

    for (let i = 0; i < 22; i++) {
      const mat = new THREE.SpriteMaterial({
        map: tex,
        color: new THREE.Color(PALETTE[i % PALETTE.length]),
        transparent: true,
        opacity: Math.random() * 0.09 + 0.03,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      const scale = Math.random() * 4 + 2;
      sprite.scale.set(scale, scale, 1);
      const ox = (Math.random() - 0.5) * 18;
      const oy = (Math.random() - 0.5) * 11;
      sprite.position.set(ox, oy, (Math.random() - 0.5) * 3);

      const wx = (2 * Math.PI) / (Math.random() * 18 + 12);
      const wy = (2 * Math.PI) / (Math.random() * 14 + 8);
      sprite.userData = {
        ox,
        oy,
        ax: Math.random() * 0.9 + 0.3,
        ay: Math.random() * 0.55 + 0.2,
        phase: Math.random() * Math.PI * 2,
        wx,
        wy,
      };
      scene.add(sprite);
      orbs.push(sprite);
    }

    const mouse = { x: 0, y: 0 };
    const camPos = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5);
      mouse.y = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);

    // Use a custom clock/delta mechanism to avoid standard THREE.Clock if THREE.Timer is not resolved
    let lastTime = performance.now();
    let elapsed = 0;
    let animId: number;

    const animate = (timestamp: number) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) {
        lastTime = timestamp;
        return;
      }
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      elapsed += Math.min(delta, 0.05); // cap

      orbs.forEach(s => {
        const { ox, oy, ax, ay, phase, wx, wy } = s.userData;
        s.position.x = ox + Math.sin(elapsed * wx + phase) * ax;
        s.position.y = oy + Math.cos(elapsed * wy + phase * 0.7) * ay;
      });

      camPos.x += (mouse.x * 0.5 - camPos.x) * 0.025;
      camPos.y += (-mouse.y * 0.3 - camPos.y) * 0.025;
      camera.position.x = camPos.x;
      camera.position.y = camPos.y;

      renderer.render(scene, camera);
    };
    requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      tex.dispose();
      orbs.forEach(s => s.material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }}
    />
  );
}
