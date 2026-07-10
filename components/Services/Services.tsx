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
          <div
            key={item.name}
            className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-6 border-b border-black/10 py-7"
          >
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
        ))}
      </div>
      <p className="mt-6 text-xs text-ink/50">{services.priceNote}</p>
    </section>
  );
}
