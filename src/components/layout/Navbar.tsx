'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sparkles } from 'lucide-react';

const LINKS = ['About', 'Journey', 'Projects', 'Achievements', 'Goals', 'Contact'];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
                position: 'fixed', top: '1.5rem', left: '2.5rem', right: '2.5rem', zIndex: 50,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.65rem 1.75rem', borderRadius: '1.5rem',
                background: scrolled ? 'rgba(0, 61, 158, 0.8)' : 'rgba(93, 137, 171, 0.5)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '5px solid rgba(79,195,247,0.12)',
                boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
                transition: 'background 0.4s, box-shadow 0.4s',
            }}
        >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="font-display" style={{ fontSize: '1.2rem', letterSpacing: '0.08em', color: 'var(--pearl)' }}>SK.</span>
                <Sparkles size={11} style={{ color: 'var(--biolume-blue)', opacity: 0.7 }} />
            </div>

            {/* Links */}
            <ul style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', listStyle: 'none' }}>
                {LINKS.map(link => (
                    <li key={link}>
                        <a
                            href={`#${link.toLowerCase()}`}
                            style={{ fontSize: '0.82rem', letterSpacing: '0.04em', color: 'var(--pearl-dim)', fontFamily: 'Inter,sans-serif', fontWeight: 300, textDecoration: 'none', transition: 'color 0.25s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--pearl)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--pearl-dim)')}
                        >
                            {link}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Icons */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.55, color: 'var(--pearl)' }}><Moon size={15} /></button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.55, color: 'var(--biolume-blue)' }}><Sparkles size={15} /></button>
            </div>
        </motion.nav>
    );
}