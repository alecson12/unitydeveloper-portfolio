import Reveal from './Reveal.jsx'
import Txt from './Txt.jsx'
import PixelIcon from './PixelIcon.jsx'
import { GAMES } from '../content/games.js'
import { isPlaceholder, shouldShow } from '../lib/content.js'

/** The games listed in games.js that may be shown (placeholders only in local preview). */
export const visibleGames = () => GAMES.filter((g) => shouldShow(g.title))

/**
 * Favourite games: one card per game, cover on top, title and a line on
 * what you take from it below. Reads like a shelf.
 */
export default function FavouriteGames() {
  const games = visibleGames()
  if (!games.length) return null
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
      {games.map((g, i) => (
        <Reveal key={`${g.title}-${i}`} delay={Math.min(i * 0.05, 0.3)}>
          <article className={`px-card px-card-lift h-full overflow-hidden ${isPlaceholder(g.title) ? 'placeholder-text' : ''}`}>
            <div className="relative aspect-[3/4] overflow-hidden border-b border-line bg-white/[0.04]">
              {g.cover ? (
                <img src={g.cover} alt={g.title} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center">
                  <PixelIcon name="controller" size={36} accent="#9fb4dc" />
                </div>
              )}
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="font-display text-2xl leading-tight tracking-tight">{g.title}</h3>
              <Txt as="p" value={g.studio} className="mt-1 text-xs text-ink-2" />
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[g.platform, g.genre].filter(shouldShow).map((c) => <Txt key={c} value={c} className="px-chip px-2 py-1 text-[11px]" />)}
              </div>
              <Txt as="p" value={g.note} className="mt-3 text-sm leading-relaxed text-ink-2" />
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
