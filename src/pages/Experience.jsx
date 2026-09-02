import { ExternalLink } from 'lucide-react'
import useFadeIn from '../hooks/useFadeIn'
import styles from './Experience.module.css'

const EXPERIENCE = [
  {
    company:   'Alesa AI Ltd',
    companyUrl: 'https://www.linkedin.com/company/alesaai',
    title:     'AI and Software Engineer Intern',
    location:  'UK — Remote',
    period:    'Sept 2025 – March 2026',
    bullets: [
      'Architected a microservices system: two Spring Boot services handling core backend logic, one FastAPI service for AI processing.',
      'Built an AI microservice that combined OCR text extraction with LLM-based summarization for document processing — structured the service so the model layer could be swapped or extended independently.',
      'Handled full-stack integration between the React frontend and the distributed backend, owning data flow and API communication across services.',
      'Designed the AI architecture to be modular so future generative AI features could be added without restructuring the core system.',
      'Improved frontend rendering performance and component responsiveness.',
    ],
  },
]

export default function Experience() {
  useFadeIn()

  return (
    <div className="container">
      <section className="section">
        <p className="section-label">Experience</p>
        <h1 className="section-heading">Work</h1>

        <div className={styles.list}>
          {EXPERIENCE.map((job) => (
            <article key={job.company} className={`${styles.card} fade-in`}>
              <div className={styles.header}>
                <div>
                  <h2 className={styles.title}>{job.title}</h2>
                  <div className={styles.meta}>
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.company}
                    >
                      {job.company}
                      <ExternalLink size={12} strokeWidth={1.5} className={styles.extIcon} />
                    </a>
                    <span className="text-dim">·</span>
                    <span className={styles.location}>{job.location}</span>
                  </div>
                </div>
                <span className={styles.period}>{job.period}</span>
              </div>

              <ul className={styles.bullets} role="list">
                {job.bullets.map((b, i) => (
                  <li key={i} className={styles.bullet}>
                    <span className={styles.dash} aria-hidden="true">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
