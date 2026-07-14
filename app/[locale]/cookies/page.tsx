import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import LegalPage from "@/components/LegalPage/LegalPage";
import { getDictionary, LOCALES, type Locale } from "@/lib/dictionaries";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: `Mauri Barber — ${dict.legalPages.cookies.title}`,
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} navbar={dict.navbar} whatsappMessage={dict.whatsapp.message} />
      <LegalPage content={dict.legalPages.cookies} />
      <Footer footer={dict.footer} locale={locale} />
      <WhatsAppButton message={dict.whatsapp.message} label={dict.navbar.whatsapp} variant="floating" />
    </>
  );
}
