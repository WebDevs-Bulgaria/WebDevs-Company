import Image, { type StaticImageData } from "next/image";
import applicationsPhoto from "@/assets/photos/applications.jpg";
import audiencePhoto from "@/assets/photos/audience.jpg";
import technologyPhoto from "@/assets/photos/technology.jpg";
import websitesPhoto from "@/assets/photos/websites.jpg";
import { BrowserMockup, BrowserWithAssistant, CodeMockup, DashboardMockup } from "./Mockups";

/*
 * Образът към една секция. Има два вида за едни и същи места — снимка или макет, нарисуван
 * с код (Mockups.tsx) — и се избира оттук, за да може пробата да се върне с един ред.
 * От 13.11.2026 се пробват снимки; макетите са запазени и не се трият, докато не се реши.
 */
export const visualStyle: "photo" | "mockup" = "photo";

export type VisualSlot = "websites" | "applications" | "technology" | "audience";

// Снимките са декоративни (alt=""): до тях стои заглавието, което казва същото с думи.
const photos: Record<VisualSlot, StaticImageData> = {
  websites: websitesPhoto,
  applications: applicationsPhoto,
  technology: technologyPhoto,
  audience: audiencePhoto,
};

const mockups: Record<VisualSlot, (props: { className?: string }) => React.ReactNode> = {
  websites: BrowserMockup,
  applications: DashboardMockup,
  technology: CodeMockup,
  audience: BrowserWithAssistant,
};

export function SectionVisual({
  slot,
  className = "",
  tone = "light",
}: {
  slot: VisualSlot;
  className?: string;
  // „night“ — секцията е тъмна: рамката е с цвета на тъмните ленти.
  tone?: "light" | "night";
}) {
  if (visualStyle === "mockup") {
    const Mockup = mockups[slot];
    return <Mockup className={className} />;
  }

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-xl border shadow-card ${
        tone === "night" ? "border-night-line" : "border-line"
      } ${className}`}
    >
      {/* Заема най-много 24rem (колоната до заглавието); на телефон — ширината на екрана. */}
      <Image
        src={photos[slot]}
        alt=""
        fill
        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 24rem, 100vw"
        placeholder="blur"
        className="object-cover"
      />
      {/* Лек оттенък с цвета на палитрата, за да стои снимката като част от сайта. */}
      <span aria-hidden="true" className="brand-gradient absolute inset-0 opacity-15 mix-blend-multiply" />
    </div>
  );
}
