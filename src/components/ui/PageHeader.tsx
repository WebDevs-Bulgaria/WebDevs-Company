import Link from "next/link";
import { localizedPath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { pagePath, type SitePageKey } from "@/lib/site";
import { RibbonField } from "@/components/visuals/RibbonField";
import { Container } from "./Container";
import { Marker } from "./Marker";

// Горната част на вътрешна страница: път до страницата, едро заглавие (h1) и въведение
// върху светлинните ленти. При подстраница (страницата на една услуга) се подава current —
// тогава пътят е от три нива и средното („Услуги“) е връзка към основната страница.
export async function PageHeader({
  pageKey,
  title,
  lead,
  current,
}: {
  pageKey: SitePageKey;
  title: string;
  lead?: string;
  // Името на подстраницата като последно ниво на пътя.
  current?: string;
}) {
  const locale = await getLocale();
  const { t } = await getT("common");

  return (
    <section className="relative overflow-hidden border-b border-line">
      <RibbonField className="absolute inset-0 h-full w-full" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-canvas via-canvas/50 to-canvas/0" />
      {/* Отгоре е по-малко, отколкото отдолу: пътят стои близо до шапката, както на началната. */}
      <Container className="relative pb-12 pt-9 sm:pb-20 sm:pt-12 lg:pt-14">
        <nav
          aria-label={t("nav.breadcrumbLabel")}
          className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted lg:text-[15px]"
        >
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <li>
              <Link href={localizedPath(locale)} className="hover:text-accent">
                {t("nav.home")}
              </Link>
            </li>
            <li aria-hidden="true" className="flex text-ink-muted/60">
              <Marker single />
            </li>
            {current ? (
              <>
                <li>
                  <Link href={localizedPath(locale, pagePath(pageKey))} className="hover:text-accent">
                    {t("nav")[pageKey]}
                  </Link>
                </li>
                <li aria-hidden="true" className="flex text-ink-muted/60">
                  <Marker single />
                </li>
                <li aria-current="page" className="text-accent">
                  {current}
                </li>
              </>
            ) : (
              <li aria-current="page" className="text-accent">
                {t("nav")[pageKey]}
              </li>
            )}
          </ol>
        </nav>
        {/* На телефон размерът следва ширината на екрана (clamp): дълга дума като „поверителност“ иначе
            излизаше извън екрана и се режеше. overflow-wrap е предпазна мрежа за още по-дълги думи. */}
        <h1 className="mt-5 max-w-4xl text-[clamp(2rem,10.5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-ink [overflow-wrap:anywhere] sm:text-7xl sm:leading-[1] lg:text-8xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-8 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">{lead}</p>
        ) : null}
      </Container>
    </section>
  );
}
