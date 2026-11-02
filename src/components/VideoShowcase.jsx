import { useState } from 'react'
import PixelWindow from './PixelWindow.jsx'
import { aspectOf, hasSource } from '../lib/content.js'

/**
 * Dedicated player for a screen recording, inside a pixel window.
 * Shows the poster with a play button; the real <video> only loads once
 * pressed, so a page with many recordings stays light.
 */
export default function VideoShowcase({ item, label, badge = 'Recording', pixelated = false, onExpand }) {
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const ready = hasSource(item) && !failed

  return (
    <figure>
      <PixelWindow label={label} badge={badge}>
        <div className="relative w-full" style={{ aspectRatio: aspectOf(item) }}>
          {ready && playing ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
              className="absolute inset-0 h-full w-full bg-black object-contain"
            />
          ) : (
            <button
              type="button"
              onClick={() => (ready ? setPlaying(true) : onExpand?.())}
              className="group absolute inset-0 block w-full text-left"
              aria-label={ready ? `Play: ${item.alt ?? 'recording'}` : 'Recording coming soon'}
            >
              {item.poster && (
                <img
                  src={item.poster}
                  alt=""
                  loading="lazy"
                  width={item.width}
                  height={item.height}
                  className={`absolute inset-0 h-full w-full object-cover ${pixelated ? 'pixelated' : ''}`}
                />
              )}
              <span className="absolute inset-0 bg-deep/25 transition group-hover:bg-deep/10" />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="px-btn px-btn-ghost px-btn-icon group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" aria-hidden>
                    <path d="M4 2h2v12H4zM6 4h2v8H6zM8 5h2v6H8zM10 6h2v4h-2zM12 7h2v2h-2z" />
                  </svg>
                </span>
                <span className="px-chip bg-cloud/95">{ready ? 'Press play' : failed ? 'Video unavailable' : 'Recording coming soon'}</span>
              </span>
            </button>
          )}
        </div>
      </PixelWindow>
      {item.caption && <figcaption className="mt-3 text-sm text-ink-2">{item.caption}</figcaption>}
    </figure>
  )
}
