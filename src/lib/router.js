/**
 * Tiny hash router.
 *   #/project/<id>   → project case-study page
 *   anything else    → homepage (plain #section hashes scroll the homepage)
 */
import { useEffect, useState } from 'react'

const parse = (hash) => {
  const m = /^#\/project\/([a-z0-9-]+)/i.exec(hash || '')
  if (m) return { name: 'project', id: m[1] }
  return { name: 'home' }
}

export function useRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export const projectHref = (id) => `#/project/${id}`

export const goHome = (sectionId) => {
  window.location.hash = sectionId ? `#${sectionId}` : ''
}
