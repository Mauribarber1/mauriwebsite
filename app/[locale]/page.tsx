import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import Gallery from "@/components/Gallery/Gallery";
import Reviews from "@/components/Reviews/Reviews";
import ContactHours from "@/components/ContactHours/ContactHours";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import { getDictionary, type Locale } from "@/lib/dictionaries";

const BASE_URL = "https://www.mauribarber.com";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs
      ? "Mauri Barber — Barbería en Barcelona"
      : "Mauri Barber — Barbershop in Barcelona",
    description: isEs
      ? "Mauri Barber, barbería en el barrio de Sant Martí, Barcelona. Cortes de pelo, barba y afeitado clásico. Reserva por WhatsApp."
      : "Mauri Barber, a barbershop in the Sant Martí neighborhood of Barcelona. Haircuts, beard grooming and classic shaves. Book on WhatsApp.",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/es`,
      },
    },
  };
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Mauri Barber",
  image: `${BASE_URL}/images/hero.jpg`,
  telephone: "+34664301664",
  email: "mauribcn@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carrer de Bilbao 38",
    addressLocality: "Barcelona",
    postalCode: "08005",
    addressCountry: "ES",
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

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Navbar locale={locale} navbar={dict.navbar} whatsappMessage={dict.whatsapp.message} />
      <main>
        <Hero hero={dict.hero} whatsappMessage={dict.whatsapp.message} />
        <Services services={dict.services} />
        <Gallery gallery={dict.gallery} />
        <Reviews reviews={dict.reviews} />
        <ContactHours contact={dict.contact} whatsappMessage={dict.whatsapp.message} />
      </main>
      <Footer footer={dict.footer} />
      <WhatsAppButton message={dict.whatsapp.message} label={dict.navbar.whatsapp} variant="floating" />
    </>
  );
}
