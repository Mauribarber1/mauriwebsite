import { notFound } from "next/navigation";
import "server-only";
import esMessages from "@/messages/es.json";

const dictionaries = {
  es: () => import("@/messages/es.json").then((mod) => mod.default),
  en: () => import("@/messages/en.json").then((mod) => mod.default),
  pt: () => import("@/messages/pt.json").then((mod) => mod.default),
};

export type Locale = keyof typeof dictionaries;
export type Messages = typeof esMessages;
export const LOCALES = Object.keys(dictionaries) as Locale[];

export async function getDictionary(locale: Locale): Promise<Messages> {
  const loadDictionary = dictionaries[locale];
  // Layout's notFound() guard isn't reliably synchronous with this page's
  // render in this Next.js version, so an invalid locale can still reach
  // here — guard again rather than removing this as "redundant" (see 490cd27).
  if (!loadDictionary) {
    notFound();
  }
  return loadDictionary();
}
