import { PROFILE } from '../content/profile.js'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col items-start justify-between gap-3 text-sm text-dim sm:flex-row sm:items-center">
        <p>© {YEAR} {PROFILE.name}. {PROFILE.footer.note}</p>
        <a href="#top" className="font-mono text-[11px] tracking-widest uppercase transition hover:text-text">Back to top ↑</a>
      </div>
    </footer>
  )
}
