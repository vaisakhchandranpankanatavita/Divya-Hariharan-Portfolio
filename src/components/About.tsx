import { AFFILIATIONS, BOOKS, CERTIFICATIONS, EDUCATION, RESEARCH_PROJECTS, SCOPUS_AUTHOR_ID, SKILLS } from '../data'
import SectionHead from './SectionHead'
import Split from './Split'
import Reveal from './Reveal'

const RESUME = `${import.meta.env.BASE_URL}resume.pdf`

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <SectionHead title={<>About <em>me</em></>} />
        <div className="about2">
          <div>
            <Split as="p" className="big">Dedicated to creating, implementing and assessing instruction that meets student needs.</Split>
            <Reveal as="p" className="t">I have led curriculum development, student mentoring and classroom management, and my scholarly work covers autism, gender and identity.</Reveal>
            <Reveal className="langs">
              <span className="lang-label">Languages</span>
              <div className="lang-list">
                {['English', 'Malayalam', 'Hindi', 'Tamil'].map(language => <span key={language}>{language}</span>)}
              </div>
            </Reveal>
            <Reveal className="about-actions">
              <a className="about-resume-link" href={RESUME} download="Divya-Hariharan-Resume.pdf">Download resume <span aria-hidden="true">↓</span></a>
            </Reveal>
          </div>
          <div data-speed=".06">
            <Reveal className="edu">
              <p className="eyebrow" style={{ marginBottom: 16 }}>Education</p>
              {EDUCATION.map(e => (
                <div key={e.title}><h4>{e.title}</h4><time>{e.time}</time><p>{e.place}</p></div>
              ))}
            </Reveal>
          </div>
        </div>
        <div className="about-extras">
          <Reveal as="section" className="about-detail">
            <p className="eyebrow">Certificates &amp; training</p>
            <ul className="about-detail-list">
              {CERTIFICATIONS.map(item => <li key={item.title}><span>{item.title}</span><small>{item.detail}</small></li>)}
            </ul>
          </Reveal>
          <Reveal as="section" className="about-detail">
            <p className="eyebrow">Professional affiliations</p>
            <ul className="about-detail-list">
              {AFFILIATIONS.map(item => <li key={item}><span>{item}</span></li>)}
            </ul>
            <a className="scopus-link" href={`https://www.scopus.com/authid/detail.uri?authorId=${SCOPUS_AUTHOR_ID}`} target="_blank" rel="noopener noreferrer">
              Scopus Author ID <span>{SCOPUS_AUTHOR_ID}</span><i aria-hidden="true">↗</i>
            </a>
          </Reveal>
          <Reveal as="section" className="about-detail about-research">
            <p className="eyebrow">Research projects</p>
            <div className="research-projects">
              {RESEARCH_PROJECTS.map(project => <article key={project.title}><h3>{project.title}</h3><p>{project.detail}</p></article>)}
            </div>
          </Reveal>
        </div>
        <div className="books-wrap">
          <Reveal as="p" className="eyebrow">Books &amp; anthologies</Reveal>
          <div className="books-list">
            {BOOKS.map(book => (
              <article className="book-item" key={book.title}>
                <h3>{book.href ? <a href={book.href} target="_blank" rel="noopener noreferrer">{book.title}<span aria-hidden="true"> ↗</span></a> : book.title}</h3>
                <p>{book.detail}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="skills-wrap">
          <Reveal as="p" className="eyebrow">Skills &amp; competencies</Reveal>
          <Reveal className="skills">
            {SKILLS.map(s => (
              <div className="sk" key={s.title}>
                <div className="sk-head"><span className="n">{s.n}</span><h4>{s.title}</h4></div>
                <ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
