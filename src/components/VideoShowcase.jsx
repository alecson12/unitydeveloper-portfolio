import { useState } from 'react'
import PixelWindow from './PixelWindow.jsx'
import { hasSource } from '../lib/content.js'

/**
 * Dedicated player for a screen recording, inside a pixel window.
 * Shows the poster until play; shows a "coming soon" tile when `src` is empty.
 */
export default function VideoShowcase({ item, label, pixelated = false, onExpand }) {
  const [failed, setFailed] = useState(false)
  const ready = hasSource(item) && !failed

  return (
    <figure>
      <PixelWindow label={label} badge="Video">
        {ready ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            preload="metadata"
            playsInline
            onError={() => setFailed(true)}
            className="aspect-video w-full bg-black object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={onExpand}
            className="group relative block aspect-video w-full overflow-hidden text-left"
            aria-label={`${item.alt ?? 'Recording'} — coming soon`}
          >
            {item.poster && (
              <img src={item.poster} alt="" className={`absolute inset-0 h-full w-full object-cover opacity-60 ${pixelated ? 'pixelated' : ''}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="px-border grid h-14 w-14 place-items-center bg-ink-2 transition group-hover:bg-ink-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-text" shapeRendering="crispEdges" aria-hidden>
                  <path d="M4 2h2v12H4zM6 4h2v8H6zM8 5h2v6H8zM10 6h2v4H10zM12 7h2v2h-2z" />
                </svg>
              </span>
              <span className="eyebrow cursor-blink">{failed ? 'Video unavailable' : 'Recording coming soon'}</span>
            </div>
          </button>
        )}
      </PixelWindow>
      {item.caption && <figcaption className="mt-3 text-sm text-muted">{item.caption}</figcaption>}
    </figure>
  )
}
