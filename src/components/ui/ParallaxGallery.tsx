'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import Image from 'next/image';
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
    { items: GALLERY_ITEMS.slice(5, 8), startIndex: 5, offset: -40, speed: 2.6 },
    { items: GALLERY_ITEMS.slice(11, 16), startIndex: 11, offset: -25, speed: 1.1 },
    { items: GALLERY_ITEMS.slice(16, 19), startIndex: 16, offset: -40, speed: 2.3 },
];

export default function ParallaxGallery() {
    // Separate from `containerRef` below — this one wraps the whole gallery
    // (header + layout) purely so ResizeObserver can measure the real
    // available width and decide which layout fits.
    const outerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // All four start at values that match the server-rendered output (0 /
    // false / true / 3); real values are filled in after mount so there's
    // nothing for hydration to disagree about on the first render. Starting
    // useParallax at true matches what the server always renders (it has no
    // way to know the client's container width).
    const [viewportHeight, setViewportHeight] = useState(0);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [useParallax, setUseParallax] = useState(true);
    const [tileColumns, setTileColumns] = useState(3);

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

    // Measures the container's own rendered width — not window.innerWidth —
    // so this responds to the real available space (section padding, zoom
    // level, screen size) rather than a fixed viewport breakpoint. 4 columns
    // need 4×160px of tile width plus 3 gaps of 1.5% of the container's own
    // width; below that the parallax layout would clip, so it falls back to
    // a plain tile grid instead.
    useEffect(() => {
        const outer = outerRef.current;
        if (!outer) return;

        const observer = new ResizeObserver(entries => {
            const entry = entries[0];
            if (!entry) return;
            const { width } = entry.contentRect;
            const minNeeded = 4 * 160 + 3 * (width * 0.015);
            setUseParallax(width >= minNeeded);
            setTileColumns(width < 480 ? 2 : 3);
        });

        observer.observe(outer);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={outerRef} style={{ position: 'relative', width: '100%' }}>
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

            {useParallax ? (
                <ParallaxLayout
                    containerRef={containerRef}
                    scrollYProgress={scrollYProgress}
                    reduceMotion={reduceMotion}
                    viewportHeight={viewportHeight}
                    onSelect={setActiveIndex}
                />
            ) : (
                <TileGrid columns={tileColumns} onSelect={setActiveIndex} />
            )}

            <GalleryLightbox activeIndex={activeIndex} onClose={() => setActiveIndex(null)} />
        </div>
    );
}

function ParallaxLayout({
    containerRef, scrollYProgress, reduceMotion, viewportHeight, onSelect,
}: {
    containerRef: RefObject<HTMLDivElement | null>;
    scrollYProgress: MotionValue<number>;
    reduceMotion: boolean;
    viewportHeight: number;
    onSelect: (index: number) => void;
}) {
    return (
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
                    onSelect={onSelect}
                />
            ))}
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
                        <GalleryThumb src={item.src} seed={i} className="gallery-image" />
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

// Fallback for when the container is too narrow to fit the 4-column parallax
// layout without clipping — a plain, non-parallax tile grid of every gallery
// item. flex-wrap + justifyContent:center (not CSS grid) so a partial last
// row centers itself automatically instead of sticking to the left — grid
// shares column tracks across every row and needs extra logic to do this.
function TileGrid({
    columns, onSelect,
}: {
    columns: number;
    onSelect: (index: number) => void;
}) {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '0.5rem',
            borderRadius: '1.5rem',
            border: '1px solid var(--glass-border)',
        }}>
            {GALLERY_ITEMS.map((item, index) => (
                <TileItem key={item.src} item={item} index={index} columns={columns} onSelect={onSelect} />
            ))}
        </div>
    );
}

function TileItem({
    item, index, columns, onSelect,
}: {
    item: GalleryItem;
    index: number;
    columns: number;
    onSelect: (index: number) => void;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            role="button"
            tabIndex={0}
            data-cursor-hover
            aria-label={`View: ${item.caption.replace(/^PLACEHOLDER — /, '')}`}
            onClick={() => onSelect(index)}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(index);
                }
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                flex: `0 0 calc(${100 / columns}% - 0.5rem)`,
                aspectRatio: '3 / 4',
                borderRadius: '0.9rem',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                transform: hovered ? 'scale(1.03)' : 'scale(1)',
                boxShadow: hovered ? '0 0 20px rgba(60,142,195,0.3)' : 'none',
            }}
        >
            <GalleryThumb src={item.src} seed={index} />

            <div aria-hidden style={{
                position: 'absolute', inset: 0,
                background: 'rgba(4,16,31,0.58)',
                opacity: hovered ? 0.2 : 1,
                transition: 'opacity 0.25s ease',
            }} />

            <span style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '1rem', fontSize: '0.78rem', lineHeight: 1.4,
                letterSpacing: '0.02em', color: 'var(--pearl-dim)', fontFamily: 'Inter, sans-serif',
                opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease',
            }}>
                {item.caption}
            </span>
        </div>
    );
}

// Shared thumbnail renderer for both the parallax panels and the tile grid.
// Falls back to the same deterministic gradient placeholder used before real
// photos existed if the image at `src` 404s (still-PLACEHOLDER paths, typos,
// etc.) — so a box with a broken path degrades gracefully instead of showing
// a broken-image icon. `key`ing this by `src` at the call site makes the
// fallback re-attempt automatically whenever the path is edited in gallery.ts.
function GalleryThumb({ src, seed, className }: { src: string; seed: number; className?: string }) {
    const [errored, setErrored] = useState(false);

    if (errored) {
        return (
            <div className={className} aria-hidden style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at ${30 + (seed * 17) % 50}% ${20 + (seed * 23) % 50}%, rgba(111,184,232,0.22), transparent 60%), linear-gradient(160deg, var(--ocean-void), rgba(20,50,80,0.55))`,
            }} />
        );
    }

    return (
        <Image
            src={src} alt="" fill
            className={className}
            style={{ objectFit: 'cover' }}
            onError={() => setErrored(true)}
        />
    );
}
