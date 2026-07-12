'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

// Each path is a 1440-wide tileable wave, drawn twice side by side (viewBox
// 2880 wide) so an infinite CSS translateX(0 -> -50%) loop is seamless —
// after shifting exactly one tile, the pattern lines back up with itself.
const BACK_WAVE = 'M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 C2400,100 2640,20 2880,60 L2880,120 L0,120 Z';
const FRONT_WAVE = 'M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 C1680,20 1920,100 2160,60 C2400,20 2640,100 2880,60 L2880,120 L0,120 Z';

const BUBBLES = [
    { left: '8%', size: 10, duration: 5.5, delay: 0 },
    { left: '22%', size: 6, duration: 4.5, delay: 1.2 },
    { left: '38%', size: 8, duration: 6, delay: 0.4 },
    { left: '55%', size: 5, duration: 4, delay: 2.1 },
    { left: '70%', size: 9, duration: 5.2, delay: 0.9 },
    { left: '86%', size: 7, duration: 4.8, delay: 1.8 },
];

export default function WaveDivider() {
    // Invisible at rest so the hero photo shows fully un-obscured; fades in
    // once the user actually starts scrolling toward About.
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 150, 350], [0, 0, 1]);

    return (
        <motion.div
            aria-hidden
            style={{
                position: 'absolute', bottom: -1, left: 0, width: '100%', height: '110px',
                overflow: 'hidden', zIndex: 6, pointerEvents: 'none',
                opacity,
            }}
        >
            <svg
                viewBox="0 0 2880 120" preserveAspectRatio="none"
                style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', animation: 'wave-drift 26s linear infinite' }}
            >
                <path d={BACK_WAVE} fill="rgba(20,50,80,0.6)" />
            </svg>
            <svg
                viewBox="0 0 2880 120" preserveAspectRatio="none"
                style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', animation: 'wave-drift 16s linear infinite' }}
            >
                <path d={FRONT_WAVE} fill="var(--ocean-void)" />
            </svg>

            {BUBBLES.map((b, i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -90], opacity: [0, 0.85, 0], scale: [0.4, 1, 0.6] }}
                    transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: 'easeOut' }}
                    style={{
                        position: 'absolute', bottom: '14px', left: b.left,
                        width: b.size, height: b.size, borderRadius: '50%',
                        border: '1px solid rgba(111,184,232,0.55)',
                        background: 'rgba(111,184,232,0.14)',
                    }}
                />
            ))}
        </motion.div>
    );
}
