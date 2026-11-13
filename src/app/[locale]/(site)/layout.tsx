import { localizedPath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/json-ld";
import { pagePath } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { AssistantOrb } from "@/components/assistant/AssistantOrb";

// Рамката на публичния сайт: шапка, съдържание, футър и данните за фирмата за търсачките.
export default async function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
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
      {/* Изборът на палитра е в шапката (Header.tsx); долният десен ъгъл е за AI асистента. */}
      <AssistantOrb labels={t("assistant")} contactHref={localizedPath(locale, pagePath("contact"))} />
      <JsonLd data={await organizationJsonLd()} />
      <JsonLd data={await websiteJsonLd()} />
    </>
  );
}
