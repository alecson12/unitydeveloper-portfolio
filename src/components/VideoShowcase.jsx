import { useState } from 'react'
import MediaFrame from './MediaFrame.jsx'
import { aspectOf, hasSource } from '../lib/content.js'

/**
 * Player for a screen recording. Shows the poster with a play button; the
 * real <video> only loads once pressed, so a page with many recordings
 * stays light.
 */
export default function VideoShowcase({ item, label, badge = 'Recording', pixelated = false, onExpand }) {
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const ready = hasSource(item) && !failed

  return (
    <figure>
      <MediaFrame label={item.caption ?? label} badge={badge}>
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
                  className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.01] ${pixelated ? 'pixelated' : ''}`}
                />
              )}
              <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/15" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center gap-3 rounded-full bg-bg/80 py-2 pl-2 pr-5 backdrop-blur-sm transition group-hover:bg-bg">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-ink">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden><path d="M3 1.5v9l7-4.5z" /></svg>
                  </span>
                  <span className="label text-ink">{ready ? 'Play' : failed ? 'Unavailable' : 'Coming soon'}</span>
                </span>
              </span>
            </button>
          )}
        </div>
      </MediaFrame>
    </figure>
  )
}
