import Logo from "@/components/Logo/Logo";
import type { Messages } from "@/lib/dictionaries";

type FooterProps = {
  footer: Messages["footer"];
};

export default function Footer({ footer }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-paper py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
        <Logo />
        <p className="text-sm text-ink/60">{footer.tagline}</p>
        <p className="text-xs text-ink/40">
          © {year} Mauri Barber. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
