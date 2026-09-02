import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { marked } from 'marked'
import { ArrowLeft } from 'lucide-react'
import styles from './Blog.module.css'

const postModules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)/)
  if (!match) return { meta: { title: 'Untitled', date: '' }, content: raw }
  const block = match[1]
  const content = match[2] ?? ''
  const get = (key) => {
    const m = block.match(new RegExp(`^${key}:\\s*"?(.+?)"?\\s*$`, 'm'))
    return m ? m[1] : ''
  }
  return {
    meta: { title: get('title'), date: get('date'), description: get('description') },
    content,
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const key = `../posts/${slug}.md`
    const raw = postModules[key]
    if (!raw) {
      setNotFound(true)
      return
    }
    const { meta, content } = parseFrontmatter(raw)
    const html = marked.parse(content)
    setPost({ meta, html })
  }, [slug])

  if (notFound) {
    return (
      <div className="container">
        <section className="section">
          <p className={styles.notFound}>Post not found.</p>
          <Link to="/blog" className={styles.back}>
            <ArrowLeft size={14} strokeWidth={1.5} /> Back to blog
          </Link>
        </section>
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="container">
      <article className={`section ${styles.post}`}>
        <Link to="/blog" className={styles.back}>
          <ArrowLeft size={14} strokeWidth={1.5} /> Back
        </Link>

        <header className={styles.postHeader}>
          {post.meta.date && (
            <time dateTime={post.meta.date} className={styles.date}>
              {new Date(post.meta.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
          )}
          <h1 className={styles.postHeading}>{post.meta.title}</h1>
        </header>

        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </div>
  )
}
