import { useState } from 'react'
import { WORK } from '../data'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import patent from '../assets/work/patent.webp'
import publication from '../assets/work/publication.webp'
import award from '../assets/work/award.webp'
import recognition from '../assets/work/recognition.webp'

const IMG: Record<string, string> = { Patent: patent, Publication: publication, Award: award, Recognition: recognition }

const FILTERS = ['All', 'Patent', 'Publication', 'Award', 'Recognition'] as const

export default function Work() {
  const [f, setF] = useState<(typeof FILTERS)[number]>('All')
  const items = WORK.map((w, i) => ({ ...w, n: String(i + 1).padStart(2, '0') }))
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px')
    e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px')
  }
  return (
    <section id="work" className="showcase">
      <div className="wrap">
        <SectionHead watermark="Research" title={<>Research that <em>travels.</em></>} />

        <div className="wk">
          <aside className="wk-side">
            <div className="sc-filter" role="tablist" aria-label="Filter work" aria-orientation="vertical">
              {FILTERS.map(x => (
                <button key={x} role="tab" aria-selected={f === x} className={f === x ? 'on' : ''} onClick={() => setF(x)}>{x}</button>
              ))}
            </div>
          </aside>

          <ol className="sc-list wk-main">
            {items.map(w => (
              <li key={w.title} className={f === 'All' || f === w.tag ? '' : 'dim'}>
                <Reveal as="article" className="sc-row" >
                  <div className="sc-in" onPointerMove={onMove} tabIndex={0}>
                    <span className="sc-n">{w.n}</span>
                    <div className="sc-main">
                      <span className="sc-tag">{w.tag}<i /> {w.cat.split('·').slice(1).join('·').trim() || w.cat}</span>
                      <h3>{w.href ? <a href={w.href} target="_blank" rel="noopener noreferrer">{w.title}</a> : w.title}</h3>
                      <p>{w.text}</p>
                    </div>
                    <span className="sc-th"><img src={IMG[w.tag]} alt="" loading="lazy" /><i>{w.year}</i></span>
                    <span className="sc-yr">{w.year}</span>
                    <span className="sc-go" aria-hidden="true">↗</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
