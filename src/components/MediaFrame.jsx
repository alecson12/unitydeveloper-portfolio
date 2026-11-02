/**
 * The frame around a screenshot or video: a black stage with a hairline
 * border, and a small mono caption line underneath (label left, badge right).
 */
export default function MediaFrame({ label, badge, children, className = '', stage = true }) {
  return (
    <div className={className}>
      <div className={`frame ${stage ? '' : 'bg-transparent'}`}>{children}</div>
      {(label || badge) && (
        <div className="mt-2.5 flex items-center justify-between gap-4">
          {label && <span className="label truncate normal-case tracking-[0.06em]">{label}</span>}
          {badge && <span className="label shrink-0">{badge}</span>}
        </div>
      )}
    </div>
  )
}
