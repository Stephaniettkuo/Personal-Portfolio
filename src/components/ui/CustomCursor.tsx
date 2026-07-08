'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [enabled, setEnabled] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
    );
    const [hovering, setHovering] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const reduceMotion = typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const springX = useSpring(x, reduceMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 320, damping: 28, mass: 0.4 });
    const springY = useSpring(y, reduceMotion ? { stiffness: 1000, damping: 100 } : { stiffness: 320, damping: 28, mass: 0.4 });

    useEffect(() => {
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
        const update = () => setEnabled(fine.matches);
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

    return (
        <motion.div
            aria-hidden
            style={{
                position: 'fixed', top: 0, left: 0, zIndex: 100, pointerEvents: 'none',
                x: springX, y: springY, translateX: '-50%', translateY: '-50%',
            }}
        >
            <motion.div
                animate={{
                    width: hovering ? 34 : 10,
                    height: hovering ? 34 : 10,
                    backgroundColor: hovering ? 'rgba(60,142,195,0.15)' : 'rgba(232,244,248,0.9)',
                    boxShadow: hovering ? '0 0 20px rgba(60,142,195,0.5)' : '0 0 8px rgba(60,142,195,0.4)',
                }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ borderRadius: '50%', border: hovering ? '1px solid rgba(60,142,195,0.55)' : 'none' }}
            />
        </motion.div>
    );
}
