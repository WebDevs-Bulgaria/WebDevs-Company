import Link from "next/link";
import type { CSSProperties } from "react";
import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { pagePath } from "@/lib/site";
import { CtaBand } from "@/components/sections/CtaBand";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    rule: "bg-accent",
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
    rule: "bg-night-accent",
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
 * Началната страница е кратък вход към сайта: какво правим в две изречения, какво
 * получава клиентът и връзки към страниците с подробностите. Нарочно НЕ съдържа
 * списъци с услуги, процеса и описания на технологиите — те са в „Услуги“ и
 * „Решения“. Преди да добавите секция тук, проверете дали мястото ѝ не е там.
 */
export default async function HomePage() {
  const locale = await getLocale();
  const { home, common } = await getDictionary(locale);

  const servicesHref = localizedPath(locale, pagePath("services"));
  const solutionsHref = localizedPath(locale, pagePath("projects"));

  const activities = [
    {
      key: "websites",
      tone: "light",
      number: "01",
      href: `${servicesHref}#websites`,
      text: home.websites,
      visual: <RibbonField className="absolute inset-0 h-full w-full" />,
    },
    {
      key: "applications",
      tone: "night",
      number: "02",
      href: `${servicesHref}#applications`,
      text: home.applications,
      visual: <NodeGraph className="absolute inset-0 h-full w-full" />,
    },
  ] as const;

  const quickLinks = [
    { href: solutionsHref, ...home.explore.solutions },
    { href: `${solutionsHref}#technology`, ...home.explore.technology },
    { href: localizedPath(locale, pagePath("about")), ...home.explore.about },
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
        <Container className="relative grid items-center gap-x-8 gap-y-4 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
          <div>
            <p
              className="rise-in flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent"
              style={delay(0)}
            >
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              {home.hero.eyebrow}
            </p>
            <h1
              className="rise-in mt-8 text-5xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-7xl xl:text-8xl"
              style={delay(0.1)}
            >
              {home.hero.titleStart}{" "}
              <span className="text-brand-gradient">{home.hero.titleAccent}</span>{" "}
              {home.hero.titleEnd}
            </h1>
            <p
              className="rise-in mt-8 max-w-xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8"
              style={delay(0.25)}
            >
              {home.hero.lead}
            </p>
            <div className="rise-in mt-10 flex flex-wrap gap-4" style={delay(0.4)}>
              <ButtonLink href={localizedPath(locale, pagePath("contact"))}>{common.contactCta}</ButtonLink>
              <ButtonLink href={servicesHref} variant="secondary">
                {common.viewServices}
              </ButtonLink>
            </div>
          </div>

          <div className="rise-in mx-auto w-full max-w-sm lg:max-w-none" style={delay(0.3)}>
            <WireSphere className="h-auto w-full" />
          </div>
        </Container>
      </section>

      <TechMarquee label={home.strip.label} items={home.strip.items} />

      {/* Двете дейности: една секция на цялата ширина, разделена на светла и тъмна половина.
          Без кутии — половините опират в краищата на екрана и една в друга, а текстът им е
          подравнен с останалото съдържание. Всяка половина е връзка към своята част от „Услуги“. */}
      <section aria-label={common.viewServices} className="grid lg:grid-cols-2">
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
                className={`relative flex min-h-[30rem] w-full flex-col px-4 py-16 sm:px-6 sm:py-20 lg:max-w-[36rem] lg:px-8 ${tone.align}`}
              >
                <p
                  className={`flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] ${tone.label}`}
                >
                  <span aria-hidden="true" className={`h-px w-10 ${tone.rule}`} />
                  {activity.number} — {activity.text.eyebrow}
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

      {/* Какво получава клиентът */}
      <section aria-labelledby="home-commitments" className="dot-grid border-y border-line bg-surface">
        <Container className="py-20 sm:py-28">
          <SectionHeading
            id="home-commitments"
            eyebrow={home.commitments.eyebrow}
            title={home.commitments.title}
            lead={home.commitments.lead}
          />
          <dl className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {home.commitments.items.map((item) => (
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
      <section aria-label={home.explore.label}>
        <Container className="py-16 sm:py-20">
          <p className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-10 bg-accent" />
            {home.explore.label}
          </p>
          <ul className="mt-8 grid border-t border-line md:grid-cols-3">
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
