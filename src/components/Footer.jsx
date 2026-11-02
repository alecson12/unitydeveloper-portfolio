import { PROFILE } from '../content/profile.js'

const YEAR = new Date().getFullYear()

/** The sea floor: a dark sand band, then the footer in the abyss. */
export default function Footer() {
  return (
    <footer className="relative z-10 bg-abyss">
      <svg aria-hidden className="block h-5 w-full sm:h-7" viewBox="0 0 100 5" preserveAspectRatio="none" shapeRendering="crispEdges">
        <rect x="0" y="0" width="100" height="1" fill="#1b2350" />
        <rect x="0" y="1" width="100" height="1.5" fill="#141b40" />
        <rect x="0" y="2.5" width="100" height="2.5" fill="#0d1230" />
        <rect x="12" y="0" width="3" height="1" fill="#2a3468" />
        <rect x="47" y="0" width="2" height="1" fill="#2a3468" />
        <rect x="80" y="0" width="4" height="1" fill="#2a3468" />
      </svg>
      <div className="py-10 text-ink-2">
        <div className="container-x flex flex-col items-start justify-between gap-3 text-sm sm:flex-row sm:items-center">
          <p>© {YEAR} {PROFILE.shortName ?? PROFILE.name}. {PROFILE.footer.note}</p>
          <a href="#start" className="font-pixel text-[12px] tracking-[0.08em] uppercase transition hover:text-ink">▲ Back to the surface</a>
        </div>
      </div>
    </footer>
  )
}
