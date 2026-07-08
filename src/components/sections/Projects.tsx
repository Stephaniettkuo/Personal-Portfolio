'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from '@/components/ui/ProjectCard';
import { PROJECTS } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const GAP = 24;
const CARD_WIDTH = 290;
const STEP = CARD_WIDTH + GAP;

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Scroll-driven transition: section surfaces in as it's approached (§4.2) —
    // also fixes Projects having no entrance animation at all (found during the §22 audit)
    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        gsap.fromTo(sectionRef.current,
            { opacity: 0, scale: 0.94 },
            {
                opacity: 1, scale: 1, ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'top 55%',
                    scrub: true,
                },
            }
        );
    }, { scope: sectionRef });

    const scrollToIndex = (index: number) => {
        const clamped = Math.max(0, Math.min(PROJECTS.length - 1, index));
        containerRef.current?.scrollTo({ left: clamped * STEP, behavior: 'smooth' });
        setActiveIndex(clamped);
    };

    const handleScroll = () => {
        if (!containerRef.current) return;
        const idx = Math.round(containerRef.current.scrollLeft / STEP);
        setActiveIndex(Math.max(0, Math.min(PROJECTS.length - 1, idx)));
    };

    return (
        <section id="projects" ref={sectionRef} style={{ position: 'relative', width: '100%', padding: 'clamp(4rem, 10vw, 8rem) 0' }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto 3rem', padding: '0 clamp(1.5rem, 6vw, 6rem)' }}>
                <p className="font-display" style={{ fontSize: '1.3rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--pearl-dim)', marginBottom: '0.4rem' }}>
                    things i&apos;ve built
                </p>
                <h2 className="font-display" style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 300,
                    textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1, color: 'var(--pearl)',
                }}>
                    Projects
                </h2>
            </div>

            <div
                ref={containerRef}
                onScroll={handleScroll}
                style={{
                    display: 'flex', gap: `${GAP}px`, overflowX: 'auto', scrollSnapType: 'x mandatory',
                    padding: '0.5rem clamp(1.5rem, 6vw, 6rem) 1.5rem',
                }}
            >
                {PROJECTS.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        expanded={expandedId === project.id}
                        onToggle={() => setExpandedId(id => (id === project.id ? null : project.id))}
                    />
                ))}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginTop: '1rem' }}>
                <button
                    data-cursor-hover
                    aria-label="Previous project"
                    onClick={() => scrollToIndex(activeIndex - 1)}
                    style={{ background: 'none', border: 'none', color: 'var(--pearl-dim)', opacity: activeIndex === 0 ? 0.3 : 0.8 }}
                >
                    <ChevronLeft size={18} />
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {PROJECTS.map((project, i) => (
                        <button
                            key={project.id}
                            data-cursor-hover
                            aria-label={`Go to ${project.title}`}
                            onClick={() => scrollToIndex(i)}
                            style={{
                                width: i === activeIndex ? '18px' : '6px', height: '6px', borderRadius: '9999px',
                                border: 'none', background: i === activeIndex ? 'var(--biolume-blue)' : 'var(--pearl-faint)',
                                opacity: i === activeIndex ? 1 : 0.4, transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </div>

                <button
                    data-cursor-hover
                    aria-label="Next project"
                    onClick={() => scrollToIndex(activeIndex + 1)}
                    style={{ background: 'none', border: 'none', color: 'var(--pearl-dim)', opacity: activeIndex === PROJECTS.length - 1 ? 0.3 : 0.8 }}
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </section>
    );
}
