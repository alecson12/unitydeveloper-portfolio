import Reveal from './Reveal.jsx'
import { PROFILE } from '../content/profile.js'

export default function Skills() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PROFILE.skills.map((g, i) => (
        <Reveal key={g.group} delay={i * 0.06}>
          <div className="glass group h-full rounded-2xl p-5 transition duration-500 hover:-translate-y-0.5 hover:border-white/15">
            <p className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{g.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="rounded-full border border-line bg-ink/40 px-3 py-1 text-sm text-text/90">
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
