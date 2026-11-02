import { motion, useReducedMotion } from 'framer-motion'
import MediaGallery from './MediaGallery.jsx'
import Txt from './Txt.jsx'

/**
 * One UI feature. Text column on the left (number, name, summary, what it
 * does, my part), the captures on the right at a useful size. A single
 * rule above separates it from the previous feature.
 */
export default function FeatureBlock({ feature, index, total, project }) {
  const reduce = useReducedMotion()
  const media = feature.media ?? []

  return (
    <motion.article
      id={`feature-${feature.id}`}
      className="scroll-mt-28 border-t border-line pt-10 sm:pt-12"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="label">
              <span className="text-ink">{String(index + 1).padStart(2, '0')}</span>
              <span className="text-line-2"> / {String(total).padStart(2, '0')}</span>
            </p>
            <h4 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{feature.name}</h4>
            {feature.summary && <p className="mt-4 max-w-md leading-relaxed text-ink-2">{feature.summary}</p>}

            {feature.functions?.length > 0 && (
              <div className="mt-8">
                <p className="label">What it does</p>
                <ul className="mt-3 max-w-md space-y-2">
                  {feature.functions.map((f, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {feature.contribution && (
              <div className="mt-8">
                <p className="label">My part</p>
                <Txt as="p" value={feature.contribution} className="mt-2 max-w-md text-sm leading-relaxed text-ink-2" />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8">
          <MediaGallery items={media} label={feature.name} pixelated={project.pixelArt} emptyMessage={`${feature.name} captures are coming soon.`} />
        </div>
      </div>
    </motion.article>
  )
}
