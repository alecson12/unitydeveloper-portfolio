import Reveal from './Reveal.jsx'
import { PROFILE } from '../content/profile.js'

export default function Contact() {
  const { contact } = PROFILE
  return (
    <Reveal>
      <div className="px-border relative overflow-hidden bg-ink-2 px-6 py-12 sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="dither pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ maskImage: 'linear-gradient(180deg, transparent, black)', WebkitMaskImage: 'linear-gradient(180deg, transparent, black)' }}
        />
        <div className="relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="max-w-md text-lg leading-relaxed text-muted">{contact.text}</p>
            {contact.cv && (
              <a href={contact.cv} className="px-btn px-btn-primary mt-8">Download CV</a>
            )}
          </div>
          <ul className="grid gap-4 lg:col-span-6">
            {contact.links.map((l) => (
              <li key={l.kind + l.href}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="px-border group flex items-center gap-4 bg-ink px-4 py-3.5 transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  <span className="font-pixel w-20 shrink-0 text-[9px] tracking-[0.18em] text-accent uppercase">{l.kind}</span>
                  <span className="min-w-0 flex-1 truncate text-text/90">{l.label}</span>
                  <span className="font-pixel text-[10px] text-dim transition group-hover:text-accent">▶</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}
