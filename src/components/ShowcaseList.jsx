import Reveal from './Reveal.jsx'
import EmptyState from './EmptyState.jsx'
import MediaGallery from './MediaGallery.jsx'

/** Gameplay / technical write-ups from src/content/showcases.js, as ruled rows. */
export default function ShowcaseList({ entries = [], empty }) {
  if (!entries.length) return <EmptyState message={empty} />
  return (
    <div className="rows">
      {entries.map((e, i) => (
        <Reveal key={e.id} delay={i * 0.06}>
          <article className="row grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="label">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight">{e.title}</h3>
              {e.summary && <p className="mt-4 leading-relaxed text-ink-2">{e.summary}</p>}
              {e.bullets?.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {e.tech?.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{e.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>}
              {e.link?.href && (
                <a href={e.link.href} target="_blank" rel="noreferrer" className="label mt-6 inline-block transition hover:text-ink">{e.link.label ?? 'Open'} ↗</a>
              )}
            </div>
            <div className="lg:col-span-8">
              {e.media?.length > 0 && <MediaGallery items={e.media} label={e.title} />}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
