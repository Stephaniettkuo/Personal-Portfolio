import GlassCard from './GlassCard';

export default function TimelineCard({
    year,
    title,
    description,
}: {
    year: string;
    title: string;
    description: string;
}) {
    return (
        <GlassCard liquid style={{ padding: '1.5rem' }}>
            <span className="font-display" style={{ fontSize: '1.6rem', color: 'var(--biolume-cyan)', display: 'block', marginBottom: '0.6rem' }}>
                {year}
            </span>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--pearl)', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                {title}
            </h3>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--pearl-dim)', fontWeight: 300 }}>
                {description}
            </p>
        </GlassCard>
    );
}
