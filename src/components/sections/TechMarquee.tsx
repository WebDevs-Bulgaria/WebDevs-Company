// Движеща се лента с едри надписи. Съдържанието е повторено четири пъти и лентата се измества
// с ширината на едно копие (вижте @keyframes marquee): така и на много широк екран вдясно не
// остава празно място преди началото на следващия цикъл. Копията след първото са скрити за
// екранните четци.
export function TechMarquee({ label, items }: { label: string; items: string[] }) {
  return (
    <section aria-label={label} className="marquee overflow-hidden border-b border-line bg-surface py-5 sm:py-7">
      <div className="marquee-track flex w-max">
        {[0, 1, 2, 3].map((copy) => (
          <ul key={copy} aria-hidden={copy > 0} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center font-display text-[1.625rem] font-extrabold tracking-tight text-ink/70 sm:text-4xl"
              >
                <span className="px-6 sm:px-8">{item}</span>
                <span aria-hidden="true" className="brand-gradient h-2 w-2 rotate-45" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
