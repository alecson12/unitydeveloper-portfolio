import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PROFILE } from '../content/profile.js'
import { SECTIONS } from '../content/sections.js'

/**
 * Fixed top navigation: name on the left, the four sections in the middle,
 * the contact call-to-action on the right. The section on screen is
 * underlined. On a project page the links give way to a "Back" link.
 */
export default function Nav({ mode = 'home' }) {
  const [active, setActive] = useState('start')
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const sections = SECTIONS.filter((s) => s.nav)
  const links = sections.filter((s) => s.id !== 'contact')

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
    if (mode !== 'home') { window.location.hash = `#${id}`; return }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', `#${id}`)
    }
  }

  const goTop = (e) => {
    e.preventDefault()
    setMenu(false)
    if (mode !== 'home') { window.location.hash = ''; return }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.replaceState(null, '', window.location.pathname)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-colors duration-300 ${scrolled || menu ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <a href="#" onClick={goTop} className="font-mono text-[12px] tracking-[0.22em] uppercase transition hover:text-accent" aria-label="Home">
            {PROFILE.shortName ?? PROFILE.name}
          </a>

          {mode === 'home' ? (
            <nav className="hidden items-center gap-8 lg:flex" aria-label="Sections">
              {links.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => go(e, s.id)}
                  className={`relative py-2 font-mono text-[12px] tracking-[0.12em] uppercase transition ${active === s.id ? 'text-ink' : 'text-dim hover:text-ink'}`}
                >
                  <span className="text-accent/80">/</span>{s.nav}
                  {active === s.id && (
                    <motion.span layoutId="nav-bar" className="absolute inset-x-0 -bottom-0.5 h-px bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                </a>
              ))}
            </nav>
          ) : (
            <a href="#" onClick={goTop} className="hidden font-mono text-[12px] tracking-[0.12em] text-dim uppercase transition hover:text-ink lg:block">
              ← Back
            </a>
          )}

          <div className="flex items-center gap-3">
            <a href="#contact" onClick={(e) => go(e, 'contact')} className="btn btn-primary btn-sm hidden sm:inline-flex">
              {PROFILE.contact.cta ?? 'Contact'} →
            </a>
            <button
              type="button"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className="btn btn-ghost btn-sm lg:hidden"
            >
              {menu ? 'Close' : 'Menu'}
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
              <div className="container-x grid grid-cols-1 pb-6 pt-2">
                {mode !== 'home' && (
                  <a href="#" onClick={goTop} className="border-t border-line py-4 font-mono text-[12px] tracking-[0.12em] text-dim uppercase">← Back</a>
                )}
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => go(e, s.id)}
                    className={`flex items-center justify-between border-t border-line py-4 font-display text-2xl font-semibold tracking-tight ${active === s.id ? 'text-ink' : 'text-ink-2'}`}
                  >
                    {s.nav}
                    <span className="font-mono text-[11px] tracking-[0.12em] text-dim">{s.index ?? ''}</span>
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
