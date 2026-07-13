import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import StripeBand from "@/components/StripeBand/StripeBand";
import Services from "@/components/Services/Services";
import Gallery from "@/components/Gallery/Gallery";
import Historia from "@/components/Historia/Historia";
import Reviews from "@/components/Reviews/Reviews";
import ContactHours from "@/components/ContactHours/ContactHours";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";
import { getDictionary, type Locale } from "@/lib/dictionaries";

const BASE_URL = "https://www.mauribarber.com";

type Props = {
  params: Promise<{ locale: Locale }>;
};

const METADATA_BY_LOCALE: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Mauri Barber — Barbería en Barcelona",
    description:
      "Mauri Barber, barbería en el barrio de Sant Martí, Barcelona. Cortes de pelo, barba y afeitado clásico. Reserva por WhatsApp.",
  },
  en: {
    title: "Mauri Barber — Barbershop in Barcelona",
    description:
      "Mauri Barber, a barbershop in the Sant Martí neighborhood of Barcelona. Haircuts, beard grooming and classic shaves. Book on WhatsApp.",
  },
  pt: {
    title: "Mauri Barber — Barbearia em Barcelona",
    description:
      "Mauri Barber, barbearia no bairro de Sant Martí, Barcelona. Cortes de cabelo, barba e barbear clássico. Agende pelo WhatsApp.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { title, description } = METADATA_BY_LOCALE[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        pt: `${BASE_URL}/pt`,
        "x-default": `${BASE_URL}/es`,
      },
    },
  };
}

function buildLocalBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "Mauri Barber",
    url: `${BASE_URL}/${locale}`,
    image: `${BASE_URL}/images/hero.jpg`,
    telephone: "+34664301664",
    email: "mauribcn@gmail.com",
    // TODO: placeholder tier, no real pricing from the client yet — update once known
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer de Bilbao 38",
      addressLocality: "Barcelona",
      postalCode: "08005",
      addressCountry: "ES",
    },
    // TODO: approximate coords reused from Reviews.tsx's Maps link — verify against a real geocode
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.4036,
      longitude: 2.1955,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "14:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "15:30",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: ["https://www.instagram.com/maurilima71"],
  };
}

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }, { locale: "pt" }];
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const localBusinessJsonLd = buildLocalBusinessJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <ScrollProgressBar />
      <Navbar locale={locale} navbar={dict.navbar} whatsappMessage={dict.whatsapp.message} />
      <main>
        <Hero hero={dict.hero} whatsappMessage={dict.whatsapp.message} />
        <StripeBand stripeBand={dict.stripeBand} />
        <Services services={dict.services} />
        <Gallery gallery={dict.gallery} />
        <Historia historia={dict.historia} />
        <Reviews reviews={dict.reviews} />
        <ContactHours contact={dict.contact} whatsappMessage={dict.whatsapp.message} />
      </main>
      <Footer footer={dict.footer} />
      <WhatsAppButton message={dict.whatsapp.message} label={dict.navbar.whatsapp} variant="floating" />
    </>
  );
}
