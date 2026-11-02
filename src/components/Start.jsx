import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PROFILE } from '../content/profile.js'

/**
 * The opening screen: Alecson's extended Great Wave, cut into layers and
 * set in motion.
 *
 * THE FRAME.  The artwork is 1798 × 875 px. The composition to show at rest
 * is the 1353 × 756 window at (267, 59) — the red frame in the reference.
 * The rest of the image (267 px spare on the left, 179 on the right, ~60
 * above and below) is only there so layers can move without ever showing
 * an edge. The stage below is that window; the layers are laid out on the
 * full artwork inside it, positioned by the pixel boxes they were cut
 * from, so they line up exactly.
 *
 * THE LAYERS, back to front:
 *   sky (CSS gradient sampled from the picture) · sun · high clouds ·
 *   low clouds · far (Fuji, horizon, the right wave, its boats) ·
 *   the great wave · the foreground swell
 * Rear layers carry a 28 px copy of whatever sits in front of them, so a
 * shift never opens a gap.
 *
 * MOTION.  Two kinds, both small:
 *   - continuous: clouds drift (two speeds), the sun's glow breathes, the
 *     waves heave and sway on their own rhythms — all in CSS, transform only
 *   - parallax: as you scroll, each layer slides down at its own rate,
 *     distant ones least, the foreground most
 * Everything stops under prefers-reduced-motion.
 *
 * SIZE.  Landscape: the frame is as wide as the screen, anchored to the
 * bottom; sky colour continues above it. Portrait: the frame is scaled
 * to fill 58% of the height and shifted so the crest and Fuji stay in view.
 */
const ART = { W: 1798, H: 875 }
const FRAME = { x: 267, y: 59, w: 1353, h: 756 }
const L = {
  sun: { x: 1318, y: 245, w: 138, h: 123 },
  cloudsHigh: { x: 0, y: 0, w: 1798, h: 401 },
  cloudsLow: { x: 0, y: 330, w: 1735, h: 219 },
  far: { x: 832, y: 394, w: 966, h: 310 },
  main: { x: 0, y: 215, w: 991, h: 489 },
  front: { x: 0, y: 534, w: 1798, h: 341 },
}
// sky colours sampled from the picture, top to horizon (as fractions of the full image height)
const SKY = 'linear-gradient(180deg, #1696fa 0%, #1898fb 14%, #1b9dfd 27%, #1ea4fd 34%, #28b1fd 41%, #35bdfd 48%, #38bffd 55%, #8edbfd 62%, #90dbfd 69%, #90dbfd 100%)'
const pct = (v, of) => `${(v / of) * 100}%`
const box = (b) => ({ left: pct(b.x, ART.W), top: pct(b.y, ART.H), width: pct(b.w, ART.W) })

export default function Start() {
  const { start } = PROFILE
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollY } = useScroll()
  // parallax rates: fraction of the scroll distance each layer slides down
  const rate = (k) => useTransform(scrollY, (v) => (reduce ? 0 : Math.min(v, 1200) * k))
  const ySun = rate(0.03), yHigh = rate(0.05), yLow = rate(0.08), yFar = rate(0.07), yMain = rate(0.11), yFront = rate(0.16)
  const anim = reduce ? 'none' : undefined

  // Size the stage from the viewport: landscape → full width; portrait → 58% of the height, crest and Fuji centred.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      const vw = window.innerWidth, vh = window.innerHeight
      const ratio = FRAME.w / FRAME.h
      if (vw / vh >= 1.15) {
        el.style.width = '100%'
        el.style.height = `${vw / ratio}px`
        el.style.setProperty('--shift', '0px')
      } else {
        const h = vh * 0.58, w = h * ratio
        el.style.width = `${w}px`
        el.style.height = `${h}px`
        // show the frame from 14% of its width (crest on the left, Fuji in the middle)
        el.style.setProperty('--shift', `${Math.max(vw - w, -w * 0.14)}px`)
      }
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <section id="start" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: '#1696fa' }}>
      <div className="container-x relative z-10 flex flex-1 flex-col pt-24 sm:pt-28">
        <div id="start-title" className="min-h-[30svh] sm:min-h-[32svh]" />
      </div>

      {/* ---- the stage: the framed window onto the artwork ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-start overflow-hidden">
        <div ref={ref} className="relative shrink-0 overflow-hidden" style={{ transform: 'translateX(var(--shift, 0px))' }}>
          {/* the full artwork box, offset so the frame window is what the stage shows */}
          <div className="absolute" style={{ left: pct(-FRAME.x, FRAME.w), top: pct(-FRAME.y, FRAME.h), width: pct(ART.W, FRAME.w), height: pct(ART.H, FRAME.h), background: SKY }}>
            <motion.div className="absolute" style={{ ...box(L.sun), y: ySun }}>
              <span className="sun-glow absolute rounded-full" style={{ inset: '-45%', animation: anim }} />
              <img src="/media/start/sun.webp" alt="" width={L.sun.w} height={L.sun.h} className="pixelated relative block w-full" />
            </motion.div>
            <motion.img src="/media/start/clouds-high.webp" alt="" width={L.cloudsHigh.w} height={L.cloudsHigh.h} className="pixelated drift-high absolute" style={{ ...box(L.cloudsHigh), y: yHigh, animation: anim }} />
            <motion.img src="/media/start/clouds-low.webp" alt="" width={L.cloudsLow.w} height={L.cloudsLow.h} className="pixelated drift-low absolute" style={{ ...box(L.cloudsLow), y: yLow, animation: anim }} />
            <motion.img src="/media/start/far.webp" alt="" width={L.far.w} height={L.far.h} className="pixelated heave-far absolute" style={{ ...box(L.far), y: yFar, animation: anim }} />
            <motion.img src="/media/start/main.webp" alt="The Great Wave, in pixel art" width={L.main.w} height={L.main.h} className="pixelated heave-main absolute" style={{ ...box(L.main), y: yMain, animation: anim, transformOrigin: '55% 100%' }} fetchPriority="high" />
            <motion.img src="/media/start/front.webp" alt="" width={L.front.w} height={L.front.h} className="pixelated heave-front absolute" style={{ ...box(L.front), y: yFront, animation: anim }} />
          </div>
        </div>
        {/* the surface darkens into the water below */}
        <div className="absolute inset-x-0 bottom-0 h-[10svh]" style={{ background: 'linear-gradient(180deg, rgba(22,58,102,0) 0%, rgba(22,58,102,0.85) 100%)' }} />
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-pixel text-[12px] tracking-[0.1em] text-[#eef0ea] uppercase drop-shadow-[0_1px_0_rgba(5,15,40,0.7)]">
        {start.hint}
        <span className="bob inline-block" style={{ '--bob': '2.2s', animation: anim }}>▼</span>
      </a>
    </section>
  )
}
