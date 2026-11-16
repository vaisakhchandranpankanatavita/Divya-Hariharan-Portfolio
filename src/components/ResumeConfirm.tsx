import { useEffect, useRef, useState } from 'react'
import './ResumeConfirm.css'

/**
 * Intercepts every resume download link and asks for confirmation in a dialog
 * styled to match the site. Confirming re-fires the original link click.
 */
export default function ResumeConfirm() {
  const [open, setOpen] = useState(false)
  const pending = useRef<HTMLAnchorElement | null>(null)
  const bypass = useRef(false)
  const primary = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (bypass.current) return
      const a = (e.target as Element).closest?.('a[download]') as HTMLAnchorElement | null
      if (!a) return
      e.preventDefault()
      e.stopPropagation()
      pending.current = a
      setOpen(true)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  useEffect(() => {
    if (!open) return
    primary.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  // close the dialog when the user moves to another page
  useEffect(() => {
    const close = () => setOpen(false)
    addEventListener('hashchange', close)
    return () => removeEventListener('hashchange', close)
  }, [])

  const confirm = () => {
    const a = pending.current
    setOpen(false)
    if (!a) return
    bypass.current = true
    a.click()
    bypass.current = false
  }

  if (!open) return null

  return (
    <div className="rc-overlay" onClick={() => setOpen(false)}>
      <div
        className="rc-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rc-title"
        onClick={e => e.stopPropagation()}
      >
        <p className="rc-eyebrow">Résumé</p>
        <h2 id="rc-title">Download the résumé?</h2>
        <p className="rc-text">A PDF copy of Divya Hariharan's résumé will be saved to your device.</p>
        <div className="rc-actions">
          <button type="button" className="rc-btn ghost" onClick={() => setOpen(false)}>Cancel</button>
          <button type="button" className="rc-btn solid" ref={primary} onClick={confirm}>Download ↓</button>
        </div>
      </div>
    </div>
  )
}
