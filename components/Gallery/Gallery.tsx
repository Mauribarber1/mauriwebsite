import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import type { Messages } from "@/lib/dictionaries";

type GalleryProps = {
  gallery: Messages["gallery"];
};

const IMAGES = [
  "/images/image-interieur1.jpeg",
  "/images/image-coupe1.jpeg",
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
                  className={`object-cover transition-transform duration-300 group-hover:scale-105 ${index >= 2 ? "grayscale" : ""}`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
