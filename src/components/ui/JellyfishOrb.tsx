'use client';

import { useEffect, useRef, useState } from 'react';

const ORB_SIZE = 'clamp(280px, 30vw, 440px)';
const FADE_DURATION = 0.6; // seconds — fade out then back in over this window, masking the loop cut

const GLOW_SHADOW = `
  0 0 0 1px rgba(60,142,195,0.25),
  0 0 30px 8px rgba(60,142,195,0.2),
  0 0 70px 20px rgba(60,142,195,0.12),
  0 0 120px 40px rgba(60,142,195,0.06)
`;

// Ease-in-out rather than a linear ramp — reads as a soft pulse breathing in
// and out around the loop point, instead of a mechanical fade.
const smoothstep = (t: number) => t * t * (3 - 2 * t);

export default function JellyfishOrb() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);
    // No poster asset exists yet, so a missing/broken video source falls back
    // to a decorative gradient instead of a blank or broken circle.
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        const fade = fadeRef.current;
        if (!video || !fade) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // stays on its first frame — a natural static poster, no extra asset needed

        video.play().catch(() => {}); // browsers can reject autoplay; failing silently just leaves the first frame showing

        // A continuous requestAnimationFrame loop instead of the `timeupdate`
        // event — `timeupdate` only fires a handful of times per second in most
        // browsers, which read as a stepped/blocky fade rather than a smooth one.
        // Reading video.currentTime fresh every animation frame is cheap and
        // gives a fade as smooth as the display's actual refresh rate.
        //
        // The single .play() call above is a fire-and-forget attempt — if a
        // browser rejects it for any transient reason (still buffering, an
        // autoplay-policy edge case, etc.) it never retries, and the video is
        // left paused on its first frame while everything else keeps animating.
        // Checking video.paused every frame and re-issuing play() is a self-healing
        // fix that doesn't depend on knowing the exact rejection reason.
        let rafId: number;
        const tick = () => {
            if (video.paused) {
                video.play().catch(() => {});
            }
            if (video.duration) {
                const remaining = video.duration - video.currentTime;
                let visible = 1; // 1 = fully visible, 0 = fully faded to void
                if (remaining <= FADE_DURATION) {
                    visible = smoothstep(remaining / FADE_DURATION);
                } else if (video.currentTime < FADE_DURATION) {
                    visible = smoothstep(video.currentTime / FADE_DURATION);
                }
                fade.style.opacity = String(1 - visible);
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <div
            aria-hidden
            style={{
                // A normal flex child (Hero.tsx renders this as a sibling of
                // the text block, in a justifyContent:'center', flexWrap:'wrap'
                // row) — not absolutely positioned. On wide screens that makes
                // the text-to-left-edge and orb-to-right-edge gaps end up equal
                // automatically; on narrow screens, the same flex-wrap just
                // reflows the orb onto its own centered row below the text
                // instead of hiding it.
                flexShrink: 0,
                position: 'relative',
                zIndex: 5,
                width: ORB_SIZE,
                height: ORB_SIZE,
                pointerEvents: 'none',
            }}
        >
            {/* animate-spin-slow rotates this whole circle as one rigid unit —
                video, vignette, and fade overlay all spin together. Safe to put
                on the same element as the box-shadow glow since a perfect circle
                looks identical at any rotation angle, so the glow never visibly
                "swims" as it spins. */}
            <div className="animate-spin-slow" style={{
                width: '100%', height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: GLOW_SHADOW,
            }}>
                {!hasError ? (
                    // Scaled up beyond 100% so object-fit:cover crops past the
                    // source video's own frame edges (light background/tank rim
                    // visible at the very border) instead of showing them.
                    <video
                        ref={videoRef}
                        src="/videos/i.mp4"
                        loop
                        muted
                        playsInline
                        onError={() => setHasError(true)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.42, display: 'block', transform: 'scale(1.22)' }}
                    />
                ) : (
                    <div style={{
                        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'radial-gradient(circle at 50% 42%, rgba(111,184,232,0.3), transparent 62%), linear-gradient(160deg, var(--ocean-void), rgba(20,50,80,0.65))',
                    }}>
                        <svg viewBox="0 0 100 100" style={{ width: '46%', opacity: 0.45 }}>
                            <path d="M20 42 Q20 14 50 14 Q80 14 80 42 Q65 50 50 50 Q35 50 20 42Z"
                                fill="none" stroke="var(--biolume-cyan)" strokeWidth="1.2" />
                            {[26, 38, 50, 62, 74].map((x, i) => (
                                <path key={i} d={`M${x} 49 Q${x + (i % 2 === 0 ? -5 : 5)} 72 ${x} 95`}
                                    fill="none" stroke="var(--biolume-cyan)" strokeWidth="0.8" opacity={0.6} />
                            ))}
                        </svg>
                    </div>
                )}

                {/* Inner vignette */}
                <div aria-hidden style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: 'radial-gradient(circle, transparent 50%, rgba(4,16,31,0.35) 100%)',
                    pointerEvents: 'none', zIndex: 1,
                }} />

                {/* Fade overlay for loop transition — JS-driven, not CSS animation
                    (a CSS keyframe loop would drift out of sync with real playback) */}
                <div
                    ref={fadeRef}
                    aria-hidden
                    style={{
                        position: 'absolute', inset: 0,
                        background: 'var(--ocean-void)',
                        opacity: 0,
                        pointerEvents: 'none',
                        zIndex: 2,
                    }}
                />
            </div>
        </div>
    );
}
