'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Moon, Sparkles } from 'lucide-react';

// Everything except Home/About is its own route, so "active" just tracks the
// current path. Home and About both live on "/" though (Hero and the About
// section), so telling them apart needs actual scroll position — handled by
// the homeSection IntersectionObserver below.
const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Journey', href: '/journey' },
    { label: 'Projects', href: '/projects' },
    { label: 'Achievements', href: '/achievements' },
    { label: 'Goals', href: '/goals' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const listRef = useRef<HTMLUListElement>(null);
    const linkRefs = useRef<(HTMLLIElement | null)[]>([]);

    // Spotlight: tracks the raw mouse position directly (no spring) — snappier
    // than easing it, since it's meant to feel like it's under the cursor.
    const spotlightX = useMotionValue(0);
    const spotlightOpacity = useMotionValue(0);
    // Ambience: the glow parked under whichever link is active. This one *does*
    // spring, so it glides between links instead of jumping.
    const ambienceTarget = useMotionValue(0);
    const ambienceX = useSpring(ambienceTarget, { stiffness: 220, damping: 24 });

    const [homeSection, setHomeSection] = useState<'hero' | 'about'>('hero');

    const activeIndex = pathname === '/'
        ? (homeSection === 'about' ? 1 : 0)
        : NAV_ITEMS.findIndex(item => item.href === pathname);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', fn);
        fn();
        return () => window.removeEventListener('scroll', fn);
    }, []);

    // Home and About share a pathname, so tell them apart by which section is
    // actually in view rather than the URL.
    useEffect(() => {
        if (pathname !== '/') return;
        const hero = document.getElementById('hero');
        const about = document.getElementById('about');
        if (!hero || !about) return;

        const observer = new IntersectionObserver(
            entries => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) setHomeSection(visible[0].target.id === 'about' ? 'about' : 'hero');
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        observer.observe(hero);
        observer.observe(about);
        return () => observer.disconnect();
    }, [pathname]);

    // Keep the ambience glow parked under the active link's x position.
    useEffect(() => {
        const el = linkRefs.current[activeIndex];
        if (el && listRef.current) {
            const navRect = listRef.current.getBoundingClientRect();
            const itemRect = el.getBoundingClientRect();
            ambienceTarget.set(itemRect.left - navRect.left + itemRect.width / 2);
        }
    }, [activeIndex, ambienceTarget]);

    const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        spotlightX.set(e.clientX - rect.left);
        spotlightOpacity.set(1);
    };
    const handleMouseLeave = () => spotlightOpacity.set(0);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
                position: 'fixed', top: '1.5rem', left: '2.5rem', right: '2.5rem', zIndex: 50,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.65rem 1.75rem', borderRadius: '1.5rem',
                background: scrolled ? 'rgba(4, 16, 31, 0.82)' : 'var(--glass-bg)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(111,184,232,0.4)',
                boxShadow: scrolled
                    ? '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(60,142,195,0.22)'
                    : '0 0 24px rgba(60,142,195,0.16)',
                transition: 'background 0.4s, box-shadow 0.4s',
            }}
        >
            {/* Logo */}
            <Link href="/" data-cursor-hover style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                <span className="font-display" style={{ fontSize: '1.2rem', letterSpacing: '0.08em', color: 'var(--pearl)' }}>SK.</span>
                <Sparkles size={11} aria-hidden style={{ color: 'var(--biolume-blue)', opacity: 0.7 }} />
            </Link>

            {/* Links */}
            <ul
                ref={listRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '2.4rem', listStyle: 'none' }}
            >
                {/* Mouse-follow spotlight */}
                <motion.div
                    aria-hidden
                    style={{
                        position: 'absolute', bottom: -10, left: spotlightX, opacity: spotlightOpacity,
                        width: '140px', height: '44px', translateX: '-50%', pointerEvents: 'none',
                        background: 'radial-gradient(60px 22px at 50% 100%, rgba(111,184,232,0.32), transparent 70%)',
                    }}
                />
                {/* Ambience glow under the active link */}
                {activeIndex !== -1 && (
                    <motion.div
                        aria-hidden
                        style={{
                            position: 'absolute', bottom: -2, left: ambienceX, translateX: '-50%', pointerEvents: 'none',
                            width: '36px', height: '2px', borderRadius: '9999px',
                            background: 'linear-gradient(90deg, transparent, var(--biolume-cyan), transparent)',
                            boxShadow: '0 0 8px rgba(111,184,232,0.9)',
                        }}
                    />
                )}

                {NAV_ITEMS.map((item, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <li key={item.label} ref={el => { linkRefs.current[i] = el; }}>
                            <Link
                                data-cursor-hover
                                href={item.href}
                                style={{
                                    position: 'relative', zIndex: 1,
                                    fontSize: '0.82rem', letterSpacing: '0.04em',
                                    color: isActive ? 'var(--pearl)' : 'var(--pearl-dim)',
                                    fontFamily: 'Inter,sans-serif', fontWeight: 300, textDecoration: 'none', transition: 'color 0.25s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--pearl)')}
                                onMouseLeave={e => (e.currentTarget.style.color = isActive ? 'var(--pearl)' : 'var(--pearl-dim)')}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Icons */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button data-cursor-hover aria-label="Toggle theme" style={{ background: 'none', border: 'none', opacity: 0.55, color: 'var(--pearl)' }}><Moon size={15} aria-hidden /></button>
                <button data-cursor-hover aria-label="Toggle effects" style={{ background: 'none', border: 'none', opacity: 0.55, color: 'var(--biolume-blue)' }}><Sparkles size={15} aria-hidden /></button>
            </div>
        </motion.nav>
    );
}
