# Find Your Levels — review edition

A static, chapter-based reading site generated from `../CONTENT_REVISION_BLUEPRINT.md`. The generated root `index.html` publishes this version; `/v3/` is the review entry point.

Open `http://127.0.0.1:4174/v3/` using the repository preview server. To serve only this edition:

```sh
python3 -m http.server 4175 --bind 127.0.0.1 --directory v3
```

The generated `index.html`, `styles.css`, and `app.js` work without a build server or runtime dependencies. The site loads the first chapter by default. `#overview`, chapter anchors built from the chapter titles (for example `#mapping-your-levels`), and heading anchors built from the section headings support direct links and browser history. Links from before the title-based anchors (`#m1`–`#m7` and `#m5-…` section anchors) redirect to the matching chapter or heading; each page and heading carries its old anchor in `data-legacy`.

## Editing content

Edit the root blueprint, then rebuild this edition. Keep copy out of the generated HTML.

```sh
cd v3
npm install
npm run build
# Also generate the live root page:
npm run build:live
```

Build dependency: Marked 17.0.5, Node 20 or newer. No dependencies were downloaded for the initial build: it used the installed Codex runtime's Marked package with `NODE_PATH` pointed at that runtime's `node_modules`. A normal local installation uses the commands above.

`build.mjs` removes author guidance, chart-capture briefs, and editorial labels from the reading copy. It keeps the lesson prose, examples, tables, setup variants, and callouts. Chapter and section navigation use the blueprint headings; earlier section links from feedback redirect to their headings. Future chart briefs stay in the blueprint for the later illustration pass. John's private research package is not used or linked by this site.

## Design and interaction

- An inset, fixed chapter navigation on the same white canvas as the focused reading column, following the trading journal playbook’s open layout. Navigation and the reading area form a centered group on wide screens with a 100px gap; there is no sidebar panel border. The header remains left-aligned.
- White canvas, slate text, blue navigation, and restrained semantic callout rules. The header pairs Find Your Levels with “Read price action, understand participation, and plan around meaningful levels.” and a subtle bottom divider. Light is the default; the optional dark theme is saved locally.
- System sans type: 16px prose / 28px line height, 38px desktop chapter titles, 24px section headings, and compact navigation. Readable line length is capped at 740px.
- Section navigation on desktop; chapter drawer and an “In this chapter” disclosure on mobile. Links support keyboard focus, history, and reloads. Wide tables scroll inside their region.
- Existing SVG illustrations are retained as labeled schematics. Supply/demand boxes span the full wick range of the selected base candles, matching the blueprint's drawing convention. Chapter 3 also includes Justin's unaltered FFAI screenshot, with a full-size image link.

## Brand assets

`assets/brand/` holds the logo mark and icons from the October 2026 design refresh handoff, copied unchanged (each SVG carries C2PA provenance metadata): `fyl-mark.svg` (light), `fyl-mark-dark.svg` (dark), `fyl-mark-inline.svg` (theme-following), `favicon.svg`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` (180px) and `icon-512.png`. `og-image.png` is the 1200×630 link-preview banner used by the Open Graph tags in `template.html`; its source is `og-image.html`. After editing the source, regenerate it from `v3/`:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=5000 --screenshot="$PWD/assets/brand/og-image.png" "file://$PWD/og-image.html"
```

Chat apps cache previews, so a changed image can take a while to appear where the link was already shared. The header renders the mark inline from `build.mjs`, so it follows the light and dark themes; the header hides it below 375px wide, where it doesn't fit beside the Chapters button.

## FFAI example provenance

`assets/ffai-2026-10-14-clean.png` is an unchanged copy of Justin's replacement screenshot, supplied October 14, 2026 (source filename: Screenshot 2026-10-14 at 7.32.52 AM.png). It shows price and volume without ticker, time axes, cursor, or VWAP. Ticker, interval, and date come from Justin's context and the original screenshot, retained as `assets/ffai-2026-10-14.png`. The lesson describes only price/volume behavior visible in the replacement. Its timezone, volume-color settings, and underlying market data were not independently verified. Justin reported further selling through the morning; the lesson does not claim to verify price action outside the image or the identity of sellers.

Volume-color interpretation was checked against [TradingView's conditional-color documentation](https://www.tradingview.com/pine-script-docs/visuals/colors/#conditional-coloring): color can encode a price comparison; it does not identify participants. The supplied chart remains a selected historical example, not evidence of a strategy's expectancy.

The design concept is a visual reference, not a copy source. The complete reviewed blueprint takes precedence over its shortened mockup text. The theme control is simplified to one labeled toggle; mobile adds a section disclosure for the long chapters. These are intentional adaptations of the same reading layout.

## Release status

V3 is prepared for publication on October 14, 2026. Root `index.html` is generated with `npm run build:live`; it references the shared v3 assets and omits the review page’s `noindex` directive. CSS and JavaScript URLs include content hashes to refresh cached assets. GitHub Pages deploys root content from `main`.

The release preserves the seven chapters, participant stories, setup triggers/stops, revised navigation and footer, responsive layout, and approved chart examples. Earlier exploratory drafts, prototypes, and private research are outside this release.
