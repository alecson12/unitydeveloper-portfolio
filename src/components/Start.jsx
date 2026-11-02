import { PROFILE } from '../content/profile.js'

/**
 * The opening screen: Alecson's pixel-art Great Wave, as is. The sky
 * colour continues above the picture so the top of the screen stays
 * free for a title (the empty #start-title block).
 */
export default function Start() {
  const { start } = PROFILE
  return (
    <section id="start" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: '#2894e9' }}>
      <div className="container-x relative z-10 flex flex-1 flex-col pt-24 sm:pt-28">
        <div id="start-title" className="min-h-[34svh] sm:min-h-[36svh]" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <img
          src="/media/start/great-wave.webp"
          alt=""
          width="1672"
          height="941"
          fetchPriority="high"
          className="pixelated relative mx-auto block w-[175vw] max-w-none -translate-x-[18%] sm:w-full sm:translate-x-0"
          style={{ marginBottom: 'min(0px, calc(62svh - 100vw * 0.5628))', maskImage: 'linear-gradient(180deg, transparent 0%, #000 14%)', WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 14%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[12svh]" style={{ background: 'linear-gradient(180deg, rgba(22,58,102,0) 0%, rgba(22,58,102,0.85) 100%)' }} />
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-pixel text-[12px] tracking-[0.1em] text-[#eef0ea] uppercase drop-shadow-[0_1px_0_rgba(5,15,40,0.7)]">
        {start.hint}
        <span className="bob inline-block" style={{ '--bob': '2.2s' }}>▼</span>
      </a>
    </section>
  )
}
