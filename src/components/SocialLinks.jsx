import { Github, Code2, ChefHat, Brain, BarChart2, Mail } from 'lucide-react'
import styles from './SocialLinks.module.css'

const LINKS = [
  {
    href:  'https://github.com/sujalgawas',
    label: 'GitHub',
    Icon:  Github,
  },
  {
    href:  'https://leetcode.com/u/sujal10/',
    label: 'LeetCode',
    Icon:  Code2,
  },
  {
    href:  'https://www.codechef.com/users/sujalgawas',
    label: 'CodeChef',
    Icon:  ChefHat,
  },
  {
    href:  'https://huggingface.co/sujalgawas',
    label: 'Hugging Face',
    Icon:  Brain,
  },
  {
    href:  'https://www.kaggle.com/sujalgawas',
    label: 'Kaggle',
    Icon:  BarChart2,
  },
  {
    href:  'mailto:sujalgawas18@gmail.com',
    label: 'Email',
    Icon:  Mail,
  },
]

export default function SocialLinks({ size = 15, showLabels = false, className = '' }) {
  return (
    <ul className={`${styles.list} ${className}`} role="list">
      {LINKS.map(({ href, label, Icon }) => (
        <li key={href}>
          <a
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            className={styles.link}
          >
            <Icon size={size} strokeWidth={1.5} />
            {showLabels && <span className={styles.label}>{label}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
