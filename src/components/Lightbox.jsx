import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { hasSource } from '../lib/content.js'

/**
 * Full-screen viewer for a list of media items.
 *   items   — array of { type, src, poster, caption, alt }
 *   index   — which item is open (null = closed)
 *   onClose, onChange(nextIndex)
 */
export default function Lightbox({ items, index, onClose, onChange }) {
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
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <span className="font-mono text-xs tracking-widest text-muted">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:border-white/20 hover:text-text"
              aria-label="Close viewer"
            >
              Close · Esc
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-16">
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
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <Stage item={items[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption */}
          <div className="px-4 pb-5 pt-3 text-center sm:px-6" onClick={(e) => e.stopPropagation()}>
            {items[index].caption && (
              <p className="mx-auto max-w-2xl text-balance text-sm text-muted sm:text-base">{items[index].caption}</p>
            )}
            {count > 1 && (
              <div className="mt-4 flex justify-center gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to item ${i + 1}`}
                    onClick={() => onChange(i)}
                    className={`h-1 rounded-full transition-all ${i === index ? 'w-6 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'}`}
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

function Stage({ item }) {
  if (item.type === 'video') {
    if (!hasSource(item)) {
      return (
        <div className="relative max-h-[70vh] overflow-hidden rounded-xl border border-line">
          {item.poster && <img src={item.poster} alt={item.alt ?? ''} className="max-h-[70vh] w-auto object-contain" />}
          <div className="absolute inset-0 grid place-items-center bg-ink/60">
            <span className="eyebrow">Recording coming soon</span>
          </div>
        </div>
      )
    }
    return (
      <video
        src={item.src}
        poster={item.poster}
        controls
        autoPlay
        playsInline
        className="max-h-[75vh] w-auto max-w-full rounded-xl border border-line bg-black"
      />
    )
  }
  return (
    <img
      src={item.src}
      alt={item.alt ?? ''}
      className="max-h-[75vh] w-auto max-w-full rounded-xl border border-line object-contain shadow-2xl"
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
      className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-line bg-ink/70 p-3 text-text/80 backdrop-blur transition hover:border-white/30 hover:text-white ${left ? 'left-2 sm:left-4' : 'right-2 sm:right-4'}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {left ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  )
}
