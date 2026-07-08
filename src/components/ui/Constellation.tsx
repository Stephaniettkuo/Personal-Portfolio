export interface ConstellationPoint {
    x: number;
    y: number;
    label?: string;
}

const DEFAULT_POINTS: ConstellationPoint[] = [
    { x: 12, y: 68 },
    { x: 38, y: 22 },
    { x: 66, y: 40 },
    { x: 58, y: 82 },
    { x: 88, y: 58 },
];

export default function Constellation({
    points = DEFAULT_POINTS,
    className = "",
    style,
}: {
    points?: ConstellationPoint[];
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <svg
            viewBox="0 0 100 100"
            aria-hidden
            className={className}
            style={{ width: '100%', height: '100%', overflow: 'visible', ...style }}
        >
            {points.slice(1).map((p, i) => (
                <line
                    key={`line-${i}`}
                    x1={points[i].x} y1={points[i].y} x2={p.x} y2={p.y}
                    stroke="rgba(60,142,195,0.28)" strokeWidth="0.3"
                />
            ))}

            {points.map((p, i) => (
                <g key={`star-${i}`}>
                    <circle
                        cx={p.x} cy={p.y} r="4"
                        fill="rgba(60,142,195,0.18)"
                        style={{ filter: 'blur(2.5px)' }}
                    />
                    <circle
                        cx={p.x} cy={p.y} r="1.1"
                        fill="var(--biolume-cyan)"
                        className="animate-pulse-glow"
                        style={{ animationDelay: `${i * 0.6}s` }}
                    />
                    {p.label && (
                        <text
                            x={p.x} y={p.y - 6}
                            textAnchor="middle"
                            fontSize="3.4"
                            fontFamily="Inter, sans-serif"
                            letterSpacing="0.08em"
                            fill="var(--pearl-dim)"
                        >
                            {p.label}
                        </text>
                    )}
                </g>
            ))}
        </svg>
    );
}
