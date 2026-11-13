"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type contactMessages from "@/i18n/locales/bg/contact.json";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

/*
 * Два вида на формата: „light“ — върху светъл фон (страницата „Контакт“), „night“ — направо
 * върху тъмна секция, без карта (запитването в страницата на услуга). Червеното при „night“
 * е по-светло, защото тъмният --color-danger не се чете върху тъмен фон.
 */
const tones = {
  light: {
    label: "text-ink",
    muted: "text-ink-muted",
    input:
      "bg-surface text-ink placeholder:text-ink-muted/60 hover:border-ink/30 focus:border-accent focus:bg-canvas focus:ring-accent-soft",
    border: "border-line",
    error: "text-danger",
    errorBorder: "border-danger focus:border-danger",
    errorDot: "bg-danger",
    link: "text-accent",
    alert: "border-danger/40 bg-danger/5 text-danger",
    success: "text-ink",
    scheme: "",
  },
  night: {
    label: "text-night-ink",
    muted: "text-night-muted",
    input:
      "bg-night-raised/60 text-night-ink placeholder:text-night-muted/50 hover:border-night-muted/50 focus:border-night-accent focus:bg-night-raised focus:ring-night-accent/15",
    border: "border-night-line",
    error: "text-[#ff9b8f]",
    errorBorder: "border-[#ff9b8f] focus:border-[#ff9b8f]",
    errorDot: "bg-[#ff9b8f]",
    link: "text-night-accent",
    alert: "border-[#ff9b8f]/40 bg-[#ff9b8f]/10 text-[#ff9b8f]",
    success: "text-night-ink",
    // Тъмна схема за вградените контроли (отметката), иначе браузърът я рисува бяла.
    scheme: "[color-scheme:dark]",
  },
} as const;

type Tone = (typeof tones)[keyof typeof tones];

const inputClass = (style: Tone, invalid: boolean) =>
  `block w-full rounded-md border px-4 py-3.5 text-base transition duration-200 focus:outline-none focus:ring-4 ${style.input} ${
    invalid ? style.errorBorder : style.border
  }`;

// Едно поле на формата: надпис, самото поле, подсказка и грешка.
function Field({
  id,
  label,
  optional,
  hint,
  error,
  style,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  hint?: string;
  error?: string;
  style: Tone;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-2 flex items-baseline justify-between gap-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] ${style.label}`}
      >
        {label}
        {optional ? (
          <span className={`font-sans text-xs font-normal normal-case tracking-normal ${style.muted}`}>{optional}</span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className={`mt-2 text-sm ${style.muted}`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className={`mt-2 flex items-center gap-2 text-sm font-medium ${style.error}`}>
          <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.errorDot}`} />
          {error}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint = false) =>
  [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

// Формата за запитване. Проверката на данните е на сървъра (lib/actions/contact.ts);
// атрибутите required/type тук са само за удобство на потребителя.
export function ContactForm({
  locale,
  labels,
  privacyHref,
  serviceId,
  tone = "light",
}: {
  locale: Locale;
  labels: (typeof contactMessages)["form"];
  privacyHref: string;
  // В страницата на услуга: id-то се изпраща със запитването.
  serviceId?: string;
  tone?: keyof typeof tones;
}) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const errors = state.fieldErrors ?? {};
  const style = tones[tone];

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-[26rem] flex-col items-center justify-center gap-5 py-6 text-center">
        <span className="brand-gradient flex h-14 w-14 items-center justify-center rounded-full text-white shadow-float">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3 8.5l3.2 3.2L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className={`max-w-md font-display text-2xl font-extrabold tracking-tight ${style.success}`}>
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className={`space-y-6 ${style.scheme}`}>
      {/* Езикът, на който сървърът да върне съобщенията. */}
      <input type="hidden" name="locale" value={locale} />
      {serviceId ? <input type="hidden" name="service" value={serviceId} /> : null}

      <Field id="contact-name" label={labels.name} error={errors.name} style={style}>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("contact-name", errors.name)}
          className={inputClass(style, !!errors.name)}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-email" label={labels.email} error={errors.email} style={style}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("contact-email", errors.email)}
            className={inputClass(style, !!errors.email)}
          />
        </Field>

        <Field id="contact-phone" label={labels.phone} optional={labels.optional} error={errors.phone} style={style}>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={state.values?.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("contact-phone", errors.phone)}
            className={inputClass(style, !!errors.phone)}
          />
        </Field>
      </div>

      {/* Бюджет и срок: по избор, за по-бърз ориентир. На тесен екран са едно под друго. */}
      <div className="grid gap-6 sm:grid-cols-2">
        {(
          [
            { name: "budget", label: labels.budget, options: labels.budgetOptions },
            { name: "timeline", label: labels.timeline, options: labels.timelineOptions },
          ] as const
        ).map((select) => (
          <Field
            key={select.name}
            id={`contact-${select.name}`}
            label={select.label}
            optional={labels.optional}
            style={style}
          >
            <select
              id={`contact-${select.name}`}
              name={select.name}
              defaultValue={state.values?.[select.name] ?? ""}
              className={`${inputClass(style, false)} min-h-[3.375rem] cursor-pointer`}
            >
              <option value="">{labels.choose}</option>
              {Object.entries(select.options).map(([value, text]) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </select>
          </Field>
        ))}
      </div>

      <Field id="contact-message" label={labels.message} hint={labels.messageHint} error={errors.message} style={style}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          defaultValue={state.values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("contact-message", errors.message, true)}
          className={`${inputClass(style, !!errors.message)} resize-y`}
        />
      </Field>

      {/* Поле-капан за ботове: скрито за хора и за екранни четци. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="contact-consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "contact-consent-error" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-accent"
          />
          <span className={`text-sm leading-6 ${style.muted}`}>
            {labels.consentPrefix}{" "}
            <Link href={privacyHref} className={`font-semibold underline underline-offset-2 ${style.link}`}>
              {labels.consentLink}
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id="contact-consent-error" className={`mt-2 flex items-center gap-2 text-sm font-medium ${style.error}`}>
            <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.errorDot}`} />
            {errors.consent}
          </p>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className={`rounded-md border p-4 text-sm ${style.alert}`}>
          {state.message}
        </p>
      ) : null}

      {/* Бутонът е в стила на бутона „Свържете се с нас“ в шапката: хапче със стрелка в кръгче. */}
      <button
        type="submit"
        disabled={pending}
        className="brand-gradient group flex h-14 w-full items-center justify-between gap-3 rounded-full pl-7 pr-2 text-base font-bold text-white shadow-card transition duration-300 hover:shadow-float disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-72"
      >
        {pending ? labels.sending : labels.submit}
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-(--brand-from) transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </button>
    </form>
  );
}
