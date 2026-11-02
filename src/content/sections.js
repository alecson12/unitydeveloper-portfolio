/**
 * =====================================================================
 *  SITE SECTIONS — headings of each homepage block, in page order
 * =====================================================================
 *  `nav` is the short label in the navigation (leave it out to keep a
 *  section off the menu). The content of each block comes from
 *  profile.js, about.js, projects.js and showcases.js.
 * ===================================================================== */

export const SECTIONS = [
  {
    id: 'about',
    nav: 'About Me',
    // The opening screen: name, photo, introduction (content in profile.js → hero).
  },
  {
    id: 'profile',
    eyebrow: 'Professional background',
    heading: 'Where I come from, what I bring',
    intro: 'Experience, strengths and the way I like to work.',
  },
  {
    id: 'services',
    eyebrow: 'What I do',
    heading: 'What I can build for you',
    intro: 'The kinds of work I take on. Anything not yet confirmed stays hidden until it is.',
  },
  {
    id: 'toolkit',
    eyebrow: 'My development toolkit',
    heading: 'Tools I built for myself',
    intro: 'Editor extensions, reusable systems and utilities that make my own work faster.',
    empty: 'Toolkit entries are being written up. Add one in src/content/about.js and it appears here.',
  },
  {
    id: 'projects',
    nav: 'Projects',
    eyebrow: 'Projects · flagship',
    heading: 'Rivalis Academia Nexus',
    intro: 'A complete mobile MMORPG interface, shown with the real recordings.',
  },
  {
    id: 'ui-showcase',
    eyebrow: 'UI showcase',
    heading: 'Every interface, feature by feature',
    intro: 'Grouped by what each one does for the player. Tap a screenshot to enlarge it; press play to watch the real thing.',
  },
  {
    id: 'more-projects',
    eyebrow: 'Projects · more',
    heading: 'More islands',
    intro: 'Other games, prototypes, gameplay write-ups and freelance work.',
    empty: 'More projects are on the way.',
  },
  {
    id: 'skills',
    nav: 'Skills',
    eyebrow: 'Skills & expertise',
    heading: 'Tools, technologies and what I do with them',
  },
  {
    id: 'contact',
    nav: 'Contact',
    eyebrow: 'Contact',
    heading: 'Let’s build something',
  },
]
