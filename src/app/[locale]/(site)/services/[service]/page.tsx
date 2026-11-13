import { notFound } from "next/navigation";
import { localizedPath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { company } from "@/lib/company";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildServiceMetadata } from "@/lib/seo/metadata";
import { serviceIds, servicePath } from "@/lib/services";
import { pagePath } from "@/lib/site";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NodeGraph } from "@/components/visuals/NodeGraph";

// Проверката за „мигновена навигация“ се изключва: всички услуги са в generateStaticParams и
// страниците им са готови от build, така че четенето на params не бави никого. Непознато име
// стига до notFound() и трябва да върне 404 — затова params не се слага в <Suspense>.
export const instant = false;

// Всички услуги се генерират статично при build (при Cache Components списъкът е задължителен).
export function generateStaticParams() {
  return serviceIds.map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[service]">) {
  return buildServiceMetadata((await params).service);
}

// Страницата на една услуга: въведение, ориентировъчна цена, какво включва, кога е подходяща, какво се получава накрая
// и форма за запитване, която изпраща и коя е услугата. Обща покана „Имате проект или идея?“ няма —
// формата я замества.
export default async function ServicePage({ params }: PageProps<"/[locale]/services/[service]">) {
  const { service: id } = await params;
  const locale = await getLocale();
  const { t: tServices } = await getT("services");
  const { t: tContact } = await getT("contact");
  const service = tServices("items").find((item) => item.id === id);
  // Адрес с непознато име на услуга не е генериран при build и стига дотук при заявка.
  if (!service) notFound();

  const servicesHref = localizedPath(locale, pagePath("services"));
  const lists = [
    { title: tServices("detail.suitable"), items: service.suitable },
    { title: tServices("detail.result"), items: service.result },
  ];

  return (
    <>
      <PageHeader pageKey="services" title={service.title} lead={service.summary} current={service.title} />

      <section aria-labelledby="service-includes">
        <Container className="grid gap-x-16 gap-y-12 py-14 sm:py-20 lg:grid-cols-[22rem_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading id="service-includes" title={tServices("detail.includes")} lead={tServices("detail.includesLead")} />
            {/* Ориентировъчната цена на услугата */}
            <div className="mt-10 border-t-2 border-ink pt-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                {tServices("detail.priceLabel")}
              </p>
              <p className="text-brand-gradient mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight">
                {service.price}
              </p>
              <p className="mt-4 text-sm leading-6 text-ink-muted">{tServices("detail.priceNote")}</p>
            </div>
          </div>
          <div>
            {/* Въведението може да е от няколко абзаца, разделени с празен ред в превода. */}
            <div className="space-y-6">
              {service.intro.split("\n\n").map((paragraph) => (
                <p key={paragraph} className="text-lg leading-8 text-ink sm:text-xl sm:leading-9">
                  {paragraph}
                </p>
              ))}
            </div>
            <ol className="hue-cycle mt-12 border-b border-line">
              {service.points.map((point, index) => (
                <li
                  key={point}
                  className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-t border-line py-6"
                >
                  <span aria-hidden="true" className="font-mono text-sm font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                    {point}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="dot-grid border-y border-line bg-surface">
        <Container className="grid gap-5 py-14 sm:py-20 lg:grid-cols-2">
          {lists.map((list) => (
            <div key={list.title} className="border border-line bg-surface-raised p-8 sm:p-10">
              <h2 className="text-3xl font-extrabold tracking-tight text-ink">{list.title}</h2>
              <ul className="mt-8 space-y-5">
                {list.items.map((item) => (
                  <li key={item} className="flex gap-4 text-base leading-7 text-ink-muted">
                    <span aria-hidden="true" className="brand-gradient mt-2.5 h-2 w-2 shrink-0 rotate-45" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>

      {/* Запитване за тази услуга: тъмна секция върху мрежата от точки. Вляво — заглавие,
          какво следва след запитването и телефон; вдясно — формата, направо върху секцията. */}
      <section
        id="inquiry"
        aria-labelledby="service-inquiry"
        // overflow-clip, а не overflow-hidden: иначе залепващата лява колона не работи.
        className="relative scroll-mt-20 overflow-clip bg-night"
      >
        <NodeGraph className="absolute inset-y-0 left-0 h-full w-full opacity-70 lg:w-2/3" />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-night/40 via-night/85 to-night" />

        <Container className="relative grid gap-y-14 py-14 sm:py-20 lg:grid-cols-[1fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start lg:pr-16">
            <SectionHeading
              id="service-inquiry"
              tone="night"
              eyebrow={tServices("detail.inquiryEyebrow")}
              title={tServices("detail.inquiryTitle")}
              lead={tServices("detail.inquiryLead")}
            />

            <h3 className="mt-12 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-night-accent">
              {tServices("detail.inquiryNextTitle")}
            </h3>
            <ol className="mt-5 space-y-5">
              {tServices("detail.inquiryNext").map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-night-line font-mono text-xs font-semibold text-night-accent"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-1.5 text-base leading-7 text-night-muted">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-12 border-t border-night-line pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-night-muted">{tServices("detail.inquiryOr")}</p>
              <a
                href={`tel:${company.phone.international}`}
                className="mt-2 inline-flex min-h-8 items-center font-display text-3xl font-extrabold tracking-tight text-night-ink transition-colors hover:text-night-accent"
              >
                {company.phone.display}
              </a>
            </div>
          </div>

          {/* Формата стои направо върху тъмната секция, без карта; отделя я само тънка линия вляво. */}
          <div className="lg:border-l lg:border-night-line lg:pl-16">
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-night-line pb-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-night-muted">
                {tServices("detail.inquiryAbout")}
              </span>
              <span className="text-brand-gradient font-display text-2xl font-extrabold tracking-tight [--color-accent:var(--color-night-accent)] [--color-brand-2:var(--color-night-ink)]">
                {service.title}
              </span>
            </p>
            <div className="pt-8">
              <ContactForm
                tone="night"
                locale={locale}
                labels={tContact("form")}
                privacyHref={localizedPath(locale, pagePath("privacy"))}
                serviceId={service.id}
              />
            </div>
          </div>
        </Container>
      </section>

      <JsonLd data={await breadcrumbJsonLd("services", { name: service.title, path: servicePath(service.id) })} />

      {/* Връзки обратно към „Услуги“ */}
      <Container className="flex flex-wrap gap-3 py-12">
        <ButtonLink href={servicesHref} variant="secondary">
          {tServices("detail.all")}
        </ButtonLink>
        <ButtonLink href={`${servicesHref}#process`} variant="secondary">
          {tServices("detail.process")}
        </ButtonLink>
      </Container>
    </>
  );
}
