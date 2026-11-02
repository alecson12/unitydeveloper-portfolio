import Reveal from './Reveal.jsx'

/** Honest empty state: a closed chest on the sea floor, nothing in it yet. */
export default function EmptyState({ message = 'Coming soon.', compact = false }) {
  return (
    <Reveal>
      <div className={`px-card flex flex-col items-center text-center ${compact ? 'px-6 py-10' : 'px-6 py-14 sm:py-20'}`}>
        <p className="eyebrow cursor-blink">Unexplored</p>
        <p className="mt-3 max-w-md text-balance text-ink-2">{message}</p>
      </div>
    </Reveal>
  )
}
