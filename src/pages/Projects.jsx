import { ExternalLink, Github } from 'lucide-react'
import useFadeIn from '../hooks/useFadeIn'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    name: 'DevLegacy',
    github: 'https://github.com/sujalgawas/DevLegacy',
    live:   'https://dev-legacy-lac.vercel.app',
    image:  '/projects/devlegacy.png',
    imageAlt: 'DevLegacy — Decode Your Developer DNA landing page',
    description:
      'A developer analytics platform that scores a GitHub profile across commit consistency, code quality (via a fine-tuned Qwen model), documentation habits, and repo structure — then recommends the best-fit engineering role based on detected stack and contribution patterns.',
    tech: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'React', 'Vite', 'React Three Fiber', 'Docker'],
  },
  {
    name: 'JEE Question Generator',
    github: 'https://github.com/sujalgawas/JEE_question_generator',
    live:   'https://sujalgawas.github.io/JEE_question_generator/',
    image:  '/projects/jee.png',
    imageAlt: 'JEE Genius — Dashboard overview and question practice tools',
    description:
      'An agentic pipeline (LangGraph + Flask backend, React/Vite frontend) that generates JEE-style practice questions for Physics, Chemistry, and Math. Uses hybrid RAG grounding generation in real past JEE papers and NCERT textbooks to keep questions accurate and syllabus-relevant. Tracks weak concepts per user to personalize future sessions.',
    tech: ['LangGraph', 'Flask', 'React', 'Vite', 'RAG', 'LLM'],
  },
  {
    name: 'Reclip',
    github: 'https://github.com/sujalgawas/Reclip',
    live:   null,
    image:  '/projects/reclip.jpg',
    imageAlt: 'Reclip pipeline — VOD to YouTube Shorts via LangGraph',
    description:
      'A LangGraph-orchestrated pipeline that turns a livestream VOD into ready-to-upload YouTube Shorts: transcribes audio (with native Hinglish support), uses an LLM to detect clip-worthy moments across multiple emotions, generates titles, cuts clips, and uploads via the YouTube Data API. Cascading LLM/STT fallback chains (Groq → local Ollama/faster-whisper) for resilience under rate limits.',
    tech: ['LangGraph', 'Groq', 'Ollama', 'Whisper', 'YouTube API', 'Python'],
  },
  {
    name: 'Book Recommendation & Review System',
    github: 'https://github.com/sujalgawas/book_recommendation_app',
    live:   null,
    image:  '/projects/book.png',
    imageAlt: 'Book Recommendation App — search results with book covers and ratings',
    description:
      'A full-stack book recommendation platform combining collaborative and content-based filtering (embeddings + FAISS similarity search) with a Gemini-powered chatbot that gives personalized suggestions using each user\'s activity. Also pulls and ranks relevant Reddit discussion threads per book.',
    tech: ['Flask', 'SQLAlchemy', 'FAISS', 'PostgreSQL', 'Gemini API'],
  },
  {
    name: 'Paper Implementations',
    github: 'https://github.com/sujalgawas/Implementing_research_paper',
    live:   null,
    image:  '/projects/papers.jpg',
    imageAlt: 'PyTorch MultiHeadAttention implementation — code snippet',
    description:
      'From-scratch implementations of foundational deep learning architectures: the original Transformer, BERT, GPT-1, GPT-2, and RoPE (Rotary Positional Embeddings). Built to understand the architectures at the implementation level, not just use pretrained versions.',
    tech: ['PyTorch', 'Transformer', 'BERT', 'GPT', 'RoPE'],
  },
]

export default function Projects() {
  useFadeIn()

  return (
    <div className="container-lg">
      <section className="section">
        <p className="section-label">Work</p>
        <h1 className="section-heading">Projects</h1>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <article key={project.name} className={`${styles.card} fade-in`}>
              {/* Preview image */}
              <div className={styles.imageWrap}>
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className={styles.image}
                  loading="lazy"
                />
                {/* Link overlay icons */}
                <div className={styles.imageOverlay}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} on GitHub`}
                    className={styles.overlayLink}
                  >
                    <Github size={16} strokeWidth={1.5} />
                    GitHub
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} live demo`}
                      className={styles.overlayLink}
                    >
                      <ExternalLink size={16} strokeWidth={1.5} />
                      Live
                    </a>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div className={styles.body}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.name}>{project.name}</h2>
                  <div className={styles.cardLinks}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} on GitHub`}
                      className={styles.iconLink}
                    >
                      <Github size={15} strokeWidth={1.5} />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} live demo`}
                        className={styles.iconLink}
                      >
                        <ExternalLink size={15} strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </div>

                <p className={styles.description}>{project.description}</p>

                <div className={styles.tags}>
                  {project.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
