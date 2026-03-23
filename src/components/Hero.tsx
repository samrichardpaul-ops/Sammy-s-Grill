'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 18
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      el.style.transform = `translate(${x}px, ${y}px) scale(1.08)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Parallax background */}
      <div
        ref={videoRef}
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?w=1800&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.08)',
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,8,6,0.88) 0%, rgba(10,8,6,0.55) 60%, rgba(10,8,6,0.35) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(232,80,26,0.12) 0%, transparent 60%)' }} />

      {/* Decorative ember lines */}
      <div className="absolute top-1/3 right-0 w-px h-64 opacity-20" style={{ background: 'linear-gradient(180deg, transparent, #e8501a, transparent)' }} />
      <div className="absolute bottom-1/4 right-24 w-px h-32 opacity-15" style={{ background: 'linear-gradient(180deg, transparent, #d4a853, transparent)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24">
        <div className="max-w-2xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="section-divider" />
            <span
              className="text-xs uppercase tracking-[0.22em] font-medium"
              style={{ fontFamily: "'DM Sans',sans-serif", color: '#d4a853' }}
            >
              Est. 2020 · Kanakapura, Bangalore
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            style={{ fontFamily: "'Playfair Display',serif", lineHeight: 1.1, color: '#faf8f4' }}
            className="text-5xl lg:text-7xl font-bold mb-6"
          >
            Welcome to<br />
            <span style={{ color: '#e8501a', fontStyle: 'italic' }}>Sammy&apos;s</span><br />
            Grill Cafe
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-lg mb-10 leading-relaxed"
            style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(245,240,232,0.75)', maxWidth: '480px' }}
          >
            Experience the finest grilled delicacies in a warm, cozy atmosphere.
            Every dish — a story of fire, smoke, and passion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#reservation" className="btn-ember text-base" style={{ padding: '0.9rem 2.2rem', borderRadius: '6px' }}>
              🍽 Book a Table
            </a>
            <a href="#menu" className="btn-outline text-base" style={{ padding: '0.9rem 2.2rem', borderRadius: '6px' }}>
              View Menu
            </a>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex gap-8 mt-16"
          >
            {[
              { val: '4.9★',   label: 'Rating' },
              { val: '12k+',   label: 'Happy Guests' },
              { val: '40+',    label: 'Grill Specials' },
              { val: '5 yrs',  label: 'Of Excellence' },
            ].map(s => (
              <div key={s.label}>
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display',serif", color: '#e8501a' }}
                >
                  {s.val}
                </div>
                <div className="text-xs mt-0.5" style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(245,240,232,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,232,0.4)', fontFamily: "'DM Sans',sans-serif" }}>Scroll</span>
        <div className="w-px h-10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <motion.div
            className="w-full absolute top-0"
            style={{ height: '40%', background: '#e8501a' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
