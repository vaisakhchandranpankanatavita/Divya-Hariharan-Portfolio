import { useState } from 'react'
import { EMAIL, HIGHLIGHTS, LANGUAGES, PHONE, SOCIALS } from '../data'
import photo from '../assets/photo.webp'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

function SocialIcon({ label }: { label: string }) {
  const common = { viewBox: '0 0 24 24', 'aria-hidden': true as const, focusable: false as const }
  if (label === 'LinkedIn') return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" /><path d="M8 10v7M8 7.4v.1M12 17v-7m0 3.1c0-1.2.8-2.1 2-2.1s2 .8 2 2.1V17" fill="none" stroke="var(--bg)" strokeWidth="1.8" strokeLinecap="round" /></svg>
  if (label === 'Google Scholar') return <svg {...common}><path d="m2.5 9 9.5-6 9.5 6-9.5 6-9.5-6Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6.5 11.7v4.1c3.3 2.7 7.7 2.7 11 0v-4.1M21.5 9v6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (label === 'ORCID') return <svg {...common}><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" /><text x="12" y="15.2" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="Arial, sans-serif" fontWeight="700">iD</text></svg>
  if (label === 'Web of Science') return <svg {...common}><circle cx="12" cy="5" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="5.5" cy="17" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="18.5" cy="17" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="m11 7-4.5 8m6.5-8 4.5 8M7.5 17h9" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
  return <svg {...common}><path d="M4 5.5c3.2-.9 5.8-.3 8 1.4 2.2-1.7 4.8-2.3 8-1.4v13c-3.2-.9-5.8-.3-8 1.4-2.2-1.7-4.8-2.3-8-1.4v-13Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M12 7v12" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
}

export default function Contact() {
  const [flipped, setFlipped] = useState(false)
  const toggle = () => setFlipped(f => !f)
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
  }
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <SectionHead flush watermark="Hello" title={<>Let’s <em>Connect.</em></>} />
        <Reveal className="vc-wrap">
          <div
            className={`vc-scene${flipped ? ' is-flipped' : ''}`}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label="Contact card. Press to flip and see more details."
            onClick={toggle}
            onKeyDown={onKey}
          >
            <div className="vc-inner">
              <article className="vc-face vc-front" aria-label="Divya Hariharan contact card">
                <img className="vc-photo" src={photo} alt="" width={690} height={815} />
                <div className="vc-top">
                  <span className="vc-kicker">Divya Hariharan</span>
                  <p className="vc-title">English Literature Lecturer<br />Researcher &amp; Author</p>
                </div>
                <div className="vc-bottom" onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()}>
                  <a className="vc-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  <a className="vc-line vc-tel" href={`tel:${PHONE.replace(/[^\d+]/g, '')}`}>{PHONE}</a>
                  <ul className="vc-soc" aria-label="Profiles" onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()}>
                    {SOCIALS.map(s => (
                      <li key={s.label}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" title={s.href} aria-label={s.label}><SocialIcon label={s.label} /></a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              <div className="vc-face vc-back" aria-label="More about Divya Hariharan">
                <span className="vc-eyebrow">Details</span>
                <dl className="vc-dl">
                  <div><dt>Based in</dt><dd>Muscat, Oman</dd></div>
                  <div><dt>Languages</dt><dd>{LANGUAGES.join(' · ')}</dd></div>
                </dl>
                <div className="vc-stats">
                  {HIGHLIGHTS.map(h => (
                    <div key={h.label}><b>{h.value}</b><span>{h.label}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="vc-hint" aria-hidden="true">
            <span className="vc-hint-icon">↻</span>
            {flipped ? 'Tap the card to flip back' : 'Tap the card to flip'}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
