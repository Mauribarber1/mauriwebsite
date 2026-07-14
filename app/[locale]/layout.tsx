import { notFound } from "next/navigation";
import CookieBanner from "@/components/CookieConsent/CookieBanner";
import { getDictionary, LOCALES, type Locale } from "@/lib/dictionaries";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      {children}
      <CookieBanner locale={locale as Locale} cookieBanner={dict.cookieBanner} />
    </>
  );
}
