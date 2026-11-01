import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { hasSource } from '../lib/content.js'

/**
 * Full-screen viewer for a list of media items.
 *   items     — array of { type, src, poster, caption, alt }
 *   index     — which item is open (null = closed)
 *   pixelated — render images crisp (pixel art)
 *   onClose, onChange(nextIndex)
 */
export default function Lightbox({ items, index, pixelated = false, onClose, onChange }) {
  const open = index !== null && index !== undefined && items[index]
  const count = items.length

  const step = useCallback(
    (dir) => {
      if (!count) return
      onChange((index + dir + count) % count)
    },
    [count, index, onChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose, step])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <span className="font-pixel text-[10px] tracking-[0.18em] text-muted">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button type="button" onClick={onClose} className="px-btn px-btn-ghost !px-3 !py-2" aria-label="Close viewer">
              Close
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20">
            {count > 1 && (
              <>
                <NavButton side="left" onClick={(e) => { e.stopPropagation(); step(-1) }} />
                <NavButton side="right" onClick={(e) => { e.stopPropagation(); step(1) }} />
              </>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="flex max-h-full max-w-full items-center justify-center"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Stage item={items[index]} pixelated={pixelated} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-4 pb-6 pt-4 text-center sm:px-6" onClick={(e) => e.stopPropagation()}>
            {items[index].caption && (
              <p className="mx-auto max-w-2xl text-balance text-sm text-muted sm:text-base">{items[index].caption}</p>
            )}
            {count > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to item ${i + 1}`}
                    onClick={() => onChange(i)}
                    className={`h-2 transition-all ${i === index ? 'w-6 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function Stage({ item, pixelated }) {
  const crisp = pixelated ? 'pixelated' : ''
  if (item.type === 'video') {
    if (!hasSource(item)) {
      return (
        <div className="px-border relative max-h-[70vh] overflow-hidden bg-ink-2">
          {item.poster && <img src={item.poster} alt={item.alt ?? ''} className={`max-h-[70vh] w-auto object-contain ${crisp}`} />}
          <div className="absolute inset-0 grid place-items-center bg-ink/60">
            <span className="eyebrow cursor-blink">Recording coming soon</span>
          </div>
        </div>
      )
    }
    return (
      <video src={item.src} poster={item.poster} controls autoPlay playsInline className="px-border max-h-[75vh] w-auto max-w-full bg-black" />
    )
  }
  return (
    <img
      src={item.src}
      alt={item.alt ?? ''}
      className={`px-border max-h-[75vh] w-auto max-w-full bg-ink-2 object-contain ${crisp}`}
      draggable={false}
    />
  )
}

function NavButton({ side, onClick }) {
  const left = side === 'left'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={left ? 'Previous' : 'Next'}
      className={`px-btn px-btn-ghost absolute top-1/2 z-10 !p-3 -translate-y-1/2 ${left ? 'left-2 sm:left-5' : 'right-2 sm:right-5'}`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" shapeRendering="crispEdges" aria-hidden>
        {left ? (
          <path d="M8 1h2v2H8zM6 3h2v2H6zM4 5h2v4H4zM6 9h2v2H6zM8 11h2v2H8z" />
        ) : (
          <path d="M4 1h2v2H4zM6 3h2v2H6zM8 5h2v4H8zM6 9h2v2H6zM4 11h2v2H4z" />
        )}
      </svg>
    </button>
  )
}
