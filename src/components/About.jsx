import Reveal from './Reveal.jsx'
import { PROFILE } from '../content/profile.js'

export default function About() {
  const { about, name } = PROFILE
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className="lg:col-span-5">
        <div className="media-frame aspect-[4/5] max-w-sm">
          {about.portrait ? (
            <img src={about.portrait} alt={about.portraitAlt ?? name} className="h-full w-full object-cover" />
          ) : (
            <Decor />
          )}
        </div>
      </Reveal>

      <div className="lg:col-span-7">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((p, i) => <p key={i} className={i === 0 ? 'text-text/90' : ''}>{p}</p>)}
        </Reveal>
        {about.highlights?.length > 0 && (
          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-5 border-t border-line pt-8 sm:grid-cols-3">
              {about.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase">{h.label}</dt>
                  <dd className="mt-1 text-text/90">{h.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </div>
  )
}

/** Decorative panel shown until a portrait is added. */
function Decor() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 50% at 30% 20%, rgba(124,196,255,0.25), transparent 70%), radial-gradient(50% 50% at 80% 90%, rgba(198,163,255,0.2), transparent 70%)' }} />
      <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 400 500" fill="none" aria-hidden>
        <g stroke="rgba(255,255,255,0.12)">
          <path d="M200 80 L320 150 L320 290 L200 360 L80 290 L80 150 Z" strokeWidth="1.5" />
          <path d="M200 80 L200 220 L320 150 M200 220 L80 150 M200 220 L200 360" />
          <circle cx="200" cy="220" r="150" strokeDasharray="3 6" />
        </g>
      </svg>
      <p className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.2em] text-dim uppercase">Portrait coming soon</p>
    </div>
  )
}
