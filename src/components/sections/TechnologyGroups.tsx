import { getTechnologyGroups } from "@/lib/content";

/*
 * Технологиите като четири колони: всяка област има номер, заглавие, кратко обяснение
 * защо работим точно с тези инструменти, и под него самите инструменти като плочки,
 * които се оцветяват при посочване.
 */
export async function TechnologyGroups() {
  const groups = await getTechnologyGroups();

  return (
    <dl className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group, index) => (
        <div key={group.title} className="flex flex-col">
          <dt className="flex items-baseline gap-3 border-b-2 border-ink pb-4">
            <span aria-hidden="true" className="font-mono text-xs font-semibold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-ink">{group.title}</span>
          </dt>
          <dd className="mt-5 flex flex-1 flex-col">
            {/* Защо точно тези инструменти */}
            <p className="flex-1 text-sm leading-6 text-ink-muted">{group.reason}</p>
            <ul className="mt-6 space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="group relative flex items-center justify-between gap-3 overflow-hidden border border-line bg-surface-raised px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-float"
                >
                  {/* Цветният фон се показва при посочване. */}
                  <span
                    aria-hidden="true"
                    className="brand-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="relative font-display text-base font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-white">
                    {item}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative h-2 w-2 rotate-45 bg-accent transition-colors duration-300 group-hover:bg-white"
                  />
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
