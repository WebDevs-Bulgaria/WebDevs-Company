import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary: "brand-gradient text-white hover:shadow-float",
  secondary: "border border-ink text-ink hover:bg-ink hover:text-canvas",
  night: "border border-night-line text-night-ink hover:border-night-accent hover:text-night-accent",
} as const;

// Връзка с вид на бутон: правоъгълна, със стрелка, която се измества при посочване.
export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-13 items-center justify-center gap-3 rounded-sm px-7 text-sm font-bold tracking-wide transition duration-200 ${variants[variant]}`}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </Link>
  );
}
