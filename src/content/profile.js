/**
 * =====================================================================
 *  YOUR PROFILE — name, hero text, about me, skills, contact
 * =====================================================================
 *  This is the ONE file to edit for everything that is about YOU.
 *  Projects live in  src/content/projects.js
 *  Gameplay / technical write-ups live in  src/content/showcases.js
 *
 *  Anything wrapped in [square brackets] is a placeholder. It shows with
 *  a dashed outline in local preview and is HIDDEN on the published site,
 *  so nothing unfinished ever reaches visitors. Replace it, keep the quotes.
 * ===================================================================== */

export const PROFILE = {
  name: 'Alecson Gantica',
  title: 'Unity Game Developer',

  /* ---------- HERO (the first screen) ---------- */
  hero: {
    // Small line above the big headline
    eyebrow: 'Unity Game Developer · Game UI & Systems',
    // The big headline. Keep it short.
    headline: 'Game worlds, built screen by screen.',
    // One or two sentences under the headline.
    intro:
      'I build the interfaces players live in — menus, HUDs, inventories, chat and trading — in Unity and C#. Most recently: the complete in-game UI of Rivalis Academia Nexus, a mobile MMORPG.',
    primaryButton: { label: 'Explore projects', href: '#featured' },
    secondaryButton: { label: 'Technical work', href: '#technical' },
    // Short facts shown under the buttons. Keep each one to a few words.
    facts: [
      { label: 'Engine', value: 'Unity' },
      { label: 'Language', value: 'C#' },
      { label: 'Focus', value: 'Game UI & systems' },
    ],
  },

  /* ---------- ABOUT ME ---------- */
  about: {
    // Each string becomes one paragraph. Add or remove as you like.
    paragraphs: [
      'I am a Unity game developer who cares most about the part of a game players actually touch. My most complete work so far is the interface of Rivalis Academia Nexus, a mobile MMORPG: twenty-one screens covering everything from login and character creation to trading, quests and a HUD players can rearrange themselves.',
      '[Placeholder — how you got into game development, how you work with designers and artists, and what you are looking for next.]',
    ],
    // Optional portrait. Drop a file into  public/media/profile/  and set
    // the path here, e.g. '/media/profile/portrait.jpg'. Leave as null to
    // show a pixel-art island instead of a photo.
    portrait: null,
    portraitAlt: 'Portrait of Alecson Gantica',
    // Short "at a glance" list beside the text.
    highlights: [
      { label: 'Based in', value: '[City, Country]' },
      { label: 'Open to', value: '[Full-time / Contract / Remote]' },
      { label: 'Also', value: 'Graphic designer & Krump choreographer' },
    ],
  },

  /* ---------- SKILLS & TECHNOLOGIES ---------- */
  // Groups of skills. Add a group by copying one block.
  // Only list what you have actually used.
  skills: [
    { group: 'Engine & Language', items: ['Unity', 'C#'] },
    { group: 'Game UI', items: ['HUD & menus', 'Inventory & shop systems', 'Chat & social UI', 'Touch controls', '[Add the Unity UI tools you used]'] },
    { group: 'Design', items: ['Photoshop', '[e.g. Figma]'] },
    { group: 'Workflow', items: ['Git', '[e.g. Trello]'] },
  ],

  /* ---------- CONTACT ---------- */
  contact: {
    text: 'Looking for a Unity developer for game UI or gameplay systems? I would love to hear about the project.',
    // Replace the placeholder values. Remove any line you do not want shown.
    // Placeholder links are hidden on the published site until replaced.
    links: [
      { kind: 'email', label: '[your@email.com]', href: 'mailto:[your@email.com]' },
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
