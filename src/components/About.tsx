import { useState, type ReactNode } from 'react'
import { AFFILIATIONS, BOOKS, CERTIFICATIONS, CONFERENCES, CREATIVE_WRITING, EDUCATION, INTERESTS, LANGUAGES, RESEARCH_PROJECTS, SCOPUS_AUTHOR_ID, SKILLS, TRAINING } from '../data'
import SectionHead from './SectionHead'
import Split from './Split'
import Reveal from './Reveal'
import './About.css'

/** One collapsible topic: a map row (number, title, hint) that expands to its details. */
function Topic({ n, title, hint, open, onToggle, children }: { n: string; title: string; hint: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className={`ab-topic${open ? ' is-open' : ''}`}>
      <button type="button" className="ab-head" aria-expanded={open} onClick={onToggle}>
        <span className="ab-num">{n}</span>
        <span className="ab-title">{title}</span>
        <span className="ab-hint">{hint}</span>
        <span className="ab-plus" aria-hidden="true" />
      </button>
      <div className="ab-panel" aria-hidden={!open}>
        <div className="ab-body">{children}</div>
      </div>
    </div>
  )
}

export default function About() {
  const [open, setOpen] = useState<Record<string, boolean>>({ education: true })
  // Accordion: opening one topic closes the others (clicking the open one closes it).
  const toggle = (k: string) => setOpen(s => (s[k] ? {} : { [k]: true }))

  const topics = [
    {
      key: 'education', title: 'Education', hint: `${EDUCATION.length} degrees`,
      body: (
        <ul className="ab-rows">
          {EDUCATION.map(e => <li key={e.title}><b>{e.title}</b><time>{e.time}</time><span>{e.place}</span></li>)}
        </ul>
      ),
    },
    {
      key: 'certs', title: 'Certificates & training', hint: `${CERTIFICATIONS.length + TRAINING.length} items`,
      body: (
        <ul className="ab-rows">
          {[...CERTIFICATIONS, ...TRAINING].map(c => <li key={c.title}><b>{c.title}</b><time>{c.detail}</time></li>)}
        </ul>
      ),
    },
    {
      key: 'affiliations', title: 'Affiliations', hint: `${AFFILIATIONS.length} memberships`,
      body: (
        <>
          <ul className="ab-rows">
            {AFFILIATIONS.map(a => <li key={a}><b>{a}</b></li>)}
          </ul>
          <a className="ab-link" href={`https://www.scopus.com/authid/detail.uri?authorId=${SCOPUS_AUTHOR_ID}`} target="_blank" rel="noopener noreferrer">
            Scopus Author ID {SCOPUS_AUTHOR_ID} <span aria-hidden="true">↗</span>
          </a>
        </>
      ),
    },
    {
      key: 'research', title: 'Research projects', hint: `${RESEARCH_PROJECTS.length} projects`,
      body: (
        <ul className="ab-rows">
          {RESEARCH_PROJECTS.map(p => <li key={p.title}><b>{p.title}</b><span>{p.detail}</span></li>)}
        </ul>
      ),
    },
    {
      key: 'books', title: 'Books & anthologies', hint: `${BOOKS.length} titles`,
      body: (
        <div className="ab-grid">
          {BOOKS.map(book => (
            <article key={book.title}>
              <h3>{book.href ? <a href={book.href} target="_blank" rel="noopener noreferrer">{book.title}</a> : book.title}</h3>
              <p>{book.detail}</p>
            </article>
          ))}
        </div>
      ),
    },
    {
      key: 'conferences', title: 'Conferences & seminars', hint: `${CONFERENCES.length} events`,
      body: (
        <ul className="ab-rows">
          {CONFERENCES.map(c => <li key={c.title}><b>{c.title}</b><time>{c.year}</time><span>{c.detail}</span></li>)}
        </ul>
      ),
    },
    {
      key: 'writing', title: 'Creative writing', hint: `${CREATIVE_WRITING.length} works`,
      body: (
        <ul className="ab-rows">
          {CREATIVE_WRITING.map(w => <li key={w.title}><b>{w.title}</b><time>{w.detail}</time></li>)}
        </ul>
      ),
    },
    {
      key: 'skills', title: 'Skills', hint: `${SKILLS.length} areas`,
      body: (
        <div className="ab-grid ab-grid--skills">
          {SKILLS.map(s => (
            <div key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.items.join(', ')}</p>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <section className="about-page">
      <div className="wrap">
        <SectionHead watermark="Profile" title={<>About <em>me</em></>} />

        <div className="ab-split">
          <aside className="ab-side">
            <div className="ab-intro">
              <Split as="p" className="ab-lead">Dedicated to creating, implementing and assessing instruction that meets student needs.</Split>
              <Reveal as="p" className="ab-text">I have led curriculum development, student mentoring and classroom management. My scholarly work covers autism, gender and identity.</Reveal>
              <Reveal className="ab-facts">
                <p><span>Languages</span>{LANGUAGES.join(' · ')}</p>
                <p><span>Interests</span>{INTERESTS.join(' · ')}</p>
              </Reveal>
            </div>
          </aside>

          <Reveal className="ab-map">
            {topics.map((t, i) => (
              <Topic key={t.key} n={String(i + 1).padStart(2, '0')} title={t.title} hint={t.hint} open={!!open[t.key]} onToggle={() => toggle(t.key)}>
                {t.body}
              </Topic>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
