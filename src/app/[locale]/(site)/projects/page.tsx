import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getSolutions } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { CtaBand } from "@/components/sections/CtaBand";
import { TechnologyGroups } from "@/components/sections/TechnologyGroups";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function generateMetadata() {
  return buildPageMetadata("projects");
}

// Страницата описва видовете системи, които фирмата изгражда. Конкретни клиентски
// проекти се добавят тук само след съгласие на клиента.
export default async function ProjectsPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const solutions = await getSolutions();

  return (
    <>
      <PageHeader pageKey="projects" title={solutions.title} lead={solutions.lead} />

      <Container className="py-24 sm:py-28">
        <ul className="grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-3">
          {solutions.items.map((item, index) => (
            <li key={item.title} className="border-b border-r border-line p-8 sm:p-10">
              <span aria-hidden="true" className="font-mono text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-ink">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-ink-muted">{item.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-xs text-ink-muted">{solutions.note}</p>
      </Container>

      <section
        id="technology"
        aria-labelledby="projects-technology"
        className="scroll-mt-20 border-t border-line bg-surface"
      >
        <Container className="py-24 sm:py-28">
          <SectionHeading
            id="projects-technology"
            eyebrow={dictionary.home.technology.eyebrow}
            title={dictionary.home.technology.title}
            lead={dictionary.home.technology.lead}
          />
          <div className="mt-16">
            <TechnologyGroups />
          </div>
        </Container>
      </section>

      <CtaBand />
      <JsonLd data={breadcrumbJsonLd(locale, dictionary, "projects")} />
    </>
  );
}
