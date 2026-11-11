import { useId } from "react";

const WIDTH = 1400;
const HEIGHT = 640;
const COUNT = 54;

const round = (value: number) => Math.round(value * 10) / 10;

// Сноп от плавни линии: всяка следваща е леко изместена и огъната спрямо предишната,
// така че заедно изглеждат като светлинни ленти. Изчислява се веднъж на сървъра.
const ribbons = Array.from({ length: COUNT }, (_, index) => {
  const t = index / (COUNT - 1);
  const y = 60 + t * 420;
  const swing = 110 * Math.sin(t * Math.PI * 1.35 + 0.5);
  const lift = 150 * Math.cos(t * Math.PI * 0.85);
  const path = [
    `M -80 ${round(y + 160 - 90 * t)}`,
    `C ${round(240 + 60 * t)} ${round(y - swing - 110 * t)},`,
    `${round(520 - 40 * t)} ${round(y + lift)},`,
    `${round(820 + 30 * t)} ${round(y - 150 + 230 * t)}`,
    `S ${round(1230 - 50 * t)} ${round(y - swing * 0.7 - 60)},`,
    `1500 ${round(y - 300 + 430 * t)}`,
  ].join(" ");
  // Средните линии са най-ярки, крайните избледняват.
  const opacity = round(0.3 + 0.7 * Math.sin(t * Math.PI) ** 2);
  return { path, opacity, width: index % 6 === 0 ? 2.6 : 1.3 };
});

/*
 * Абстрактен образ от светлинни ленти в цветовете на марката. Декоративен е
 * (aria-hidden) и следва палитрата и темата през CSS променливите.
 */
export function RibbonField({ className = "" }: { className?: string }) {
  const gradientId = useId();

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={WIDTH} y2="0">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0" />
          <stop offset="0.3" stopColor="var(--color-accent)" />
          <stop offset="0.7" stopColor="var(--color-brand-2)" />
          <stop offset="1" stopColor="var(--color-brand-2)" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <g className="ribbon-drift" stroke={`url(#${gradientId})`} strokeLinecap="round">
        {ribbons.map((ribbon, index) => (
          <path key={index} d={ribbon.path} strokeWidth={ribbon.width} opacity={ribbon.opacity} />
        ))}
      </g>
    </svg>
  );
}
