'use client';

import { motion } from 'framer-motion';
import Constellation from '@/components/ui/Constellation';
import GlassCard from '@/components/ui/GlassCard';

const up = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

const GOAL_POINTS = [
    { x: 15, y: 68, label: 'Short-term' },
    { x: 50, y: 22, label: 'Mid-term' },
    { x: 85, y: 62, label: 'Long-term' },
];

// PLACEHOLDER goals — replace with Stephanie's actual goals
const GOALS = [
    { term: 'Short-term', text: 'PLACEHOLDER — a goal for the next few months.' },
    { term: 'Mid-term', text: 'PLACEHOLDER — a goal for the next 1-2 years.' },
    { term: 'Long-term', text: 'PLACEHOLDER — a goal for 5+ years out.' },
];

export default function Goals() {
    return (
        <div id="goals" style={{ flex: '1 1 360px' }}>
            <motion.p {...up(0)} className="font-display" style={{
                fontSize: '1.3rem', fontStyle: 'italic', fontWeight: 300,
                color: 'var(--pearl-dim)', marginBottom: '0.4rem',
            }}>
                looking ahead
            </motion.p>

            <motion.h2 {...up(0.08)} className="font-display" style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 300,
                textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1, color: 'var(--pearl)',
                marginBottom: '1rem',
            }}>
                Goals
            </motion.h2>

            <motion.div {...up(0.14)} style={{ height: '130px', margin: '0 0 1.4rem' }}>
                <Constellation points={GOAL_POINTS} />
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {GOALS.map((g, i) => (
                    <motion.div key={g.term} {...up(0.2 + i * 0.08)}>
                        <GlassCard style={{ padding: '0.9rem 1.1rem' }}>
                            <span style={{
                                fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                                color: 'var(--biolume-cyan)',
                            }}>
                                {g.term}
                            </span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--pearl-dim)', marginTop: '0.3rem', lineHeight: 1.6 }}>
                                {g.text}
                            </p>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
