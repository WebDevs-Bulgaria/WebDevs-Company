// Поддържани езици. Първият е езикът по подразбиране.
export const locales = ["bg", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bg";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// Стойности за атрибута hreflang и за Open Graph.
export const localeTags: Record<Locale, { hreflang: string; openGraph: string }> = {
  bg: { hreflang: "bg-BG", openGraph: "bg_BG" },
  en: { hreflang: "en", openGraph: "en_US" },
};

// Сглобява адрес с езиков префикс: localizedPath("bg", "/services") -> "/bg/services".
export function localizedPath(locale: Locale, path: string = "/"): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}
