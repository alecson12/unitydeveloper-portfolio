import { useState } from 'react'
import { hasSource } from '../lib/content.js'

/**
 * Dedicated player area for a screen recording.
 * Shows the poster until play; shows a "coming soon" tile when `src` is empty.
 *   item — { type: 'video', src, poster, caption, alt }
 */
export default function VideoShowcase({ item, onExpand }) {
  const [failed, setFailed] = useState(false)
  const ready = hasSource(item) && !failed

  return (
    <figure className="group">
      <div className="media-frame">
        {ready ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            preload="metadata"
            playsInline
            onError={() => setFailed(true)}
            className="aspect-video w-full bg-black object-contain"
          >
            {item.alt}
          </video>
        ) : (
          <button
            type="button"
            onClick={onExpand}
            className="relative block aspect-video w-full overflow-hidden text-left"
            aria-label={`${item.alt ?? 'Recording'} — coming soon`}
          >
            {item.poster && (
              <img src={item.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.02]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-text/90">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="eyebrow">{failed ? 'Video unavailable' : 'Recording coming soon'}</span>
            </div>
          </button>
        )}
        <span className="pointer-events-none absolute left-3 top-3 rounded-md border border-white/10 bg-ink/70 px-2 py-1 font-mono text-[10px] tracking-widest text-muted uppercase backdrop-blur">
          Video
        </span>
      </div>
      {item.caption && <figcaption className="mt-3 text-sm text-muted">{item.caption}</figcaption>}
    </figure>
  )
}
