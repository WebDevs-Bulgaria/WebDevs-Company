import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { hasLocale, type Locale } from "./config";

const dictionaries = {
  bg: () => import("@/messages/bg.json").then((module) => module.default),
  en: () => import("@/messages/en.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["bg"]>>;

// Текущият език от адреса. Работи само в сървърни компоненти.
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  if (!value || !hasLocale(value)) notFound();
  return value;
}

// Без аргумент взима езика от адреса; с аргумент се ползва извън сървърни
// компоненти (Server Actions, sitemap), където next/root-params не е достъпен.
export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  return dictionaries[locale ?? (await getLocale())]();
}
