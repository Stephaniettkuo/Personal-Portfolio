'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
    id: number;
    xPct: number;    // position within the hero section, 0-100
    yPct: number;
    size: number;    // diameter in px
    duration: number;
    delay: number;
    star: boolean;   // 4-pointed star instead of a circle
}

const SPARKLE_COUNT = 60;
const STAR_CLIP = 'polygon(50% 0%, 55% 45%, 100% 50%, 55% 55%, 50% 100%, 45% 55%, 0% 50%, 45% 45%)';

function generateSparkles(): Sparkle[] {
    return Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
        id: Date.now() + i,
        xPct: Math.random() * 100,
        yPct: Math.random() * 100,
        size: 3 + Math.random() * 5,
        duration: 1.5 + Math.random() * 0.6,
        delay: Math.random() * 0.35,
        star: i % 4 === 0,
    }));
}

// A scattered field of sparkles across the whole Hero section, rather than a
// single point-of-origin burst — meant to sit as a full-bleed absolutely
// positioned overlay inside the Hero <section> (which is already
// position:relative), so xPct/yPct place each sparkle anywhere across the
// entire section instead of relative to the button that triggered it.
// `trigger` is a counter the parent bumps on each click; incrementing it
// (rather than toggling a boolean) is what lets repeated clicks each fire a
// fresh burst even while a previous one is still fading out.
export default function HeroSparkleBurst({ trigger }: { trigger: number }) {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        if (trigger === 0) return; // skip on initial mount — only real clicks burst
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;
        const spawn = () => setSparkles(generateSparkles());
        spawn();
    }, [trigger]);

    return (
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 15, overflow: 'hidden', pointerEvents: 'none' }}>
            <AnimatePresence>
                {sparkles.map(s => (
                    <motion.div
                        key={s.id}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.6] }}
                        transition={{ duration: s.duration, delay: s.delay, ease: 'easeOut' }}
                        onAnimationComplete={() => setSparkles(prev => prev.filter(p => p.id !== s.id))}
                        style={{
                            position: 'absolute',
                            top: `${s.yPct}%`, left: `${s.xPct}%`,
                            width: `${s.size}px`, height: `${s.size}px`,
                            marginTop: `${-s.size / 2}px`, marginLeft: `${-s.size / 2}px`,
                            borderRadius: s.star ? 0 : '50%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(111,184,232,0.8) 50%, transparent 100%)',
                            boxShadow: '0 0 5px 1px rgba(255,255,255,0.6)',
                            clipPath: s.star ? STAR_CLIP : undefined,
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
