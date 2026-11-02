import { SPRITES } from './sprites.js'

/**
 * Draws one of the text sprites from sprites.js as crisp SVG rects.
 * Horizontal runs of the same colour merge into one rect, so a sprite is
 * a few dozen nodes at most.
 *   <PixelSprite name="turtle" className="w-20" flip />
 *   flip   — mirror horizontally (sprites face left by default)
 *   glow   — a soft colour halo behind the sprite (deep-sea creatures)
 */
export default function PixelSprite({ name, flip = false, glow, className = '', style, opacity }) {
  const s = SPRITES[name]
  if (!s) return null
  const rects = []
  s.rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const ch = row[x]
      if (ch === '.' || ch === ' ') { x++; continue }
      let x2 = x + 1
      while (x2 < row.length && row[x2] === ch) x2++
      rects.push([x, y, x2 - x, s.palette[ch] ?? '#ff00ff'])
      x = x2
    }
  })
  return (
    <svg
      viewBox={`0 0 ${s.w} ${s.h}`}
      className={className}
      style={{ ...style, opacity, filter: glow ? `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 14px ${glow})` : style?.filter }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      <g transform={flip ? `translate(${s.w} 0) scale(-1 1)` : undefined}>
        {rects.map(([x, y, w, c], i) => <rect key={i} x={x} y={y} width={w} height="1" fill={c} />)}
      </g>
    </svg>
  )
}
