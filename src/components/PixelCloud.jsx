/**
 * A pixel-art cloud drawn from rows of cells. Three shapes; pick with `variant`.
 * Set the size with a width class/style — the height follows the shape.
 */
const SHAPES = [
  { w: 24, rows: [[[9, 13]], [[7, 15]], [[5, 17], [19, 21]], [[3, 22]], [[1, 23]], [[0, 24]], [[0, 24]], [[2, 22]]] },
  { w: 16, rows: [[[5, 9]], [[3, 11]], [[1, 13]], [[0, 15]], [[0, 16]], [[1, 14]]] },
  { w: 30, rows: [[[6, 10]], [[4, 12], [18, 22]], [[3, 14], [16, 24]], [[2, 26]], [[1, 28]], [[0, 30]], [[0, 30]], [[1, 29]], [[3, 26]]] },
]

export default function PixelCloud({ variant = 0, className = '', style, shade = '#e1e7ff' }) {
  const s = SHAPES[variant % SHAPES.length]
  const h = s.rows.length
  return (
    <svg viewBox={`0 0 ${s.w} ${h}`} className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      {s.rows.map((segs, y) =>
        segs.map(([a, b], i) => <rect key={`${y}-${i}`} x={a} y={y} width={b - a} height="1" fill={y >= h - 2 ? shade : '#ffffff'} />),
      )}
    </svg>
  )
}
