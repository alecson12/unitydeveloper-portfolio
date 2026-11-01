import Reveal from './Reveal.jsx'

/** Tasteful empty state for sections that do not have content yet. */
export default function ComingSoon({ message = 'Coming soon.', compact = false }) {
  return (
    <Reveal>
      <div
        className={`glass relative overflow-hidden rounded-2xl text-center ${compact ? 'px-6 py-10' : 'px-6 py-16 sm:py-24'}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(600px 200px at 50% 120%, rgba(124,196,255,0.18), transparent 70%)',
          }}
        />
        <div className="relative mx-auto flex max-w-md flex-col items-center gap-4">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-accent/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="eyebrow">In progress</p>
          <p className="text-balance text-muted">{message}</p>
        </div>
      </div>
    </Reveal>
  )
}
