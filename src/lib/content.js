/**
 * Small helpers that read the content files. Nothing here needs editing
 * when you add projects or media — edit src/content/*.js instead.
 */
import { PROJECTS } from '../content/projects.js'

/** Projects that are allowed to appear on the site. */
export const visibleProjects = () => PROJECTS.filter((p) => p.visible !== false)

/** The project shown in the flagship slot on the homepage. */
export const featuredProject = () =>
  visibleProjects().find((p) => p.featured) ?? visibleProjects()[0] ?? null

/** Every visible project except the featured one. */
export const otherProjects = () => {
  const featured = featuredProject()
  return visibleProjects().filter((p) => p !== featured)
}

export const projectById = (id) => PROJECTS.find((p) => p.id === id) ?? null

/** Does a media item actually have something to show? */
export const hasSource = (item) => Boolean(item && item.src && item.src.trim())

/** All features of a project, flattened, each tagged with its category. */
export const featuresOf = (project) =>
  (project.categories ?? []).flatMap((c) => (c.features ?? []).map((f) => ({ ...f, category: c })))

/** Counts used in the case-study facts. */
export const countMedia = (project) => {
  const features = featuresOf(project)
  const media = features.flatMap((f) => f.media ?? [])
  return {
    categories: (project.categories ?? []).length,
    features: features.length,
    videos: media.filter((m) => m.type === 'video').length,
    images: media.filter((m) => m.type !== 'video').length,
  }
}

/** Counts across every visible project (for the About highlights). */
export const totals = () =>
  visibleProjects().reduce(
    (t, p) => {
      const c = countMedia(p)
      return { projects: t.projects + 1, features: t.features + c.features, videos: t.videos + c.videos, images: t.images + c.images }
    },
    { projects: 0, features: 0, videos: 0, images: 0 },
  )

/** Aspect ratio of a media item (width / height), 16:9 when unknown. */
export const aspectOf = (item) => (item?.width && item?.height ? item.width / item.height : 16 / 9)

/** Text in [square brackets] is a placeholder waiting for real content. */
export const isPlaceholder = (s) => typeof s === 'string' && /^\s*\[.*\]\s*$/.test(s)

/** Should this text be rendered? Placeholders only show in local preview. */
export const shouldShow = (s) => Boolean(s) && (!isPlaceholder(s) || import.meta.env.DEV)

/** Items with  confirmed: false  only show in local preview. */
export const isDraft = (item) => item?.confirmed === false
export const shouldShowItem = (item) => Boolean(item) && (!isDraft(item) || import.meta.env.DEV)

/** Resolve 'auto:<key>' highlight values from the content. */
export const resolveAuto = (value) => {
  if (typeof value !== 'string' || !value.startsWith('auto:')) return value
  const t = totals()
  return String(t[value.slice(5)] ?? '')
}
