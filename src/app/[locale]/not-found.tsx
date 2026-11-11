import { localizedPath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default async function NotFound() {
  const locale = await getLocale();
  const { t } = await getT("common");

  return (
    <main className="flex flex-1 items-center">
      <Container className="py-24">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-ink sm:text-7xl">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-ink-muted">{t("notFound.text")}</p>
        <div className="mt-8">
          <ButtonLink href={localizedPath(locale)}>{t("notFound.back")}</ButtonLink>
        </div>
      </Container>
    </main>
  );
}
