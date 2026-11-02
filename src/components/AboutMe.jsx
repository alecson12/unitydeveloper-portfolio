import Reveal from './Reveal.jsx'
import Txt from './Txt.jsx'
import PixelIcon from './PixelIcon.jsx'
import Island from './Island.jsx'
import { ABOUT } from '../content/about.js'
import { isPlaceholder, resolveAuto, shouldShow, shouldShowItem, isDraft } from '../lib/content.js'

/* =====================================================================
   The About Me blocks, each one a dark panel:
     <Background />   paragraphs + timeline + strengths + statement
     <Services />     what I do (confirmed items only in production)
     <Highlights />   big numbers + notable contributions
   ===================================================================== */

/** Professional background: story on the left, timeline and strengths on the right, statement across the bottom. */
export function Background() {
  const { background, statement } = ABOUT
  const paragraphs = background.paragraphs.filter(shouldShow)
  const strengths = background.strengths.filter(shouldShow)
  const statementParas = statement.filter(shouldShow)

  return (
    <Reveal>
      <article className="px-card p-5 sm:p-8 lg:p-10 xl:p-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3"><span className="inline-block h-2 w-2 bg-purple" />Experience</p>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink-2">
              {paragraphs.map((p, i) => <Txt key={i} as="p" value={p} className={i === 0 ? 'text-ink' : ''} />)}
            </div>

            {strengths.length > 0 && (
              <div className="mt-10 border-t-2 border-line pt-8">
                <p className="font-pixel text-[10px] tracking-[0.18em] text-dim uppercase">Strengths</p>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {strengths.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-pink" />
                      <Txt value={s} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <Timeline items={background.timeline} />
          </div>
        </div>

        {statementParas.length > 0 && (
          <div className="mt-10 border-t-2 border-line pt-8 lg:mt-12">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="eyebrow flex items-center gap-3"><span className="inline-block h-2 w-2 bg-purple" />In my words</p>
                <Island decor={['person', 'flag']} className="bob mt-6 hidden w-28 lg:block" />
              </div>
              <div className="space-y-4 text-lg leading-relaxed lg:col-span-9 lg:max-w-3xl">
                {statementParas.map((p, i) => <Txt key={i} as="p" value={p} />)}
              </div>
            </div>
          </div>
        )}
      </article>
    </Reveal>
  )
}

/** A vertical timeline with pixel nodes. Newest first. */
function Timeline({ items = [] }) {
  const visible = items.filter((t) => shouldShow(t.title) || shouldShow(t.place) || shouldShow(t.note))
  if (!visible.length) return null
  return (
    <div className="px-card h-full p-5 sm:p-6">
      <p className="font-pixel text-[10px] tracking-[0.18em] text-dim uppercase">Timeline</p>
      <ol className="relative mt-5 space-y-6 border-l-2 border-line pl-6">
        {visible.map((t, i) => (
          <li key={i} className="relative">
            <span className={`absolute -left-[31px] top-1 h-3 w-3 ${i === 0 ? 'bg-pink' : 'bg-purple'}`} style={{ boxShadow: '0 0 0 2px var(--color-deep)' }} />
            <Txt as="p" value={t.period} className="font-pixel text-[9px] tracking-[0.16em] text-dim uppercase" />
            <Txt as="p" value={t.title} className="mt-1 font-display text-xl font-semibold leading-tight" />
            <Txt as="p" value={t.place} className="text-sm text-ink-2" />
            <Txt as="p" value={t.note} className="mt-1.5 text-sm leading-relaxed" />
          </li>
        ))}
      </ol>
    </div>
  )
}

/** What I do: one card per service. Unconfirmed services only appear in local preview, marked. */
export function Services() {
  const items = ABOUT.services.filter(shouldShowItem)
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((s, i) => (
        <Reveal key={s.id} delay={Math.min(i * 0.05, 0.3)}>
          <article className={`px-card px-card-lift h-full p-6 ${isDraft(s) ? 'placeholder-text' : ''}`}>
            <div className="flex items-start justify-between gap-3">
              <span className="px-card grid h-12 w-12 shrink-0 place-items-center"><PixelIcon name={s.icon} size={22} accent="#ffb6d8" /></span>
              {isDraft(s) && <span className="px-chip">To confirm</span>}
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight">{s.name}</h3>
            {s.blurb && <p className="mt-3 text-sm leading-relaxed text-ink-2">{s.blurb}</p>}
          </article>
        </Reveal>
      ))}
    </div>
  )
}

/** Big numbers and notable contributions. */
export function Highlights() {
  const stats = ABOUT.highlights
    .map((h) => ({ ...h, value: resolveAuto(h.value) }))
    .filter((h) => shouldShow(h.value))
  const notable = ABOUT.notable.filter(shouldShow)
  if (!stats.length && !notable.length) return null

  return (
    <Reveal>
      <div className="px-card p-5 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3"><span className="inline-block h-2 w-2 bg-purple" />Highlights</p>
            <dl className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {stats.map((h) => (
                <div key={h.label} className={`px-card p-4 ${isPlaceholder(h.value) ? 'placeholder-text' : ''}`}>
                  <dd className="font-display text-4xl font-semibold leading-none tracking-tight text-pink sm:text-5xl">{h.value}</dd>
                  <dt className="mt-3 text-sm leading-snug">{h.label}</dt>
                  <Txt as="p" value={h.note} className="mt-1 font-pixel text-[8px] tracking-[0.14em] text-dim uppercase" />
                </div>
              ))}
            </dl>
          </div>
          {notable.length > 0 && (
            <div className="lg:col-span-5">
              <p className="font-pixel text-[10px] tracking-[0.18em] text-dim uppercase">Notable contributions</p>
              <ul className="mt-4 space-y-3">
                {notable.map((n, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <PixelIcon name="star" size={14} accent="#ffd166" className="mt-0.5 shrink-0 text-pink" />
                    <Txt value={n} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}
