import { useEffect, useState } from 'react'
import photo from '../assets/photo.webp'
import { HIGHLIGHTS } from '../data'
import Split from './Split'
import Reveal from './Reveal'
import '../home.css'

/** Local time in Muscat, refreshed every 30 seconds. */
function useMuscatTime() {
  const fmt = () => new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Muscat', hour: 'numeric', minute: '2-digit' }).toLowerCase()
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 30000); return () => clearInterval(id) }, [])
  return t
}

const Stat = ({ i, delay }: { i: number; delay: number }) => {
  const h = HIGHLIGHTS[i]
  return (
    <Reveal className="home-stat" delay={delay}>
      <b>{h.value}</b>
      <span>{h.label}</span>
      <small>{h.sub}</small>
    </Reveal>
  )
}

export default function Hero() {
  const time = useMuscatTime()
  return (
    <section className="home" id="top" aria-label="Introduction">
      <Split as="h1" className="home-name" immediate>
        <span className="ln">Divya</span>
        <span className="ln">Hariharan</span>
      </Split>

      <Reveal className="home-title" delay={200}>
        <p>English Literature Lecturer, Researcher &amp; Author</p>
      </Reveal>

      <div className="home-stage">
        <div className="home-col home-left">
          <Reveal className="home-now home-edu" delay={300}>
            <small>Education</small>
            <span>PhD in English</span>
            <em>Lincoln University College</em>
          </Reveal>
          <div className="home-stats">
            <Stat i={0} delay={380} />
            <Stat i={1} delay={460} />
          </div>
        </div>

        <figure className="home-fig">
          <img src={photo} alt="Portrait of Divya Hariharan smiling in a beige blazer" width={800} height={944} />
        </figure>

        <div className="home-col home-right">
          <Reveal className="home-now" delay={260}>
            <small>Currently teaching at</small>
            <span>Al Bayan College</span>
            <em>Muscat, Oman</em>
          </Reveal>
          <div className="home-stats">
            <Stat i={2} delay={520} />
            <Stat i={3} delay={600} />
          </div>
        </div>
      </div>
    </section>
  )
}
