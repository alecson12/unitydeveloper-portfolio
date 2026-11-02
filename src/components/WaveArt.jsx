import { useMemo } from 'react'

/**
 * A pixel-art sea after the famous woodblock print: the great wave rises
 * from the left, its crest curls over to the right and breaks into long
 * foam claws over the trough; a second wave swells low on the right; the
 * water is striped with the print's concentric lines. Generated once on a
 * cell grid and drawn as merged runs, so it is crisp at any width.
 *
 *   <WaveArt className="w-full" />
 */

const P = {
  far: '#6f8ba6', farLine: '#5a7593',
  deep: '#17365f', body: '#24487a', mid: '#3a6594', light: '#7ea2c0', pale: '#b7cbdb',
  foam: '#ecebe2', foamShade: '#c9d3d9', sand: '#c4ae86',
  base: '#132f58',
}

const smooth = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))

export function buildWave(W = 320, H = 130) {
  const g = new Array(W * H).fill(null)
  const set = (x, y, c) => { x = Math.round(x); y = Math.round(y); if (x >= 0 && x < W && y >= 0 && y < H) g[y * W + x] = c }
  const get = (x, y) => { x = Math.round(x); y = Math.round(y); return x >= 0 && x < W && y >= 0 && y < H ? g[y * W + x] : null }

  /* ---------- far water: a calm band with thin dark lines ---------- */
  const horizon = H * 0.42
  for (let x = 0; x < W; x++) for (let y = Math.round(horizon + 2 * Math.sin(x / 23)); y < H; y++) set(x, y, P.far)
  for (let x = 0; x < W; x++) for (let k = 0; k < 6; k++) { const y = horizon + 4 + k * 5 + 1.5 * Math.sin(x / 11 + k); if (((x + k * 9) % 17) < 11) set(x, y, P.farLine) }

  /* ---------- the great wave ---------- */
  const xc = W * 0.3, yc = H * 0.1          // crest top
  const xl = xc + W * 0.3, yl = yc + H * 0.26 // lip tip
  const lipTop = (x) => { const t = (x - xc) / (xl - xc); return yc - 4 * Math.sin(t * Math.PI) * (1 - t) + (yl - yc) * Math.pow(t, 2.1) }
  const lipThick = (x) => { const t = (x - xc) / (xl - xc); return H * 0.3 * (1 - t) * (1 - t) + 7 }
  const slope = (x) => { const t = Math.max(0, Math.min(1, x / xc)); return yc + (H * 0.98 - yc) * Math.pow(1 - t, 1.45) * (1 - 0.35 * t) + 2.5 * Math.sin(x / 7) * t * (1 - t) }
  const faceRight = (y) => xc + W * 0.1 * Math.pow(Math.max(0, (y - yc)) / (H - yc), 1.5)

  // body left of the crest
  for (let x = 0; x <= xc; x++) for (let y = Math.round(slope(x)); y < H; y++) set(x, y, P.body)
  // the face below the crest, concave
  for (let y = Math.round(yc); y < H; y++) for (let x = Math.round(xc); x <= faceRight(y); x++) set(x, y, P.body)
  // the lip, thinning to the tip
  for (let x = Math.round(xc); x <= xl; x++) { const t0 = lipTop(x); for (let y = Math.round(t0); y < t0 + lipThick(x); y++) set(x, y, P.body) }

  // shading, continuous across the crest: stripes follow the top edge all the
  // way from the left slope over the lip; the underside of the curl and the
  // concave face are darkest
  const top = (x) => (x <= xc ? slope(x) : lipTop(x))
  for (let x = 0; x <= xl; x++) {
    const y0 = top(x)
    for (let d = 3; d < H; d += 6) {
      const yy = y0 + d + 1.5 * Math.sin(x / 13 + d)
      if (get(x, yy) !== P.body) continue
      const on = ((x + d * 5) % 19) < 12
      if (on) set(x, yy, d < 22 ? P.light : d < 50 ? P.mid : P.deep)
      if (on && d > 40 && x < xc && ((x + d) % 37) < 9) set(x, yy, P.sand)
    }
    if (x < xc) { if (x % 3 !== 1) set(x, y0, P.pale); if (((x + 4) % 7) < 3) set(x, y0 - 1, P.foam) }
  }
  for (let x = Math.round(xc); x <= xl; x++) {
    const t0 = lipTop(x), th = lipThick(x)
    for (let y = Math.round(t0 + th * 0.6); y < t0 + th; y++) if (get(x, y) === P.body || get(x, y) === P.mid) set(x, y, P.deep)
  }
  for (let y = Math.round(yc); y < H; y++) for (let x = Math.round(xc); x <= faceRight(y); x++) {
    const c = get(x, y)
    if (c !== P.body && c !== P.mid && c !== P.light) continue
    if (faceRight(y) - x < 2.5 && y > lipTop(x) + lipThick(x)) set(x, y, P.deep)
  }

  // the foam cap along the whole crest and lip
  for (let x = Math.round(xc * 0.55); x <= xl; x++) {
    const top = x < xc ? slope(x) : lipTop(x)
    const cap = x < xc ? 1 + 3 * smooth((x - xc * 0.55) / (xc * 0.45)) : 4 + 3 * (1 - (x - xc) / (xl - xc))
    for (let k = 0; k < cap; k++) set(x, top + k, k < cap - 1.5 ? P.foam : P.foamShade)
    if (x > xc * 0.75 && ((x * 7) % 11) < 4) set(x, top - 1 - ((x * 3) % 3), P.foam)
  }
  // foam claws hanging from the underside of the lip, longer toward the tip
  for (let x = Math.round(xc + 6); x <= xl + 2; x += 5) {
    const t = (x - xc) / (xl - xc)
    const y0 = lipTop(x) + lipThick(x) - 1
    const len = Math.round(3 + 11 * t + 3 * Math.abs(Math.sin(x * 0.9)))
    for (let i = 0; i < len; i++) { const xx = x - Math.floor(i / 2.2); set(xx, y0 + i, i < 2 ? P.foamShade : P.foam); if (i > 2 && i % 3 === 0) set(xx - 1, y0 + i, P.foamShade) }
  }
  // the tip itself: a cluster of longer claws reaching down and left
  for (let i = 0; i < 5; i++) {
    const x0 = xl - i * 3, y0 = lipTop(xl) + 6 + i * 2, len = 10 + i * 2
    for (let k = 0; k < len; k++) set(x0 - Math.floor(k / 1.8), y0 + k, k % 4 === 0 ? P.foamShade : P.foam)
  }
  // spray above the crest
  for (let i = 0; i < 40; i++) {
    const x = xc * 0.8 + ((i * 29) % Math.round(xl - xc * 0.8)), y = (x < xc ? slope(x) : lipTop(x)) - 3 - ((i * 7) % 8)
    if ((i * 5) % 3 !== 0) set(x, y, i % 3 ? P.foamShade : P.foam)
  }

  /* ---------- second wave, low on the right, breaking to the left ---------- */
  const x2 = W * 0.66, y2 = H * 0.5
  const s2 = (x) => (x >= x2 ? y2 + (H * 0.98 - y2) * (1 - Math.pow(1 - (x - x2) / (W - x2), 1.6)) * 0.35 : y2 + (H - y2) * (1 - smooth((x - x2 + W * 0.25) / (W * 0.25))))
  for (let x = Math.round(x2 - W * 0.25); x < W; x++) for (let y = Math.round(s2(x)); y < H; y++) if (get(x, y) !== P.body && get(x, y) !== P.deep && get(x, y) !== P.mid) set(x, y, P.body)
  for (let x = Math.round(x2 - W * 0.25); x < W; x++) {
    const y0 = s2(x)
    for (let d = 3; d < 40; d += 6) { const yy = y0 + d + Math.sin(x / 9 + d); if (get(x, yy) === P.body && ((x + d * 3) % 17) < 10) set(x, yy, d < 15 ? P.mid : P.deep) }
    if (x < x2 + 10) { set(x, y0, P.foam); set(x, y0 + 1, P.foamShade) }
    if (x >= x2 - 40 && x < x2 + 4 && ((x * 5) % 9) < 3) { const len = 3 + ((x * 3) % 5); for (let k = 0; k < len; k++) set(x + Math.floor(k / 2), y0 + 2 + k, k < 1 ? P.foamShade : P.foam) }
  }
  // its small curl at the left end
  const r2 = H * 0.07, c2x = x2 - W * 0.02, c2y = y2 + r2
  for (let a = -95; a <= 40; a += 1) { const t = (a + 95) / 135, th = 4 - 2 * t, rad = (a * Math.PI) / 180; for (let k = -th; k <= 1; k += 0.5) { const rr = r2 + k; set(c2x - rr * Math.cos(rad), c2y + rr * Math.sin(rad), k > 0 ? P.foam : k > -1 ? P.foamShade : P.body) } }

  /* ---------- the near swell across the bottom ---------- */
  const s3 = (x) => H * 0.86 + 3 * Math.sin(x / 15) + 1.5 * Math.sin(x / 5)
  for (let x = 0; x < W; x++) {
    for (let y = Math.round(s3(x)); y < H; y++) set(x, y, P.deep)
    if (((x + 2) % 13) < 8) set(x, s3(x), P.mid)
    if (((x + 7) % 23) < 6) set(x, s3(x) + 4, P.sand)
    if (((x * 5) % 31) < 5) set(x, s3(x) - 1, P.foamShade)
  }
  for (let x = 0; x < W; x++) for (let y = H - 3; y < H; y++) set(x, y, P.base)

  /* ---------- merge runs ---------- */
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

export default function WaveArt({ W = 320, H = 130, className = '', style, preserveAspectRatio = 'xMidYMax slice' }) {
  const { rects } = useMemo(() => buildWave(W, H), [W, H])
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio={preserveAspectRatio} className={className} style={style} shapeRendering="crispEdges" aria-hidden>
      {rects.map(([x, y, w, c], i) => <rect key={i} x={x} y={y} width={w} height="1" fill={c} />)}
    </svg>
  )
}
