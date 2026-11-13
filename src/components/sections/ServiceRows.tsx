import Link from "next/link";
import { localizedPath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { getServices, type ServiceGroup } from "@/lib/content";
import { servicePath } from "@/lib/services";

const tones = {
  light: {
    row: "border-line",
    number: "text-accent",
    title: "text-ink group-hover:text-accent",
    summary: "text-ink-muted",
    arrow: "border-line text-ink",
  },
  night: {
    row: "border-night-line",
    number: "text-night-accent",
    title: "text-night-ink group-hover:text-night-accent",
    summary: "text-night-muted",
    arrow: "border-night-line text-night-ink",
  },
} as const;

/*
 * Услугите от една група на страницата „Услуги“ като големи бутони: номер, име,
 * едно изречение, ориентировъчна цена и стрелка. Всеки води към собствената страница на услугата
 * (/services/<id>), където е какво включва тя. Номерацията е обща за всички услуги
 * (01–10), затова номерът идва от мястото на услугата в целия списък.
 */
export async function ServiceRows({
  group,
  tone = "light",
}: {
  group: ServiceGroup;
  tone?: keyof typeof tones;
}) {
  const locale = await getLocale();
  const services = await getServices();
  const style = tones[tone];

  return (
    <ul className={`hue-cycle border-b ${style.row}`}>
      {services.map((service, index) => {
        if (service.group !== group) return null;

        return (
          <li key={service.id} className={`relative border-t ${style.row}`}>
            {/* prefetch: страницата на услугата зависи от адреса (params) и без това браузърът тегли
                съдържанието ѝ чак след натискането — на хостинга това се усещаше като забавяне до секунди. */}
            <Link
              prefetch
              href={localizedPath(locale, servicePath(service.id))}
              className="group relative grid gap-x-8 gap-y-3 py-10 md:grid-cols-[3.5rem_1fr_auto] md:items-center"
            >
              {/* Цветна черта вляво, която се разгръща при посочване */}
              <span
                aria-hidden="true"
                className="brand-gradient absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
              />
              {/* Изместването е с transform, а не с отстъп: така текстът не се пренася и страницата не подскача. */}
              <span
                aria-hidden="true"
                className={`font-mono text-sm font-semibold transition-transform duration-300 group-hover:translate-x-3 ${style.number}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-3">
                <span
                  className={`block font-display text-3xl font-extrabold tracking-tight transition-colors duration-200 sm:text-4xl ${style.title}`}
                >
                  {service.title}
                </span>
                <span className={`mt-3 block max-w-2xl text-base leading-7 sm:text-lg ${style.summary}`}>
                  {service.summary}
                </span>
                <span
                  className={`mt-4 block font-mono text-xs font-semibold uppercase tracking-[0.16em] ${style.number}`}
                >
                  {service.price}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`hidden h-14 w-14 items-center justify-center rounded-full border transition duration-300 group-hover:scale-110 group-hover:border-(--brand-from) group-hover:bg-(--brand-from) group-hover:text-white md:flex ${style.arrow}`}
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
