import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

// Избира език по заглавката Accept-Language; ако няма съвпадение — езикът по подразбиране.
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const requested = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return { language: tag.toLowerCase().split("-")[0], quality: quality ? Number(quality) : 1 };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { language } of requested) {
    const match = locales.find((locale) => locale === language);
    if (match) return match;
  }
  return defaultLocale;
}

// Адрес без езиков префикс се пренасочва към същия адрес с префикс: / -> /bg.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Пропускат се вътрешните адреси на Next.js, API и всеки файл с разширение
  // (sitemap.xml, robots.txt, икони, картинки).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
