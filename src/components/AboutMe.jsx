import { useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Txt from './Txt.jsx'
import PixelIcon from './PixelIcon.jsx'
import PixelSprite from './PixelSprite.jsx'
import { PROFILE } from '../content/profile.js'
import { ABOUT } from '../content/about.js'
import { isPlaceholder, resolveAuto, shouldShow, shouldShowItem, isDraft } from '../lib/content.js'

/* =====================================================================
   The About Me blocks, each one a dark panel:
     <Intro />        photo in the shallows + name, headline, facts
     <Background />   paragraphs + timeline + strengths + statement
     <Services />     what I do (confirmed items only in production)
     <Highlights />   big numbers + notable contributions
   ===================================================================== */

/** The first thing under the surface: you, standing in the shallows, and who you are. */
export function Intro() {
  const { intro, name, title } = PROFILE
  const reduce = useReducedMotion()
  return (
    <Reveal>
      <article className="px-card overflow-hidden p-5 sm:p-8 lg:p-10 xl:p-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* ---- the photo, in the water ---- */}
          <div className="order-first lg:col-span-5">
            <div className="relative mx-auto max-w-[400px]">
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                {/* light from above */}
                <span className="ray" style={{ left: '18%', width: '22%', transform: 'skewX(-14deg)', '--delay': '0s', animation: reduce ? 'none' : undefined }} />
                <span className="ray" style={{ left: '52%', width: '16%', transform: 'skewX(10deg)', '--delay': '2s', animation: reduce ? 'none' : undefined }} />
                <span className="ray" style={{ left: '72%', width: '10%', transform: 'skewX(18deg)', '--delay': '3.5s', animation: reduce ? 'none' : undefined }} />
                {/* a fish passing behind */}
                <div className="absolute left-0 top-[42%] w-full" style={{ height: 28 }}>
                  <div className="swim swim-r h-full" style={{ '--dur': '34s', '--delay': '-9s', animation: reduce ? 'none' : undefined, left: reduce ? '10%' : undefined }}>
                    <PixelSprite name="reef" flip className="w-8 opacity-70" />
                  </div>
                </div>
              </div>
              <div className="relative pt-6">
                {intro.photo && (
                  <img src={intro.photo} alt={intro.photoAlt ?? name} width="1000" height="1422" className="relative z-10 mx-auto block w-[78%]" fetchPriority="high" />
                )}
                {/* the sand you stand on, with plants in front */}
                <PixelSprite name="ledge" className="relative z-20 -mt-[13%] block w-full" />
                <PixelSprite name="kelp" className="sway absolute bottom-[6%] left-[5%] z-30 w-6 sm:w-7" style={{ animation: reduce ? 'none' : undefined }} />
                <PixelSprite name="seaweed" className="sway absolute bottom-[6%] right-[6%] z-30 w-8 sm:w-10" style={{ '--delay': '-3s', animation: reduce ? 'none' : undefined }} />
                <PixelSprite name="spire" className="absolute bottom-[5%] left-[-2%] z-[5] w-12 opacity-80 sm:w-14" />
              </div>
            </div>
          </div>

          {/* ---- who you are ---- */}
          <div className="lg:col-span-7">
            <p className="flex flex-wrap items-center gap-3">
              <span className="px-chip">{name}</span>
              <span className="eyebrow">{intro.eyebrow}</span>
            </p>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-balance sm:text-6xl xl:text-7xl">{intro.headline}</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">{intro.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={intro.primaryButton.href} className="px-btn px-btn-primary">{intro.primaryButton.label}</a>
              <a href={intro.secondaryButton.href} className="px-btn px-btn-ghost">{intro.secondaryButton.label}</a>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <dt className="font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">Role</dt>
                <dd className="mt-1.5 text-sm font-medium sm:text-base">{title}</dd>
              </div>
              {intro.facts.slice(0, 2).map((f) => (
                <div key={f.label}>
                  <dt className="font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">{f.label}</dt>
                  <dd className="mt-1.5 text-sm font-medium sm:text-base">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

/** Professional background: story on the left, timeline on the right, statement across the bottom. */
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
            <p className="eyebrow flex items-center gap-3"><span className="inline-block h-2 w-2 bg-red" />Experience</p>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink-2">
              {paragraphs.map((p, i) => <Txt key={i} as="p" value={p} className={i === 0 ? 'text-ink' : ''} />)}
            </div>

            {strengths.length > 0 && (
              <div className="mt-10 border-t border-line pt-8">
                <p className="font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">Strengths</p>
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
          <div className="mt-10 border-t border-line pt-8 lg:mt-12">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="eyebrow flex items-center gap-3"><span className="inline-block h-2 w-2 bg-red" />In my words</p>
                <PixelSprite name="turtle" className="bob mt-6 hidden w-28 opacity-80 lg:block" />
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
      <p className="font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">Timeline</p>
      <ol className="relative mt-5 space-y-6 border-l-2 border-line pl-6">
        {visible.map((t, i) => (
          <li key={i} className="relative">
            <span className={`absolute -left-[31px] top-1 h-3 w-3 ${i === 0 ? 'bg-pink' : 'bg-purple'}`} style={{ boxShadow: '0 0 0 2px var(--color-deep)' }} />
            <Txt as="p" value={t.period} className="font-pixel text-[12px] tracking-[0.08em] text-dim uppercase" />
            <Txt as="p" value={t.title} className="mt-1 font-display text-2xl leading-tight text-beige" />
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
              <span className="px-card grid h-12 w-12 shrink-0 place-items-center"><PixelIcon name={s.icon} size={22} accent="#9fb4dc" /></span>
              {isDraft(s) && <span className="px-chip">To confirm</span>}
            </div>
            <h3 className="mt-5 font-display text-3xl leading-tight tracking-tight text-beige">{s.name}</h3>
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
            <p className="eyebrow flex items-center gap-3"><span className="inline-block h-2 w-2 bg-red" />Highlights</p>
            <dl className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {stats.map((h) => (
                <div key={h.label} className={`px-card p-4 ${isPlaceholder(h.value) ? 'placeholder-text' : ''}`}>
                  <dd className="font-display text-5xl leading-none tracking-tight text-beige sm:text-6xl">{h.value}</dd>
                  <dt className="mt-3 text-sm leading-snug">{h.label}</dt>
                  <Txt as="p" value={h.note} className="mt-1 font-pixel text-[13px] tracking-[0.06em] text-dim uppercase" />
                </div>
              ))}
            </dl>
          </div>
          {notable.length > 0 && (
            <div className="lg:col-span-5">
              <p className="font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">Notable contributions</p>
              <ul className="mt-4 space-y-3">
                {notable.map((n, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <PixelIcon name="star" size={14} accent="var(--color-gold)" className="mt-0.5 shrink-0 text-gold" />
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
