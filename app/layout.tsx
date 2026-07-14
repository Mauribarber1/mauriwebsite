import type { Metadata } from "next";
import { Work_Sans, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { CookieConsentProvider } from "@/components/CookieConsent/CookieConsentContext";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mauri Studio — Barbería en Barcelona",
  description:
    "Mauri Studio, barbería en el barrio de Sant Martí, Barcelona. Cortes de pelo, barba y afeitado clásico. Reserva por WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${workSans.variable} ${bebasNeue.variable}`}>
      <body>
        <CookieConsentProvider>{children}</CookieConsentProvider>
        <Analytics />
      </body>
    </html>
  );
}
