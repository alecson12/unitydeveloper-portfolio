import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox.jsx'
import VideoShowcase from './VideoShowcase.jsx'
import PixelWindow from './PixelWindow.jsx'
import EmptyIsland from './EmptyIsland.jsx'

/**
 * Lays out the media of one feature:
 *   1. recordings, full width, each in its own player
 *   2. large screenshots (≥ 1000px wide) in a two-column grid at their own aspect ratio
 *   3. small UI crops (< 1000px wide) on dark "display stages" at their natural size
 * Clicking any image opens the Lightbox. Nothing is ever cropped.
 */
export default function MediaGallery({ items = [], label, pixelated = false, emptyMessage = 'Media coming soon.' }) {
  const [open, setOpen] = useState(null)
  if (!items.length) return <EmptyIsland message={emptyMessage} compact />

  const indexed = items.map((it, i) => ({ it, i }))
  const videos = indexed.filter(({ it }) => it.type === 'video')
  const large = indexed.filter(({ it }) => it.type !== 'video' && (it.width ?? 1920) >= 1000)
  const small = indexed.filter(({ it }) => it.type !== 'video' && (it.width ?? 1920) < 1000)

  return (
    <div className="space-y-6 sm:space-y-8">
      {videos.map(({ it, i }) => (
        <VideoShowcase key={i} item={it} label={label} pixelated={pixelated} onExpand={() => setOpen(i)} />
      ))}

      {large.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {large.map(({ it, i }, idx) => (
            <Shot
              key={i}
              item={it}
              index={idx}
              pixelated={pixelated}
              onOpen={() => setOpen(i)}
              className={large.length % 2 === 1 && idx === large.length - 1 ? 'md:col-span-2' : ''}
            />
          ))}
        </div>
      )}

      {small.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {small.map(({ it, i }, idx) => (
            <Crop key={i} item={it} index={idx} onOpen={() => setOpen(i)} />
          ))}
        </div>
      )}

      <Lightbox items={items} index={open} pixelated={pixelated} onClose={() => setOpen(null)} onChange={setOpen} />
    </div>
  )
}

const reveal = (delay) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-5% 0px' },
  transition: { duration: 0.6, delay: Math.min(delay * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] },
})

/** A full screenshot at its own aspect ratio. */
function Shot({ item, index, pixelated, onOpen, className = '' }) {
  return (
    <motion.figure className={className} {...reveal(index)}>
      <button type="button" onClick={onOpen} className="block w-full cursor-zoom-in text-left" aria-label={`Open ${item.alt ?? 'image'} in viewer`}>
        <PixelWindow label={item.alt} badge={String(index + 1).padStart(2, '0')} className="px-card-lift">
          <img src={item.src} alt={item.alt ?? ''} loading="lazy" width={item.width} height={item.height} className={pixelated ? 'pixelated' : ''} />
        </PixelWindow>
      </button>
      {item.caption && <figcaption className="mt-3 text-sm text-ink-2">{item.caption}</figcaption>}
    </motion.figure>
  )
}

/** A small UI element shown at natural size on a dark stage. */
function Crop({ item, index, onOpen }) {
  return (
    <motion.figure {...reveal(index)}>
      <button type="button" onClick={onOpen} className="block w-full cursor-zoom-in text-left" aria-label={`Open ${item.alt ?? 'image'} in viewer`}>
        <PixelWindow label={item.alt} badge={String(index + 1).padStart(2, '0')} className="px-card-lift">
          <div
            className="flex h-40 items-center justify-center p-3 sm:h-52"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)', backgroundSize: '12px 12px' }}
          >
            <img
              src={item.src}
              alt={item.alt ?? ''}
              loading="lazy"
              width={item.width}
              height={item.height}
              className="max-h-full max-w-full object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </PixelWindow>
      </button>
      {item.caption && <figcaption className="mt-3 text-sm text-ink-2">{item.caption}</figcaption>}
    </motion.figure>
  )
}
