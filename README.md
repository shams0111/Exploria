# Homepage — design reference

This is a design mockup created in a visual design tool, exported as a
standalone page. Treat it as a REFERENCE MOCKUP, not production code:
the markup and inline styles carry the design's precise values — colors,
font sizes, spacing, radii, shadows, layout — which an implementation
should replicate faithfully in its own components and styling system
rather than copy wholesale.

## Contents

- `Main.dc.html` — the artboard (a Design Component: an `<x-dc>`
  template + a small logic class). The values to replicate live in its
  inline `style="…"` attributes and the `<helmet><style>` block.
- `support.js`, `vendor/react*.js` — the runtime that renders the
  component in a browser; not part of the design.

## Viewing

Serve the folder (e.g. `python3 -m http.server`) and open `Main.dc.html`;
some browsers block the scripts over file://.

## Media

- `media/img/` — photos taken from exploria.pk (the client's own site and media library).
  Swap in higher-resolution originals before launch; most are only 1000–1600 px wide.
  Some (e.g. `k2-summit.jpg`, `mehrgarh.jpg`, `folk-dance.jpg`) may not be the client's own
  shots — confirm usage rights before going live.
- Fonts: Source Serif 4 (headings) + Jost (text), both Google Fonts.
  `exploria-logo-reversed.png` is a quick recolour of the logo for dark
  backgrounds — ask the client for an official light version.
- `media/video/` — clips by Asif Khan from Pexels (free licence, compressed to 2–3 MB each):
  `hero-hunza.mp4` (pexels.com/video/19150364), `indus-winter.mp4` (19803831),
  `autumn-katpana.mp4` (19400737). Each has a `-poster.jpg` fallback frame.

## index.html — enhanced homepage (for client review)

`index.html` is a standalone, plain HTML/CSS/JS version of the homepage that
builds on `Main.dc.html` and is served at the site root. The original concept
is still available at `/Main.dc.html`.

Added: Spring Blossom Tour 2027 departure (itinerary pop-up, countdown,
booking email), clickable destination map, filterable tours with "save",
month picker for when to go, Why Exploria, travel journal, FAQ and
WhatsApp button.

To add a new group departure, copy the Blossom entry in the `DEPARTURES`
array near the bottom of `index.html` and edit its details.
