import Image from "next/image";

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image src="/logo-noir.svg" alt="Mauri Studio" width={384} height={225} className="h-14 w-auto" priority />
    </span>
  );
}
