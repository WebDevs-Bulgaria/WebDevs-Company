import type { Metadata } from "next";
import { defaultLocale, localeTags, localizedPath, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { servicePath } from "@/lib/services";
import { pagePath, type SitePageKey } from "@/lib/site";

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
  const dictionary = await getDictionary(locale);
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
    alt: dictionary.meta.home.title,
  };

  return {
    // С absoluteTitle заглавието не минава през шаблона „… | Web Devs Bulgaria“ от root layout.
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      siteName: dictionary.meta.siteName,
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

// Мета данните на една от основните страници (заглавие и описание от meta.<ключ> в речника).
export async function buildPageMetadata(key: SitePageKey): Promise<Metadata> {
  const { title, description } = (await getDictionary()).meta[key];
  return buildMetadata({ title, description, path: pagePath(key), absoluteTitle: key === "home" });
}

// Мета данните на страницата на една услуга: заглавието е името ѝ, описанието — резюмето ѝ.
export async function buildServiceMetadata(id: string): Promise<Metadata> {
  const { services } = await getDictionary();
  const service = services.items.find((item) => item.id === id);
  if (!service) return {};

  return buildMetadata({
    title: `${service.title} — ${services.title}`,
    description: service.intro,
    path: servicePath(id),
  });
}
