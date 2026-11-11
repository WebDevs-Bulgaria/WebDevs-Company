import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { isServiceId } from "@/lib/services";

// Адрес на страница на услуга: /bg/services/<id>.
const servicePage = new RegExp(`^/(${locales.join("|")})/services/([^/]+)/?$`);

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
  if (hasLocalePrefix) {
    // Страница на несъществуваща услуга. Самата страница вика notFound(), но тя е частично
    // предварително генерирана и отговорът тръгва със статус 200, преди да се стигне дотам.
    // Затова адресът се пренаписва още тук към несъществуващ път → истински 404.
    const service = pathname.match(servicePage);
    if (service && !isServiceId(service[2])) {
      return NextResponse.rewrite(new URL(`/${service[1]}/services/${service[2]}/not-found`, request.url));
    }
    return;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Пропускат се вътрешните адреси на Next.js, API и всеки файл с разширение
  // (sitemap.xml, robots.txt, икони, картинки).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
