'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';

// A single glowing 4-pointed star that drifts alongside the Journey scroll.
// On desktop it's `position: absolute` inside the pinned sticky viewport (a
// sibling of the track, not inside it), so it stays in view while cards
// scroll past underneath. On the mobile vertical layout there's no pinned
// viewport to anchor to — the whole page just scrolls normally — so it needs
// `position: fixed` instead to get the same "stays on screen" behavior,
// driven by ordinary vertical scroll progress rather than the horizontal
// track's.
export default function SparkleCompanion({
    scrollProgress, // MotionValue<number> 0→1 — horizontal track progress on desktop, vertical page progress on mobile
    containerWidth, // horizontal travel range in px — desktop's getDistance(), or roughly the viewport width on mobile
    position = 'absolute',
}: {
    scrollProgress: MotionValue<number>;
    containerWidth: number;
    position?: 'absolute' | 'fixed';
}) {
    // 1.15x the card track's own distance — moving slightly faster than the
    // cards reads as a closer depth plane (parallax). Lower stiffness / higher
    // damping than a typical spring so it eases into position gently instead
    // of darting to catch up with the scroll.
    const x = useTransform(scrollProgress, [0, 1], [60, containerWidth * 1.15]);
    const xSpring = useSpring(x, { stiffness: 35, damping: 30 });

    // Independent gentle vertical drift — not tied to scroll at all, just a
    // continuous sine wave so the sparkle feels alive even while stationary.
    const y = useMotionValue(0);
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        let frame: number;
        const start = performance.now();
        const animate = (now: number) => {
            const t = (now - start) / 9000; // 9s period — slow, gentle bob
            y.set(Math.sin(t * Math.PI * 2) * 20);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [y]);

    return (
        <motion.div
            aria-hidden
            style={{
                position,
                top: '35%',
                x: xSpring,
                y,
                zIndex: 15,
                pointerEvents: 'none',
            }}
        >
            <motion.svg
                width="24" height="24" viewBox="0 0 24 24"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(111,184,232,0.8))' }}
            >
                <path
                    d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                    fill="white"
                    opacity="0.9"
                />
                <circle cx="12" cy="12" r="2" fill="white" />
            </motion.svg>
        </motion.div>
    );
}
