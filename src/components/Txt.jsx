import { isPlaceholder, shouldShow } from '../lib/content.js'

/**
 * Renders a piece of content text.
 * Text in [square brackets] is a placeholder: it shows with a dashed
 * outline in local preview and is hidden on the published site.
 */
export default function Txt({ as: Tag = 'span', value, className = '', children, ...rest }) {
  const v = value ?? children
  if (!shouldShow(v)) return null
  return (
    <Tag className={`${className} ${isPlaceholder(v) ? 'placeholder-text' : ''}`.trim()} {...rest}>
      {v}
    </Tag>
  )
}
