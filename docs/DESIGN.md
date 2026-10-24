# VIMTC design system

The visual world for the Victory International Ministry Training College redesign. Written in the Impeccable "design-schema" style: thesis first, then the tokens that serve it. The home page artboard on the Claude Design canvas is the reference implementation.

## Thesis

**Trained to be sent.** The college exists to equip people who are already doing ministry and send them back out. Every page should feel like a serious, warm institution: paper, ink, a crest, a pathway. Not a tech landing page, not a megachurch poster.

Mode: **Persuade** on the home, program and admissions pages. **Read** on policy, beliefs and accreditation pages. **Operate** on the application wizard and the admin dashboard.

## Palette

Derived from the crest. No pure gray or pure black anywhere; neutrals are tinted toward navy or toward paper.

| Role | Value | Use |
|---|---|---|
| paper | `#F6F2E8` | page background |
| paper-deep | `#ECE6D6` | quiet panels |
| paper-lift | `#FCFAF4` | raised bands, chips |
| rule | `#CFC8B8` | every hairline |
| ink | `#121330` | body text |
| ink-soft | `#4A4E68` | secondary text on paper (7:1) |
| ink-meta | `#6B6E8A` | metadata at 15px and up (4.6:1) |
| navy | `#0E035B` | primary action, headline colour, the pathway panel |
| navy-lift | `#1A0F7A` | hover of navy |
| navy-deep | `#09023F` | footer |
| on-navy | `#CFCBE8` | secondary text on navy, tinted from the hue, never gray |
| gold | `#7D5A09` | gold as text on paper (5.5:1) |
| gold-display | `#A9790C` | gold at display sizes only (3.3:1, large text) |
| gold-lit | `#F2C94C` | the lit gold: underline ink, level discs, the Apply button, focus ring |

Three golds, one job each. Gold is never body text. Red is not a brand colour.

## Type

Three families, three roles.

- **Bricolage Grotesque** (opsz 12–96, 500–800): display and UI. Headings at `letter-spacing: -0.03em`, `line-height: 1.02`, `text-wrap: balance`.
- **Instrument Serif** (regular and italic): the voice. One italic serif word per heading, pull quotes, scripture, dates in ledgers. Never a paragraph.
- **Hanken Grotesk** (400–700): reading. Body 17px, `line-height: 1.6`, measure capped at 34em, `text-wrap: pretty`.

Scale (ratio ≈ 1.25, fluid at the top): 13 · 15 · 17 · 20 · 22–26 · 28–38 · 36–56 · 52–96. Display never exceeds 6rem. Tabular numerals on anything with a number in a column.

## Space and structure

4pt scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128. Sections alternate tight and generous; "Why" and "Leadership" sit 48px apart because they belong together, the scripture figure gets 128px above it because it is the pause.

Structure is hairline rules, not cards. Lists are index rows with a hairline above each one. A navy panel is used at most twice on a page (the pathway and the request form). Radius is 28px on panels and photographs, 999px on controls, 8px on thumbnails.

Banned on every page: eyebrow or kicker labels above headings, section numbers that carry no information, big-number stat tiles, same-size icon cards, gradient text, glass as decoration, text arrows or emoji standing in for icons.

## Motion

One authored moment per page. On the home page: the hero copy rises in four beats, the pathway panel unveils by clip-path, the four levels draw themselves down the line, and the closing line "…and then you are sent." lands last. Nothing else on the page animates on entry.

Supporting motion is feedback only: 140ms for hover, 260ms for state, 520ms for layout. Easing is `cubic-bezier(0.16, 1, 0.3, 1)`. Exits are faster than entrances. A list that is re-filtered re-appears with a 40ms sibling stagger, capped at 320ms. One scroll-linked reveal is allowed per page when a photograph leads a section.

`prefers-reduced-motion` removes all movement and keeps colour and opacity state changes.

## Browser surfaces

Themed, not default: selection is lit gold on ink, caret is display gold, focus ring is a 3px lit-gold outline offset 3px, scrollbar is navy on paper-deep, underlines sit at 0.18em.

## Copy

Buttons name their action and object: "Find your program", "Request information", "Apply now", "Open the program finder". Facts the college has not supplied stay in square brackets, such as `[NEXT START DATE]`; nothing in brackets is invented. Accreditation is always stated with what it means and what it does not.

## Icons and imagery

Icons are 2px-stroke SVG with round caps, 18–22px, in one family. Photographs are the college's own, cropped to 4:3 (landscape), 4:5 (portrait) or the figure height, never a stock image.
