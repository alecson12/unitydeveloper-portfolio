import Reveal from './Reveal.jsx'
import Txt from './Txt.jsx'
import { PROFILE } from '../content/profile.js'
import { ABOUT } from '../content/about.js'
import { isPlaceholder, resolveAuto, shouldShow, shouldShowItem, isDraft } from '../lib/content.js'

/**
 * About Me, as one editorial spread:
 *   photo  |  name, headline, bio, facts
 *   experience rows · what I do · highlights · statement
 * Rules, not cards. Placeholders and unconfirmed items only show in preview.
 */
export default function AboutMe() {
  const { intro, name, title } = PROFILE
  const { background, services, highlights, notable, statement } = ABOUT
  const paragraphs = background.paragraphs.filter(shouldShow)
  const strengths = background.strengths.filter(shouldShow)
  const timeline = background.timeline.filter((t) => shouldShow(t.title) || shouldShow(t.place))
  const doList = services.filter(shouldShowItem)
  const stats = highlights.map((h) => ({ ...h, value: resolveAuto(h.value) })).filter((h) => shouldShow(h.value))
  const notes = notable.filter(shouldShow)
  const words = statement.filter(shouldShow)

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* ---- introduction ---- */}
      <Reveal>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[6px] bg-bg-2" style={{ aspectRatio: '4 / 5' }}>
              {intro.photo && (
                <img
                  src={intro.photo}
                  alt={intro.photoAlt ?? name}
                  width="1000"
                  height="1422"
                  className="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto max-w-none object-contain object-bottom"
                  fetchPriority="high"
                />
              )}
              <p className="label absolute left-5 top-5">{name}</p>
              <p className="label absolute right-5 top-5 hidden sm:block">{title}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="label">{intro.eyebrow}</p>
            <h3 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-balance sm:text-5xl xl:text-6xl">{intro.headline}</h3>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-2">
              <p className="text-ink">{intro.intro}</p>
              {paragraphs.map((p, i) => <Txt key={i} as="p" value={p} />)}
            </div>
            <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
              <Fact label="Role" value={title} />
              {intro.facts.map((f) => <Fact key={f.label} label={f.label} value={f.value} />)}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={intro.primaryButton.href} className="btn btn-primary">{intro.primaryButton.label} →</a>
              <a href={intro.secondaryButton.href} className="btn btn-ghost">{intro.secondaryButton.label}</a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---- experience + what I do ---- */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="label"><span className="text-accent">/</span>Experience</p>
          <ol className="rows mt-6">
            {timeline.map((t, i) => (
              <li key={i} className="row grid grid-cols-1 gap-2 sm:grid-cols-12 sm:gap-6">
                <Txt as="p" value={t.period} className="label sm:col-span-3" />
                <div className="sm:col-span-9">
                  <Txt as="p" value={t.title} className="font-display text-2xl font-bold tracking-tight" />
                  <Txt as="p" value={t.place} className="mt-1 text-ink-2" />
                  <Txt as="p" value={t.note} className="mt-3 max-w-xl text-sm leading-relaxed text-ink-2" />
                </div>
              </li>
            ))}
          </ol>
          {strengths.length > 0 && (
            <div className="mt-12">
              <p className="label">Strengths</p>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {strengths.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                    <span className="label mt-[3px]">{String(i + 1).padStart(2, '0')}</span>
                    <Txt value={s} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.08}>
          <p className="label"><span className="text-accent">/</span>What I do</p>
          <ul className="rows mt-6">
            {doList.map((s, i) => (
              <li key={s.id} className={`row flex items-baseline justify-between gap-6 !py-4 ${isDraft(s) ? 'placeholder-text' : ''}`}>
                <span className="font-display text-xl font-semibold tracking-tight">{s.name}</span>
                <span className="label">{isDraft(s) ? 'To confirm' : String(i + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* ---- highlights ---- */}
      {(stats.length > 0 || notes.length > 0) && (
        <Reveal>
          <p className="label"><span className="text-accent">/</span>Highlights</p>
          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {stats.map((h) => (
              <div key={h.label} className={`stat ${isPlaceholder(h.value) ? 'placeholder-text' : ''}`}>
                <dd className="font-display text-5xl font-extrabold leading-none tracking-[-0.04em] sm:text-6xl xl:text-7xl">{h.value}</dd>
                <dt className="mt-4 text-sm text-ink">{h.label}</dt>
                <Txt as="p" value={h.note} className="label mt-1.5" />
              </div>
            ))}
          </dl>
          {notes.length > 0 && (
            <ul className="mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
              {notes.map((n, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <Txt value={n} />
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      )}

      {/* ---- in my words ---- */}
      {words.length > 0 && (
        <Reveal>
          <div className="grid grid-cols-1 gap-6 border-t border-line pt-10 lg:grid-cols-12">
            <p className="label lg:col-span-3"><span className="text-accent">/</span>In my words</p>
            <div className="space-y-5 font-display text-2xl font-semibold leading-snug tracking-tight text-balance lg:col-span-8 xl:text-3xl">
              {words.map((p, i) => <Txt key={i} as="p" value={p} />)}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  )
}

function Fact({ label, value }) {
  if (!value) return null
  return (
    <div>
      <dt className="label">{label}</dt>
      <Txt as="dd" value={String(value)} className="mt-2 text-sm font-medium text-ink sm:text-base" />
    </div>
  )
}
