import { useState, useEffect } from 'react'
import { ExternalLink, GitMerge, GitPullRequest, GitPullRequestClosed, Clock } from 'lucide-react'
import useFadeIn from '../hooks/useFadeIn'
import styles from './OpenSource.module.css'

// ── Baseline — shown while loading or on hard API failure ──
const STATIC_FALLBACK = [
  {
    repo:     'mesa/mesa-llm',
    repoUrl:  'https://github.com/mesa/mesa-llm',
    title:    'sugarscrap_g1mt — agent behavior improvement',
    prUrl:    'https://github.com/mesa/mesa-llm/pull/35',
    status:   'merged',
    date:     null,
  },
  {
    repo:     'immich-app/immich',
    repoUrl:  'https://github.com/immich-app/immich',
    title:    'Contributions to Immich',
    prUrl:    'https://github.com/immich-app/immich/pulls',
    status:   'merged',
    date:     null,
  },
]

/**
 * Derive a canonical status from the GitHub Search API item.
 * The search API returns an `pull_request` sub-object with `merged_at`.
 */
function getStatus(item) {
  const pr = item.pull_request ?? {}
  if (item.draft)                        return 'draft'
  if (pr.merged_at)                      return 'merged'
  if (item.state === 'open')             return 'open'
  return 'closed'  // state=closed, merged_at=null → rejected/not merged
}

function transformItem(item) {
  const repo = item.repository_url?.replace('https://api.github.com/repos/', '') ?? ''
  return {
    repo,
    repoUrl: `https://github.com/${repo}`,
    title:   item.title,
    prUrl:   item.html_url,
    status:  getStatus(item),
    date:    item.created_at ?? null,
  }
}

const STATUS_META = {
  merged: {
    label: 'Merged',
    Icon:  GitMerge,
    cls:   'merged',
  },
  open: {
    label: 'Open',
    Icon:  GitPullRequest,
    cls:   'open',
  },
  draft: {
    label: 'Draft',
    Icon:  Clock,
    cls:   'draft',
  },
  closed: {
    label: 'Closed',
    Icon:  GitPullRequestClosed,
    cls:   'closed',
  },
}

function formatDate(iso) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

export default function OpenSource() {
  const [items,   setItems]   = useState(STATIC_FALLBACK)
  const [state,   setState]   = useState('loading')  // loading | live | fallback | error
  const [counts,  setCounts]  = useState(null)

  useFadeIn()

  useEffect(() => {
    const controller = new AbortController()

    // Fetch ALL PRs by this user in external repos (no is:merged filter)
    const url =
      'https://api.github.com/search/issues' +
      '?q=author:sujalgawas+type:pr+-user:sujalgawas' +
      '&per_page=30&sort=created&order=desc'

    fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
      signal:  controller.signal,
    })
      .then((r) => {
        if (r.status === 403) throw new Error('rate-limited')
        if (!r.ok)            throw new Error(`github-${r.status}`)
        return r.json()
      })
      .then((data) => {
        const prs = (data.items ?? [])
          .map(transformItem)
          .filter((p) => p.repo && p.title)

        if (prs.length === 0) {
          // API responded but no results — keep fallback
          setState('fallback')
          return
        }

        // Tally by status for the summary bar
        const tally = { merged: 0, open: 0, draft: 0, closed: 0 }
        prs.forEach((p) => { tally[p.status] = (tally[p.status] ?? 0) + 1 })

        setItems(prs)
        setCounts(tally)
        setState('live')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState(err.message === 'rate-limited' ? 'rate-limited' : 'fallback')
      })

    return () => controller.abort()
  }, [])

  const isLoading  = state === 'loading'
  const isFallback = state === 'fallback' || state === 'rate-limited' || state === 'error'

  return (
    <div className="container">
      <section className="section">
        <p className="section-label">Community</p>
        <h1 className="section-heading">Open source</h1>

        {/* Status bar */}
        <div className={styles.statusBar}>
          {isLoading && (
            <span className={styles.pill}>
              <span className={styles.pulse} aria-hidden="true" />
              Fetching from GitHub…
            </span>
          )}

          {state === 'live' && counts && (
            <div className={styles.pillRow}>
              {counts.merged > 0 && (
                <span className={`${styles.pill} ${styles.pillMerged}`}>
                  <GitMerge size={12} strokeWidth={2} />
                  {counts.merged} merged
                </span>
              )}
              {counts.open > 0 && (
                <span className={`${styles.pill} ${styles.pillOpen}`}>
                  <GitPullRequest size={12} strokeWidth={2} />
                  {counts.open} open
                </span>
              )}
              {counts.draft > 0 && (
                <span className={`${styles.pill} ${styles.pillDraft}`}>
                  <Clock size={12} strokeWidth={2} />
                  {counts.draft} draft
                </span>
              )}
              {counts.closed > 0 && (
                <span className={`${styles.pill} ${styles.pillClosed}`}>
                  <GitPullRequestClosed size={12} strokeWidth={2} />
                  {counts.closed} closed
                </span>
              )}
            </div>
          )}

          {state === 'rate-limited' && (
            <span className={styles.pill}>
              GitHub API rate-limited — showing known contributions
            </span>
          )}

          {isFallback && state !== 'rate-limited' && (
            <span className={styles.pill}>
              Showing known contributions
            </span>
          )}
        </div>

        {/* PR list */}
        <ul className={styles.list} role="list">
          {items.map((item, i) => {
            const meta = STATUS_META[item.status] ?? STATUS_META.closed
            const { Icon } = meta
            return (
              <li key={i} className={styles.item}>
                <div className={styles.itemLeft}>
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.repo}
                  >
                    {item.repo}
                  </a>
                  <a
                    href={item.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.prLink}
                  >
                    {item.title}
                    <ExternalLink size={11} strokeWidth={1.5} className={styles.extIcon} />
                  </a>
                </div>

                <div className={styles.itemRight}>
                  {item.date && (
                    <span className={styles.date}>{formatDate(item.date)}</span>
                  )}
                  <span className={`${styles.badge} ${styles[`badge_${item.status}`]}`}>
                    <Icon size={11} strokeWidth={2} />
                    {meta.label}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
