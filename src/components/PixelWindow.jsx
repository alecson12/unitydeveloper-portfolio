/**
 * A media holder styled like a tiny game window: a title bar with three
 * pixel squares and a label, then a stage underneath.
 *   stage: 'deep' (dark, for screenshots and video) or 'cloud' (white)
 */
export default function PixelWindow({ label, badge, children, className = '', stage = 'deep' }) {
  return (
    <div className={`px-window ${className}`}>
      <div className="flex h-9 items-center gap-2 border-b-2 border-ink bg-cloud-2 px-3">
        <span className="h-2.5 w-2.5 bg-pink" />
        <span className="h-2.5 w-2.5 bg-sky" />
        <span className="h-2.5 w-2.5 bg-lavender" />
        {label && <span className="ml-2 truncate font-pixel text-[9px] tracking-[0.14em] text-ink-2 uppercase">{label}</span>}
        {badge && <span className="ml-auto shrink-0 whitespace-nowrap font-pixel text-[9px] tracking-[0.14em] text-dim uppercase">{badge}</span>}
      </div>
      <div className={`relative ${stage === 'deep' ? 'bg-deep' : 'bg-cloud'}`}>{children}</div>
    </div>
  )
}
