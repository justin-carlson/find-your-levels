# Project Context — Find Your Levels

## What this is
An educational HTML guide for beginner traders focused on reading small-cap stock charts and finding meaningful levels. Single-file, self-contained, deployable via GitHub Pages.

## Current state
- **Live site:** `index.html` — v2, built from the v2 content outline
- **Archived:** `index-v1.html` — original 8-chapter version, kept for style reference
- **Outline:** `CONTENT_OUTLINE_V2.md` — the source of truth for content structure

## Content structure (v2)
Two parts, six modules:

**Part 1 — Learn to Read the Chart**
- Module 1: How Price Moves (and Why It Stops) — three states, price memory, vocabulary, zones vs exact lines (small-cap nuance), scenarios not predictions
- Module 2: The Footprints: Supply, Demand & Volume — DBR/RBD zones, fresh vs tested, four volume rules, structural pivots, role reversal
- Module 3: Setups & Patterns — tabbed selector: Compression, The Curl, VWAP Retest, Failed Break + Reclaim, Other Patterns

**Part 2 — Build Your Level Map**
- Module 4: The Small-Cap Level Map — 5-step mapping process (historical → recent → premarket → session → confluence), 200 EMA, 9/20 EMA trend rails, small-cap risks
- Module 5: Planning the Trade — 5 scenarios at every level, entry/invalidation, position sizing formula, four risk rules, when-to-skip checklist
- Module 6: Practice Lab — level quality scorecard (9-item), 8-question quiz

## Key design decisions
- **Style:** Matches v1 exactly — DM Sans font, JetBrains Mono, CSS custom properties, callout boxes, card grids, step lists, checklist items. Light mode only (dark mode media query removed).
- **No charts yet:** Chart areas are `.visual` placeholder blocks (dashed border) describing what each chart should show. Charts are the next major build phase.
- **No calculators:** Pivot point calculator and position size calculator were removed to keep the page lean. Position sizing is explained via a plain callout instead.
- **Interactive elements kept:** Pattern selector tabs (Module 3), level quality scorecard with score bar (Module 6), 8-question quiz with feedback (Module 6).
- **Small-cap focus throughout:** Zones vs exact lines, LULD halts, float rotation, dilution risk, promotion risk, 200 EMA as long-entry filter.

## What's next (rough priority)
1. **Charts** — replace `.visual` placeholders with actual illustrations or Chart.js visuals. Each placeholder has a written spec of exactly what to show.
2. **Content review** — read through all six modules for tone, accuracy, and beginner-friendliness
3. **Mobile polish** — test on small screens, tighten spacing
4. **Additional quiz questions** — expand Module 6 with more scenarios
5. **Future modules (v3+):** Order Flow Basics, The Momentum Staircase, Swing Trading Path, Trade Journal

## Repo
https://github.com/justin-carlson/find-your-levels

## How to resume in a new session
Open Claude Code in the project directory, then say something like:
> "Read CONTEXT.md and pick up where we left off on the Find Your Levels project."
