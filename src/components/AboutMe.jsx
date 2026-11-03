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
     <Intro />        one poster-like panel: who I am and the work journey on
                      the left, you in the shallows with your name large
                      behind you in the middle, education and strengths on
                      the right. Lists run oldest → latest. Phones stack, photo first.
     <Services />     what I do (confirmed items only in production)
     <Highlights />   big numbers + notable contributions
   ===================================================================== */

/** A small inset panel with a red-marked beige eyebrow. */
function Panel({ label, className = '', children }) {
  return (
    <div className={`px-card px-solid p-5 ${className}`}>
      <p className="eyebrow flex items-center gap-3 text-beige"><span className="inline-block h-2 w-2 bg-red" />{label}</p>
      {children}
    </div>
  )
}

/** Light from the surface: rays down the whole panel, and a fish passing. */
function Light({ reduce }) {
  const rays = [
    { left: '4%', width: '12%', skew: -16, delay: 0 },
    { left: '20%', width: '20%', skew: -10, delay: 2.5 },
    { left: '44%', width: '18%', skew: 4, delay: 1 },
    { left: '63%', width: '14%', skew: 12, delay: 3.5 },
    { left: '82%', width: '12%', skew: 18, delay: 5 },
  ]
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden" style={{ borderRadius: 'inherit' }}>
      {rays.map((r, i) => (
        <span key={i} className="ray" style={{ left: r.left, width: r.width, transform: `skewX(${r.skew}deg)`, '--delay': `${r.delay}s`, animation: reduce ? 'none' : undefined }} />
      ))}
      <div className="absolute left-0 top-[46%] w-full" style={{ height: 28 }}>
        <div className="swim swim-r h-full" style={{ '--dur': '40s', '--delay': '-9s', animation: reduce ? 'none' : undefined, left: reduce ? '10%' : undefined }}>
          <PixelSprite name="reef" flip className="w-8 opacity-70" />
        </div>
      </div>
    </div>
  )
}

/** Your name, large and faded, with your first name small above it. */
function Name({ first, last }) {
  return (
    <div aria-hidden className="pointer-events-none select-none text-center">
      <p className="font-pixel text-[13px] tracking-[0.6em] text-red uppercase sm:text-[15px]" style={{ textShadow: '0 0 12px rgba(217,38,28,0.45)' }}>{first}</p>
      <p className="name-glow font-display leading-[0.85] tracking-tight text-white uppercase" style={{ fontSize: 'clamp(56px, 27cqw, 190px)' }}>{last}</p>
    </div>
  )
}

/** The sand you stand on, with plants in front. `plants` can be hidden where they would land on you. */
function Ledge({ reduce, plants = '' }) {
  return (
    <>
      <PixelSprite name="ledge" className="absolute inset-x-0 bottom-0 z-20 block w-full" />
      <PixelSprite name="kelp" className={`sway absolute bottom-[6%] left-[5%] z-30 w-6 sm:w-8 ${plants}`} style={{ animation: reduce ? 'none' : undefined }} />
      <PixelSprite name="seaweed" className={`sway absolute bottom-[6%] right-[6%] z-30 w-8 sm:w-12 ${plants}`} style={{ '--delay': '-3s', animation: reduce ? 'none' : undefined }} />
      <PixelSprite name="spire" className={`absolute bottom-[5%] left-[-2%] z-[5] w-12 opacity-80 sm:w-16 ${plants}`} />
    </>
  )
}

/** Who you are, on one screen. */
export function Intro() {
  const { intro, name } = PROFILE
  const { background, statement } = ABOUT
  const reduce = useReducedMotion()
  const paragraphs = background.paragraphs.filter(shouldShow)
  const strengths = background.strengths.filter(shouldShow)
  const statementParas = statement.filter(shouldShow)
  const [first, ...rest] = name.split(' ')
  const last = rest.length ? rest[rest.length - 1] : ''
  const alt = intro.photoAlt ?? name

  return (
    <Reveal>
      <article className="@container px-card relative overflow-hidden p-5 sm:p-8">
        <Light reduce={reduce} />

        <div className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6 xl:gap-8">
          {/* ---- left: who I am, then the journey ---- */}
          <div className="relative z-10 flex flex-col gap-5 lg:col-span-4 xl:col-span-3">
            <Panel label="Who I am">
              <h2 className="mt-3 font-display text-2xl leading-[0.95] tracking-tight text-balance xl:text-3xl">{intro.headline}</h2>
              <dl className="mt-4 space-y-1">
                {intro.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline gap-2 font-pixel text-[12px] tracking-[0.06em] uppercase">
                    <dt className="text-dim">{f.label}</dt>
                    <dd className="text-beige">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-ink-2">
                {paragraphs.map((p, i) => <Txt key={i} as="p" value={p} className={i === 0 ? 'text-ink' : ''} />)}
                {statementParas.map((p, i) => <Txt key={`s${i}`} as="p" value={p} />)}
              </div>
            </Panel>
            <Journey items={background.timeline} cta={intro.primaryButton} />
          </div>

          {/* ---- landscape centre: you, your name behind your head, no taller than the screen ---- */}
          <div className="@container relative z-0 order-first flex flex-col lg:order-none lg:col-span-4 lg:-mb-8 lg:min-h-0 xl:col-span-6 xl:mb-0">
            <div className="relative"><Name first={first} last={last} /></div>
            <div className="relative -mt-[14%] flex flex-1 items-end justify-center pb-[7%] lg:-mt-[18%]">
              {intro.photo && (
                <img src={intro.photo} alt={alt} width="1200" height="1200" className="about-photo relative z-10 block w-full" fetchPriority="high" />
              )}
              <Ledge reduce={reduce} plants="lg:hidden xl:block" />
            </div>
          </div>

          {/* ---- right: education, then strengths with the buttons ---- */}
          <div className="relative z-10 flex flex-col gap-5 lg:col-span-4 xl:col-span-3">
            <Education items={background.education} />
            <Panel label="Strengths" className="flex flex-1 flex-col">
              {strengths.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {strengths.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-snug">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-red" />
                      <Txt value={s} />
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex flex-1 flex-col items-center justify-end gap-3">
                <a href={intro.primaryButton.href} className="px-btn px-btn-primary lg:hidden">{intro.primaryButton.label}</a>
                <a href={intro.secondaryButton.href} className="px-btn px-btn-ghost">{intro.secondaryButton.label}</a>
              </div>
            </Panel>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

/** A pixel node on the timeline's line. The latest entry (last) is red. */
function Node({ latest }) {
  return <span className={`absolute -left-[27px] top-1 h-3 w-3 ${latest ? 'bg-red' : 'bg-purple'}`} style={{ boxShadow: '0 0 0 2px var(--color-deep)' }} />
}

/** Work, oldest at the top, latest at the bottom. */
function Journey({ items = [], cta }) {
  const work = items.filter((t) => shouldShow(t.title) || shouldShow(t.place) || shouldShow(t.note))
  if (!work.length) return null
  return (
    <Panel label="My journey" className="flex flex-1 flex-col">
      <ol className="relative mt-4 space-y-4 border-l-2 border-line pl-5">
        {work.map((t, i) => (
          <li key={i} className="relative">
            <Node latest={i === work.length - 1} />
            <Txt as="p" value={t.title} className="text-sm font-medium leading-tight" />
            <Txt as="p" value={t.place} className="mt-0.5 text-xs leading-snug text-ink-2" />
            <Txt as="p" value={t.period} className="mt-1 font-pixel text-[11px] tracking-[0.08em] text-dim uppercase" />
          </li>
        ))}
      </ol>
      {cta && (
        <div className="mt-6 hidden flex-1 items-end justify-center lg:flex">
          <a href={cta.href} className="px-btn px-btn-primary">{cta.label}</a>
        </div>
      )}
    </Panel>
  )
}

/** School, oldest at the top, latest at the bottom. */
function Education({ items = [] }) {
  const school = items.filter((e) => shouldShow(e.school))
  if (!school.length) return null
  return (
    <Panel label="Education">
      <ol className="relative mt-4 space-y-3.5 border-l-2 border-line pl-5">
        {school.map((e, i) => (
          <li key={i} className="relative">
            <Node latest={i === school.length - 1} />
            <p className="font-pixel text-[11px] tracking-[0.08em] text-dim uppercase">{e.level}</p>
            <Txt as="p" value={e.school} className="mt-0.5 text-sm font-medium leading-tight" />
            {e.course && <Txt as="p" value={e.course} className="mt-0.5 text-xs leading-snug text-ink-2 italic" />}
            <Txt as="p" value={e.period} className={`mt-1 font-pixel text-[11px] tracking-[0.08em] uppercase ${/graduat/i.test(e.period) ? 'text-beige' : 'text-dim'}`} />
          </li>
        ))}
      </ol>
    </Panel>
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
