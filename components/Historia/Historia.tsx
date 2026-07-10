import Image from "next/image";
import type { Messages } from "@/lib/dictionaries";

type HistoriaProps = {
  historia: Messages["historia"];
};

export default function Historia({ historia }: HistoriaProps) {
  return (
    <section className="bg-ink py-24 text-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/images/historia.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
            {historia.eyebrow}
          </p>
          <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
            {historia.title}
          </h2>
          <p className="mt-6 max-w-xl text-paper/80">{historia.paragraph}</p>
        </div>
      </div>
    </section>
  );
}
