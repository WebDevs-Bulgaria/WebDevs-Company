// Цветовите палитри, между които може да се избира. Самите цветове са в
// src/app/globals.css (блоковете :root[data-palette="…"]); тук са само идентификаторите
// и двата цвята за кръгчето в превключвателя (или готов фон в swatch, когато цветовете са повече). Имената им са в src/messages (nav.palette).
export const palettes = [
  { id: "emerald", from: "#067a4e", to: "#0a7f8f" },
  { id: "turquoise", from: "#2f5bff", to: "#0a9fb2" },
  { id: "violet", from: "#2f5bff", to: "#7c4dff" },
  // Пробни палитри от фаза 2, етап 3 (13.11.2026).
  { id: "orange", from: "#ff5a14", to: "#ff9f1a" },
  {
    id: "multicolor",
    from: "#ff5a14",
    to: "#1f4fd8",
    swatch: "conic-gradient(#ff5a14, #ffc21a, #18d6e6, #1f4fd8, #ff2fa0, #e5242a, #ff5a14)",
  },
] as const;

export type PaletteId = (typeof palettes)[number]["id"];

// Палитрата за посетител без собствен избор; root layout-ът я слага като data-palette на <html>.
// „emerald“ няма собствен блок в globals.css — тя е стойностите от @theme.
export const defaultPalette: PaletteId = "multicolor";

export const paletteStorageKey = "wd-palette-2";
