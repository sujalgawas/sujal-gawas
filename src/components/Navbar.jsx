import { NavLink, Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { to: '/about',        label: 'About' },
  { to: '/experience',   label: 'Experience' },
  { to: '/projects',     label: 'Projects' },
  { to: '/competitions', label: 'Competitions' },
  { to: '/open-source',  label: 'Open Source' },
  { to: '/blog',         label: 'Blog' },
]

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link to="/" className={styles.logo} aria-label="Home">
          SG
        </Link>
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
