import { PROFILE } from '../content/profile.js'
import { shouldShow } from '../lib/content.js'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const availability = shouldShow(PROFILE.contact.availability) ? PROFILE.contact.availability : ''
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <a href="#start" className="font-mono text-[12px] tracking-[0.22em] uppercase transition hover:text-accent">{PROFILE.shortName ?? PROFILE.name}</a>
        <p className="label normal-case tracking-normal">© {YEAR} {PROFILE.shortName ?? PROFILE.name}. {PROFILE.footer.note}</p>
        {availability && (
          <p className="label flex items-center gap-2.5"><span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />{availability}</p>
        )}
      </div>
    </footer>
  )
}
