import styles from './GitHubGraph.module.css'

/**
 * Embeds a GitHub contribution graph using ghchart.rshah.org
 * with a warm amber color to match the site's accent.
 * The amber hex D4873A maps roughly to hsl(34, 70%, 54%).
 */
export default function GitHubGraph({ username }) {
  // Using amber color on ghchart.rshah.org
  const src = `https://ghchart.rshah.org/D4873A/${username}`

  return (
    <div className={styles.wrapper}>
      <img
        src={src}
        alt={`${username}'s GitHub contribution graph`}
        className={styles.graph}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.closest('.' + styles.wrapper).style.display = 'none'
        }}
      />
    </div>
  )
}
