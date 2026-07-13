type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="font-display text-xl uppercase tracking-wide">
        Mauri <span className="text-gold-dark">Barber</span>
      </span>
    </span>
  );
}
