import { motion, useReducedMotion } from 'framer-motion'
import { PROFILE } from '../content/profile.js'
import PixelCloud from './PixelCloud.jsx'
import PixelSprite from './PixelSprite.jsx'

/**
 * The opening screen: the ocean seen from above the surface. Sky, sun and
 * drifting clouds; distant islands on the horizon; waves and sun glints on
 * the water below. The wordmark PNG is the one thing to look at.
 */

// [top %, width px, opacity, seconds to cross, start offset s, shape]
const CLOUDS = [[6, 300, 0.95, 160, -40, 2], [14, 170, 0.75, 220, -130, 1], [24, 340, 0.9, 180, -80, 0], [33, 140, 0.6, 250, -40, 1], [42, 240, 0.8, 190, -170, 2], [50, 180, 0.7, 210, -20, 0]]
const GLINTS = [[6, 68, 2.6, 0], [15, 74, 3.1, 0.8], [23, 66, 2.4, 1.5], [34, 80, 3.4, 0.3], [45, 70, 2.8, 2.1], [54, 64, 3.0, 1.0], [63, 76, 2.5, 0.5], [72, 69, 3.3, 1.8], [81, 82, 2.7, 1.2], [90, 66, 3.2, 0.1], [40, 90, 2.9, 0.6], [58, 86, 2.3, 1.4]]

/** Stepped island silhouette: heights per column, drawn as a pixel staircase. */
const ridge = (heights, max) => {
  const step = 100 / heights.length
  let d = `M0 ${max} `
  heights.forEach((h, i) => { d += `L${(i * step).toFixed(2)} ${max - h} L${((i + 1) * step).toFixed(2)} ${max - h} ` })
  return d + `L100 ${max} Z`
}
const ISLAND_L = ridge([0, 1, 2, 4, 6, 8, 9, 10, 9, 8, 7, 5, 4, 3, 2, 1, 0, 0, 0, 0], 12)
const ISLAND_R = ridge([0, 0, 0, 0, 0, 0, 1, 2, 3, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0, 0], 12)

export default function Start() {
  const { start } = PROFILE
  const reduce = useReducedMotion()
  return (
    <section
      id="start"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #4fb3f5 0%, #7fcbff 36%, #b6e6ff 56%, #d9f3ff 60%)' }}
    >
      {/* ---- sky ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <PixelSprite name="sun" className="absolute right-[8%] top-[9%] w-16 sm:w-24" style={{ filter: 'drop-shadow(0 0 18px rgba(255,235,150,0.9)) drop-shadow(0 0 40px rgba(255,215,102,0.5))' }} />
        {CLOUDS.map(([top, w, o, dur, delay, v], i) => (
          <PixelCloud key={i} variant={v} className={`cloud ${i > 3 ? 'hidden sm:block' : ''}`} style={{ top: `${top}%`, width: `min(${w}px, 55vw)`, opacity: o, '--dur': `${dur}s`, '--delay': `${delay}s`, animation: reduce ? 'none' : undefined, left: reduce ? `${(i * 23) % 80}%` : undefined }} />
        ))}
        <Flock top={20} dur={100} delay={-30} reduce={reduce} />
        <Flock top={38} dur={130} delay={-80} small reduce={reduce} />
      </div>

      {/* ---- horizon: distant islands ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[60%] h-16 -translate-y-full sm:h-24">
        <svg className="absolute bottom-0 left-0 h-full w-[46%] sm:w-[34%]" viewBox="0 0 100 12" preserveAspectRatio="none" shapeRendering="crispEdges"><path d={ISLAND_L} fill="#2b7fb0" opacity="0.8" /></svg>
        <PixelSprite name="palm" className="absolute bottom-[80%] left-[14%] w-8 opacity-80 sm:left-[11%] sm:w-12" />
        <svg className="absolute bottom-0 right-0 h-[70%] w-[36%] sm:w-[26%]" viewBox="0 0 100 12" preserveAspectRatio="none" shapeRendering="crispEdges"><path d={ISLAND_R} fill="#2b7fb0" opacity="0.65" /></svg>
      </div>

      {/* ---- the water ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 top-[60%]" style={{ background: 'linear-gradient(180deg, #5cc8ff 0%, #35b0f2 30%, #1d8fe4 100%)' }}>
        <div className="wave wave-1 absolute inset-x-0 top-0" style={{ animation: reduce ? 'none' : undefined }} />
        <div className="wave wave-2 absolute inset-x-0 top-[18%]" style={{ animation: reduce ? 'none' : undefined }} />
        <div className="wave wave-3 absolute inset-x-0 top-[44%]" style={{ animation: reduce ? 'none' : undefined }} />
        {GLINTS.map(([x, y, d, delay], i) => (
          <span key={i} className={`sparkle ${i > 7 ? 'hidden sm:block' : ''}`} style={{ left: `${x}%`, top: `${y - 60}%`, '--d': `${d}s`, '--delay': `${delay}s`, animation: reduce ? 'none' : undefined }} />
        ))}
        {/* fish just under the surface */}
        <div className="absolute left-0 top-[55%] w-full opacity-45" style={{ height: 30 }}>
          <div className="swim swim-l absolute h-full" style={{ '--dur': '60s', '--delay': '-20s', animation: reduce ? 'none' : undefined, left: reduce ? '30%' : undefined }}>
            {[0, 1, 2].map((i) => <PixelSprite key={i} name="minnow" className="absolute" style={{ width: 22, left: i * 20, top: (i % 2) * 10 }} />)}
          </div>
        </div>
      </div>

      {/* ---- the wordmark ---- */}
      <div className="container-x relative flex flex-1 flex-col items-center justify-start pt-[20vh] sm:pt-[16vh]">
        <motion.img
          src={start.wordmark}
          alt={start.wordmarkAlt}
          width="2000"
          height="647"
          fetchPriority="high"
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-auto w-full max-w-[1040px] select-none"
          style={{ filter: 'drop-shadow(0 18px 40px rgba(20,60,120,0.35))' }}
          draggable="false"
        />
        {start.tagline && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="on-light mt-6 max-w-xl text-center text-base text-ink-2 sm:text-lg"
          >
            {start.tagline}
          </motion.p>
        )}
      </div>

      {/* ---- scroll hint ---- */}
      <a
        href="#about"
        className="on-light absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-pixel text-[12px] tracking-[0.1em] text-white uppercase drop-shadow-[0_1px_0_rgba(0,40,90,0.5)]"
      >
        {start.hint}
        <span className="bob inline-block" style={{ '--bob': '2.2s', animation: reduce ? 'none' : undefined }}>▼</span>
      </a>
    </section>
  )
}

/** Three pixel birds flying right-to-left, wings flapping in two frames. */
function Flock({ top, dur, delay, small = false, reduce }) {
  const s = small ? 0.7 : 1
  return (
    <div className={`drift-back ${small ? 'hidden sm:block' : ''}`} style={{ top: `${top}%`, '--dur': `${dur}s`, '--delay': `${delay}s`, animation: reduce ? 'none' : undefined, left: reduce ? '20%' : undefined }}>
      {[[0, 0], [16, 7], [30, 2]].map(([dx, dy], i) => (
        <PixelSprite key={i} name="bird" className="flap absolute opacity-70" style={{ width: 14 * s, left: dx * s, top: dy * s, animationDelay: `${i * 0.15}s`, animation: reduce ? 'none' : undefined }} />
      ))}
    </div>
  )
}
