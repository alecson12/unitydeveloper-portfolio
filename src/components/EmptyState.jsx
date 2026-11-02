import Reveal from './Reveal.jsx'

/** Honest empty state: a ruled box with one line, nothing else. */
export default function EmptyState({ message = 'Coming soon.', compact = false }) {
  return (
    <Reveal>
      <div className={`flex flex-col items-start rounded-[6px] border border-dashed border-line-2 ${compact ? 'px-6 py-8' : 'px-8 py-14'}`}>
        <p className="label">Coming soon</p>
        <p className="mt-3 max-w-md text-ink-2">{message}</p>
      </div>
    </Reveal>
  )
}
