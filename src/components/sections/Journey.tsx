'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { Home, Info, FolderKanban, Trophy, Target, Mail } from 'lucide-react';
import OceanCanvas from '@/components/ui/OceanCanvas';
import TimelineCard from '@/components/ui/TimelineCard';
import { JOURNEY } from '@/data/journey';

gsap.registerPlugin(ScrollTrigger);

// A smooth continuous wave (SVG "T" shorthand reflects the previous control
// point automatically, so each hump alternates up/down on its own) stretched
// to fill whatever width the track ends up being — it doesn't need to match
// the actual pixel width, non-uniform stretching of a sine-like curve still
// reads as "wavy," it just changes the apparent frequency slightly.
const WAVE_D = 'M0,20 Q50,4 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20';

const END_LINKS = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/#about', icon: Info },
    { label: 'Projects', href: '/projects', icon: FolderKanban },
    { label: 'Achievements', href: '/achievements', icon: Trophy },
    { label: 'Goals', href: '/goals', icon: Target },
    { label: 'Contact', href: '/contact', icon: Mail },
];

function CurrentLines() {
    const lines = [18, 42, 68, 84];
    return (
        <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>
            {lines.map((top, i) => (
                <div key={i} style={{
                    position: 'absolute', top: `${top}%`, left: 0, width: '220%', height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(60,142,195,0.14), transparent)',
                    animation: `wave-drift ${30 + i * 8}s linear infinite`,
                    filter: 'blur(1px)',
                }} />
            ))}
        </div>
    );
}

function MobileJourney() {
    return (
        <div style={{ padding: '9rem clamp(1.5rem, 6vw, 6rem) 4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            {JOURNEY.map((m, i) => (
                <TimelineCard key={m.year + i} milestone={m} />
            ))}
            <p className="font-display" style={{ fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--pearl-dim)', textAlign: 'center', margin: '1rem 0' }}>
                To be continued&hellip;
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', width: '100%', maxWidth: '420px' }}>
                {END_LINKS.map(({ label, href, icon: Icon }) => (
                    <Link key={href} href={href} data-cursor-hover style={{ textDecoration: 'none' }}>
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                            padding: '1.25rem 0.75rem', borderRadius: '1rem',
                            background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                        }}>
                            <Icon size={18} aria-hidden style={{ color: 'var(--biolume-cyan)' }} />
                            <span style={{ fontSize: '0.78rem', color: 'var(--pearl)' }}>{label}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function Journey() {
    // sectionRef is BOTH the ScrollTrigger and the pinned element — GSAP
    // measures and injects its own spacer to reserve scroll room, so there's
    // no manually-computed wrapper height to keep in sync with anything.
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    useGSAP(() => {
        if (!isDesktop) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        // A function, not a pre-computed number — GSAP re-evaluates this on
        // every refresh (e.g. window resize), so it can never go stale the
        // way a value captured once in React state could.
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const st = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            animation: gsap.to(track, { x: () => -getDistance(), ease: 'none' }),
        });

        return () => st.kill();
    }, { scope: sectionRef, dependencies: [isDesktop] });

    return (
        <>
            {/* Desktop and mobile are mutually exclusive by JS state, not a CSS
                breakpoint toggle — both versions used to stay mounted in the DOM
                with only visibility switched, and the mobile stack was showing up
                underneath the desktop pin instead of being fully suppressed. */}
            <div
                ref={sectionRef}
                style={{
                    display: isDesktop ? 'block' : 'none',
                    position: 'relative', width: '100%', height: '100vh', overflow: 'hidden',
                }}
            >
                <OceanCanvas particleCount={40} bubbleCount={6} maxOpacity={0.55} />
                <CurrentLines />

                {/* Pinned left header */}
                <div style={{ position: 'absolute', left: 'clamp(1.5rem, 5vw, 4rem)', top: '50%', translate: '0 -50%', zIndex: 5, maxWidth: '220px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--pearl-faint)', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>02</span>
                    <h2 className="font-display" style={{ fontSize: '2.5rem', color: 'var(--pearl)', margin: '0.3rem 0 0.9rem', lineHeight: 1 }}>
                        My Journey ✦
                    </h2>
                    <div style={{ height: '1px', width: '48px', background: 'var(--biolume-blue)', opacity: 0.5, marginBottom: '0.9rem' }} />
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--pearl-dim)', fontWeight: 300 }}>
                        A timeline of growth, challenges, and milestones that shaped me.
                    </p>
                </div>

                {/* Scrollable region — masked so content fades to nothing as it
                    approaches the header zone instead of visibly passing under it */}
                <div
                    style={{
                        position: 'absolute', inset: 0, overflow: 'hidden',
                        display: 'flex', alignItems: 'center',
                        maskImage: 'linear-gradient(90deg, transparent 0%, transparent 18%, black 30%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, transparent 18%, black 30%, black 100%)',
                    }}
                >
                    <div
                        ref={trackRef}
                        style={{ display: 'flex', alignItems: 'flex-end', gap: '3rem', paddingLeft: '26%', paddingRight: '6rem' }}
                    >
                        <svg
                            aria-hidden viewBox="0 0 800 40" preserveAspectRatio="none"
                            className="animate-pulse-glow"
                            style={{ position: 'absolute', left: 0, right: 0, bottom: '-2.9rem', width: '100%', height: '40px' }}
                        >
                            <path d={WAVE_D} fill="none" stroke="rgba(60,142,195,0.28)" strokeWidth="1.5" />
                        </svg>

                        {JOURNEY.map((m, i) => (
                            <div key={m.year + i} style={{ position: 'relative' }}>
                                <div aria-hidden style={{
                                    position: 'absolute', bottom: i % 2 === 0 ? '-2.3rem' : '-3.3rem', left: '50%', translate: '-50% 0',
                                    width: '10px', height: '10px', borderRadius: '50%',
                                    background: 'var(--biolume-blue)', boxShadow: '0 0 10px rgba(60,142,195,0.7)', zIndex: 2,
                                }} />
                                <TimelineCard milestone={m} imageHeight={130 + (i % 3) * 20} />
                            </div>
                        ))}

                        {/* End of the timeline — still part of the same horizontal
                            track, not a separate vertical section */}
                        <div style={{ alignSelf: 'center', width: '360px', flexShrink: 0, textAlign: 'center' }}>
                            <p className="font-display" style={{ fontSize: '1.8rem', fontStyle: 'italic', color: 'var(--pearl-dim)' }}>
                                To be continued&hellip;
                            </p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--pearl-faint)', marginTop: '0.6rem' }}>
                                Still exploring, still building.
                            </p>
                        </div>

                        <div aria-hidden style={{ alignSelf: 'center', width: '1px', height: '90px', background: 'linear-gradient(180deg, transparent, var(--biolume-blue), transparent)', opacity: 0.4, flexShrink: 0 }} />

                        <div style={{ alignSelf: 'center', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', flexShrink: 0 }}>
                            {END_LINKS.map(({ label, href, icon: Icon }) => (
                                <Link key={href} href={href} data-cursor-hover style={{ textDecoration: 'none' }}>
                                    <motion.div
                                        whileHover={{ y: -4, scale: 1.04 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                                            width: '110px', padding: '1.1rem 0.5rem', borderRadius: '1.1rem',
                                            background: 'var(--glass-bg)', border: '1px solid rgba(111,184,232,0.4)',
                                            boxShadow: '0 0 20px rgba(60,142,195,0.2)',
                                        }}
                                    >
                                        <Icon size={18} aria-hidden style={{ color: 'var(--biolume-cyan)' }} />
                                        <span style={{ fontSize: '0.72rem', color: 'var(--pearl)' }}>{label}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div aria-hidden style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '10rem', zIndex: 4, pointerEvents: 'none', background: 'linear-gradient(270deg, var(--ocean-void), transparent)' }} />
            </div>

            {!isDesktop && <MobileJourney />}
        </>
    );
}
