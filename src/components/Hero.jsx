import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PROFILE } from '../content/profile.js'
import { featuredProject } from '../lib/content.js'

export default function Hero() {
  const { hero } = PROFILE
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 80])
  const fade = useTransform(scrollY, [0, 500], [1, 0.25])
  const project = featuredProject()

  const item = (i) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      <Backdrop />

      <motion.div style={{ y, opacity: fade }} className="container-x relative">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p {...item(0)} className="eyebrow mb-6">{hero.eyebrow}</motion.p>
            <motion.h1
              {...item(1)}
              className="font-display text-[2.4rem] font-semibold leading-[1.04] tracking-tight text-balance sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem]"
            >
              <span className="text-gradient">{hero.headline}</span>
            </motion.h1>
            <motion.p {...item(2)} className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {hero.intro}
            </motion.p>

            <motion.div {...item(3)} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={hero.primaryButton.href}
                className="group inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-white"
              >
                {hero.primaryButton.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-y-0.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
              </a>
              <a
                href={hero.secondaryButton.href}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-text transition hover:border-white/25 hover:bg-white/5"
              >
                {hero.secondaryButton.label}
              </a>
            </motion.div>

            <motion.dl {...item(4)} className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {hero.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">{f.label}</dt>
                  <dd className="mt-1 text-sm text-text sm:text-base">{f.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Featured project teaser card */}
          {project && (
            <motion.a
              href="#featured"
              initial={reduce ? false : { opacity: 0, y: 40, rotateX: 6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative lg:col-span-5"
              style={{ perspective: 1200 }}
            >
              <div className="media-frame transition duration-700 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-glow)]">
                <img src={project.cover} alt={project.coverAlt ?? project.title} className="aspect-video object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="eyebrow mb-2">Featured · {project.status}</p>
                  <p className="font-display text-xl font-semibold tracking-tight">{project.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{project.tagline}</p>
                </div>
              </div>
              <span className="absolute -right-3 -top-3 hidden rounded-full border border-line bg-ink-2 px-3 py-1 font-mono text-[10px] tracking-widest text-muted uppercase sm:block">
                Case study
              </span>
            </motion.a>
          )}
        </div>
      </motion.div>

      <div className="container-x mt-20 sm:mt-28">
        <div className="hairline" />
      </div>
    </section>
  )
}

/** Cinematic lighting behind the hero: beams, a horizon glow and a faint grid. */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(900px 500px at 70% 0%, rgba(124,196,255,0.16), transparent 60%), radial-gradient(700px 420px at 10% 20%, rgba(198,163,255,0.12), transparent 65%)',
        }}
      />
      <motion.div
        className="absolute -top-40 left-1/2 h-[560px] w-[1200px] -translate-x-1/2 rotate-[-8deg] opacity-40 blur-3xl"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,196,255,0.25), rgba(198,163,255,0.18), transparent)' }}
        animate={{ x: ['-52%', '-48%', '-52%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black, transparent)',
        }}
      />
    </div>
  )
}
