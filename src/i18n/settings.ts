import type { I18nConfig } from "next-i18next/proxy";
import { defaultLocale, locales } from "./config";

/*
 * Namespace-ите на преводите: по един JSON файл на език в src/i18n/locales/<език>/.
 *  - common   — навигация, бутони, футър, покана за връзка, ангажименти, 404
 *  - home, services, solutions, about, contact, privacy — по един на страница
 *  - admin, tickets — предвидени за административния панел и системата за заявки;
 *    засега са празни и се попълват, когато започне работата по портала.
 */
export const namespaces = [
  "common",
  "home",
  "services",
  "solutions",
  "about",
  "contact",
  "privacy",
  "admin",
  "tickets",
] as const;

export type Namespace = (typeof namespaces)[number];

const settings: I18nConfig = {
  supportedLngs: [...locales],
  fallbackLng: defaultLocale,
  defaultNS: "common",
  ns: [...namespaces],
  // Езиковият сегмент в адреса е app/[locale], а не app/[lng] (подразбирането на библиотеката).
  localeParamName: "locale",
  // Динамичен import, който пакетиращата програма проследява: файловете с преводи влизат в
  // сървърния код при всеки хостинг и не се четат от диска при заявка.
  resourceLoader: (language, namespace) => import(`./locales/${language}/${namespace}.json`),
  // Част от съдържанието е в списъци и обекти (услуги, стъпки, раздели): t() ги връща цели.
  i18nextOptions: { returnObjects: true },
};

export default settings;
