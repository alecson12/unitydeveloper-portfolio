import PixelCloud from './PixelCloud.jsx'
import Island from './Island.jsx'

/** A breather between sections: a floating island between two clouds. */
export default function CloudDivider({ decor = ['tree'], island = true }) {
  return (
    <div aria-hidden className="container-x">
      <div className="relative flex h-28 items-center justify-center sm:h-36">
        <PixelCloud variant={0} className="absolute left-[4%] top-1 w-28 opacity-90 sm:w-44" />
        <PixelCloud variant={1} className="absolute right-[8%] bottom-1 w-20 opacity-80 sm:w-32" />
        {island && (
          <Island decor={decor} className="bob w-28 sm:w-36" style={{ filter: 'drop-shadow(6px 8px 0 rgba(27,42,102,0.18))' }} />
        )}
      </div>
    </div>
  )
}
