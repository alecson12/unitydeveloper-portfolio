import { motion, useReducedMotion } from 'framer-motion'
import { PROFILE } from '../content/profile.js'
import PixelSprite from './PixelSprite.jsx'
import WaveArt from './WaveArt.jsx'

/**
 * The opening screen: a pale, quiet sky over a dramatic pixel-art sea
 * drawn in the spirit of Japanese woodblock prints. The wordmark sits in
 * the sky; the great wave rises beneath it.
 */

// flat, stylised cloud bands: [top %, left %, width px, height px, opacity]
const BANDS = [[14, -2, 420, 10, 0.55], [17, 6, 260, 6, 0.4], [26, 58, 520, 10, 0.5], [29, 70, 300, 6, 0.35], [38, 22, 360, 8, 0.4], [41, 30, 180, 5, 0.3]]

/** Stepped mountain silhouette on the far horizon. */
const ridge = (heights, max) => {
  const step = 100 / heights.length
  let d = `M0 ${max} `
  heights.forEach((h, i) => { d += `L${(i * step).toFixed(2)} ${max - h} L${((i + 1) * step).toFixed(2)} ${max - h} ` })
  return d + `L100 ${max} Z`
}
const PEAK = ridge([0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0], 12)

export default function Start() {
  const { start } = PROFILE
  const reduce = useReducedMotion()
  return (
    <section
      id="start"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #d9cfb3 0%, #e4d9bf 34%, #ece3cd 52%, #cfd3cf 56%)' }}
    >
      {/* ---- sky: a pale sun, cloud bands, a far peak, birds ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">

        {BANDS.map(([top, left, w, h, o], i) => (
          <span key={i} className={`absolute ${i > 3 ? 'hidden sm:block' : ''}`} style={{ top: `${top}%`, left: `${left}%`, width: `min(${w}px, 60vw)`, height: h, opacity: o, background: '#f3efe3', boxShadow: `${h}px ${h}px 0 -${h / 2}px rgba(243,239,227,0.5)` }} />
        ))}
        <svg className="absolute bottom-[42%] right-[14%] h-9 w-[22%] sm:h-14 sm:w-[16%]" viewBox="0 0 100 12" preserveAspectRatio="none" shapeRendering="crispEdges">
          <path d={PEAK} fill="#3b4f66" />
          <path d="M41.6 3 L50 3 L58.4 3 L58.4 4 L54 4 L54 5 L50 5 L50 4 L46 4 L46 5 L41.6 5 Z" fill="#f0ece2" />
        </svg>
        <Flock top={24} dur={110} delay={-30} reduce={reduce} />
        <Flock top={33} dur={140} delay={-90} small reduce={reduce} />
      </div>

      {/* ---- the sea ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 top-[46%]">
        <WaveArt className="sway-x absolute inset-0 h-full w-full" style={{ animation: reduce ? 'none' : undefined }} />
      </div>

      {/* ---- the wordmark ---- */}
      <div className="container-x relative flex flex-1 flex-col items-center justify-start pt-[15vh] sm:pt-[13vh]">
        <motion.img
          src={start.wordmark}
          alt={start.wordmarkAlt}
          width="2000"
          height="647"
          fetchPriority="high"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-auto w-full max-w-[860px] select-none"
          style={{ filter: 'drop-shadow(0 16px 30px rgba(20,40,80,0.35))' }}
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
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-pixel text-[12px] tracking-[0.1em] text-[#eef0ea] uppercase drop-shadow-[0_1px_0_rgba(5,15,40,0.6)]"
      >
        {start.hint}
        <span className="bob inline-block" style={{ '--bob': '2.2s', animation: reduce ? 'none' : undefined }}>▼</span>
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
