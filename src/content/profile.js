/**
 * =====================================================================
 *  YOUR PROFILE — name, opening introduction, skills, contact
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

  /* ---------- OPENING INTRODUCTION (the first screen) ---------- */
  hero: {
    // Small line above the big headline
    eyebrow: 'Unity Developer · Game UI & Systems',
    // The big headline. Keep it short.
    headline: 'I build the screens players live in.',
    // One or two sentences under the headline.
    intro:
      'Unity developer from the Philippines. I turn game design into working interfaces and systems in C# — most recently the complete in-game UI of Rivalis Academia Nexus, a mobile MMORPG: login to HUD, inventory to trading, chat to settings.',
    primaryButton: { label: 'See my projects', href: '#projects' },
    secondaryButton: { label: 'Get in touch', href: '#contact' },
    // Short facts shown under the buttons. Keep each one to a few words.
    facts: [
      { label: 'Engine', value: 'Unity' },
      { label: 'Language', value: 'C#' },
      { label: 'Based in', value: 'Bulacan, Philippines' },
    ],
    // Your photo. Put files in  public/media/profile/
    photo: '/media/profile/alecson-unity-developer.jpg',
    photoAlt: 'Alecson Marwin B. Gantica, Unity developer',
  },

  /* ---------- SKILLS & EXPERTISE (the skill groups) ---------- */
  // Groups of skills. Add a group by copying one block.
  // Only list what you have actually used.
  skills: [
    { group: 'Engine & Language', items: ['Unity', 'C#'] },
    { group: 'Game UI', items: ['HUD & menus', 'Inventory & shop screens', 'Chat & social UI', 'Touch controls', 'Player-customisable layouts'] },
    { group: 'Design', items: ['Photoshop', 'Graphic design', '[e.g. Figma]'] },
    { group: 'Workflow', items: ['Git', '[e.g. Trello, Jira]'] },
  ],

  /* ---------- CONTACT ---------- */
  contact: {
    text: 'Looking for a Unity developer for game UI, gameplay systems or a full game build? Tell me about the project.',
    availability: '[Placeholder — e.g. Open to full-time, contract and remote work]',
    // Replace the placeholder values. Remove any line you do not want shown.
    // Placeholder links are hidden on the published site until replaced.
    links: [
      { kind: 'email', label: 'alecsongantica12@gmail.com', href: 'mailto:alecsongantica12@gmail.com' },
      { kind: 'github', label: '[github.com/your-username]', href: 'https://github.com/[your-username]' },
      { kind: 'linkedin', label: '[linkedin.com/in/your-name]', href: 'https://www.linkedin.com/in/[your-name]' },
    ],
    // Optional downloadable CV. Put the file in  public/  and set e.g.
    // '/Alecson-Gantica-CV.pdf'. Leave null to hide the button.
    cv: null,
  },

  footer: {
    note: 'Designed and built by Alecson Gantica.',
  },
}
