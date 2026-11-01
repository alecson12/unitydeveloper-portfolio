/**
 * =====================================================================
 *  SITE SECTIONS — the headings and intro lines of each homepage block
 * =====================================================================
 *  The order of this list is the order of the sections on the page and
 *  in the sticky navigation. `nav` is the short label in the navigation.
 *  The content inside each block comes from profile.js and projects.js.
 *  `comingSoon` is the message shown when a block has nothing to show yet.
 * ===================================================================== */

export const SECTIONS = [
  {
    id: 'featured',
    nav: 'Featured',
    eyebrow: 'Featured project',
    heading: 'Case study',
    intro: 'A closer look at the game I have spent the most time inside.',
  },
  {
    id: 'projects',
    nav: 'Projects',
    eyebrow: 'Other work',
    heading: 'More projects',
    intro: 'Prototypes, jams and smaller builds.',
    comingSoon: 'More projects are on the way. Rivalis Academia Nexus is the current focus.',
  },
  {
    id: 'gameplay',
    nav: 'Gameplay',
    eyebrow: 'Gameplay programming',
    heading: 'Systems in motion',
    intro: 'Recordings and screenshots of gameplay systems I have implemented.',
    comingSoon: 'Gameplay recordings are being captured and will land here soon.',
  },
  {
    id: 'technical',
    nav: 'Technical',
    eyebrow: 'Technical showcase',
    heading: 'Under the hood',
    intro: 'Tools, architecture and implementation details that keep the game running.',
    comingSoon: 'Technical write-ups and captures are coming soon.',
  },
  {
    id: 'about',
    nav: 'About',
    eyebrow: 'About',
    heading: 'About me',
  },
  {
    id: 'skills',
    nav: 'Skills',
    eyebrow: 'Skills & technologies',
    heading: 'What I work with',
  },
  {
    id: 'contact',
    nav: 'Contact',
    eyebrow: 'Contact',
    heading: 'Let’s build something',
  },
]
