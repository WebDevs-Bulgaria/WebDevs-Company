import { useId, type CSSProperties } from "react";

const SIZE = 600;
const CENTER = SIZE / 2;
const RADIUS = 230;
const MERIDIANS = 9;
const SPIN_SECONDS = 26;

// Паралелите: хоризонтални елипси на различна височина (гледани леко отгоре).
const parallels = [-0.78, -0.5, -0.22, 0.08, 0.36, 0.62, 0.84].map((level) => {
  const y = level * RADIUS;
  const rx = Math.sqrt(RADIUS * RADIUS - y * y);
  return {
    cy: Math.round(CENTER + y),
    rx: Math.round(rx),
    ry: Math.round(rx * 0.16),
  };
});

// Орбитите на светещите точки около глобуса.
const orbits = [
  { radius: 268, tilt: -24, squash: 0.32, seconds: 14, delay: 0 },
  { radius: 286, tilt: 18, squash: 0.22, seconds: 20, delay: -6 },
  { radius: 250, tilt: 62, squash: 0.4, seconds: 17, delay: -11 },
];

/*
 * Абстрактен образ: въртящ се глобус от линии с точки по орбити — мрежата, в която
 * живеят сайтовете. Меридианите са окръжности, които се свиват и разпускат по
 * хоризонтала с изместване във времето; това дава усещането за въртене без 3D.
 * Декоративен е (aria-hidden); цветовете идват от CSS променливите, движението —
 * от CSS анимации (спират при „намалено движение“).
 */
export function WireSphere({ className = "" }: { className?: string }) {
  const id = useId();
  const strokeId = `${id}-stroke`;
  const glowId = `${id}-glow`;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <defs>
        <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-brand-2)" />
        </linearGradient>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.28" />
          <stop offset="0.6" stopColor="var(--color-brand-2)" stopOpacity="0.1" />
          <stop offset="1" stopColor="var(--color-brand-2)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Сияние зад глобуса */}
      <circle cx={CENTER} cy={CENTER} r={SIZE / 2} fill={`url(#${glowId})`} />

      <g stroke={`url(#${strokeId})`} strokeWidth="1.4">
        {/* Контурът */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} strokeWidth="2" />

        {/* Паралели */}
        {parallels.map((parallel) => (
          <ellipse
            key={parallel.cy}
            cx={CENTER}
            cy={parallel.cy}
            rx={parallel.rx}
            ry={parallel.ry}
            opacity="0.45"
          />
        ))}

        {/* Меридиани: една и съща анимация с различно изместване във времето */}
        {Array.from({ length: MERIDIANS }, (_, index) => (
          <circle
            key={index}
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            className="sphere-meridian"
            opacity="0.7"
            vectorEffect="non-scaling-stroke"
            style={
              {
                animationDuration: `${SPIN_SECONDS}s`,
                animationDelay: `${-(SPIN_SECONDS / MERIDIANS) * index}s`,
              } as CSSProperties
            }
          />
        ))}
      </g>

      {/* Точки по орбити */}
      {orbits.map((orbit) => (
        <g
          key={orbit.radius}
          transform={`translate(${CENTER} ${CENTER}) rotate(${orbit.tilt}) scale(1 ${orbit.squash})`}
        >
          <circle r={orbit.radius} stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <g
            className="sphere-orbit"
            style={{ animationDuration: `${orbit.seconds}s`, animationDelay: `${orbit.delay}s` }}
          >
            <circle cx={orbit.radius} r="9" fill="var(--color-accent)" />
          </g>
        </g>
      ))}
    </svg>
  );
}
