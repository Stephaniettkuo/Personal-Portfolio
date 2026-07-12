'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import JellyfishLoader from '@/components/ui/JellyfishLoader';

// lucide-react dropped brand/logo icons — small inline glyphs instead of a new dependency
const GithubGlyph = () => (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
);
const LinkedinGlyph = () => (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.6v1.64h.05c.5-.95 1.73-1.95 3.56-1.95 3.8 0 4.5 2.5 4.5 5.75V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
);

const up = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem',
    background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
    color: 'var(--pearl)', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
};

export default function Contact() {
    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem('name') as HTMLInputElement).value,
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Something went wrong.');
            setStatus('success');
            form.reset();
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
        }
    };

    return (
        <section id="contact" style={{ position: 'relative', width: '100%', padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)' }}>
            <div style={{
                maxWidth: '1180px', margin: '0 auto',
                display: 'flex', flexWrap: 'wrap', gap: 'clamp(2.5rem, 6vw, 5rem)',
            }}>
                {/* Left: message-in-a-bottle + contact info */}
                <motion.div {...up(0)} style={{ flex: '1 1 320px', maxWidth: '420px' }}>
                    <p className="font-display" style={{ fontSize: '1.3rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--pearl-dim)', marginBottom: '0.4rem' }}>
                        send a message
                    </p>
                    <h2 className="font-display" style={{
                        fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 300,
                        textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1, color: 'var(--pearl)',
                        marginBottom: '2rem',
                    }}>
                        Contact
                    </h2>

                    <div className="animate-float" style={{ width: '90px', height: '90px', marginBottom: '2rem' }}>
                        <svg viewBox="0 0 60 80" aria-hidden style={{ width: '100%', height: '100%' }}>
                            <path d="M24 6 h12 v10 l6 8 v40 a4 4 0 0 1 -4 4 h-16 a4 4 0 0 1 -4 -4 v-40 l6 -8 Z"
                                fill="rgba(60,142,195,0.06)" stroke="rgba(60,142,195,0.5)" strokeWidth="1.2" />
                            <line x1="24" y1="6" x2="24" y2="2" stroke="rgba(60,142,195,0.5)" strokeWidth="1.2" />
                            <line x1="36" y1="6" x2="36" y2="2" stroke="rgba(60,142,195,0.5)" strokeWidth="1.2" />
                            <rect x="22" y="34" width="16" height="20" rx="1.5" fill="none" stroke="rgba(60,142,195,0.35)" strokeWidth="0.8" transform="rotate(-6 30 44)" />
                        </svg>
                    </div>

                    <GlassCard style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                            <Mail size={15} aria-hidden style={{ color: 'var(--biolume-cyan)' }} />
                            {/* PLACEHOLDER — confirm which email Stephanie wants public */}
                            <a href="mailto:hello@example.com" data-cursor-hover style={{ fontSize: '0.85rem', color: 'var(--pearl)', textDecoration: 'none' }}>
                                hello@example.com
                            </a>
                        </div>
                        <div style={{ display: 'flex', gap: '0.9rem' }}>
                            {/* PLACEHOLDER hrefs — swap in real profile links */}
                            <a href="#" data-cursor-hover aria-label="GitHub" style={{ color: 'var(--pearl-dim)' }}><GithubGlyph /></a>
                            <a href="#" data-cursor-hover aria-label="LinkedIn" style={{ color: 'var(--pearl-dim)' }}><LinkedinGlyph /></a>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Right: form */}
                <motion.div {...up(0.15)} style={{ flex: '1 1 360px', maxWidth: '520px' }}>
                    <GlassCard liquid style={{ padding: '2rem' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input name="name" type="text" placeholder="Your name" required maxLength={100} className="form-input" style={inputStyle} />
                            <input name="email" type="email" placeholder="Your email" required className="form-input" style={inputStyle} />
                            <textarea name="message" placeholder="Your message" required maxLength={2000} rows={5} className="form-input" style={{ ...inputStyle, resize: 'vertical' }} />

                            <motion.button
                                type="submit"
                                data-cursor-hover
                                disabled={status === 'submitting'}
                                whileHover={{ background: 'rgba(60,142,195,0.14)', borderColor: 'rgba(60,142,195,0.65)' }}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                                    padding: '0.8rem', borderRadius: '0.75rem',
                                    background: 'rgba(60,142,195,0.08)', border: '1px solid rgba(60,142,195,0.38)',
                                    color: 'var(--pearl)', fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 300,
                                    opacity: status === 'submitting' ? 0.6 : 1,
                                }}
                            >
                                {status === 'submitting'
                                    ? <><JellyfishLoader size={16} /> Sending…</>
                                    : <>Send Message <Send size={14} aria-hidden /></>}
                            </motion.button>

                            {status === 'success' && (
                                <p style={{ fontSize: '0.8rem', color: 'var(--biolume-cyan)' }}>Message sent — thank you!</p>
                            )}
                            {status === 'error' && (
                                <p style={{ fontSize: '0.8rem', color: '#f47272' }}>{errorMsg}</p>
                            )}
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
