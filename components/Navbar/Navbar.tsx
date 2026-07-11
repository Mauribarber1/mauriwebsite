"use client";

import { useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
              className="relative text-sm font-medium text-ink/80 transition-colors after:absolute after:-bottom-1 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:text-gold-dark hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href={`/${otherLocale}`}
            className="hidden text-sm font-medium text-ink/60 transition-colors hover:text-gold-dark sm:inline"
          >
            {otherLabel}
          </Link>
          <WhatsAppButton message={whatsappMessage} label={navbar.whatsapp} />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={navbar.menu}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-gold-soft md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-paper px-6 py-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-gold-soft hover:text-gold-dark"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={`/${otherLocale}`}
            onClick={() => setIsMenuOpen(false)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink/60 transition-colors hover:bg-gold-soft hover:text-gold-dark"
          >
            {otherLabel}
          </Link>
        </nav>
      )}
    </header>
  );
}
