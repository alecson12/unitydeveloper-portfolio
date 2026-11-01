import SectionHeading from './SectionHeading.jsx'

/** Standard vertical rhythm + anchor id for a homepage block. */
export default function Section({ id, meta, children, tight = false }) {
  return (
    <section id={id} className={`scroll-mt-24 ${tight ? "py-16 sm:py-24" : "py-24 sm:py-36"}`}>
      <div className="container-x">
        {meta && <SectionHeading eyebrow={meta.eyebrow} heading={meta.heading} intro={meta.intro} />}
        {children}
      </div>
    </section>
  )
}
