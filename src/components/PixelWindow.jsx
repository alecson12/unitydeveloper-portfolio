/**
 * A screenshot holder styled like a tiny game window: a title bar with
 * three pixel squares and a label, then the media underneath.
 */
export default function PixelWindow({ label, badge, children, className = '' }) {
  return (
    <div className={`px-window ${className}`}>
      <div className="flex h-8 items-center gap-2 border-b-2 border-white/10 bg-ink-3/70 px-3">
        <span className="h-2 w-2 bg-accent" />
        <span className="h-2 w-2 bg-accent-2" />
        <span className="h-2 w-2 bg-white/30" />
        {label && <span className="ml-2 truncate font-pixel text-[9px] tracking-[0.14em] text-muted uppercase">{label}</span>}
        {badge && <span className="ml-auto shrink-0 whitespace-nowrap font-pixel text-[9px] tracking-[0.14em] text-dim uppercase">{badge}</span>}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
