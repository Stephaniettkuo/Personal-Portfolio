'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

        // Keep GSAP ScrollTrigger's internal scroll position in sync with
        // Lenis's smoothed value — without this, anything using ScrollTrigger
        // (like Journey's pinned timeline) can drift out of sync with what's
        // actually on screen, since Lenis doesn't fire native `scroll` events
        // the way ScrollTrigger expects.
        lenis.on('scroll', ScrollTrigger.update);

        // Drive Lenis from GSAP's own ticker instead of a separate rAF loop,
        // so both libraries share one animation-frame clock. This is what
        // makes GSAP's `pin` reliable alongside Lenis.
        const update = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    return null;
}
