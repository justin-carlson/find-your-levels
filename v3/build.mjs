// Compile the reviewed blueprint to a portable static reading site.
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { marked } = await import(pathToFileURL(require.resolve('marked')).href);
const here = path.dirname(fileURLToPath(import.meta.url));
// Normalize line endings so checkouts with core.autocrlf build identically.
const read = async name => (await readFile(path.join(here, name), 'utf8')).replace(/\r\n/g, '\n');
const source = await read('../CONTENT_REVISION_BLUEPRINT.md');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const slug = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Keep full historical anchors independent of current chapter placement. Headings carry
// these as data-legacy so app.js can redirect old links after sections move.
const legacySectionIds = new Map([
  ["Recognizing Selling Pressure", "m3-ffai-when-the-pullback-gets-busy"],
  [
    "Understanding Supply and Demand",
    "m1-supply-and-demand-who-is-willing-to-trade-here"
  ],
  [
    "Buying and Selling: A Quick Recap",
    "m1-the-four-players-at-every-level-longs-vs-shorts-buyers-vs-sellers"
  ],
  [
    "One Price, Different Decisions",
    "m1-trapped-buyers-and-the-overhead-supply-ceiling"
  ],
  [
    "Support, Breakouts & Short Sellers",
    "m1-support-short-sellers-and-the-next-breakout-test"
  ],
  [
    "When a Trade Becomes “Hold and Hope”",
    "m1-when-a-trade-turns-into-hold-and-hope"
  ],
  [
    "Connecting the Bigger Picture to Today",
    "m1-multi-timeframe-participation-connecting-the-bigger-picture-to-today-s-move"
  ],
  [
    "Before You Enter",
    "m2-pausing-before-the-button"
  ],
  [
    "Three Principles for Planning a Trade",
    "m2-three-principles-guide-the-approach"
  ],
  [
    "Finding Active Stocks with Relative Volume",
    "m3-start-with-relative-volume-our-momentum-filter"
  ],
  [
    "Uptrends, Downtrends & Ranges",
    "m3-start-with-three-types-of-price-movement"
  ],
  [
    "Comparing Volume with Price Progress",
    "m3-reading-candle-volume-together-effort-vs-result"
  ],
  [
    "Comparing Pushes and Pullbacks",
    "m3-volume-in-trends-what-a-healthy-bullish-trend-looks-like"
  ],
  [
    "Putting a Bounce in Context",
    "m4-putting-the-bounce-in-context-the-three-part-read"
  ],
  [
    "Three Questions to Check the Trend",
    "m4-which-side-am-i-on-the-3-question-check-before-every-trade"
  ],
  [
    "Reading the 9 & 20 EMAs",
    "m4-2-the-9-20-emas-your-dynamic-trend-rails"
  ],
  [
    "Choosing Levels That Matter",
    "m5-choosing-useful-levels-start-with-volume-and-structure"
  ],
  [
    "Key Levels Within the Trading Day",
    "m5-key-intraday-landmarks-the-4-interactions-break-retest-reclaim-reject"
  ],
  [
    "When to Use a Line or a Zone",
    "m5-lines-and-zones-choosing-the-right-mark"
  ],
  [
    "Finding Supply and Demand Zones",
    "m5-supply-and-demand-zones-the-base-the-departure-and-the-return"
  ],
  [
    "Finding Room to the Next Level",
    "m5-gaps-and-windows-finding-clean-air-and-room-to-run"
  ],
  [
    "Reading Repeated Tests of a Level",
    "m5-fresh-levels-vs-repeated-tests-reading-whether-a-line-is-weakening-or-coiling"
  ],
  [
    "Where References Overlap",
    "m5-confluence-trend-lines-and-channels"
  ],
  [
    "Chart Colors and Line Styles",
    "m5-the-charting-rulebook"
  ],
  [
    "Building Your Map Across Timeframes",
    "m5-building-your-level-map-top-down-daily-context-to-intraday-detail"
  ],
  [
    "Break, Retest, Reclaim & Rejection",
    "m5-the-landmark-action-matrix-four-common-interactions"
  ],
  [
    "Drawing the Zone",
    "m5-a-consistent-way-to-draw-the-zone"
  ],
  [
    "When Price Returns to a Zone",
    "m5-reading-the-return-a-demand-zone-example"
  ],
  [
    "1. Mapping Gaps",
    "m5-1-gaps-space-between-session-ranges"
  ],
  [
    "2. Looking Inside Wide-Range Candles",
    "m5-2-wide-range-candles-check-the-trading-inside"
  ],
  [
    "Volume at the Level",
    "m6-1-volume-participation-in-context"
  ],
  [
    "VWAP: The Session Reference",
    "m6-2-vwap-a-reference-for-the-session"
  ],
  [
    "Where EMAs Meet Your Levels",
    "m6-3-stacking-the-9-20-ema-with-horizontal-levels"
  ],
  [
    "The Daily 200 EMA in Your Level Map",
    "m6-4-the-daily-200-ema-longer-term-context-room-ahead-and-breakout-reference"
  ],
  [
    "MACD: Reading Momentum",
    "m6-5-macd-the-momentum-second-opinion"
  ],
  [
    "Putting It Together at $5.00",
    "m6-putting-it-together-reading-the-test-at-5-00"
  ],
  [
    "Understanding Compression and Expansion",
    "m4-compression-and-expansion-the-cycle-behind-the-setups"
  ],
  [
    "Four Questions Before You Enter",
    "m7-the-pre-trade-checklist-four-questions-before-entry"
  ],
  [
    "Setup 2: Break and Retest",
    "m7-setup-1-the-break-and-retest-hod-pmh-or-a-daily-level"
  ],
  [
    "Setup 3: Failed Breakdown and Reclaim",
    "m7-setup-2-the-failed-breakdown-and-reclaim-the-bear-trap-level-reclaim"
  ],
  [
    "Setup 4: The EMA Pullback",
    "m7-setup-3-the-dynamic-trend-ride-the-9-20-ema-rail"
  ],
  [
    "Setup 1: The Curl",
    "m7-setup-4-the-curl-reading-the-pullback-catching-the-second-leg"
  ]
]);

// Header logo mark (assets/brand/fyl-mark-inline.svg without its provenance metadata): ink follows currentColor, the key level uses the accent.
const mark = '<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="12" width="30" height="7" rx="3.5" fill="currentColor"/><rect x="8" y="28.5" width="48" height="7" rx="3.5" style="fill:var(--accent)"/><rect x="8" y="45" width="22" height="7" rx="3.5" fill="currentColor"/></svg>';

const trendNames = ['uptrend', 'downtrend', 'range'];
const trends = '<figure class="trend-figure"><div class="trend-grid">' + (await Promise.all(trendNames.map(async (name, i) =>
  `<div><h3>${['Uptrend', 'Downtrend', 'Sideways'][i]}</h3>${await read(`assets/${name}.svg`)}</div>`))).join('') +
  '</div><figcaption>Illustrative candle sequences · higher highs and lows, lower highs and lows, and a range.</figcaption></figure>';
const zones = `<figure class="zone-figure">${await read('assets/zones.svg')}<figcaption>Illustrative examples · selected base candles shaded through their full wick range. These are schematics, not historical trades.</figcaption></figure>`;

const chapters = [...source.matchAll(/^## Chapter (\d): (.+?) \(`(#m\d)`\)\n([\s\S]*?)(?=^## Chapter |$(?![\s\S]))/gm)].map(match => ({
  id: slug(match[2].replaceAll('&', 'and')), legacyId: match[3].slice(1), number: Number(match[1]), title: match[2], source: match[4],
}));
if (chapters.length !== 7) throw new Error('Expected all seven blueprint chapters.');

function prepare(text) {
  return text
    .replace(/^> \*\*\[Image Placeholder[^\n]*\n(?:>[^\n]*(?:\n|$))*/gm, '')
    .replace(/^\*\(Keep the 3 existing[^\n]*$/gm, '<!--FYL-TRENDS-->')
    .replace(/^\*\(Keep the existing DBR[^\n]*$/gm, '<!--FYL-ZONES-->')
    .replace(/^\*\(Editorial Note:[^\n]*\n/gm, '')
    .replace(/^\*Chart examples should[^\n]*\n/gm, '')
    .replace(/^### Chapter Lead\n/gm, '')
    .replace(/^### Part 2 Header[^\n]*\n/gm, '')
    .replace(/^\*\*Subtitle:\*\* /gm, '')
    .replace(/^---\s*$/gm, '')
    .replace(/^(#{3,4}) /gm, (_, hashes) => `${'#'.repeat(hashes.length - 1)} `);
}

function renderChapter(chapter) {
  const toc = [];
  const renderer = new marked.Renderer();
  renderer.heading = function ({ depth, text, tokens }) {
    const id = slug(text);
    const legacy = legacySectionIds.get(text) || `${chapter.legacyId}-${id}`;
    toc.push({ id, text, depth });
    return `<h${depth} id="${id}" data-legacy="${legacy}" tabindex="-1"><a class="heading-link" href="#${id}">${this.parser.parseInline(tokens)}</a></h${depth}>\n`;
  };
  let html = marked.parse(prepare(chapter.source), { renderer, gfm: true });
  html = html
    .replace('<!--FYL-TRENDS-->', trends)
    .replace('<!--FYL-ZONES-->', zones)
    .replace(/(src|href)="v3\/assets\//g, '$1="assets/')
    .replace(/<blockquote>\s*<p><strong>\[(\w+) Callout\] ([\s\S]*?)<\/blockquote>/g,
      (_, color, body) => `<aside class="callout ${color.toLowerCase()}${body.startsWith('The Core Mental Model') ? ' summary' : ''}"><p><strong>${body}</aside>`)
    .replace(/<li><strong>\[(\w+) Callout\] /g, (_, color) => `<li class="callout ${color.toLowerCase()}"><strong>`)
    .replace(/<table>/g, '<div class="table-scroll" tabindex="0" role="region" aria-label="Comparison table, scroll horizontally"><table>')
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<th>/g, '<th scope="col">');
  if (/Image Placeholder|\[\w+ Callout\]|Chapter Lead|Editorial Note|Keep the existing|FYL-TRENDS|FYL-ZONES|<pre>/.test(html)) {
    throw new Error(`Editorial instructions leaked into ${chapter.id}`);
  }
  const previous = chapter.number === 1 ? { id: 'overview', title: 'Introduction' } : chapters[chapter.number - 2];
  const next = chapters[chapter.number];
  const pager = `<nav class="chapter-pager" aria-label="Chapter pagination"><a href="#${previous.id}"><span>Previous</span>${escape(previous.title)}</a>${next ? `<a class="next" href="#${next.id}"><span>Next chapter</span>${escape(next.title)}</a>` : '<a class="next" href="#overview"><span>Back to</span>Introduction</a>'}</nav>`;
  const tocLinks = toc.filter(item => item.depth === 2 || item.text.startsWith('Setup ')).map(item => `<a href="#${item.id}"${item.depth === 3 ? ' class="nested"' : ''}>${escape(item.text)}</a>`).join('');
  return `<section class="page" id="${chapter.id}" data-legacy="${chapter.legacyId}" data-title="${escape(chapter.title)}"${chapter.number === 1 ? ' data-active' : ''} aria-labelledby="${chapter.id}-title">
    <div class="reading-layout"><article class="article"><h1 id="${chapter.id}-title" tabindex="-1">${escape(chapter.title)}</h1><details class="mobile-toc"><summary>In this chapter</summary><nav aria-label="Sections in this chapter">${tocLinks}</nav></details>${html}${pager}</article>
    <aside class="page-toc"><nav aria-label="On this page"><h2>On this page</h2><div class="toc-links">${tocLinks}</div></nav></aside></div></section>`;
}

const heroSubtitle = source.match(/^- \*\*Subtitle:\*\* (.+)$/m)?.[1];
const introduction = source.match(/### Guide Introduction\n\*\*Subtitle:\*\* ([\s\S]+?)(?=\n---)/)?.[1].trim();
if (!heroSubtitle || !introduction) throw new Error('Blueprint introduction missing.');
const overview = `<section class="page" id="overview" data-title="Introduction" aria-labelledby="overview-title"><div class="reading-layout"><article class="article overview"><h1 id="overview-title" tabindex="-1">Find Your Levels</h1><p class="lead">${escape(heroSubtitle)}</p>${introduction.split(/\n\s*\n/).map(paragraph => `<p>${escape(paragraph)}</p>`).join('')}<div class="chapter-index">${chapters.map(ch => `<a href="#${ch.id}"><span class="chapter-number">${String(ch.number).padStart(2, '0')}</span><span>${escape(ch.title)}</span><span aria-hidden="true">→</span></a>`).join('')}</div></article></div></section>`;
const nav = `<a class="overview-link" href="#overview" data-chapter="overview">Introduction</a><p class="nav-group">Chapters</p><div class="nav-chapters">${chapters.map(ch => `<a href="#${ch.id}" data-chapter="${ch.id}"${ch.number === 1 ? ' aria-current="page"' : ''}><span class="chapter-number">${String(ch.number).padStart(2, '0')}</span><span>${escape(ch.title)}</span></a>`).join('')}</div>`;
const template = await read('template.html');
const styleVersion = createHash('sha256').update(await read('styles.css')).digest('hex').slice(0, 12);
const scriptVersion = createHash('sha256').update(await read('app.js')).digest('hex').slice(0, 12);
const output = template.replace('./styles.css', `./styles.css?v=${styleVersion}`).replace('./app.js', `./app.js?v=${scriptVersion}`).replace('{{MARK}}', mark).replace('{{NAV}}', nav).replace('{{CONTENT}}', overview + chapters.map(renderChapter).join('\n'));
const ids = [...output.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
if (duplicates.length) throw new Error(`Duplicate anchors: ${[...new Set(duplicates)].join(', ')}`);
await writeFile(path.join(here, 'index.html'), output);
console.log(`Built ${chapters.length} chapters from CONTENT_REVISION_BLUEPRINT.md → v3/index.html`);
if (process.argv.includes('--publish')) {
  // The site token is a public identifier, not an account credential.
  const analytics = `  <!-- Cloudflare Web Analytics -->
  <script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"7604b0536ad844b7b8beea8150533eef"}'></script>
  <!-- End Cloudflare Web Analytics -->`;
  const published = output
    .replace('  <meta name="robots" content="noindex">\n', '')
    .replace(/(src|href)="\.\//g, '$1="v3/')
    .replace(/(src|href)="assets\//g, '$1="v3/assets/')
    .replace('</body>', `${analytics}\n</body>`);
  await writeFile(path.join(here, '../index.html'), published);
  console.log('Built live root index.html with v3 assets.');
}
