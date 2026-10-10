# Ivory Vista Estate

Build AVENOR, a luxury real estate showcase site. Design-only — must LOOK fully functional but needs NO real logic: static mock data, no API, no working search/filter/forms, no backend.

Colors: near-black #0B0B0B bg, champagne-gold #C9A66B accent, ivory #EDE6DA text. No gradients.

Font: Playfair Display (headings), small-caps sans (labels/body).

Hero: Wordmark “AVENOR” fades in letter-by-letter, centered. Tagline below: “THE ART OF FINDING YOUR PLACE.” Thin gold hairline draws in under it. Two-column stat row below: “POSITIONING — Luxury” / “VISION — Global.” On scroll past hero, reveal a CSS/SVG chromatic-aberration glitch object (abstract marble arch fragment, RGB-split edges). Navbar: small morphing blob center, pill nav buttons LISTINGS / STUDIO / CONTACT.

Sections:

Hero (above)

Listings grid — property cards, ₹ price, Nagpur localities (Civil Lines, Dharampeth, Trimurti Nagar, Wardha Road, Ramdaspeth), beds/baths tags, search bar + filter pills (cosmetic only, no real filtering)

One pinned scroll-driven section (GSAP ScrollTrigger) — featured property image/specs morph as you scroll

Featured property detail — gallery, price, specs, address, “Request a Viewing” CTA (non-functional)

Closing — wordmark repeat, single CTA, gold hairline footer

Motion: slow cross-fade section transitions with gold light-sweep. Hover = chromatic edge-shift + gold glow, no plain scale. Custom cursor = thin gold ring that tightens on hover.

Stack: React + Tailwind + Framer Motion + GSAP ScrollTrigger. CSS/SVG only for 3D object, no WebGL. In-memory favorites, no persistence. Mock data only, no backend. Desktop-first, responsive, reduced-motion support.

Bar: Awwwards-tier, restrained luxury, not a generic real estate template.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ivory-vista-estate.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/155cf3b2-c259-482d-ac02-a1cf5edd817f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
