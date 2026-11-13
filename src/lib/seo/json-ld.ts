import { localizedPath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { company } from "@/lib/company";
import { servicePath } from "@/lib/services";
import { pagePath, siteUrl, type SitePageKey } from "@/lib/site";

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

const absolute = (path: string) => `${siteUrl}${path}`;

// Фирмата като ProfessionalService — с това търсачките разпознават име, контакти и услуги.
export async function organizationJsonLd() {
  const locale = await getLocale();
  const { t: tHome } = await getT("home");
  const { t: tServices } = await getT("services");

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: company.brandName,
    legalName: company.legalName[locale],
    description: tHome("meta.description"),
    url: absolute(localizedPath(locale)),
    email: company.email,
    telephone: company.phone.international,
    foundingDate: company.foundingDate,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "EIK",
      value: company.registrationNumber,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: company.address.locality[locale],
      addressCountry: company.address.countryCode,
    },
    areaServed: ["BG", "EU"],
    knowsLanguage: ["bg", "en"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: tServices("title"),
      itemListElement: tServices("items").map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          url: absolute(localizedPath(locale, servicePath(service.id))),
        },
      })),
    },
  };
}

export async function websiteJsonLd() {
  const locale = await getLocale();
  const { t } = await getT("common");

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: t("siteName"),
    url: absolute(localizedPath(locale)),
    inLanguage: locale,
    publisher: { "@id": organizationId },
  };
}

// Път до страницата (начало > текуща страница) за резултатите в търсачките. С leaf пътят
// получава трето ниво — подстраница на key (начало > услуги > името на услугата).
export async function breadcrumbJsonLd(key: SitePageKey, leaf?: { name: string; path: string }) {
  const locale = await getLocale();
  const { t } = await getT("common");

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("nav.home"),
        item: absolute(localizedPath(locale)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t(`nav.${key}`),
        item: absolute(localizedPath(locale, pagePath(key))),
      },
      ...(leaf
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: leaf.name,
              item: absolute(localizedPath(locale, leaf.path)),
            },
          ]
        : []),
    ],
  };
}
