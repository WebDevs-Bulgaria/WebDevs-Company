"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { defaultPalette, paletteStorageKey, palettes, type PaletteId } from "./palettes";

// Изборът живее в localStorage; компонентът се абонира за промените му.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readPalette(): PaletteId {
  const saved = window.localStorage.getItem(paletteStorageKey);
  return palettes.find((palette) => palette.id === saved)?.id ?? defaultPalette;
}

function applyPalette(id: PaletteId) {
  document.documentElement.dataset.palette = id;
}

function choosePalette(id: PaletteId) {
  window.localStorage.setItem(paletteStorageKey, id);
  applyPalette(id);
  listeners.forEach((listener) => listener());
}

type Palette = (typeof palettes)[number];

const swatch = (palette: Palette) =>
  "swatch" in palette ? palette.swatch : `linear-gradient(135deg, ${palette.from}, ${palette.to})`;

// Кръгчетата на всички палитри; избраната е с рамка.
function Swatches({ active, names }: { active: PaletteId; names: Record<PaletteId, string> }) {
  return (
    <span className="flex items-center gap-1.5">
      {palettes.map((palette) => {
        const selected = active === palette.id;
        return (
          <button
            key={palette.id}
            type="button"
            aria-pressed={selected}
            aria-label={names[palette.id]}
            title={names[palette.id]}
            onClick={() => choosePalette(palette.id)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition duration-200 hover:scale-110 ${
              selected ? "border-ink" : "border-transparent"
            }`}
          >
            <span aria-hidden="true" className="h-5 w-5 rounded-full" style={{ backgroundImage: swatch(palette) }} />
          </button>
        );
      })}
    </span>
  );
}

/*
 * Избор на цветова палитра. Не стои постоянно върху страницата (заемаше място, особено на
 * телефон, а долният десен ъгъл е за AI асистента), а е прибран на две места:
 *  - „popover“ — едно кръгче с цвета на избраната палитра в шапката (широк екран); при
 *    натискане отваря малък панел с всички палитри;
 *  - „inline“ — ред с кръгчетата в мобилното меню.
 * Изборът се помни в браузъра. Самите палитри са в src/app/globals.css, списъкът им — в ./palettes.ts.
 */
export function PaletteSwitcher({
  label,
  names,
  variant,
}: {
  label: string;
  names: Record<PaletteId, string>;
  variant: "popover" | "inline";
}) {
  // На сървъра и при първото рисуване в браузъра е палитрата по подразбиране; веднага
  // след това React взима запазената стойност, без разминаване при зареждането.
  const active = useSyncExternalStore(subscribe, readPalette, () => defaultPalette);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  // ThemeScript слага палитрата преди първото рисуване. При разработка React изтрива
  // атрибута при повторното монтиране (Strict Mode) — тук се връща.
  useLayoutEffect(() => {
    applyPalette(readPalette());
  }, []);

  // Панелът се затваря с Escape и при натискане извън него.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <div role="group" aria-label={label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          {label}
        </span>
        <Swatches active={active} names={names} />
      </div>
    );
  }

  const current = palettes.find((palette) => palette.id === active) ?? palettes[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${label}: ${names[active]}`}
        title={label}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface transition-colors duration-200 hover:border-accent"
      >
        <span aria-hidden="true" className="h-5 w-5 rounded-full" style={{ backgroundImage: swatch(current) }} />
      </button>

      {open ? (
        <div
          id={panelId}
          role="group"
          aria-label={label}
          className="absolute right-0 top-full z-50 mt-3 flex items-center gap-3 whitespace-nowrap rounded-full border border-line bg-surface-raised py-2 pl-4 pr-2.5 shadow-float"
        >
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            {names[active]}
          </span>
          <Swatches active={active} names={names} />
        </div>
      ) : null}
    </div>
  );
}
