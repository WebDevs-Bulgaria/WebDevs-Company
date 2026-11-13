"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { LivingOrb } from "@/components/visuals/LivingOrb";

/*
 * Мястото на AI асистента: живо кълбо долу вдясно на всяка страница. Самият асистент още
 * не е направен — при натискане се отваря малък панел, който го казва честно и води към
 * формата за запитване. Когато асистентът стане готов, панелът се заменя с разговора;
 * кълбото, мястото и размерите остават.
 */
export function AssistantOrb({
  labels,
  contactHref,
}: {
  labels: { open: string; close: string; badge: string; title: string; text: string; cta: string };
  contactHref: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

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

  return (
    // ВРЕМЕННО е вдигнато (bottom-20): на пробния адрес значката на Netlify пада върху кълбото.
    // Когато сайтът отиде на истинския хостинг, се връща на "bottom-5 … sm:bottom-6".
    <div ref={rootRef} className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-4 sm:right-6">
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={labels.title}
          className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-line bg-surface-raised p-5 shadow-float"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{labels.badge}</p>
          <p className="mt-2 font-display text-xl font-extrabold tracking-tight text-ink">{labels.title}</p>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{labels.text}</p>
          <Link
            href={contactHref}
            onClick={() => setOpen(false)}
            className="brand-gradient mt-4 inline-flex min-h-11 items-center rounded-full px-5 text-sm font-bold text-white"
          >
            {labels.cta}
          </Link>
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        title={labels.open}
        onClick={() => setOpen((value) => !value)}
        className="living-orb-button rounded-full"
      >
        <LivingOrb className="h-14 w-14 sm:h-16 sm:w-16" />
      </button>
    </div>
  );
}
