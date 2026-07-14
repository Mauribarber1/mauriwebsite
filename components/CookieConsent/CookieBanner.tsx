"use client";

import Link from "next/link";
import { useCookieConsent } from "@/components/CookieConsent/CookieConsentContext";
import type { Locale, Messages } from "@/lib/dictionaries";

type CookieBannerProps = {
  locale: Locale;
  cookieBanner: Messages["cookieBanner"];
};

export default function CookieBanner({ locale, cookieBanner }: CookieBannerProps) {
  const { status, accept, reject } = useCookieConsent();

  if (status !== "unset") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-black/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink/80">
          {cookieBanner.message}{" "}
          <Link href={`/${locale}/cookies`} className="underline hover:text-gold-dark">
            {cookieBanner.more}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={reject}
            className="rounded-full border border-black/10 px-5 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-gold hover:text-gold-dark"
          >
            {cookieBanner.reject}
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-gold hover:text-ink"
          >
            {cookieBanner.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
