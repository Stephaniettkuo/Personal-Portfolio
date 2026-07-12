'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, type MotionValue, useScroll, useTransform } from 'framer-motion';
import GalleryLightbox from './GalleryLightbox';
import { GALLERY_ITEMS, type GalleryItem } from '@/data/gallery';

// Multi-column scroll-parallax gallery — columns drift upward at different
// speeds as you scroll through the container, giving a sense of depth.
// Adapted from the "Skiper 30 Parallax" pattern (Skiper UI, free-to-use with
// attribution; itself an independent study of siena.film's scroll interactions).
// Reworked here to: reuse this site's existing global Lenis instance instead
// of spinning up a second one (the original created its own), use the dark
// glass palette instead of a light theme, and swap missing image files for
// placeholder gradient blocks.

// Column 2 gets 6 items (one extra, added at the bottom) instead of 5 —
// column 1 was reading as noticeably longer than the rest.
const COLUMNS = [
    { items: GALLERY_ITEMS.slice(0, 3), startIndex: 0, offset: -10, speed: 1.5 },
    { items: GALLERY_ITEMS.slice(5, 8), startIndex: 5, offset: -40, speed: 2.4 },
    { items: GALLERY_ITEMS.slice(11, 16), startIndex: 11, offset: -25, speed: 1.1 },
    { items: GALLERY_ITEMS.slice(16, 19), startIndex: 16, offset: -40, speed: 2 },
];

export default function ParallaxGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    // Both start at values that match the server-rendered output (0 / false);
    // real values are filled in after mount so there's nothing for hydration
    // to disagree about on the first render.
    const [viewportHeight, setViewportHeight] = useState(0);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    useEffect(() => {
        const applyReduceMotion = () => setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        const onResize = () => setViewportHeight(window.innerHeight);
        applyReduceMotion();
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <p className="font-display" style={{
                textAlign: 'center', fontSize: '1rem', fontStyle: 'italic', fontWeight: 300,
                color: 'var(--pearl-dim)', marginBottom: '0.25rem',
            }}>
                moments that stay with me
            </p>
            <h3 className="font-display" style={{
                textAlign: 'center', fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', fontWeight: 300,
                textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--pearl-dim)', marginBottom: '1.75rem',
            }}>
                Things I Love
            </h3>

            <div
                ref={containerRef}
                style={{
                    position: 'relative', display: 'flex', gap: '1.5vw',
                    height: '210vh', overflow: 'hidden', borderRadius: '1.5rem',
                    border: '1px solid var(--glass-border)',
                }}
            >
                {COLUMNS.map((col, i) => (
                    <GalleryColumn
                        key={i}
                        items={col.items}
                        startIndex={col.startIndex}
                        offset={col.offset}
                        distance={reduceMotion ? 0 : viewportHeight * col.speed}
                        scrollYProgress={scrollYProgress}
                        onSelect={setActiveIndex}
                    />
                ))}
            </div>

            <GalleryLightbox activeIndex={activeIndex} onClose={() => setActiveIndex(null)} />
        </div>
    );
}

function GalleryColumn({
    items, startIndex, offset, distance, scrollYProgress, onSelect,
}: {
    items: GalleryItem[];
    startIndex: number;
    offset: number;
    distance: number;
    scrollYProgress: MotionValue<number>;
    onSelect: (index: number) => void;
}) {
    const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

    return (
        <motion.div
            style={{
                position: 'relative', top: `${offset}%`, display: 'flex', flexDirection: 'column',
                gap: '1.5vw', flex: '1 1 0', minWidth: '160px', y,
            }}
        >
            {items.map((item, i) => {
                const index = startIndex + i;
                return (
                    <div
                        key={item.src}
                        className="gallery-panel"
                        role="button"
                        tabIndex={0}
                        data-cursor-hover
                        aria-label={`View more photos: ${item.caption.replace(/^PLACEHOLDER — /, '')}`}
                        onClick={() => onSelect(index)}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onSelect(index);
                            }
                        }}
                        style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', borderRadius: '0.9rem', overflow: 'hidden' }}
                    >
                        {/* PLACEHOLDER — swap for a real photo once available, e.g.
                            <Image src={item.src} alt="" fill style={{ objectFit: 'cover' }} /> */}
                        <div className="gallery-image" style={{
                            position: 'absolute', inset: 0,
                            background: `radial-gradient(circle at ${30 + (i * 17) % 50}% ${20 + (i * 23) % 50}%, rgba(111,184,232,0.22), transparent 60%), linear-gradient(160deg, var(--ocean-void), rgba(20,50,80,0.55))`,
                        }} />
                        <div className="gallery-scrim" aria-hidden style={{
                            position: 'absolute', inset: 0, background: 'rgba(4,16,31,0.58)',
                        }} />
                        <span className="gallery-caption" style={{
                            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            textAlign: 'center', padding: '1.1rem', fontSize: '0.78rem', lineHeight: 1.4,
                            letterSpacing: '0.02em', color: 'var(--pearl-dim)', fontFamily: 'Inter, sans-serif',
                        }}>
                            {item.caption}
                        </span>
                    </div>
                );
            })}
        </motion.div>
    );
}
