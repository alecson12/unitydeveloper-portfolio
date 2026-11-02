import Reveal from './Reveal.jsx'
import Txt from './Txt.jsx'
import { PROFILE } from '../content/profile.js'
import { shouldShow, isPlaceholder } from '../lib/content.js'

/**
 * The close: a label, one big line, the email as the main link, then the
 * other links in a row. Centred, with nothing else around it.
 */
export default function Contact({ meta }) {
  const { contact } = PROFILE
  const links = contact.links.filter((l) => shouldShow(l.label))
  const email = links.find((l) => l.kind === 'email')
  const others = links.filter((l) => l !== email)

  return (
    <Reveal>
      <div className="flex flex-col items-center py-10 text-center sm:py-16">
        {meta?.label && <p className="label"><span className="text-accent">/</span>{meta.label}</p>}
        {meta?.heading && (
          <h2 className="mt-6 max-w-4xl font-display text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {meta.heading}
          </h2>
        )}
        <p className="mt-8 max-w-md text-lg text-ink-2">{contact.text}</p>

        {email && (
          <a href={email.href} className="link mt-10 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{email.label}</a>
        )}

        {(others.length > 0 || contact.cv) && (
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {others.map((l) => (
              <li key={l.kind + l.href}>
                <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`label transition hover:text-ink ${isPlaceholder(l.label) ? 'placeholder-text' : ''}`}>
                  {l.kind} ↗
                </a>
              </li>
            ))}
            {contact.cv && <li><a href={contact.cv} className="label transition hover:text-ink">Download CV ↓</a></li>}
          </ul>
        )}

        <Txt as="p" value={contact.availability} className="label mt-14 flex items-center gap-2.5 before:inline-block before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent" />
      </div>
    </Reveal>
  )
}
