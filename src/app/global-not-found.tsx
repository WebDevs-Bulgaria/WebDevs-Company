import type { Metadata } from "next";
import Link from "next/link";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { company } from "@/lib/company";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { fontVariables } from "./fonts";
import "./globals.css";

/*
 * Страница 404 за адрес, който не съвпада с нито един маршрут.
 * Next.js я връща, без да минава през layout-ите, затова тя не знае езика от
 * адреса и показва съобщението на всички езици. Сама зарежда стиловете и шрифта.
 */

export const metadata: Metadata = {
  title: `404 | ${company.brandName}`,
  robots: { index: false, follow: false },
};

export default async function GlobalNotFound() {
  const messages = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      text: (await getDictionary(locale)).notFound,
    })),
  );

  return (
    <html
      lang="bg"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeScript />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <p className="font-mono text-sm text-accent">404 · {company.brandName}</p>
          <div className="mt-8 grid gap-12 md:grid-cols-2">
            {messages.map(({ locale, text }) => (
              <section key={locale} lang={locale}>
                <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {text.title}
                </h1>
                <p className="mt-4 text-base leading-7 text-ink-muted">{text.text}</p>
                <Link
                  href={`/${locale}`}
                  className="mt-8 inline-flex min-h-11 items-center justify-center brand-gradient rounded-sm px-6 text-sm font-bold text-white"
                >
                  {text.back}
                </Link>
              </section>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
