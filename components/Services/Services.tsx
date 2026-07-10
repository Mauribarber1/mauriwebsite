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
        <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
          {services.title}
        </h2>
        <p className="mt-4 text-ink/70">{services.description}</p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-black/5 bg-gold-soft/30 p-6 transition-colors hover:border-gold"
          >
            <h3 className="font-serif text-xl font-semibold">{item.name}</h3>
            <p className="mt-2 text-sm text-ink/70">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
