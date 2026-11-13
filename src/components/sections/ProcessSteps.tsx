import { getProcessSteps } from "@/lib/content";

/*
 * Етапите на работа като път: цветна линия свързва номерирани възли, под всеки
 * възел е панелът на стъпката. На широк екран пътят е хоризонтален, на тесен —
 * вертикален, с линията вляво.
 */
export async function ProcessSteps() {
  const steps = await getProcessSteps();

  return (
    <ol className="hue-cycle relative grid gap-y-8 lg:grid-cols-5 lg:gap-x-5">
      {/* Линията на пътя */}
      <span
        aria-hidden="true"
        className="brand-gradient absolute bottom-0 left-7 top-0 w-0.5 -translate-x-1/2 lg:bottom-auto lg:left-0 lg:right-0 lg:top-7 lg:h-0.5 lg:w-auto lg:translate-x-0 lg:-translate-y-1/2"
      />

      {steps.map((step, index) => (
        <li key={step.title} className="group relative flex gap-5 lg:block">
          <span
            aria-hidden="true"
            className="brand-gradient relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-extrabold text-white shadow-float ring-8 ring-canvas transition-transform duration-300 group-hover:scale-110"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 border border-line bg-surface-raised p-6 transition duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-float lg:mt-7 lg:h-[calc(100%-5.25rem)]">
            <h3 className="font-display text-lg font-extrabold leading-snug tracking-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-ink-muted">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
