import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import PixelCloud from './PixelCloud.jsx'
import WorldIsland from './WorldIsland.jsx'

/**
 * The world behind the whole site, on a fixed layer:
 *   background — distant, pale islands and a thin cloud haze (slow parallax)
 *   midground  — islands with towers, trees and waterfalls
 *   foreground — small rocks near the edges, birds, an airship, light motes
 * Everything is SVG drawn from pixel grids; nothing here is an image file.
 * The sky gradient itself is on <body> (see index.css).
 */

// [top %, width px, opacity, seconds to cross, start offset s, shape]
const CLOUDS = [
  [4, 280, 0.95, 150, -30, 2],
  [12, 170, 0.7, 210, -120, 1],
  [21, 340, 0.9, 170, -70, 0],
  [30, 130, 0.55, 240, -40, 1],
  [40, 260, 0.8, 185, -160, 2],
  [50, 200, 0.65, 200, -10, 0],
  [60, 320, 0.8, 160, -95, 2],
  [69, 150, 0.55, 230, -140, 1],
  [78, 240, 0.8, 175, -50, 0],
  [88, 300, 0.9, 155, -110, 2],
]

const MOTES = [[8, 70, 16, 0], [22, 85, 19, 4], [37, 78, 14, 8], [55, 90, 17, 2], [71, 82, 15, 10], [86, 75, 18, 6], [93, 92, 13, 12]]

export default function Sky() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  // Distant things move least as you scroll; near things most.
  const far = useTransform(scrollY, (v) => (reduce ? 0 : -v * 0.04))
  const mid = useTransform(scrollY, (v) => (reduce ? 0 : -v * 0.09))
  const near = useTransform(scrollY, (v) => (reduce ? 0 : -v * 0.16))

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* ---- background: distant islands, faded by the atmosphere ---- */}
      <motion.div style={{ y: far }} className="absolute inset-0">
        <WorldIsland
          w={72} seed={11} trees={6} tower waterfall
          className="absolute left-[-9%] top-[30%] w-[min(560px,70vw)] opacity-40"
          style={{ filter: 'saturate(0.55) brightness(1.12)' }}
        />
        <WorldIsland
          w={60} seed={23} trees={4} house
          className="absolute right-[-7%] top-[58%] w-[min(480px,60vw)] opacity-40"
          style={{ filter: 'saturate(0.55) brightness(1.12)' }}
        />
        <WorldIsland
          w={40} seed={41} trees={2}
          className="absolute left-[38%] top-[-2%] hidden w-[220px] opacity-30 md:block"
          style={{ filter: 'saturate(0.5) brightness(1.15)' }}
        />
      </motion.div>

      {/* ---- midground: islands you could visit ---- */}
      <motion.div style={{ y: mid }} className="absolute inset-0">
        <WorldIsland
          w={44} seed={5} trees={3} waterfall
          className="bob-slow absolute right-[3%] top-[9%] hidden w-[260px] opacity-90 md:block"
          style={{ filter: 'drop-shadow(8px 10px 0 rgba(27,42,102,0.18))' }}
        />
        <WorldIsland
          w={52} seed={17} trees={4} tower
          className="bob absolute left-[2%] top-[66%] hidden w-[300px] opacity-90 lg:block"
          style={{ '--delay': '-3s', filter: 'drop-shadow(8px 10px 0 rgba(27,42,102,0.18))' }}
        />
        <WorldIsland
          w={36} seed={29} trees={2} house
          className="bob absolute right-[6%] top-[80%] hidden w-[200px] opacity-85 md:block"
          style={{ '--delay': '-5s', filter: 'drop-shadow(6px 8px 0 rgba(27,42,102,0.18))' }}
        />
      </motion.div>

      {/* ---- clouds drift across all layers ---- */}
      {CLOUDS.map(([top, w, o, dur, delay, v], i) => (
        <PixelCloud
          key={i}
          variant={v}
          className="cloud"
          style={{ top: `${top}%`, width: `min(${w}px, 55vw)`, opacity: o, '--dur': `${dur}s`, '--delay': `${delay}s` }}
        />
      ))}

      {/* ---- foreground: small rocks at the edges, birds, airship, motes ---- */}
      <motion.div style={{ y: near }} className="absolute inset-0">
        <WorldIsland w={22} seed={7} trees={1} rocks={1} className="bob-xs absolute left-[-1%] top-[42%] hidden w-[120px] opacity-95 sm:block" style={{ '--delay': '-2s' }} />
        <WorldIsland w={18} seed={31} trees={0} rocks={2} className="bob-xs absolute right-[1%] top-[36%] hidden w-[96px] opacity-95 sm:block" style={{ '--delay': '-4s' }} />
        <WorldIsland w={26} seed={37} trees={2} className="bob-xs absolute left-[4%] top-[90%] hidden w-[140px] opacity-95 md:block" style={{ '--delay': '-1s' }} />
      </motion.div>

      <Flock top={14} dur={95} delay={-20} />
      <Flock top={47} dur={120} delay={-70} small />
      <Airship />

      {MOTES.map(([x, y, d, delay], i) => (
        <span key={i} className="mote" style={{ left: `${x}%`, top: `${y}%`, '--d': `${d}s`, '--delay': `${delay}s`, opacity: 0 }} />
      ))}
    </div>
  )
}

/** Three pixel birds flying right-to-left, wings flapping in two frames. */
function Flock({ top, dur, delay, small = false }) {
  const s = small ? 0.7 : 1
  return (
    <div className="drift-back" style={{ top: `${top}%`, '--dur': `${dur}s`, '--delay': `${delay}s` }}>
      {[[0, 0], [14, 6], [26, 2]].map(([dx, dy], i) => (
        <svg key={i} viewBox="0 0 7 3" width={14 * s} height={6 * s} className="flap absolute" style={{ left: dx * s, top: dy * s, animationDelay: `${i * 0.15}s` }} shapeRendering="crispEdges">
          <path d="M0 1h1v1H0zM1 0h2v1H1zM3 1h1v1H3zM4 0h2v1H4zM6 1h1v1H6z" fill="#1b2a66" opacity="0.75" />
        </svg>
      ))}
    </div>
  )
}

/** A small airship crossing high up, very slowly. */
function Airship() {
  return (
    <div className="drift-back hidden sm:block" style={{ top: '6%', '--dur': '320s', '--delay': '-140s' }}>
      <svg viewBox="0 0 24 12" width="96" height="48" shapeRendering="crispEdges" className="bob-slow opacity-80">
        <path d="M3 2h14v1H3zM1 3h18v1H1zM0 4h20v3H0zM1 7h18v1H1zM3 8h14v1H3z" fill="#eef1ff" />
        <path d="M4 4h12v1H4z" fill="#ffb6d8" />
        <path d="M18 3h3v1h-3zM19 4h4v3h-4zM18 7h3v1h-3z" fill="#f07aa6" />
        <path d="M7 9h1v1H7zM12 9h1v1h-1zM6 10h8v2H6z" fill="#6b4a2f" />
        <path d="M8 10h1v1H8zM11 10h1v1h-1z" fill="#ffd166" />
      </svg>
    </div>
  )
}
