/**
 * Smooth mouse-wheel scrolling for the inner pages (which use native page scroll).
 * Each wheel notch moves a target position, and the page eases toward it over a few frames.
 * Skipped when the user prefers reduced motion, when the page can't scroll, and for horizontal
 * carousels or form fields, which keep their own behaviour.
 */
export function enableSmoothWheel() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let target = 0
  let current = 0
  let frame = 0
  let running = false

  const max = () => Math.max(0, document.documentElement.scrollHeight - innerHeight)

  const step = () => {
    current += (target - current) * 0.14
    if (Math.abs(target - current) < 0.5) {
      current = target
      running = false
      frame = 0
      window.scrollTo(0, current)
      return
    }
    window.scrollTo(0, current)
    frame = requestAnimationFrame(step)
  }

  addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.deltaX !== 0 || max() === 0) return
    const el = e.target instanceof Element ? e.target : null
    if (el?.closest('.sl-track, textarea, input, select, [contenteditable="true"]')) return

    const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerHeight : 1
    if (!running) {
      current = window.scrollY
      target = current
    }
    target = Math.min(max(), Math.max(0, target + e.deltaY * unit))
    e.preventDefault()
    if (!running) {
      running = true
      frame = requestAnimationFrame(step)
    }
  }, { passive: false })

  // if the user scrolls another way (keyboard, scrollbar, touch), drop the queued movement
  addEventListener('keydown', () => { if (running) { cancelAnimationFrame(frame); running = false } })
  addEventListener('touchstart', () => { if (running) { cancelAnimationFrame(frame); running = false } }, { passive: true })
}
