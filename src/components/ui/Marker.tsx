/*
 * Малкият знак пред надписите над секциите и между нивата на пътя до страницата: две стрелки,
 * втората по-бледа, сякаш първата я води. Замества тънката хоризонтална черта, която стоеше
 * там преди (13.11.2026). Взима цвета на текста около себе си (currentColor), затова следва
 * палитрата и темата без собствени класове за цвят.
 *
 * single — една стрелка: разделител между нивата на пътя („Начало › Услуги“).
 */
export function Marker({ single = false, className = "" }: { single?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={single ? "0 0 8 12" : "0 0 17 12"}
      className={`h-3 shrink-0 ${single ? "w-2" : "w-[1.0625rem]"} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 2l4 4-4 4" />
      {single ? null : <path d="M10 2l4 4-4 4" opacity="0.45" />}
    </svg>
  );
}
