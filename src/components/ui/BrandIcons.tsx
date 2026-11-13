/*
 * Знаци от предложенията за иконка (13.11.2026), които не станаха лого, но се ползват като
 * украса на отделни места в сайта. Рисуват се с цвета на текста около тях (currentColor),
 * затова следват палитрата и темата; размерът идва от className. Декоративни са (aria-hidden).
 * Слагат се пестеливо; преди ново място се пита.
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

// „Стрелките“ (№ 5): буквата W с една дебела линия. Пробвана като щампа във футъра и заменена
// с „w“ с точката; засега не се ползва никъде.
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
