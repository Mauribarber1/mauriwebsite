import type { Messages } from "@/lib/dictionaries";

type StripeBandProps = {
  stripeBand: Messages["stripeBand"];
};

export default function StripeBand({ stripeBand }: StripeBandProps) {
  const loopItems = [...stripeBand.items, ...stripeBand.items];

  return (
    <div
      className="overflow-hidden py-3"
      style={{
        backgroundImage:
          "repeating-linear-gradient(-45deg, var(--color-ink) 0 42px, var(--color-gold-dark) 42px 46px, var(--color-paper) 46px 50px, var(--color-gold) 50px 54px, var(--color-ink) 54px 96px)",
      }}
    >
      <div
        aria-hidden="true"
        className="animate-stripe-scroll inline-flex whitespace-nowrap bg-ink py-2"
      >
        {loopItems.map((item, index) => (
          <span key={`${item}-${index}`} className="font-display mx-8 text-xl tracking-wide text-paper">
            {item}
            <span className="mx-8 text-gold">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
