import Reveal from './Reveal.jsx'
import PixelWindow from './PixelWindow.jsx'
import { PROFILE } from '../content/profile.js'

export default function About() {
  const { about, name } = PROFILE
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <Reveal className="lg:col-span-5">
        <PixelWindow label="Player" badge={name} className="max-w-sm">
          <div className="aspect-[4/5]">
            {about.portrait ? (
              <img src={about.portrait} alt={about.portraitAlt ?? name} className="h-full w-full object-cover" />
            ) : (
              <Decor />
            )}
          </div>
        </PixelWindow>
      </Reveal>

      <div className="lg:col-span-7">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((p, i) => <p key={i} className={i === 0 ? 'text-text/90' : ''}>{p}</p>)}
        </Reveal>
        {about.highlights?.length > 0 && (
          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-5 border-t-2 border-white/10 pt-8 sm:grid-cols-3">
              {about.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="font-pixel text-[9px] tracking-[0.18em] text-dim uppercase">{h.label}</dt>
                  <dd className="mt-1.5 text-text/90">{h.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>
    </div>
  )
}

/** Decorative pixel panel shown until a portrait is added. */
function Decor() {
  // Deterministic "sprite" of squares so the panel looks drawn, not random.
  const cells = []
  const size = 12
  for (let yy = 0; yy < 15; yy++) {
    for (let x = 0; x < size; x++) {
      const v = (x * 7 + yy * 13 + ((x * yy) % 5)) % 11
      if (v < 3) cells.push([x, yy, v])
    }
  }
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-2">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 50% at 30% 25%, rgba(255,209,102,0.16), transparent 70%), radial-gradient(50% 50% at 80% 90%, rgba(126,232,250,0.12), transparent 70%)' }} />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 12 15" preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden>
        {cells.map(([x, yy, v], i) => (
          <rect key={i} x={x} y={yy} width="1" height="1" fill={v === 0 ? '#ffd166' : v === 1 ? '#7ee8fa' : '#eef0ff'} opacity={v === 2 ? 0.08 : 0.18} />
        ))}
      </svg>
      <p className="absolute bottom-4 left-4 font-pixel text-[9px] tracking-[0.18em] text-dim uppercase cursor-blink">Portrait coming soon</p>
    </div>
  )
}
