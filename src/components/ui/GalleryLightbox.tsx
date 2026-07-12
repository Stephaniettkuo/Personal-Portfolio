'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '@/data/gallery';

const SLIDES_PER_PANEL = 4;

// PLACEHOLDER "more photos related to this one" — deterministic gradient
// variants standing in until real photos exist per panel. Swap for an actual
// array of image paths per gallery item once you have them.
function buildSlides(seed: number) {
    return Array.from({ length: SLIDES_PER_PANEL }, (_, i) => ({
        gradient: `radial-gradient(circle at ${25 + ((seed + i) * 19) % 55}% ${20 + ((seed + i) * 27) % 55}%, rgba(111,184,232,0.28), transparent 60%), linear-gradient(160deg, var(--ocean-void), rgba(20,50,80,0.6))`,
    }));
}

export default function GalleryLightbox({
    activeIndex,
    onClose,
}: {
    activeIndex: number | null;
    onClose: () => void;
}) {
    const [slideIndex, setSlideIndex] = useState(0);
    // Portals need `document`, which doesn't exist during SSR — this starts
    // false to match the server-rendered output, and flips true after mount.
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const markMounted = () => setMounted(true);
        markMounted();
    }, []);

    useEffect(() => {
        if (activeIndex === null) return;
        const resetSlide = () => setSlideIndex(0);
        resetSlide();
        document.body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [activeIndex, onClose]);

    if (!mounted) return null;

    const item = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;
    const slides = activeIndex !== null ? buildSlides(activeIndex) : [];

    // Rendered via a portal straight into <body> — the gallery columns above
    // this have a scroll-linked `y` transform on them, and a `transform` on
    // any ancestor traps `position: fixed` descendants inside that ancestor's
    // box instead of the real viewport (the same class of bug the Journey
    // pin/sticky conflict was). Portaling out of that subtree avoids it.
    return createPortal(
        <AnimatePresence>
            {item && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 200,
                        background: 'rgba(2,8,18,0.86)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        onClick={e => e.stopPropagation()}
                        style={{ position: 'relative', width: '100%', maxWidth: '520px' }}
                    >
                        <button
                            onClick={onClose} aria-label="Close" data-cursor-hover
                            style={{ position: 'absolute', top: '-2.4rem', right: 0, background: 'none', border: 'none', color: 'var(--pearl-dim)' }}
                        >
                            <X size={20} aria-hidden />
                        </button>

                        <div style={{
                            borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--glass-border)',
                            background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                        }}>
                            <div style={{ position: 'relative', aspectRatio: '4 / 3', background: slides[slideIndex]?.gradient }}>
                                <button
                                    onClick={() => setSlideIndex(i => (i - 1 + slides.length) % slides.length)}
                                    aria-label="Previous photo" data-cursor-hover
                                    style={{
                                        position: 'absolute', left: '0.75rem', top: '50%', translate: '0 -50%',
                                        background: 'rgba(4,16,31,0.55)', border: 'none', borderRadius: '50%',
                                        width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pearl)',
                                    }}
                                >
                                    <ChevronLeft size={18} aria-hidden />
                                </button>
                                <button
                                    onClick={() => setSlideIndex(i => (i + 1) % slides.length)}
                                    aria-label="Next photo" data-cursor-hover
                                    style={{
                                        position: 'absolute', right: '0.75rem', top: '50%', translate: '0 -50%',
                                        background: 'rgba(4,16,31,0.55)', border: 'none', borderRadius: '50%',
                                        width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pearl)',
                                    }}
                                >
                                    <ChevronRight size={18} aria-hidden />
                                </button>
                            </div>

                            <div style={{ padding: '1.25rem 1.5rem' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--pearl-dim)', marginBottom: '0.9rem', textAlign: 'center' }}>
                                    {item.caption}
                                </p>
                                <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                                    {slides.map((_, i) => (
                                        <button
                                            key={i} onClick={() => setSlideIndex(i)} aria-label={`Go to photo ${i + 1}`} data-cursor-hover
                                            style={{
                                                width: i === slideIndex ? '16px' : '6px', height: '6px', borderRadius: '9999px', border: 'none',
                                                background: i === slideIndex ? 'var(--biolume-blue)' : 'var(--pearl-faint)',
                                                opacity: i === slideIndex ? 1 : 0.4, transition: 'all 0.3s',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
