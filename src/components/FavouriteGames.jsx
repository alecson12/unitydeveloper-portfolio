import Reveal from './Reveal.jsx'
import Txt from './Txt.jsx'
import PixelIcon from './PixelIcon.jsx'
import { GAMES } from '../content/games.js'
import { isPlaceholder, shouldShow, asset } from '../lib/content.js'

/** The games listed in games.js that may be shown (placeholders only in local preview). */
export const visibleGames = () => GAMES.filter((g) => shouldShow(g.title))

/**
 * Games that inspire my work: a small panel right under About Me, like the Tools
 * panel in Skills. A shelf of little cover tiles, each a floating card:
 * cover on top, title and one line under it. Renders nothing when no
 * real game is listed.
 */
export default function FavouriteGames() {
  const games = visibleGames()
  if (!games.length) return null
  return (
    <Reveal>
      <div className="px-card p-5 sm:p-8">
        <p className="eyebrow flex items-center gap-3 text-beige"><span className="inline-block h-2 w-2 bg-red" />Games that inspire my work</p>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {games.map((g, i) => (
            <li key={`${g.title}-${i}`} className={`px-card px-card-lift flex h-full flex-col overflow-hidden ${isPlaceholder(g.title) ? 'placeholder-text' : ''}`}>
              <div className="relative aspect-[3/4] overflow-hidden border-b border-line bg-white/[0.04]">
                {g.cover ? (
                  <img src={asset(g.cover)} alt={g.title} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center"><PixelIcon name="controller" size={30} accent="#9fb4dc" /></div>
                )}
                {shouldShow(g.platform) && <Txt value={g.platform} className="absolute right-2 top-2 px-chip bg-black/50 px-2 py-1 text-[10px]" />}
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <span className="block font-display text-lg leading-none">{g.title}</span>
                <Txt as="span" value={g.genre} className="mt-1.5 block font-pixel text-[11px] tracking-[0.08em] text-dim uppercase" />
                <Txt as="p" value={g.note} className="mt-2 text-xs leading-relaxed text-ink-2" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
