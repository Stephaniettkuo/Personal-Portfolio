'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    // Starts false to match the server-rendered output exactly (server never
    // knows the client's pointer type). Flips on after mount — a post-hydration
    // state update is fine; branching the *initial* render on window would not be
    // (server always renders null here, so a client-only true would be a mismatch).
    const [enabled, setEnabled] = useState(false);
    const [hovering, setHovering] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const reduceMotion = typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mainConfig = reduceMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 320, damping: 28, mass: 0.4 };
    const springX = useSpring(x, mainConfig);
    const springY = useSpring(y, mainConfig);

    // Trailing glow: each point is a spring chasing the point in front of it, a
    // little softer each step. That chain (rather than a fixed-length position
    // history array) is what gives the tail its elastic, liquid feel instead of
    // a mechanical dotted line. Skipped entirely under reduced-motion.
    const trailConfig = { stiffness: 140, damping: 20, mass: 0.6 };
    const trail1X = useSpring(springX, trailConfig);
    const trail1Y = useSpring(springY, trailConfig);
    const trail2X = useSpring(trail1X, trailConfig);
    const trail2Y = useSpring(trail1Y, trailConfig);
    const trail3X = useSpring(trail2X, trailConfig);
    const trail3Y = useSpring(trail2Y, trailConfig);

    useEffect(() => {
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
        const update = () => setEnabled(fine.matches);
        update();
        fine.addEventListener('change', update);
        return () => fine.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const move = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        const over = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            setHovering(!!target.closest('a, button, [data-cursor-hover]'));
        };

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseover', over);
        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseover', over);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    const scale = hovering ? 1.8 : 1;
    const trailPoints = reduceMotion ? [] : [
        { x: trail3X, y: trail3Y, size: 5, opacity: 0.14, blur: 6 },
        { x: trail2X, y: trail2Y, size: 7, opacity: 0.2, blur: 5 },
        { x: trail1X, y: trail1Y, size: 9, opacity: 0.3, blur: 4 },
    ];

    return (
        <>
            {trailPoints.map((p, i) => (
                <motion.div
                    key={i}
                    aria-hidden
                    style={{
                        position: 'fixed', top: 0, left: 0, zIndex: 9997, pointerEvents: 'none',
                        x: p.x, y: p.y, translateX: '-50%', translateY: '-50%',
                    }}
                >
                    <motion.div
                        animate={{ width: p.size * scale, height: p.size * scale }}
                        transition={{ duration: 0.3 }}
                        style={{
                            borderRadius: '50%', background: 'var(--biolume-cyan)',
                            opacity: p.opacity, filter: `blur(${p.blur}px)`,
                        }}
                    />
                </motion.div>
            ))}

            {/* soft outer halo */}
            <motion.div
                aria-hidden
                style={{
                    position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none',
                    x: springX, y: springY, translateX: '-50%', translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{ width: hovering ? 56 : 28, height: hovering ? 56 : 28 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(111,184,232,0.55) 0%, rgba(60,142,195,0.2) 55%, transparent 75%)',
                        filter: 'blur(3px)',
                    }}
                />
            </motion.div>

            {/* crisp core */}
            <motion.div
                aria-hidden
                style={{
                    position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
                    x: springX, y: springY, translateX: '-50%', translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        width: hovering ? 14 : 8,
                        height: hovering ? 14 : 8,
                        backgroundColor: hovering ? 'var(--biolume-cyan)' : 'rgba(232,244,248,0.95)',
                    }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                        borderRadius: '50%',
                        boxShadow: hovering ? '0 0 18px rgba(111,184,232,0.7)' : '0 0 8px rgba(60,142,195,0.5)',
                    }}
                />
            </motion.div>
        </>
    );
}
