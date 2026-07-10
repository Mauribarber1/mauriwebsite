import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import type { Messages } from "@/lib/dictionaries";

type HeroProps = {
  hero: Messages["hero"];
  whatsappMessage: string;
};

export default function Hero({ hero, whatsappMessage }: HeroProps) {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-paper">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {hero.eyebrow}
        </p>
        <h1 className="max-w-2xl font-display text-5xl uppercase leading-[0.9] tracking-wide sm:text-6xl md:text-7xl">
          {hero.title}
          <br />
          <span className="text-gold">{hero.titleHighlight}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-paper/85">{hero.description}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <WhatsAppButton message={whatsappMessage} label={hero.ctaPrimary} />
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded-full border border-paper/40 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-gold hover:text-gold"
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
