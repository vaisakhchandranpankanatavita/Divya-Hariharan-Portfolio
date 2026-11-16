import { NAV } from '../data'

/** Simple line icons for the phone tab bar. Hidden on desktop by CSS. */
const ICONS: Record<string, JSX.Element> = {
  Home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />,
  Work: <><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></>,
  Experience: <><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" /></>,
  About: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5c1.4-3.6 4.1-5.5 7.5-5.5s6.1 1.9 7.5 5.5" /></>,
  Contact: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
}

function Icon({ name }: { name: string }) {
  return (
    <svg className="bnav-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {ICONS[name]}
    </svg>
  )
}

/** Site navigation fixed to the foot of the screen on every page, including the homepage. */
export default function BottomNav({ route }: { route: string }) {
  return (
    <nav className="bnav" aria-label="Primary">
      <a href="#/" className={route === 'home' ? 'on' : ''} aria-current={route === 'home' ? 'page' : undefined}><Icon name="Home" />Home</a>
      {NAV.map(n => (
        <a key={n.href} href={n.href} className={route === n.route ? 'on' : ''} aria-current={route === n.route ? 'page' : undefined}><Icon name={n.label} />{n.label}</a>
      ))}
    </nav>
  )
}
