import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox.jsx'
import VideoShowcase from './VideoShowcase.jsx'
import MediaFrame from './MediaFrame.jsx'
import EmptyState from './EmptyState.jsx'

/**
 * Lays out the media of one feature:
 *   1. recordings, full width, each in its own player
 *   2. large screenshots (≥ 1000px wide) in a two-column grid at their own aspect ratio
 *   3. small UI crops (< 1000px wide) at natural size on a quiet stage
 * Clicking any image opens the Lightbox. Nothing is ever cropped.
 */
export default function MediaGallery({ items = [], label, pixelated = false, emptyMessage = 'Media coming soon.' }) {
  const [open, setOpen] = useState(null)
  if (!items.length) return <EmptyState message={emptyMessage} compact />

  const indexed = items.map((it, i) => ({ it, i }))
  const videos = indexed.filter(({ it }) => it.type === 'video')
  const large = indexed.filter(({ it }) => it.type !== 'video' && (it.width ?? 1920) >= 1000)
  const small = indexed.filter(({ it }) => it.type !== 'video' && (it.width ?? 1920) < 1000)

  return (
    <div className="space-y-8 sm:space-y-10">
      {videos.map(({ it, i }) => (
        <VideoShowcase key={i} item={it} label={label} pixelated={pixelated} onExpand={() => setOpen(i)} />
      ))}

      {large.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
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
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-5% 0px' },
  transition: { duration: 0.6, delay: Math.min(delay * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] },
})

/** A full screenshot at its own aspect ratio. */
function Shot({ item, index, pixelated, onOpen, className = '' }) {
  return (
    <motion.figure className={className} {...reveal(index)}>
      <button type="button" onClick={onOpen} className="group block w-full cursor-zoom-in text-left" aria-label={`Open ${item.alt ?? 'image'} in viewer`}>
        <MediaFrame label={item.caption ?? item.alt} badge={String(index + 1).padStart(2, '0')}>
          <img src={item.src} alt={item.alt ?? ''} loading="lazy" width={item.width} height={item.height} className={`transition duration-500 group-hover:opacity-90 ${pixelated ? 'pixelated' : ''}`} />
        </MediaFrame>
      </button>
    </motion.figure>
  )
}

/** A small UI element shown at natural size on a quiet stage. */
function Crop({ item, index, onOpen }) {
  return (
    <motion.figure {...reveal(index)}>
      <button type="button" onClick={onOpen} className="group block w-full cursor-zoom-in text-left" aria-label={`Open ${item.alt ?? 'image'} in viewer`}>
        <MediaFrame label={item.caption ?? item.alt} badge={String(index + 1).padStart(2, '0')}>
          <div className="flex h-40 items-center justify-center bg-bg-2 p-3 transition group-hover:bg-[#161618] sm:h-52">
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
        </MediaFrame>
      </button>
    </motion.figure>
  )
}
