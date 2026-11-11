// Публичният адрес на сайта. В среда за преглед се задава през NEXT_PUBLIC_SITE_URL.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://webdevs.bg"
).replace(/\/$/, "");

// Индексиране се разрешава само когато изрично е зададено, че това е публичният сайт.
export const isIndexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

// Страниците на публичния сайт. Ключът съвпада с ключа в преводите (nav, meta).
export const sitePages = [
  { key: "home", path: "/" },
  { key: "services", path: "/services" },
  { key: "projects", path: "/projects" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
  { key: "privacy", path: "/privacy" },
] as const;

export type SitePageKey = (typeof sitePages)[number]["key"];

// Страниците, които се показват в главната навигация.
export const navPages = sitePages.filter(
  (page) => page.key !== "home" && page.key !== "privacy",
);

export function pagePath(key: SitePageKey): string {
  return sitePages.find((page) => page.key === key)!.path;
}
