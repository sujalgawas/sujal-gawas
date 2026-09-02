import { Link } from 'react-router-dom'
import styles from './Blog.module.css'

/**
 * Blog post list page.
 *
 * To add a post: create a .md file in src/posts/ with frontmatter:
 *
 * ---
 * title: "Your Post Title"
 * date: "2026-01-15"
 * description: "One-sentence summary shown in the list."
 * ---
 *
 * The filename (without .md) becomes the URL slug: /blog/your-post-title
 */

// Vite's import.meta.glob — picks up all .md files at build time
const postModules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { title: 'Untitled', date: '', description: '' }
  const block = match[1]
  const get = (key) => {
    const m = block.match(new RegExp(`^${key}:\\s*"?(.+?)"?\\s*$`, 'm'))
    return m ? m[1] : ''
  }
  return { title: get('title'), date: get('date'), description: get('description') }
}

function getPosts() {
  return Object.entries(postModules)
    .map(([path, raw]) => {
      const slug = path.replace('../posts/', '').replace('.md', '')
      const meta = parseFrontmatter(raw)
      return { slug, ...meta }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export default function BlogList() {
  const posts = getPosts()

  return (
    <div className="container">
      <section className="section">
        <p className="section-label">Writing</p>
        <h1 className="section-heading">Blog</h1>

        {posts.length === 0 ? (
          <div className={styles.empty}>
            <p>Nothing here yet — I'll be adding posts soon.</p>
            <p className={styles.hint}>
              Posts will appear here as <code>.md</code> files are added to{' '}
              <code>src/posts/</code>.
            </p>
          </div>
        ) : (
          <ul className={styles.list} role="list">
            {posts.map((post) => (
              <li key={post.slug} className={styles.item}>
                <Link to={`/blog/${post.slug}`} className={styles.postLink}>
                  <div className={styles.postMeta}>
                    {post.date && (
                      <time dateTime={post.date} className={styles.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </time>
                    )}
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  {post.description && (
                    <p className={styles.postDesc}>{post.description}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
