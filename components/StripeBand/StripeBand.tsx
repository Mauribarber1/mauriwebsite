import type { Messages } from "@/lib/dictionaries";

type StripeBandProps = {
  stripeBand: Messages["stripeBand"];
};

const REPEAT_COUNT = 6;

export default function StripeBand({ stripeBand }: StripeBandProps) {
  const half = Array.from({ length: REPEAT_COUNT }, () => stripeBand.items).flat();
  const loopItems = [...half, ...half];

  return (
    <div className="relative overflow-hidden py-2">
      <div
        className="animate-barber-pole absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, var(--color-ink) 0 17px, var(--color-gold-dark) 17px 18px, var(--color-gold) 18px 35px, var(--color-gold-dark) 35px 36px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0) 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35))",
        }}
      />
      <div
        aria-hidden="true"
        className="animate-stripe-scroll relative inline-flex whitespace-nowrap bg-ink py-1"
      >
        {loopItems.map((item, index) => (
          <span key={`${item}-${index}`} className="font-display mx-4 text-sm tracking-wide text-paper">
            {item}
            <span className="mx-4 text-gold">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
