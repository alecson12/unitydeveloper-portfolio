/**
 * A media holder styled like a tiny game window: a title bar with three
 * pixel squares and a label, then a stage underneath.
 *   stage: 'night' (near-black, for screenshots and video) or 'sky' (light)
 */
export default function PixelWindow({ label, badge, children, className = '', stage = 'night' }) {
  return (
    <div className={`px-window ${className}`}>
      <div className="px-window-bar flex h-9 items-center gap-2 px-3">
        <span className="h-2.5 w-2.5 bg-pink" />
        <span className="h-2.5 w-2.5 bg-sky" />
        <span className="h-2.5 w-2.5 bg-lavender" />
        {label && <span className="ml-2 truncate font-pixel text-[12px] tracking-[0.08em] text-ink-2 uppercase">{label}</span>}
        {badge && <span className="ml-auto shrink-0 whitespace-nowrap font-pixel text-[12px] tracking-[0.08em] text-dim uppercase">{badge}</span>}
      </div>
      <div className={`relative ${stage === 'sky' ? 'bg-cyan' : 'bg-night'}`}>{children}</div>
    </div>
  )
}
