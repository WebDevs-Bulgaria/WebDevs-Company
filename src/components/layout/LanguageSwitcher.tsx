"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

const names: Record<Locale, string> = { bg: "BG", en: "EN" };
const localePrefix = new RegExp(`^/(${locales.join("|")})(?=/|$)`);

/*
 * Превключвател на езика във вид на хапче с еднакво широки половини; активният език
 * е оцветен. Запазва текущата страница: /bg/services <-> /en/services.
 * Ширината му е постоянна, за да не мести съседните елементи при смяна на езика.
 */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(localePrefix, "");

  return (
    <nav aria-label={label} className="shrink-0">
      <ul className="flex h-10 items-center rounded-full border border-line bg-surface p-1 font-mono text-xs font-bold">
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <Link
                href={`/${locale}${rest}`}
                hrefLang={locale}
                lang={locale}
                aria-current={active ? "true" : undefined}
                className={`flex h-[1.875rem] w-10 items-center justify-center rounded-full transition-colors duration-300 ${
                  active ? "brand-gradient text-white shadow-card" : "text-ink-muted hover:text-ink"
                }`}
              >
                {names[locale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
