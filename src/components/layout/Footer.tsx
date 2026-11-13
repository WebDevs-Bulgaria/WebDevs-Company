import Link from "next/link";
import type { CSSProperties } from "react";
import { localizedPath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { company } from "@/lib/company";
import { sitePages } from "@/lib/site";
import { Container } from "@/components/ui/Container";

const linkClass = "inline-flex min-h-8 items-center text-night-muted transition-colors hover:text-night-ink";
const titleClass = "font-mono text-xs font-semibold uppercase tracking-[0.18em] text-night-accent";

export async function Footer() {
  const locale = await getLocale();
  const { t } = await getT("common");
  const links = sitePages.filter((page) => page.key !== "home");

  return (
    <footer className="overflow-hidden bg-night text-night-ink">
      <Container className="grid gap-12 pb-12 pt-14 sm:pt-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="max-w-xs font-display text-2xl font-extrabold leading-tight tracking-tight">
            {t("footer.tagline")}
          </p>
        </div>

        <nav aria-label={t("nav.footerLabel")}>
          <h2 className={titleClass}>{t("footer.navTitle")}</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {links.map((page) => (
              <li key={page.key}>
                <Link href={localizedPath(locale, page.path)} className={linkClass}>
                  {t("nav")[page.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={titleClass}>{t("footer.contactTitle")}</h2>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <a href={`tel:${company.phone.international}`} className={linkClass}>
                {company.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className={`${linkClass} break-all`}>
                {company.email}
              </a>
            </li>
            <li className="flex min-h-8 items-center text-night-muted">
              {company.address.locality[locale]}, {company.address.country[locale]}
            </li>
          </ul>
        </div>

        <div>
          <h2 className={titleClass}>{t("footer.companyTitle")}</h2>
          <ul className="mt-4 space-y-2 text-sm text-night-muted">
            <li>{company.legalName[locale]}</li>
            <li>
              {t("footer.registrationLabel")}: {company.registrationNumber}
            </li>
          </ul>
        </div>
      </Container>

      {/* Едър контурен надпис с името — декоративен; името вече е в шапката.
          11.8vw е най-големият размер, при който цялото име се побира на всяка ширина. */}
      <p
        aria-hidden="true"
        className="outline-text select-none whitespace-nowrap pb-6 text-center font-display text-[11.8vw] font-extrabold leading-none tracking-tighter"
        // Контурът е смес от акцента и линията на тъмните ленти: само с линията надписът не се виждаше.
        style={{ "--outline-color": "color-mix(in srgb, var(--color-night-accent) 45%, var(--color-night-line))" } as CSSProperties}
      >
        {company.brandName}
      </p>

      <div className="border-t border-night-line">
        <Container className="py-6 text-sm text-night-muted">
          © {company.legalName[locale]}. {t("footer.rights")}
        </Container>
      </div>
    </footer>
  );
}
