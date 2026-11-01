import Reveal from './Reveal.jsx'

/** Pixel-styled empty state for anything that has nothing to show yet. */
export default function ComingSoon({ message = 'Coming soon.', compact = false }) {
  return (
    <Reveal>
      <div className={`px-border bg-ink-2 text-center ${compact ? 'px-6 py-10' : 'px-6 py-16 sm:py-24'}`}>
        <p className="eyebrow cursor-blink">Loading</p>
        <p className="mx-auto mt-4 max-w-md text-balance text-muted">{message}</p>
      </div>
    </Reveal>
  )
}
