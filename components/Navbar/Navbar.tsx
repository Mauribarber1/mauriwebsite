import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import type { Locale, Messages } from "@/lib/dictionaries";

type NavbarProps = {
  locale: Locale;
  navbar: Messages["navbar"];
  whatsappMessage: string;
};

export default function Navbar({ locale, navbar, whatsappMessage }: NavbarProps) {
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const otherLabel = locale === "es" ? "EN" : "ES";

  const links = [
    { href: "#services", label: navbar.services },
    { href: "#gallery", label: navbar.gallery },
    { href: "#reviews", label: navbar.reviews },
    { href: "#contact", label: navbar.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-gold-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href={`/${otherLocale}`}
            className="text-sm font-medium text-ink/60 transition-colors hover:text-gold-dark"
          >
            {otherLabel}
          </Link>
          <WhatsAppButton message={whatsappMessage} label={navbar.whatsapp} />
        </div>
      </div>
    </header>
  );
}
