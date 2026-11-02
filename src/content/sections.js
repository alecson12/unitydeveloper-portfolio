/**
 * =====================================================================
 *  SITE SECTIONS — headings of each homepage block, in page order
 * =====================================================================
 *  `nav` is the short label in the navigation (leave it out to keep a
 *  section off the menu). `intro` is optional — most sections read
 *  better without one.
 * ===================================================================== */

export const SECTIONS = [
  { id: 'about', nav: 'About Me' },
  { id: 'profile', eyebrow: 'Background', heading: 'Where I come from' },
  { id: 'services', eyebrow: 'What I do', heading: 'What I can build for you' },
  {
    id: 'toolkit',
    eyebrow: 'Toolkit',
    heading: 'Tools I built for myself',
    empty: 'Write-ups coming soon.',
  },
  { id: 'projects', nav: 'Projects', eyebrow: 'Projects · flagship', heading: 'Rivalis Academia Nexus' },
  { id: 'ui-showcase', eyebrow: 'UI showcase', heading: 'The UI, feature by feature', intro: 'Tap a screenshot to enlarge it. Press play for the real thing.' },
  { id: 'more-projects', eyebrow: 'Projects · more', heading: 'More islands', empty: 'More projects are on the way.' },
  { id: 'skills', nav: 'Skills', eyebrow: 'Skills', heading: 'Tools & skills' },
  { id: 'contact', nav: 'Contact', eyebrow: 'Contact', heading: 'Let’s talk' },
]
