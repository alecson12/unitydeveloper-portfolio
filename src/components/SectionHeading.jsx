import Reveal from './Reveal.jsx'

/** Eyebrow + heading + optional intro used at the top of every section. */
export default function SectionHeading({ eyebrow, heading, intro }) {
  return (
    <Reveal className="mb-12 sm:mb-16">
      {eyebrow && (
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="inline-block h-2 w-2 bg-accent" />
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-4xl font-semibold leading-none tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {heading}
        </h2>
        {intro && <p className="max-w-sm text-balance text-muted sm:text-right">{intro}</p>}
      </div>
    </Reveal>
  )
}
