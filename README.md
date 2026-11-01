# Unity UI Developer Portfolio — Alecson Gantica

A standalone, single-page portfolio that shows game UI **screen by screen**: each
screen's name, what it is for, what it does, and its screenshots or recordings.
Premium pixel-game look: pixel display font, notched pixel borders, window frames
around every screenshot, dithered light and faint scanlines.

**All words, images and videos live in three content files.** The rest of the
site builds itself from them.

Stack: Vite · React · Tailwind CSS v4 · Framer Motion.

---

## Running it

```bash
npm install
npm run dev          # local preview
npm run build        # production files in dist/
```

---

## Folder structure (the parts you will touch)

```
UnityPortfolio/
├── public/
│   └── media/                         ← ALL screenshots, recordings, covers
│       ├── rivalis-academia-nexus/    ← one folder per project (folder name = project id)
│       │   ├── cover.svg              ← project cover image
│       │   ├── ui-screen-1/           ← one folder per UI screen (folder name = screen id)
│       │   ├── ui-screen-2/
│       │   └── ui-screen-3/
│       ├── your-next-project/         ← template folder for the next project
│       └── profile/                   ← (create it) your portrait, if you add one
│
├── src/
│   ├── content/                       ← THE ONLY FILES YOU NEED TO EDIT
│   │   ├── profile.js                 ← your name, hero text, about me, skills, contact links
│   │   ├── projects.js                ← every project, its UI screens and their media
│   │   └── sections.js                ← homepage section headings and order
│   │
│   ├── components/                    ← building blocks (no content inside)
│   │   ├── UIShowcase.jsx             a project as a list of UI screens
│   │   ├── MediaGallery.jsx           images + videos for one screen, opens the lightbox
│   │   ├── Lightbox.jsx               full-screen viewer (click an image, ← → Esc)
│   │   ├── VideoShowcase.jsx          video player tile
│   │   ├── PixelWindow.jsx            the pixel "window" frame around media
│   │   ├── Hero.jsx / Nav.jsx / ProjectCard.jsx
│   │   └── About.jsx / Skills.jsx / Contact.jsx / Footer.jsx / …
│   ├── pages/
│   │   ├── Home.jsx                   the homepage
│   │   └── ProjectPage.jsx            full project page at  #/project/<id>
│   ├── lib/                           helpers (content readers, hash router)
│   └── index.css                      colours, fonts, pixel borders, buttons
│
└── .claude/launch.json                lets Claude preview the site on port 5174
```

Anything in `[square brackets]` inside the content files is a placeholder waiting for your text.

---

## How a project is organised

A project is a list of **UI screens**. Each screen has:

| Field | What it is |
| --- | --- |
| `id` | folder name under the project's media folder (lowercase, dashes) |
| `name` | the screen's name, e.g. "Inventory" |
| `purpose` | one sentence: what the screen is for |
| `functions` | short lines: what it does (only what is really there) |
| `media` | its screenshots and recordings |

On the page, each screen shows its name, purpose and functions on the left and
its media on the right. Screens appear in the order they are listed.

## How to add a screenshot

1. Export it as PNG or JPG. 16:9 looks best; any size works.
2. Drop it into the screen's folder with a readable name:
   `public/media/rivalis-academia-nexus/ui-screen-1/inventory-open.png`
3. In `src/content/projects.js`, find the project → the screen → its `media`
   list, and add:

```js
{
  type: 'image',
  src: '/media/rivalis-academia-nexus/ui-screen-1/inventory-open.png',
  caption: 'Inventory with a stack selected.',
  alt: 'Inventory panel showing item slots',
},
```

Done. It appears under that screen and opens in the lightbox.

## How to add a screen recording (video)

1. Export the clip as `.mp4` (H.264) or `.webm`. Keep it under ~50 MB if you can.
2. Export one still frame as a PNG/JPG for the thumbnail.
3. Drop both into the screen's folder and add:

```js
{
  type: 'video',
  src: '/media/rivalis-academia-nexus/ui-screen-2/inventory-demo.mp4',
  poster: '/media/rivalis-academia-nexus/ui-screen-2/inventory-demo-thumbnail.png',
  caption: 'Dragging items between slots.',
  alt: 'Recording of the inventory in use',
},
```

Videos get their own full-width player above the images. While a clip is still
being exported, leave `src: ''` and the site shows a "recording coming soon" tile.

## How to add a new UI screen

Copy one block inside `screens`, give it a new `id`, create the matching folder
under the project's media folder, and fill in `name`, `purpose`, `functions`, `media`.

## How to add a new project

1. Copy the **TEMPLATE** block at the bottom of `src/content/projects.js`.
2. Give it a unique `id` and create `public/media/<that-id>/` with a cover image
   and one folder per screen.
3. Fill in `title`, `tagline`, `role`, `period`, `tech`, `summary`, `screens`.
4. Set `visible: true` when ready. The homepage shows an "Other projects" grid
   automatically once there is more than one visible project. `featured: true`
   makes a project the big one on the homepage.

Each project gets its own page at `#/project/<id>`.

### Pixel art screenshots

`pixelArt: true` on a project keeps its screenshots crisp when scaled up
(no blurry smoothing). Set it to `false` for high-resolution UI.

## Where to edit about / skills / contact

All in `src/content/profile.js`:

| What | Key |
| --- | --- |
| Headline, intro, buttons, the three quick facts | `hero` |
| About-me paragraphs, portrait, "at a glance" facts | `about` |
| Skill groups and the chips inside them | `skills` |
| Email / GitHub / LinkedIn links, CV download | `contact` |
| Footer line | `footer` |

To add a portrait: put the image in `public/media/profile/` and set
`about.portrait = '/media/profile/portrait.jpg'`.

Section headings and their order live in `src/content/sections.js`.

---

## Colours and fonts

Everything visual is driven by the tokens at the top of `src/index.css`:
`--color-accent` (gold), `--color-accent-2` (cyan), `--color-ink` (background)
and the fonts. Headings use **Pixelify Sans**, small labels use **Silkscreen**,
body text uses **Inter**, all loaded from Google Fonts in `index.html`.

## Deploying

`npm run build` produces a static `dist/` folder that works on any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages). Routing uses `#` hashes, so no
server configuration is needed.
