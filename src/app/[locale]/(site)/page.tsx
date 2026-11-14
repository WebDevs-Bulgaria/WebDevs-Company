import Link from "next/link";
import type { CSSProperties } from "react";
import { localizedPath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { serviceGroups } from "@/lib/content";
import { servicePath } from "@/lib/services";
import { pagePath } from "@/lib/site";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { BrandMark, type BrandMarkKind } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Marker } from "@/components/ui/Marker";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionVisual } from "@/components/visuals/SectionVisual";
import { NodeGraph } from "@/components/visuals/NodeGraph";
import { RibbonField } from "@/components/visuals/RibbonField";
import { WireSphere } from "@/components/visuals/WireSphere";

export function generateMetadata() {
  return buildPageMetadata("home");
}

// Закъснение за плавното появяване при зареждане (клас .rise-in в globals.css).
const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

// Видът на двете половини на секцията с дейностите. Съдържанието на лявата се подравнява
// вдясно към средата, на дясната — вляво, така че да следва ширината на сайта.
const tones = {
  light: {
    half: "border-b border-line bg-canvas lg:border-b-0 lg:border-r",
    veil: "bg-linear-to-b from-canvas via-canvas/70 to-canvas/0",
    align: "lg:ml-auto lg:pr-14",
    label: "text-accent",
    title: "text-ink group-hover:text-accent",
    text: "text-ink-muted",
    cta: "text-ink",
    arrow: "border-ink/25 text-ink",
  },
  night: {
    half: "bg-night",
    veil: "bg-linear-to-b from-night via-night/70 to-night/0",
    align: "lg:mr-auto lg:pl-14",
    label: "text-night-accent",
    title: "text-night-ink group-hover:text-night-accent",
    text: "text-night-muted",
    cta: "text-night-ink",
    arrow: "border-night-line text-night-ink",
  },
} as const;

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`h-4 w-4 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/*
 * Началната страница е кратък вход към сайта: какво правим в две изречения, трите
 * направления (сайтове, приложения, AI), трите линии с ориентировъчни цени, какво получава
 * клиентът и връзки към страниците с подробностите. Нарочно НЕ съдържа списъци с услуги,
 * процеса и описания на технологиите — те са в „Услуги“ и „Решения“. Преди да добавите
 * секция тук, проверете дали мястото ѝ не е там.
 */
export default async function HomePage() {
  const locale = await getLocale();
  const { t } = await getT("common");
  const { t: tHome } = await getT("home");
  const { t: tServices } = await getT("services");

  const servicesHref = localizedPath(locale, pagePath("services"));
  const solutionsHref = localizedPath(locale, pagePath("projects"));

  const activities = [
    {
      key: "websites",
      tone: "light",
      number: "02",
      href: `${servicesHref}#websites`,
      text: tHome("websites"),
      mark: "globe",
      visual: <RibbonField className="absolute inset-0 h-full w-full" />,
    },
    {
      key: "applications",
      tone: "night",
      number: "03",
      href: `${servicesHref}#applications`,
      text: tHome("applications"),
      mark: "code",
      visual: <NodeGraph className="absolute inset-0 h-full w-full" />,
    },
  ] as const;

  // Накъде води всяка от трите линии с цени (ключът е id от home.json → packages.items).
  const packageLinks: Record<string, string> = {
    "quick-start": localizedPath(locale, servicePath("wordpress-websites")),
    custom: servicesHref,
    ai: `${servicesHref}#ai`,
  };
  const packages = tHome("packages");
  const audience = tHome("audience");
  const faq = tHome("faq");
  // Накъде води всяка ситуация от „За кого е“ (ключът е id от home.json → audience.items).
  const audienceLinks: Record<string, string> = {
    start: localizedPath(locale, servicePath("wordpress-websites")),
    site: localizedPath(locale, servicePath("corporate-websites")),
    manual: localizedPath(locale, servicePath("ai-automation")),
    ai: `${servicesHref}#ai`,
  };
  // Знак на марката за всяка ситуация (същият ключ; кои са знаците — вж. BrandIcons.tsx).
  const audienceIcons: Record<string, BrandMarkKind> = {
    start: "chevrons",
    site: "wdot",
    manual: "network",
    ai: "orb",
  };
  const ai = tHome("ai");

  const quickLinks = [
    { href: solutionsHref, ...tHome("explore.solutions") },
    { href: `${solutionsHref}#technology`, ...tHome("explore.technology") },
    { href: localizedPath(locale, pagePath("about")), ...tHome("explore.about") },
  ];

  return (
    <>
      {/* Горна част: едро заглавие, светлинни ленти и въртящ се глобус от линии */}
      <section className="relative overflow-hidden border-b border-line">
        <RibbonField className="absolute inset-0 h-full w-full opacity-60" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-canvas via-canvas/60 to-canvas/0"
        />
        <Container className="relative grid items-center gap-x-8 gap-y-4 pb-16 pt-9 sm:pb-24 sm:pt-12 lg:grid-cols-[1.2fr_0.8fr] lg:pb-20 lg:pt-14">
          <div>
            {/* Трите направления като бързи връзки към своите групи в „Услуги“. Имената идват от
                services.json → groups, в реда на serviceGroups — нова група се появява тук сама. */}
            <nav
              aria-label={t("actions.viewServices")}
              className="rise-in font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent"
              style={delay(0)}
            >
              <ul className="flex flex-wrap items-center gap-x-3">
                <li aria-hidden="true" className="flex">
                  <Marker />
                </li>
                {serviceGroups.map((group, index) => (
                  <li key={group} className="flex items-center gap-3">
                    {index > 0 ? <span aria-hidden="true">·</span> : null}
                    <Link
                      href={`${servicesHref}#${group}`}
                      className="relative inline-flex min-h-9 items-center transition-colors after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-ink hover:after:scale-x-100"
                    >
                      {tServices("groups")[group].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <h1
              className="rise-in mt-5 text-5xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-7xl xl:text-8xl"
              style={delay(0.1)}
            >
              {tHome("hero.titleStart")}{" "}
              <span className="text-brand-gradient">{tHome("hero.titleAccent")}</span>{" "}
              {tHome("hero.titleEnd")}
            </h1>
            <p
              className="rise-in mt-8 max-w-xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8"
              style={delay(0.25)}
            >
              {tHome("hero.lead")}
            </p>
            <div className="rise-in mt-10 flex flex-wrap gap-4" style={delay(0.4)}>
              <ButtonLink href={localizedPath(locale, pagePath("contact"))}>{t("actions.contactCta")}</ButtonLink>
              <ButtonLink href={servicesHref} variant="secondary">
                {t("actions.viewServices")}
              </ButtonLink>
            </div>
          </div>

          <div className="rise-in mx-auto w-full max-w-sm lg:max-w-none" style={delay(0.3)}>
            <WireSphere className="h-auto w-full" />
          </div>
        </Container>
      </section>

      <TechMarquee label={tHome("strip.label")} items={tHome("strip.items")} />

      {/* Първото направление — AI и автоматизация: лента с цвета на марката по цялата ширина,
          веднага под лентата с надписите. Цялата лента е връзка към групата в „Услуги“.
          Потъмняването вдясно пази контраста на белия текст върху светлия край на градиента. */}
      <Link href={`${servicesHref}#ai`} className="brand-gradient group relative block overflow-hidden">
        <NodeGraph className="absolute inset-y-0 right-0 h-full w-full opacity-25 mix-blend-screen lg:w-2/3" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-black/0 to-black/30" />
        <Container className="relative grid items-end gap-x-16 gap-y-8 py-14 sm:py-20 lg:grid-cols-[1.25fr_1fr]">
          <div>
            {/* Знакът „мрежа“ над надписа на лентата за AI (проба от 13.11.2026). */}
            <BrandMark kind="network" id="home-ai-mark" className="mb-6 h-12 w-12" />
            <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <Marker />
              01. {ai.eyebrow}
            </p>
            <h2 className="mt-6 text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl">
              {ai.title}
            </h2>
          </div>
          <div>
            <p className="text-base leading-7 text-white sm:text-lg sm:leading-8">{ai.short}</p>
            <p className="mt-8 flex items-center gap-5 text-sm font-bold tracking-wide text-white">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-(--brand-from)">
                <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
              {ai.cta}
            </p>
          </div>
        </Container>
      </Link>

      {/* Другите две направления: една секция на цялата ширина, разделена на светла и тъмна половина.
          Без кутии — половините опират в краищата на екрана и една в друга, а текстът им е
          подравнен с останалото съдържание. Всяка половина е връзка към своята част от „Услуги“. */}
      <section aria-label={t("actions.viewServices")} className="grid lg:grid-cols-2">
        {activities.map((activity) => {
          const tone = tones[activity.tone];
          return (
            <Link
              key={activity.key}
              href={activity.href}
              className={`group relative flex overflow-hidden ${tone.half}`}
            >
              {/* Образът заема долната част и се усилва при посочване */}
              <div className="absolute inset-x-0 bottom-0 top-1/3 opacity-55 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100">
                {activity.visual}
              </div>
              <div aria-hidden="true" className={`absolute inset-0 ${tone.veil}`} />

              <div
                className={`relative flex min-h-[24rem] w-full flex-col px-4 py-12 sm:min-h-[30rem] sm:px-6 sm:py-20 lg:max-w-[36rem] lg:px-8 ${tone.align}`}
              >
                {/* Иконка на направлението, както знакът „мрежа“ на лентата за AI. */}
                <BrandMark kind={activity.mark} id={`home-${activity.key}-mark`} className="mb-6 h-12 w-12" />
                <p
                  className={`flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] ${tone.label}`}
                >
                  <Marker />
                  {activity.number}. {activity.text.eyebrow}
                </p>
                <h2
                  className={`mt-6 text-4xl font-extrabold leading-[1.03] tracking-tight transition-colors duration-300 sm:text-6xl ${tone.title}`}
                >
                  {activity.text.title}
                </h2>
                <p className={`mt-6 max-w-md flex-1 text-base leading-7 sm:text-lg sm:leading-8 ${tone.text}`}>
                  {activity.text.short}
                </p>
                <p className={`mt-10 flex items-center gap-5 text-sm font-bold tracking-wide ${tone.cta}`}>
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full border transition duration-300 group-hover:scale-110 group-hover:border-(--brand-from) group-hover:bg-(--brand-from) group-hover:text-white ${tone.arrow}`}
                  >
                    <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                  {activity.text.cta}
                </p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* За кого е: четири разпознаваеми ситуации, всяка води към подходящата услуга.
          Една колона на телефон, две на таблет, четири на широк екран. */}
      <section aria-labelledby="home-audience" className="border-b border-line bg-surface">
        <Container className="py-14 sm:py-20">
          {/* Вдясно от заглавието: образът към секцията (SectionVisual.tsx). На тесен екран отива под него. */}
          <div className="grid items-end gap-x-16 gap-y-10 lg:grid-cols-[1fr_22rem]">
            <SectionHeading id="home-audience" eyebrow={audience.eyebrow} title={audience.title} lead={audience.lead} />
            <SectionVisual slot="audience" className="w-full max-w-sm" />
          </div>
          <ul className="hue-cycle mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {audience.items.map((item, index) => (
              <li
                key={item.id}
                className="border-b border-line sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                {/* prefetch: повечето от тези връзки водят към страница на услуга (вж. ServiceRows.tsx). */}
                <Link
                  prefetch
                  href={audienceLinks[item.id] ?? servicesHref}
                  className="group flex h-full flex-col py-8 transition-colors duration-300 hover:bg-surface-raised sm:px-6 lg:px-7"
                >
                  <span aria-hidden="true" className="flex items-center justify-between font-mono text-xs font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                    {audienceIcons[item.id] ? (
                      <BrandMark kind={audienceIcons[item.id]} id={`audience-${item.id}-mark`} className="h-10 w-10" />
                    ) : null}
                  </span>
                  <span className="mt-4 block font-display text-2xl font-extrabold leading-tight tracking-tight text-ink transition-colors duration-200 group-hover:text-accent">
                    {item.title}
                  </span>
                  <span className="mt-4 block flex-1 text-sm leading-6 text-ink-muted">{item.text}</span>
                  <span className="mt-6 flex items-center gap-3 text-sm font-bold tracking-wide text-ink">
                    {item.cta}
                    <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Трите линии с ориентировъчни цени. Колони, разделени с линии (без кутии); средната е
          водещата и е отбелязана с надпис. Всяка колона води към своята част от „Услуги“. */}
      <section id="prices" aria-labelledby="home-packages" className="scroll-mt-20">
        <Container className="py-14 sm:py-20">
          <SectionHeading id="home-packages" eyebrow={packages.eyebrow} title={packages.title} lead={packages.lead} />
          <ul className="hue-cycle mt-14 grid border-t-2 border-ink lg:grid-cols-3">
            {packages.items.map((item) => {
              const featured = item.id === "custom";
              return (
                <li
                  key={item.id}
                  className={`relative flex flex-col border-b border-line py-10 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 ${featured ? "lg:bg-surface" : ""}`}
                >
                  {featured ? (
                    <span aria-hidden="true" className="brand-gradient absolute inset-x-0 -top-0.5 h-1" />
                  ) : null}
                  <p className="flex min-h-6 flex-wrap items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                    {item.name}
                    {featured ? (
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] tracking-[0.12em] text-accent">
                        {packages.badge}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-brand-gradient mt-5 font-display text-5xl font-extrabold leading-tight tracking-tight">
                    {item.price}
                  </p>
                  <p className="mt-5 text-base leading-7 text-ink-muted">{item.text}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6 text-ink">
                        <span aria-hidden="true" className="brand-gradient mt-2 h-2 w-2 shrink-0 rotate-45" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    prefetch
                    href={packageLinks[item.id] ?? servicesHref}
                    className="group mt-8 inline-flex min-h-11 items-center gap-3 text-sm font-bold tracking-wide text-ink transition-colors duration-200 hover:text-accent"
                  >
                    {item.cta}
                    <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 grid gap-x-16 gap-y-6 lg:grid-cols-[1fr_1.4fr]">
            <p className="text-sm leading-6 text-ink-muted">{packages.note}</p>
            <div>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                {packages.raisesTitle}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {packages.raises.map((item) => (
                  <li key={item} className="border border-line px-3 py-1.5 text-sm text-ink-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Често задавани въпроси: <details>, без JavaScript — отварят се и с клавиатура.
          Същите въпроси отиват и като структурирани данни (FAQPage). */}
      <section id="faq" aria-labelledby="home-faq" className="scroll-mt-20 border-t border-line">
        <Container className="grid gap-x-16 gap-y-10 py-14 sm:py-20 lg:grid-cols-[22rem_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading id="home-faq" eyebrow={faq.eyebrow} title={faq.title} lead={faq.lead} />
          </div>
          <div className="border-b border-line">
            {faq.items.map((item) => (
              <details key={item.question} className="group border-t border-line">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-extrabold tracking-tight text-ink transition-colors duration-200 hover:text-accent sm:text-xl [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M8 3v10M3 8h10" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-base leading-7 text-ink-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      {/* Какво получава клиентът */}
      <section aria-labelledby="home-commitments" className="dot-grid border-y border-line bg-surface">
        <Container className="py-14 sm:py-20">
          <SectionHeading
            id="home-commitments"
            eyebrow={t("commitments.eyebrow")}
            title={t("commitments.title")}
            lead={t("commitments.lead")}
          />
          <dl className="hue-cycle mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t("commitments.items").map((item) => (
              <div
                key={item.label}
                className="reveal group relative flex flex-col-reverse justify-end overflow-hidden border border-line bg-surface-raised p-7 transition duration-300 hover:-translate-y-1 hover:shadow-float"
              >
                <span
                  aria-hidden="true"
                  className="brand-gradient absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                />
                <dd className="mt-5 text-sm leading-6 text-ink-muted">{item.text}</dd>
                <dt>
                  <span className="text-brand-gradient block font-display text-4xl font-extrabold leading-tight tracking-tight">
                    {item.value}
                  </span>
                  <span className="mt-2 block font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink">
                    {item.label}
                  </span>
                </dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Бързи връзки към останалото */}
      <section aria-label={tHome("explore.label")}>
        <Container className="py-12 sm:py-20">
          <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <Marker />
            {tHome("explore.label")}
          </p>
          <ul className="hue-cycle mt-8 grid border-t border-line md:grid-cols-3">
            {quickLinks.map((item) => (
              <li
                key={item.href}
                className="border-b border-line md:border-l md:first:border-l-0"
              >
                <Link
                  href={item.href}
                  className="group flex h-full items-start justify-between gap-4 py-8 transition-colors duration-300 hover:bg-surface md:px-7"
                >
                  <span>
                    <span className="block font-display text-2xl font-extrabold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                      {item.title}
                    </span>
                    <span className="mt-3 block text-sm leading-6 text-ink-muted">{item.text}</span>
                  </span>
                  <Arrow className="mt-2 -rotate-45 text-ink-muted transition duration-300 group-hover:rotate-0 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
