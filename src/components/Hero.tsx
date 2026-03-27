'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import FireParticles from './FireParticles'

const TICKER_ITEMS = [
  '🔥 Happy Hour: 30% off all drinks Mon–Fri 5–7 PM',
  '🎉 Celebrate with our Couple\'s Special — ₹3,499 for two',
  '🍖 New: Chef\'s 6-course Tasting Menu — Reserve your seat',
  '📅 Book online and skip the queue — Instant confirmation',
  '🏆 Rated 4.9 ★ on Google | 12,000+ happy guests served',
]

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

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">

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

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,8,6,0.93) 0%, rgba(10,8,6,0.68) 60%, rgba(10,8,6,0.42) 100%)' }} />

      {/* Flame-colored radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 15% 55%, rgba(232,80,26,0.16) 0%, transparent 65%)',
          animation: 'flameFlicker 4s ease-in-out infinite',
        }}
      />

      {/* Bottom flame glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(232,80,26,0.22) 0%, rgba(212,80,26,0.06) 50%, transparent 100%)',
          animation: 'flameFlicker 3s 0.5s ease-in-out infinite',
        }}
      />

      {/* Fire Particles */}
      <FireParticles count={25} />

      {/* Decorative flame lines */}
      <div className="absolute top-1/3 right-0 w-px h-64 opacity-20" style={{ background: 'linear-gradient(180deg, transparent, #e8501a, transparent)' }} />
      <div className="absolute bottom-1/4 right-32 w-px h-32 opacity-15" style={{ background: 'linear-gradient(180deg, transparent, #d4a853, transparent)' }} />
      <div className="absolute top-1/2 right-16 w-px h-20 opacity-10" style={{ background: 'linear-gradient(180deg, transparent, #e8501a, transparent)' }} />

      {/* Ticker / Announcement Bar */}
      <div
        className="relative z-20 mt-[72px] overflow-hidden py-2.5 border-b"
        style={{ background: 'rgba(232,80,26,0.12)', borderColor: 'rgba(232,80,26,0.25)' }}
      >
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: 'ticker 30s linear infinite' }}
        >
          {tickerContent.map((item, i) => (
            <span
              key={i}
              className="text-xs font-medium flex-shrink-0"
              style={{ fontFamily: "'DM Sans',sans-serif", color: '#faf8f4cc' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Main copy */}
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
                style={{ fontFamily: "'Playfair Display',serif", lineHeight: 1.08, color: '#faf8f4' }}
                className="text-5xl lg:text-7xl font-bold mb-6"
              >
                Where Fire<br />
                Meets <span style={{ color: '#e8501a', fontStyle: 'italic', textShadow: '0 0 40px rgba(232,80,26,0.5)' }}>Flavour</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="text-lg mb-10 leading-relaxed"
                style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(245,240,232,0.72)', maxWidth: '460px' }}
              >
                Slow-smoked. Flame-kissed. Unforgettable. Every dish at Sammy&apos;s
                is a celebration of real fire, honest ingredients, and bold flavour.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#reservation"
                  className="btn-ember text-base px-8 py-3.5 rounded-lg"
                  style={{ boxShadow: '0 8px 32px rgba(232,80,26,0.45)' }}
                >
                  🍽 Book a Table
                </a>
                <a
                  href="#menu"
                  className="btn-outline text-base px-8 py-3.5 rounded-lg"
                >
                  Explore Menu →
                </a>
              </motion.div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="flex gap-8 mt-14 pt-8 border-t border-white/10"
              >
                {[
                  { val: '4.9★', label: 'Google Rating' },
                  { val: '12k+', label: 'Happy Guests' },
                  { val: '40+',  label: 'Grill Specials' },
                  { val: '5 yrs', label: 'Of Excellence' },
                ].map(s => (
                  <div key={s.label}>
                    <div
                      className="text-2xl font-bold"
                      style={{ fontFamily: "'Playfair Display',serif", color: '#e8501a', textShadow: '0 0 20px rgba(232,80,26,0.4)' }}
                    >
                      {s.val}
                    </div>
                    <div
                      className="text-[10px] mt-0.5 uppercase tracking-wider"
                      style={{ fontFamily: "'DM Sans',sans-serif", color: 'rgba(245,240,232,0.4)' }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Feature cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="hidden lg:flex flex-col gap-4"
            >
              {[
                {
                  emoji: '🔥',
                  title: 'Wood-Fire Grilling',
                  desc: 'Every cut cooked over live oak and hickory wood at 600°C',
                  img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80',
                },
                {
                  emoji: '🌿',
                  title: 'Farm-Fresh Ingredients',
                  desc: 'Locally sourced produce, delivered to us every morning',
                  img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
                },
                {
                  emoji: '🎉',
                  title: 'Events & Private Dining',
                  desc: 'Bespoke dining experiences for celebrations, big and small',
                  img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.15 }}
                  className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-md border hover:border-[#e8501a]/30 transition-all duration-300 group"
                  style={{
                    background: 'rgba(20,16,12,0.7)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e8501a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5 heading-playfair group-hover:text-[#e8501a] transition-colors">
                      {card.emoji} {card.title}
                    </p>
                    <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,232,0.35)', fontFamily: "'DM Sans',sans-serif" }}>Scroll</span>
        <div className="w-px h-10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
          <motion.div
            className="w-full absolute top-0"
            style={{ height: '40%', background: '#e8501a', boxShadow: '0 0 8px #e8501a' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
