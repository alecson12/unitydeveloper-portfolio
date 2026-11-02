import Reveal from './Reveal.jsx'

/** "/label  01" on one line, then a large heading; optional intro on the right. */
export default function SectionHeading({ index, label, heading, intro }) {
  if (!label && !heading) return null
  return (
    <Reveal className="pt-8 pb-12 sm:pt-10 sm:pb-16">
      {label && (
        <p className="label flex items-center gap-4">
          <span><span className="text-accent">/</span>{label}</span>
          {index && <span className="text-line-2">{index}</span>}
        </p>
      )}
      {heading && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.03em] text-balance sm:text-6xl lg:col-span-8 lg:text-7xl xl:text-[5.5rem]">
            {heading}
          </h2>
          {intro && <p className="max-w-sm text-ink-2 lg:col-span-4 lg:justify-self-end lg:text-right">{intro}</p>}
        </div>
      )}
    </Reveal>
  )
}
