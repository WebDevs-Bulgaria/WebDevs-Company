import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { PaletteSwitcher } from "@/components/theme/PaletteSwitcher";

// Рамката на публичния сайт: шапка, съдържание, футър и данните за фирмата за търсачките.
export default async function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        {dictionary.nav.skipToContent}
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <PaletteSwitcher
        label={dictionary.nav.palette.label}
        names={{
          emerald: dictionary.nav.palette.emerald,
          turquoise: dictionary.nav.palette.turquoise,
          violet: dictionary.nav.palette.violet,
        }}
      />
      <JsonLd data={organizationJsonLd(locale, dictionary)} />
      <JsonLd data={websiteJsonLd(locale, dictionary)} />
    </>
  );
}
