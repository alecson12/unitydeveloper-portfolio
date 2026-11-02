import SeaLife from './SeaLife.jsx'

/**
 * A stretch of water. Wrap the sections that share a depth in one Zone so
 * the colour runs continuously from the top of the first to the bottom of
 * the last, and the life of that depth sits behind them.
 *
 *   shallow — sunlit indigo, just under the surface
 *   mid     — deeper, muted teal-blue
 *   deep    — navy, the open deep
 *   abyss   — near black
 *
 * Each gradient ends on the colour the next one starts with, so the page
 * never shows a seam between zones.
 */
export const WATER = {
  shallow: ['#163a66', '#133260', '#112c58'],
  mid: ['#112c58', '#0d244a', '#0a1d3e'],
  deep: ['#0a1d3e', '#071530', '#050f24', '#030a1a'],
  abyss: ['#030a1a', '#02060f'],
}

const gradient = (stops) => `linear-gradient(180deg, ${stops.map((c, i) => `${c} ${Math.round((i / (stops.length - 1)) * 100)}%`).join(', ')})`

export default function Zone({ depth = 'shallow', children, className = '', life = true }) {
  return (
    <div className={`relative overflow-x-clip ${className}`} style={{ background: gradient(WATER[depth]) }}>
      {depth === 'shallow' && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-48" style={{ background: 'linear-gradient(180deg, rgba(214,220,226,0.28), rgba(214,220,226,0.08) 35%, rgba(214,220,226,0) 100%)' }}>
          <div className="surface-line absolute inset-x-0 top-0 opacity-60" />
          <div className="surface-line absolute inset-x-0 top-3 opacity-25" style={{ animationDirection: 'reverse', animationDuration: '16s' }} />
        </div>
      )}
      {life && <SeaLife band={depth} />}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
