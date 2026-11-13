"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { locales, type Locale } from "@/i18n/config";

const names: Record<Locale, string> = { bg: "BG", en: "EN" };
const localePrefix = new RegExp(`^/(${locales.join("|")})(?=/|$)`);

// Вдигнат е от натискането на езика до първото рисуване на новата страница. Стои извън
// компонента, защото при смяна на езика цялото дърво се монтира наново.
let switchingLanguage = false;
// Адресът, за който е сложен атрибутът. Сравнението по адрес (а не само флагът) пази атрибута
// при разработка, където Strict Mode изпълнява ефекта два пъти.
let markedPathname: string | undefined;

// Маркира <html>, за да не се повтарят анимациите при появяване (.rise-in в globals.css).
function markLanguageSwitch() {
  document.documentElement.dataset.langSwitch = "true";
}

/*
 * Превключвател на езика във вид на хапче с еднакво широки половини; активният език
 * е оцветен. Запазва текущата страница: /bg/services <-> /en/services.
 * Ширината му е постоянна, за да не мести съседните елементи при смяна на езика.
 *
 * Езикът е параметър на root layout-а, затова при смяната му React монтира страницата наново и
 * анимациите при появяване тръгват пак — съдържанието изчезва за миг и „присветва“. При смяна
 * на езика те се изключват с атрибута data-lang-switch: слага се при натискането и отново,
 * когато новият език е на екрана (в случай че React е изтрил атрибутите на <html>). Маха се
 * чак при преминаване към друга страница — махне ли се по-рано, анимацията тръгва в този миг.
 */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(localePrefix, "");

  useLayoutEffect(() => {
    if (switchingLanguage) {
      switchingLanguage = false;
      markedPathname = pathname;
      markLanguageSwitch();
    } else if (pathname !== markedPathname) {
      // Преминаване към друга страница: там появяването пак е включено.
      delete document.documentElement.dataset.langSwitch;
    }
  }, [pathname]);

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
                onClick={() => {
                  if (active) return;
                  switchingLanguage = true;
                  markLanguageSwitch();
                }}
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
