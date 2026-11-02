import Reveal from './Reveal.jsx'
import PixelIcon from './PixelIcon.jsx'
import Island from './Island.jsx'
import Txt from './Txt.jsx'
import { PROFILE } from '../content/profile.js'
import { shouldShow, isPlaceholder } from '../lib/content.js'

const ICON = { email: 'mail', github: 'code', linkedin: 'person' }

export default function Contact() {
  const { contact } = PROFILE
  const links = contact.links.filter((l) => shouldShow(l.label))
  return (
    <Reveal>
      <div className="px-card relative p-6 sm:p-12">
        <Island decor={['flag']} className="bob pointer-events-none absolute right-8 -top-10 hidden w-36 opacity-90 lg:block" aria-hidden />
        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="max-w-md text-lg leading-relaxed text-ink-2">{contact.text}</p>
            <Txt as="p" value={contact.availability} className="mt-4 px-chip normal-case tracking-normal font-sans text-sm" />
            {contact.cv && (
              <a href={contact.cv} className="px-btn px-btn-primary mt-8">Download CV</a>
            )}
          </div>
          <ul className="grid grid-cols-1 gap-4 lg:col-span-6">
            {links.length === 0 && (
              <li className="px-chip w-max">Links coming soon</li>
            )}
            {links.map((l) => (
              <li key={l.kind + l.href}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`px-card px-card-lift group flex items-center gap-4 px-4 py-3.5 ${isPlaceholder(l.label) ? 'placeholder-text' : ''}`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center bg-white/10 px-border"><PixelIcon name={ICON[l.kind] ?? 'star'} size={18} /></span>
                  <span className="font-pixel w-16 shrink-0 text-[9px] tracking-[0.18em] text-purple uppercase">{l.kind}</span>
                  <span className="min-w-0 flex-1 truncate">{l.label}</span>
                  <span className="font-pixel text-[10px] text-dim transition group-hover:text-purple">▶</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}
