import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox.jsx'
import VideoShowcase from './VideoShowcase.jsx'
import ComingSoon from './ComingSoon.jsx'

/**
 * Lays out a list of media items. Videos get a full-width player row;
 * images sit in a responsive grid. Clicking any image opens the Lightbox.
 *
 *   items        — [{ type, src, poster, caption, alt, project?, section? }]
 *   emptyMessage — what to show when there is nothing yet
 *   showSource   — print "Project · Category" above captions (used on homepage)
 */
export default function MediaGallery({ items = [], emptyMessage = 'Media coming soon.', showSource = false }) {
  const [open, setOpen] = useState(null)

  if (!items.length) return <ComingSoon message={emptyMessage} compact />

  const videos = items.map((it, i) => ({ it, i })).filter(({ it }) => it.type === 'video')
  const images = items.map((it, i) => ({ it, i })).filter(({ it }) => it.type !== 'video')

  // Grid rhythm: 1 image → full width, 2 → halves, 3+ → first one wide.
  const span = (n, idx) => {
    if (n === 1) return 'md:col-span-6'
    if (n === 2) return 'md:col-span-3'
    if (idx === 0) return 'md:col-span-6'
    return 'md:col-span-3'
  }

  return (
    <div className="space-y-8">
      {videos.length > 0 && (
        <div className={`grid gap-6 ${videos.length > 1 ? 'lg:grid-cols-2' : ''}`}>
          {videos.map(({ it, i }) => (
            <div key={i}>
              {showSource && <Source item={it} />}
              <VideoShowcase item={it} onExpand={() => setOpen(i)} />
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {images.map(({ it, i }, idx) => (
            <motion.figure
              key={i}
              className={`group ${span(images.length, idx)}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.7, delay: Math.min(idx * 0.06, 0.3), ease: [0.16, 1, 0.3, 1] }}
            >
              {showSource && <Source item={it} />}
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="media-frame block w-full cursor-zoom-in text-left transition duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
                aria-label={`Open ${it.alt ?? 'image'} in viewer`}
              >
                <img src={it.src} alt={it.alt ?? ''} loading="lazy" className="transition duration-700 group-hover:scale-[1.015]" />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 right-3 rounded-md border border-white/10 bg-ink/70 px-2 py-1 font-mono text-[10px] tracking-widest text-muted uppercase opacity-0 backdrop-blur transition group-hover:opacity-100">
                  Expand
                </span>
              </button>
              {it.caption && <figcaption className="mt-3 text-sm text-muted">{it.caption}</figcaption>}
            </motion.figure>
          ))}
        </div>
      )}

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </div>
  )
}

function Source({ item }) {
  if (!item.project) return null
  return (
    <p className="mb-2 font-mono text-[11px] tracking-widest text-dim uppercase">
      {item.project.title}
      {item.section ? <span className="text-dim/70"> · {item.section.title}</span> : null}
    </p>
  )
}
