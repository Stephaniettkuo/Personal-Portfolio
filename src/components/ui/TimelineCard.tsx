'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import type { JourneyMilestone } from '@/data/journey';

const TAG_STYLES: Record<NonNullable<JourneyMilestone['tag']>, { bg: string; color: string }> = {
    school: { bg: 'rgba(60,142,195,0.14)', color: 'var(--biolume-cyan)' },
    project: { bg: 'rgba(111,184,232,0.14)', color: 'var(--biolume-blue)' },
    life: { bg: 'rgba(232,244,248,0.09)', color: 'var(--pearl-dim)' },
    work: { bg: 'rgba(168,200,216,0.12)', color: 'var(--pearl-faint)' },
};

// Subtle per-tag card-background tint. Written as a flat two-stop gradient
// (same color twice) rather than a plain color — CSS only allows a plain
// background-color in the LAST layer of a multi-layer `background` shorthand,
// so layering this in front of `var(--glass-bg)` needs it in <image> form.
const TAG_TINTS: Record<NonNullable<JourneyMilestone['tag']>, string> = {
    life: 'linear-gradient(rgba(111,184,232,0.06), rgba(111,184,232,0.06))',
    school: 'linear-gradient(rgba(147,197,253,0.08), rgba(147,197,253,0.08))',
    project: 'linear-gradient(rgba(96,165,250,0.08), rgba(96,165,250,0.08))',
    work: 'linear-gradient(rgba(165,180,252,0.06), rgba(165,180,252,0.06))',
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
    expanded = false,
    onExpand,
}: {
    milestone: JourneyMilestone;
    imageHeight?: number;
    /** Controlled expand state. Omit `onExpand` entirely (as MobileJourney
     * does) to keep a card fully non-interactive — no click handler, no
     * "+" affordance — leaving the mobile list exactly as simple as before. */
    expanded?: boolean;
    onExpand?: () => void;
}) {
    const { year, title, description, fullStory, photos, photoCaptions, imagePlaceholder, tag, highlight } = milestone;
    const tagStyle = tag ? TAG_STYLES[tag] : null;
    const tint = TAG_TINTS[tag ?? 'life'];

    // Counts the year up from target-3 to the real year once the card
    // scrolls into view — skipped entirely for the still-placeholder '20XX'
    // text (parseInt('20XX') would silently succeed as 20, which is why this
    // checks the literal string first rather than trusting isNaN alone) and
    // for the 'Now' entry, both of which just render as static text.
    const [displayYear, setDisplayYear] = useState(year);
    const yearRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (year === 'Now' || year === '20XX') return;
        const target = parseInt(year, 10);
        if (isNaN(target)) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const showRealYear = () => setDisplayYear(year);
            showRealYear();
            return;
        }

        const start = target - 3;
        const duration = 600;
        let raf: number;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            const startTime = performance.now();
            const tick = (now: number) => {
                const progress = Math.min((now - startTime) / duration, 1);
                setDisplayYear(String(Math.round(start + (target - start) * progress)));
                if (progress < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        }, { threshold: 0.3 });

        if (yearRef.current) observer.observe(yearRef.current);
        return () => { observer.disconnect(); cancelAnimationFrame(raf); };
    }, [year]);

    const restScale = highlight ? 1.04 : 1;

    return (
        <motion.div
            layout
            animate={{ scale: restScale }}
            whileHover={{ scale: restScale + 0.03 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={onExpand}
            data-cursor-hover={onExpand ? true : undefined}
            style={{
                // min(...) so an expanded card can't overflow horizontally on
                // narrow phones — MobileJourney now uses expand too, and its
                // container is much narrower than the desktop track ever is.
                // Capped against 100vw (not 100%): this card is a flex item
                // inside the desktop track, whose own width is indefinite
                // (it's sized by its children, including this very card) —
                // percentages resolve against an indefinite containing block
                // as 0, which was collapsing the "100%" branch and squishing
                // the desktop expand into a tall, narrow column instead of a
                // wide rectangle. Viewport width is always definite.
                width: expanded ? 'min(420px, calc(100vw - 3rem))' : '280px',
                minHeight: '320px', flexShrink: 0,
                cursor: onExpand ? 'pointer' : 'default',
            }}
        >
            <GlassCard
                liquid
                style={{
                    padding: 0, overflow: 'hidden', height: '100%',
                    background: `${tint}, var(--glass-bg)`,
                    borderColor: highlight ? 'rgba(60,142,195,0.5)' : undefined,
                    boxShadow: highlight ? '0 0 24px rgba(60,142,195,0.25), inset 0 0 20px rgba(60,142,195,0.04)' : undefined,
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

                {onExpand && (
                    <div aria-hidden style={{
                        position: 'absolute', top: '0.75rem', right: '0.75rem',
                        opacity: expanded ? 0.8 : 0.4, transition: 'opacity 0.2s',
                        fontSize: '1.1rem', color: 'var(--pearl)', userSelect: 'none', zIndex: 2,
                        lineHeight: 1,
                    }}>
                        {expanded ? '−' : '+'}
                    </div>
                )}

                <div style={{ padding: '1.1rem 1.25rem 1.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                        <span ref={yearRef} className="font-display" style={{ fontSize: '2rem', color: 'var(--pearl-faint)', lineHeight: 1 }}>
                            {displayYear}
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

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                style={{ overflow: 'hidden' }}
                            >
                                <p style={{ fontSize: '0.82rem', color: 'var(--pearl-dim)', lineHeight: 1.7, marginTop: '0.75rem' }}>
                                    {fullStory}
                                </p>

                                {(photos?.length ?? 0) > 0 && (
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem' }}>
                                        {photos!.map((src, i) => (
                                            <div key={src} style={{
                                                flex: 1, aspectRatio: '1', borderRadius: '0.5rem', overflow: 'hidden',
                                                position: 'relative', background: 'rgba(20,50,80,0.5)',
                                            }}>
                                                <Image
                                                    src={src} alt={photoCaptions?.[i] ?? ''} fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <p style={{
                                    fontSize: '0.65rem', color: 'var(--pearl-faint)', marginTop: '0.6rem',
                                    textAlign: 'center', letterSpacing: '0.1em',
                                }}>
                                    click to close
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </GlassCard>
        </motion.div>
    );
}
