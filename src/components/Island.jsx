/**
 * A floating pixel-art island: grass, soil and rock tapering down, with
 * optional decorations on top:  decor={['tree', 'house', 'flag', 'person']}
 */
const BODY = [
  ['#b9f2bb', [[4, 24]]],
  ['#6fd083', [[3, 25]]],
  ['#49a85f', [[3, 25]]],
  ['#bb8c63', [[4, 24]]],
  ['#97694a', [[5, 23]]],
  ['#7a5236', [[6, 21]]],
  ['#5f6a8f', [[8, 19]]],
  ['#4a5579', [[10, 17]]],
  ['#394267', [[12, 15]]],
  ['#394267', [[13, 14]]],
]

const ROOTS = [
  [7, 6, 1, 1, '#4a5579'],
  [19, 7, 1, 2, '#4a5579'],
  [10, 9, 1, 1, '#394267'],
]

// [x, y, w, h, colour] — y is negative because decorations sit above the grass.
const DECOR = {
  tree: [
    [6, -6, 3, 1, '#2f8f4a'],
    [5, -5, 5, 1, '#3fae5c'],
    [6, -4, 3, 1, '#2f8f4a'],
    [7, -3, 1, 3, '#6b4a2f'],
  ],
  house: [
    [17, -5, 5, 1, '#ff9ec4'],
    [16, -4, 7, 1, '#f07aa6'],
    [17, -3, 5, 3, '#fff7ea'],
    [19, -2, 1, 2, '#6b4a2f'],
    [21, -2, 1, 1, '#74bfff'],
  ],
  flag: [
    [13, -7, 1, 7, '#6b4a2f'],
    [14, -7, 4, 2, '#ff9ec4'],
  ],
  person: [
    [11, -6, 2, 2, '#1b2a66'],
    [10, -4, 4, 1, '#1b2a66'],
    [11, -3, 2, 1, '#1b2a66'],
    [11, -2, 1, 2, '#1b2a66'],
    [12, -2, 1, 2, '#1b2a66'],
  ],
}

export default function Island({ decor = [], className = '', style }) {
  const w = 28
  const top = -8
  const h = BODY.length - top
  return (
    <svg viewBox={`0 ${top} ${w} ${h}`} className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      {BODY.map(([c, segs], y) => segs.map(([a, b], i) => <rect key={`${y}-${i}`} x={a} y={y} width={b - a} height="1" fill={c} />))}
      {ROOTS.map(([x, y, rw, rh, c], i) => <rect key={`r${i}`} x={x} y={y} width={rw} height={rh} fill={c} />)}
      {decor.flatMap((d) => DECOR[d] ?? []).map(([x, y, rw, rh, c], i) => <rect key={`d${i}`} x={x} y={y} width={rw} height={rh} fill={c} />)}
    </svg>
  )
}
