type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className="h-8 w-8 shrink-0 rounded-full border border-gold-dark"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-ink) 0 5px, var(--color-gold) 5px 7px, var(--color-ink) 7px 12px, var(--color-paper) 12px 14px)",
        }}
      />
      <span className="font-display text-xl uppercase tracking-wide">
        Mauri <span className="text-gold-dark">Barber</span>
      </span>
    </span>
  );
}
