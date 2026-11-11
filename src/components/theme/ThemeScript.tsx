"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useRef } from "react";
import { defaultPalette, paletteStorageKey, palettes } from "./palettes";

export const themeStorageKey = "wd-theme";

// Палитрите, които се задават с атрибут (всички без тази по подразбиране).
const selectablePalettes = palettes.map((palette) => palette.id).filter((id) => id !== defaultPalette);

/*
 * Избира темата и палитрата, преди браузърът да нарисува страницата — иначе посетител
 * с тъмна тема или с избрана палитра вижда за миг вида по подразбиране.
 *  - Тема: запазеният избор има предимство; при първо посещение се следва устройството.
 *  - Палитра: слага се само ако запазената стойност е от списъка (стара или чужда
 *    стойност в localStorage се пренебрегва).
 */
const script = `(function(){try{var d=document.documentElement,t=localStorage.getItem("${themeStorageKey}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.setAttribute("data-theme",t);var p=localStorage.getItem("${paletteStorageKey}");if(${JSON.stringify(selectablePalettes)}.indexOf(p)>-1){d.setAttribute("data-palette",p)}}catch(e){}})()`;

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
