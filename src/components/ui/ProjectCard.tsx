'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Code2 } from 'lucide-react';
import GlassCard from './GlassCard';
import type { Project } from '@/data/projects';

const linkPillStyle = {
    display: 'flex', alignItems: 'center', gap: '0.35rem',
    fontSize: '0.7rem', letterSpacing: '0.04em', padding: '0.35rem 0.7rem',
    borderRadius: '9999px', border: '1px solid rgba(111,184,232,0.4)',
    color: 'var(--pearl)', background: 'rgba(60,142,195,0.1)', textDecoration: 'none',
};

export default function ProjectCard({
    project,
    expanded,
    onToggle,
}: {
    project: Project;
    expanded: boolean;
    onToggle: () => void;
}) {
    // Separate from `expanded` — this drives the hover "magnify" effect
    // (card + image + title scale up slightly), independent of the click-to-expand state.
    const [hovered, setHovered] = useState(false);
    const magnify = hovered && !expanded;

    return (
        <motion.div
            layout
            data-cursor-hover
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} details for ${project.title}`}
            onClick={onToggle}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggle();
                }
            }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{ scale: magnify ? 1.045 : 1 }}
            style={{ width: expanded ? 420 : 290, flexShrink: 0, scrollSnapAlign: 'start' }}
            transition={{ layout: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }, scale: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }}
        >
            <GlassCard liquid style={{ padding: '1rem', height: '100%' }}>
                {/* PLACEHOLDER: replace with a real project screenshot — see public/images/projects/ */}
                <div style={{ borderRadius: '0.9rem', marginBottom: '1rem', overflow: 'hidden' }}>
                    <motion.div
                        layout
                        animate={{ scale: magnify ? 1.15 : 1 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{
                            height: '150px',
                            background: 'radial-gradient(circle at 70% 20%, rgba(111,184,232,0.28), transparent 60%), linear-gradient(160deg, var(--ocean-void), rgba(20,50,80,0.6))',
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <motion.h3
                        animate={{ scale: magnify ? 1.06 : 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--pearl)', letterSpacing: '0.01em', transformOrigin: 'left center' }}
                    >
                        {project.title}
                    </motion.h3>
                    <motion.div
                        aria-hidden
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: 'var(--biolume-blue)', flexShrink: 0, marginTop: '2px' }}
                    >
                        <ChevronDown size={16} />
                    </motion.div>
                </div>

                <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--pearl-dim)', marginBottom: '0.85rem' }}>
                    {project.blurb}
                </p>

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--pearl-dim)', marginBottom: '0.75rem' }}>
                                {project.description}
                            </p>

                            {/* The "extra thing that happens when you click" — real links to
                                the actual project, only reachable once expanded. */}
                            {(project.demoUrl || project.sourceUrl) && (
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl} target="_blank" rel="noreferrer noopener"
                                            data-cursor-hover onClick={e => e.stopPropagation()}
                                            style={linkPillStyle}
                                        >
                                            <ExternalLink size={12} aria-hidden /> Live Demo
                                        </a>
                                    )}
                                    {project.sourceUrl && (
                                        <a
                                            href={project.sourceUrl} target="_blank" rel="noreferrer noopener"
                                            data-cursor-hover onClick={e => e.stopPropagation()}
                                            style={linkPillStyle}
                                        >
                                            <Code2 size={12} aria-hidden /> Source
                                        </a>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {project.tags.map(tag => (
                        <span key={tag} style={{
                            fontSize: '0.65rem', letterSpacing: '0.04em', padding: '0.25rem 0.6rem',
                            borderRadius: '9999px', border: '1px solid var(--glass-border)',
                            color: 'var(--pearl-dim)',
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </GlassCard>
        </motion.div>
    );
}
