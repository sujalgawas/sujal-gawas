import useFadeIn from '../hooks/useFadeIn'
import styles from './About.module.css'

export default function About() {
  useFadeIn()

  return (
    <div className="container">
      <article className={`section ${styles.about}`}>
        <p className="section-label">About</p>
        <h1 className="section-heading">Background</h1>

        <div className={`${styles.body} fade-in`}>
          <p>
            I'm an MCA student at Thakur Institute of Management Studies, Career Development &
            Research, Mumbai, with a BCA from Athrava Institute of Information Technology behind me.
            Most of my time goes into building things at the intersection of large language models and
            systems engineering — Transformer architectures from first principles, LangChain/LangGraph
            orchestration pipelines, FastAPI backends that wire it all together.
          </p>

          <p>
            Earlier this year I did a remote AI and Software Engineer internship at Alesa AI Ltd (UK),
            where I worked on a microservices system — two Spring Boot services for core backend logic
            and a FastAPI service for AI processing. I built the document pipeline that combined OCR
            with LLM-based summarization, and handled the full-stack integration between a React
            frontend and the distributed backend. The goal was to make the AI layer modular enough
            that adding new generative AI features later wouldn't require restructuring the whole
            system.
          </p>

          <p>
            Outside of project work, I'm contributing to open source — mainly mesa-llm and Immich —
            mostly to get exposure to production codebases I didn't write. I find it's the fastest way
            to pick up the habits that don't show up in tutorials.
          </p>

          <p>
            I'm based in Mumbai. I'm currently looking for roles where I can keep working close to
            the model layer while shipping things that actually run.
          </p>
        </div>
      </article>
    </div>
  )
}
