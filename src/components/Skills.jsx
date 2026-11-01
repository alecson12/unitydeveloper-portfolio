import Reveal from './Reveal.jsx'
import { PROFILE } from '../content/profile.js'

export default function Skills() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {PROFILE.skills.map((g, i) => (
        <Reveal key={g.group} delay={i * 0.06}>
          <div className="px-border h-full bg-ink-2 p-5 transition-transform duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5">
            <p className="font-pixel text-[9px] tracking-[0.18em] text-accent uppercase">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold leading-none tracking-tight">{g.group}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="px-border bg-ink px-3 py-1.5 text-sm text-text/90" style={{ '--px-c': 'rgba(255,255,255,0.1)' }}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
