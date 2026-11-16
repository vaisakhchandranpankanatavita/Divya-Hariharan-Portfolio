import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

export type Route = 'home' | 'work' | 'experience' | 'about' | 'contact'
const ROUTES: Route[] = ['home', 'work', 'experience', 'about', 'contact']

const read = (): Route => {
  const r = location.hash.replace(/^#\/?/, '').split('/')[0] as Route
  return ROUTES.includes(r) && r !== 'home' ? r : 'home'
}

/** Tiny hash router, so every page works on any static host (and inside the artifact viewer). */
export function useRoute() {
  const [route, setRoute] = useState<Route>(read)
  useEffect(() => {
    const on = () => {
      const next = read()
      if (next === route) return
      // fade the current page out, swap it while invisible, then fade the new page in (see styles.css)
      const swap = () => { scrollTo(0, 0); flushSync(() => setRoute(next)) }
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { swap(); return }
      document.body.classList.add('page-leaving')
      setTimeout(() => {
        swap()
        document.body.classList.remove('page-leaving')
      }, 280)
    }
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [route])
  return route
}
