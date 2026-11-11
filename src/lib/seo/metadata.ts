import type { Metadata } from "next";
import { defaultLocale, localeTags, localizedPath, locales } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { servicePath } from "@/lib/services";
import { pagePath, type SitePageKey } from "@/lib/site";

// В кой namespace са заглавието и описанието (meta.title, meta.description) на всяка страница.
const metaNamespace = {
  home: "home",
  services: "services",
  projects: "solutions",
  about: "about",
  contact: "contact",
  privacy: "privacy",
} as const satisfies Record<SitePageKey, string>;

// Общото за всяка страница: каноничен адрес, връзки към другите езикови версии
// (hreflang) и данни за споделяне. path е адресът без езиковия префикс.
async function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Promise<Metadata> {
  const locale = await getLocale();
  const { t } = await getT("common");
  const { t: tHome } = await getT("home");
  const url = localizedPath(locale, path);

  const languages: Record<string, string> = {
    "x-default": localizedPath(defaultLocale, path),
  };
  for (const item of locales) {
    languages[localeTags[item].hreflang] = localizedPath(item, path);
  }

  // Картинката за споделяне се генерира от src/app/[locale]/opengraph-image.tsx.
  // Посочва се изрично, защото обектът openGraph на страницата замества наследения.
  const image = {
    url: `/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: tHome("meta.title"),
  };

  return {
    // С absoluteTitle заглавието не минава през шаблона „… | Web Devs Bulgaria“ от root layout.
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title,
      description,
      url,
      locale: localeTags[locale].openGraph,
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => localeTags[item].openGraph),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

// Мета данните на една от основните страници (meta.title и meta.description от нейния namespace).
export async function buildPageMetadata(key: SitePageKey): Promise<Metadata> {
  const { t } = await getT(metaNamespace[key]);
  return buildMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: pagePath(key),
    absoluteTitle: key === "home",
  });
}

// Мета данните на страницата на една услуга: заглавието е името ѝ, описанието — въведението ѝ.
export async function buildServiceMetadata(id: string): Promise<Metadata> {
  const { t } = await getT("services");
  const service = t("items").find((item) => item.id === id);
  if (!service) return {};

  return buildMetadata({
    title: `${service.title} — ${t("title")}`,
    description: service.intro,
    path: servicePath(id),
  });
}
