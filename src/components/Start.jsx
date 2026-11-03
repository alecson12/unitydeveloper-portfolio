import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PROFILE } from '../content/profile.js'

/**
 * The opening screen: Alecson's extended Great Wave, in the three layers he
 * painted it in, set in motion.
 *
 * THE WORDMARK sits in the sky: upper right on wide screens (over the
 * open sky between the crest and the sun), centred above the frame on
 * phones. It floats very slightly.
 *
 * THE FRAME.  The artwork is 1798 × 875 px. The composition to show at rest
 * is the 1353 × 756 window at (267, 59) — the red frame in the reference.
 * The rest of the image (267 px spare on the left, 179 on the right, ~60
 * above and below) is only there so layers can move without ever showing
 * an edge. The stage below is that window; the layers are laid out on the
 * full artwork inside it at the pixel offsets they were painted at, so
 * they line up exactly (stacked, they reproduce the original picture).
 *
 * THE LAYERS, back to front (public/media/start/, used as supplied):
 *   sky colour (CSS gradient sampled from the picture)
 *   sky.webp        1798 × 875 at (0, 0)    sky, clouds, sun, horizon (solid down to the sea)
 *   mountains.webp  1798 × 875 at (0, 0)    Fuji and the far-left swell (on a full, otherwise clear canvas)
 *   waves.webp      1798 × 657 at (0, 218)  the great wave and the sea
 *
 * MOTION.  Two kinds, both small:
 *   - continuous: the sky drifts slowly sideways and a touch up and down
 *     (clouds and sun together), the
 *     sun's glow breathes, the far swell and the great wave heave on their
 *     own rhythms — all in CSS, transform only
 *   - parallax: as you scroll, each layer slides down at its own rate,
 *     the sky least, the waves most
 * Everything stops under prefers-reduced-motion.
 *
 * SIZE.  Landscape: the frame is as wide as the screen, anchored to the
 * bottom; sky colour continues above it. Portrait: the frame is scaled
 * to fill 58% of the height and shifted so the crest and Fuji stay in view.
 */
const ART = { W: 1798, H: 875 }
const FRAME = { x: 267, y: 59, w: 1353, h: 756 }
const L = {
  sky: { x: 0, y: 0, w: 1798, h: 875 },
  mountains: { x: 0, y: 0, w: 1798, h: 875 },
  waves: { x: 0, y: 218, w: 1798, h: 657 },
}
// where the sun sits in the sky layer (for its glow)
const SUN = { x: 1318, y: 245, w: 138, h: 123 }
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
  const ySky = rate(0.05), yMountains = rate(0.07), yWaves = rate(0.12)
  // the tree is nearest of all, so it slides most — and the other way, rising as the scene sinks
  const yTree = useTransform(scrollY, (v) => (reduce ? 0 : -Math.min(v, 1200) * 0.1))
  const tree = start.tree?.src ? start.tree : null
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
        <div id="start-title" className="flex justify-center lg:mt-[3vh] lg:justify-end">
          {start.wordmark && (
            <motion.img
              src={start.wordmark}
              alt={start.wordmarkAlt ?? ''}
              width={2404}
              height={866}
              fetchPriority="high"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="bob-slow block h-auto w-[min(92vw,560px)] lg:w-[46vw] lg:max-w-[900px]"
              style={{ '--bob': '7s', animation: anim }}
            />
          )}
        </div>
      </div>

      {/* ---- the stage: the framed window onto the artwork ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-start overflow-hidden">
        <div ref={ref} className="relative shrink-0 overflow-hidden" style={{ transform: 'translateX(var(--shift, 0px))' }}>
          {/* the full artwork box, offset so the frame window is what the stage shows */}
          <div className="absolute" style={{ left: pct(-FRAME.x, FRAME.w), top: pct(-FRAME.y, FRAME.h), width: pct(ART.W, FRAME.w), height: pct(ART.H, FRAME.h), background: SKY }}>
            <motion.div className="absolute" style={{ ...box(L.sky), y: ySky }}>
              <img src="/media/start/sky.webp" alt="" width={L.sky.w} height={L.sky.h} className="pixelated drift-sky block w-full" style={{ animation: anim }} />
              {/* the sun's glow, breathing over the painted sun */}
              <span className="sun-glow absolute rounded-full" style={{ left: pct(SUN.x - SUN.w * 0.45, L.sky.w), top: pct(SUN.y - SUN.h * 0.45, L.sky.h), width: pct(SUN.w * 1.9, L.sky.w), height: pct(SUN.h * 1.9, L.sky.h), animation: anim }} />
            </motion.div>
            <motion.img src="/media/start/mountains.webp" alt="" width={L.mountains.w} height={L.mountains.h} className="pixelated heave-far absolute" style={{ ...box(L.mountains), y: yMountains, animation: anim }} />
            <motion.img src="/media/start/waves.webp" alt="The Great Wave, in pixel art" width={L.waves.w} height={L.waves.h} className="pixelated heave-waves absolute" style={{ ...box(L.waves), y: yWaves, animation: anim, transformOrigin: '40% 100%' }} fetchPriority="high" />
          </div>
        </div>
        {/* the surface darkens into the water below */}
        <div className="absolute inset-x-0 bottom-0 h-[10svh]" style={{ background: 'linear-gradient(180deg, rgba(22,58,102,0) 0%, rgba(22,58,102,0.85) 100%)' }} />
      </div>

      {/* ---- foreground tree: nearest layer, in front of the waves, behind the title ---- */}
      {tree && (
        <motion.div
          aria-hidden
          className={`pointer-events-none absolute bottom-0 z-[5] ${tree.side === 'right' ? 'right-0' : 'left-0'}`}
          style={{ width: `${tree.width * 100}%`, minWidth: 160, maxWidth: 560, y: yTree }}
        >
          <img
            src={tree.src}
            alt={tree.alt ?? ''}
            className="tree-sway pixelated block h-auto w-full"
            style={{ animation: anim, transformOrigin: tree.side === 'right' ? '100% 100%' : '0% 100%' }}
          />
        </motion.div>
      )}

      <a href="#about" className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-pixel text-[12px] tracking-[0.1em] text-[#eef0ea] uppercase drop-shadow-[0_1px_0_rgba(5,15,40,0.7)]">
        {start.hint}
        <span className="bob inline-block" style={{ '--bob': '2.2s', animation: anim }}>▼</span>
      </a>
    </section>
  )
}
