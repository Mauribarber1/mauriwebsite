import HoursList from "@/components/ContactHours/HoursList";
import MapEmbed from "@/components/ContactHours/MapEmbed";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import type { Messages } from "@/lib/dictionaries";

const PHONE_DISPLAY = "664 30 16 65";
const PHONE_HREF = "tel:+34664301665";
const EMAIL = "mauriciubcn@gmail.com";
const INSTAGRAM_HANDLE = "@maurilima71";
const INSTAGRAM_URL = "https://www.instagram.com/maurilima71";

type ContactHoursProps = {
  contact: Messages["contact"];
  whatsappMessage: string;
  mapFallback: Messages["mapFallback"];
};

export default function ContactHours({ contact, whatsappMessage, mapFallback }: ContactHoursProps) {
  return (
    <section id="contact" className="bg-ink py-24 text-paper">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
          {contact.eyebrow}
        </p>
        <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">{contact.title}</h2>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl text-gold">
                {contact.hoursTitle}
              </h3>
              <HoursList hours={contact.hours} />
            </div>

            <dl className="space-y-3 text-paper/85">
              <div>
                <dt className="text-sm text-paper/50">{contact.addressLabel}</dt>
                <dd>{contact.address}</dd>
              </div>
              <div>
                <dt className="text-sm text-paper/50">{contact.phoneLabel}</dt>
                <dd>
                  <a href={PHONE_HREF} className="hover:text-gold">{PHONE_DISPLAY}</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-paper/50">{contact.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-paper/50">{contact.instagramLabel}</dt>
                <dd>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    {INSTAGRAM_HANDLE}
                  </a>
                </dd>
              </div>
            </dl>

            <WhatsAppButton message={whatsappMessage} label={contact.ctaWhatsapp} />
          </div>

          <div className="h-80 overflow-hidden rounded-2xl lg:h-full">
            <MapEmbed mapFallback={mapFallback} />
          </div>
        </div>
      </div>
    </section>
  );
}
