import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PROFILE } from '../content/profile.js'
import { featuredProject } from '../lib/content.js'
import PixelWindow from './PixelWindow.jsx'

const STARS = [
  [6, 18, 3.2, 0], [14, 42, 2.6, 0.7], [22, 10, 4.1, 1.3], [31, 30, 2.9, 0.2], [40, 8, 3.6, 1.9],
  [52, 22, 2.4, 0.9], [61, 12, 3.8, 0.4], [70, 36, 2.7, 1.6], [79, 16, 3.3, 1.1], [88, 28, 2.5, 0.5],
  [94, 9, 4.0, 1.4], [47, 48, 3.1, 0.3], [84, 52, 2.8, 1.8], [10, 60, 3.5, 1.0], [66, 58, 2.6, 0.6],
]

export default function Hero() {
  const { hero } = PROFILE
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 60])
  const fade = useTransform(scrollY, [0, 500], [1, 0.3])
  const project = featuredProject()

  const item = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-40">
      <Backdrop />

      <motion.div style={{ y, opacity: fade }} className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.p {...item(0)} className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-2 w-2 bg-accent" />
              {hero.eyebrow}
            </motion.p>
            <motion.h1
              {...item(1)}
              className="font-display text-5xl font-semibold leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              {hero.headline}
            </motion.h1>
            <motion.p {...item(2)} className="mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {hero.intro}
            </motion.p>

            <motion.div {...item(3)} className="mt-9 flex flex-wrap items-center gap-4">
              <a href={hero.primaryButton.href} className="px-btn px-btn-primary">
                {hero.primaryButton.label}
              </a>
              <a href={hero.secondaryButton.href} className="px-btn px-btn-ghost">
                {hero.secondaryButton.label}
              </a>
            </motion.div>

            <motion.dl {...item(4)} className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t-2 border-white/10 pt-6">
              {hero.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-pixel text-[9px] tracking-[0.18em] text-dim uppercase">{f.label}</dt>
                  <dd className="mt-1.5 text-sm text-text sm:text-base">{f.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {project && (
            <motion.a
              href="#featured"
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="group block lg:col-span-6"
            >
              <PixelWindow label={project.title} badge={project.status} className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <img src={project.cover} alt={project.coverAlt ?? project.title} className={`aspect-video object-cover ${project.pixelArt ? 'pixelated' : ''}`} />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink via-ink/60 to-transparent p-5">
                  <div>
                    <p className="eyebrow mb-1.5">Featured</p>
                    <p className="font-display text-2xl font-semibold leading-none tracking-tight">{project.title}</p>
                  </div>
                  <span className="px-btn px-btn-primary !px-3 !py-2 opacity-0 transition group-hover:opacity-100">Press start</span>
                </div>
              </PixelWindow>
            </motion.a>
          )}
        </div>
      </motion.div>

      <div className="container-x mt-24 sm:mt-32">
        <div className="hairline" />
      </div>
    </section>
  )
}

/** Night sky: pixel stars, a dithered horizon glow and a faint grid. */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {STARS.map(([x, yy, d, delay], i) => (
        <span key={i} className="star" style={{ left: `${x}%`, top: `${yy}%`, '--d': `${d}s`, '--delay': `${delay}s`, opacity: 0.5 }} />
      ))}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(255,209,102,0.07))',
        }}
      />
      <div
        className="dither absolute inset-x-0 bottom-0 h-[40%] opacity-[0.05]"
        style={{
          maskImage: 'linear-gradient(180deg, transparent, black 70%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, black 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)',
        }}
      />
    </div>
  )
}
