import type { MetadataRoute } from "next";
import { defaultLocale, localeTags, localizedPath, locales } from "@/i18n/config";
import { serviceIds, servicePath } from "@/lib/services";
import { sitePages, siteUrl } from "@/lib/site";

// sitemap.xml: всяка страница на всеки език (вкл. страниците на услугите), с връзки към другите езикови версии.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ...sitePages.map((page) => ({ key: page.key as string, path: page.path })),
    ...serviceIds.map((id) => ({ key: "service", path: servicePath(id) })),
  ];
  return pages.flatMap((page) => {
    const languages: Record<string, string> = {
      "x-default": `${siteUrl}${localizedPath(defaultLocale, page.path)}`,
    };
    for (const locale of locales) {
      languages[localeTags[locale].hreflang] = `${siteUrl}${localizedPath(locale, page.path)}`;
    }

    return locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, page.path)}`,
      changeFrequency: "monthly" as const,
      priority: page.key === "home" ? 1 : page.key === "privacy" ? 0.2 : page.key === "service" ? 0.7 : 0.8,
      alternates: { languages },
    }));
  });
}
