import Reveal from './Reveal.jsx'

/** Eyebrow + depth marker + heading + optional intro at the top of every section. */
export default function SectionHeading({ eyebrow, heading, intro, depth }) {
  if (!eyebrow && !heading) return null
  return (
    <Reveal className={heading ? 'mb-10 sm:mb-14' : 'mb-6'}>
      {(eyebrow || depth) && (
        <p className="eyebrow mb-4 flex flex-wrap items-center gap-3">
          {eyebrow && <><span className="inline-block h-2 w-2 bg-red" />{eyebrow}</>}
          {depth && <span className="px-chip ml-1 gap-1.5 normal-case"><span className="text-glow">▼</span>{depth}</span>}
        </p>
      )}
      {heading && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-5xl leading-none tracking-tight text-balance text-beige sm:text-6xl lg:text-7xl" style={{ textShadow: '0 2px 0 rgba(0,10,40,0.35)' }}>
            {heading}
          </h2>
          {intro && <p className="max-w-md text-balance text-ink-2 sm:text-right">{intro}</p>}
        </div>
      )}
    </Reveal>
  )
}
