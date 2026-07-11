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
