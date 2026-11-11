import { localizedPath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { company } from "@/lib/company";
import { pagePath } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { RibbonField } from "@/components/visuals/RibbonField";

// Покана за връзка в края на страницата: едро заглавие върху светлинните ленти.
export async function CtaBand() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line">
      <RibbonField className="absolute inset-0 h-full w-full" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-canvas via-canvas/50 to-canvas/0" />
      <Container className="relative py-24 sm:py-32">
        <h2
          id="cta-title"
          className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight text-ink sm:text-7xl"
        >
          {dictionary.home.cta.title}
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
          {dictionary.home.cta.lead}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
          <ButtonLink href={localizedPath(locale, pagePath("contact"))}>
            {dictionary.common.contactCta}
          </ButtonLink>
          <a
            href={`tel:${company.phone.international}`}
            className="font-display text-2xl font-extrabold tracking-tight text-ink underline-offset-8 hover:text-accent hover:underline"
          >
            {company.phone.display}
          </a>
        </div>
      </Container>
    </section>
  );
}
