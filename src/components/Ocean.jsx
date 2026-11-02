import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

/**
 * The water around the whole site, on one fixed layer. Everything here is
 * driven by DEPTH — a number from 0 (the surface, at the top of the page)
 * to 4 (the abyss, at the bottom) — so it changes smoothly as you scroll:
 *
 *   light rays    fade in under the surface, gone by the mid water
 *   particles     a few slow motes once you are under
 *   deep fog      darkens the edges of the screen in the deep water
 *   glow          sparse bioluminescent specks that only live in the deep
 *
 * Depth is read from where the main sections sit on the page. The coloured
 * water itself is drawn by the <Zone> wrappers in Home.jsx.
 */

const STOPS = [['about', 1], ['skills', 2], ['projects', 3], ['contact', 4]]

const RAYS = [[36, 6, -14, 0], [45, 9, -6, 1.6], [53, 5, 5, 0.8], [61, 10, 13, 2.4], [28, 4, -22, 3.1]]
const MOTES = [[8, 7, 21, 0], [22, 5, 26, 6], [37, 6, 19, 10], [58, 4, 28, 3], [73, 6, 23, 8], [91, 5, 25, 12]]
const GLOW = [[9, 24, 8, 0, '#8fe3ff'], [26, 66, 10, 3, '#a39cd9'], [48, 38, 7, 5, '#8fe3ff'], [71, 76, 9, 1, '#dcefa8'], [88, 30, 8, 4, '#8fe3ff']]

export function useDepth(mode = 'home') {
  const depth = useMotionValue(mode === 'home' ? 0 : 3.2)
  useEffect(() => {
    if (mode !== 'home') { depth.set(3.2); return }
    let raf = 0
    const calc = () => {
      raf = 0
      const vh = window.innerHeight
      const y = window.scrollY + vh * 0.45
      const stops = [[0, 0]]
      for (const [id, d] of STOPS) {
        const el = document.getElementById(id)
        if (el) stops.push([el.getBoundingClientRect().top + window.scrollY, d])
      }
      let v = stops[stops.length - 1][1]
      for (let i = 1; i < stops.length; i++) {
        const [y0, d0] = stops[i - 1]
        const [y1, d1] = stops[i]
        if (y <= y1) { v = y1 === y0 ? d1 : d0 + ((y - y0) / (y1 - y0)) * (d1 - d0); break }
      }
      depth.set(Math.max(0, Math.min(4, v)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc) }
    calc()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const t = setInterval(calc, 1500)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); clearInterval(t); cancelAnimationFrame(raf) }
  }, [mode, depth])
  return depth
}

export default function Ocean({ mode = 'home' }) {
  const reduce = useReducedMotion()
  const depth = useDepth(mode)
  const rays = useTransform(depth, [0.35, 0.9, 1.4, 2.1], [0, 0.7, 0.55, 0])
  const motes = useTransform(depth, [0.6, 1], [0, 1])
  const fog = useTransform(depth, [2.0, 3.4], [0, 0.6])
  const glow = useTransform(depth, [2.7, 3.4], [0, 1])
  const anim = reduce ? 'none' : undefined

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div style={{ opacity: rays }} className="absolute inset-0">
        {RAYS.map(([left, w, skew, delay], i) => (
          <span key={i} className="ray" style={{ left: `${left}%`, width: `${w}vw`, transform: `skewX(${skew}deg)`, '--delay': `${delay}s`, animation: anim }} />
        ))}
      </motion.div>

      <motion.div style={{ opacity: motes }} className="absolute inset-0">
        {MOTES.map(([left, size, dur, delay], i) => (
          <span key={i} className={`mote ${i % 2 ? 'hidden sm:block' : ''}`} style={{ left: `${left}%`, width: size, height: size, '--d': `${dur}s`, '--delay': `-${delay}s`, animation: anim, opacity: reduce ? 0.3 : undefined }} />
        ))}
      </motion.div>

      <motion.div style={{ opacity: fog, background: 'radial-gradient(ellipse at 50% 45%, rgba(2,5,16,0) 38%, rgba(2,5,16,0.92) 100%)' }} className="absolute inset-0" />
      <motion.div style={{ opacity: glow }} className="absolute inset-0">
        {GLOW.map(([x, y, d, delay, c], i) => (
          <span key={i} className={`glowmote ${i % 2 ? 'hidden sm:block' : ''}`} style={{ left: `${x}%`, top: `${y}%`, '--d': `${d}s`, '--delay': `-${delay}s`, background: c, boxShadow: `0 0 6px 1px ${c}`, animation: anim }} />
        ))}
      </motion.div>
    </div>
  )
}
