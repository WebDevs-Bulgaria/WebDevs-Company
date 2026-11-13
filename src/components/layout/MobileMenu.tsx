"use client";

import Link from "next/link";
import { useEffect, useId, useState, type ReactNode } from "react";

type MenuLink = { href: string; label: string };

// Навигацията за малки екрани: бутон, който отваря панел с връзките.
export function MobileMenu({
  links,
  cta,
  labels,
  extra,
}: {
  links: MenuLink[];
  cta: MenuLink;
  // Допълнително съдържание под бутона (изборът на палитра).
  extra?: ReactNode;
  labels: { open: string; close: string; navigation: string };
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Затваряне с клавиша Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-ink"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full border-b border-line bg-canvas shadow-lg"
        >
          <nav aria-label={labels.navigation} className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center border-b border-line font-display text-xl font-extrabold tracking-tight text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="brand-gradient mt-4 flex min-h-12 items-center justify-center rounded-sm px-5 text-sm font-bold text-white"
            >
              {cta.label}
            </Link>
            {extra ? <div className="mt-5 border-t border-line pt-4">{extra}</div> : null}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
