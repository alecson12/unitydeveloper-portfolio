import PixelCloud from './PixelCloud.jsx'

/**
 * The sky behind the whole site: slow pixel clouds drifting across a fixed
 * layer. The gradient itself is on <body> (see index.css).
 */
// [top %, width px, opacity, seconds to cross, start offset s, shape]
const CLOUDS = [
  [4, 280, 0.95, 150, -30, 2],
  [11, 170, 0.7, 210, -120, 1],
  [19, 340, 0.9, 170, -70, 0],
  [27, 130, 0.6, 240, -40, 1],
  [36, 260, 0.85, 185, -160, 2],
  [46, 200, 0.7, 200, -10, 0],
  [55, 320, 0.8, 160, -95, 2],
  [64, 150, 0.6, 230, -140, 1],
  [73, 240, 0.85, 175, -50, 0],
  [83, 300, 0.9, 155, -110, 2],
  [91, 180, 0.7, 205, -20, 1],
]

export default function Sky() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {CLOUDS.map(([top, w, o, dur, delay, v], i) => (
        <PixelCloud
          key={i}
          variant={v}
          className="cloud"
          style={{ top: `${top}%`, width: `min(${w}px, 55vw)`, opacity: o, '--dur': `${dur}s`, '--delay': `${delay}s` }}
        />
      ))}
    </div>
  )
}
