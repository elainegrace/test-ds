# UX-PORTFOLIO — Design Tokens

Extracted from Figma file `92B4Q7GtfJNiLNWDOedM6r`, node `97:3419` (the `Newsreader` page —
Hero, Work ×4, About, Extras, Contact at 1440px).

> **On provenance.** This file has exactly **one** published Figma variable: `Accents/Green`
> (`#34c759`). Every other value below was read off raw layer styles and grouped by hand, so
> these are *derived* tokens — a proposed system, not one the Figma file already enforces.
> Where the file is inconsistent, that's called out inline rather than silently normalised.

Machine-readable version: [`tokens.css`](./tokens.css).

---

## 1. Color

The palette is a near-monochrome grey ramp on off-white, with a single green accent.

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#fcfcfc` | Page background on every section |
| `--color-surface-glass` | `rgba(245, 243, 242, 0.5)` | Floating nav pill (paired with 4px backdrop blur) |
| `--color-placeholder` | `#d9d9d9` | Image slot fill behind project photos |
| `--color-scrim` | `rgba(0, 0, 0, 0.45)` | Darkening overlay on project photos |
| `--color-text-primary` | `#000000` | Project titles, About statement |
| `--color-text-secondary` | `#666666` | Body copy, active nav, italic emphasis, heading marker |
| `--color-text-muted` | `#aeaeae` | Overlines, meta, tags, inactive nav, hero display base |
| `--color-text-wordmark` | `#6b6a66` | The "Elaine Bayhon" signature, nothing else |
| `--color-accent-green` | `#34c759` | Availability dot — **the only bound Figma variable** |

Notes:

- `#6b6a66` sits a hair warm of `#666666`. It appears only on the wordmark, so it's kept
  distinct rather than folded into `--color-text-secondary`.
- Muted text carries a **second** dimming step in the nav: `#aeaeae` *plus* `opacity: 0.6`.
- There is no border or divider color anywhere — separation is done with whitespace.

## 2. Typography

Two families, doing clearly separated jobs:

- **Switzer** (`--font-sans`) — Light 300, Regular 400, Medium 500. Everything structural.
- **Newsreader** (`--font-serif`) — Italic 400, Medium Italic 500. Used *only* for the
  wordmark and for italic emphasis words set inline inside Switzer display copy
  (`design`, `an app`, `a website`, `"This just works."`).

### Scale

| Token | px | rem |
|---|---|---|
| `--text-2xs` | 12 | 0.75 |
| `--text-xs` | 13.3 | 0.83125 |
| `--text-sm` | 14 | 0.875 |
| `--text-base` | 16 | 1 |
| `--text-lg` | 18 | 1.125 |
| `--text-xl` | 26 | 1.625 |
| `--text-2xl` | 28 | 1.75 |
| `--text-3xl` | 30 | 1.875 |

`13.3px` is an odd duck — it reads as a browser-default `0.83em` rather than a chosen step.
Worth normalising to 13px if you rebuild this.

### Line height & tracking

| Token | Value | Applies to |
|---|---|---|
| `--leading-tight` | `1.3` | Effectively everything |
| `--leading-relaxed` | `1.56` | Meta rows and wordmark (authored as a flat `20.74px`) |
| `--tracking-tight` | `-0.02em` | All text 12–26px |
| `--tracking-display` | `-0.01em` | Hero display (30px) and nav items (12px) |

Tracking is strictly proportional — every value in the file is exactly −2% or −1% of its
font size. That's the single cleanest rule in the system, so it's expressed in `em`.

### Type styles

| Style | Family / weight | Size | Leading | Tracking | Color |
|---|---|---|---|---|---|
| **Display** | Switzer Light | 30 | 1.3 | −0.01em | `--color-text-muted` |
| **Display emphasis** | Newsreader Medium Italic | 30 | 1.3 | −0.01em | `--color-text-secondary` |
| **Statement (H2)** | Switzer Medium | 26 | 1.3 | −0.02em | `--color-text-primary` |
| **Project title** | Switzer Regular | 18 | 1.3 | −0.02em | `--color-text-primary` |
| **Section heading** | Switzer Regular, `uppercase` | 16 | 1.3 | −0.02em | `--color-text-secondary` |
| **Company name** | Switzer Regular, centered | 16 | 1.3 | −0.02em | `--color-text-secondary` |
| **Body** | Switzer Light | 14 | 1.3 | −0.02em | `--color-text-secondary` |
| **Body (About)** | Switzer Regular | 14 | 1.3 | −0.02em | `--color-text-secondary` |
| **Wordmark** | Newsreader Medium Italic | 14 | 1.56 | −0.02em | `--color-text-wordmark` |
| **Overline** | Switzer Medium, caps content | 13.3 | 1.56 | −0.02em | `--color-text-muted` |
| **Meta value** | Switzer Regular | 13.3 | 1.56 | −0.02em | `--color-text-secondary` |
| **Tag / year** | Switzer Regular | 12 | 1.3 | −0.02em | `--color-text-muted` |
| **Nav — active** | Switzer Medium | 12 | 1.3 | −0.01em | `--color-text-secondary` |
| **Nav — inactive** | Switzer Light, `opacity: .6` | 12 | 1.3 | −0.01em | `--color-text-muted` |

Two inconsistencies to resolve before this becomes a real system:

1. **Body weight drifts.** Project descriptions are Switzer *Light*; About paragraphs at the
   same 14px are Switzer *Regular*. Pick one.
2. **Wordmark weight drifts.** Newsreader *Medium* Italic in the Hero, plain *Italic* in the
   About footer.

Headings are uppercased in the content itself (`ABOUT`, `PRODUCT DESIGNER`), not via
`text-transform`, except the section heading which carries a real `uppercase`. Use
`text-transform: uppercase` on the tokens and lowercase the source strings.

## 3. Spacing

Broadly a 4px grid, with two off-grid escapes.

| Token | px | Used for |
|---|---|---|
| `--space-2` | 2 | Project title → meta row |
| `--space-4` | 4 | Marker → heading label; status dot → text |
| `--space-8` | 8 | Logo → company name; writeup stack; year/tag row |
| `--space-12` | 12 | Tag gap; nav vertical padding |
| `--space-16` | 16 | Meta row stack; nav horizontal padding; carousel gap |
| `--space-18` | 18 | About paragraph gap — **off-grid** |
| `--space-23` | 23 | Project photo → details — **off-grid** |
| `--space-24` | 24 | Page gutter; nav item gap |
| `--space-28` | 28 | Statement → body block |
| `--space-40` | 40 | Section top padding |

`18` and `23` look like nudges rather than decisions; `20` and `24` would put the whole
system back on the grid.

## 4. Layout

| Token | Value | Notes |
|---|---|---|
| `--layout-canvas` | 1440px | Design frame width |
| `--layout-gutter` | 24px | Left/right page margin, consistent across all sections |
| `--layout-section-top` | 40px | Heading offset inside a section |
| `--layout-nav-width` | 242px | Floating nav, centered, fixed near top or bottom per section |
| `--layout-measure` | 464px | Hero copy column |
| `--layout-measure-wide` | 565px | About statement column |
| `--layout-measure-body` | 473px | About body column |
| `--layout-card` | 923px | Project card and photo width |
| `--layout-card-media-h` | 550px | Project photo height |
| `--layout-carousel-item` | 336px | Extras carousel cell (4 across, 16px gaps, 1392px total) |

Section heights as drawn: Hero 659 · Work 809 (×4) · About 674 · Extras 736 · Contact 736.

The page is a two-column split: label/meta rail on the left at the 24px gutter, content
starting around x=493 (Work) or x=488 (About) — roughly a 1/3 : 2/3 division.

## 5. Sizing & effects

| Token | Value | Role |
|---|---|---|
| `--size-marker` | 12px | Square bullet beside section headings |
| `--size-logo` | 40px | Company logo in project cards |
| `--size-avatar` | 150px | Portrait image (Hero and Contact) |
| `--size-icon` | 24px | Arrow-outward icon on contact links |
| `--blur-glass` | 4px | `backdrop-filter` on the nav |
| `--opacity-inactive` | 0.6 | Inactive nav items |
| `--radius-none` | 0 | Nothing in this design is rounded |

No shadows are used anywhere. Depth comes only from the nav's blur + translucency.

---

## Coverage

Read directly from Figma: **Hero** (`97:3420`), **Project Card** (`97:3461`),
**About** (`97:3590`), plus the full node tree and published variables for the whole page.

Not read directly: **Contact** (`97:3643`) and **Extras** (`97:3607`) — the Figma MCP seat
hit its tool-call limit. Their structure is known from the node tree and their shared parts
(nav, section heading, wordmark, description block) are covered above, but three things are
still unverified: the Contact email/heading type style (`97:3662`), the contact link + arrow
pairing (`97:3663`), and the Extras carousel's halftone/saturation overlay blend modes.
Re-run `get_design_context` on those two nodes when the limit resets to close the gap.
