import type { ReactNode } from "react";

/*
 * Линейни иконки за данните за връзка (14.11.2026): телефон, имейл, адрес — в „Контакт“ и във
 * футъра. За всичко останало се ползват знаците на марката (BrandIcons.tsx). Рисуват се с цвета на текста около
 * тях (currentColor), затова следват палитрата и темата; размерът идва от className.
 * Декоративни са (aria-hidden) — смисълът винаги е в надписа до тях.
 */
function Icon({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

type IconProps = { className?: string };

export function PhoneIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M5.5 3.5h3l1.5 4.2-2 1.3a11 11 0 0 0 5 5l1.3-2 4.2 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2z" />
    </Icon>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </Icon>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </Icon>
  );
}
