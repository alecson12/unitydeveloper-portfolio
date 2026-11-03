/**
 * =====================================================================
 *  YOUR PROFILE — name, start screen, introduction, skills, contact
 * =====================================================================
 *  This is the ONE file to edit for the short facts about YOU.
 *  The long About Me content (background, what you do, toolkit,
 *  highlights, statement) lives in  src/content/about.js
 *  Projects live in  src/content/projects.js
 *
 *  Anything wrapped in [square brackets] is a placeholder. It shows with
 *  a dashed outline in local preview and is HIDDEN on the published site,
 *  so nothing unfinished ever reaches visitors. Replace it, keep the quotes.
 * ===================================================================== */

export const PROFILE = {
  name: 'Alecson Marwin B. Gantica',
  shortName: 'Alecson Gantica', // used in the navigation and footer
  title: 'Unity Developer',

  /* ---------- START (the first screen, above the water) ---------- */
  start: {
    // Your wordmark PNG/WebP with a transparent background. Put it in  public/media/profile/
    wordmark: '/media/profile/wordmark.webp',
    wordmarkAlt: 'Unity Developer — Alecson Gantica',
    // Optional one-liner under the wordmark. Leave '' for none.
    tagline: '',
    // The scroll hint at the bottom of the screen.
    hint: 'Dive in',
    // Foreground tree (transparent PNG/WebP) in front of the waves. Put it in
    // public/media/start/ and set the path; leave '' for none.
    //   side   'left' | 'right'   which edge it grows from
    //   width  its width as a fraction of the screen width (0.2 = 20%)
    tree: { src: '', side: 'left', width: 0.26, alt: '' },
  },

  /* ---------- ABOUT ME — INTRODUCTION (the first screen under water) ---------- */
  intro: {
    // Small line above the headline
    eyebrow: 'Unity Developer · Game UI & Systems',
    // The headline. Keep it short.
    headline: 'I build the screens players live in.',
    // One or two sentences under the headline.
    intro:
      'Unity developer from the Philippines, making games since 2021. I built the complete in-game UI of Rivalis Academia Nexus, a mobile MMORPG by VIIBYTE.',
    primaryButton: { label: 'See my projects', href: '#projects' },
    secondaryButton: { label: 'Get in touch', href: '#contact' },
    // Short facts shown under the buttons. Keep each one to a few words.
    facts: [
      { label: 'Unity since', value: '2021' },
      { label: 'Studio', value: 'VIIBYTE' },
      { label: 'Based in', value: 'Bulacan, Philippines' },
    ],
    // Your photo, cut out on a transparent background, so you stand in the water.
    // Put files in  public/media/profile/
    photo: '/media/profile/alecson-unity-developer-white.webp',
    photoAlt: 'Alecson Marwin B. Gantica, Unity developer',
  },

  /* ---------- SKILLS & EXPERTISE (the skill groups) ---------- */
  // Groups of skills. Add a group by copying one block.
  // Only list what you have actually used.
  skills: [
    { group: 'Languages', items: ['C#'] },
    { group: 'Game UI', items: ['HUD & menus', 'Inventory & shops', 'Chat & social', 'Touch controls'] },
    { group: 'Design', items: ['UI design', 'Photoshop', 'Illustrator'] },
    { group: 'Workflow', items: ['GitHub', 'Visual Studio', 'Trello'] },
  ],

  /* ---------- CONTACT ---------- */
  contact: {
    text: 'Need a Unity developer for game UI or systems? Say hello.',
    availability: 'Open to contract and part-time work',
    // Replace the placeholder values. Remove any line you do not want shown.
    // Placeholder links are hidden on the published site until replaced.
    links: [
      { kind: 'email', label: 'alecsongantica12@gmail.com', href: 'mailto:alecsongantica12@gmail.com' },
      { kind: 'github', label: 'github.com/Almarga', href: 'https://github.com/Almarga' },
      { kind: 'facebook', label: 'facebook.com/alecson.12', href: 'https://www.facebook.com/alecson.12' },
    ],
    // Optional downloadable CV. Put the file in  public/  and set e.g.
    // '/Alecson-Gantica-CV.pdf'. Leave null to hide the button.
    cv: null,
  },

  footer: {
    note: 'Designed and built by Alecson Gantica.',
  },
}
