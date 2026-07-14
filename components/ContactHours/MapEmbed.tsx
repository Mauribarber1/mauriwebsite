"use client";

import { useCookieConsent } from "@/components/CookieConsent/CookieConsentContext";
import type { Messages } from "@/lib/dictionaries";

const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=Carrer+de+Bilbao+38,+08005+Barcelona&output=embed";
const MAPS_LINK = "https://www.google.com/maps/place/Mauri+barber/@41.4036,2.1955,17z";

type MapEmbedProps = {
  mapFallback: Messages["mapFallback"];
};

export default function MapEmbed({ mapFallback }: MapEmbedProps) {
  const { status } = useCookieConsent();

  if (status === "accepted") {
    return (
      <iframe
        src={MAPS_EMBED_SRC}
        title="Mauri Barber — Google Maps"
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-ink/5 p-6 text-center">
      <p className="max-w-xs text-sm text-ink/60">{mapFallback.message}</p>
      <a
        href={MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-gold hover:text-ink"
      >
        {mapFallback.cta}
      </a>
    </div>
  );
}
