import { PROFILE } from '../content/profile.js'

const YEAR = new Date().getFullYear()

/** Ground level: a pixel grass band, then the footer on deep blue. */
export default function Footer() {
  return (
    <footer className="relative mt-16">
      <svg aria-hidden className="block h-6 w-full sm:h-8" viewBox="0 0 100 6" preserveAspectRatio="none" shapeRendering="crispEdges">
        <rect x="0" y="0" width="100" height="1.5" fill="#b9f2bb" />
        <rect x="0" y="1.5" width="100" height="1.5" fill="#6fd083" />
        <rect x="0" y="3" width="100" height="1.5" fill="#49a85f" />
        <rect x="0" y="4.5" width="100" height="1.5" fill="#97694a" />
      </svg>
      <div className="bg-deep py-10 text-cloud/70">
        <div className="container-x flex flex-col items-start justify-between gap-3 text-sm sm:flex-row sm:items-center">
          <p>© {YEAR} {PROFILE.name}. {PROFILE.footer.note}</p>
          <a href="#top" className="font-pixel text-[9px] tracking-[0.18em] uppercase transition hover:text-cloud">▲ Back to the sky</a>
        </div>
      </div>
    </footer>
  )
}
