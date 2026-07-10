import type { Messages } from "@/lib/dictionaries";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Mauri+barber/@41.4036,2.1955,17z";

type ReviewsProps = {
  reviews: Messages["reviews"];
};

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold-dark">
            {reviews.eyebrow}
          </p>
          <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
            {reviews.title}
          </h2>
        </div>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition-colors hover:border-gold"
        >
          <span aria-hidden="true" className="text-gold-dark">★★★★★</span>
          <span>{reviews.ratingLabel} · {reviews.googleLabel}</span>
        </a>
      </div>
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
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block text-sm font-medium text-gold-dark hover:underline"
      >
        {reviews.viewAllLabel}
      </a>
    </section>
  );
}
