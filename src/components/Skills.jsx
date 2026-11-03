import Reveal from './Reveal.jsx'
import Txt from './Txt.jsx'
import { PROFILE } from '../content/profile.js'
import { ABOUT } from '../content/about.js'
import { isDraft, shouldShowItem } from '../lib/content.js'

/**
 * Skills & expertise: the tool stack as tiles (unconfirmed tools only in
 * local preview, marked), then the skill groups from profile.js.
 */
/** Two-letter badge: initials when the name has them (GitHub → GH, Visual Studio → VS), else the first two letters. */
const abbr = (name) => { const caps = name.replace(/[^A-Z#+]/g, ''); return (caps.length >= 2 ? caps : name.replace(/[^A-Za-z#+]/g, '')).slice(0, 2) }

export default function Skills() {
  const tools = ABOUT.tools.filter(shouldShowItem)
  return (
    <div className="space-y-6">
      {tools.length > 0 && (
        <Reveal>
          <div className="px-card p-5 sm:p-8">
            <p className="eyebrow flex items-center gap-3"><span className="inline-block h-2 w-2 bg-purple" />Tools & technologies</p>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
              {tools.map((t) => (
                <li key={t.name} className={`px-card px-card-lift flex flex-col items-start gap-4 p-4 ${isDraft(t) ? 'placeholder-text' : ''}`}>
                  <span className="grid h-11 w-11 place-items-center bg-white/10 px-border font-display text-xl" style={{ '--px-c': 'rgba(255,255,255,0.25)' }}>
                    {t.icon
                      ? <span className="tool-icon block h-7 w-7" style={{ '--icon': `url(${t.icon})` }} />
                      : abbr(t.name)}
                  </span>
                  <span>
                    <span className="block font-display text-lg leading-none">{t.name}</span>
                    <span className="mt-1.5 block font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">{isDraft(t) ? 'To confirm' : t.kind}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROFILE.skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.06}>
            <div className="px-card px-card-lift h-full p-5">
              <p className="eyebrow">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-display text-2xl leading-none tracking-tight">{g.group}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((s) => <Txt key={s} as="li" value={s} className="px-chip normal-case tracking-normal font-sans text-sm" />)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
