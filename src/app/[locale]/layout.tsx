import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/i18n/config";
import { company } from "@/lib/company";
import { isIndexable, siteUrl } from "@/lib/site";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { fontVariables } from "../fonts";
import "../globals.css";
import { defaultPalette } from "@/components/theme/palettes";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: company.brandName,
    template: `%s | ${company.brandName}`,
  },
  applicationName: company.brandName,
  // Докато сайтът не е публикуван на истинския домейн, не се индексира.
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a100d" },
  ],
  colorScheme: "light dark",
};

// Всички езици се генерират статично при build.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    // data-theme се презаписва от ThemeScript преди първото рисуване; затова suppressHydrationWarning.
    <html
      lang={locale}
      data-theme="light"
      data-palette={defaultPalette}
      // Плавният скрол (scroll-behavior: smooth в globals.css) се изключва от Next.js при смяна на страница.
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
