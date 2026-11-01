import MediaGallery from './MediaGallery.jsx'
import PixelWindow from './PixelWindow.jsx'
import Reveal from './Reveal.jsx'
import ComingSoon from './ComingSoon.jsx'
import { projectHref } from '../lib/router.js'

/**
 * A project shown as a list of UI screens. Each screen: name, purpose and
 * what it does on the left (sticky on desktop), its screenshots on the right.
 * Used on the homepage (featured slot) and on the project page (`full`).
 */
export default function UIShowcase({ project, full = false }) {
  const screens = project.screens ?? []

  return (
    <article>
      {/* Project header */}
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <PixelWindow label={project.title} badge={project.status}>
            <img src={project.cover} alt={project.coverAlt ?? project.title} className={`aspect-video object-cover ${project.pixelArt ? 'pixelated' : ''}`} />
          </PixelWindow>
        </div>
        <div className="flex flex-col justify-center lg:col-span-5">
          <h3 className="font-display text-3xl font-semibold leading-none tracking-tight sm:text-4xl">{project.title}</h3>
          <p className="mt-4 text-lg text-text/90">{project.tagline}</p>
          <div className="mt-5 space-y-3 text-muted">
            {(project.summary ?? []).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t-2 border-white/10 pt-6 text-sm">
            <Meta label="Role" value={project.role} />
            <Meta label="Period" value={project.period} />
            <Meta label="Tech" value={project.tech?.join(' · ')} />
          </dl>
          {!full && (
            <a href={projectHref(project.id)} className="px-btn px-btn-ghost mt-8 self-start">
              Open full page
              <Arrow />
            </a>
          )}
        </div>
      </Reveal>

      {/* Screens */}
      {screens.length === 0 ? (
        <div className="mt-16"><ComingSoon message="UI screens are being captured." /></div>
      ) : (
        <ol className="mt-20 space-y-24 sm:mt-28 sm:space-y-32">
          {screens.map((s, i) => (
            <li key={s.id} id={`${project.id}-${s.id}`} className="grid gap-8 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="eyebrow flex items-center gap-3">
                    <span className="inline-block h-2 w-2 bg-accent" />
                    Screen {String(i + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')}
                  </p>
                  <h4 className="mt-4 font-display text-3xl font-semibold leading-none tracking-tight sm:text-4xl">{s.name}</h4>
                  {s.purpose && <p className="mt-4 text-muted">{s.purpose}</p>}
                  {s.functions?.length > 0 && (
                    <>
                      <p className="mt-8 font-pixel text-[10px] tracking-[0.18em] text-dim uppercase">What it does</p>
                      <ul className="mt-3 space-y-2.5">
                        {s.functions.map((f, j) => (
                          <li key={j} className="flex gap-3 text-sm leading-relaxed text-text/90">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent-2" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </Reveal>
              <div className="lg:col-span-8">
                <MediaGallery
                  items={s.media ?? []}
                  label={s.name}
                  pixelated={project.pixelArt}
                  layout="stack"
                  emptyMessage={`${s.name} captures are coming soon.`}
                />
              </div>
            </li>
          ))}
        </ol>
      )}
    </article>
  )
}

function Meta({ label, value }) {
  if (!value) return null
  return (
    <div>
      <dt className="font-pixel text-[9px] tracking-[0.18em] text-dim uppercase">{label}</dt>
      <dd className="mt-1.5 text-text/90">{value}</dd>
    </div>
  )
}

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" shapeRendering="crispEdges" aria-hidden>
      <path d="M2 5h6V3h2v2h0v2H8v2H6V7H2z" />
    </svg>
  )
}
