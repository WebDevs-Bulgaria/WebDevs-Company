"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
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
  // Палитрата по подразбиране няма нужда от атрибут.
  if (id === defaultPalette) delete document.documentElement.dataset.palette;
  else document.documentElement.dataset.palette = id;
}

function choosePalette(id: PaletteId) {
  window.localStorage.setItem(paletteStorageKey, id);
  applyPalette(id);
  listeners.forEach((listener) => listener());
}

/*
 * Избор на цветова палитра: малко хапче долу вдясно с по едно цветно кръгче за всяка
 * палитра; името на избраната е изписано до кръгчетата. Изборът се помни в браузъра.
 * Самите палитри са в src/app/globals.css, списъкът им — в ./palettes.ts.
 */
export function PaletteSwitcher({
  label,
  names,
}: {
  label: string;
  names: Record<PaletteId, string>;
}) {
  // На сървъра и при първото рисуване в браузъра е палитрата по подразбиране; веднага
  // след това React взима запазената стойност, без разминаване при зареждането.
  const active = useSyncExternalStore(subscribe, readPalette, () => defaultPalette);

  // ThemeScript слага палитрата преди първото рисуване. При разработка React изтрива
  // атрибута при повторното монтиране (Strict Mode) — тук се връща.
  useLayoutEffect(() => {
    applyPalette(readPalette());
  }, []);

  return (
    <div
      role="group"
      aria-label={label}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-line bg-surface-raised/90 py-2 pl-4 pr-2.5 shadow-float backdrop-blur-md"
    >
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {names[active]}
      </span>
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
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition duration-200 hover:scale-110 ${
                selected ? "border-ink" : "border-transparent"
              }`}
            >
              <span
                aria-hidden="true"
                className="h-5 w-5 rounded-full"
                style={{ backgroundImage: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}
              />
            </button>
          );
        })}
      </span>
    </div>
  );
}
