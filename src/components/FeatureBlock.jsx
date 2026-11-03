import { motion, useReducedMotion } from 'framer-motion'
import MediaGallery from './MediaGallery.jsx'
import Txt from './Txt.jsx'

/**
 * One UI feature as a dark panel.
 *   - one recording only  → text on the left, the recording wide on the right
 *   - several captures    → text header across the top, then the gallery
 */
export default function FeatureBlock({ feature, index, total, project }) {
  const reduce = useReducedMotion()
  const media = feature.media ?? []
  const sideBySide = media.length === 1

  const text = (
    <>
      <p className="eyebrow flex items-center gap-3">
        <span className="inline-block h-2 w-2 bg-red" />
        Feature {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>
      <h4 className="mt-3 font-display text-3xl leading-none tracking-tight text-beige sm:text-4xl">{feature.name}</h4>
      {feature.summary && <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{feature.summary}</p>}
      {feature.contribution && (
        <div className="mt-5 border-l-4 border-pink pl-4">
          <p className="font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">My part</p>
          <Txt as="p" value={feature.contribution} className="mt-1.5 text-sm leading-relaxed" />
        </div>
      )}
    </>
  )

  const functions = feature.functions?.length > 0 && (
    <>
      <p className="font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">What it does</p>
      <ul className="mt-3 grid grid-cols-1 gap-2">
        {feature.functions.map((f, j) => (
          <li key={j} className="flex gap-3 text-sm leading-relaxed">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-pink" />
            {f}
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <motion.article
      id={`feature-${feature.id}`}
      className="px-card scroll-mt-40 p-5 sm:p-8 lg:p-10"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {sideBySide ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-40">
              {text}
              <div className="mt-8">{functions}</div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <MediaGallery items={media} label={feature.name} pixelated={project.pixelArt} emptyMessage={`${feature.name} captures are coming soon.`} />
          </div>
        </div>
      ) : (
        <>
          <header className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">{text}</div>
            <div className="lg:col-span-5">
              {functions}
            </div>
          </header>
          <div className="mt-8 border-t-2 border-line pt-8">
            <MediaGallery items={media} label={feature.name} pixelated={project.pixelArt} emptyMessage={`${feature.name} captures are coming soon.`} />
          </div>
        </>
      )}
    </motion.article>
  )
}
