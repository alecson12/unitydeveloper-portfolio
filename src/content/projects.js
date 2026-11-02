/**
 * =====================================================================
 *  YOUR PROJECTS — the games whose UI and systems you want to show
 * =====================================================================
 *  This is the ONE file to edit to add a feature, a screenshot, a video,
 *  or a whole new project. The site builds itself from this list.
 *
 *  THE IDEA
 *    project  →  categories  →  features  →  media
 *    A CATEGORY groups related UI (e.g. "Chat & Communication").
 *    A FEATURE is one interface with its own highlight (e.g. "Main Chat"):
 *    a name, a short summary, what it does, and its screenshots/recordings.
 *
 *  WHERE FILES GO
 *    public/media/<project id>/<category id>/<feature id>/<readable-name>
 *    e.g. public/media/rivalis-academia-nexus/communication/chat/chat-recording.mp4
 *
 *  ADDING A SCREENSHOT
 *    { type: 'image', src: '/media/.../my-screenshot.png', width: 1920, height: 1080,
 *      caption: 'What this shows.', alt: 'Short description for screen readers.' }
 *    width/height are optional but keep the layout steady while images load.
 *
 *  ADDING A RECORDING
 *    Export as .mp4 (H.264) — phones often record HEVC/H.265, which browsers
 *    cannot play. Add a poster image (a still frame) next to it.
 *    { type: 'video', src: '/media/.../my-recording.mp4',
 *      poster: '/media/.../my-recording-poster.jpg', width: 1920, height: 864,
 *      caption: '...', alt: '...' }
 *    A video with src: '' shows a "recording coming soon" tile.
 *
 *  CONTRIBUTION
 *    `contribution` (on the project and on each feature) is YOUR part.
 *    Only write what you actually did. Anything left in [square brackets]
 *    is a reminder: it shows (outlined) in local preview and is hidden on
 *    the published site.
 *
 *  SHOWING / HIDING
 *    visible: false  keeps a project off the site while you prepare it.
 *    featured: true  makes it the flagship project on the homepage.
 *    pixelArt: true  keeps pixel-art screenshots crisp when enlarged.
 *                    Leave false for normal high-resolution UI.
 * ===================================================================== */

const R = '/media/rivalis-academia-nexus' // shorthand for the Rivalis media folder

/** Helper: a 1920×864 recording with its poster next to it (same name + "-poster.jpg"). */
const rec = (folder, name, caption, alt) => ({
  type: 'video',
  src: `${R}/${folder}/${name}.mp4`,
  poster: `${R}/${folder}/${name}-poster.jpg`,
  width: 1920,
  height: 864,
  caption,
  alt,
})

/** Helper: a screenshot. */
const img = (folder, file, width, height, caption, alt) => ({
  type: 'image',
  src: `${R}/${folder}/${file}`,
  width,
  height,
  caption,
  alt,
})

export const PROJECTS = [
  /* =================================================================
   *  RIVALIS ACADEMIA NEXUS  —  flagship project
   * ================================================================= */
  {
    id: 'rivalis-academia-nexus', // also the folder name under public/media/
    visible: true,
    featured: true,
    pixelArt: false,

    title: 'Rivalis Academia Nexus',
    tagline: 'The complete in-game interface of a mobile MMORPG.',
    platform: 'Mobile',
    genre: 'MMORPG',
    role: 'UI Developer',
    period: '[e.g. 2024 — Present]',
    status: 'Live',
    tech: ['Unity', 'C#'],

    // Shown on cards and in the hero. A still from the HUD recording.
    // Official logo (transparent). Shown in the project header instead of a text title.
    logo: `${R}/logo.webp`,
    cover: `${R}/hud/hud-overview/in-game-hud-recording-poster.jpg`,
    coverAlt: 'The in-game HUD of Rivalis Academia Nexus',
    // The lead recording at the top of the case study.
    lead: rec('hud/hud-overview', 'in-game-hud-recording', 'The in-game HUD during play.', 'Recording of the in-game HUD'),

    intro:
      'Rivalis Academia Nexus is a mobile MMORPG: schools, classes, parties, guilds, trading and a live player economy. I built the interface players use for all of it — from the login screen to the HUD, inventory, skills, chat, shops, quests and settings.',
    overview: [
      'Every interface on this page is shown with the real recording of it in use, grouped by what it does for the player.',
      'Touch-first design: on-screen joystick, radial emote wheel, tap targeting, and a built-in editor that lets players resize and move the HUD to their own hands.',
    ],
    // Your part on the project. Keep it honest; add detail as you like.
    contribution: [
      'Built the in-game UI shown on this page in Unity and C#.',
      '[Add detail: which screens you designed as well as built, who you worked with, and anything you are proud of.]',
    ],

    /* ------------------------------------------------------------
     *  CATEGORIES → FEATURES
     *  icon: door · person · hud · bag · party · chat · shop · map · gear ·
     *        trophy · code · controller · mail · star
     * ------------------------------------------------------------ */
    categories: [
      {
        id: 'entry',
        name: 'Entry & Characters',
        icon: 'door',
        blurb: 'The first minutes of play: signing in, picking a server, and creating a character.',
        features: [
          {
            id: 'main-menu',
            name: 'Main Menu, Login & Server Select',
            summary: 'The front door of the game: the title screen, account login and registration, then server and channel selection.',
            functions: [
              'Title screen with version number and "tap anywhere to play"',
              'Login with username and password, show/hide password, Remember me and Forgot password',
              'Google login and a link to registration',
              'Registration form (email, username, password, confirm) in a scrollable panel',
              'Server list with connection quality, channel list with Busy status and a [NON PK] channel',
              'Enter on the selected channel',
            ],
            contribution: '',
            media: [
              rec('entry/main-menu', 'main-menu-recording', 'Title screen → login → registration → server and channel select.', 'Recording of the main menu flow'),
              img('entry/main-menu', 'login.png', 1055, 849, 'Login panel with Remember me, Forgot password and Google login.', 'Login panel'),
              img('entry/main-menu', 'registration.png', 1179, 832, 'Registration form with show/hide password fields.', 'Registration panel'),
              img('entry/main-menu', 'server-and-channel-select.png', 1838, 813, 'Server list on the left, channels with status on the right.', 'Server and channel selection'),
            ],
          },
          {
            id: 'character-creation',
            name: 'Character Creation & Selection',
            summary: 'Customise a character, choose a school and a class, name it, then pick it from the character list.',
            functions: [
              'Face, Hair and Hair Color tabs with a grid of options',
              'Live 3D preview with a zoom slider',
              'School selection: Sacred Gate, Mystic Peak, Phoenix',
              'Character type cards: Swordsman, Archer, Shaman',
              'Name entry and a "Creating character…" state',
              'Select Character screen: cards with school emblem, level and class; Create, Start, Delete Character, Server Select',
            ],
            contribution: '',
            media: [
              rec('entry/character-creation', 'character-creation-recording', 'Creating a character from customisation to the character list.', 'Recording of character creation and selection'),
              img('entry/character-creation', 'character-creation.png', 1816, 850, 'Character customisation with school and character type panels.', 'Character creation screen'),
              img('entry/character-creation', 'character-selection.png', 1876, 843, 'Character selection with two characters and a slot-card notice.', 'Character selection screen'),
            ],
          },
        ],
      },

      {
        id: 'hud',
        name: 'In-Game HUD',
        icon: 'hud',
        blurb: 'Everything on screen while playing — and the editor that lets players rearrange it.',
        features: [
          {
            id: 'hud-overview',
            name: 'In-Game HUD',
            summary: 'The main interface during play: status, navigation, combat and communication, all within thumb reach on a phone.',
            functions: [
              'Player avatar with level and HP / MP / SP / EXP bars',
              'Quick buttons under the avatar: Photo, Party, Lock QBox',
              'Top-right menu row: Mall, Inventory, Channel, Map, Menu (with a notification dot)',
              'Minimap and a virtual joystick',
              'Combat cluster: basic attack, skill slots, auto-attack toggle, Auto Skills, walk/run toggles',
              'Mini chat preview with Open Chat, emote and chat buttons, item quick slots and a macro button',
              'Target bar at the top when a monster or player is selected',
            ],
            contribution: '',
            media: [
              rec('hud/hud-overview', 'in-game-hud-recording', 'The HUD during play: moving, fighting, opening the mini chat and the emote wheel.', 'Recording of the in-game HUD'),
              img('hud/hud-overview', 'player-avatar-and-bars.png', 541, 257, 'Avatar, level and the HP / MP / SP / EXP bars with quick buttons.', 'Player avatar and status bars'),
              img('hud/hud-overview', 'menu-buttons.png', 471, 105, 'Top-right menu row: Mall, Inventory, Channel, Map, Menu.', 'HUD menu buttons'),
              img('hud/hud-overview', 'combat-buttons.png', 580, 501, 'Combat cluster: skills, basic attack, auto-attack and Auto Skills.', 'Combat buttons'),
              img('hud/hud-overview', 'chat-and-item-shortcuts.png', 760, 285, 'Mini chat preview, emote and chat buttons, item quick slots and Macro.', 'Chat preview and item shortcuts'),
              img('hud/hud-overview', 'joystick.png', 296, 297, 'Virtual joystick.', 'Virtual joystick'),
            ],
          },
          {
            id: 'targeting',
            name: 'Target Frames & Player Info',
            summary: 'What appears when a monster or another player is targeted, and the information panel for other players.',
            functions: [
              'Target bar with the target’s name and HP',
              'Player targets also show active buff icons with an expand arrow',
              'Tapping a player opens an Information panel: profile, class, school, guild and equipment slots',
              'Whisper, Add Friend and Refresh actions',
              'Inspect an equipped item from the panel',
              'Stats and resistances can be set to Private by the other player',
            ],
            contribution: '',
            media: [
              rec('hud/targeting', 'targeting-recording', 'Targeting a monster, then a player, and opening their information panel.', 'Recording of targeting and the player information panel'),
              img('hud/targeting', 'target-bar-monster.png', 657, 101, 'Monster target bar.', 'Target bar for a monster'),
              img('hud/targeting', 'target-bar-player.png', 669, 119, 'Player target bar with buff icons and an expand arrow.', 'Target bar for a player'),
            ],
          },
          {
            id: 'hud-layout',
            name: 'HUD Layout Customization',
            summary: 'A built-in editor that lets players move, resize and fade every HUD element, with presets.',
            functions: [
              'Tap a HUD element to select it',
              'Scale and Opacity sliders per element',
              'Undo / Redo, Reset, Cancel and Save',
              'Five UI layout presets, selectable from Settings',
              'Option to hide the mini chat while quick chat is open',
            ],
            contribution: '',
            media: [
              rec('hud/hud-layout', 'hud-layout-editor-recording', 'Selecting HUD elements and adjusting their scale and opacity.', 'Recording of the HUD layout editor'),
            ],
          },
        ],
      },

      {
        id: 'character',
        name: 'Inventory, Stats & Skills',
        icon: 'bag',
        blurb: 'Managing gear, attributes and abilities.',
        features: [
          {
            id: 'inventory',
            name: 'Inventory & Equipment',
            summary: 'Equipment and inventory side by side, with item details and automatic potion use.',
            functions: [
              'Equipment panel with character preview and Equip / Bank / Locker tabs',
              'Inventory grid with pages, locked slots and Sort',
              'Item popup with item information, attributes and requirements',
              'Upgrade, Link, Use and Cancel actions',
              'Auto-Potion: HP / MP / SP thresholds with Activate / Close',
            ],
            contribution: '',
            media: [
              rec('character/inventory', 'inventory-recording', 'Opening items, equipping gear and setting up Auto-Potion.', 'Recording of the inventory and equipment panels'),
            ],
          },
          {
            id: 'stats-skills',
            name: 'Stats & Skills',
            summary: 'Attribute points and skill management in one panel with two tabs.',
            functions: [
              'Base stats (POW, DEX, INT, VIT, STA) with +/- buttons and remaining points',
              'Combat stats and character condition',
              'Reset / Apply with a confirmation dialog',
              'Skills grouped by Attack, Pow, Support and Etc, with levels and Skill Info',
              'Auto attack setup and four skill loadouts',
            ],
            contribution: '',
            media: [
              rec('character/stats-skills', 'stats-and-skills-recording', 'Spending attribute points, then browsing skills and loadouts.', 'Recording of the stats and skills panel'),
            ],
          },
        ],
      },

      {
        id: 'social',
        name: 'Party & Social',
        icon: 'party',
        blurb: 'Playing together: parties, finding groups, and the leaderboards.',
        features: [
          {
            id: 'party',
            name: 'Party',
            summary: 'The party panel for groups of up to eight.',
            functions: [
              'Leader badge and member count (2/8)',
              'Item and gold distribution rules',
              'Member rows with HP bar and In range indicator',
              'Lead, Kick and Disband actions',
              'Empty state when not in a party',
            ],
            contribution: '',
            media: [
              rec('social/party', 'party-recording', 'The party panel with a member, then after leaving.', 'Recording of the party panel'),
            ],
          },
          {
            id: 'party-search',
            name: 'Party Search',
            summary: 'Find a party to join, filtered by area.',
            functions: [
              'Area filter list (All Areas, Marketplace, campuses, Hangout, Sport Zone and more)',
              'Result cards: leader, class, school, map and channel, item and money rules, member count',
              'Join, Full and School state buttons',
              'Pagination, Search, and an empty state for areas without parties',
            ],
            contribution: '',
            media: [
              rec('social/party-search', 'party-search-recording', 'Searching parties across areas.', 'Recording of the party search panel'),
            ],
          },
          {
            id: 'rankings',
            name: 'Rankings',
            summary: 'Leaderboards by league, currency, guild and level.',
            functions: [
              'League, Currency, Guild and Level tabs',
              'Sub-filters by class and by school',
              'Rows with rank medals, avatar, class and school icons, guild, status and value',
              'Pagination and Refresh with the last-updated time',
            ],
            contribution: '',
            media: [
              rec('social/rankings', 'rankings-recording', 'Browsing the ranking tabs and filters.', 'Recording of the rankings panel'),
            ],
          },
        ],
      },

      {
        id: 'communication',
        name: 'Chat & Communication',
        icon: 'chat',
        blurb: 'Talking, emoting and showing where you are from.',
        features: [
          {
            id: 'chat',
            name: 'Main Chat',
            summary: 'The full chat window and the mini chat that lives on the HUD.',
            functions: [
              'Tabs: General, Whisper, Party, Guild, Alliance, Regional, Announcement',
              'Colour-coded channel prefixes and item links inside messages',
              'Input field with a send button',
              'Mini chat preview on the HUD that opens the full window',
            ],
            contribution: '',
            media: [
              rec('communication/chat', 'chat-recording', 'Opening the main chat and switching tabs.', 'Recording of the chat window'),
            ],
          },
          {
            id: 'emotes',
            name: 'Quick Emotes & Emote Wheel',
            summary: 'Assign emotes to a radial wheel and fire them from the HUD.',
            functions: [
              'Five emote slots for dance emotes',
              'Grid of quick emotes with checkboxes to place them on the wheel',
              'Reset to defaults',
              'Radial wheel on the HUD: drag to a slice and release to play',
            ],
            contribution: '',
            media: [
              rec('communication/emotes', 'emotes-recording', 'Setting up quick emotes, then using the wheel in the world.', 'Recording of the emotes panel and wheel'),
              img('communication/emotes', 'emote-wheel.png', 396, 384, 'The radial emote wheel with Clap selected.', 'Emote wheel'),
            ],
          },
          {
            id: 'country-flag',
            name: 'Country Flag',
            summary: 'Pick a flag to show above your in-game name.',
            functions: [
              'Searchable country list with flags',
              'No flag option and Unequip',
              'The chosen flag appears above the player’s name in the world',
            ],
            contribution: '',
            media: [
              rec('communication/country-flag', 'country-flag-recording', 'Searching for a country and equipping its flag.', 'Recording of the country flag panel'),
              img('communication/country-flag', 'flag-above-player-name.png', 143, 397, 'Flag shown above the player name.', 'Flag above a player name'),
            ],
          },
        ],
      },

      {
        id: 'commerce',
        name: 'NPCs, Shops & Trading',
        icon: 'shop',
        blurb: 'Talking to NPCs, buying from shops, and trading with players.',
        features: [
          {
            id: 'npc-shop',
            name: 'NPC Dialogue & Shop',
            summary: 'Dialogue choices with NPCs and buying from their shops.',
            functions: [
              'Dialogue panel with the NPC’s name and choices (Trade items, Change my Save Point)',
              'NPC shop grid with prices, next to the player’s inventory',
              'Buy Item dialog: quantity with +/- and MAX, item information, total and gold after',
            ],
            contribution: '',
            media: [
              rec('commerce/npc-shop', 'npc-dialogue-and-shop-recording', 'Talking to the College Representative and buying items.', 'Recording of NPC dialogue and shop'),
            ],
          },
          {
            id: 'item-shop',
            name: 'Item Shop & Top Up',
            summary: 'The in-game store with two currencies, search and top-up packages.',
            functions: [
              'Category list: Accessories, Cards, Costumes, Destiny Boxes, EXP items, Enhancements',
              'Search with the on-screen keyboard',
              'EP / GP currencies and balances',
              'Purchase panel: quantity, unit price, total, balance after, Buy Now',
              'Top Up panel with EP packages and prices',
            ],
            contribution: '',
            media: [
              rec('commerce/item-shop', 'item-shop-recording', 'Browsing categories, searching, and the Top Up panel.', 'Recording of the item shop'),
            ],
          },
          {
            id: 'trade',
            name: 'Player Trade',
            summary: 'Secure item and gold trading between two players.',
            functions: [
              'Their Offer / Your Offer grids',
              'Gold fields with MAX',
              'Lock, Accept and Cancel',
              'States: Offering → Locked → Accepted',
              'Inventory open alongside to add items',
            ],
            contribution: '',
            media: [
              rec('commerce/trade', 'player-trade-recording', 'A trade from offer to lock to accept.', 'Recording of the trade window'),
            ],
          },
        ],
      },

      {
        id: 'world',
        name: 'Quests & Navigation',
        icon: 'map',
        blurb: 'Finding things to do and getting there.',
        features: [
          {
            id: 'quests',
            name: 'Quests & Quest Log',
            summary: 'Accepting quests from NPCs and tracking them in the log.',
            functions: [
              'Quest offer panel: list, description, tasks, rewards, quest price, Accept / Close',
              'Quest Log with Ongoing and Completed tabs and progress counters',
              'Per-quest tasks, rewards, and Talk to… / In Progress / Detail / Show Path buttons',
            ],
            contribution: '',
            media: [
              rec('world/quests', 'quests-recording', 'Taking a quest from the Quest Helper and browsing the quest log.', 'Recording of the quest panels'),
            ],
          },
          {
            id: 'map',
            name: 'World Map',
            summary: 'An area map with lists of entrances and NPCs, and quick travel.',
            functions: [
              'Tiled map with the player’s position',
              'Entrances and NPCs lists beside the map',
              'Tap a place to open Move Map and travel there',
            ],
            contribution: '',
            media: [
              rec('world/map', 'world-map-recording', 'Opening the map, scrolling it, and moving to the Marketplace.', 'Recording of the world map'),
            ],
          },
          {
            id: 'bus-routes',
            name: 'Bus Routes',
            summary: 'Bus travel between areas, from a Bus Stop NPC.',
            functions: [
              'Route lines on the left, stops on the right with the current stop ticked',
              'From location and the Bus Card requirement',
              'Board',
            ],
            contribution: '',
            media: [
              rec('world/bus-routes', 'bus-routes-recording', 'Choosing a line and a stop at the bus stop.', 'Recording of the bus routes panel'),
            ],
          },
        ],
      },

      {
        id: 'system',
        name: 'System & Settings',
        icon: 'gear',
        blurb: 'The main menu, the news feed and the settings.',
        features: [
          {
            id: 'system-menu',
            name: 'System Menu & News',
            summary: 'The main menu panel with every system behind one button, next to the news feed.',
            functions: [
              'Player card with name, class, level and flag',
              'Buttons: Club, Friends, Quests, Item Bank, Chat Macro, Rankings, Emotes, Party Search, Server List, Settings, Exit Game',
              'Currency totals',
              'News & Events carousel with call-to-action buttons and social links',
            ],
            contribution: '',
            media: [
              rec('system/system-menu', 'system-menu-recording', 'Opening the menu and flipping through the news cards.', 'Recording of the system menu'),
            ],
          },
          {
            id: 'settings',
            name: 'Settings',
            summary: 'Video, audio, system and interaction settings, with an unsaved-changes guard.',
            functions: [
              'Video: Screen Scale, Shadow, Detail, FPS',
              'System: UI layout presets and Customize, Chat Macro Display (Standard / Wheel), Targeting / Help Info / HP Mini Gauge toggles, Zoom / Camera / Target sensitivity',
              'Language switching (Thai shown)',
              'Interaction: Hide Character Set, Hide Skill Effects, Hide Dead Body, Transmission, Set Default',
              'Unsaved Changes dialog: Discard / Save',
            ],
            contribution: '',
            media: [
              rec('system/settings', 'settings-recording', 'Walking through the settings tabs and the unsaved-changes dialog.', 'Recording of the settings panel'),
            ],
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
    pixelArt: false,

    title: 'Your Next Project',
    tagline: 'One sentence that says what it is.',
    platform: 'PC',
    genre: 'Prototype',
    role: 'Your role',
    period: '2026',
    status: 'Prototype',
    tech: ['Unity', 'C#'],
    logo: null, // optional: '/media/your-next-project/logo.png'
    cover: '/media/your-next-project/cover.png',
    coverAlt: 'Cover image',
    lead: null,
    intro: 'What the project is.',
    overview: ['What you did on it.'],
    contribution: ['Your part.'],
    categories: [
      {
        id: 'ui',
        name: 'UI',
        icon: 'hud',
        blurb: 'One line about this group.',
        features: [
          {
            id: 'main-menu',
            name: 'Main Menu',
            summary: 'What this screen is for.',
            functions: ['What it does'],
            contribution: '',
            media: [
              { type: 'image', src: '/media/your-next-project/ui/main-menu/main-menu.png', width: 1920, height: 1080, caption: 'Caption', alt: 'Alt text' },
            ],
          },
        ],
      },
    ],
  },
]
