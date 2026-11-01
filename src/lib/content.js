/**
 * Small helpers that read the content files. Nothing here needs editing
 * when you add projects or media — edit src/content/*.js instead.
 */
import { PROJECTS } from '../content/projects.js'

/** Projects that are allowed to appear on the site. */
export const visibleProjects = () => PROJECTS.filter((p) => p.visible !== false)

/** The project shown in the big slot on the homepage. */
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

/** Total number of media items in a project. */
export const countMedia = (project) =>
  (project.screens ?? []).reduce((n, s) => n + (s.media?.length ?? 0), 0)
