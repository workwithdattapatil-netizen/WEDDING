import { useEffect, useMemo, useRef, useState } from 'react'
import './SaveTheDate.css'

const WEDDING_DATE = new Date('2027-02-25T10:00:00+05:30')

const BURST_GLYPHS = ['❀', '✿', '❁', '✾', '🌸', '🌼', '🌺']

type Burst = {
  id: number
  side: 'left' | 'right'
  glyph: string
  size: number
  startY: number
  travelX: number
  travelY: number
  rotate: number
  duration: number
  delay: number
}

const FlowerBurst = () => {
  const bursts = useMemo<Burst[]>(() => {
    const total = 28
    return Array.from({ length: total }, (_, i) => {
      const side = i % 2 === 0 ? 'left' : 'right'
      const horizontal = 140 + Math.random() * 180
      return {
        id: i,
        side,
        glyph: BURST_GLYPHS[i % BURST_GLYPHS.length],
        size: 16 + Math.random() * 18,
        startY: 20 + Math.random() * 60,
        travelX: side === 'left' ? horizontal : -horizontal,
        travelY: -(40 + Math.random() * 140),
        rotate: (Math.random() - 0.5) * 720,
        duration: 1.6 + Math.random() * 0.8,
        delay: Math.random() * 0.35,
      }
    })
  }, [])

  return (
    <div className="flower-burst" aria-hidden="true">
      {bursts.map((b) => (
        <span
          key={b.id}
          className={`burst-petal burst-${b.side}`}
          style={{
            fontSize: `${b.size}px`,
            top: `${b.startY}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            ['--tx' as never]: `${b.travelX}px`,
            ['--ty' as never]: `${b.travelY}px`,
            ['--rot' as never]: `${b.rotate}deg`,
          }}
        >
          {b.glyph}
        </span>
      ))}
    </div>
  )
}

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const computeTimeLeft = (): TimeLeft => {
  const diff = WEDDING_DATE.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const SaveTheDate = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(computeTimeLeft())
  const [revealed, setRevealed] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawing = useRef(false)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(computeTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height)
    gradient.addColorStop(0, '#b8860b')
    gradient.addColorStop(0.5, '#d4af37')
    gradient.addColorStop(1, '#6b2737')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, rect.width, rect.height)

    ctx.fillStyle = 'rgba(253, 246, 232, 0.9)'
    ctx.font = '14px "Cormorant Garamond", serif'
    ctx.textAlign = 'center'
    ctx.fillText('✦ scratch the hearts to reveal ✦', rect.width / 2, rect.height / 2 - 8)
    ctx.font = '24px serif'
    ctx.fillText('♥ ♥ ♥', rect.width / 2, rect.height / 2 + 22)
  }, [])

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const px = x - rect.left
    const py = y - rect.top

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(px, py, 28, 0, Math.PI * 2)
    ctx.fill()

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let cleared = 0
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) cleared++
    }
    const ratio = cleared / (pixels.length / 16)
    if (ratio > 0.45) setRevealed(true)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true
    scratch(e.clientX, e.clientY)
  }
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return
    scratch(e.clientX, e.clientY)
  }
  const handlePointerUp = () => {
    isDrawing.current = false
  }

  return (
    <section className="save-date section">
      <p className="section-subtitle">Save the Date</p>
      <h2 className="section-title">Our Big Day</h2>

      <div className="divider">
        <span className="divider-icon">✦</span>
      </div>

      <div className="scratch-wrap">
        <div className="scratch-card">
          <div className="scratch-reveal">
            <p className="date-day">Thursday</p>
            <h3 className="date-main">25th February 2027</h3>
            <p className="date-sub">Ponda, Goa</p>
          </div>
          {!revealed && (
            <canvas
              ref={canvasRef}
              className="scratch-canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
          )}
        </div>
        {revealed && <FlowerBurst />}
      </div>

      <div className="countdown">
        <p className="countdown-eyebrow">Counting down to our big day</p>
        <div className="days-hero">
          <span className="days-number">{timeLeft.days}</span>
          <span className="days-label">{timeLeft.days === 1 ? 'day' : 'days'} to go</span>
        </div>
        <div className="hms-row">
          <div className="hms-item">
            <span className="hms-number">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="hms-label">Hours</span>
          </div>
          <span className="hms-sep">:</span>
          <div className="hms-item">
            <span className="hms-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="hms-label">Min</span>
          </div>
          <span className="hms-sep">:</span>
          <div className="hms-item">
            <span className="hms-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="hms-label">Sec</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaveTheDate
