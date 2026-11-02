import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import PixelSprite from './PixelSprite.jsx'

/**
 * The creatures and plants of one depth band, drawn behind the content of
 * a <Zone>. Three kinds of movement, all CSS and transform-only:
 *   swim   — crosses the screen now and then (right→left, or flipped)
 *   float  — drifts gently in place (jellyfish)
 *   fixed  — plants, rocks and ruins on the sea floor or the edges
 * Two parallax groups (far / near) shift slightly with the scroll so the
 * water has depth. Items marked  sm  are hidden on phones to keep things
 * light. Positions are percentages of the zone, so a long zone spreads
 * its creatures out over its whole height.
 *
 * Add a creature: one line in the band's list below.
 *   { kind, name, top, left|right|bottom, w, dur, delay, flip, glow, sm, layer }
 */

const BANDS = {
  shallow: [
    { kind: 'swim', name: 'fish', top: 10, w: 44, dur: 70, delay: -12 },
    { kind: 'swim', name: 'minnow', top: 18, w: 26, dur: 48, delay: -30, school: 4, sm: true },
    { kind: 'swim', name: 'tang', top: 34, w: 48, dur: 88, delay: -50, flip: true },
    { kind: 'swim', name: 'turtle', top: 56, w: 92, dur: 130, delay: -70, sm: true },
    { kind: 'swim', name: 'fish', top: 74, w: 36, dur: 76, delay: -20, flip: true, sm: true },
    { kind: 'swim', name: 'minnow', top: 88, w: 24, dur: 56, delay: -5, school: 3, flip: true },
    { kind: 'fixed', name: 'seaweed', bottom: 0, left: 1.5, w: 34, sway: true, layer: 'near' },
    { kind: 'fixed', name: 'kelp', bottom: 0, left: 5, w: 22, sway: true, delay: -2, sm: true },
    { kind: 'fixed', name: 'seaweed', bottom: 0, right: 2, w: 30, sway: true, delay: -3, layer: 'near' },
    { kind: 'fixed', name: 'starfish', bottom: 4, right: 7, w: 20, sm: true },
    { kind: 'fixed', name: 'kelp', top: 40, right: 0.5, w: 18, sway: true, delay: -1, sm: true },
  ],
  mid: [
    { kind: 'swim', name: 'ray', top: 12, w: 120, dur: 115, delay: -40, layer: 'far', sm: true },
    { kind: 'swim', name: 'minnow', top: 28, w: 22, dur: 52, delay: -10, school: 5 },
    { kind: 'swim', name: 'fish', top: 46, w: 40, dur: 80, delay: -60, flip: true },
    { kind: 'swim', name: 'tang', top: 66, w: 44, dur: 95, delay: -25, sm: true },
    { kind: 'float', name: 'jelly', top: 8, left: 1, w: 40, delay: -3, sm: true },
    { kind: 'float', name: 'jelly', top: 58, right: 5, w: 52, delay: -7 },
    { kind: 'fixed', name: 'coral', bottom: 0, left: 1, w: 70, layer: 'near' },
    { kind: 'fixed', name: 'brain', bottom: 0, left: 8, w: 56, sm: true },
    { kind: 'fixed', name: 'seaweed', bottom: 0, left: 13, w: 26, sway: true, sm: true },
    { kind: 'fixed', name: 'tubes', bottom: 0, right: 2, w: 44, layer: 'near' },
    { kind: 'fixed', name: 'rock', bottom: 0, right: 6, w: 80, sm: true },
    { kind: 'fixed', name: 'coral', bottom: 0, right: 12, w: 50, sm: true },
  ],
  deep: [
    { kind: 'swim', name: 'squid', top: 6, w: 44, dur: 150, delay: -30, glow: 'rgba(166,107,255,0.55)' },
    { kind: 'swim', name: 'lantern', top: 14, w: 26, dur: 70, delay: -12, school: 3, glow: 'rgba(124,247,255,0.6)', sm: true },
    { kind: 'swim', name: 'angler', top: 24, w: 88, dur: 170, delay: -90, glow: 'rgba(255,224,102,0.35)' },
    { kind: 'float', name: 'bigjelly', top: 18, right: 4, w: 84, delay: -5, glow: 'rgba(47,211,255,0.55)', sm: true },
    { kind: 'swim', name: 'lantern', top: 38, w: 24, dur: 64, delay: -40, school: 4, flip: true, glow: 'rgba(124,247,255,0.6)' },
    { kind: 'swim', name: 'squid', top: 50, w: 40, dur: 140, delay: -100, flip: true, glow: 'rgba(166,107,255,0.55)', sm: true },
    { kind: 'float', name: 'bigjelly', top: 56, left: 3, w: 72, delay: -9, glow: 'rgba(47,211,255,0.55)' },
    { kind: 'swim', name: 'angler', top: 70, w: 96, dur: 180, delay: -20, flip: true, glow: 'rgba(255,224,102,0.35)', sm: true },
    { kind: 'swim', name: 'lantern', top: 82, w: 26, dur: 72, delay: -55, school: 3, glow: 'rgba(124,247,255,0.6)' },
    { kind: 'float', name: 'jelly', top: 90, right: 6, w: 44, delay: -2, glow: 'rgba(197,107,255,0.5)', sm: true },
    { kind: 'fixed', name: 'rock', top: 44, right: 0, w: 110, sm: true },
    { kind: 'fixed', name: 'column', top: 43.2, right: 5, w: 30, sm: true },
    { kind: 'fixed', name: 'arch', bottom: 0, left: 1, w: 120, layer: 'near' },
    { kind: 'fixed', name: 'column', bottom: 0, left: 12, w: 34, sm: true },
    { kind: 'fixed', name: 'rock', bottom: 0, right: 1, w: 120, layer: 'near' },
    { kind: 'fixed', name: 'column', bottom: 0, right: 11, w: 30 },
  ],
  abyss: [
    { kind: 'swim', name: 'angler', top: 20, w: 90, dur: 160, delay: -70, glow: 'rgba(255,224,102,0.4)' },
    { kind: 'swim', name: 'lantern', top: 48, w: 24, dur: 66, delay: -20, school: 3, flip: true, glow: 'rgba(124,247,255,0.6)', sm: true },
    { kind: 'float', name: 'bigjelly', top: 10, left: 4, w: 64, delay: -4, glow: 'rgba(47,211,255,0.5)', sm: true },
    { kind: 'fixed', name: 'chest', bottom: 0, left: 3, w: 56, layer: 'near' },
    { kind: 'fixed', name: 'anchor', bottom: 0, right: 4, w: 52, layer: 'near' },
    { kind: 'fixed', name: 'rock', bottom: 0, right: 9, w: 96, sm: true },
    { kind: 'fixed', name: 'column', bottom: 0, left: 11, w: 28, sm: true },
  ],
}

export default function SeaLife({ band = 'shallow' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const far = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 40])
  const near = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30])
  const items = BANDS[band] ?? []

  const layer = (which) => items.filter((it) => (it.layer ?? 'mid') === which).map((it, i) => <Creature key={`${which}-${i}`} {...it} reduce={reduce} />)

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div style={{ y: far }} className="absolute inset-0 opacity-70">{layer('far')}</motion.div>
      <div className="absolute inset-0">{layer('mid')}</div>
      <motion.div style={{ y: near }} className="absolute inset-0">{layer('near')}</motion.div>
    </div>
  )
}

function Creature({ kind, name, top, left, right, bottom, w, dur = 80, delay = 0, flip = false, glow, sm = false, school = 0, sway = false, reduce }) {
  const vis = sm ? 'hidden sm:block' : ''
  const pos = { top: top != null ? `${top}%` : undefined, bottom: bottom != null ? `${bottom}%` : undefined, left: left != null ? `${left}%` : undefined, right: right != null ? `${right}%` : undefined }

  if (kind === 'swim') {
    // A swimmer owns a full-width lane and travels across it.
    const sprites = school
      ? Array.from({ length: school }, (_, i) => (
          <PixelSprite key={i} name={name} flip={flip} glow={glow} className="absolute" style={{ width: w, left: (i % 2) * w * 0.9 + Math.floor(i / 2) * w * 1.4, top: (i % 3) * w * 0.45 }} />
        ))
      : <PixelSprite name={name} flip={flip} glow={glow} style={{ width: w }} />
    return (
      <div
        className={`absolute left-0 w-full ${vis}`}
        style={{ top: `${top}%`, height: school ? w * 1.6 : w }}
      >
        <div
          className={`swim ${flip ? 'swim-r' : 'swim-l'}`}
          style={{ '--dur': `${dur}s`, '--delay': `${delay}s`, animation: reduce ? 'none' : undefined, left: reduce ? `${flip ? 70 : 15}%` : undefined, height: '100%' }}
        >
          <div className="bob-xs relative h-full" style={{ animation: reduce ? 'none' : undefined, '--delay': `${delay / 3}s` }}>{sprites}</div>
        </div>
      </div>
    )
  }

  if (kind === 'float') {
    return (
      <div className={`absolute ${vis}`} style={pos}>
        <PixelSprite name={name} glow={glow} className="drift-y" style={{ width: w, '--delay': `${delay}s`, animation: reduce ? 'none' : undefined }} />
      </div>
    )
  }

  return (
    <div className={`absolute ${vis}`} style={pos}>
      <PixelSprite name={name} flip={flip} className={sway ? 'sway' : ''} style={{ width: w, '--delay': `${delay}s`, animation: reduce ? 'none' : undefined }} />
    </div>
  )
}
