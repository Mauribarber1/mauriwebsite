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
      <div className="mt-12 space-y-12">
        {services.groups.map((group) => (
          <div key={group.name}>
            <h3 className="font-display mb-2 text-xl uppercase tracking-wide text-gold-dark">
              {group.name}
            </h3>
            <div className="border-t border-black/10">
              {group.items.map((item, index) => (
                <Reveal key={item.name} delay={index * 0.06}>
                  <div className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-6 overflow-hidden border-b border-black/10 py-7 transition-colors duration-300 hover:bg-gold-soft">
                    <span
                      aria-hidden="true"
                      className="font-display pointer-events-none absolute -left-2 top-1/2 -z-10 -translate-y-1/2 text-8xl text-ink/5 transition-colors duration-300 group-hover:text-gold-dark sm:text-9xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-sm text-gold-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-display text-2xl">{item.name}</h4>
                    </div>
                    <span className="font-display whitespace-nowrap text-2xl text-gold-dark">
                      {item.price}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-ink/50">{services.priceNote}</p>
    </section>
  );
}
