import Link from "next/link";
import { localizedPath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import type { SitePageKey } from "@/lib/site";
import { RibbonField } from "@/components/visuals/RibbonField";
import { Container } from "./Container";

// Горната част на вътрешна страница: път до страницата, едро заглавие (h1) и въведение
// върху светлинните ленти.
export async function PageHeader({
  pageKey,
  title,
  lead,
}: {
  pageKey: SitePageKey;
  title: string;
  lead?: string;
}) {
  const locale = await getLocale();
  const { t } = await getT("common");

  return (
    <section className="relative overflow-hidden border-b border-line">
      <RibbonField className="absolute inset-0 h-full w-full" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-canvas via-canvas/50 to-canvas/0" />
      <Container className="relative py-20 sm:py-28">
        <nav
          aria-label={t("nav.breadcrumbLabel")}
          className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted"
        >
          <ol className="flex flex-wrap items-center gap-3">
            <li>
              <Link href={localizedPath(locale)} className="hover:text-accent">
                {t("nav.home")}
              </Link>
            </li>
            <li aria-hidden="true" className="h-px w-8 bg-line" />
            <li aria-current="page" className="text-accent">
              {t("nav")[pageKey]}
            </li>
          </ol>
        </nav>
        <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-[1] tracking-tight text-ink sm:text-7xl lg:text-8xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-8 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">{lead}</p>
        ) : null}
      </Container>
    </section>
  );
}
