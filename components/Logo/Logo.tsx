type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-noir.svg" alt="Mauri Studio" className="h-20 w-auto" />
    </span>
  );
}
