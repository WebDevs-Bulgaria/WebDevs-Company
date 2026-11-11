// Цветовите палитри, между които може да се избира. Самите цветове са в
// src/app/globals.css (блоковете :root[data-palette="…"]); тук са само идентификаторите
// и двата цвята за кръгчето в превключвателя. Имената им са в src/messages (nav.palette).
export const palettes = [
  { id: "emerald", from: "#067a4e", to: "#0a7f8f" },
  { id: "turquoise", from: "#2f5bff", to: "#0a9fb2" },
  { id: "violet", from: "#2f5bff", to: "#7c4dff" },
] as const;

export type PaletteId = (typeof palettes)[number]["id"];

// Палитрата от @theme в globals.css — за нея не се слага атрибут data-palette.
export const defaultPalette: PaletteId = "emerald";

export const paletteStorageKey = "wd-palette-2";
