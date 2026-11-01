/**
 * =====================================================================
 *  SITE SECTIONS — headings of each homepage block, in page order
 * =====================================================================
 *  `nav` is the short label in the navigation. The content of each block
 *  comes from profile.js and projects.js.
 * ===================================================================== */

export const SECTIONS = [
  {
    id: 'featured',
    nav: 'Work',
    eyebrow: 'Featured',
    heading: 'The UI, screen by screen',
    intro: 'Each screen, what it is for, and what it does.',
  },
  {
    id: 'projects',
    nav: 'Projects',
    eyebrow: 'More',
    heading: 'Other projects',
    // This block only appears when there is more than one visible project.
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
    eyebrow: 'Skills',
    heading: 'What I work with',
  },
  {
    id: 'contact',
    nav: 'Contact',
    eyebrow: 'Contact',
    heading: 'Let’s talk',
  },
]
