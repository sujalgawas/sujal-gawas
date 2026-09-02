import SocialLinks from '../components/SocialLinks'
import GitHubGraph from '../components/GitHubGraph'
import useFadeIn from '../hooks/useFadeIn'
import styles from './Home.module.css'

export default function Home() {
  useFadeIn()

  return (
    <div className={`container ${styles.page}`}>
      {/* Hero */}
      <section className={styles.hero} aria-label="Introduction">
        <p className={styles.eyebrow}>Based in Mumbai, India</p>
        <h1 className={styles.name}>Sujal Gawas</h1>
        <p className={styles.tagline}>
          AI/ML enthusiast building LLM applications,<br className={styles.br} />
          agentic systems, and backend infrastructure — all hosted from my homelab.
        </p>
        <SocialLinks size={17} className={styles.socials} />
      </section>

      {/* GitHub Contribution Graph */}
      <section className={`${styles.graphSection} fade-in`} aria-label="GitHub activity">
        <p className={styles.graphLabel}>GitHub contributions</p>
        <GitHubGraph username="sujalgawas" />
      </section>
    </div>
  )
}
