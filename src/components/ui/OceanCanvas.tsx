'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; size: number;
  speedX: number; speedY: number;
  opacity: number; opacitySpeed: number;
  color: string;
}
interface Bubble {
  x: number; y: number; size: number; speed: number;
  opacity: number; wobble: number; wobbleSpeed: number; wobbleOffset: number;
}

const COLORS = ['rgba(60,142,195', 'rgba(0,229,255', 'rgba(125,211,252', 'rgba(255,255,255'];

export default function OceanCanvas({
  particleCount = 100,
  bubbleCount = 16,
  maxOpacity = 1,
}: {
  particleCount?: number;
  bubbleCount?: number;
  /** Scales every particle/bubble's opacity — use < 1 for a calmer, quieter field. */
  maxOpacity?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let id: number;
    let particles: Particle[] = [];
    let bubbles: Bubble[] = [];

    const init = () => {
      // Size the drawing buffer to the canvas's own rendered dimensions, not
      // the viewport. This canvas is typically `inset: 0` of whatever wrapper
      // it's placed in — if that wrapper is taller than one screen (like
      // About's, which spans the full section height), sizing to
      // window.innerHeight left everything below the first screen blank,
      // since particles were only ever distributed within that first slice.
      canvas.width  = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.4,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.18,
        opacity: (Math.random() * 0.6 + 0.1) * maxOpacity,
        opacitySpeed: (Math.random() * 0.006 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));

      bubbles = Array.from({ length: bubbleCount }, () => ({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 400,
        size: Math.random() * 7 + 2,
        speed: Math.random() * 0.5 + 0.25,
        opacity: (Math.random() * 0.35 + 0.08) * maxOpacity,
        wobble: 0,
        wobbleSpeed: Math.random() * 0.025 + 0.008,
        wobbleOffset: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // particles
      for (const p of particles) {
        p.x += p.speedX; p.y += p.speedY;
        p.opacity += p.opacitySpeed;
        if (p.opacity <= 0.05 || p.opacity >= 0.75) p.opacitySpeed *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        if (p.size > 1.4) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          g.addColorStop(0, `${p.color},${p.opacity})`);
          g.addColorStop(1, `${p.color},0)`);
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = g; ctx.fill();
        } else {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color},${p.opacity})`; ctx.fill();
        }
      }

      // bubbles
      for (const b of bubbles) {
        b.y -= b.speed; b.wobble += b.wobbleSpeed;
        if (b.y < -20) { b.y = canvas.height + 10; b.x = Math.random() * canvas.width; }
        const bx = b.x + Math.sin(b.wobble + b.wobbleOffset) * 14;
        ctx.beginPath(); ctx.arc(bx, b.y, b.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(60,142,195,${b.opacity})`; ctx.lineWidth = 0.7; ctx.stroke();
        ctx.beginPath(); ctx.arc(bx - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${b.opacity * 0.5})`; ctx.fill();
      }

      id = requestAnimationFrame(draw);
    };

    init(); draw();

    // ResizeObserver instead of a window-resize listener — it also catches
    // content-driven size changes (e.g. this canvas's container growing once
    // images below it load), not just viewport resizes.
    const observer = new ResizeObserver(() => init());
    observer.observe(canvas);
    return () => { observer.disconnect(); cancelAnimationFrame(id); };
  }, [particleCount, bubbleCount, maxOpacity]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
    />
  );
}