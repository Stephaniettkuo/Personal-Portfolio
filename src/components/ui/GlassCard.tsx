'use client';

export default function GlassCard({
    children,
    liquid = false,
    className = "",
    style,
}: {
    children: React.ReactNode;
    liquid?: boolean;
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <div
            className={`${liquid ? 'glass-liquid' : 'glass'} ${className}`}
            style={{ borderRadius: '1.5rem', ...style }}
        >
            {children}
        </div>
    );
}
