'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const up = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

// PLACEHOLDER achievements — replace with Stephanie's actual awards/recognitions
const ACHIEVEMENTS = [
    { id: 'achievement-1', icon: Trophy, label: 'PLACEHOLDER — achievement title' },
    { id: 'achievement-2', icon: Medal, label: 'PLACEHOLDER — achievement title' },
    { id: 'achievement-3', icon: Star, label: 'PLACEHOLDER — achievement title' },
];

export default function Achievements() {
    return (
        <section id="achievements" style={{ position: 'relative', width: '100%', padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)' }}>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                <motion.p {...up(0)} className="font-display" style={{
                    fontSize: '1.3rem', fontStyle: 'italic', fontWeight: 300,
                    color: 'var(--pearl-dim)', marginBottom: '0.4rem',
                }}>
                    proud moments
                </motion.p>

                <motion.h2 {...up(0.08)} className="font-display" style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 300,
                    textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1, color: 'var(--pearl)',
                    marginBottom: '1.6rem',
                }}>
                    Achievements
                </motion.h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {ACHIEVEMENTS.map((a, i) => {
                        const Icon = a.icon;
                        return (
                            <motion.div key={a.id} {...up(0.16 + i * 0.08)}>
                                <GlassCard liquid style={{ padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                                    <div style={{
                                        width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: 'rgba(60,142,195,0.12)', color: 'var(--biolume-cyan)',
                                    }}>
                                        <Icon size={17} />
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--pearl)' }}>{a.label}</span>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
