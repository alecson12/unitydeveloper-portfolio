import Reveal from './Reveal.jsx'
import Txt from './Txt.jsx'
import { PROFILE } from '../content/profile.js'
import { ABOUT } from '../content/about.js'
import { isDraft, shouldShowItem } from '../lib/content.js'

/**
 * Skills as a ruled list: each group is a row — name on the left, the
 * skills on the right. Then the tools, the same way, with their kind.
 * No levels, no bars: only what has been confirmed.
 */
export default function Skills() {
  const tools = ABOUT.tools.filter(shouldShowItem)
  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-7">
        <ol className="rows">
          {PROFILE.skills.map((g, i) => (
            <li key={g.group} className="row grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-6">
              <p className="label sm:col-span-1">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-display text-2xl font-bold tracking-tight sm:col-span-4">{g.group}</h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-ink-2 sm:col-span-7">
                {g.items.map((s) => <Txt key={s} as="li" value={s} className="text-base" />)}
              </ul>
            </li>
          ))}
        </ol>
      </Reveal>

      {tools.length > 0 && (
        <Reveal className="lg:col-span-5" delay={0.08}>
          <p className="label"><span className="text-accent">/</span>Tools</p>
          <ul className="rows mt-6">
            {tools.map((t) => (
              <li key={t.name} className={`row flex items-baseline justify-between gap-6 !py-3.5 ${isDraft(t) ? 'placeholder-text' : ''}`}>
                <span className="text-base text-ink">{t.name}</span>
                <span className="label">{isDraft(t) ? 'To confirm' : t.kind}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </div>
  )
}
