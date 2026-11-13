import { company } from "@/lib/company";

/*
 * Логото на Web Devs Bulgaria (избрано на 13.11.2026): живото кълбо като знак и до него
 * „WebDevs“ слято, с „Devs“ в цвета на марката, и „BULGARIA“ с разредени букви отдолу.
 *
 * Цветовете са на марката и НЕ следват палитрата на сайта — логото е едно и също, каквато и
 * палитра да избере посетителят. Сменя се само цветът на „Web“ и „BULGARIA“ според фона (tone).
 * Изходните файлове (SVG, PNG) са извън репото; знакът тук е същата рисунка.
 */

const brandGradient = "linear-gradient(120deg, #ff5a14 0%, #c2255c 100%)";

// Знакът сам: кълбо с отблясък и светло ядро. id прави градиента уникален, когато на една
// страница има повече от един знак (шапка и футър).
export function LogoMark({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={className}>
      <defs>
        <radialGradient id={id} cx="0.5" cy="0.6" r="0.6">
          <stop offset="0" stopColor="#ffd23a" />
          <stop offset="0.45" stopColor="#ff7a1a" />
          <stop offset="1" stopColor="#c2255c" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="27" fill={`url(#${id})`} />
      <ellipse cx="24" cy="19" rx="12" ry="6.5" fill="#fff" opacity="0.5" transform="rotate(-24 24 19)" />
      <circle cx="33" cy="35" r="6" fill="#fff" opacity="0.92" />
    </svg>
  );
}

export function Logo({
  id,
  tone = "light",
  hideTextOnMobile = false,
  className = "",
}: {
  // Уникално име за градиента на знака на това място (например "header-logo").
  id: string;
  // „night“ — върху тъмна лента (футърът): надписът е бял независимо от темата.
  tone?: "light" | "night";
  // В шапката на тесен екран остава само знакът, за да има място за бутоните.
  hideTextOnMobile?: boolean;
  className?: string;
}) {
  const ink = tone === "night" ? "text-night-ink" : "text-ink";
  const muted = tone === "night" ? "text-night-muted" : "text-ink-muted";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark id={id} className="h-10 w-10 shrink-0" />
      {/* Името се чете от екранните четци като едно цяло; нарисуваният надпис е скрит за тях. */}
      <span className="sr-only">{company.brandName}</span>
      <span aria-hidden="true" className={`leading-none ${hideTextOnMobile ? "hidden sm:block" : "block"}`}>
        <span className={`block font-display text-[1.375rem] font-extrabold leading-none tracking-tight ${ink}`}>
          Web
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: brandGradient }}>
            Devs
          </span>
        </span>
        <span className={`mt-1.5 block font-display text-[0.5625rem] font-bold uppercase leading-none tracking-[0.42em] ${muted}`}>
          Bulgaria
        </span>
      </span>
    </span>
  );
}
