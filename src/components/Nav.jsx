import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PROFILE } from '../content/profile.js'
import { SECTIONS } from '../content/sections.js'
import { otherProjects } from '../lib/content.js'

/**
 * Sticky top navigation. On the homepage it highlights the section that is
 * currently on screen. On a project page it shows a "Back" link instead.
 */
export default function Nav({ mode = 'home' }) {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const sections = SECTIONS.filter((s) => s.id !== 'projects' || otherProjects().length > 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mode !== 'home') return
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [mode, sections])

  useEffect(() => {
    if (!menu) return
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])

  const go = (e, id) => {
    e.preventDefault()
    setMenu(false)
    if (mode !== 'home') {
      window.location.hash = `#${id}`
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    }
  }

  const goTop = (e) => {
    e.preventDefault()
    setMenu(false)
    if (mode !== 'home') {
      window.location.hash = ''
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.replaceState(null, '', window.location.pathname)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-colors duration-300 ${scrolled || menu ? 'border-b-2 border-white/10 bg-ink/85 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <a href="#" onClick={goTop} className="group flex items-center gap-3">
            <Mark />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold tracking-tight">{PROFILE.name}</span>
              <span className="font-pixel text-[8px] tracking-[0.18em] text-muted uppercase">{PROFILE.title}</span>
            </span>
          </a>

          {mode === 'home' ? (
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Sections">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => go(e, s.id)}
                  className={`relative py-2 font-pixel text-[10px] tracking-[0.16em] uppercase transition ${active === s.id ? 'text-text' : 'text-muted hover:text-text'}`}
                >
                  {s.nav}
                  {active === s.id && (
                    <motion.span layoutId="nav-bar" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                </a>
              ))}
            </nav>
          ) : (
            <a href="#" onClick={goTop} className="hidden items-center gap-2 font-pixel text-[10px] tracking-[0.16em] text-muted uppercase transition hover:text-text lg:flex">
              ◀ Back
            </a>
          )}

          <div className="flex items-center gap-3">
            <a href="#contact" onClick={(e) => go(e, 'contact')} className="px-btn px-btn-primary hidden !px-4 !py-2 sm:inline-flex">
              Contact
            </a>
            <button
              type="button"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className="px-btn px-btn-ghost !p-3 lg:hidden"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" shapeRendering="crispEdges" aria-hidden>
                {menu ? (
                  <path d="M1 1h2v2H1zM3 3h2v2H3zM5 5h4v4H5zM3 9h2v2H3zM1 11h2v2H1zM11 1h2v2h-2zM9 3h2v2H9zM9 9h2v2H9zM11 11h2v2h-2z" />
                ) : (
                  <path d="M0 2h14v2H0zM0 6h14v2H0zM0 10h14v2H0z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.nav
              key="mobile"
              aria-label="Sections"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="container-x grid gap-1 pb-6 pt-2">
                {mode !== 'home' && (
                  <a href="#" onClick={goTop} className="px-3 py-3 font-pixel text-[11px] tracking-[0.16em] text-muted uppercase hover:text-text">◀ Back</a>
                )}
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => go(e, s.id)}
                    className={`flex items-center gap-3 px-3 py-3 font-pixel text-[11px] tracking-[0.16em] uppercase transition ${active === s.id ? 'text-accent' : 'text-muted hover:text-text'}`}
                  >
                    <span className={`h-2 w-2 ${active === s.id ? 'bg-accent' : 'bg-white/15'}`} />
                    {s.nav}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

/** Pixel logo mark: a small isometric cube. */
function Mark() {
  return (
    <span className="px-border grid h-10 w-10 place-items-center bg-ink-2 transition group-hover:bg-ink-3">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" shapeRendering="crispEdges" aria-hidden>
        <path d="M8 2h4v2h2v2h2v2h2v4h-2v2h-2v2h-2v2H8v-2H6v-2H4v-2H2V8h2V6h2V4h2z" fill="#ffd166" fillOpacity="0.15" />
        <path d="M8 2h4v2h2v2h2v2H4V6h2V4h2z" fill="#ffd166" />
        <path d="M4 8h6v10H8v-2H6v-2H4v-2H2V8z" fill="#7ee8fa" fillOpacity="0.8" />
        <path d="M10 8h6v4h-2v2h-2v2h-2z" fill="#eef0ff" fillOpacity="0.85" />
      </svg>
    </span>
  )
}
