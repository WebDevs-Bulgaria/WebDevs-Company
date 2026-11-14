import { getT } from "@/i18n/server";
import { serviceGroups } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceRows } from "@/components/sections/ServiceRows";
import { JsonLd } from "@/components/seo/JsonLd";
import { BrandMark } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LivingOrb } from "@/components/visuals/LivingOrb";
import { SectionVisual } from "@/components/visuals/SectionVisual";
import { NodeGraph } from "@/components/visuals/NodeGraph";

export function generateMetadata() {
  return buildPageMetadata("services");
}

/*
 * Страницата „Услуги“: трите групи услуги с всичко, което включват, и процесът на
 * работа. Под заглавието има залепваща лента с връзки към частите на страницата.
 * Нарочно няма покана „Имате проект или идея?“ накрая — бутонът за връзка е в шапката.
 */
export default async function ServicesPage() {
  const { t: tHome } = await getT("home");
  const { t: tServices } = await getT("services");

  const sections = [
    ...serviceGroups.map((group) => ({
      id: group,
      title: tServices("groups")[group].title,
      count: tServices("items").filter((service) => service.group === group).length,
    })),
    { id: "process", title: tServices("process.title"), count: null },
  ];

  return (
    <>
      <PageHeader pageKey="services" title={tServices("title")} lead={tServices("lead")} />

      {/* Залепваща лента с връзки към частите на страницата (под шапката, която е висока 4.5rem) */}
      <nav
        aria-label={tServices("onPage")}
        className="sticky top-18 z-30 border-b border-line bg-canvas/90 backdrop-blur-md"
      >
        <Container>
          <ul className="flex gap-1 overflow-x-auto py-2 sm:gap-2">
            {sections.map((section, index) => (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  className="group flex min-h-11 items-center gap-3 rounded-sm px-3 text-sm font-bold text-ink-muted transition-colors duration-200 hover:bg-surface hover:text-ink sm:px-4"
                >
                  <span aria-hidden="true" className="font-mono text-xs font-semibold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                  {section.count !== null ? (
                    <span
                      aria-hidden="true"
                      className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-semibold text-accent"
                    >
                      {section.count}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {serviceGroups.map((group, groupIndex) => {
        const night = group === "applications";

        return (
          <section
            key={group}
            id={group}
            aria-labelledby={`${group}-title`}
            // overflow-clip, а не overflow-hidden: иначе залепващото заглавие вляво не работи.
            className={`relative scroll-mt-32 overflow-clip ${night ? "bg-night" : group === "websites" ? "border-t border-line bg-surface" : ""}`}
          >
            {night ? (
              <>
                <NodeGraph className="absolute inset-y-0 right-0 h-full w-full lg:w-3/4" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-r from-night via-night/60 to-night/0"
                />
              </>
            ) : null}
            <Container className="relative grid gap-x-16 gap-y-12 py-14 sm:py-20 lg:grid-cols-[22rem_1fr]">
              <div className="lg:sticky lg:top-40 lg:self-start">
                {/* Знакът „мрежа“ над заглавието на AI групата (проба от 13.11.2026). */}
                {group === "ai" ? <BrandMark kind="network" id="services-ai-mark" className="mb-6 h-12 w-12" /> : null}
                {/* Другите две групи имат свой знак на марката на същото място (14.11.2026). */}
                {group === "websites" ? <BrandMark kind="globe" id="services-websites-mark" className="mb-6 h-12 w-12" /> : null}
                {group === "applications" ? <BrandMark kind="code" id="services-applications-mark" className="mb-6 h-12 w-12" /> : null}
                <SectionHeading
                  id={`${group}-title`}
                  tone={night ? "night" : "light"}
                  eyebrow={`${String(groupIndex + 1).padStart(2, "0")}. ${tHome(`${group}.eyebrow`)}`}
                  title={tServices("groups")[group].title}
                  lead={tServices("groups")[group].lead}
                />
                {/* Всяка група има един малък жив образ под заглавието си: разговор с асистент,
                    снимка или макет (избира се в SectionVisual.tsx). Повече от един на група не се слага. */}
                {group === "websites" ? <SectionVisual slot="websites" className="mt-10 max-w-sm" /> : null}
                {group === "applications" ? <SectionVisual slot="applications" tone="night" className="mt-10 max-w-sm" /> : null}
                {/* Разговорът: въпросът стои, точките „пише“ мигат и отговорът се появява; после се повтаря. */}
                {group === "ai" ? (
                  <figure aria-label={tServices("groups.ai.demo.label")} className="chat-demo mt-10 max-w-sm space-y-3">
                    <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-accent-soft px-4 py-3 text-sm leading-6 text-ink">
                      {tServices("groups.ai.demo.question")}
                    </p>
                    <div className="flex items-end gap-3">
                      <LivingOrb className="h-9 w-9 shrink-0" />
                      <div className="relative min-w-0">
                        <p className="chat-demo__answer w-fit rounded-2xl rounded-bl-sm border border-line bg-surface-raised px-4 py-3 text-sm leading-6 text-ink">
                          {tServices("groups.ai.demo.answer")}
                        </p>
                        <span aria-hidden="true" className="chat-demo__typing absolute bottom-0 left-0 flex gap-1.5 rounded-2xl rounded-bl-sm border border-line bg-surface-raised px-4 py-4">
                          <i /><i /><i />
                        </span>
                      </div>
                    </div>
                  </figure>
                ) : null}
              </div>
              <ServiceRows group={group} tone={night ? "night" : "light"} />
            </Container>
          </section>
        );
      })}

      <section
        id="process"
        aria-labelledby="services-process"
        className="dot-grid scroll-mt-32 border-y border-line"
      >
        <Container className="py-14 sm:py-20">
          <SectionHeading
            id="services-process"
            eyebrow={`${String(serviceGroups.length + 1).padStart(2, "0")}. ${tServices("process.eyebrow")}`}
            title={tServices("process.title")}
            lead={tServices("process.lead")}
          />
          <div className="mt-16">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <JsonLd data={await breadcrumbJsonLd("services")} />
    </>
  );
}
