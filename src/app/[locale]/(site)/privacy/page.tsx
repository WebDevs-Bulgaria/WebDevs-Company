import { getT } from "@/i18n/server";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export function generateMetadata() {
  return buildPageMetadata("privacy");
}

export default async function PrivacyPage() {
  const { t: tPrivacy } = await getT("privacy");

  return (
    <>
      <PageHeader pageKey="privacy" title={tPrivacy("title")} lead={tPrivacy("updated")} />

      <Container className="py-24 sm:py-28">
        <div className="max-w-3xl space-y-10">
          {tPrivacy("sections").map((section) => (
            <section key={section.title} aria-label={section.title}>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-7 text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
