import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import PixelSprite from './PixelSprite.jsx'

/**
 * The life and formations of one depth band, drawn behind the content of
 * a <Zone>. Restrained: a few large, well-placed things rather than many.
 *   swim   — crosses the screen slowly (right→left, or flipped)
 *   float  — drifts gently in place (jellyfish)
 *   fixed  — plants and rock on the floor or the edges
 * Two parallax groups (far / near) shift slightly with the scroll. Items
 * marked  sm  are hidden on phones. Positions are percentages of the zone.
 *
 *   { kind, name, top, left|right|bottom, w, dur, delay, flip, glow, sm, layer, op }
 */

const BANDS = {
  shallow: [
    { kind: 'swim', name: 'minnow', top: 9, w: 22, dur: 70, delay: -30, school: 6, op: 0.7 },
    { kind: 'swim', name: 'fish', top: 24, w: 64, dur: 120, delay: -50, flip: true, op: 0.85, sm: true },
    { kind: 'swim', name: 'turtle', top: 52, w: 110, dur: 190, delay: -80, layer: 'far', op: 0.7, sm: true },
    { kind: 'swim', name: 'reef', top: 70, w: 40, dur: 95, delay: -20, school: 2, op: 0.8 },
    { kind: 'swim', name: 'minnow', top: 86, w: 20, dur: 60, delay: -5, school: 5, flip: true, op: 0.6, sm: true },
    { kind: 'fixed', name: 'ledge', bottom: 0, left: -4, w: 420, layer: 'near' },
    { kind: 'fixed', name: 'kelp', bottom: 0, left: 6, w: 34, sway: true, layer: 'near' },
    { kind: 'fixed', name: 'kelp', bottom: 0, left: 11, w: 26, sway: true, delay: -2, sm: true },
    { kind: 'fixed', name: 'rock', bottom: 0, right: -2, w: 300, layer: 'near' },
    { kind: 'fixed', name: 'seaweed', bottom: 0, right: 9, w: 40, sway: true, delay: -3, layer: 'near' },
    { kind: 'fixed', name: 'spire', bottom: 0, right: 15, w: 60, sm: true },
  ],
  mid: [
    { kind: 'swim', name: 'ray', top: 10, w: 220, dur: 200, delay: -60, layer: 'far', op: 0.6, sm: true },
    { kind: 'swim', name: 'minnow', top: 30, w: 20, dur: 75, delay: -15, school: 7, op: 0.55 },
    { kind: 'swim', name: 'fish', top: 50, w: 56, dur: 130, delay: -70, flip: true, op: 0.75 },
    { kind: 'float', name: 'jelly', top: 14, left: 3, w: 46, delay: -3, op: 0.7, sm: true },
    { kind: 'float', name: 'jelly', top: 60, right: 4, w: 58, delay: -7, op: 0.75 },
    { kind: 'fixed', name: 'rock', bottom: 0, left: -3, w: 360, layer: 'near' },
    { kind: 'fixed', name: 'fan', bottom: 0, left: 13, w: 52, sm: true },
    { kind: 'fixed', name: 'coral', bottom: 0, left: 17, w: 64, sm: true },
    { kind: 'fixed', name: 'kelp', bottom: 0, left: 22, w: 30, sway: true, sm: true },
    { kind: 'fixed', name: 'spire', bottom: 0, right: 2, w: 90, layer: 'near' },
    { kind: 'fixed', name: 'coral', bottom: 0, right: 9, w: 56, layer: 'near' },
    { kind: 'fixed', name: 'rock', bottom: 0, right: 12, w: 260, sm: true },
  ],
  deep: [
    { kind: 'swim', name: 'squid', top: 5, w: 40, dur: 170, delay: -40, glow: 'rgba(92,84,160,0.35)', op: 0.8 },
    { kind: 'swim', name: 'lantern', top: 13, w: 28, dur: 90, delay: -12, school: 3, glow: 'rgba(143,227,255,0.45)', op: 0.8, sm: true },
    { kind: 'swim', name: 'angler', top: 23, w: 110, dur: 220, delay: -100, glow: 'rgba(220,239,168,0.25)', op: 0.9 },
    { kind: 'float', name: 'bigjelly', top: 17, right: 3, w: 110, delay: -5, glow: 'rgba(127,192,214,0.35)', op: 0.75, sm: true },
    { kind: 'swim', name: 'lantern', top: 38, w: 26, dur: 80, delay: -40, school: 4, flip: true, glow: 'rgba(143,227,255,0.45)', op: 0.8 },
    { kind: 'swim', name: 'squid', top: 51, w: 36, dur: 160, delay: -120, flip: true, glow: 'rgba(92,84,160,0.35)', op: 0.8, sm: true },
    { kind: 'float', name: 'bigjelly', top: 57, left: 2, w: 96, delay: -9, glow: 'rgba(127,192,214,0.35)', op: 0.75 },
    { kind: 'swim', name: 'angler', top: 71, w: 120, dur: 240, delay: -20, flip: true, glow: 'rgba(220,239,168,0.25)', op: 0.9, sm: true },
    { kind: 'swim', name: 'lantern', top: 83, w: 28, dur: 85, delay: -55, school: 3, glow: 'rgba(143,227,255,0.45)', op: 0.8 },
    { kind: 'float', name: 'jelly', top: 90, right: 6, w: 50, delay: -2, glow: 'rgba(122,115,184,0.3)', op: 0.7, sm: true },
    { kind: 'fixed', name: 'spire', top: 44, right: -1, w: 110, op: 0.9, sm: true },
    { kind: 'fixed', name: 'rock', top: 46.5, right: 2, w: 320, op: 0.9, sm: true },
    { kind: 'fixed', name: 'rock', bottom: 0, left: -5, w: 440, layer: 'near' },
    { kind: 'fixed', name: 'spire', bottom: 0, left: 14, w: 100, sm: true },
    { kind: 'fixed', name: 'spire', bottom: 0, right: 6, w: 130, layer: 'near' },
    { kind: 'fixed', name: 'rock', bottom: 0, right: -3, w: 300 },
  ],
  abyss: [
    { kind: 'swim', name: 'angler', top: 22, w: 110, dur: 220, delay: -70, glow: 'rgba(220,239,168,0.3)', op: 0.9 },
    { kind: 'swim', name: 'lantern', top: 50, w: 26, dur: 90, delay: -20, school: 3, flip: true, glow: 'rgba(143,227,255,0.45)', op: 0.8, sm: true },
    { kind: 'float', name: 'bigjelly', top: 8, left: 3, w: 84, delay: -4, glow: 'rgba(127,192,214,0.3)', op: 0.7, sm: true },
    { kind: 'fixed', name: 'rock', bottom: 0, left: -4, w: 380, layer: 'near', op: 0.9 },
    { kind: 'fixed', name: 'spire', bottom: 0, left: 16, w: 110, sm: true, op: 0.9 },
    { kind: 'fixed', name: 'spire', bottom: 0, right: 3, w: 140, layer: 'near', op: 0.9 },
    { kind: 'fixed', name: 'rock', bottom: 0, right: 8, w: 320, sm: true, op: 0.9 },
  ],
}

export default function SeaLife({ band = 'shallow' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const far = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 30])
  const near = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24])
  const items = BANDS[band] ?? []

  const layer = (which) => items.filter((it) => (it.layer ?? 'mid') === which).map((it, i) => <Creature key={`${which}-${i}`} {...it} reduce={reduce} />)

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div style={{ y: far }} className="absolute inset-0 opacity-60">{layer('far')}</motion.div>
      <div className="absolute inset-0">{layer('mid')}</div>
      <motion.div style={{ y: near }} className="absolute inset-0">{layer('near')}</motion.div>
    </div>
  )
}

function Creature({ kind, name, top, left, right, bottom, w, dur = 120, delay = 0, flip = false, glow, sm = false, school = 0, sway = false, op = 1, reduce }) {
  const vis = sm ? 'hidden sm:block' : ''
  const pos = { top: top != null ? `${top}%` : undefined, bottom: bottom != null ? `${bottom}%` : undefined, left: left != null ? `${left}%` : undefined, right: right != null ? `${right}%` : undefined, opacity: op }

  if (kind === 'swim') {
    const sprites = school
      ? Array.from({ length: school }, (_, i) => (
          <PixelSprite key={i} name={name} flip={flip} glow={glow} className="absolute" style={{ width: w, left: (i % 2) * w * 0.9 + Math.floor(i / 2) * w * 1.3, top: (i % 3) * w * 0.4 }} />
        ))
      : <PixelSprite name={name} flip={flip} glow={glow} style={{ width: w }} />
    return (
      <div className={`absolute left-0 w-full ${vis}`} style={{ top: `${top}%`, height: school ? w * 1.5 : w, opacity: op }}>
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
