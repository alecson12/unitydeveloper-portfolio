import Reveal from './Reveal.jsx'
import EmptyState from './EmptyState.jsx'
import MediaGallery from './MediaGallery.jsx'
import PixelIcon from './PixelIcon.jsx'

/**
 * Gameplay / technical write-ups from src/content/showcases.js.
 * Shows an honest empty island until there are entries.
 */
export default function ShowcaseList({ entries = [], empty, icon = 'code' }) {
  if (!entries.length) return <EmptyState message={empty} />
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {entries.map((e, i) => (
        <Reveal key={e.id} delay={i * 0.06}>
          <article className="px-card h-full p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="px-card grid h-12 w-12 shrink-0 place-items-center"><PixelIcon name={icon} size={22} /></span>
              <div className="min-w-0">
                <h3 className="font-display text-2xl leading-none tracking-tight sm:text-3xl">{e.title}</h3>
                {e.summary && <p className="mt-3 leading-relaxed text-ink-2">{e.summary}</p>}
              </div>
            </div>
            {e.bullets?.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 gap-2">
                {e.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-pink" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {e.tech?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">{e.tech.map((t) => <span key={t} className="px-chip">{t}</span>)}</div>
            )}
            {e.media?.length > 0 && (
              <div className="mt-6 border-t-2 border-line pt-6">
                <MediaGallery items={e.media} label={e.title} />
              </div>
            )}
            {e.link?.href && (
              <a href={e.link.href} target="_blank" rel="noreferrer" className="px-btn px-btn-ghost px-btn-sm mt-6">
                {e.link.label ?? 'Open'} ▶
              </a>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  )
}
