/*
 * Знаци от предложенията за иконка (13.11.2026), които не станаха лого, но се ползват като
 * украса на отделни места в сайта. Рисуват се с цвета на текста около тях (currentColor),
 * затова следват палитрата и темата; размерът идва от className. Декоративни са (aria-hidden).
 * Слагат се пестеливо; преди ново място се пита.
 *
 * Това са ЕДНОЦВЕТНИТЕ рисунки (за щампата във футъра). Иконките в цвят, както са избрани,
 * са в BrandMark най-долу — за съдържанието на сайта се ползват те.
 */

// „Мрежата“ (№ 7): буквата W от свързани точки с по-едро ядро в средата — системи, които
// работят заедно. Стои при AI решенията.
export function NetworkIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={className} fill="none">
      <path
        d="M10 18l11 28 11-20 11 20 11-28"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g fill="currentColor">
        <circle cx="10" cy="18" r="5.5" />
        <circle cx="21" cy="46" r="5.5" />
        <circle cx="43" cy="46" r="5.5" />
        <circle cx="54" cy="18" r="5.5" />
        <circle cx="32" cy="26" r="5" />
      </g>
      {/* Пръстенът около ядрото го отделя от останалите точки. */}
      <circle cx="32" cy="26" r="9.5" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" />
    </svg>
  );
}

// „w“ с точката (№ 6) — същият знак като иконката на раздела на браузъра. Стои като едра бледа
// щампа във футъра: буквата е едва видима, точката е по-ярка (dotClassName).
export function WDot({ className = "", dotClassName = "" }: { className?: string; dotClassName?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={className} fill="none">
      <path
        d="M9 22l8 22 8-16 8 16 8-22"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Точката стои близо до буквата (по-близо, отколкото в иконката на раздела): в едър размер
          разстоянието от иконката изглеждаше като дупка. */}
      <circle cx="46.5" cy="41" r="5.5" fill="currentColor" className={dotClassName} />
    </svg>
  );
}

// „Стрелките“ (№ 5): буквата W с една дебела линия, едноцветна. Засега не се ползва никъде.
export function ChevronW({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={className} fill="none">
      <path
        d="M8 16l12 30 12-24 12 24 12-30"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/*
 * Седемте иконки на марката точно както са в предложенията от 13.11.2026 (изходните файлове са
 * favicon-1…7.svg, извън репото): с плочката, градиента и белия знак. Цветовете са на марката и
 * НЕ следват палитрата на сайта, както и логото. Стоят еднакво добре на светъл и на тъмен фон —
 * тъмните плочки (№ 6, № 7) имат тънка светла рамка точно за тъмния фон.
 *
 * НЕ ги прерисувайте едноцветни за съдържанието: пробвано на 14.11.2026 и върнато по искане на
 * Борислав („ако исках монохром, щях да кажа“).
 *
 * Къде стои всяка: 1 монограм — иконката за началния екран на телефон (apple-icon.tsx);
 * 2 код — Приложения; 3 глобус — Сайтове; 4 кълбо — логото и „Искам AI…“; 5 стрелки —
 * „Започвам бизнес“; 6 „w.“ — иконката на раздела и „Имам сайт…“; 7 мрежа — AI решенията и
 * „Губим време в ръчна работа“.
 */
const INK = "#17120e";

export type BrandMarkKind = "monogram" | "code" | "globe" | "orb" | "chevrons" | "wdot" | "network";

export function BrandMark({
  kind,
  id,
  className = "",
}: {
  kind: BrandMarkKind;
  // Уникално име за градиентите на това място (на една страница има по няколко иконки).
  id: string;
  className?: string;
}) {
  const fill = `url(#${id})`;
  const white = {
    fill: "none",
    stroke: "#fff",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  const brandTile = <rect width="64" height="64" rx="15" fill={fill} />;
  const darkTile = (
    <rect x="1" y="1" width="62" height="62" rx="14" fill={INK} stroke="#fff" strokeOpacity="0.22" strokeWidth="2" />
  );

  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={`shrink-0 ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff5a14" />
          <stop offset="1" stopColor="#c2255c" />
        </linearGradient>
        <radialGradient id={`${id}-orb`} cx="0.5" cy="0.6" r="0.6">
          <stop offset="0" stopColor="#ffd23a" />
          <stop offset="0.45" stopColor="#ff7a1a" />
          <stop offset="1" stopColor="#c2255c" />
        </radialGradient>
      </defs>
      {kind === "monogram" ? (
        <>
          {brandTile}
          <path d="M11 21l7 22 7-17 7 17 7-22" {...white} strokeWidth="5" />
          <path d="M45 21h3.5a11 11 0 0 1 0 22H45z" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
        </>
      ) : null}
      {kind === "code" ? (
        <>
          {brandTile}
          <path d="M24 20L12 32l12 12M40 20l12 12-12 12M36 15L28 49" {...white} strokeWidth="5.5" />
        </>
      ) : null}
      {kind === "globe" ? (
        <>
          <circle cx="32" cy="32" r="32" fill={fill} />
          <g fill="none" stroke="#fff" strokeWidth="3.5">
            <circle cx="32" cy="32" r="20" />
            <ellipse cx="32" cy="32" rx="8.5" ry="20" />
            <path d="M12 32h40" />
          </g>
        </>
      ) : null}
      {kind === "orb" ? (
        <>
          <circle cx="32" cy="32" r="27" fill={`url(#${id}-orb)`} />
          <ellipse cx="24" cy="19" rx="12" ry="6.5" fill="#fff" opacity="0.5" transform="rotate(-24 24 19)" />
          <circle cx="33" cy="35" r="6" fill="#fff" opacity="0.92" />
        </>
      ) : null}
      {kind === "chevrons" ? (
        <>
          {brandTile}
          <path d="M13 20l9.5 25 9.5-19 9.5 19 9.5-25" {...white} strokeWidth="7" />
        </>
      ) : null}
      {kind === "wdot" ? (
        <>
          {darkTile}
          <path d="M9 22l8 22 8-16 8 16 8-22" {...white} strokeWidth="6.5" />
          <circle cx="52" cy="41" r="5.5" fill="#ff5a14" />
        </>
      ) : null}
      {kind === "network" ? (
        <>
          {darkTile}
          <g transform="translate(6 6) scale(0.8125)">
            <path d="M10 18l11 28 11-20 11 20 11-28" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2.5" strokeLinejoin="round" />
            <g fill={fill}>
              <circle cx="10" cy="18" r="5.5" />
              <circle cx="21" cy="46" r="5.5" />
              <circle cx="43" cy="46" r="5.5" />
              <circle cx="54" cy="18" r="5.5" />
              <circle cx="32" cy="26" r="8" />
            </g>
            <circle cx="32" cy="26" r="3" fill="#fff" />
          </g>
        </>
      ) : null}
    </svg>
  );
}
