import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PROFILE } from '../content/profile.js'
import PixelSprite from './PixelSprite.jsx'

/**
 * The opening screen: Alecson's own pixel-art Great Wave, cut into layers
 * and set in motion. The sky runs the full height; the artwork sits at
 * the bottom, leaving the top of the screen free for a title.
 *
 *   layers, back to front:  sun · clouds · Fuji (+ far sea) · far wave · the great wave
 *   motion:  the sun breathes, the clouds drift, the waves sway and heave,
 *            and every layer slides at its own rate as you scroll (parallax)
 *
 * Positions are the pixel boxes each layer was cut from, as fractions of
 * the original 1672 × 941 artwork, so they line back up exactly.
 */
const ART = { W: 1672, H: 941 }
const LAYERS = {
  sun: { x: 1335, y: 94, w: 174, h: 175 },
  clouds: { x: 0, y: 65, w: 1672, h: 494 },
  fuji: { x: 0, y: 211, w: 1267, h: 465 },
  far: { x: 903, y: 439, w: 769, h: 381 },
  wave: { x: 0, y: 48, w: 1672, h: 893 },
}
const box = (l) => ({ left: `${(l.x / ART.W) * 100}%`, top: `${(l.y / ART.H) * 100}%`, width: `${(l.w / ART.W) * 100}%` })

export default function Start() {
  const { start } = PROFILE
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  // parallax: far things barely move, the great wave rises fastest
  const ySun = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 60])
  const yClouds = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 90])
  const yFuji = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 120])
  const yFar = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 40])
  const yWave = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -120])
  const anim = reduce ? 'none' : undefined

  return (
    <section
      id="start"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #2894e9 0%, #2f9bec 28%, #44b0f3 50%, #5bc2f6 68%, #4fb9f2 100%)' }}
    >
      {/* ---- the top of the screen is yours: nothing here but sky ---- */}
      <div className="container-x relative z-10 flex flex-1 flex-col pt-24 sm:pt-28">
        <div id="start-title" className="min-h-[34svh] sm:min-h-[36svh]" />
      </div>

      {/* ---- the artwork, in layers ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <div className="relative mx-auto w-[175vw] max-w-none -translate-x-[18%] sm:w-full sm:translate-x-0" style={{ aspectRatio: `${ART.W} / ${ART.H}`, marginBottom: 'min(0px, calc(62svh - 100vw * 0.5628))' }}>
          <Flock top={16} dur={120} delay={-40} reduce={reduce} />
          <Flock top={27} dur={150} delay={-100} small reduce={reduce} />

          <motion.img src="/media/start/sun.webp" alt="" width={LAYERS.sun.w} height={LAYERS.sun.h} className="sun-breathe pixelated absolute" style={{ ...box(LAYERS.sun), y: ySun, animation: anim }} />
          <motion.img src="/media/start/clouds.webp" alt="" width={LAYERS.clouds.w} height={LAYERS.clouds.h} className="cloud-drift pixelated absolute" style={{ ...box(LAYERS.clouds), y: yClouds, animation: anim }} />
          <motion.img src="/media/start/fuji.webp" alt="" width={LAYERS.fuji.w} height={LAYERS.fuji.h} className="pixelated absolute" style={{ ...box(LAYERS.fuji), y: yFuji }} />
          <motion.img src="/media/start/wave-far.webp" alt="" width={LAYERS.far.w} height={LAYERS.far.h} className="wave-far-sway pixelated absolute" style={{ ...box(LAYERS.far), y: yFar, animation: anim, transformOrigin: '50% 100%' }} />
          <motion.img src="/media/start/wave.webp" alt="The Great Wave, in pixel art" width={LAYERS.wave.w} height={LAYERS.wave.h} className="wave-sway pixelated absolute" style={{ ...box(LAYERS.wave), y: yWave, animation: anim, transformOrigin: '30% 100%' }} fetchPriority="high" />
        </div>
        {/* the surface darkens into the water below */}
        <div className="absolute inset-x-0 bottom-0 h-[12svh]" style={{ background: 'linear-gradient(180deg, rgba(22,58,102,0) 0%, rgba(22,58,102,0.85) 100%)' }} />
      </div>

      {/* ---- scroll hint ---- */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-pixel text-[12px] tracking-[0.1em] text-[#eef0ea] uppercase drop-shadow-[0_1px_0_rgba(5,15,40,0.7)]"
      >
        {start.hint}
        <span className="bob inline-block" style={{ '--bob': '2.2s', animation: anim }}>▼</span>
      </a>
    </section>
  )
}

/** Three birds, far away, right to left. */
function Flock({ top, dur, delay, small = false, reduce }) {
  const s = small ? 0.7 : 1
  return (
    <div className={`drift-back ${small ? 'hidden sm:block' : ''}`} style={{ top: `${top}%`, '--dur': `${dur}s`, '--delay': `${delay}s`, animation: reduce ? 'none' : undefined, left: reduce ? '20%' : undefined }}>
      {[[0, 0], [18, 8], [34, 3]].map(([dx, dy], i) => (
        <PixelSprite key={i} name="bird" className="flap absolute opacity-60" style={{ width: 12 * s, left: dx * s, top: dy * s, animationDelay: `${i * 0.2}s`, animation: reduce ? 'none' : undefined }} />
      ))}
    </div>
  )
}
