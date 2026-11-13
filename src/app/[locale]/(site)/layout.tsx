import { getT } from "@/i18n/server";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { PaletteSwitcher } from "@/components/theme/PaletteSwitcher";

// Рамката на публичния сайт: шапка, съдържание, футър и данните за фирмата за търсачките.
export default async function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  const { t } = await getT("common");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        {t("nav.skipToContent")}
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <PaletteSwitcher
        label={t("nav.palette.label")}
        names={{
          emerald: t("nav.palette.emerald"),
          turquoise: t("nav.palette.turquoise"),
          violet: t("nav.palette.violet"),
          orange: t("nav.palette.orange"),
          multicolor: t("nav.palette.multicolor"),
        }}
      />
      <JsonLd data={await organizationJsonLd()} />
      <JsonLd data={await websiteJsonLd()} />
    </>
  );
}
