import Image from "next/image";
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
  "/images/gallery-6.jpg",
];

export default function Gallery({ gallery }: GalleryProps) {
  return (
    <section id="gallery" className="bg-ink py-24 text-paper">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
            {gallery.eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            {gallery.title}
          </h2>
          <p className="mt-4 text-paper/70">{gallery.description}</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {IMAGES.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
