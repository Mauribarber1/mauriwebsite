type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`font-serif text-xl font-semibold tracking-wide uppercase ${className}`}
    >
      Mauri <span className="text-gold-dark">Barber</span>
    </span>
  );
}
