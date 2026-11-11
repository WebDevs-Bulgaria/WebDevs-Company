const tones = {
  light: { eyebrow: "text-accent", rule: "bg-accent", title: "text-ink", lead: "text-ink-muted" },
  night: {
    eyebrow: "text-night-accent",
    rule: "bg-night-accent",
    title: "text-night-ink",
    lead: "text-night-muted",
  },
} as const;

// Заглавие на секция (h2): малък надпис с черта отгоре, едро заглавие и кратко въведение.
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = "light",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: keyof typeof tones;
}) {
  const style = tones[tone];

  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p
          className={`flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] ${style.eyebrow}`}
        >
          <span aria-hidden="true" className={`h-px w-10 ${style.rule}`} />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl ${eyebrow ? "mt-5" : ""} ${style.title}`}
      >
        {title}
      </h2>
      {lead ? <p className={`mt-6 text-base leading-7 sm:text-lg sm:leading-8 ${style.lead}`}>{lead}</p> : null}
    </div>
  );
}
