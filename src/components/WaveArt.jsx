import { useMemo } from 'react'

/**
 * A pixel-art ocean surface in the spirit of Japanese woodblock prints:
 * a far swell, a great wave rising from the left with a curling crest and
 * foam claws, and a nearer, darker wave in front. Generated once on a
 * cell grid and drawn as merged runs, so it is crisp at any width.
 *
 *   <WaveArt className="w-full" />
 * Set W/H for the grid; the SVG scales to its box with slice cropping.
 */

const P = {
  farBody: '#3a5f8e', farLine: '#4f7aab', farFoam: '#d8dfe3',
  body: '#22467a', face: '#17325f', streak: '#3a66a0', shade: '#1b3a6a',
  foam: '#eef0ea', foamShade: '#c6d0d8',
  nearBody: '#152e5a', nearFace: '#102448', nearStreak: '#234a80',
  base: '#112a52',
}

const smooth = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))

export function buildWave(W = 320, H = 100) {
  const g = new Array(W * H).fill(null)
  const set = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < W && y >= 0 && y < H) g[y * W + x] = c }
  const get = (x, y) => (x >= 0 && x < W && y >= 0 && y < H ? g[y * W + x] : null)
  const fillBelow = (profile, c) => { for (let x = 0; x < W; x++) { const y0 = Math.round(profile(x)); for (let y = Math.max(0, y0); y < H; y++) set(x, y, c) } }

  /* --- far swell: low rolling water, a thin lit edge, sparse foam dashes --- */
  const far = (x) => H * 0.5 + 3 * Math.sin(x / 17) + 1.5 * Math.sin(x / 6.3 + 1)
  fillBelow(far, P.farBody)
  for (let x = 0; x < W; x++) {
    set(x, far(x), P.farLine)
    if (Math.sin(x / 17) > 0.92 && x % 3 !== 1) set(x, far(x) - 1, P.farFoam)
  }

  /* --- the great wave --- */
  const xc = W * 0.46, yc = H * 0.2, yt = H * 0.74
  const main = (x) => {
    if (x <= xc) return H * 0.82 - (H * 0.82 - yc) * smooth(x / xc) + 2 * Math.sin(x / 9) * (1 - x / xc)
    if (x <= xc + W * 0.22) { const t = (x - xc) / (W * 0.22); return yc + (yt - yc) * Math.pow(t, 0.55) }
    return yt - 5 * smooth((x - xc - W * 0.22) / (W - xc - W * 0.22)) + 1.5 * Math.sin(x / 8)
  }
  fillBelow(main, P.body)
  // darker face under the crest, lit streaks along the long slope
  for (let x = Math.round(xc); x < xc + W * 0.22; x++) { const t = (x - xc) / (W * 0.22); const d = 6 + 22 * Math.min(1, t * 2.2); for (let y = Math.round(main(x)) + 1; y < Math.min(H, main(x) + d); y++) if (get(x, y) === P.body) set(x, y, P.face) }
  for (let x = 0; x < xc; x++) {
    const y0 = main(x)
    for (const d of [3, 8, 14, 21, 29]) {
      const yy = y0 + d
      if (((x + d * 7) % 23) < 13 && get(x, yy) === P.body) set(x, yy, P.streak)
    }
    if (x % 2 === 0) set(x, y0, P.foamShade)
    if (((x + 5) % 9) < 4) set(x, y0 - 1, P.foam)
  }
  // the curl: an arc from the crest top, over and down, tapering
  const r = H * 0.17, cx = xc + 2, cy = yc + r
  for (let a = -95; a <= 70; a += 0.8) {
    const t = (a + 95) / 165
    const th = 7 - 4.5 * t
    const rad = (a * Math.PI) / 180
    for (let k = -th; k <= 1.5; k += 0.5) {
      const rr = r + k
      const x = cx + rr * Math.cos(rad), y = cy + rr * Math.sin(rad)
      set(x, y, k > 0 ? P.foam : k > -1.5 ? P.foamShade : k > -th + 1.5 ? P.body : P.shade)
    }
  }
  // foam claws hanging from the curl
  for (let a = -40; a <= 70; a += 11) {
    const rad = (a * Math.PI) / 180
    const x0 = cx + (r + 1.5) * Math.cos(rad), y0 = cy + (r + 1.5) * Math.sin(rad)
    const len = 3 + Math.round(5 * Math.abs(Math.sin(a * 0.7 + 1)))
    for (let i = 0; i < len; i++) set(x0 - Math.floor(i / 2), y0 + i, i < 2 ? P.foam : P.foamShade)
  }
  // foam spray above the crest
  for (let i = 0; i < 26; i++) {
    const x = cx - 24 + ((i * 37) % 52), y = yc - 3 - ((i * 13) % 9)
    if ((i * 7) % 5 !== 0) set(x, y, i % 3 ? P.foamShade : P.foam)
  }

  /* --- near wave: smaller, darker, in front, crest on the left --- */
  const nx = W * 0.2, ny = H * 0.6, nt = H * 0.9
  const near = (x) => {
    if (x <= nx) return H * 0.98 - (H * 0.98 - ny) * smooth(x / nx)
    if (x <= nx + W * 0.16) { const t = (x - nx) / (W * 0.16); return ny + (nt - ny) * Math.pow(t, 0.6) }
    return nt - 2 * smooth((x - nx - W * 0.16) / (W * 0.4)) + 1.2 * Math.sin(x / 7)
  }
  fillBelow(near, P.nearBody)
  for (let x = Math.round(nx); x < nx + W * 0.16; x++) { const t = (x - nx) / (W * 0.16); const d = 3 + 11 * Math.min(1, t * 2.2); for (let y = Math.round(near(x)) + 1; y < Math.min(H, near(x) + d); y++) if (get(x, y) === P.nearBody) set(x, y, P.nearFace) }
  for (let x = 0; x < W; x++) {
    const y0 = near(x)
    for (const d of [3, 8, 14]) { const yy = y0 + d; if (((x + d * 5) % 19) < 10 && get(x, yy) === P.nearBody) set(x, yy, P.nearStreak) }
    if (x < nx && ((x + 2) % 7) < 3) set(x, y0 - 1, P.foamShade)
  }
  const r2 = H * 0.09, c2x = nx + 1, c2y = ny + r2
  for (let a = -95; a <= 60; a += 1) {
    const t = (a + 95) / 155, th = 4 - 2.5 * t, rad = (a * Math.PI) / 180
    for (let k = -th; k <= 1; k += 0.5) { const rr = r2 + k; set(c2x + rr * Math.cos(rad), c2y + rr * Math.sin(rad), k > 0 ? P.foam : k > -1 ? P.foamShade : P.nearBody) }
  }
  for (let a = -30; a <= 60; a += 15) {
    const rad = (a * Math.PI) / 180
    const x0 = c2x + (r2 + 1) * Math.cos(rad), y0 = c2y + (r2 + 1) * Math.sin(rad)
    for (let i = 0; i < 3 + (a % 2 ? 2 : 0); i++) set(x0 - Math.floor(i / 2), y0 + i, i < 1 ? P.foam : P.foamShade)
  }
  // the base: solid dark water to the bottom edge
  for (let x = 0; x < W; x++) for (let y = H - 4; y < H; y++) set(x, y, P.base)

  /* --- merge runs --- */
  const rects = []
  for (let y = 0; y < H; y++) {
    let x = 0
    while (x < W) {
      const c = g[y * W + x]
      if (!c) { x++; continue }
      let x2 = x + 1
      while (x2 < W && g[y * W + x2] === c) x2++
      rects.push([x, y, x2 - x, c])
      x = x2
    }
  }
  return { rects, W, H }
}

export default function WaveArt({ W = 320, H = 100, className = '', style, preserveAspectRatio = 'xMidYMax slice' }) {
  const { rects } = useMemo(() => buildWave(W, H), [W, H])
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={preserveAspectRatio} className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      {rects.map(([x, y, w, c], i) => <rect key={i} x={x} y={y} width={w} height="1" fill={c} />)}
    </svg>
  )
}
