import { useEffect } from 'react'

/**
 * Blue is the only colour theme for now, so the theme switch is hidden.
 * The component keeps the page on the blue theme. To bring the switch back later,
 * restore the earlier version of this file from git history.
 */
export default function ThemeToggle() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'blue')
    try { localStorage.removeItem('dh-theme') } catch { /* ignore */ }
  }, [])
  return null
}
