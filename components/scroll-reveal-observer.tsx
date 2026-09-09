'use client'

import { useEffect } from 'react'

// Watches the DOM for `.reveal-up` elements and reveals them as they enter the viewport.
export function ScrollRevealObserver() {
  useEffect(() => {
    // Reveal everything in view or near view with a forgiving threshold
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.01, rootMargin: '120px 0px 50px 0px' }
    )

    const observeAll = () => {
      document.querySelectorAll('.reveal-up:not(.in-view)').forEach((el) => observer.observe(el))
    }

    observeAll()

    // Safety fallback: after 1.2s, reveal any element that might still be unrevealed
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal-up:not(.in-view)').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight + 200) {
          el.classList.add('in-view')
        }
      })
    }, 1200)

    // Re-scan when client-side navigation or state changes add new cards to the DOM.
    const mutationObserver = new MutationObserver(observeAll)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}

