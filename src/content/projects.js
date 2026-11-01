/**
 * =====================================================================
 *  YOUR PROJECTS — the games whose UI you want to show
 * =====================================================================
 *  This is the ONE file to edit to add a UI screen, a screenshot, a
 *  video, or a whole new project. The site builds itself from this list.
 *
 *  THE IDEA
 *    A project is a list of UI SCREENS. Each screen has a name, what it
 *    is for, a short list of what it does, and the images/videos of it.
 *
 *  HOW MEDIA WORKS
 *    1. Put the file in:  public/media/<project id>/<screen id>/
 *       Use readable names, e.g.  inventory-open.png
 *    2. Add an entry to that screen's `media` list:
 *         { type: 'image', src: '/media/<project id>/<screen id>/inventory-open.png',
 *           caption: 'What this shows.', alt: 'Short description.' }
 *       For a screen recording use  type: 'video'  and add a `poster`
 *       (a screenshot shown before play):
 *         { type: 'video', src: '/media/.../clip.mp4',
 *           poster: '/media/.../clip-thumbnail.png', caption: '...', alt: '...' }
 *       A video with an empty src ('') shows a "recording coming soon" tile.
 *
 *  PIXEL ART
 *    `pixelArt: true` keeps screenshots crisp when they are scaled up
 *    (no blurry smoothing). Set it to false for high-resolution UI.
 *
 *  SHOWING / HIDING
 *    `visible: false` keeps a project off the site while you prepare it.
 *    `featured: true` puts it in the big slot on the homepage.
 * ===================================================================== */

export const PROJECTS = [
  /* =================================================================
   *  RIVALIS ACADEMIA NEXUS
   * ================================================================= */
  {
    id: 'rivalis-academia-nexus', // also the folder name under public/media/
    visible: true,
    featured: true,
    pixelArt: true,

    title: 'Rivalis Academia Nexus',
    tagline: 'The in-game UI of a Unity MMORPG — every screen, and what it does.',
    role: '[Your role — e.g. UI Developer]',
    period: '[e.g. 2024 — Present]',
    status: 'In development',
    tech: ['Unity', 'C#'],
    cover: '/media/rivalis-academia-nexus/cover.svg',
    coverAlt: 'Rivalis Academia Nexus cover image',

    // One or two short sentences. Keep it about what YOU did.
    summary: [
      '[Placeholder — one sentence on what the game is.]',
      '[Placeholder — one sentence on your part: which UI you built.]',
    ],

    // One block per UI screen. Order here = order on the page.
    screens: [
      {
        id: 'ui-screen-1', // folder name under public/media/rivalis-academia-nexus/
        name: '[Name of this UI — e.g. Main Menu]',
        purpose: '[One sentence: what this screen is for.]',
        // What it does — one short line each. Only what is really there.
        functions: [
          '[What it does — 1]',
          '[What it does — 2]',
          '[What it does — 3]',
        ],
        media: [
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/ui-screen-1/placeholder-01.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a UI screenshot',
          },
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/ui-screen-1/placeholder-02.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a UI screenshot',
          },
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/ui-screen-1/placeholder-03.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a UI screenshot',
          },
        ],
      },
      {
        id: 'ui-screen-2',
        name: '[Name of this UI]',
        purpose: '[One sentence: what this screen is for.]',
        functions: ['[What it does — 1]', '[What it does — 2]'],
        media: [
          {
            type: 'video',
            src: '', // ← paste the path to your .mp4 / .webm here when ready
            poster: '/media/rivalis-academia-nexus/ui-screen-2/placeholder-01.svg',
            caption: '[Placeholder — screen recording of this UI in use.]',
            alt: 'Placeholder for a UI recording',
          },
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/ui-screen-2/placeholder-02.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a UI screenshot',
          },
        ],
      },
      {
        id: 'ui-screen-3',
        name: '[Name of this UI]',
        purpose: '[One sentence: what this screen is for.]',
        functions: ['[What it does — 1]', '[What it does — 2]'],
        media: [
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/ui-screen-3/placeholder-01.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a UI screenshot',
          },
          {
            type: 'image',
            src: '/media/rivalis-academia-nexus/ui-screen-3/placeholder-02.svg',
            caption: '[Placeholder caption]',
            alt: 'Placeholder for a UI screenshot',
          },
        ],
      },
    ],
  },

  /* =================================================================
   *  TEMPLATE — copy this block to add another project.
   *  Set  visible: true  when it is ready to show.
   * ================================================================= */
  {
    id: 'your-next-project', // lowercase, dashes, no spaces
    visible: false,
    featured: false,
    pixelArt: true,

    title: 'Your Next Project',
    tagline: 'One sentence that says what it is.',
    role: 'Your role',
    period: '2025',
    status: 'Prototype',
    tech: ['Unity', 'C#'],
    cover: '/media/your-next-project/cover.svg',
    coverAlt: 'Cover image',
    summary: ['What the project is.', 'What you did on it.'],
    screens: [
      {
        id: 'ui-screen-1',
        name: 'Name of this UI',
        purpose: 'What this screen is for.',
        functions: ['What it does'],
        media: [
          {
            type: 'image',
            src: '/media/your-next-project/ui-screen-1/placeholder-screenshot.svg',
            caption: 'Caption',
            alt: 'Alt text',
          },
        ],
      },
    ],
  },
]
