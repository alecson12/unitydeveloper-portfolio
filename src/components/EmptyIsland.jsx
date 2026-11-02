import Reveal from './Reveal.jsx'
import Island from './Island.jsx'

/** Honest empty state: a small floating island with nothing built on it yet. */
export default function EmptyIsland({ message = 'Coming soon.', compact = false }) {
  return (
    <Reveal>
      <div className={`px-card flex flex-col items-center text-center ${compact ? 'px-6 py-10' : 'px-6 py-14 sm:py-20'}`}>
        <Island decor={['flag']} className="bob w-24 sm:w-32" />
        <p className="eyebrow mt-6 cursor-blink">Under construction</p>
        <p className="mt-3 max-w-md text-balance text-ink-2">{message}</p>
      </div>
    </Reveal>
  )
}
