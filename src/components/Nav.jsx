import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PROFILE } from '../content/profile.js'
import { SECTIONS } from '../content/sections.js'

/**
 * Sticky top navigation. On the homepage it highlights the section that is
 * currently on screen. On a project page it shows a "Back" link instead.
 */
export default function Nav({ mode = 'home' }) {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track which section is in view (homepage only).
  useEffect(() => {
    if (mode !== 'home') return
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
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
  }, [mode])

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
      <div
        className={`transition-all duration-500 ${scrolled || menu ? 'border-b border-line bg-ink/75 backdrop-blur-xl' : 'bg-transparent'}`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <a href="#" onClick={goTop} className="group flex items-center gap-3">
            <Mark />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold tracking-tight">{PROFILE.name}</span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{PROFILE.title}</span>
            </span>
          </a>

          {mode === 'home' ? (
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => go(e, s.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition ${active === s.id ? 'text-text' : 'text-muted hover:text-text'}`}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-line bg-white/5"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{s.nav}</span>
                </a>
              ))}
            </nav>
          ) : (
            <a href="#" onClick={goTop} className="hidden items-center gap-2 text-sm text-muted transition hover:text-text lg:flex">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
              Back to all work
            </a>
          )}

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => go(e, 'contact')}
              className="hidden rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent transition hover:bg-accent/20 sm:inline-flex"
            >
              Contact
            </a>
            <button
              type="button"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-text lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 top-0 h-px w-4 bg-current transition ${menu ? 'translate-y-1.5 rotate-45' : ''}`} />
                <span className={`absolute left-0 top-1.5 h-px w-4 bg-current transition ${menu ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 top-3 h-px w-4 bg-current transition ${menu ? '-translate-y-1.5 -rotate-45' : ''}`} />
              </span>
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
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="container-x grid gap-1 pb-5 pt-2">
                {mode !== 'home' && (
                  <a href="#" onClick={goTop} className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-white/5 hover:text-text">← Back to all work</a>
                )}
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => go(e, s.id)}
                    className={`rounded-lg px-3 py-2.5 text-base transition hover:bg-white/5 ${active === s.id ? 'text-text' : 'text-muted hover:text-text'}`}
                  >
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

function Mark() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-ink-2 shadow-[var(--shadow-card)] transition group-hover:border-accent/40">
      <svg width="20" height="20" viewBox="0 0 64 64" fill="none" aria-hidden>
        <defs>
          <linearGradient id="markg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7cc4ff" />
            <stop offset="1" stopColor="#c6a3ff" />
          </linearGradient>
        </defs>
        <path d="M32 8 L54 20.5 L54 43.5 L32 56 L10 43.5 L10 20.5 Z" stroke="url(#markg)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M32 8 L32 32 L54 20.5 M32 32 L10 20.5 M32 32 L32 56" stroke="url(#markg)" strokeWidth="2.5" opacity="0.75" />
      </svg>
    </span>
  )
}
