import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { company } from "@/lib/company";
import { servicePath } from "@/lib/services";
import { pagePath, siteUrl, type SitePageKey } from "@/lib/site";

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

const absolute = (path: string) => `${siteUrl}${path}`;

// Фирмата като ProfessionalService — с това търсачките разпознават име, контакти и услуги.
export function organizationJsonLd(locale: Locale, dictionary: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: company.brandName,
    legalName: company.legalName[locale],
    description: dictionary.meta.home.description,
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
      name: dictionary.services.title,
      itemListElement: dictionary.services.items.map((service) => ({
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

export function websiteJsonLd(locale: Locale, dictionary: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: dictionary.meta.siteName,
    url: absolute(localizedPath(locale)),
    inLanguage: locale,
    publisher: { "@id": organizationId },
  };
}

// Път до страницата (начало > текуща страница) за резултатите в търсачките.
export function breadcrumbJsonLd(locale: Locale, dictionary: Dictionary, key: SitePageKey) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dictionary.nav.home,
        item: absolute(localizedPath(locale)),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dictionary.nav[key],
        item: absolute(localizedPath(locale, pagePath(key))),
      },
    ],
  };
}
