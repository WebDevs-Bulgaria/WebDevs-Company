import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { createServerI18next } from "next-i18next/server";
import { hasLocale, type Locale } from "./config";
import settings from "./settings";

/*
 * Преводите на сървъра (i18next през next-i18next).
 *
 *   const { t } = await getT("common");            // винаги с име на namespace: getT() без име дава твърде широк тип
 *   const { t: tHome } = await getT("home");       // по една функция на namespace
 *   t("nav.services")
 *   tHome("hero.eyebrow")
 *   tServices("items")                             // списък или обект (returnObjects е включено)
 *
 * В сървърните компоненти езикът идва от адреса (next/root-params), затова страниците остават
 * предварително генерирани. В Server Actions и в global-not-found адрес няма — там езикът се
 * подава изрично: getT("contact", { lng: locale }).
 *
 * Клиентските компоненти не ползват i18next: получават готовите текстове като свойства, за да
 * не отива кодът на библиотеката в браузъра.
 */
export const { getT } = createServerI18next(settings);

// Текущият език от адреса. Работи само в сървърни компоненти.
export async function getLocale(): Promise<Locale> {
  const value = await rootLocale();
  if (!value || !hasLocale(value)) notFound();
  return value;
}
