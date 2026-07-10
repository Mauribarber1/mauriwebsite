import type { Messages } from "@/lib/dictionaries";

type StripeBandProps = {
  stripeBand: Messages["stripeBand"];
};

const REPEAT_COUNT = 6;

export default function StripeBand({ stripeBand }: StripeBandProps) {
  const half = Array.from({ length: REPEAT_COUNT }, () => stripeBand.items).flat();
  const loopItems = [...half, ...half];

  return (
    <div
      className="animate-barber-pole overflow-hidden py-1.5"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, var(--color-ink) 0 22px, var(--color-gold-dark) 22px 24px, var(--color-paper) 24px 26px, var(--color-gold) 26px 28px, var(--color-ink) 28px 50px)",
      }}
    >
      <div
        aria-hidden="true"
        className="animate-stripe-scroll inline-flex whitespace-nowrap bg-ink py-1"
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
