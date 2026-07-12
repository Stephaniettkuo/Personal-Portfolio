'use client';

import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import type { JourneyMilestone } from '@/data/journey';

const TAG_STYLES: Record<NonNullable<JourneyMilestone['tag']>, { bg: string; color: string }> = {
    school: { bg: 'rgba(60,142,195,0.14)', color: 'var(--biolume-cyan)' },
    project: { bg: 'rgba(111,184,232,0.14)', color: 'var(--biolume-blue)' },
    life: { bg: 'rgba(232,244,248,0.09)', color: 'var(--pearl-dim)' },
    work: { bg: 'rgba(168,200,216,0.12)', color: 'var(--pearl-faint)' },
};

// A small shell motif for image placeholders, so an empty slot reads as
// "intentional decoration" rather than "missing content."
function ShellMotif() {
    return (
        <svg viewBox="0 0 40 40" aria-hidden style={{ width: '34px', height: '34px', opacity: 0.35 }}>
            <path d="M20 32 C10 32 6 24 8 16 C10 8 16 4 20 4 C24 4 30 8 32 16 C34 24 30 32 20 32Z"
                fill="none" stroke="var(--biolume-cyan)" strokeWidth="0.8" />
            {[0, 1, 2, 3, 4].map(i => (
                <path key={i} d={`M20 32 L${14 + i * 3} 8`} fill="none" stroke="var(--biolume-cyan)" strokeWidth="0.5" />
            ))}
        </svg>
    );
}

export default function TimelineCard({
    milestone,
    imageHeight = 150,
}: {
    milestone: JourneyMilestone;
    imageHeight?: number;
}) {
    const { year, title, description, imagePlaceholder, tag, highlight } = milestone;
    const tagStyle = tag ? TAG_STYLES[tag] : null;

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: '280px', minHeight: '320px', flexShrink: 0 }}
        >
            <GlassCard
                liquid
                style={{
                    padding: 0, overflow: 'hidden', height: '100%',
                    borderColor: highlight ? 'rgba(111,184,232,0.5)' : undefined,
                    boxShadow: highlight ? '0 0 28px rgba(60,142,195,0.28)' : undefined,
                }}
            >
                {/* PLACEHOLDER: replace with public/images/journey/<year>.jpg via next/image, objectFit cover */}
                <div style={{
                    height: `${imageHeight}px`, position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: imagePlaceholder,
                    boxShadow: 'inset 0 -20px 30px -20px rgba(0,0,0,0.4)',
                }}>
                    <ShellMotif />
                </div>

                <div style={{ padding: '1.1rem 1.25rem 1.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                        <span className="font-display" style={{ fontSize: '2rem', color: 'var(--pearl-faint)', lineHeight: 1 }}>
                            {year}
                        </span>
                        {tagStyle && (
                            <span style={{
                                fontSize: '0.62rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                                padding: '0.25rem 0.55rem', borderRadius: '9999px',
                                background: tagStyle.bg, color: tagStyle.color,
                            }}>
                                {tag}
                            </span>
                        )}
                    </div>

                    <h3 style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--pearl)', marginBottom: '0.4rem', letterSpacing: '0.01em' }}>
                        {title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.65, color: 'var(--pearl-dim)', fontWeight: 300 }}>
                        {description}
                    </p>
                </div>
            </GlassCard>
        </motion.div>
    );
}
