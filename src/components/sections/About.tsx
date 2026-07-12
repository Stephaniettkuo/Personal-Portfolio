'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, FolderKanban, Trophy, Target, Mail } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ParallaxGallery from '@/components/ui/ParallaxGallery';
import OceanCanvas from '@/components/ui/OceanCanvas';

const up = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

const INFO = [
    { label: 'Based In', value: 'Austin, Texas, USA' },
    { label: 'Currently', value: 'Student at University of Texas at Austin' },
    { label: 'Interests', value: 'placeholder' },
];

const EXPLORE_LINKS = [
    { label: 'Journey', href: '/journey', icon: Compass },
    { label: 'Projects', href: '/projects', icon: FolderKanban },
    { label: 'Achievements', href: '/achievements', icon: Trophy },
    { label: 'Goals', href: '/goals', icon: Target },
    { label: 'Contact', href: '/contact', icon: Mail },
];

export default function About() {
    return (
        <section id="about" style={{ position: 'relative', width: '100%', padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)' }}>
            {/* Background photo — spans the entire section (not a bounded height),
                including the gallery/explore-buttons further down. This only works
                cleanly because OceanCanvas now sizes its drawing buffer to its own
                rendered height instead of the viewport (see OceanCanvas.tsx) — without
                that fix, particles would only populate the first screen's worth and
                the rest of this tall area would read as empty. No overflow:hidden on
                the outer section itself — that's what was clipping the gallery before.
                Gradient starts and ends as solid --ocean-void, matching Hero's
                WaveDivider fill at the top and fading out again at the very bottom,
                so both seams disappear. */}
            <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
                <Image
                    src="/images/aboutme-bg.jpg" alt="" fill priority={false}
                    style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.62, filter: 'saturate(0.82)' }}
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, var(--ocean-void) 0%, rgba(4,16,31,0.5) 14%, rgba(4,16,31,0.28) 45%, var(--ocean-void) 100%)',
                }} />
                <OceanCanvas particleCount={22} bubbleCount={3} maxOpacity={0.55} />
            </div>

            <div style={{
                position: 'relative', zIndex: 10,
                maxWidth: '1180px', margin: '0 auto',
                display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(2.5rem, 6vw, 5rem)',
            }}>
                {/* Left: headshot */}
                <motion.div {...up(0)} style={{ flex: '1 1 320px', maxWidth: '440px' }}>
                    <GlassCard liquid style={{ aspectRatio: '4 / 5', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: '1rem', borderRadius: '1rem', overflow: 'hidden' }}>
                            <Image src="/images/photos/headblue.png" alt="Stephanie Kuo" fill style={{ objectFit: 'cover' }} />
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Right: bio + info card */}
                <div style={{ flex: '1 1 360px', maxWidth: '560px' }}>
                    <motion.p {...up(0.1)} className="font-display" style={{
                        fontSize: '1.3rem', fontStyle: 'italic', fontWeight: 300,
                        color: 'var(--pearl-dim)', marginBottom: '0.4rem',
                    }}>
                        get to know
                    </motion.p>

                    <motion.h2 {...up(0.18)} className="font-display" style={{
                        fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 300,
                        textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1,
                        color: 'var(--pearl)', marginBottom: '1.4rem',
                    }}>
                        About Me
                    </motion.h2>

                    <motion.p {...up(0.26)} style={{
                        fontSize: '0.95rem', lineHeight: 1.85, color: 'var(--pearl-dim)',
                        fontFamily: 'Inter, sans-serif', fontWeight: 300, marginBottom: '2rem',
                    }}>
                        {/* PLACEHOLDER bio copy — replace with Stephanie's actual background */}
                        I&apos;m a student, builder, and researcher who likes taking ideas from a rough
                        sketch to something people can actually use. I care most about the moments
                        where technology, design, and curiosity overlap — and I&apos;m always looking
                        for the next thing worth building.
                    </motion.p>

                    <motion.div {...up(0.34)}>
                        <GlassCard style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                            {INFO.map(row => (
                                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                                    <span style={{
                                        fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                                        color: 'var(--pearl-faint)', fontFamily: 'Inter, sans-serif', flexShrink: 0,
                                    }}>
                                        {row.label}
                                    </span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--pearl)', textAlign: 'right' }}>
                                        {row.value}
                                    </span>
                                </div>
                            ))}
                        </GlassCard>
                    </motion.div>
                </div>
            </div>

            {/* Scroll-parallax image gallery */}
            <motion.div {...up(0.42)} style={{ position: 'relative', zIndex: 10, maxWidth: '1180px', margin: '5rem auto 0' }}>
                <ParallaxGallery />
            </motion.div>

            {/* Explore more — glowy glass buttons to the rest of the site */}
            <motion.div {...up(0.42)} style={{ position: 'relative', zIndex: 10, maxWidth: '1180px', margin: '4rem auto 0', textAlign: 'center' }}>
                <p style={{
                    fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--pearl-faint)', fontFamily: 'Inter, sans-serif', marginBottom: '1.2rem',
                }}>
                    explore more
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.25rem' }}>
                    {EXPLORE_LINKS.map(({ label, href, icon: Icon }) => (
                        <Link key={href} href={href} data-cursor-hover style={{ textDecoration: 'none' }}>
                            <motion.div whileHover={{ y: -5, scale: 1.03 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>
                                <GlassCard liquid style={{
                                    padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', gap: '0.85rem',
                                    boxShadow: '0 0 26px rgba(60,142,195,0.22)',
                                }}>
                                    <div style={{
                                        width: '52px', height: '52px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: 'rgba(60,142,195,0.14)', boxShadow: '0 0 18px rgba(111,184,232,0.3)',
                                    }}>
                                        <Icon size={24} aria-hidden style={{ color: 'var(--biolume-cyan)' }} />
                                    </div>
                                    <span style={{ fontSize: '0.88rem', letterSpacing: '0.04em', color: 'var(--pearl)', fontFamily: 'Inter, sans-serif' }}>
                                        {label}
                                    </span>
                                </GlassCard>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
