"use client";

import { useLayoutEffect, useRef } from "react";
import { themeStorageKey } from "./ThemeScript";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function preferredTheme(): Theme {
  const saved = window.localStorage.getItem(themeStorageKey);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Sun({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" {...iconProps} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  );
}

function Moon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" {...iconProps} className={className}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  );
}

/*
 * Плъзгач за светла и тъмна тема: слънце вляво, луна вдясно, цветното кръгче се
 * плъзга към избраната. Изборът се помни в браузъра. Положението на кръгчето и
 * иконата в него се управляват от CSS според data-theme — компонентът няма
 * състояние в React и не може да се размине със страницата при зареждане.
 *
 * Кръгчето се плъзга с анимация само след натискане (data-animate на бутона). При смяна на
 * езика React презаписва атрибутите на <html>, data-theme минава за миг през „light“ и с
 * постоянен transition кръгчето се местеше видимо, без темата да се е сменила.
 */
export function ThemeToggle({ label }: { label: string }) {
  // При разработка React нулира атрибутите на <html> при повторното монтиране
  // (Strict Mode) и изтрива това, което ThemeScript е сложил. В production не прави нищо.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", preferredTheme());
  }, []);

  const button = useRef<HTMLButtonElement>(null);
  const animationTimer = useRef<number | undefined>(undefined);

  function toggle() {
    if (button.current) {
      button.current.dataset.animate = "true";
      window.clearTimeout(animationTimer.current);
      animationTimer.current = window.setTimeout(() => {
        if (button.current) delete button.current.dataset.animate;
      }, 400);
    }
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    // Първо записът, после атрибутът: ThemeScript връща атрибута към записаната стойност.
    window.localStorage.setItem(themeStorageKey, next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      ref={button}
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group relative inline-flex h-10 w-[4.5rem] shrink-0 items-center rounded-full border border-line bg-surface p-1 hover:border-accent"
    >
      {/* Двете икони на релсата */}
      <span className="flex w-full items-center justify-between px-1.5 text-ink-muted">
        <Sun className="h-4 w-4" />
        <Moon className="h-4 w-4" />
      </span>

      {/* Плъзгащото се кръгче с иконата на активната тема */}
      <span className="brand-gradient absolute left-1 top-1 flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-full text-white shadow-card ease-out group-active:scale-90 group-data-[animate=true]:transition-transform group-data-[animate=true]:duration-300 dark:translate-x-8">
        <Sun className="h-4 w-4 dark:hidden" />
        <Moon className="hidden h-4 w-4 dark:block" />
      </span>
    </button>
  );
}
