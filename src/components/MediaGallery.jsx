import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox.jsx'
import VideoShowcase from './VideoShowcase.jsx'
import PixelWindow from './PixelWindow.jsx'
import ComingSoon from './ComingSoon.jsx'

/**
 * Lays out a list of media items: videos first (full width), then images.
 * Clicking any image opens the Lightbox.
 *
 *   items        — [{ type, src, poster, caption, alt }]
 *   label        — small text in each window's title bar (e.g. the screen name)
 *   pixelated    — keep images crisp (pixel art)
 *   layout       — 'stack' (every image full width) or 'grid'
 *   emptyMessage — what to show when there is nothing yet
 */
export default function MediaGallery({ items = [], label, pixelated = false, layout = 'grid', emptyMessage = 'Media coming soon.' }) {
  const [open, setOpen] = useState(null)

  if (!items.length) return <ComingSoon message={emptyMessage} compact />

  const indexed = items.map((it, i) => ({ it, i }))
  const videos = indexed.filter(({ it }) => it.type === 'video')
  const images = indexed.filter(({ it }) => it.type !== 'video')

  // Grid rhythm: first image wide, the rest in halves. 'stack' = all full width.
  const span = (idx) => (layout === 'stack' || idx === 0 || images.length === 1 ? 'md:col-span-2' : 'md:col-span-1')

  return (
    <div className="space-y-8">
      {videos.length > 0 && (
        <div className="grid gap-8">
          {videos.map(({ it, i }) => (
            <VideoShowcase key={i} item={it} label={label} pixelated={pixelated} onExpand={() => setOpen(i)} />
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {images.map(({ it, i }, idx) => (
            <motion.figure
              key={i}
              className={`group ${span(idx)}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="block w-full cursor-zoom-in text-left transition-transform duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5"
                aria-label={`Open ${it.alt ?? 'image'} in viewer`}
              >
                <PixelWindow label={label} badge={`${String(idx + 1).padStart(2, '0')}`}>
                  <img src={it.src} alt={it.alt ?? ''} loading="lazy" className={pixelated ? 'pixelated' : ''} />
                  <span className="pointer-events-none absolute inset-0 bg-accent/0 transition group-hover:bg-accent/5" />
                </PixelWindow>
              </button>
              {it.caption && <figcaption className="mt-3 text-sm text-muted">{it.caption}</figcaption>}
            </motion.figure>
          ))}
        </div>
      )}

      <Lightbox items={items} index={open} pixelated={pixelated} onClose={() => setOpen(null)} onChange={setOpen} />
    </div>
  )
}
