import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import type { Locale, Messages } from "@/lib/dictionaries";

type FooterProps = {
  footer: Messages["footer"];
  locale: Locale;
};

export default function Footer({ footer, locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-paper py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
        <Logo />
        <p className="text-sm text-ink/60">{footer.tagline}</p>
        <p className="text-xs text-ink/40">
          © {year} Mauri Studio. {footer.rights}
          {" · "}
          <Link href={`/${locale}/aviso-legal`} className="underline transition-colors hover:text-gold-dark">
            {footer.legalNotice}
          </Link>
          {" · "}
          <Link href={`/${locale}/privacidad`} className="underline transition-colors hover:text-gold-dark">
            {footer.privacy}
          </Link>
          {" · "}
          <Link href={`/${locale}/cookies`} className="underline transition-colors hover:text-gold-dark">
            {footer.cookies}
          </Link>
        </p>
        <p className="text-xs text-ink/40">
          <a
            href="https://www.klentcreative.com/es"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-gold-dark"
          >
            {footer.credit}
          </a>
        </p>
      </div>
    </footer>
  );
}
