'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TimelineCard from '@/components/ui/TimelineCard';

gsap.registerPlugin(ScrollTrigger);

// PLACEHOLDER milestones — replace years/titles/descriptions with Stephanie's actual timeline
const MILESTONES = [
    { year: '2018', title: 'PLACEHOLDER milestone', description: 'PLACEHOLDER — a sentence on what happened this year.' },
    { year: '2021', title: 'PLACEHOLDER milestone', description: 'PLACEHOLDER — a sentence on what happened this year.' },
    { year: '2023', title: 'PLACEHOLDER milestone', description: 'PLACEHOLDER — a sentence on what happened this year.' },
    { year: '2024', title: 'PLACEHOLDER milestone', description: 'PLACEHOLDER — a sentence on what happened this year.' },
];

export default function Journey() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set('.journey-item', { opacity: 0, y: 32 });

        const tl = gsap.timeline({
            scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true },
        });

        tl.to(lineRef.current, { scaleX: 1, duration: 1, ease: 'power2.out' })
          .to('.journey-item', { opacity: 1, y: 0, duration: 0.6, stagger: 0.18, ease: 'power2.out' }, '-=0.6');
    }, { scope: containerRef });

    return (
        <section
            id="journey"
            ref={containerRef}
            style={{ position: 'relative', width: '100%', padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)' }}
        >
            <div style={{ maxWidth: '1180px', margin: '0 auto 4rem' }}>
                <p className="font-display" style={{ fontSize: '1.3rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--pearl-dim)', marginBottom: '0.4rem' }}>
                    the path so far
                </p>
                <h2 className="font-display" style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 300,
                    textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1, color: 'var(--pearl)',
                }}>
                    Journey
                </h2>
            </div>

            <div className="flex flex-col md:flex-row" style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', gap: '2.5rem' }}>
                <div
                    ref={lineRef}
                    className="hidden md:block"
                    style={{
                        position: 'absolute', top: '2.2rem', left: 0, right: 0, height: '1px',
                        background: 'linear-gradient(90deg, transparent, var(--biolume-blue), transparent)',
                    }}
                />
                {MILESTONES.map(m => (
                    <div key={m.year} className="journey-item" style={{ flex: '1 1 0', minWidth: 0 }}>
                        <TimelineCard {...m} />
                    </div>
                ))}
            </div>
        </section>
    );
}
