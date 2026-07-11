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
        <div className="md:pr-16">
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
          <Reveal delay={0.05} className="relative aspect-[4/5] overflow-hidden rounded-2xl md:-ml-24">
            <ParallaxImage src="/images/historia.jpg" alt="" sizes="(min-width: 768px) 50vw, 100vw" strength={20} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
