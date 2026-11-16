import { useEffect, useRef, useState, type ReactNode } from 'react'
import './Slider.css'

const ArrowNext = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)
const ArrowPrev = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </svg>
)

/** Horizontal row of items with round Prev / Next buttons (no scrollbar). Runs edge to edge. */
export default function Slider({ label, children }: { label: string; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const update = () => {
      setCanPrev(el.scrollLeft > 4)
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      removeEventListener('resize', update)
    }
  }, [])

  const step = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const item = el.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const amount = item ? item.offsetWidth + gap : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <div className="sl">
      <div className="sl-head">
        <p className="sl-label">{label}</p>
        <div className="sl-nav">
          <button type="button" className="sl-btn" onClick={() => step(-1)} disabled={!canPrev} aria-label={`Previous in ${label}`}><ArrowPrev /></button>
          <button type="button" className="sl-btn" onClick={() => step(1)} disabled={!canNext} aria-label={`Next in ${label}`}><ArrowNext /></button>
        </div>
      </div>
      <div className="sl-track" ref={trackRef}>
        {children}
      </div>
    </div>
  )
}
