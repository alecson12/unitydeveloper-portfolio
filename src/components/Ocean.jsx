import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'

/**
 * The water around the whole site, on one fixed layer. Everything here is
 * driven by DEPTH — a number from 0 (the surface, at the top of the page)
 * to 4 (the abyss, at the bottom) — so it changes smoothly as you scroll:
 *
 *   sun rays      fade in as you go under, gone by the mid water
 *   bubbles       appear once you are under the surface
 *   deep vignette darkens the edges of the screen in the deep water
 *   glow motes    bioluminescent specks that only live in the deep
 *
 * Depth is read from where the main sections sit on the page, so it stays
 * right however long each section is. The coloured water itself is drawn by
 * the <Zone> wrappers in Home.jsx; this layer only adds light and particles.
 */

// Section id → the depth at the moment that section reaches mid-screen.
const STOPS = [['about', 1], ['skills', 2], ['projects', 3], ['contact', 4]]

const RAYS = [[38, 7, -16, 0], [46, 11, -8, 1.6], [53, 6, 4, 0.8], [60, 12, 12, 2.4], [30, 5, -24, 3.1], [68, 7, 20, 1.2]]
const BUBBLES = [[6, 7, 17, 0], [14, 5, 22, 5], [23, 9, 15, 9], [31, 6, 19, 2], [42, 4, 24, 12], [50, 8, 16, 7], [58, 5, 21, 3], [66, 7, 18, 14], [74, 4, 23, 1], [82, 9, 14, 10], [90, 6, 20, 6], [96, 5, 17, 11]]
const MOTES = [[8, 20, 7, 0, '#7cf7ff'], [18, 64, 9, 2, '#b8a3ff'], [27, 36, 6, 4, '#7cf7ff'], [41, 78, 8, 1, '#ffe066'], [56, 18, 7, 3, '#7cf7ff'], [63, 55, 9, 5, '#b8a3ff'], [77, 30, 6, 2, '#7cf7ff'], [85, 70, 8, 6, '#ffe066'], [93, 44, 7, 1, '#7cf7ff']]

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
    const t = setInterval(calc, 1500) // sections change height as media loads
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); clearInterval(t); cancelAnimationFrame(raf) }
  }, [mode, depth])
  return depth
}

export default function Ocean({ mode = 'home' }) {
  const reduce = useReducedMotion()
  const depth = useDepth(mode)
  const rays = useTransform(depth, [0.35, 0.9, 1.4, 2.1], [0, 0.9, 0.75, 0])
  const bubbles = useTransform(depth, [0.6, 1], [0, 1])
  const vignette = useTransform(depth, [2.2, 3.4], [0, 0.55])
  const motes = useTransform(depth, [2.7, 3.4], [0, 1])
  const anim = reduce ? 'none' : undefined

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* sun rays from the surface */}
      <motion.div style={{ opacity: rays }} className="absolute inset-0">
        {RAYS.map(([left, w, skew, delay], i) => (
          <span
            key={i}
            className="ray"
            style={{ left: `${left}%`, width: `${w}vw`, transform: `skewX(${skew}deg)`, '--delay': `${delay}s`, animation: anim }}
          />
        ))}
      </motion.div>

      {/* bubbles rising */}
      <motion.div style={{ opacity: bubbles }} className="absolute inset-0">
        {BUBBLES.map(([left, size, dur, delay], i) => (
          <span
            key={i}
            className={`bubble ${i % 3 === 0 ? '' : 'hidden sm:block'}`}
            style={{ left: `${left}%`, width: size, height: size, '--d': `${dur}s`, '--delay': `-${delay}s`, animation: anim, opacity: reduce ? 0.4 : undefined }}
          />
        ))}
      </motion.div>

      {/* the deep: darker edges and bioluminescence */}
      <motion.div
        style={{ opacity: vignette, background: 'radial-gradient(ellipse at 50% 45%, rgba(2,6,24,0) 40%, rgba(2,6,24,0.9) 100%)' }}
        className="absolute inset-0"
      />
      <motion.div style={{ opacity: motes }} className="absolute inset-0">
        {MOTES.map(([x, y, d, delay, c], i) => (
          <span
            key={i}
            className={`glowmote ${i % 2 ? 'hidden sm:block' : ''}`}
            style={{ left: `${x}%`, top: `${y}%`, '--d': `${d}s`, '--delay': `-${delay}s`, background: c, boxShadow: `0 0 8px 2px ${c}`, animation: anim }}
          />
        ))}
      </motion.div>
    </div>
  )
}
