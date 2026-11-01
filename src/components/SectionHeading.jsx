import Reveal from './Reveal.jsx'

/** Eyebrow + heading + optional intro used at the top of every section. */
export default function SectionHeading({ eyebrow, heading, intro, align = 'left', children }) {
  const center = align === 'center'
  return (
    <Reveal className={`mb-10 sm:mb-14 ${center ? 'text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <div className={`flex flex-col gap-5 ${center ? 'items-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        {intro && <p className={`max-w-md text-balance text-muted ${center ? '' : 'sm:text-right'}`}>{intro}</p>}
      </div>
      {children}
    </Reveal>
  )
}
