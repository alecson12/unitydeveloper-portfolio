import { motion, useReducedMotion } from 'framer-motion'
import MediaGallery from './MediaGallery.jsx'
import Txt from './Txt.jsx'

/**
 * One UI feature as a floating panel: name, summary, what it does, your
 * contribution (if written), then its recordings and screenshots.
 */
export default function FeatureBlock({ feature, index, total, project }) {
  const reduce = useReducedMotion()
  const media = feature.media ?? []
  const videos = media.filter((m) => m.type === 'video').length
  const images = media.length - videos

  return (
    <motion.article
      id={`feature-${feature.id}`}
      className="px-card scroll-mt-40 p-5 sm:p-8 lg:p-10"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-2 w-2 bg-purple" />
            Feature {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <h4 className="mt-3 font-display text-3xl font-semibold leading-none tracking-tight sm:text-4xl">{feature.name}</h4>
          {feature.summary && <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{feature.summary}</p>}
          {feature.contribution && (
            <div className="mt-5 border-l-4 border-pink pl-4">
              <p className="font-pixel text-[9px] tracking-[0.18em] text-dim uppercase">My part</p>
              <Txt as="p" value={feature.contribution} className="mt-1.5 text-sm leading-relaxed" />
            </div>
          )}
        </div>
        <div className="lg:col-span-5">
          {feature.functions?.length > 0 && (
            <>
              <p className="font-pixel text-[10px] tracking-[0.18em] text-dim uppercase">What it does</p>
              <ul className="mt-3 grid grid-cols-1 gap-2">
                {feature.functions.map((f, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-pink" />
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-5 font-pixel text-[9px] tracking-[0.16em] text-dim uppercase">
            {videos} {videos === 1 ? 'recording' : 'recordings'} · {images} {images === 1 ? 'screenshot' : 'screenshots'}
          </p>
        </div>
      </header>

      <div className="mt-8 border-t-2 border-line pt-8">
        <MediaGallery items={media} label={feature.name} pixelated={project.pixelArt} emptyMessage={`${feature.name} captures are coming soon.`} />
      </div>
    </motion.article>
  )
}
