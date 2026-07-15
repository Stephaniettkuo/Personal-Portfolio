'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles } from 'lucide-react';
import OceanCanvas from '@/components/ui/OceanCanvas';
import WaveDivider from '@/components/ui/WaveDivider';
import JellyfishOrb from '@/components/ui/JellyfishOrb';

gsap.registerPlugin(ScrollTrigger);

const up = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

const SHAFTS = [
    { left: '28%', skew: '-7deg', delay: '0s', opacity: 0.07 },
    { left: '48%', skew: ' 2deg', delay: '0.8s', opacity: 0.11 },
    { left: '63%', skew: ' 6deg', delay: '0.4s', opacity: 0.06 },
    { left: '18%', skew: '-4deg', delay: '1.4s', opacity: 0.04 },
];

const NAME_WORDS = ['Stephanie', 'Kuo'];

const nameContainer = {
    initial: {},
    animate: { transition: { staggerChildren: 0.12, delayChildren: 0.52 } },
};
const nameWord = {
    initial: { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [parallaxEnabled] = useState(
        () => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const shaftX = useTransform(mx, [-1, 1], [8, -8]);
    const shaftY = useTransform(my, [-1, 1], [5, -5]);
    const imageX = useTransform(mx, [-1, 1], [-6, 6]);
    const imageY = useTransform(my, [-1, 1], [-4, 4]);

    const btnX = useMotionValue(0);
    const btnY = useMotionValue(0);
    const btnSpringX = useSpring(btnX, { stiffness: 200, damping: 15, mass: 0.4 });
    const btnSpringY = useSpring(btnY, { stiffness: 200, damping: 15, mass: 0.4 });

    const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!parallaxEnabled || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
        my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handleBtnMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!parallaxEnabled) return;
        const rect = e.currentTarget.getBoundingClientRect();
        btnX.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        btnY.set((e.clientY - rect.top - rect.height / 2) * 0.3);
    };
    const handleBtnLeave = () => {
        btnX.set(0);
        btnY.set(0);
    };

    // Scroll-driven transition: Hero fades/scales away as About surfaces beneath it (§4.2)
    useGSAP(() => {
        if (!parallaxEnabled) return;
        gsap.to(sectionRef.current, {
            opacity: 0.2,
            scale: 0.94,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: true,
            },
        });
    }, { scope: sectionRef, dependencies: [parallaxEnabled] });

    return (
        <section
            id="hero"
            ref={sectionRef}
            onMouseMove={handlePointerMove}
            style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
        >
            {/*
        PUT YOUR GENERATED IMAGE IN: public/images/hero-bg.png
        Then uncomment the line below and delete the gradient div beneath it
      */}
            <motion.img
                src="/images/hero-bg.png" alt="" aria-hidden
                style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0,
                    x: imageX, y: imageY, scale: 1.05,
                }}
            />

            {/* Dark overlay so text stays legible over the photo */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1, background:
                    'linear-gradient(180deg,rgba(2,18,47,0.55) 0%, rgba(2,18,47,0.72) 100%)'
            }} />

            {/* ── Light shafts ── */}
            <motion.div style={{ position: 'absolute', inset: 0, zIndex: 1, x: shaftX, y: shaftY, pointerEvents: 'none' }}>
                {SHAFTS.map((s, i) => (
                    <div key={i} className="animate-pulse-glow" style={{
                        position: 'absolute', top: 0, left: s.left,
                        width: '110px', height: '65%',
                        background: `linear-gradient(180deg, rgba(60,142,195,${s.opacity}) 0%, transparent 100%)`,
                        transform: `translateX(-50%) skewX(${s.skew})`,
                        filter: 'blur(22px)',
                        animationDelay: s.delay,
                    }} />
                ))}
            </motion.div>

            {/* ── Particles + bubbles ── */}
            <OceanCanvas />

            {/* ── Main content ── */}
            {/* justifyContent:'center' (not space-between) — the orb is now a
                real flex sibling of the text instead of being absolutely
                positioned, so the two center as one group: the gap from the
                viewport's left edge to the text equals the gap from the orb to
                the right edge, automatically, at any width. When the orb hides
                itself below 1024px (see JellyfishOrb.tsx), the text becomes the
                only child and this same rule centers it alone — no separate
                mobile-specific alignment override needed. */}
            <div style={{
                position: 'relative', zIndex: 10, width: '100%', maxWidth: '1280px',
                margin: '0 auto', padding: 'clamp(1.5rem, 6vw, 6rem)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexWrap: 'wrap', gap: '2rem',
            }}>

                {/* Left */}
                <div style={{ flex: '1 1 320px', maxWidth: '560px' }}>

                    {/* hello i'm */}
                    <motion.p {...up(0.38)} className="font-display" style={{
                        fontSize: '1.45rem', fontStyle: 'italic', fontWeight: 300,
                        color: 'var(--pearl-dim)', marginBottom: '0.4rem',
                    }}>
                        hello, i&apos;m
                    </motion.p>

                    {/* Name — per-word stagger reveal */}
                    <motion.h1
                        initial="initial" animate="animate" variants={nameContainer}
                        className="font-display" style={{
                            display: 'flex', flexWrap: 'wrap', gap: '0 0.4ch',
                            fontSize: 'clamp(2.6rem, 6.5vw, 4.8rem)', fontWeight: 300,
                            textTransform: 'uppercase', letterSpacing: '0.11em', lineHeight: 1,
                            color: 'var(--pearl)', marginBottom: '1.1rem',
                            textShadow: '0 0 50px rgba(60,142,195,0.18)',
                        }}>
                        {NAME_WORDS.map(word => (
                            <motion.span key={word} variants={nameWord} style={{ display: 'inline-block' }}>
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    {/* Roles */}
                    <motion.p {...up(0.66)} style={{
                        fontSize: '0.85rem', letterSpacing: '0.28em', textTransform: 'uppercase',
                        color: 'var(--pearl-dim)', fontFamily: 'Inter,sans-serif', fontWeight: 300,
                        marginBottom: '1.1rem',
                    }}>
                        student &nbsp;•&nbsp; builder &nbsp;•&nbsp; researcher
                    </motion.p>

                    {/* Tagline */}
                    <motion.p {...up(0.80)} className="font-display" style={{
                        fontSize: '1.05rem', fontStyle: 'italic', fontWeight: 300,
                        lineHeight: 1.65, color: 'var(--pearl-faint)',
                        maxWidth: '370px', marginBottom: '2.2rem',
                    }}>
                        exploring technology, design, and curiosity
                        <br />to build meaningful impact.
                    </motion.p>

                    {/* CTA — magnetic hover */}
                    <motion.div {...up(0.94)}>
                        <motion.button
                            data-cursor-hover
                            onMouseMove={handleBtnMove}
                            onMouseLeave={handleBtnLeave}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                padding: '0.7rem 1.8rem', borderRadius: '9999px',
                                background: 'rgba(60,142,195,0)', border: '1px solid rgba(60,142,195,0.38)',
                                color: 'var(--pearl)', fontFamily: 'Inter,sans-serif',
                                fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                                fontWeight: 300,
                                boxShadow: '0 0 18px rgba(60,142,195,0.08)',
                                x: btnSpringX, y: btnSpringY,
                            }}
                            whileHover={{
                                background: 'rgba(60,142,195,0.1)',
                                borderColor: 'rgba(60,142,195,0.65)',
                                boxShadow: '0 0 28px rgba(60,142,195,0.22)',
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            Developing in Progress
                            <Sparkles size={13} style={{ color: 'var(--biolume-blue)' }} />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Right: jellyfish video orb — a real flex sibling now, not
                    absolutely positioned, so it centers as a pair with the text */}
                <JellyfishOrb />
            </div>

            {/* Divider into About — animated waves + rising bubbles instead of a flat fade */}
            <WaveDivider />

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
                style={{ position: 'absolute', bottom: '1.75rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
            >
                <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--pearl-faint)', fontFamily: 'Inter,sans-serif' }}>scroll</span>
                <motion.div
                    animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: '1px', height: '1.8rem', background: 'linear-gradient(180deg,var(--biolume-blue),transparent)' }}
                />
            </motion.div>
        </section>
    );
}
