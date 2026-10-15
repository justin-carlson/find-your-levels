# Find Your Levels — review edition

A static, chapter-based reading site generated from `../CONTENT_REVISION_BLUEPRINT.md`. The generated root `index.html` publishes this version; `/v3/` is the review entry point.

Open `http://127.0.0.1:4174/v3/` using the repository preview server. To serve only this edition:

```sh
python3 -m http.server 4175 --bind 127.0.0.1 --directory v3
```

The generated `index.html`, `styles.css`, and `app.js` work without a build server or runtime dependencies. The site loads the first chapter by default. `#overview`, chapter anchors built from the chapter titles (for example `#mapping-your-levels`), and heading anchors built from the section headings support direct links and browser history. Links from before the title-based anchors (`#m1`–`#m7` and `#m5-…` section anchors) redirect to the matching chapter or heading. Historical anchors remain stable when chapters are reordered or sections move; `data-legacy` records the original association, not the current chapter number. Renamed and consolidated headings use explicit aliases in `app.js`.

## Chapter progression

1. What Moves Price: participants, their reasons for acting, and the evidence behind a working story.
2. Reading Price & Volume: activity versus progress, relative volume, and push/pullback comparisons.
3. Understanding the Trend: swings, timeframes, trend lines, channels, compression, expansion, and recovery.
4. Mapping Your Levels: support/resistance, holds and role changes, reference selection, zones, and room.
5. Using Indicators for Context: VWAP, the 9/20 EMAs, the Daily 200 EMA, and supporting momentum context.
6. Setups & Patterns: the four existing setups, with the curl first and trigger/stop definitions preserved.
7. Putting It Together: the decision checklist, buyer location and patience, outcomes, and trade review.

Each concept has one home for its full explanation, with brief previews and applications elsewhere. This progression was approved for publication on October 14, 2026. Both the review and production pages are generated from the same blueprint; the production build adds the live asset paths and visitor analytics.

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

### Examples in progress

Use a small visible card where a concrete example would make an explanation easier to understand. Give it a plain-text title and a short brief in the blueprint:

```md
> **[Example Card] What changes around VWAP?**
> Follow a real reclaim attempt and the next pullback, with volume and session settings visible.
```

The builder supplies the **Example to develop** label. The guide currently has 18 cards, each recording a teaching comparison still to illustrate. Use actual stock-session charts for all new worked examples, selecting the chart before writing case-specific observations or outcomes. Retain ticker, full date including year, interval, session/timezone and indicator settings, source, volume, and preceding context. Do not invent chart data or alternate outcomes. Existing SVG schematics and explicitly hypothetical participant stories serve separate explanatory purposes. Detailed image briefs can remain below the card, hidden from the reading copy. Start with the concept's purpose rather than assuming the reader is already in a particular trade. Related cards may share a real case with different annotations.

## Design and interaction

- An inset, fixed chapter navigation on the same white canvas as the focused reading column, following the trading journal playbook’s open layout. Navigation and the reading area form a centered group on wide screens with a 100px gap; there is no sidebar panel border. The header remains left-aligned.
- White canvas, slate text, blue navigation, and restrained semantic callout rules. The header pairs Find Your Levels with “Read price action, understand participation, and plan around meaningful levels.” and a subtle bottom divider. Light is the default; the optional dark theme is saved locally.
- System sans type: 16px prose / 28px line height, 38px desktop chapter titles, 24px section headings, and compact navigation. Readable line length is capped at 740px.
- The main column fills at least the viewport below the header. Short pages push the footer to the bottom; long chapters keep it in normal flow after the content. Preserve this behavior when changing the page-group or main-column layout.
- Section navigation on desktop; chapter drawer and an “In this chapter” disclosure on mobile. Links support keyboard focus, history, and reloads. Wide tables scroll inside their region.
- Existing SVG illustrations are retained as labeled schematics. The trend illustrations are in Chapter 3; supply/demand boxes in Chapter 4 span the full wick range of the selected base candles, matching the blueprint's drawing convention. Chapter 2 includes Justin's unaltered FFAI screenshot, with a full-size image link.

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

### Visitor analytics

The published root page includes Cloudflare Web Analytics for `findyourlevels.com`. The `--publish` build adds Cloudflare's module snippet before the closing body tag; the `/v3/` review page does not include it. The beacon token in `build.mjs` is a public site identifier, not an API key. Reporting is available in the owner's Cloudflare dashboard under Observability → Analytics → Web analytics. Hosting and DNS remain on the existing setup.

This is basic traffic measurement, not individual visitor tracking or custom chapter-read/completion events. The guide uses hash navigation, so do not interpret the default page report as a chapter readership report. After publishing, verify that the beacon loads on the live page and allow a few minutes for traffic to appear in Cloudflare.

V3 was first published on October 14, 2026. Root `index.html` is generated with `npm run build:live`; it references the shared v3 assets and omits the review page’s `noindex` directive. CSS and JavaScript URLs include content hashes to refresh cached assets. GitHub Pages deploys root content from `main`.

The October 14 editorial checkpoint adds concept-first openings, 18 visible example-development cards, clearer swing/VWAP vocabulary, timeframe alignment, buyer-location reasoning, explicit volume comparisons, and the corrected FFAI date. Participant stories, setup stop definitions, and the distinction between crossing and candle-close entries are preserved. Real-chart selection and annotation remain unfinished; selected cases will resolve the example-specific execution details and overlapping VWAP plans. The source reference map also needs a later refresh. Earlier exploratory drafts, prototypes, and private research are outside this release.

The October 14 technical-audit follow-up clarifies candle body/range/wick measurements, interval volume, swing points, opening-range windows, Daily gaps, VWAP calculation settings, and MACD components. It adds the lower-wick support interpretation and separates each planned stop price from its structural reference. Existing entry triggers and stop references are preserved. The 18 example cards now identify the real-chart comparisons and decision-time evidence still to collect. The renamed Daily-candle section retains its previous links. These corrections improve definitions and instructional clarity; they do not establish the profitability of the guide's setups.
