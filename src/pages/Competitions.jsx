import { Github } from 'lucide-react'
import useFadeIn from '../hooks/useFadeIn'
import styles from './Competitions.module.css'

const COMPETITIONS = [
  {
    name:    'krushiMitr AI Agent',
    github:  'https://github.com/sujalgawas/krushiMitr-AI---Aiagent',
    context: 'Hackathon',
    note:    'An AI agent for agricultural advisory — crop recommendations, pest identification, and farming guidance for rural users.',
  },
  {
    name:    'CSIRO Image2Biomass Prediction',
    github:  'https://github.com/sujalgawas/csiro-biomass',
    context: 'Kaggle Competition',
    note:    'Regression-based biomass prediction from aerial imagery. Ranked 3,293 on the leaderboard.',
  },
  {
    name:    'Timetable Generation AI',
    github:  'https://github.com/sujalgawas/timeable_generation_AI_hackthon',
    context: 'Smart India Hackathon — Institute Round',
    note:    'An AI-driven timetable scheduler that handles constraint satisfaction across departments, rooms, and faculty availability.',
  },
]

export default function Competitions() {
  useFadeIn()

  return (
    <div className="container">
      <section className="section">
        <p className="section-label">Competitions</p>
        <h1 className="section-heading">Hackathons & contests</h1>

        <ul className={styles.list} role="list">
          {COMPETITIONS.map((c) => (
            <li key={c.name} className={`${styles.item} fade-in`}>
              <div className={styles.row}>
                <div className={styles.info}>
                  <span className={styles.tag}>{c.context}</span>
                  <h2 className={styles.name}>{c.name}</h2>
                  <p className={styles.note}>{c.note}</p>
                </div>
                <a
                  href={c.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.name} on GitHub`}
                  className={styles.ghLink}
                >
                  <Github size={16} strokeWidth={1.5} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
