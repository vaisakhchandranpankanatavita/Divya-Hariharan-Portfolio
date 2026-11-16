import { JOBS } from '../data'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <SectionHead watermark="Career" title="Experience" />
        {JOBS.map(j => (
          <Reveal className="xrow" key={j.company}>
            <div className="yr">{j.year}<small>{j.range}</small></div>
            <div>
              <h3>{j.company}</h3>
              <p className="t">{j.role}</p>
              <ul>{j.bullets.map(b => <li key={b}>{b}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
