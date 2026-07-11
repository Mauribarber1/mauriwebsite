# Mauri Barber — Modernization & Motion Design

**Date:** 2026-07-11
**Status:** Approved by client, ready for implementation planning

## Problem

The client shipped a first visual redesign (editorial barbershop style: black/paper/gold palette, Bebas Neue display type, numbered services list, asymmetric gallery, "our story" section — see `docs/superpowers/plans/2026-07-10-mauri-barber-redesign.md`) but finds the result generic. Specifically: the page layout is too predictable — sections follow a repetitive "eyebrow → title → text → image" stacked block pattern with no motion or depth. The client wants the page to feel more professional/modern and wants "wow" animation effects, while explicitly keeping the barbershop identity intact (not turning it into a generic flashy tech-startup site).

## Non-Goals

- No new photography — still using the existing placeholder images (Unsplash/local), swapped later by the client.
- No section reordering, no new sections, no section removal — same page assembly (`Hero → StripeBand → Services → Gallery → Historia → Reviews → ContactHours`).
- No copy changes to existing dictionary strings (`messages/es.json`, `messages/en.json`), except one new optional stat element in Historia (see below) which reuses existing copy, not new claims.
- No new dependencies beyond `framer-motion`.
- No dark/light theme rebalancing (Approach B, "dark luxury", was considered and explicitly rejected in favor of keeping the current alternating paper/ink rhythm).
- No brutalist/oversized-block direction (Approach C was considered and rejected as too aggressive for a neighborhood barbershop's tone).

## Approach

**Direction: "Editorial premium"** — keep the existing section structure and content, but redesign each section's internal composition to break the repetitive stacked-block pattern, and layer in scroll- and hover-driven motion using Framer Motion. Typography (the display font) becomes a graphic element in its own right (e.g., oversized ghost numerals), not just a heading style.

## Architecture

- **New dependency:** `framer-motion` (client-side only; all animated components become Client Components via `"use client"`).
- **New shared motion primitives** under `components/motion/`:
  - `Reveal.tsx` — wraps children, fades + slides up (`y: 24px → 0`) when scrolled into view. Props: `delay?`, `as?` (element tag), `once` always `true`.
  - `RevealGroup.tsx` / stagger helper — wraps a list of children and staggers each child's `Reveal` by an index-based delay (used in Services rows, Gallery tiles, Reviews cards, ContactHours hour rows).
  - `ParallaxImage.tsx` — wraps `next/image`'s container, applies a subtle `translateY` tied to scroll progress via `useScroll`/`useTransform` (Hero background, Historia photo).
  - `ScrollProgressBar.tsx` — fixed top-of-viewport thin gold bar, width driven by page scroll progress (`useScroll` with `scrollYProgress`), mounted once in the root layout or page shell.
- **Reduced motion:** every motion primitive calls Framer Motion's `useReducedMotion()` and short-circuits to the final resting state (no animation, no delay) when true — consistent with the existing CSS `prefers-reduced-motion` handling for the stripe/barber-pole marquees in `app/globals.css`.
- **Performance guardrails:** animations only touch `opacity` and `transform` (GPU-compositable, no layout thrashing). All scroll reveals use `viewport={{ once: true, margin: "-10% 0px" }}` so they fire once, slightly before full entry into view, and never re-trigger when scrolling back up.
- **No structural changes** to `app/[locale]/page.tsx` beyond what's needed to mount `ScrollProgressBar` once; component prop signatures (`Messages["hero"]`, etc.) stay the same — motion is purely presentational, wrapping existing markup.

## Section-by-Section Design

### Global: Scroll progress bar
A 2–3px fixed gold bar at the very top of the viewport, width bound to overall page scroll progress. Mounted once at the page root (above `Navbar`), `z-index` above the navbar. Respects reduced motion by rendering statically hidden (not required as a progress indicator when motion is off — this one is borderline decorative/functional; render it without the smoothing spring but keep width tracking scroll position, since it's informational, not purely decorative, and low-cost either way).

### Navbar
- Nav links get an animated gold underline that draws in from center on hover/focus (CSS `transform: scaleX()` transition is sufficient here — no Framer Motion needed for this one, keeps it cheap).
- No structural change to the navbar's own scroll-collapse behavior (out of scope — it doesn't currently have one, and none was requested).

### Hero
- Headline (`hero.title` / `hero.titleHighlight`) reveals line-by-line on page load (not scroll-triggered, since it's above the fold): each line's `Reveal` staggers by ~150ms, feels like a confident title assembling itself, not a typewriter character-by-character effect.
- Background image gets a subtle `ParallaxImage` (moves slower than scroll, ~15-20% of scroll distance, capped) — barely perceptible depth cue, not a "wow, is this website broken" level of movement.
- Eyebrow, then headline, then description, then CTAs — each step staggers in after the previous (small delay chain), CTAs arrive last.
- A small decorative scroll cue (thin vertical line with a dot animating down it, looping) anchored bottom-center of the hero, `aria-hidden`, hidden entirely under reduced motion.

### StripeBand
No changes — already animated (existing `animate-stripe-scroll`), stays as-is per client feedback not to overbuild this element.

### Services
- Each row's index (`01`–`06`) is re-rendered as a large ghost numeral (big `font-display`, low-opacity ink or gold-soft fill) positioned behind/beside the row content, instead of the current small utility-style index — this is the section that most directly answers "too predictable."
- Rows stagger in via `RevealGroup` as the section scrolls into view.
- On hover (desktop) / focus-visible (keyboard), a row gets a soft `gold-soft` background wash and its bottom divider animates from a thin line to a slightly thicker one — CSS transition, no Framer Motion required for the hover state itself.

### Gallery
- Grid stays the existing asymmetric layout (already non-generic from the prior redesign — not rebuilt).
- Tiles reveal staggered (fade + slight scale-up from 0.96 → 1) as the gallery scrolls into view.
- Hover: existing `hover:scale-105` stays, gains a gold border/ring that fades in alongside it.

### Historia ("our story")
- Breaks the 50/50 symmetric column split: the photo column becomes visually dominant and offset (e.g., extends past the grid's implied boundary with a negative margin on desktop), with a gold-bordered frame element positioned behind/offset from the photo (a second bordered rectangle peeking out from behind, `aria-hidden`) to create layered depth instead of a flat photo-in-a-box.
- New small stat element next to/under the text: an animated counting number ("10+") with a short label sourced from the existing copy's "más de una década" (already true content, not a new claim), counted up via `useTransform`/`animate` when scrolled into view. Client approved this element in review; can be removed easily later if they change their mind since it's an isolated addition, not a copy rewrite.
- Text block still uses `Reveal` for its paragraph.

### Reviews
- Review cards stagger in (fade + slight scale, like Gallery tiles) as the section enters view, instead of appearing statically.
- No change to content, star rendering, or the "view on Google Maps" link.

### ContactHours
- Hour rows (`contact.hours`) stagger in via `RevealGroup`.
- No motion applied to the address/phone/email block itself or the WhatsApp CTA — this is conversion-critical, high-legibility content and should not be delayed by animation-in.

### Footer
- No motion — below-the-fold utility content, not worth animating.

### Floating WhatsApp button
- Gains a soft pulsing ring/halo (opacity + scale loop, slow, low-amplitude) to draw the eye without reading as a notification badge or being distracting. Disabled entirely under reduced motion (button remains static and fully functional either way).

## Testing / Verification Approach

Same as the prior redesign: this is presentational/animation work with no business logic, so verification is:
- `npx tsc --noEmit` after each task.
- `npm run build` at the end (confirms `"use client"` boundaries don't break static generation for `/es` and `/en`).
- Manual check in-browser (both locales) for: animations firing correctly on first scroll-into-view, not re-firing on scroll-up, hover states working, reduced-motion respected (test via OS/browser reduced-motion emulation), and no layout shift or performance jank.
- No new automated test suite — consistent with the existing project's approach (no test framework is currently set up).

## Open Decisions Already Resolved

- Layout predictability was the client's #1 complaint (confirmed via clarifying questions) → prioritized in Services and Historia, the two most "flat block" sections.
- Animation intensity: "rich but elegant," not spectacular/3D, not minimal — confirmed by client.
- Library: Framer Motion, confirmed by client over a CSS-only approach.
- No reference site was provided; client trusted Claude's judgment on the "editorial premium" direction over two rejected alternatives (dark luxury, brutalist-editorial).
