/**
 * A larger floating island, drawn procedurally from a seed so every island
 * in the world is different but shares one palette: grass, soil and rock
 * tapering down, with optional trees, a tower, a house, a waterfall and
 * surface rocks. Set the size with a width class/style.
 *
 *   <WorldIsland w={64} seed={7} trees={5} tower waterfall />
 */
const P = {
  grassL: '#c4f6c6', grass: '#73d487', grassD: '#3f9d57',
  soil: '#bd8e64', soilD: '#8e6141',
  rock: '#6c7499', rockD: '#4b5680', rockX: '#363e66',
  water: '#8fdcff', waterD: '#5fb8f0', foam: '#ffffff',
  trunk: '#6b4a2f', leaf: '#2f8f4a', leafL: '#4bb86b',
  stone: '#dde2f7', stoneD: '#aab2dc', roof: '#f07aa6', roofD: '#c95a86', window: '#ffd166',
  wall: '#fff5e6',
}

function rng(seed) {
  let s = (seed * 2654435761) >>> 0 || 1
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296)
}

export default function WorldIsland({ w = 48, seed = 1, trees = 4, tower = false, house = false, waterfall = false, rocks = 2, className = '', style }) {
  const r = rng(seed)
  const cells = []
  const put = (x, y, cw, ch, c) => cells.push([x, y, cw, ch, c])

  // --- body profile: insets grow quadratically with a little jitter
  const depth = Math.max(8, Math.round(w * 0.42))
  const rows = []
  let li = 0, ri = 0
  for (let y = 0; y < depth; y++) {
    const t = y / depth
    const target = Math.round((w / 2) * t * t)
    li = Math.max(li, target + (r() < 0.45 ? 1 : 0))
    ri = Math.max(ri, target + (r() < 0.45 ? 1 : 0))
    if (li + ri >= w - 2) break
    rows.push([li, w - ri])
  }
  rows.forEach(([a, b], y) => {
    let c
    if (y === 0) c = P.grassL
    else if (y === 1) c = P.grass
    else if (y === 2) c = P.grassD
    else if (y < 5) c = P.soil
    else if (y < 7) c = P.soilD
    else c = y < rows.length * 0.7 ? P.rock : P.rockD
    put(a, y, b - a, 1, c)
    if (y >= 7 && b - a > 4 && r() < 0.85) {
      const x = a + 1 + Math.floor(r() * (b - a - 3))
      put(x, y, 1 + Math.floor(r() * 3), 1, r() < 0.5 ? P.rockD : P.rockX)
    }
    if (y === 1 && r() < 0.6) put(a + 1 + Math.floor(r() * (b - a - 2)), y, 2, 1, P.grassL)
  })
  // hanging roots / loose rocks under the island
  const last = rows[rows.length - 1]
  if (last) {
    put(last[0] + 1, rows.length, 1, 1 + Math.floor(r() * 2), P.rockD)
    put(last[1] - 2, rows.length + 1, 1, 1, P.rockX)
    put(Math.round((last[0] + last[1]) / 2), rows.length + 2 + Math.floor(r() * 2), 2, 1, P.rockD)
  }

  // --- waterfall from the right third of the island, falling past the bottom
  if (waterfall) {
    const x = Math.round(w * 0.66)
    const h = rows.length + 10
    put(x - 1, 0, 1, 1, P.water)
    put(x, 0, 2, h, P.water)
    put(x + 1, 2, 1, h - 2, P.waterD)
    for (let y = 1; y < h; y += 3) put(x + (y % 2), y, 1, 1, P.foam)
    put(x - 1, h, 4, 1, 'rgba(255,255,255,0.7)')
    put(x - 2, h + 1, 6, 1, 'rgba(255,255,255,0.35)')
  }

  // --- tower on the left third
  let towerX = -99
  if (tower) {
    towerX = Math.round(w * 0.22)
    const h = Math.max(9, Math.round(w * 0.2))
    put(towerX, -h, 5, h, P.stone)
    put(towerX, -h, 1, h, P.stoneD)
    put(towerX + 4, -h, 1, h, P.stoneD)
    for (let i = 0; i < 5; i += 2) put(towerX + i, -h - 1, 1, 1, P.stone)
    put(towerX + 2, -h + 3, 1, 2, P.window)
    put(towerX + 2, -h + 7, 1, 1, P.window)
    put(towerX - 1, -h - 3, 7, 2, P.roof)
    put(towerX, -h - 5, 5, 2, P.roofD)
    put(towerX + 2, -h - 6, 1, 1, P.roof)
    put(towerX + 2, -h - 8, 1, 2, P.trunk)
    put(towerX + 3, -h - 8, 2, 1, P.pink ?? '#ff9ec4')
  }

  // --- house on the right third
  let houseX = -99
  if (house) {
    houseX = Math.round(w * 0.58)
    put(houseX, -3, 7, 3, P.wall)
    put(houseX - 1, -4, 9, 1, P.roof)
    put(houseX, -5, 7, 1, P.roof)
    put(houseX + 1, -6, 5, 1, P.roofD)
    put(houseX + 2, -7, 3, 1, P.roofD)
    put(houseX + 3, -2, 1, 2, P.trunk)
    put(houseX + 1, -2, 1, 1, '#74bfff')
    put(houseX + 5, -2, 1, 1, '#74bfff')
  }

  // --- trees, avoiding the buildings
  let placed = 0, tries = 0
  while (placed < trees && tries < 40) {
    tries++
    const x = 2 + Math.floor(r() * (w - 6))
    if (Math.abs(x - towerX) < 7 || Math.abs(x - houseX) < 9) continue
    const h = 2 + Math.floor(r() * 3)
    put(x, -h - 3, 3, 1, P.leaf)
    put(x - 1, -h - 2, 5, 2, P.leafL)
    put(x, -h - 2, 1, 1, P.leaf)
    put(x, -h, 3, 1, P.leaf)
    put(x + 1, -h + 1, 1, h - 1, P.trunk)
    placed++
  }

  // --- small rocks on the grass
  for (let i = 0; i < rocks; i++) {
    const x = 2 + Math.floor(r() * (w - 5))
    if (Math.abs(x - towerX) < 7 || Math.abs(x - houseX) < 9) continue
    put(x, -1, 2, 1, P.stoneD)
    put(x, -2, 1, 1, P.stone)
  }

  const minY = -(Math.max(9, Math.round(w * 0.2)) + 10)
  const totalH = rows.length + 14 - minY
  return (
    <svg viewBox={`0 ${minY} ${w} ${totalH}`} className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      {cells.map(([x, y, cw, ch, c], i) => <rect key={i} x={x} y={y} width={cw} height={ch} fill={c} />)}
    </svg>
  )
}
