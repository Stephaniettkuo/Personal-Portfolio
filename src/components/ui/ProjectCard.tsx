'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GlassCard from './GlassCard';
import type { Project } from '@/data/projects';

export default function ProjectCard({
    project,
    expanded,
    onToggle,
}: {
    project: Project;
    expanded: boolean;
    onToggle: () => void;
}) {
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
            style={{ width: expanded ? 420 : 290, flexShrink: 0, scrollSnapAlign: 'start' }}
            transition={{ layout: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } }}
        >
            <GlassCard liquid style={{ padding: '1rem', height: '100%' }}>
                {/* PLACEHOLDER: replace with a real project screenshot — see public/images/projects/ */}
                <motion.div layout style={{
                    height: '150px', borderRadius: '0.9rem', marginBottom: '1rem',
                    background: 'radial-gradient(circle at 70% 20%, rgba(111,184,232,0.28), transparent 60%), linear-gradient(160deg, var(--ocean-void), rgba(20,50,80,0.6))',
                }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--pearl)', letterSpacing: '0.01em' }}>
                        {project.title}
                    </h3>
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
                            <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--pearl-dim)', marginBottom: '0.85rem' }}>
                                {project.description}
                            </p>
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
