import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to all elements with class "fade-in"
 * and adds the "visible" class when they enter the viewport.
 */
export default function useFadeIn() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in')
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
