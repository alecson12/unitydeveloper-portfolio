import SeaLife from './SeaLife.jsx'

/**
 * A stretch of water. Wrap the sections that share a depth in one Zone so
 * the colour runs continuously from the top of the first to the bottom of
 * the last, and the creatures that live at that depth swim behind them.
 *
 *   shallow — sunlit blue, just under the surface
 *   mid     — deeper blue, the reef
 *   deep    — navy, the open deep
 *   abyss   — near black, the floor
 *
 * Each gradient ends on the colour the next one starts with, so the page
 * never shows a seam between zones.
 */
export const WATER = {
  shallow: ['#1d8fe4', '#1370c9', '#1162bb'],
  mid: ['#1162bb', '#0c4c98', '#093f82'],
  deep: ['#093f82', '#06275c', '#041a44', '#030f2e'],
  abyss: ['#030f2e', '#02081c'],
}

const gradient = (stops) => `linear-gradient(180deg, ${stops.map((c, i) => `${c} ${Math.round((i / (stops.length - 1)) * 100)}%`).join(', ')})`

export default function Zone({ depth = 'shallow', children, className = '', life = true }) {
  return (
    <div className={`relative overflow-x-clip ${className}`} style={{ background: gradient(WATER[depth]) }}>
      {depth === 'shallow' && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.38), rgba(255,255,255,0.12) 30%, rgba(255,255,255,0) 100%)' }}>
          <div className="surface-line absolute inset-x-0 top-0" />
          <div className="surface-line absolute inset-x-0 top-3 opacity-40" style={{ animationDirection: 'reverse', animationDuration: '14s' }} />
        </div>
      )}
      {life && <SeaLife band={depth} />}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
