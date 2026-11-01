import Reveal from './Reveal.jsx'
import { PROFILE } from '../content/profile.js'

const ICONS = {
  email: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  github: <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />,
  linkedin: <path d="M6 9v12M6 5v.1M10 21v-7a3 3 0 0 1 6 0v7M10 9v3" />,
  itch: <path d="M4 7l2-3h12l2 3v3a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1-6 0 3 3 0 0 1-4 0zM5 13v7h14v-7" />,
  default: <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />,
}

export default function Contact() {
  const { contact } = PROFILE
  return (
    <Reveal>
      <div className="glass relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(700px 300px at 80% 110%, rgba(124,196,255,0.18), transparent 70%), radial-gradient(500px 260px at 10% -20%, rgba(198,163,255,0.14), transparent 70%)' }}
        />
        <div className="relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="max-w-md text-lg leading-relaxed text-muted">{contact.text}</p>
            {contact.cv && (
              <a href={contact.cv} className="mt-6 inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-white">
                Download CV
              </a>
            )}
          </div>
          <ul className="grid gap-3 lg:col-span-6">
            {contact.links.map((l) => (
              <li key={l.kind + l.href}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-ink/40 px-4 py-3.5 transition hover:border-accent/40 hover:bg-ink/60"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-muted transition group-hover:text-accent">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[l.kind] ?? ICONS.default}
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] tracking-[0.2em] text-dim uppercase">{l.kind}</span>
                    <span className="block truncate text-text/90">{l.label}</span>
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-dim transition group-hover:translate-x-0.5 group-hover:text-accent"><path d="M7 17L17 7M8 7h9v9" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}
