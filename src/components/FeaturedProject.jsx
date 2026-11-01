import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MediaGallery from './MediaGallery.jsx'
import Reveal from './Reveal.jsx'
import { projectHref } from '../lib/router.js'

/**
 * Case-study style block: project header, meta, then category tabs whose
 * content is a MediaGallery. Used on the homepage (featured slot) and on
 * the project page (with `full` for the longer layout).
 */
export default function FeaturedProject({ project, full = false }) {
  const sections = project.sections ?? []
  const [tab, setTab] = useState(sections[0]?.id ?? null)
  const current = sections.find((s) => s.id === tab) ?? sections[0]

  return (
    <article className="relative">
      {/* Header */}
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="media-frame group">
            <img src={project.cover} alt={project.coverAlt ?? project.title} className="aspect-video object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
              <div>
                {project.status && <p className="eyebrow mb-2">{project.status}</p>}
                <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
              </div>
              {!full && (
                <a
                  href={projectHref(project.id)}
                  className="hidden shrink-0 items-center gap-2 rounded-full border border-white/15 bg-ink/60 px-4 py-2 text-sm backdrop-blur transition hover:border-accent/50 hover:text-accent sm:inline-flex"
                >
                  Open case study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:col-span-5">
          <p className="text-lg leading-relaxed text-text/90">{project.tagline}</p>
          <div className="mt-6 space-y-4 text-muted">
            {(project.summary ?? []).map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 text-sm">
            <Meta label="Role" value={project.role} />
            <Meta label="Period" value={project.period} />
            <Meta label="Team" value={project.team} />
            <Meta label="Tech" value={project.tech?.join(' · ')} />
          </dl>

          {project.links?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition hover:border-white/25 hover:text-text">
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}

          {!full && (
            <a href={projectHref(project.id)} className="mt-6 inline-flex items-center gap-2 text-sm text-accent sm:hidden">
              Open case study →
            </a>
          )}
        </div>
      </Reveal>

      {full && project.highlights?.length > 0 && (
        <Reveal className="mt-14">
          <p className="eyebrow mb-4">What I did</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="glass flex gap-3 rounded-xl px-4 py-3 text-sm text-text/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {/* Category tabs */}
      {sections.length > 0 && (
        <div className="mt-14 sm:mt-20">
          <Reveal>
            <div className="flex items-center justify-between gap-4">
              <p className="eyebrow">Showcase</p>
              <p className="font-mono text-[11px] tracking-widest text-dim uppercase">
                {sections.length} {sections.length === 1 ? 'category' : 'categories'}
              </p>
            </div>
            <div className="mt-4 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0 [scrollbar-width:none]">
              <div role="tablist" aria-label="Showcase categories" className="flex w-max gap-1 rounded-full border border-line bg-ink-2/60 p-1 backdrop-blur">
                {sections.map((s) => {
                  const on = s.id === current?.id
                  return (
                    <button
                      key={s.id}
                      role="tab"
                      aria-selected={on}
                      type="button"
                      onClick={() => setTab(s.id)}
                      className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${on ? 'text-ink' : 'text-muted hover:text-text'}`}
                    >
                      {on && (
                        <motion.span
                          layoutId={`tab-${project.id}`}
                          className="absolute inset-0 rounded-full bg-text"
                          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                        />
                      )}
                      <span className="relative">{s.title}</span>
                      <span className={`relative ml-2 font-mono text-[10px] ${on ? 'text-ink/60' : 'text-dim'}`}>{s.media?.length ?? 0}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <div className="mb-8 max-w-2xl">
                  <h4 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{current.title}</h4>
                  {current.description && <p className="mt-2 text-muted">{current.description}</p>}
                </div>
                <MediaGallery items={current.media ?? []} emptyMessage={`${current.title} captures are coming soon.`} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </article>
  )
}

function Meta({ label, value }) {
  if (!value) return null
  return (
    <div>
      <dt className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">{label}</dt>
      <dd className="mt-1 text-text/90">{value}</dd>
    </div>
  )
}
