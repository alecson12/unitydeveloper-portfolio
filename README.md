# Unity Developer Portfolio — Alecson Marwin B. Gantica

A standalone portfolio built as a **dive**: an underwater pixel-art world that
gets deeper as you scroll. **Start** is the ocean surface with the wordmark;
**About Me** is the shallows (photo, background, what I do, highlights);
**Skills** is the reef; **Projects** is the deep — Rivalis Academia Nexus shown
with the real screenshots and screen recordings; **Contact** is the floor.

**All words, images and videos live in five content files.** The rest of the
site builds itself from them.

Stack: Vite · React · Tailwind CSS v4 · Framer Motion.

---

## Running it

```bash
npm install
npm run dev          # local preview at http://localhost:5174 (see .claude/launch.json)
npm run build        # production files in dist/
```

---

## Folder structure (the parts you will touch)

```
UnityPortfolio/
├── Rivalis_VidsAndPics/              ← YOUR ORIGINAL CAPTURES (untouched, not in git)
│
├── public/
│   └── media/                        ← everything the site shows
│       ├── profile/                  ← your photo(s)
│       └── rivalis-academia-nexus/   ← one folder per project (= project id)
│           ├── logo.webp             ← the project's official logo (transparent)
│           ├── entry/                ← one folder per CATEGORY (= category id)
│           │   ├── main-menu/        ← one folder per FEATURE (= feature id)
│           │   │   ├── main-menu-recording.mp4
│           │   │   ├── main-menu-recording-poster.jpg
│           │   │   ├── login.png
│           │   │   └── …
│           │   └── character-creation/
│           ├── hud/  character/  social/  communication/  commerce/  world/  system/
│           └── (profile/)            ← create it for your portrait
│
├── src/
│   ├── content/                      ← THE ONLY FILES YOU NEED TO EDIT
│   │   ├── profile.js                ← name, title, wordmark, photo, intro, skill groups, contact
│   │   ├── about.js                  ← background, timeline, what I do, tools, highlights, statement
│   │   ├── projects.js               ← projects → categories → features → media (+ logo)
│   │   ├── showcases.js              ← gameplay programming write-ups (under Projects · more)
│   │   └── sections.js               ← section order, zones, depth labels, headings, nav labels
│   │
│   ├── components/                   ← building blocks (no content inside)
│   │   ├── Start.jsx                 the opening screen: your Great Wave artwork
│   │   ├── Ocean.jsx                 fixed layer: sun rays, bubbles, deep vignette, glow — driven by scroll depth
│   │   ├── Zone.jsx / SeaLife.jsx    a stretch of water at one depth + the creatures that live there
│   │   ├── sprites.js / PixelSprite.jsx   every fish, plant and ruin as text pixel art
│   │   ├── FeaturedProject.jsx       the flagship case-study header
│   │   ├── UIShowcase.jsx            categories → FeatureBlock.jsx, with the sticky category bar
│   │   ├── MediaGallery.jsx          recordings + screenshots of one feature
│   │   ├── VideoShowcase.jsx         poster + play button → real <video>
│   │   ├── Lightbox.jsx              full-screen viewer (click an image, ← → Esc)
│   │   ├── PixelWindow.jsx           the pixel "game window" frame around media
│   │   ├── PixelCloud.jsx / PixelIcon.jsx
│   │   └── AboutMe.jsx / Skills.jsx / Contact.jsx / ShowcaseList.jsx / …
│   ├── pages/   Home.jsx · ProjectPage.jsx (#/project/<id>)
│   ├── lib/     helpers (content readers, hash router)
│   └── index.css                     colours, fonts, panels, water animations
│
└── .claude/launch.json               lets Claude preview the site on port 5174
```

### Placeholders

Anything in `[square brackets]` in the content files is a placeholder. It shows
with a **dashed outline in local preview** and is **hidden on the published
site**, so nothing unfinished ever reaches visitors. Replace it when you can.

---

## How a project is organised

```
project  →  categories  →  features  →  media
```

| Level | What it is | Example |
| --- | --- | --- |
| **project** | a game | Rivalis Academia Nexus |
| **category** | a group of related UI | Chat & Communication |
| **feature** | one interface with its own highlight | Main Chat |
| **media** | its recordings and screenshots | chat-recording.mp4 |

Each feature shows its name, a one-line summary, a "What it does" list, your
contribution (if written), then its recordings and screenshots. Categories get
a header with a pixel icon and appear in the sticky chip bar.

## Where to put future screenshots and videos

```
public/media/<project id>/<category id>/<feature id>/<readable-name>
```

Example: a new screenshot of the chat window goes in
`public/media/rivalis-academia-nexus/communication/chat/whisper-tab.png`.

### Adding a screenshot

1. Export it as PNG or JPG at its real size. Nothing is cropped on the site.
2. Drop it into the feature's folder with a readable name.
3. In `src/content/projects.js`, find the feature and add to its `media` list:

```js
img('communication/chat', 'whisper-tab.png', 1920, 864, 'The Whisper tab.', 'Chat window on the Whisper tab'),
```

(`img(folder, file, width, height, caption, alt)` — width/height are the pixel
size of the file.) Screenshots **wider than 1000px** are shown large at their
own aspect ratio; **smaller UI crops** are shown at natural size on a dark
display stage. Clicking either opens the lightbox.

### Adding a recording

Phones usually record **HEVC / H.265**, which browsers cannot play. Convert to
**H.264 MP4** first (HandBrake with the "Web" preset works; the files on the
site were made with `ffmpeg -c:v libx264 -crf 23 -vf scale=1920:-2`). Then:

1. Put `my-recording.mp4` and a still frame `my-recording-poster.jpg` in the feature's folder.
2. Add to the feature's `media`:

```js
rec('communication/chat', 'my-recording', 'What the clip shows.', 'Recording of …'),
```

`rec(folder, name, caption, alt)` expects `<name>.mp4` and `<name>-poster.jpg`
side by side. Recordings only load when a visitor presses play, so many clips
on one page stay fast. A recording with `src: ''` shows a "coming soon" tile.

### Adding a feature or a category

Copy a feature block inside the right category (or a whole category block),
give it a new `id`, create the matching folder, and fill in `name`, `summary`,
`functions`, `media`. Icons for categories: `door · person · hud · bag · party ·
chat · shop · map · gear · trophy · code · controller · mail · star`.

### Adding a project

Copy the **TEMPLATE** block at the bottom of `projects.js`, give it a unique
`id`, create `public/media/<id>/…`, fill it in, and set `visible: true`. The
"Other Unity projects" section lists every visible project except the featured
one; each project also gets its own page at `#/project/<id>`.

## The About Me page

Everything about you is in two files:

| What | File → key |
| --- | --- |
| Wordmark on the Start screen, scroll hint | `profile.js` → `start` |
| Full name, short name, title, headline and intro, photo, quick facts | `profile.js` → `name`, `shortName`, `title`, `intro` |
| Background paragraphs, work timeline, education, strengths (oldest first) | `about.js` → `background` |
| Games I keep coming back to (small panel under About Me; hidden until one real game is listed) | `games.js` → `GAMES` |
| What I do (service cards) | `about.js` → `services` — each has `confirmed: true/false` |
| Tools & technologies (tiles in Skills) | `about.js` → `tools` — each has `confirmed: true/false` |
| Professional highlights (big numbers) and notable contributions | `about.js` → `highlights`, `notable` |
| Personal developer statement | `about.js` → `statement` |
| Skill groups | `profile.js` → `skills` |
| Contact text, availability, links, CV | `profile.js` → `contact` |

**Confirmed vs. unconfirmed.** Services and tools marked `confirmed: false`
appear only in local preview, outlined and labelled "To confirm". Flip one to
`true` once it is real and it goes live. The published site never claims a
skill you have not confirmed.

**Highlights.** A value of `'auto:features'` or `'auto:videos'` is counted
from `projects.js`; values in `[brackets]` stay hidden until filled.

**Photo.** The About Me photo is a cut-out with a transparent background,
`public/media/profile/alecson-unity-developer-cutout.webp`, so you stand in the
water. Replace it (keep the transparency) and, if you rename it, update
`intro.photo` in `profile.js`. The wordmark is `wordmark.webp` in the same
folder (`start.wordmark`).

## Gameplay programming write-ups

`src/content/showcases.js` holds `GAMEPLAY`, shown under "Projects · more".
It starts empty on purpose and the section shows an empty chest until you add
real work. Media goes in `public/media/showcases/<id>/`.

## Section headings and navigation

Order, headings, intros, depth labels and nav labels live in
`src/content/sections.js`. A section with a `nav` label appears in the menu
(Start · About Me · Skills · Projects; Contact is the button). `zone` says
which water a section sits in — sections that share a zone share one
continuous stretch of water in `Home.jsx`.

---

## The look

Everything visual is driven by the tokens at the top of `src/index.css`.

**The water.** The page is four stretches of water (`Zone.jsx`): shallow (About Me), mid (Skills), deep (Projects) and abyss (Contact), in a restrained indigo-to-navy palette. Each zone's gradient ends on the colour the next one starts with, so the dive is continuous. `Ocean.jsx` sits on a fixed layer and reads a **depth** value (0 at the top of the page → 4 at the bottom) to fade light rays in and out, drift a few particles once you are under, darken the edges in the deep and light sparse bioluminescence. `Start.jsx` is the surface: Alecson's extended Great Wave artwork in the three layers he painted it in, used as supplied (`public/media/start/`: `sky` 1798 × 875 at the top, `mountains` 1798 × 875 at the top (clear except Fuji and the far-left swell), `waves` 1798 × 657 at y 218 — stacked, they reproduce the picture). The stage shows the 1353 × 756 window the reference frames; the spare margins around it let layers move without showing an edge. The sky drifts, the sun glows, the far swell and the great wave heave, and every layer slides at its own rate on scroll. The wordmark (`start.wordmark`) sits upper right on wide screens and centred on phones. One red (`--color-red`, from the wordmark) is the only warm accent across the site: bullets, quote bars, the active nav mark, big numbers. A foreground tree can sit in front of the waves: put a transparent image in `public/media/start/` and set `start.tree.src` in `profile.js` (plus `side` and `width`); it gets its own parallax and a slow sway.

**The creatures.** Every fish, jellyfish, squid, anglerfish, plant and ruin is
text pixel art in `src/components/sprites.js`, drawn by `PixelSprite.jsx`.
`SeaLife.jsx` lists which live at which depth (`BANDS`), where they sit and
how they move (swim across, float, sway). Items marked `sm: true` are hidden
on phones. Add a creature with one line; draw a new one with a few rows of
characters. Everything respects `prefers-reduced-motion`.

**Inside.** Deep-navy panels (`.px-card`) with a quiet border and soft
shadow, and near-black "windows" (`.px-window`) that make every screenshot
and video stand out. Text is light everywhere under water; `.on-light` flips
it dark for the navigation while it sits on the sky.

**Type.** Headings use **Jersey 20**, labels **DotGothic16** (both pixel
fonts chosen for readability), body text **Inter** (Google Fonts, loaded in
`index.html`).

## About the original captures

`Rivalis_VidsAndPics/` holds your original phone captures (2.4 GB of HEVC
video). The site uses converted H.264 copies in `public/media/` (about 200 MB
in total). The original folder is listed in `.gitignore`, so it stays on your
disk and out of the repository.

## Deploying

`npm run build` produces a static `dist/` folder that works on any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages). Routing uses `#` hashes, so
no server configuration is needed.

# Deploying

Pushes to `master` build and publish the site to GitHub Pages via `.github/workflows/deploy.yml`.
Live at https://almarga.github.io/unitydeveloper-portfolio/ (the subfolder is set as `base` in `vite.config.js`; media paths in content stay `/media/...` and are prefixed at render time by `asset()` in `src/lib/content.js`).
