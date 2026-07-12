'use client';

import { motion } from 'framer-motion';

const TENTACLES = [-8, -4, 0, 4, 8];

export default function JellyfishLoader({ size = 80 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" role="status" aria-label="Loading">
            {/* the tank */}
            <circle cx="50" cy="50" r="46" fill="rgba(20,50,80,0.15)" stroke="rgba(111,184,232,0.35)" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(111,184,232,0.12)" strokeWidth="6" />

            {/* orbits around the tank center */}
            <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '50px 50px' }}
            >
                <g transform="translate(50, 22)">
                    {/* counter-rotates to stay upright while orbiting, and pulses like a real swim stroke */}
                    <motion.g
                        animate={{ rotate: -360, scaleY: [0.88, 1.05, 0.88] }}
                        transition={{
                            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                            scaleY: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
                        }}
                        style={{ transformOrigin: '0px 0px' }}
                    >
                        <ellipse cx="0" cy="0" rx="13" ry="9" fill="rgba(60,142,195,0.28)" stroke="var(--biolume-cyan)" strokeWidth="1.2" />
                        {TENTACLES.map((x, i) => (
                            <path key={i}
                                d={`M${x} 8 Q${x + (i % 2 === 0 ? -3 : 3)} 18 ${x} 28`}
                                fill="none" stroke="var(--biolume-cyan)" strokeWidth="1" opacity={0.55}
                            />
                        ))}
                    </motion.g>
                </g>
            </motion.g>
        </svg>
    );
}
