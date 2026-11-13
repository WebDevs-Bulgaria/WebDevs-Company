"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useRef } from "react";
import { paletteStorageKey, palettes } from "./palettes";

export const themeStorageKey = "wd-theme";

// Позволените стойности за data-palette. Сървърът слага палитрата по подразбиране; скриптът я
// замества със запазения избор на посетителя.
const selectablePalettes = palettes.map((palette) => palette.id);

/*
 * Избира темата и палитрата, преди браузърът да нарисува страницата — иначе посетител
 * с избрана тъмна тема или палитра вижда за миг вида по подразбиране.
 *  - Тема: запазеният избор има предимство; при първо посещение е светлата, независимо от
 *    настройката на устройството (решение от 13.11.2026). Тъмната е само по избор от плъзгача.
 *  - Палитра: запазеният избор, ако е от списъка; иначе тази, която сървърът е сложил.
 *
 * Скриптът и пази двата атрибута (MutationObserver). При смяна на езика React презаписва
 * атрибутите на <html> със стойностите от сървъра (data-theme="light"); наблюдателят ги връща
 * в същата задача, преди браузърът да нарисува кадър. Затова изборът се записва в localStorage
 * ПРЕДИ да се смени атрибутът (ThemeToggle, PaletteSwitcher) — иначе наблюдателят го връща.
 */
const script = `(function(){var d=document.documentElement,L=${JSON.stringify(selectablePalettes)},P=d.getAttribute("data-palette");function a(){try{var t=localStorage.getItem("${themeStorageKey}");if(t!=="light"&&t!=="dark"){t="light"}if(d.getAttribute("data-theme")!==t){d.setAttribute("data-theme",t)}var p=localStorage.getItem("${paletteStorageKey}");if(L.indexOf(p)<0){p=P}if(p&&d.getAttribute("data-palette")!==p){d.setAttribute("data-palette",p)}}catch(e){}}a();try{new MutationObserver(a).observe(d,{attributes:true,attributeFilter:["data-theme","data-palette"]})}catch(e){}})()`;

/*
 * Скриптът се вмъква само в HTML от сървъра (useServerInsertedHTML), веднъж. Така
 * React не рисува script таг в браузъра при смяна на езика и не предупреждава за него;
 * атрибутите, които скриптът е сложил на <html>, остават при навигация. Подходът е от
 * ръководството на Next.js „Preventing flash before hydration“.
 */
export function ThemeScript() {
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return <script dangerouslySetInnerHTML={{ __html: script }} />;
  });

  return null;
}
