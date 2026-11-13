import type { CSSProperties } from "react";
import { LivingOrb } from "./LivingOrb";

/*
 * Макети — малки рисунки на екран, направени само с HTML и CSS: прозорец на браузър със
 * сайт, табло на приложение, редактор с код. Вместо текст имат цветни чертички, затова не
 * се превеждат и не се четат от екранните четци (aria-hidden). Частите им се появяват една
 * след друга и после всичко се повтаря (анимациите .mockup-* са в globals.css); при
 * „намалено движение“ стоят готови и неподвижни. Цветовете следват палитрата и темата.
 *
 * Нарочно са малко: по един на група в „Услуги“, един при технологиите и един на началната.
 * Преди да добавите още — проверете дали страницата не става претрупана.
 */

// Поредният номер на частта: определя кога се появява.
const step = (index: number) => ({ "--i": index }) as CSSProperties;

// Горната лента на прозорец: три точки и поле за адрес.
function WindowBar({ tone = "light" }: { tone?: "light" | "night" }) {
  const dot = tone === "night" ? "bg-night-line" : "bg-line";
  return (
    <div className={`flex items-center gap-1.5 border-b px-3.5 py-3 ${tone === "night" ? "border-night-line" : "border-line"}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      <span className={`ml-2 h-3.5 flex-1 rounded-full ${tone === "night" ? "bg-night" : "bg-surface"}`} />
    </div>
  );
}

// Сайт в прозорец на браузър: надпис, заглавие на два реда, текст, два бутона и три плочки.
export function BrowserMockup({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-xl border border-line bg-surface-raised shadow-card ${className}`}
    >
      <WindowBar />
      <div className="space-y-3 p-5">
        <span className="mockup-step block h-1.5 w-10 rounded-full bg-accent" style={step(0)} />
        <span className="mockup-step block h-4 w-4/5 rounded bg-ink" style={step(1)} />
        <span className="mockup-step brand-gradient block h-4 w-1/2 rounded" style={step(2)} />
        <span className="mockup-step block h-1.5 w-full rounded-full bg-line" style={step(3)} />
        <span className="mockup-step block h-1.5 w-4/6 rounded-full bg-line" style={step(3)} />
        <span className="mockup-step flex gap-2 pt-1" style={step(4)}>
          <span className="brand-gradient h-6 w-20 rounded-full" />
          <span className="h-6 w-16 rounded-full border border-line" />
        </span>
        <span className="grid grid-cols-3 gap-2 pt-2">
          {[5, 6, 7].map((index) => (
            <span key={index} className="mockup-step h-12 rounded-md bg-surface" style={step(index)} />
          ))}
        </span>
      </div>
    </div>
  );
}

// Същият сайт с поздрав от асистента в ъгъла — за началната („Откъде тръгвате?“).
export function BrowserWithAssistant({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative pb-7 pr-5 ${className}`}>
      <BrowserMockup />
      <div className="absolute bottom-0 right-0 flex items-end gap-2">
        <span className="mockup-step flex flex-col gap-1.5 rounded-2xl rounded-br-sm border border-line bg-surface-raised px-4 py-3 shadow-float" style={step(9)}>
          <span className="block h-1.5 w-24 rounded-full bg-ink/70" />
          <span className="block h-1.5 w-16 rounded-full bg-ink/40" />
        </span>
        <LivingOrb className="h-11 w-11 shrink-0" />
      </div>
    </div>
  );
}

// Табло на приложение върху тъмна секция: меню вляво, две числа и растящи колони.
export function DashboardMockup({ className = "" }: { className?: string }) {
  const bars = [46, 72, 58, 88, 64, 96];
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-xl border border-night-line bg-night-raised/80 backdrop-blur-sm ${className}`}
    >
      <WindowBar tone="night" />
      <div className="grid grid-cols-[3.25rem_1fr]">
        <div className="space-y-2.5 border-r border-night-line p-3.5">
          <span className="block h-5 w-5 rounded-md bg-night-accent" />
          {[0, 1, 2, 3].map((index) => (
            <span key={index} className="block h-1.5 rounded-full bg-night-line" />
          ))}
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {[0, 1].map((index) => (
              <span key={index} className="mockup-step block rounded-md border border-night-line p-3" style={step(index)}>
                <span className="block h-1.5 w-10 rounded-full bg-night-muted/60" />
                <span className={`mt-2.5 block h-3.5 rounded ${index === 0 ? "w-14 bg-night-ink" : "w-10 bg-night-accent"}`} />
              </span>
            ))}
          </div>
          <div className="mt-4 flex h-20 items-end gap-2 border-b border-night-line">
            {bars.map((height, index) => (
              <span
                key={index}
                className={`mockup-bar flex-1 rounded-t ${index === bars.length - 1 ? "bg-night-accent" : "bg-night-accent/45"}`}
                style={{ height: `${height}%`, ...step(index) }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Редактор с код: тъмен прозорец с номерирани редове, които се „изписват“ един по един.
export function CodeMockup({ className = "" }: { className?: string }) {
  // Всеки ред: отстъп и парчета [ширина, цвят].
  const lines: { indent: number; parts: [string, string][] }[] = [
    { indent: 0, parts: [["w-10", "bg-night-accent"], ["w-20", "bg-night-ink/80"]] },
    { indent: 1, parts: [["w-14", "bg-night-muted/70"], ["w-8", "bg-night-accent/70"], ["w-16", "bg-night-ink/60"]] },
    { indent: 1, parts: [["w-24", "bg-night-ink/60"], ["w-10", "bg-night-muted/70"]] },
    { indent: 2, parts: [["w-12", "bg-night-accent"], ["w-28", "bg-night-ink/80"]] },
    { indent: 1, parts: [["w-16", "bg-night-muted/70"]] },
    { indent: 0, parts: [["w-6", "bg-night-accent/70"]] },
  ];
  return (
    <div aria-hidden="true" className={`overflow-hidden rounded-xl border border-night-line bg-night shadow-float ${className}`}>
      <WindowBar tone="night" />
      <div className="space-y-3 p-5">
        {lines.map((line, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-4 text-right font-mono text-[10px] leading-none text-night-muted/60">{index + 1}</span>
            <span className="mockup-type flex gap-2" style={{ marginLeft: `${line.indent * 1.1}rem`, ...step(index) }}>
              {line.parts.map(([width, color], part) => (
                <span key={part} className={`block h-2 rounded-full ${width} ${color}`} />
              ))}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <span className="w-4 text-right font-mono text-[10px] leading-none text-night-muted/60">{lines.length + 1}</span>
          <span className="mockup-cursor block h-3.5 w-0.5 bg-night-accent" />
        </div>
      </div>
    </div>
  );
}
