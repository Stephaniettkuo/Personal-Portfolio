'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, useMotionValue, useScroll } from 'framer-motion';
import { Home, Info, FolderKanban, Trophy, Target, Mail } from 'lucide-react';
import OceanCanvas from '@/components/ui/OceanCanvas';
import TimelineCard from '@/components/ui/TimelineCard';
import SparkleCompanion from '@/components/ui/SparkleCompanion';
import { JOURNEY } from '@/data/journey';

gsap.registerPlugin(ScrollTrigger);

// A smooth continuous wave (SVG "T" shorthand reflects the previous control
// point automatically, so each hump alternates up/down on its own) stretched
// to fill whatever width the track ends up being — it doesn't need to match
// the actual pixel width, non-uniform stretching of a sine-like curve still
// reads as "wavy," it just changes the apparent frequency slightly.
const WAVE_D = 'M0,20 Q50,4 100,20 T200,20 T300,20 T400,20 T500,20 T600,20 T700,20 T800,20';

// PLACEHOLDER — drop a real photo at public/images/journey-bg.jpg and this
// picks it up automatically; no code changes needed. Used behind both the
// desktop and mobile layouts, layered under OceanCanvas's particles so the
// sparkle/bubble field stays exactly as it was.
const JOURNEY_BG_SRC = '/images/photos/background/biolum.jpg';

//for mobile view background
const MOBILE_JOURNEY_BG_SRC = '/images/photos/background/vertical.jpg';

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
    // Only one card expanded at a time, same as the desktop track — local to
    // this component rather than shared with Journey's own expandedIndex
    // since desktop and mobile are never mounted simultaneously.
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Drives the vertical scroll-progress bar below — offset ['start start',
    // 'end end'] maps 0 to "top of this container at top of viewport" and 1
    // to "bottom of this container at bottom of viewport", i.e. progress
    // through this whole page (Journey has its own route, so this container
    // effectively IS the page content beneath the fixed Navbar).
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // SparkleCompanion's containerWidth just needs to roughly span the
    // screen here (there's no horizontal track distance on mobile) — starts
    // at 0 to match the server-rendered output, corrected post-mount.
    const [viewportWidth, setViewportWidth] = useState(0);
    useEffect(() => {
        const onResize = () => setViewportWidth(window.innerWidth);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            {/* Background — same placeholder + particle layering as the
                desktop version below. */}
            <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
                <Image src={MOBILE_JOURNEY_BG_SRC} alt="" fill priority={false} style={{ objectFit: 'cover', opacity: 0.5 }} />
                
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, var(--ocean-void) 0%, rgba(4,16,31,0.35) 16%, rgba(4,16,31,0.35) 84%, var(--ocean-void) 100%)',
                }} />
                <OceanCanvas particleCount={40} bubbleCount={6} maxOpacity={0.55} />
            </div>

            <div style={{
                position: 'relative', zIndex: 10,
                padding: '9rem clamp(1.5rem, 6vw, 6rem) 4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center',
            }}>
                {/* Title — same content as the desktop pinned header, just
                    laid out inline at the top instead of pinned to the left,
                    since this used to be missing entirely on narrow screens. */}
                <div style={{ textAlign: 'center', maxWidth: '420px', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--pearl-faint)', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>02</span>
                    <h2 className="font-display" style={{ fontSize: '2.2rem', color: 'var(--pearl)', margin: '0.3rem 0 0.9rem', lineHeight: 1 }}>
                        My Journey ✦
                    </h2>
                    <div style={{ height: '1px', width: '48px', background: 'var(--biolume-blue)', opacity: 0.5, margin: '0 auto 0.9rem' }} />
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--pearl-dim)', fontWeight: 300 }}>
                        A timeline of growth, challenges, and milestones 
                    </p>
                </div>

                {JOURNEY.map((m, i) => (
                    <TimelineCard
                        key={m.year + i}
                        milestone={m}
                        expanded={expandedIndex === i}
                        onExpand={() => setExpandedIndex(prev => prev === i ? null : i)}
                    />
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

            {/* Sparkle companion — fixed to the viewport (see the position
                prop note in SparkleCompanion.tsx) so it stays on screen while
                you scroll the vertical list, driven by ordinary page scroll
                progress instead of the desktop's horizontal track progress. */}
            {viewportWidth > 0 && (
                <SparkleCompanion scrollProgress={scrollYProgress} containerWidth={viewportWidth} position="fixed" />
            )}

            {/* Scroll progress indicator — fixed to the viewport (not this
                container) so it stays visible the whole time you're on the
                page, same visual treatment as the desktop version. */}
            <motion.div style={{
                position: 'fixed', bottom: '1.25rem', left: '2rem', right: '2rem',
                height: '1px', background: 'rgba(60,142,195,0.12)', zIndex: 50,
            }}>
                <motion.div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--biolume-blue), var(--biolume-cyan))',
                    boxShadow: '0 0 6px rgba(60,142,195,0.5)',
                    scaleX: scrollYProgress,
                    transformOrigin: 'left',
                }} />
            </motion.div>
        </div>
    );
}

export default function Journey() {
    // sectionRef is BOTH the ScrollTrigger and the pinned element — GSAP
    // measures and injects its own spacer to reserve scroll room, so there's
    // no manually-computed wrapper height to keep in sync with anything.
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    // Only one card expanded at a time — lives here (not in each card) so
    // opening a new one collapses whichever was previously open. Desktop
    // track only; MobileJourney never passes expanded/onExpand to its cards,
    // which is what keeps the mobile list simple and non-interactive.
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Driven by the ScrollTrigger's own onUpdate below (not a second,
    // separate ScrollTrigger) — reused by both SparkleCompanion's horizontal
    // position and the progress bar's fill.
    const sparkleProgress = useMotionValue(0);
    // A plain number for SparkleCompanion's containerWidth prop (it needs a
    // number, not GSAP's own lazily-evaluated getDistance function) — synced
    // on every ScrollTrigger refresh (initial mount + resizes).
    const [scrollDistance, setScrollDistance] = useState(0);

    useEffect(() => {
        // Raised from 768px — the horizontal pinned track needs real width to
        // read well (the pinned header, the track, and its own padding all
        // competing for space), and at anything narrower than roughly half a
        // typical 13" laptop screen the two layouts were fighting each other.
        // 1024px also matches the "compact mode" breakpoint used everywhere
        // else on this site (Navbar's hamburger, Hero's centering, etc.), so
        // the whole page now shifts together at one consistent width.
        const mq = window.matchMedia('(min-width: 1024px)');
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

        // Background parallax is driven from this SAME ScrollTrigger's
        // onUpdate (via gsap.set, not a second independent ScrollTrigger) —
        // an earlier version created a separate ScrollTrigger on the exact
        // same pinned trigger element for the background tween, and that
        // turned out to never visibly move: a second ScrollTrigger sharing a
        // pinned element's trigger/start/end doesn't reliably receive the
        // same scroll updates as the one actually driving the pin. Reusing
        // the one ScrollTrigger that's already proven to work (it's what
        // drives sparkleProgress, which does move correctly) sidesteps that
        // entirely. 1x the card speed — background pans at the same pace as
        // the cards, not a slower "distant horizon" — matches the wrapper's
        // width being sized to exactly this distance below.
        const st = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1.2,
            invalidateOnRefresh: true,
            animation: gsap.to(track, { x: () => -getDistance(), ease: 'none' }),
            onUpdate: self => {
                sparkleProgress.set(self.progress);
                if (bgRef.current) gsap.set(bgRef.current, { x: -getDistance() * self.progress });
            },
            onRefresh: () => setScrollDistance(getDistance()),
        });

        return () => {
            st.kill();
        };
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
                {/* Background — wider than the section and nudged left as you
                    scroll at the same 1x pace as the cards (see the GSAP tween
                    above), so it needs enough spare width to pan through the
                    entire card-track distance without its edge ever coming
                    into view: 120% of the viewport plus scrollDistance itself
                    (the exact distance the tween pans), inset 10% on the left
                    as a small cushion. Falls back to a flat 160% before the
                    ScrollTrigger's first onRefresh populates scrollDistance.
                    The section already has overflow:hidden on itself, so the
                    overflow this wrapper creates clips cleanly without an
                    extra div. The dark overlay lives INSIDE this wrapper (not
                    as a separate sibling) so it pans together with the image
                    instead of staying fixed over the viewport — it's part of
                    the scene, not a static vignette on top of it. Sits under
                    OceanCanvas/CurrentLines so the particle field stays
                    exactly as it was. */}
                <div
                    ref={bgRef}
                    className="journey-bg-parallax"
                    aria-hidden
                    style={{
                        position: 'absolute', top: 0, bottom: 0, left: '-10%',
                        width: scrollDistance > 0 ? `calc(120% + ${scrollDistance}px)` : '160%',
                    }}
                >
                    <Image src={JOURNEY_BG_SRC} alt="" fill priority={false} style={{ objectFit: 'cover', opacity: 0.5 }} />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(180deg, var(--ocean-void) 0%, rgba(4,16,31,0.3) 20%, rgba(4,16,31,0.3) 80%, var(--ocean-void) 100%)',
                    }} />
                </div>

                <OceanCanvas particleCount={45} bubbleCount={20} maxOpacity={0.5} />
                <CurrentLines />

                {/* Pinned left header */}
                <div style={{ position: 'absolute', left: 'clamp(1.5rem, 5vw, 4rem)', top: '50%', translate: '0 -50%', zIndex: 5, maxWidth: '220px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--pearl-faint)', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif' }}>02</span>
                    <h2 className="font-display" style={{ fontSize: '3rem', color: 'var(--pearl)', margin: '0.3rem 0 0.9rem', lineHeight: 1 }}>
                        My Journey ✦
                    </h2>
                    <div style={{ height: '1px', width: '48px', background: 'var(--biolume-blue)', opacity: 0.5, marginBottom: '0.9rem' }} />
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--pearl-dim)', fontWeight: 300 }}>
                        A timeline of growth, challenges, and milestones
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
                            <path d={WAVE_D} fill="none" stroke="rgba(60,142,195,0.28)" strokeWidth="2.75" />
                        </svg>

                        {JOURNEY.map((m, i) => (
                            <div key={m.year + i} style={{ position: 'relative' }}>
                                <div aria-hidden style={{
                                    position: 'absolute', bottom: i % 2 === 0 ? '-2.3rem' : '-3.3rem', left: '50%', translate: '-50% 0',
                                    width: '10px', height: '10px', borderRadius: '50%',
                                    background: 'var(--biolume-blue)', boxShadow: '0 0 10px rgba(60,142,195,0.7)', zIndex: 2,
                                }} />
                                <TimelineCard
                                    milestone={m}
                                    imageHeight={130 + (i % 3) * 20}
                                    expanded={expandedIndex === i}
                                    onExpand={() => setExpandedIndex(prev => prev === i ? null : i)}
                                />
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

                {/* Sparkle companion — a sibling of the scrollable track (not
                    inside it), so it stays put in the sticky viewport while
                    cards scroll past underneath. Waits for a real
                    scrollDistance so it doesn't briefly render at x:60 before
                    the first ScrollTrigger refresh reports the real value. */}
                {scrollDistance > 0 && (
                    <SparkleCompanion scrollProgress={sparkleProgress} containerWidth={scrollDistance} />
                )}

                {/* Scroll progress indicator — reuses the same sparkleProgress
                    MotionValue the companion uses, so both stay in sync with
                    zero extra ScrollTrigger wiring. */}
                <motion.div style={{
                    position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem',
                    height: '1px', background: 'rgba(60,142,195,0.12)', zIndex: 20,
                }}>
                    <motion.div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--biolume-blue), var(--biolume-cyan))',
                        boxShadow: '0 0 6px rgba(60,142,195,0.5)',
                        scaleX: sparkleProgress,
                        transformOrigin: 'left',
                    }} />
                </motion.div>
            </div>

            {!isDesktop && <MobileJourney />}
        </>
    );
}
