import { localizedPath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { company } from "@/lib/company";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { pagePath } from "@/lib/site";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";

export function generateMetadata() {
  return buildPageMetadata("contact");
}

export default async function ContactPage() {
  const locale = await getLocale();
  const { t: tContact } = await getT("contact");

  return (
    <>
      <PageHeader pageKey="contact" title={tContact("title")} lead={tContact("lead")} />

      <Container className="grid gap-16 py-14 sm:py-20 lg:grid-cols-5">
        <section aria-labelledby="contact-details" className="lg:col-span-2">
          <h2
            id="contact-details"
            className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            {tContact("detailsTitle")}
          </h2>
          <dl className="mt-8 border-t border-line">
            <div className="border-b border-line py-6">
              <dt className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
                <PhoneIcon className="h-4 w-4 text-accent" />
                {tContact("phoneLabel")}
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:${company.phone.international}`}
                  className="inline-flex min-h-8 items-center font-display text-2xl font-extrabold tracking-tight text-ink hover:text-accent"
                >
                  {company.phone.display}
                </a>
              </dd>
            </div>
            <div className="border-b border-line py-6">
              <dt className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
                <MailIcon className="h-4 w-4 text-accent" />
                {tContact("emailLabel")}
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex min-h-8 items-center break-all font-display text-xl font-extrabold tracking-tight text-ink hover:text-accent"
                >
                  {company.email}
                </a>
              </dd>
            </div>
            <div className="border-b border-line py-6">
              <dt className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
                <PinIcon className="h-4 w-4 text-accent" />
                {tContact("locationLabel")}
              </dt>
              <dd className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink">
                {company.address.locality[locale]}, {company.address.country[locale]}
              </dd>
            </div>
          </dl>
        </section>

        <section
          aria-labelledby="contact-form"
          className="border border-line bg-surface-raised p-6 sm:p-10 lg:col-span-3"
        >
          <h2 id="contact-form" className="mb-8 text-3xl font-extrabold tracking-tight text-ink">
            {tContact("formTitle")}
          </h2>
          <ContactForm
            locale={locale}
            labels={tContact("form")}
            privacyHref={localizedPath(locale, pagePath("privacy"))}
          />
        </section>
      </Container>

      <JsonLd data={await breadcrumbJsonLd("contact")} />
    </>
  );
}
