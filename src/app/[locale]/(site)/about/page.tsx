import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { company } from "@/lib/company";
import { getAboutContent } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function generateMetadata() {
  return buildPageMetadata("about");
}

export default async function AboutPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const about = await getAboutContent();

  return (
    <>
      <PageHeader pageKey="about" title={about.title} lead={about.lead} />

      <Container className="py-24 sm:py-28">
        <div className="grid border-t border-line lg:grid-cols-3">
          {about.sections.map((section, index) => (
            <section
              key={section.title}
              aria-label={section.title}
              className="border-b border-line py-10 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <span aria-hidden="true" className="font-mono text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-ink">{section.title}</h2>
              <p className="mt-4 text-base leading-7 text-ink-muted">{section.text}</p>
            </section>
          ))}
        </div>
      </Container>

      <section aria-labelledby="about-commitments" className="border-t border-line bg-surface">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            id="about-commitments"
            eyebrow={dictionary.home.commitments.eyebrow}
            title={dictionary.home.commitments.title}
            lead={dictionary.home.commitments.lead}
          />
          <dl className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {dictionary.home.commitments.items.map((item) => (
              <div
                key={item.label}
                className="flex flex-col-reverse justify-end border-b border-line py-8 sm:px-6 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:first:pl-0"
              >
                <dd className="mt-4 text-sm leading-6 text-ink-muted">{item.text}</dd>
                <dt>
                  <span className="text-brand-gradient block font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
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

      <section aria-labelledby="about-values" className="relative overflow-hidden bg-night">
        <Container className="py-24 sm:py-28">
          <h2 id="about-values" className="text-4xl font-extrabold tracking-tight text-night-ink sm:text-6xl">
            {about.valuesTitle}
          </h2>
          <dl className="mt-16 grid border-t border-night-line sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value) => (
              <div
                key={value.title}
                className="border-b border-night-line py-8 sm:px-6 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:first:pl-0"
              >
                <dt className="font-display text-2xl font-extrabold tracking-tight text-night-accent">{value.title}</dt>
                <dd className="mt-4 text-sm leading-6 text-night-muted">{value.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="about-company">
        <Container className="py-24 sm:py-28">
          <h2 id="about-company" className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {about.companyTitle}
          </h2>
          <dl className="mt-10 grid max-w-3xl gap-x-12 gap-y-4 border-t border-line pt-8 text-base sm:grid-cols-[auto_1fr]">
            <dt className="text-ink-muted">{about.companyLabels.name}</dt>
            <dd className="text-ink">{company.legalName[locale]}</dd>
            <dt className="text-ink-muted">{about.companyLabels.registration}</dt>
            <dd className="text-ink">{company.registrationNumber}</dd>
            <dt className="text-ink-muted">{about.companyLabels.seat}</dt>
            <dd className="text-ink">
              {company.address.locality[locale]}, {company.address.country[locale]}
            </dd>
          </dl>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbJsonLd(locale, dictionary, "about")} />
    </>
  );
}
