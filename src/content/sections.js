/**
 * =====================================================================
 *  SITE SECTIONS — headings of each homepage block, in page order
 * =====================================================================
 *  The page is a dive. `zone` is the water a section sits in
 *  (shallow · mid · deep · abyss); sections that share a zone share one
 *  continuous stretch of water. `depth` is the small depth label shown
 *  next to the heading. `nav` is the short label in the navigation
 *  (leave it out to keep a section off the menu). `intro` is optional.
 * ===================================================================== */

export const SECTIONS = [
  { id: 'start', nav: 'Start' },
  { id: 'about', nav: 'About Me', zone: 'shallow', depth: '5 m', eyebrow: 'About me' },
  { id: 'games', zone: 'shallow', depth: '20 m', eyebrow: 'Favourite games', heading: 'Games I keep coming back to' },
  { id: 'services', zone: 'shallow', depth: '40 m', eyebrow: 'What I do', heading: 'What I can build for you' },
  { id: 'skills', nav: 'Skills', zone: 'mid', depth: '200 m', eyebrow: 'Skills', heading: 'Tools & skills' },
  { id: 'projects', nav: 'Projects', zone: 'deep', depth: '1,000 m', eyebrow: 'Projects · flagship', heading: 'Rivalis Academia Nexus' },
  { id: 'ui-showcase', zone: 'deep', depth: '2,000 m', eyebrow: 'UI showcase', heading: 'The UI, feature by feature', intro: 'Tap a screenshot to enlarge it. Press play for the real thing.' },
  { id: 'more-projects', zone: 'deep', depth: '3,000 m', eyebrow: 'Projects · more', heading: 'More to surface', empty: 'More projects are on the way.' },
  { id: 'contact', nav: 'Contact', zone: 'abyss', depth: '4,000 m', eyebrow: 'Contact', heading: 'Let’s talk' },
]
