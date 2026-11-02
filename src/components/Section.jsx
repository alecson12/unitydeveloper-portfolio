import SectionHeading from './SectionHeading.jsx'

/** Standard vertical rhythm, a top rule and an anchor id for a homepage block. */
export default function Section({ id, meta, children, tight = false, rule = true }) {
  return (
    <section id={id} className={`scroll-mt-20 ${tight ? 'py-12 sm:py-16' : 'py-16 sm:py-20 lg:py-24'}`}>
      <div className="container-x">
        {rule && <div className="border-t border-line" />}
        {meta && <SectionHeading {...meta} />}
        {children}
      </div>
    </section>
  )
}
