'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Constellation from '@/components/ui/Constellation';

const up = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

const INFO = [
    { label: 'Based In', value: 'PLACEHOLDER — city, country' },
    { label: 'Currently', value: 'PLACEHOLDER — role / program' },
    { label: 'Interests', value: 'PLACEHOLDER — comma, separated, list' },
];

export default function About() {
    return (
        <section id="about" style={{ position: 'relative', width: '100%', padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)' }}>
            <div style={{
                maxWidth: '1180px', margin: '0 auto',
                display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(2.5rem, 6vw, 5rem)',
            }}>
                {/* Left: mood illustration + constellation accent */}
                <motion.div {...up(0)} style={{ flex: '1 1 320px', maxWidth: '440px' }}>
                    <GlassCard liquid style={{ aspectRatio: '4 / 5', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
                        {/* PLACEHOLDER: replace with real mood/ocean photo or illustration — see public/images/about/ */}
                        <div style={{
                            position: 'absolute', inset: '1rem', borderRadius: '1rem',
                            background: 'radial-gradient(circle at 30% 20%, rgba(111,184,232,0.25), transparent 60%), linear-gradient(160deg, var(--ocean-void), rgba(20,50,80,0.6))',
                        }} />
                        <div style={{ position: 'absolute', inset: '18%' }}>
                            <Constellation />
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Right: bio + info card */}
                <div style={{ flex: '1 1 360px', maxWidth: '560px' }}>
                    <motion.p {...up(0.1)} className="font-display" style={{
                        fontSize: '1.3rem', fontStyle: 'italic', fontWeight: 300,
                        color: 'var(--pearl-dim)', marginBottom: '0.4rem',
                    }}>
                        get to know
                    </motion.p>

                    <motion.h2 {...up(0.18)} className="font-display" style={{
                        fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 300,
                        textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1,
                        color: 'var(--pearl)', marginBottom: '1.4rem',
                    }}>
                        About Me
                    </motion.h2>

                    <motion.p {...up(0.26)} style={{
                        fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--pearl-dim)',
                        fontFamily: 'Inter, sans-serif', fontWeight: 300, marginBottom: '2rem',
                    }}>
                        {/* PLACEHOLDER bio copy — replace with Stephanie's actual background */}
                        I&apos;m a student, builder, and researcher who likes taking ideas from a rough
                        sketch to something people can actually use. I care most about the moments
                        where technology, design, and curiosity overlap — and I&apos;m always looking
                        for the next thing worth building.
                    </motion.p>

                    <motion.div {...up(0.34)}>
                        <GlassCard style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                            {INFO.map(row => (
                                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                                    <span style={{
                                        fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                                        color: 'var(--pearl-faint)', fontFamily: 'Inter, sans-serif', flexShrink: 0,
                                    }}>
                                        {row.label}
                                    </span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--pearl)', textAlign: 'right' }}>
                                        {row.value}
                                    </span>
                                </div>
                            ))}
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
