'use client'

import { useEffect, useState } from 'react'

interface Ember {
  id: number
  x: number
  duration: number
  delay: number
  size: number
  color: string
  drift: number
}

export default function FireParticles({
  count = 22,
  className = '',
}: {
  count?: number
  className?: string
}) {
  const [embers, setEmbers] = useState<Ember[]>([])

  useEffect(() => {
    const colors = [
      '#e8501a',
      '#ff6b35',
      '#d4a853',
      '#ff9945',
      '#c03d10',
      '#ffb347',
      '#ff4500',
    ]
    setEmbers(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: 5 + Math.random() * 90,
        duration: 2.8 + Math.random() * 3.5,
        delay: Math.random() * 5,
        size: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        drift: (Math.random() - 0.5) * 40,
      }))
    )
  }, [count])

  if (embers.length === 0) return null

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 6 }}
    >
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${ember.x}%`,
            width: ember.size,
            height: ember.size * 1.4,
            background: `radial-gradient(circle, ${ember.color} 0%, ${ember.color}aa 60%, transparent 100%)`,
            boxShadow: `0 0 ${ember.size * 3}px ${ember.color}88`,
            animation: `emberRise ${ember.duration}s ${ember.delay}s infinite ease-out`,
            '--drift': `${ember.drift}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Static flame glows at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(232,80,26,0.18) 0%, rgba(212,80,26,0.08) 40%, transparent 100%)',
          animation: 'flameFlicker 2.5s ease-in-out infinite',
        }}
      />
    </div>
  )
}
