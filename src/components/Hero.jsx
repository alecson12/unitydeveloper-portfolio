import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PROFILE } from '../content/profile.js'
import { featuredProject } from '../lib/content.js'
import PixelWindow from './PixelWindow.jsx'
import PixelCloud from './PixelCloud.jsx'
import Island from './Island.jsx'

const SPARKLES = [
  [8, 12, 3.2, 0], [18, 30, 2.6, 0.7], [27, 8, 4.1, 1.3], [36, 22, 2.9, 0.2], [47, 6, 3.6, 1.9],
  [58, 18, 2.4, 0.9], [66, 9, 3.8, 0.4], [74, 28, 2.7, 1.6], [83, 14, 3.3, 1.1], [92, 24, 2.5, 0.5],
  [13, 46, 3.5, 1.0], [88, 44, 2.8, 1.8],
]

/** Stepped mountain silhouette: heights per column, drawn as a pixel staircase. */
const ridge = (heights, max) => {
  const step = 100 / heights.length
  let d = `M0 ${max} `
  heights.forEach((h, i) => {
    d += `L${(i * step).toFixed(2)} ${max - h} L${((i + 1) * step).toFixed(2)} ${max - h} `
  })
  return d + `L100 ${max} Z`
}
const FAR = ridge([6, 9, 13, 18, 22, 19, 15, 12, 16, 21, 26, 24, 20, 15, 11, 9, 12, 17, 23, 27, 25, 20, 16, 12, 9, 7, 10, 14, 18, 15, 11, 8], 30)
const NEAR = ridge([3, 5, 8, 12, 15, 13, 10, 7, 9, 13, 17, 20, 18, 14, 10, 7, 5, 8, 12, 16, 19, 17, 13, 9, 6, 4, 6, 9, 12, 10, 7, 4], 24)

export default function Hero() {
  const { hero, name } = PROFILE
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const yFar = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 140])
  const yNear = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 70])
  const fade = useTransform(scrollY, [0, 600], [1, 0.2])
  const project = featuredProject()

  const item = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="top" className="relative isolate flex min-h-[92vh] flex-col justify-center overflow-hidden pb-28 pt-32 sm:pb-36 sm:pt-40">
      <Backdrop yFar={yFar} yNear={yNear} />

      <motion.div style={{ opacity: fade }} className="container-x relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.p {...item(0)} className="flex flex-wrap items-center gap-3">
              <span className="px-chip bg-cloud">{name}</span>
              <span className="eyebrow">{hero.eyebrow}</span>
            </motion.p>
            <motion.h1
              {...item(1)}
              className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              {hero.headline}
            </motion.h1>
            <motion.p {...item(2)} className="mt-7 max-w-lg text-base leading-relaxed text-ink-2 sm:text-lg">
              {hero.intro}
            </motion.p>

            <motion.div {...item(3)} className="mt-9 flex flex-wrap items-center gap-4">
              <a href={hero.primaryButton.href} className="px-btn px-btn-primary">{hero.primaryButton.label}</a>
              <a href={hero.secondaryButton.href} className="px-btn px-btn-ghost">{hero.secondaryButton.label}</a>
            </motion.div>

            <motion.dl {...item(4)} className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t-2 border-ink/20 pt-6">
              {hero.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-pixel text-[9px] tracking-[0.18em] text-ink-2 uppercase">{f.label}</dt>
                  <dd className="mt-1.5 text-sm font-medium sm:text-base">{f.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {project && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:col-span-6"
            >
              <PixelCloud variant={1} className="absolute -left-10 top-6 w-24 opacity-90 sm:-left-16 sm:w-32" />
              <PixelCloud variant={0} className="absolute -right-6 -bottom-2 w-28 opacity-90 sm:-right-12 sm:w-40" />
              <a href="#featured" className="group relative block bob-slow">
                <PixelWindow label={project.title} badge={project.status} className="transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                  <img src={project.cover} alt={project.coverAlt ?? project.title} className={`object-cover ${project.pixelArt ? 'pixelated' : ''}`} style={{ aspectRatio: '1920 / 864' }} />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-deep via-deep/50 to-transparent p-5 text-cloud">
                    <div>
                      <p className="font-pixel text-[9px] tracking-[0.18em] text-pink uppercase">Flagship project</p>
                      <p className="mt-1 font-display text-2xl font-semibold leading-none tracking-tight">{project.title}</p>
                    </div>
                    <span className="px-btn px-btn-pink px-btn-sm">Press start</span>
                  </div>
                </PixelWindow>
              </a>
              <Island decor={['house', 'tree', 'person']} className="bob absolute -bottom-16 left-6 w-36 sm:-bottom-20 sm:w-44" style={{ '--delay': '-2s', filter: 'drop-shadow(6px 8px 0 rgba(27,42,102,0.18))' }} />
            </motion.div>
          )}
        </div>
      </motion.div>

      <a href="#featured" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-pixel text-[9px] tracking-[0.18em] text-ink-2 uppercase sm:flex">
        <span className="bob inline-block" style={{ '--bob': '2.4s' }}>▼</span> Descend
      </a>
    </section>
  )
}

/** Sparkles up high, two stepped mountain ridges with parallax, a cloud sea at the bottom. */
function Backdrop({ yFar, yNear }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {SPARKLES.map(([x, y, d, delay], i) => (
        <span key={i} className="sparkle" style={{ left: `${x}%`, top: `${y}%`, '--d': `${d}s`, '--delay': `${delay}s` }} />
      ))}
      <motion.svg style={{ y: yFar }} className="absolute inset-x-0 bottom-0 h-44 w-full sm:h-64" viewBox="0 0 100 30" preserveAspectRatio="none" shapeRendering="crispEdges">
        <path d={FAR} fill="#cbbcff" opacity="0.55" />
      </motion.svg>
      <motion.svg style={{ y: yNear }} className="absolute inset-x-0 bottom-0 h-32 w-full sm:h-48" viewBox="0 0 100 24" preserveAspectRatio="none" shapeRendering="crispEdges">
        <path d={NEAR} fill="#a99cff" opacity="0.5" />
      </motion.svg>
      <PixelCloud variant={2} className="absolute -bottom-3 -left-10 w-[42vw] min-w-[280px]" />
      <PixelCloud variant={0} className="absolute -bottom-4 left-[30%] w-[36vw] min-w-[240px]" />
      <PixelCloud variant={2} className="absolute -bottom-2 right-[-6%] w-[40vw] min-w-[260px]" />
    </div>
  )
}
