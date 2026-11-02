/**
 * =====================================================================
 *  ABOUT ME — background, what you do, toolkit, highlights, statement
 * =====================================================================
 *  Everything on the About Me part of the site comes from this file.
 *  Short facts (name, title, photo, contact) live in profile.js.
 *
 *  PLACEHOLDERS
 *    Text in [square brackets] is a placeholder. It shows with a dashed
 *    outline in local preview and is HIDDEN on the published site.
 *
 *  CONFIRMED / UNCONFIRMED
 *    Services and tools carry  confirmed: true | false.
 *    Unconfirmed items appear only in local preview (marked "to confirm")
 *    so the published site never claims a skill you have not confirmed.
 *    Flip one to  confirmed: true  when it is real.
 * ===================================================================== */

export const ABOUT = {
  /* ---------- PROFESSIONAL BACKGROUND ---------- */
  background: {
    // Each string is one paragraph.
    paragraphs: [
      'My most complete work so far is the in-game interface of Rivalis Academia Nexus, a mobile MMORPG with schools, classes, parties, guilds, trading and a live player economy. I built the screens players use for all of it: twenty-one interfaces from login and character creation through the HUD, inventory, skills, chat, shops, quests and settings — including a layout editor that lets players move and resize the HUD to their own hands.',
      '[Placeholder — how you got into Unity and game development, and what you worked on before or alongside Rivalis.]',
      '[Placeholder — how you approach a development problem: how you break it down, how you test, how you work with designers and artists.]',
    ],
    // A short timeline. Newest first. Only real entries; the rest stay as placeholders.
    timeline: [
      {
        period: '[e.g. 2024 — Present]',
        title: 'UI Developer',
        place: 'Rivalis Academia Nexus (mobile MMORPG)',
        note: 'Built the complete in-game UI in Unity and C#: 21 interfaces across 8 groups.',
      },
      {
        period: '[Year — Year]',
        title: '[Role — e.g. Unity Developer]',
        place: '[Studio, team or client]',
        note: '[What you built there.]',
      },
      {
        period: '[Year]',
        title: '[Where it started — e.g. first Unity project / course]',
        place: '[School, self-taught, jam…]',
        note: '[One line.]',
      },
    ],
    // What you are good at. Only what you can stand behind.
    strengths: [
      'Game UI from mock-up to working screen: layout, states, input and feedback',
      'Touch-first interfaces: thumb-reach HUDs, joysticks, radial menus, drag and drop',
      'Complex screens with real data: inventories, shops, trading, rankings, settings',
      '[Placeholder — a strength on the systems / gameplay side]',
    ],
  },

  /* ---------- WHAT I DO ---------- */
  // icon: controller · hud · code · gear · party · shop · star · map · trophy · person · chat · bag · door · mail
  services: [
    { id: 'unity', name: 'Unity Game Development', icon: 'controller', confirmed: true, blurb: 'Building playable features in Unity, from scene setup to shipped screens.' },
    { id: 'ui', name: 'UI / UX Implementation', icon: 'hud', confirmed: true, blurb: 'Turning designs into responsive, stateful game interfaces that feel good on a phone.' },
    { id: 'csharp', name: 'C# Programming', icon: 'code', confirmed: true, blurb: 'Clean, readable C# for UI logic, data binding and game-side features.' },
    { id: 'systems', name: 'Game Systems Development', icon: 'gear', confirmed: false, blurb: 'Inventory, trading, party and progression systems behind the screens.' },
    { id: 'gameplay', name: 'Gameplay Programming', icon: 'star', confirmed: false, blurb: 'Mechanics, controls and interactions.' },
    { id: 'multiplayer', name: 'Multiplayer / Online Features', icon: 'party', confirmed: false, blurb: 'Client-side UI and flows for online games.' },
    { id: 'optimisation', name: 'Bug Fixing & Optimisation', icon: 'trophy', confirmed: false, blurb: 'Tracking down issues and keeping frame times steady.' },
    { id: 'technical', name: 'Technical Implementation', icon: 'map', confirmed: false, blurb: 'Integrating assets, data and tools into a working build.' },
  ],

  /* ---------- TOOLS & TECHNOLOGIES ---------- */
  tools: [
    { name: 'Unity', kind: 'Engine', confirmed: true },
    { name: 'C#', kind: 'Language', confirmed: true },
    { name: 'Photoshop', kind: 'Design', confirmed: true },
    { name: 'Git', kind: 'Workflow', confirmed: true },
    { name: 'Visual Studio', kind: 'IDE', confirmed: false },
    { name: 'GitHub', kind: 'Workflow', confirmed: false },
    { name: 'Blender', kind: '3D', confirmed: false },
    { name: 'Figma', kind: 'Design', confirmed: false },
  ],

  /* ---------- MY DEVELOPMENT TOOLKIT ----------
   *  Tools, editor extensions, reusable systems and utilities you built
   *  yourself. Starts empty on purpose: local preview shows marked sample
   *  cards so you can see the layout; the published site shows an honest
   *  "nothing published yet" island until you add real entries.
   *
   *  Media files go in  public/media/toolkit/<id>/
   *
   *  {
   *    id: 'ui-state-machine',                       // lowercase, dashes
   *    name: 'UI State Machine',
   *    kind: 'Reusable system',                      // or: Editor extension · Utility · Automation
   *    summary: 'One or two sentences on what it does and why you built it.',
   *    bullets: ['What it does — 1', 'What it does — 2'],
   *    tech: ['Unity', 'C#'],
   *    media: [
   *      { type: 'image', src: '/media/toolkit/ui-state-machine/inspector.png', width: 1920, height: 1080,
   *        caption: 'What this shows.', alt: 'Short description.' },
   *    ],
   *    link: { label: 'Source on GitHub', href: 'https://github.com/...' },   // optional
   *  }
   */
  toolkit: [],

  /* ---------- PROFESSIONAL HIGHLIGHTS ---------- */
  // Big numbers. Values in [brackets] are hidden until you fill them.
  // 'auto' values are counted from projects.js.
  highlights: [
    { label: 'Interfaces shipped', value: 'auto:features', note: 'Rivalis Academia Nexus' },
    { label: 'Recordings of real UI', value: 'auto:videos', note: 'all on this site' },
    { label: 'Years in Unity', value: '[0]', note: '[since year]' },
    { label: 'Teams / clients', value: '[0]', note: '[names]' },
  ],
  // Notable contributions, one line each.
  notable: [
    'Designed and built a player-facing HUD layout editor (scale, opacity, undo/redo, presets) for Rivalis Academia Nexus.',
    '[Placeholder — a contribution you are proud of.]',
    '[Placeholder — a milestone, award or release.]',
  ],

  /* ---------- PERSONAL DEVELOPER STATEMENT ---------- */
  // Your words. Two or three short paragraphs. Keep it personal.
  statement: [
    '[Placeholder — what you believe good game UI or good game code is, in your own words.]',
    '[Placeholder — what you want to build next, and the kind of team or project you are looking for.]',
  ],
}
