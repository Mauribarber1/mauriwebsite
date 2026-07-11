# Mauri Barber Modernization & Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Break the repetitive "eyebrow → title → text → image" stacked-block pattern across the Mauri Barber landing page and add elegant Framer Motion-driven animation (scroll reveals, parallax, hover states, a scroll progress bar) — per `docs/superpowers/specs/2026-07-11-mauri-barber-modernization-design.md` — without changing section order, content, or the existing black/paper/gold identity.

**Architecture:** One new dependency (`framer-motion`). Four new small client-side motion primitives under `components/motion/` (`Reveal`, `ParallaxImage`, `Counter`, `ScrollProgressBar`) that existing server-component sections import and wrap around their content — no section needs to become a full client component except `ContactHours` (needs `motion.li` directly for valid `<ul>`/`<li>` markup) and the primitives themselves. Two dictionary keys (`historia.statNumber`, `historia.statLabel`) are added for the new stat callout; every other dictionary string is untouched.

**Tech Stack:** Same as before — Next.js App Router, TypeScript, Tailwind CSS v4, `next/image`, `next/font/google`. New: `framer-motion`. No test framework exists in this project (confirmed in the design spec) — verification is `npx tsc --noEmit` per task and `npm run build` at the end, same pattern as the prior redesign plan.

---

## File Structure

```
website-mauribarber/
  package.json                          # MODIFY: add framer-motion
  app/
    globals.css                          # MODIFY: add scroll-cue + whatsapp-pulse keyframes
    [locale]/page.tsx                    # MODIFY: mount ScrollProgressBar
  components/
    motion/
      Reveal.tsx                         # CREATE: fade+slide(+scale) on scroll-into-view primitive
      ParallaxImage.tsx                  # CREATE: next/image wrapper with subtle scroll parallax
      Counter.tsx                        # CREATE: animated count-up number
      ScrollProgressBar.tsx              # CREATE: fixed top gold bar bound to scroll progress
    Navbar/Navbar.tsx                    # MODIFY: animated underline on nav links (pure CSS)
    Hero/Hero.tsx                        # MODIFY: staggered reveal, parallax bg, scroll cue
    Services/Services.tsx                # MODIFY: ghost numerals, staggered row reveal
    Gallery/Gallery.tsx                  # MODIFY: staggered tile reveal, gold hover ring
    Historia/Historia.tsx                # MODIFY: asymmetric layout, gold frame, stat counter
    Reviews/Reviews.tsx                  # MODIFY: staggered card reveal
    ContactHours/ContactHours.tsx        # MODIFY: staggered hour rows (motion.li), becomes client component
    WhatsAppButton/WhatsAppButton.tsx    # MODIFY: pulsing halo on floating variant
  messages/
    es.json                              # MODIFY: historia.statNumber, historia.statLabel
    en.json                              # MODIFY: historia.statNumber, historia.statLabel
```

`Footer.tsx`, `Logo.tsx`, `StripeBand.tsx` need no changes (confirmed non-goals in the design spec).

---

### Task 1: Install Framer Motion

**Files:**
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install**

```bash
npm install framer-motion
```

- [ ] **Step 2: Verify it's in `package.json` dependencies**

```bash
grep -A1 '"framer-motion"' package.json
```

Expected: shows a version string under `dependencies`.

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion dependency"
```

---

### Task 2: `Reveal` primitive — scroll-triggered fade/slide(/scale)

**Files:**
- Create: `components/motion/Reveal.tsx`

- [ ] **Step 1: Write the component**

```typescript
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  scale?: boolean;
};

export default function Reveal({ children, delay = 0, className, scale = false }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

This is the single reusable reveal primitive used by Hero, Services, Gallery, Historia, and Reviews (Tasks 6–10). `scale` defaults to `false` (plain fade+slide, used for headings/text/rows); pass `scale` for gallery tiles and review cards (fade+slide+scale, per the design spec). Under `prefers-reduced-motion: reduce`, it renders a plain `<div>` with no animation — content is immediately visible, matching the reduced-motion handling already used for the site's CSS marquees.

Since `Reveal`'s root is a `motion.div`, it must never be used to wrap an `<li>` directly (invalid inside `<ul>`) — `ContactHours` (Task 11) uses `motion.li` directly instead of this primitive for that reason.

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/motion/Reveal.tsx
git commit -m "feat: add Reveal scroll-animation primitive"
```

---

### Task 3: `ParallaxImage` primitive

**Files:**
- Create: `components/motion/ParallaxImage.tsx`

- [ ] **Step 1: Write the component**

```typescript
"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  strength?: number;
};

export default function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  strength = 30,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={shouldReduceMotion ? undefined : { y, scale: 1.15 }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
```

This is a drop-in replacement for a plain `<Image fill />`: render it as a child of whatever positioned/sized container the caller already has (Hero's `relative overflow-hidden` section, Historia's `relative aspect-[4/5] overflow-hidden rounded-2xl` div) — `ParallaxImage` fills that container itself via `absolute inset-0`. The inner wrapper is scaled to `1.15` so the `±strength`px vertical scroll-linked translation never reveals an edge gap. Under reduced motion, no transform is applied at all (image sits static, full quality, no scale needed since there's no translation to cover).

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/motion/ParallaxImage.tsx
git commit -m "feat: add ParallaxImage scroll-parallax primitive"
```

---

### Task 4: `ScrollProgressBar` primitive and mounting it in the page

**Files:**
- Create: `components/motion/ScrollProgressBar.tsx`
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Write the component**

```typescript
"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

`scaleX` is bound directly to the scroll motion value (no spring/easing), so it tracks scroll position 1:1 regardless of reduced-motion settings — there's nothing to disable, it's an instant readout, not a decorative animation. `z-[60]` sits above the sticky `Navbar` (`z-40`) and the floating WhatsApp button (`z-50`).

- [ ] **Step 2: Mount it in the page shell**

In `app/[locale]/page.tsx`, add the import:

```typescript
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import StripeBand from "@/components/StripeBand/StripeBand";
import Services from "@/components/Services/Services";
import Gallery from "@/components/Gallery/Gallery";
import Historia from "@/components/Historia/Historia";
import Reviews from "@/components/Reviews/Reviews";
import ContactHours from "@/components/ContactHours/ContactHours";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";
import { getDictionary, type Locale } from "@/lib/dictionaries";
```

And render it as the first element returned, right before `<Navbar />`:

```typescript
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <ScrollProgressBar />
      <Navbar locale={locale} navbar={dict.navbar} whatsappMessage={dict.whatsapp.message} />
```

Nothing else in this file changes — `generateMetadata`, `buildLocalBusinessJsonLd`, and `generateStaticParams` stay exactly as they are. `LocaleHomePage` remains a Server Component; it can render the client `ScrollProgressBar` component directly, same as it already does for `Navbar`.

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add components/motion/ScrollProgressBar.tsx app/[locale]/page.tsx
git commit -m "feat: add scroll progress bar"
```

---

### Task 5: Navbar — animated underline on hover

**Files:**
- Modify: `components/Navbar/Navbar.tsx`

- [ ] **Step 1: Update the desktop nav link className**

In `components/Navbar/Navbar.tsx`, change:

```typescript
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-gold-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>
```

to:

```typescript
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-ink/80 transition-colors after:absolute after:-bottom-1 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:text-gold-dark hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>
```

Pure CSS (Tailwind `after:` pseudo-element utilities) — a gold underline grows from the center outward on hover. No Framer Motion needed for this one, matching the design spec's note that this is cheap enough to do without JS. The mobile flyout menu links are untouched (no `:hover` on touch devices, so the effect would never show there).

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/Navbar/Navbar.tsx
git commit -m "feat: add animated underline to navbar links"
```

---

### Task 6: Hero — staggered reveal, parallax background, scroll cue

**Files:**
- Modify: `app/globals.css`
- Modify: `components/Hero/Hero.tsx`

- [ ] **Step 1: Add the scroll-cue keyframes to `app/globals.css`**

Append to the end of `app/globals.css`:

```css
@keyframes scroll-cue {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(32px);
    opacity: 0;
  }
}

.animate-scroll-cue {
  animation: scroll-cue 1.8s ease-in-out infinite;
}
```

- [ ] **Step 2: Replace `components/Hero/Hero.tsx`**

```typescript
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import Reveal from "@/components/motion/Reveal";
import ParallaxImage from "@/components/motion/ParallaxImage";
import type { Messages } from "@/lib/dictionaries";

type HeroProps = {
  hero: Messages["hero"];
  whatsappMessage: string;
};

export default function Hero({ hero, whatsappMessage }: HeroProps) {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <ParallaxImage src="/images/hero.jpg" alt="" sizes="100vw" priority strength={30} />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-paper">
        <Reveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gold">
            {hero.eyebrow}
          </p>
        </Reveal>
        <h1 className="max-w-2xl font-display text-5xl uppercase leading-[0.9] tracking-wide sm:text-6xl md:text-7xl">
          <Reveal delay={0.1}>
            <span className="block">{hero.title}</span>
          </Reveal>
          <Reveal delay={0.25}>
            <span className="block text-gold">{hero.titleHighlight}</span>
          </Reveal>
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-6 max-w-xl text-lg text-paper/85">{hero.description}</p>
        </Reveal>
        <Reveal delay={0.55}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <WhatsAppButton message={whatsappMessage} label={hero.ctaPrimary} />
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-paper/40 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-gold hover:text-gold"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </Reveal>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block motion-reduce:hidden"
        >
          <div className="relative h-10 w-px bg-paper/20">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 animate-scroll-cue rounded-full bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

The unused `Image` import from `next/image` was intentionally removed from the old version — the background image now goes through `ParallaxImage`, which imports `next/image` itself. `Hero` stays a Server Component: it has no hooks of its own, it only renders the client components `Reveal` and `ParallaxImage` as children, which is allowed without adding `"use client"` here (see `server-and-client-components.md` in the Next.js docs bundled in this repo — Server Components can render Client Components directly). Each `Reveal` fires as soon as the Hero is in the initial viewport (it's above the fold, so `whileInView` triggers immediately on load), producing the staggered entrance described in the design spec without needing a separate "on-mount" primitive. The scroll cue is `aria-hidden` and fully hidden (`motion-reduce:hidden`, a built-in Tailwind variant) when the user has reduced motion enabled.

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/Hero/Hero.tsx
git commit -m "feat: animate hero with staggered reveal and parallax"
```

---

### Task 7: Services — ghost numerals and staggered rows

**Files:**
- Modify: `components/Services/Services.tsx`

- [ ] **Step 1: Replace `components/Services/Services.tsx`**

```typescript
import Reveal from "@/components/motion/Reveal";
import type { Messages } from "@/lib/dictionaries";

type ServicesProps = {
  services: Messages["services"];
};

export default function Services({ services }: ServicesProps) {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold-dark">
          {services.eyebrow}
        </p>
        <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
          {services.title}
        </h2>
        <p className="mt-4 text-ink/70">{services.description}</p>
      </div>
      <div className="mt-12 border-t border-black/10">
        {services.items.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.06}>
            <div className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-6 overflow-hidden border-b border-black/10 py-7 transition-colors duration-300 hover:bg-gold-soft">
              <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute -left-2 top-1/2 -z-10 -translate-y-1/2 text-8xl text-ink/5 transition-colors duration-300 group-hover:text-gold-soft sm:text-9xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-sm text-gold-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-2xl">{item.name}</h3>
                <p className="mt-1 text-sm text-ink/60">{item.description}</p>
              </div>
              <span className="font-display whitespace-nowrap text-2xl text-gold-dark">
                {item.price}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink/50">{services.priceNote}</p>
    </section>
  );
}
```

Each row's index now doubles as a large, low-opacity `font-display` numeral (`text-8xl`/`text-9xl`, `text-ink/5`, `-z-10` so it sits behind the row content, `overflow-hidden` on the row clips it at the row's edges) — the numbers become a graphic element instead of small utility text, which is the section the design spec calls out as the flattest/most predictable. Rows stagger in (`delay={index * 0.06}`) as the section scrolls into view. The hover wash (`hover:bg-gold-soft` on the row, `group-hover:text-gold-soft` on the ghost numeral) is plain CSS — no Framer Motion needed for a simple background-color/text-color transition. `Services` stays a Server Component (same reasoning as Hero).

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/Services/Services.tsx
git commit -m "feat: add ghost numerals and staggered reveal to services"
```

---

### Task 8: Gallery — staggered tile reveal and gold hover ring

**Files:**
- Modify: `components/Gallery/Gallery.tsx`

- [ ] **Step 1: Replace `components/Gallery/Gallery.tsx`**

```typescript
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import type { Messages } from "@/lib/dictionaries";

type GalleryProps = {
  gallery: Messages["gallery"];
};

const IMAGES = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
];

export default function Gallery({ gallery }: GalleryProps) {
  return (
    <section id="gallery" className="bg-ink py-24 text-paper">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
            {gallery.eyebrow}
          </p>
          <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
            {gallery.title}
          </h2>
          <p className="mt-4 text-paper/70">{gallery.description}</p>
        </div>
        <div className="mt-12 grid grid-flow-dense grid-cols-2 auto-rows-[160px] gap-4 sm:auto-rows-[200px] md:grid-cols-4 md:auto-rows-[220px]">
          {IMAGES.map((src, index) => (
            <Reveal
              key={src}
              delay={index * 0.08}
              scale
              className={`relative overflow-hidden rounded-xl ${index === 0 ? "col-span-2 md:row-span-2" : ""}`}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-xl ring-1 ring-transparent transition-all duration-300 hover:ring-2 hover:ring-gold">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

`Reveal` (with `scale`) becomes the grid item — it receives the `col-span-2 md:row-span-2` classes directly so CSS Grid placement still works exactly as before, and grid items stretch to fill their cell by default, so the inner `h-full w-full` div (needed as a `position: relative` anchor for `Image fill`) sizes correctly. The hover ring (`ring-2 ring-gold`) is applied via a `group`/`group-hover` pure-CSS pattern, replacing the old `hover:scale-105` directly on the image (moved to `group-hover:scale-105` so the ring and the zoom activate together).

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/Gallery/Gallery.tsx
git commit -m "feat: add staggered reveal and hover ring to gallery"
```

---

### Task 9: Historia — asymmetric layout, gold frame, animated stat counter

**Files:**
- Modify: `messages/es.json`
- Modify: `messages/en.json`
- Create: `components/motion/Counter.tsx`
- Modify: `components/Historia/Historia.tsx`

- [ ] **Step 1: Add the stat fields to `messages/es.json`**

In `messages/es.json`, change the `historia` block from:

```json
  "historia": {
    "eyebrow": "Nuestra historia",
    "title": "Mauricio, el barbero",
    "paragraph": "Mauricio lleva más de una década detrás de la silla, especializado en cortes clásicos y afeitado a navaja. Abrió Mauri Barber para ofrecer un trato cercano y un oficio cuidado al detalle, sin prisas y sin florituras."
  },
```

to:

```json
  "historia": {
    "eyebrow": "Nuestra historia",
    "title": "Mauricio, el barbero",
    "paragraph": "Mauricio lleva más de una década detrás de la silla, especializado en cortes clásicos y afeitado a navaja. Abrió Mauri Barber para ofrecer un trato cercano y un oficio cuidado al detalle, sin prisas y sin florituras.",
    "statNumber": 10,
    "statLabel": "años de oficio"
  },
```

- [ ] **Step 2: Add the same fields to `messages/en.json`**

Change:

```json
  "historia": {
    "eyebrow": "Our story",
    "title": "Mauricio, the barber",
    "paragraph": "Mauricio has spent over a decade behind the chair, specializing in classic cuts and traditional razor shaves. He opened Mauri Barber to offer close, unhurried service and a craft built on attention to detail."
  },
```

to:

```json
  "historia": {
    "eyebrow": "Our story",
    "title": "Mauricio, the barber",
    "paragraph": "Mauricio has spent over a decade behind the chair, specializing in classic cuts and traditional razor shaves. He opened Mauri Barber to offer close, unhurried service and a craft built on attention to detail.",
    "statNumber": 10,
    "statLabel": "years of craft"
  },
```

Both values describe the same "más de una década" / "over a decade" claim already in the existing paragraph — no new business claim is introduced, just a second, animated presentation of it.

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0. `Messages["historia"]` is inferred from `messages/es.json` (see `lib/dictionaries.ts`), so it now automatically includes `statNumber: number` and `statLabel: string` — no manual type edit needed.

- [ ] **Step 4: Write the `Counter` primitive**

```typescript
"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  suffix?: string;
  className?: string;
};

export default function Counter({ to, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? to : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
    });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, to]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
```

Under reduced motion, `display` starts (and stays) at the final `to` value — no counting animation runs at all.

- [ ] **Step 5: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 6: Replace `components/Historia/Historia.tsx`**

```typescript
import Reveal from "@/components/motion/Reveal";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Counter from "@/components/motion/Counter";
import type { Messages } from "@/lib/dictionaries";

type HistoriaProps = {
  historia: Messages["historia"];
};

export default function Historia({ historia }: HistoriaProps) {
  return (
    <section className="border-t-2 border-gold-dark bg-paper py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div className="md:pr-6">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold-dark">
            {historia.eyebrow}
          </p>
          <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
            {historia.title}
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-ink/70">{historia.paragraph}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-baseline gap-3 border-t border-black/10 pt-6">
              <Counter to={historia.statNumber} suffix="+" className="font-display text-6xl text-gold-dark" />
              <span className="max-w-[10rem] text-sm uppercase tracking-wide text-ink/60">
                {historia.statLabel}
              </span>
            </div>
          </Reveal>
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 hidden aspect-[4/5] w-full rounded-2xl border-2 border-gold md:block"
          />
          <Reveal delay={0.05} className="relative aspect-[4/5] overflow-hidden rounded-2xl md:-ml-16">
            <ParallaxImage src="/images/historia.jpg" alt="" sizes="(min-width: 768px) 50vw, 100vw" strength={20} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

This replaces the old strict 50/50 grid with an asymmetric one (`md:grid-cols-[1fr_1.2fr]`, photo column wider): the photo is pulled left (`md:-ml-16`) so it visually overlaps toward the text column instead of sitting in its own even half, and a second gold-bordered rectangle is positioned behind it (`absolute -bottom-4 -right-4`, `aria-hidden`, DOM-order-behind so it peeks out from the bottom-right corner) for layered depth. `Historia` stays a Server Component.

- [ ] **Step 7: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0. This validates `historia.statNumber`/`historia.statLabel` from Steps 1–2 actually satisfy `Counter`'s and the label span's prop types end-to-end.

- [ ] **Step 8: Commit**

```bash
git add messages components/motion/Counter.tsx components/Historia/Historia.tsx
git commit -m "feat: redesign historia with asymmetric layout and stat counter"
```

---

### Task 10: Reviews — staggered card reveal

**Files:**
- Modify: `components/Reviews/Reviews.tsx`

- [ ] **Step 1: Update the reviews grid**

In `components/Reviews/Reviews.tsx`, add the import:

```typescript
import Reveal from "@/components/motion/Reveal";
import type { Messages } from "@/lib/dictionaries";
```

And change:

```typescript
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {reviews.items.map((review) => (
          <blockquote
            key={review.name}
            className="rounded-2xl border border-black/5 bg-gold-soft/30 p-6"
          >
            <p aria-hidden="true" className="text-gold-dark">★★★★★</p>
            <p className="mt-3 text-sm text-ink/80">&ldquo;{review.text}&rdquo;</p>
            <footer className="mt-4 text-sm font-semibold">{review.name}</footer>
          </blockquote>
        ))}
      </div>
```

to:

```typescript
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {reviews.items.map((review, index) => (
          <Reveal key={review.name} delay={index * 0.1} scale>
            <blockquote className="h-full rounded-2xl border border-black/5 bg-gold-soft/30 p-6">
              <p aria-hidden="true" className="text-gold-dark">★★★★★</p>
              <p className="mt-3 text-sm text-ink/80">&ldquo;{review.text}&rdquo;</p>
              <footer className="mt-4 text-sm font-semibold">{review.name}</footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
```

`h-full` was added to the `blockquote` so cards keep matching heights across a row now that they're nested one level inside the `Reveal` grid item (which stretches to the row height by default, same as before).

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/Reviews/Reviews.tsx
git commit -m "feat: add staggered reveal to review cards"
```

---

### Task 11: ContactHours — staggered hour rows

**Files:**
- Modify: `components/ContactHours/ContactHours.tsx`

- [ ] **Step 1: Replace `components/ContactHours/ContactHours.tsx`**

```typescript
"use client";

import { motion, useReducedMotion } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import type { Messages } from "@/lib/dictionaries";

const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=Carrer+de+Bilbao+38,+08005+Barcelona&output=embed";
const PHONE_DISPLAY = "664 30 16 64";
const PHONE_HREF = "tel:+34664301664";
const EMAIL = "mauribcn@gmail.com";
const INSTAGRAM_HANDLE = "@maurilima71";
const INSTAGRAM_URL = "https://www.instagram.com/maurilima71";

type ContactHoursProps = {
  contact: Messages["contact"];
  whatsappMessage: string;
};

export default function ContactHours({ contact, whatsappMessage }: ContactHoursProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact" className="bg-ink py-24 text-paper">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {contact.eyebrow}
        </p>
        <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">{contact.title}</h2>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl text-gold">
                {contact.hoursTitle}
              </h3>
              <ul className="mt-4 space-y-2 text-paper/85">
                {contact.hours.map((row, index) => (
                  <motion.li
                    key={row.days}
                    className="flex justify-between gap-6 border-b border-paper/10 pb-2"
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span>{row.days}</span>
                    <span>{row.hours}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <dl className="space-y-3 text-paper/85">
              <div>
                <dt className="text-sm text-paper/50">{contact.addressLabel}</dt>
                <dd>{contact.address}</dd>
              </div>
              <div>
                <dt className="text-sm text-paper/50">{contact.phoneLabel}</dt>
                <dd>
                  <a href={PHONE_HREF} className="hover:text-gold">{PHONE_DISPLAY}</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-paper/50">{contact.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-paper/50">{contact.instagramLabel}</dt>
                <dd>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    {INSTAGRAM_HANDLE}
                  </a>
                </dd>
              </div>
            </dl>

            <WhatsAppButton message={whatsappMessage} label={contact.ctaWhatsapp} />
          </div>

          <div className="h-80 overflow-hidden rounded-2xl lg:h-full">
            <iframe
              src={MAPS_EMBED_SRC}
              title="Mauri Barber — Google Maps"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

`ContactHours` becomes a Client Component (`"use client"`) because it needs `motion.li` and `useReducedMotion` directly — `<li>` elements must be direct children of `<ul>`, so this can't go through the `Reveal` div-wrapper primitive; using `motion.li` inline avoids invalid markup (a `<div>` between `<ul>` and `<li>`). Address, phone, email, Instagram, and the WhatsApp CTA are untouched — the design spec explicitly keeps this conversion-critical block free of animation delay.

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 3: Commit**

```bash
git add components/ContactHours/ContactHours.tsx
git commit -m "feat: add staggered reveal to contact hours"
```

---

### Task 12: WhatsApp floating button — pulsing halo

**Files:**
- Modify: `app/globals.css`
- Modify: `components/WhatsAppButton/WhatsAppButton.tsx`

- [ ] **Step 1: Add the pulse keyframes to `app/globals.css`**

Append to the end of `app/globals.css`:

```css
@keyframes whatsapp-pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

.animate-whatsapp-pulse {
  animation: whatsapp-pulse 2.4s ease-out infinite;
}
```

- [ ] **Step 2: Update the floating variant in `components/WhatsAppButton/WhatsAppButton.tsx`**

Change:

```typescript
  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.699 4.607 1.902 6.474L4 29l7.73-2.028A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm6.593 17.06c-.277.78-1.377 1.437-2.257 1.622-.601.126-1.386.226-4.03-.865-3.377-1.398-5.554-4.816-5.723-5.04-.168-.224-1.368-1.82-1.368-3.472 0-1.652.868-2.463 1.176-2.8.309-.336.673-.42.898-.42.225 0 .449.002.645.012.207.01.485-.079.759.58.28.673.951 2.325 1.034 2.494.084.169.14.365.028.588-.112.224-.168.365-.336.56-.168.196-.353.437-.505.588-.168.169-.343.353-.148.693.196.336.868 1.432 1.863 2.32 1.28 1.141 2.359 1.494 2.694 1.663.336.169.532.14.729-.084.196-.224.84-.98 1.064-1.316.224-.336.448-.28.756-.168.309.112 1.96.924 2.296 1.092.336.168.56.252.645.393.084.14.084.812-.193 1.593Z" />
        </svg>
      </a>
    );
  }
```

to:

```typescript
  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <span
          aria-hidden="true"
          className="animate-whatsapp-pulse absolute inset-0 -z-10 rounded-full bg-[#25D366] motion-reduce:hidden"
        />
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.699 4.607 1.902 6.474L4 29l7.73-2.028A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm6.593 17.06c-.277.78-1.377 1.437-2.257 1.622-.601.126-1.386.226-4.03-.865-3.377-1.398-5.554-4.816-5.723-5.04-.168-.224-1.368-1.82-1.368-3.472 0-1.652.868-2.463 1.176-2.8.309-.336.673-.42.898-.42.225 0 .449.002.645.012.207.01.485-.079.759.58.28.673.951 2.325 1.034 2.494.084.169.14.365.028.588-.112.224-.168.365-.336.56-.168.196-.353.437-.505.588-.168.169-.343.353-.148.693.196.336.868 1.432 1.863 2.32 1.28 1.141 2.359 1.494 2.694 1.663.336.169.532.14.729-.084.196-.224.84-.98 1.064-1.316.224-.336.448-.28.756-.168.309.112 1.96.924 2.296 1.092.336.168.56.252.645.393.084.14.084.812-.193 1.593Z" />
        </svg>
      </a>
    );
  }
```

Pure CSS animation (no Framer Motion, consistent with the existing `animate-stripe-scroll`/`animate-barber-pole` pattern in this codebase) — a same-colored ring scales up and fades out on a loop behind the button (`-z-10`). `motion-reduce:hidden` removes the ring element entirely under reduced motion rather than freezing it mid-animation (which would leave a static translucent halo, not the "button stays static" behavior the design spec calls for). The `fixed` positioning on the parent `<a>` already establishes the positioning context the `absolute inset-0` ring needs — no extra `relative` class required. The inline (non-floating) variant of `WhatsAppButton` is untouched.

- [ ] **Step 3: Typecheck**

```bash
npx tsc --noEmit
```

Expected: no output, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components/WhatsAppButton/WhatsAppButton.tsx
git commit -m "feat: add pulsing halo to floating WhatsApp button"
```

---

### Task 13: Final build and manual verification

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

```bash
rm -rf .next
npm run build
```

Expected: build completes with no type errors. `ContactHours` and the four `components/motion/*` files should compile as Client Components without breaking static generation — the route table should still show `/es` and `/en` prerendered (`●`), same as before this plan.

- [ ] **Step 2: Confirm both locales render**

```bash
npm run start -- -p 3800 &
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3800/es
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3800/en
kill %1
```

Expected: both return `200`.

- [ ] **Step 3: Manual browser check (both locales)**

Open `http://localhost:3800/es` and `http://localhost:3800/en` and confirm:
- Hero headline reveals in staggered lines on load; background has a very subtle parallax drift while scrolling.
- The thin gold progress bar at the very top fills as you scroll down.
- Services rows fade/slide in with large ghost numerals behind them; hovering a row tints its background and the ghost numeral.
- Gallery tiles fade/scale in staggered; hovering a tile shows a gold ring and slight zoom.
- Historia's photo is offset with a gold frame peeking out behind it; the "10+" stat counts up when scrolled into view.
- Review cards fade/scale in staggered.
- Contact hour rows fade in staggered; address/phone/email/WhatsApp CTA appear immediately, un-animated.
- The floating WhatsApp button has a soft pulsing ring.
- In OS/browser reduced-motion emulation, all of the above appear instantly with no animation, and the scroll cue and WhatsApp pulse ring are not present at all.

- [ ] **Step 4: Final commit (only if any fixes were made during verification)**

```bash
git add -A
git commit -m "fix: address issues found during modernization verification"
```
