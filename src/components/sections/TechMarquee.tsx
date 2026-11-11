// Движеща се лента с едри надписи. Съдържанието е повторено два пъти, за да няма
// прекъсване; второто копие е скрито за екранните четци.
export function TechMarquee({ label, items }: { label: string; items: string[] }) {
  return (
    <section aria-label={label} className="marquee overflow-hidden border-b border-line bg-surface py-7">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center font-display text-3xl font-extrabold tracking-tight text-ink/70 sm:text-4xl"
              >
                <span className="px-8">{item}</span>
                <span aria-hidden="true" className="brand-gradient h-2 w-2 rotate-45" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
