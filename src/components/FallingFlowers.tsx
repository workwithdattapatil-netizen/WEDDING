import { useMemo } from 'react'
import './FallingFlowers.css'

const FLOWER_GLYPHS = ['❀', '✿', '❁', '✾', '🌸', '🌼']
const PETAL_COLORS = ['#b8860b', '#6b2737', '#d4af37', '#e8d49a', '#c0392b']
const FLOWER_COUNT = 16
const PETAL_COUNT = 14

type Drifter = {
  id: number
  kind: 'flower' | 'petal'
  left: number
  glyph?: string
  color?: string
  size: number
  duration: number
  delay: number
  drift: number
  opacity: number
  spin: number
}

const FallingFlowers = () => {
  const items = useMemo<Drifter[]>(() => {
    const flowers: Drifter[] = Array.from({ length: FLOWER_COUNT }, (_, i) => ({
      id: i,
      kind: 'flower',
      left: Math.random() * 100,
      glyph: FLOWER_GLYPHS[i % FLOWER_GLYPHS.length],
      size: 14 + Math.random() * 18,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 14,
      drift: (Math.random() - 0.5) * 120,
      opacity: 0.45 + Math.random() * 0.4,
      spin: 360 + Math.random() * 360,
    }))

    const petals: Drifter[] = Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: FLOWER_COUNT + i,
      kind: 'petal',
      left: Math.random() * 100,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      size: 10 + Math.random() * 14,
      duration: 10 + Math.random() * 12,
      delay: Math.random() * 16,
      drift: (Math.random() - 0.5) * 180,
      opacity: 0.55 + Math.random() * 0.35,
      spin: 720 + Math.random() * 720,
    }))

    return [...flowers, ...petals]
  }, [])

  return (
    <div className="falling-flowers" aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          className={p.kind === 'flower' ? 'petal' : 'petal petal-svg'}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            width: p.kind === 'petal' ? `${p.size * 0.6}px` : undefined,
            height: p.kind === 'petal' ? `${p.size}px` : undefined,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
            opacity: p.opacity,
            ['--drift' as never]: `${p.drift}px`,
            ['--spin' as never]: `${p.spin}deg`,
          }}
        >
          {p.kind === 'flower' ? (
            p.glyph
          ) : (
            <svg viewBox="0 0 20 32" width="100%" height="100%" aria-hidden="true">
              <path
                d="M10 1 C 3 9, 3 22, 10 31 C 17 22, 17 9, 10 1 Z"
                fill={p.color}
                opacity="0.9"
              />
              <path
                d="M10 5 C 7 12, 7 22, 10 28"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="0.8"
                fill="none"
              />
            </svg>
          )}
        </span>
      ))}
    </div>
  )
}

export default FallingFlowers
