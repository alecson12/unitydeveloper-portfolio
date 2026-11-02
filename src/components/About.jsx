import Reveal from './Reveal.jsx'
import PixelWindow from './PixelWindow.jsx'
import PixelCloud from './PixelCloud.jsx'
import Island from './Island.jsx'
import Txt from './Txt.jsx'
import { PROFILE } from '../content/profile.js'

export default function About() {
  const { about, name } = PROFILE
  return (
    <Reveal>
      <div className="px-card grid grid-cols-1 gap-10 p-5 sm:p-8 lg:grid-cols-12 lg:gap-14 lg:p-10">
        <div className="lg:col-span-5">
          <PixelWindow label="Player" badge={name} stage="cloud" className="max-w-sm">
            <div className="aspect-[4/5]">
              {about.portrait ? (
                <img src={about.portrait} alt={about.portraitAlt ?? name} className="h-full w-full object-cover" />
              ) : (
                <Decor />
              )}
            </div>
          </PixelWindow>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-5 text-lg leading-relaxed text-ink-2">
            {about.paragraphs.map((p, i) => <Txt key={i} as="p" value={p} className={i === 0 ? 'text-ink' : ''} />)}
          </div>
          {about.highlights?.length > 0 && (
            <dl className="mt-10 grid grid-cols-1 gap-5 border-t-2 border-line pt-8 sm:grid-cols-3">
              {about.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="font-pixel text-[9px] tracking-[0.18em] text-dim uppercase">{h.label}</dt>
                  <Txt as="dd" value={h.value} className="mt-1.5" />
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </Reveal>
  )
}

/** A small sky scene shown until a portrait is added. */
function Decor() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: 'linear-gradient(180deg, #74bfff 0%, #a9dcff 60%, #ffd4e9 100%)' }}>
      <PixelCloud variant={0} className="absolute left-[-10%] top-[12%] w-[55%] opacity-95" />
      <PixelCloud variant={1} className="absolute right-[-6%] top-[34%] w-[38%] opacity-90" />
      <PixelCloud variant={2} className="absolute bottom-[6%] left-[8%] w-[70%] opacity-95" />
      <Island decor={['house', 'tree', 'person']} className="bob absolute left-1/2 top-[38%] w-[62%] -translate-x-1/2" style={{ filter: 'drop-shadow(6px 8px 0 rgba(27,42,102,0.18))' }} />
    </div>
  )
}
