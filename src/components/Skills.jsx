import Reveal from './Reveal.jsx'
import Txt from './Txt.jsx'
import { PROFILE } from '../content/profile.js'

export default function Skills() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {PROFILE.skills.map((g, i) => (
        <Reveal key={g.group} delay={i * 0.06}>
          <div className="px-card px-card-lift h-full p-5">
            <p className="eyebrow">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold leading-none tracking-tight">{g.group}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((s) => <Txt key={s} as="li" value={s} className="px-chip normal-case tracking-normal font-sans text-sm" />)}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
