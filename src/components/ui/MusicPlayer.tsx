'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkipBack, SkipForward, Pause, Play, Heart } from 'lucide-react';

const TRACK = { title: 'Moonlight', artist: 'Harry Styles', progress: 92, duration: 197 };
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const pct = (TRACK.progress / TRACK.duration) * 100;

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(true);
  const [liked,   setLiked]   = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 1.2, ease: 'easeOut' }}
      className="glass"
      style={{ borderRadius: '1rem', padding: '1.25rem', width: '210px', userSelect: 'none' }}
    >
      <p style={{ textAlign:'center', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--pearl-dim)', marginBottom:'0.85rem', fontFamily:'Inter,sans-serif' }}>
        now playing
      </p>

      {/* Album art */}
      <motion.div
        animate={{ rotate: playing ? 360 : 0 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{ width:'88px', height:'88px', borderRadius:'50%', margin:'0 auto 0.85rem', background:'linear-gradient(135deg,#0a2a4a,#1a5080,#0d3560)', position:'relative', overflow:'hidden' }}
      >
        <svg viewBox="0 0 60 60" style={{ width:'56px', height:'56px', opacity:0.65, position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}>
          <ellipse cx="30" cy="22" rx="15" ry="11" fill="none" stroke="rgba(79,195,247,0.7)" strokeWidth="1"/>
          {[22,26,30,34,38].map((x,i)=>(
            <path key={i} d={`M${x} 33 Q${x+(i%2===0?-3:3)} ${43+i*2} ${x} ${51+i}`} fill="none" stroke="rgba(79,195,247,0.4)" strokeWidth="0.8"/>
          ))}
        </svg>
        <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid rgba(79,195,247,0.2)' }}/>
        <div style={{ position:'absolute', inset:'14px', borderRadius:'50%', border:'1px solid rgba(79,195,247,0.12)' }}/>
      </motion.div>

      {/* Track info */}
      <div style={{ textAlign:'center', marginBottom:'0.75rem' }}>
        <p className="font-display" style={{ fontSize:'1.05rem', color:'var(--pearl)' }}>{TRACK.title}</p>
        <p style={{ fontSize:'0.72rem', color:'var(--pearl-dim)', marginTop:'2px' }}>{TRACK.artist}</p>
      </div>

      {/* Progress */}
      <div style={{ marginBottom:'0.2rem' }}>
        <div style={{ height:'2px', borderRadius:'1px', background:'rgba(79,195,247,0.15)' }}>
          <div style={{ height:'100%', width:`${pct}%`, borderRadius:'1px', background:'linear-gradient(90deg,#4fc3f7,#00e5ff)' }}/>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:'3px' }}>
          <span style={{ fontSize:'0.65rem', color:'var(--pearl-faint)' }}>{fmt(TRACK.progress)}</span>
          <span style={{ fontSize:'0.65rem', color:'var(--pearl-faint)' }}>{fmt(TRACK.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'0.6rem', padding:'0 0.25rem' }}>
        <button style={{ background:'none', border:'none', cursor:'pointer', opacity:0.6, color:'var(--pearl)' }}>
          <SkipBack size={15}/>
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          style={{ width:'34px', height:'34px', borderRadius:'50%', border:'none', cursor:'pointer', background:'linear-gradient(135deg,#4fc3f7,#00e5ff)', boxShadow:'0 0 14px rgba(79,195,247,0.45)', display:'flex', alignItems:'center', justifyContent:'center' }}
        >
          {playing ? <Pause size={14} fill="white" color="white"/> : <Play size={14} fill="white" color="white"/>}
        </button>
        <button style={{ background:'none', border:'none', cursor:'pointer', opacity:0.6, color:'var(--pearl)' }}>
          <SkipForward size={15}/>
        </button>
        <button onClick={() => setLiked(l => !l)} style={{ background:'none', border:'none', cursor:'pointer', color: liked ? '#f472b6' : 'var(--pearl-dim)' }}>
          <Heart size={13} fill={liked ? '#f472b6' : 'none'}/>
        </button>
      </div>
    </motion.div>
  );
}