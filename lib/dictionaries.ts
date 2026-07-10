import { notFound } from "next/navigation";
import "server-only";
import esMessages from "@/messages/es.json";

const dictionaries = {
  es: () => import("@/messages/es.json").then((mod) => mod.default),
  en: () => import("@/messages/en.json").then((mod) => mod.default),
};

export type Locale = keyof typeof dictionaries;
export type Messages = typeof esMessages;

export async function getDictionary(locale: Locale): Promise<Messages> {
  const loadDictionary = dictionaries[locale];
  if (!loadDictionary) {
    notFound();
  }
  return loadDictionary();
}
