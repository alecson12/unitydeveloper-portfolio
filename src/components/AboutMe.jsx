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
     <Intro />        one poster-like panel: the journey (work + school) on
                      the left, you in the shallows with your name large
                      behind you in the middle, strengths and who you are
                      on the right. On phones the columns stack, photo first.
     <Services />     what I do (confirmed items only in production)
     <Highlights />   big numbers + notable contributions
   ===================================================================== */

/** Who you are, on one screen. */
export function Intro() {
  const { intro, name, title } = PROFILE
  const { background, statement } = ABOUT
  const reduce = useReducedMotion()
  const paragraphs = background.paragraphs.filter(shouldShow)
  const strengths = background.strengths.filter(shouldShow)
  const statementParas = statement.filter(shouldShow)
  const [first, ...rest] = name.split(' ')
  const last = rest.length ? rest[rest.length - 1] : ''

  return (
    <Reveal>
      <article className="px-card overflow-hidden p-5 sm:p-8 lg:p-10 xl:p-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* ---- left: the journey ---- */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Journey timeline={background.timeline} education={background.education} />
          </div>

          {/* ---- centre: you, with your name behind you ---- */}
          <div className="@container relative order-first lg:order-none lg:col-span-4 lg:self-center xl:col-span-6">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 select-none text-center">
              <p className="font-pixel text-[13px] tracking-[0.6em] text-ink-2 uppercase sm:text-[15px]">{first}</p>
              <p className="font-display leading-[0.85] tracking-tight text-white/[0.08] uppercase" style={{ fontSize: 'clamp(56px, 27cqw, 170px)' }}>{last}</p>
              <p className="font-pixel text-[12px] tracking-[0.3em] text-red uppercase sm:text-[13px]">{title}</p>
            </div>

            <div className="relative mx-auto mt-[22%] max-w-[420px] sm:mt-[18%] lg:mt-[26%]">
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
              <div className="relative">
                {intro.photo && (
                  <img src={intro.photo} alt={intro.photoAlt ?? name} width="1000" height="1000" className="relative z-10 mx-auto block w-[82%]" fetchPriority="high" />
                )}
                {/* the sand you stand on, with plants in front */}
                <PixelSprite name="ledge" className="relative z-20 -mt-[13%] block w-full" />
                <PixelSprite name="kelp" className="sway absolute bottom-[6%] left-[5%] z-30 w-6 sm:w-7" style={{ animation: reduce ? 'none' : undefined }} />
                <PixelSprite name="seaweed" className="sway absolute bottom-[6%] right-[6%] z-30 w-8 sm:w-10" style={{ '--delay': '-3s', animation: reduce ? 'none' : undefined }} />
                <PixelSprite name="spire" className="absolute bottom-[5%] left-[-2%] z-[5] w-12 opacity-80 sm:w-14" />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a href={intro.primaryButton.href} className="px-btn px-btn-primary">{intro.primaryButton.label}</a>
              <a href={intro.secondaryButton.href} className="px-btn px-btn-ghost">{intro.secondaryButton.label}</a>
            </div>
          </div>

          {/* ---- right: strengths, then who you are ---- */}
          <div className="flex flex-col gap-6 lg:col-span-4 xl:col-span-3">
            {strengths.length > 0 && (
              <div className="px-card p-5 sm:p-6">
                <p className="eyebrow flex items-center gap-3 text-beige"><span className="inline-block h-2 w-2 bg-red" />Strengths</p>
                <ul className="mt-4 space-y-2.5">
                  {strengths.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-snug">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-red" />
                      <Txt value={s} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="px-card flex-1 p-5 sm:p-6">
              <p className="eyebrow flex items-center gap-3 text-beige"><span className="inline-block h-2 w-2 bg-red" />Who I am</p>
              <h2 className="mt-4 font-display text-3xl leading-[0.95] tracking-tight text-balance">{intro.headline}</h2>
              <dl className="mt-4 space-y-1">
                {intro.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline gap-2 font-pixel text-[12px] tracking-[0.06em] uppercase">
                    <dt className="text-dim">{f.label}</dt>
                    <dd className="text-beige">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-2">
                {paragraphs.map((p, i) => <Txt key={i} as="p" value={p} className={i === 0 ? 'text-ink' : ''} />)}
                {statementParas.map((p, i) => <Txt key={`s${i}`} as="p" value={p} />)}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

/** Work, newest first, then school. Pixel nodes down a line. */
function Journey({ timeline = [], education = [] }) {
  const work = timeline.filter((t) => shouldShow(t.title) || shouldShow(t.place) || shouldShow(t.note))
  const school = education.filter((e) => shouldShow(e.school))
  if (!work.length && !school.length) return null
  return (
    <div className="px-card h-full p-5 sm:p-6">
      <p className="eyebrow flex items-center gap-3 text-beige"><span className="inline-block h-2 w-2 bg-red" />My journey</p>
      <ol className="relative mt-5 space-y-5 border-l-2 border-line pl-5">
        {work.map((t, i) => (
          <li key={i} className="relative">
            <span className={`absolute -left-[27px] top-1 h-3 w-3 ${i === 0 ? 'bg-red' : 'bg-purple'}`} style={{ boxShadow: '0 0 0 2px var(--color-deep)' }} />
            <Txt as="p" value={t.title} className="text-sm font-medium leading-tight" />
            <Txt as="p" value={t.place} className="mt-0.5 text-xs leading-snug text-ink-2" />
            <Txt as="p" value={t.period} className="mt-1 font-pixel text-[11px] tracking-[0.08em] text-dim uppercase" />
          </li>
        ))}
      </ol>

      {school.length > 0 && (
        <>
          <p className="mt-8 font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">Education</p>
          <ol className="relative mt-4 space-y-4 border-l-2 border-line pl-5">
            {school.map((e, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[27px] top-1 h-3 w-3 bg-purple" style={{ boxShadow: '0 0 0 2px var(--color-deep)' }} />
                <p className="font-pixel text-[11px] tracking-[0.08em] text-dim uppercase">{e.level}</p>
                <Txt as="p" value={e.school} className="mt-0.5 text-sm font-medium leading-tight" />
                {e.course && <Txt as="p" value={e.course} className="mt-0.5 text-xs leading-snug text-ink-2 italic" />}
                <Txt as="p" value={e.period} className={`mt-1 font-pixel text-[11px] tracking-[0.08em] uppercase ${/graduat/i.test(e.period) ? 'text-beige' : 'text-dim'}`} />
              </li>
            ))}
          </ol>
        </>
      )}
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
            <h3 className="mt-5 font-display text-3xl leading-tight tracking-tight">{s.name}</h3>
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
