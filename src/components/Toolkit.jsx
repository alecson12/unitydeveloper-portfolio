import Reveal from './Reveal.jsx'
import EmptyIsland from './EmptyIsland.jsx'
import MediaGallery from './MediaGallery.jsx'
import PixelIcon from './PixelIcon.jsx'
import { ABOUT } from '../content/about.js'

/* Sample cards shown ONLY in local preview while the toolkit list is empty,
   so the layout can be judged. Clearly marked; never published. */
const SAMPLES = [
  { id: 'sample-1', kind: 'Editor extension', name: '[Sample — an editor tool]', summary: '[What it does and why you built it.]', tech: ['Unity', 'C#'] },
  { id: 'sample-2', kind: 'Reusable system', name: '[Sample — a reusable system]', summary: '[What it does and where it was used.]', tech: ['C#'] },
  { id: 'sample-3', kind: 'Utility', name: '[Sample — a utility or automation]', summary: '[The problem it removed from your day.]', tech: ['Unity'] },
]

const ICON = { 'editor extension': 'gear', 'reusable system': 'code', utility: 'map', automation: 'controller' }

/** Tools you built for your own workflow, as cards. */
export default function Toolkit({ empty }) {
  const real = ABOUT.toolkit ?? []
  const draft = real.length === 0 && import.meta.env.DEV
  const entries = real.length ? real : draft ? SAMPLES : []
  if (!entries.length) return <EmptyIsland message={empty} />

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {entries.map((t, i) => (
        <Reveal key={t.id} delay={i * 0.06}>
          <article className={`px-card px-card-lift flex h-full flex-col p-6 ${draft ? 'placeholder-text' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <span className="px-card grid h-12 w-12 shrink-0 place-items-center">
                <PixelIcon name={ICON[(t.kind ?? '').toLowerCase()] ?? 'code'} size={22} accent="#ffb6d8" />
              </span>
              <span className="px-chip">{draft ? 'Sample · preview only' : t.kind}</span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight">{t.name}</h3>
            {t.summary && <p className="mt-3 text-sm leading-relaxed text-ink-2">{t.summary}</p>}
            {t.bullets?.length > 0 && (
              <ul className="mt-4 grid grid-cols-1 gap-2">
                {t.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-pink" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {t.media?.length > 0 && (
              <div className="mt-5 border-t-2 border-line pt-5">
                <MediaGallery items={t.media} label={t.name} />
              </div>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
              {(t.tech ?? []).map((x) => <span key={x} className="px-chip">{x}</span>)}
              {t.link?.href && (
                <a href={t.link.href} target="_blank" rel="noreferrer" className="px-btn px-btn-ghost px-btn-sm ml-auto">
                  {t.link.label ?? 'Open'} ▶
                </a>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
