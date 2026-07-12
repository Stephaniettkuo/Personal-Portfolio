'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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

// PLACEHOLDER goals — replace with Stephanie's actual goals, progress %, and status
const GOALS = [
    { term: 'Short-term', text: 'PLACEHOLDER — a goal for the next few months.', progress: 65, status: 'PLACEHOLDER — a sentence on how this is going.' },
    { term: 'Mid-term', text: 'PLACEHOLDER — a goal for the next 1-2 years.', progress: 30, status: 'PLACEHOLDER — a sentence on how this is going.' },
    { term: 'Long-term', text: 'PLACEHOLDER — a goal for 5+ years out.', progress: 10, status: 'PLACEHOLDER — a sentence on how this is going.' },
];

export default function Goals() {
    const [openTerm, setOpenTerm] = useState<string | null>(null);

    return (
        <section id="goals" style={{ position: 'relative', width: '100%', padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)' }}>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
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

                <motion.div {...up(0.14)} style={{ height: '150px', margin: '0 0 1.4rem' }}>
                    <Constellation points={GOAL_POINTS} />
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {GOALS.map((g, i) => {
                        const open = openTerm === g.term;
                        return (
                            <motion.div key={g.term} {...up(0.2 + i * 0.08)}>
                                <GlassCard liquid style={{ padding: '0.9rem 1.1rem' }}>
                                    <div
                                        role="button"
                                        tabIndex={0}
                                        data-cursor-hover
                                        aria-expanded={open}
                                        aria-label={`${open ? 'Hide' : 'Show'} progress for the ${g.term.toLowerCase()} goal`}
                                        onClick={() => setOpenTerm(t => (t === g.term ? null : g.term))}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setOpenTerm(t => (t === g.term ? null : g.term));
                                            }
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{
                                                fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                                                color: 'var(--biolume-cyan)',
                                            }}>
                                                {g.term}
                                            </span>
                                            <motion.div aria-hidden animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ color: 'var(--biolume-blue)' }}>
                                                <ChevronDown size={14} />
                                            </motion.div>
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--pearl-dim)', marginTop: '0.3rem', lineHeight: 1.6 }}>
                                            {g.text}
                                        </p>

                                        <AnimatePresence initial={false}>
                                            {open && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <div style={{ marginTop: '0.9rem' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                                                            <span style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--pearl-faint)' }}>Progress</span>
                                                            <span style={{ fontSize: '0.65rem', color: 'var(--biolume-cyan)' }}>{g.progress}%</span>
                                                        </div>
                                                        <div style={{ height: '4px', borderRadius: '9999px', background: 'rgba(60,142,195,0.15)' }}>
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${g.progress}%` }}
                                                                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                                                                style={{ height: '100%', borderRadius: '9999px', background: 'linear-gradient(90deg, var(--biolume-blue), var(--biolume-cyan))' }}
                                                            />
                                                        </div>
                                                        <p style={{ fontSize: '0.78rem', color: 'var(--pearl-dim)', marginTop: '0.6rem', lineHeight: 1.6 }}>
                                                            {g.status}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
