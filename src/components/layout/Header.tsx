import Link from "next/link";
import { Suspense } from "react";
import { localizedPath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { company } from "@/lib/company";
import { navPages, pagePath } from "@/lib/site";
import { PaletteSwitcher } from "@/components/theme/PaletteSwitcher";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export async function Header() {
  const locale = await getLocale();
  const { t } = await getT("common");

  const contact = {
    href: localizedPath(locale, pagePath("contact")),
    label: t("actions.contactCta"),
  };
  // „Контакт“ е бутонът вдясно, затова не се повтаря като връзка в навигацията.
  // „Цени“ не е отделна страница, а секция на началната (#prices); стои веднага след „Услуги“.
  const links = navPages
    .filter((page) => page.key !== "contact")
    .flatMap((page) => {
      const link = { href: localizedPath(locale, page.path), label: t("nav")[page.key] };
      return page.key === "services"
        ? [link, { href: `${localizedPath(locale)}#prices`, label: t("nav.prices") }]
        : [link];
    });

  const palette = {
    label: t("nav.palette.label"),
    names: {
      emerald: t("nav.palette.emerald"),
      turquoise: t("nav.palette.turquoise"),
      violet: t("nav.palette.violet"),
      orange: t("nav.palette.orange"),
      multicolor: t("nav.palette.multicolor"),
    },
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      {/* Три колони: логото и бутоните са в еднакво широки странични колони, а навигацията е
          в средата. Така дължината на надписите на различните езици не мести нищо. */}
      <Container className="relative flex h-18 items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href={localizedPath(locale)}
          className="flex items-center gap-3 font-display text-lg font-extrabold tracking-tight text-ink"
        >
          {/* Временен знак до готовото лого. */}
          <span
            aria-hidden="true"
            className="brand-gradient inline-flex h-9 w-9 items-center justify-center rounded-sm font-mono text-xs font-bold text-white"
          >
            WD
          </span>
          {/* На тесен екран остава само знакът, за да има място за бутоните вдясно. */}
          <span className="sr-only sm:not-sr-only">{company.brandName}</span>
        </Link>

        <nav aria-label={t("nav.mainLabel")} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-semibold xl:gap-9">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative inline-flex min-h-10 items-center text-ink-muted transition-colors after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-ink hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Suspense fallback={null}>
            <LanguageSwitcher current={locale} label={t("nav.languageLabel")} />
          </Suspense>
          <ThemeToggle label={t("nav.themeToggle")} />
          {/* Палитрата: на широк екран е кръгче тук, на тесен — ред в мобилното меню. */}
          <div className="hidden lg:block">
            <PaletteSwitcher variant="popover" {...palette} />
          </div>
          {/* Постоянна ширина: надписът е с различна дължина на двата езика. */}
          <Link
            href={contact.href}
            className="brand-gradient group hidden h-10 w-56 items-center justify-between gap-2 whitespace-nowrap rounded-full pl-5 pr-1.5 text-sm font-bold text-white shadow-card transition duration-300 hover:shadow-float lg:inline-flex"
          >
            {contact.label}
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-(--brand-from) transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </Link>
          <MobileMenu
            extra={<PaletteSwitcher variant="inline" {...palette} />}
            links={links}
            cta={contact}
            labels={{
              open: t("nav.openMenu"),
              close: t("nav.closeMenu"),
              navigation: t("nav.mainLabel"),
            }}
          />
        </div>
      </Container>
    </header>
  );
}
