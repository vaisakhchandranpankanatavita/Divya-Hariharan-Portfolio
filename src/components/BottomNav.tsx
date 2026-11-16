import { NAV } from '../data'

const RESUME = `${import.meta.env.BASE_URL}resume.pdf`

/** Site navigation fixed to the foot of the screen on every page, including the homepage. */
export default function BottomNav({ route }: { route: string }) {
  return (
    <nav className="bnav" aria-label="Primary">
      <a href="#/" className={route === 'home' ? 'on' : ''} aria-current={route === 'home' ? 'page' : undefined}>Home</a>
      {NAV.map(n => (
        <a key={n.href} href={n.href} className={route === n.route ? 'on' : ''} aria-current={route === n.route ? 'page' : undefined}>{n.label}</a>
      ))}
      <a className="bnav-res" href={RESUME} download="Divya-Hariharan-Resume.pdf">Resume ↓</a>
    </nav>
  )
}
