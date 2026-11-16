/**
 * Hide the bars while scrolling down and bring them back on scroll up, so the content is not crowded behind them.
 * - bnav-hidden: the bottom bar (phones only, see styles.css)
 * - topbar-hidden: the fixed title bar on inner pages (all screen sizes)
 */
export function enableBarAutoHide() {
  let last = Math.max(0, window.scrollY)
  let dir = 0 // direction of the current run of scrolling: 1 down, -1 up
  let run = 0 // distance scrolled in that direction since it last changed
  let frame = 0

  const setHidden = (hidden: boolean) => {
    document.body.classList.toggle('bnav-hidden', hidden)
    document.body.classList.toggle('topbar-hidden', hidden)
  }

  const update = () => {
    frame = 0
    const y = Math.max(0, window.scrollY)
    const delta = y - last
    last = y
    if (delta === 0) return
    const d = Math.sign(delta)
    // a change of direction starts a new run, so small reversals (trackpad inertia) do not make the bars flicker
    if (d !== dir) { dir = d; run = 0 }
    run += delta
    if (y <= 80) setHidden(false)
    else if (dir > 0 && run > 16) setHidden(true)
    else if (dir < 0 && run < -16) setHidden(false)
  }

  // run at most once per frame, so the bars move in step with the page
  addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(update)
  }, { passive: true })
}

/** Ease-in-out: starts slowly, speeds up, and settles gently into the stop. */
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Smooth scrolling for the inner pages (which use native page scroll) on every device with a mouse,
 * trackpad or keyboard. Each wheel movement or arrow/page key starts a short tween from the current
 * position to a new target, eased so the page leaves rest gently and comes to a soft stop.
 * Repeated input retargets the running tween, so trackpads and fast wheels stay fluid.
 * Skipped when the user prefers reduced motion, and for carousels or form fields, which keep their own behaviour.
 * Touch screens keep the system's own momentum scrolling.
 */
export function enableSmoothWheel() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const max = () => Math.max(0, document.documentElement.scrollHeight - innerHeight)
  const inField = (t: EventTarget | null) =>
    t instanceof Element && !!t.closest('.sl-track, textarea, input, select, [contenteditable="true"]')

  let from = 0
  let to = 0
  let start = 0
  let duration = 0
  let frame = 0
  let written = 0 // last position we set; if the real scroll differs, the user moved it another way
  let running = false

  const stop = () => {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    running = false
  }

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const y = from + (to - from) * easeInOut(t)
    window.scrollTo(0, y)
    written = y
    if (t >= 1) { stop(); return }
    frame = requestAnimationFrame(tick)
  }

  /** Start (or retarget) a tween toward `dest`, beginning from wherever the page is right now. */
  const glideTo = (dest: number) => {
    const clamped = Math.min(max(), Math.max(0, dest))
    from = window.scrollY
    to = clamped
    const dist = Math.abs(to - from)
    if (dist < 1) { window.scrollTo(0, to); stop(); return }
    // short moves stay quick; long moves take a little longer so the easing reads as smooth, not abrupt
    duration = Math.min(900, Math.max(260, 220 + dist * 0.35))
    start = performance.now()
    if (running) cancelAnimationFrame(frame)
    running = true
    frame = requestAnimationFrame(tick)
  }

  addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.deltaX !== 0 || max() === 0 || inField(e.target)) return
    const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerHeight : 1
    // keep building on the current target while a glide is running, so repeated notches add up
    const base = running ? to : window.scrollY
    e.preventDefault()
    glideTo(base + e.deltaY * unit)
  }, { passive: false })

  // arrow, page, space and home/end keys glide too (not while typing or inside a carousel)
  addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || inField(e.target) || max() === 0) return
    const page = innerHeight * 0.85
    const moves: Record<string, number> = { ArrowDown: 80, ArrowUp: -80, PageDown: page, PageUp: -page, ' ': e.shiftKey ? -page : page }
    let dest: number | null = null
    if (e.key in moves) dest = (running ? to : window.scrollY) + moves[e.key]
    else if (e.key === 'Home') dest = 0
    else if (e.key === 'End') dest = max()
    if (dest === null) return
    e.preventDefault()
    glideTo(dest)
  })

  // the user dragged the scrollbar or touched the page: hand control back immediately
  addEventListener('scroll', () => {
    if (running && Math.abs(window.scrollY - written) > 2) stop()
  }, { passive: true })
  addEventListener('touchstart', stop, { passive: true })
  addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') stop() }, { passive: true })
}
