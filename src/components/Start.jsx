import { motion, useReducedMotion } from 'framer-motion'
import { PROFILE } from '../content/profile.js'
import { shouldShow } from '../lib/content.js'

/**
 * The opening screen: the wordmark, alone, with room to breathe.
 * A status line top-left, location and year bottom-right, a scroll hint.
 */
export default function Start() {
  const { start, contact, intro } = PROFILE
  const reduce = useReducedMotion()
  const availability = shouldShow(contact.availability) ? contact.availability : ''
  const based = intro.facts.find((f) => /based/i.test(f.label))?.value
  const year = new Date().getFullYear()

  return (
    <section id="start" className="relative flex min-h-[100svh] flex-col">
      <div className="container-x flex flex-1 flex-col pb-10 pt-28 sm:pb-12 sm:pt-32">
        {availability && (
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="label flex items-center gap-2.5"
          >
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {availability}
          </motion.p>
        )}

        <div className="flex flex-1 items-center justify-center py-10">
          <motion.img
            src={start.wordmark}
            alt={start.wordmarkAlt}
            width="2000"
            height="647"
            fetchPriority="high"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-auto w-full max-w-[1180px] select-none"
            draggable="false"
          />
        </div>

        <div className="flex items-end justify-between gap-6">
          <a href="#about" className="label flex items-center gap-4 transition hover:text-ink">
            <span className="relative block h-10 w-px overflow-hidden bg-line-2">
              <span className="scroll-hint absolute inset-0 bg-ink" />
            </span>
            {start.hint}
          </a>
          <p className="label text-right">
            {based && <span>{based}</span>}
            {based && <span className="mx-3 text-line-2">·</span>}
            <span>{year}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
