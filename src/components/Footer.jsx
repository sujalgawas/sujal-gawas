import SocialLinks from './SocialLinks'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={`container-lg ${styles.inner}`}>
        <SocialLinks size={16} className={styles.socials} />
        <p className={styles.copy}>
          © {year} Sujal Gawas
        </p>
      </div>
    </footer>
  )
}
