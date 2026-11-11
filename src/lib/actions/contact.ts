"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sendContactMessage } from "@/lib/mail/send-contact-message";
import { isServiceId } from "@/lib/services";

const fieldNames = ["name", "email", "phone", "message", "consent"] as const;
type FieldName = (typeof fieldNames)[number];

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<FieldName, string>>;
  // Въведеното се връща, за да не се губи при грешка.
  values?: { name: string; email: string; phone: string; message: string };
};

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+()\-\s]*$/),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal("on"),
});

// Ограничение на честотата: до 5 запитвания за 10 минути от един адрес.
// Паметта е на процеса — при няколко сървъра ще трябва общо хранилище.
const windowMs = 10 * 60 * 1000;
const maxRequests = 5;
const recentRequests = new Map<string, number[]>();

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const timestamps = (recentRequests.get(clientKey) ?? []).filter((time) => now - time < windowMs);
  if (timestamps.length >= maxRequests) {
    recentRequests.set(clientKey, timestamps);
    return true;
  }
  timestamps.push(now);
  recentRequests.set(clientKey, timestamps);
  return false;
}

const text = (value: FormDataEntryValue | null) => (typeof value === "string" ? value : "");

export async function submitContactForm(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Езикът идва от скрито поле на формата; стойността не се приема на доверие.
  const localeInput = text(formData.get("locale"));
  const locale = hasLocale(localeInput) ? localeInput : defaultLocale;
  const form = (await getDictionary(locale)).contact.form;

  // Услугата идва от скрито поле на формата в страницата на услугата; непозната стойност се пренебрегва.
  const serviceInput = text(formData.get("service"));
  const service = isServiceId(serviceInput) ? serviceInput : undefined;

  const values = {
    name: text(formData.get("name")),
    email: text(formData.get("email")),
    phone: text(formData.get("phone")),
    message: text(formData.get("message")),
  };

  // Поле-капан: хората не го виждат, ботовете го попълват. Отговаря се с „успех“,
  // за да не научи ботът, че е разпознат.
  if (text(formData.get("website")) !== "") {
    return { status: "success", message: form.success };
  }

  const parsed = schema.safeParse({ ...values, consent: formData.get("consent") });
  if (!parsed.success) {
    const fieldErrors: Partial<Record<FieldName, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && (fieldNames as readonly string[]).includes(field)) {
        fieldErrors[field as FieldName] = form.errors[field as FieldName];
      }
    }
    return { status: "error", fieldErrors, values };
  }

  const requestHeaders = await headers();
  const clientKey =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(clientKey)) {
    return { status: "error", message: form.errorRateLimited, values };
  }

  try {
    await sendContactMessage({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || undefined,
      message: parsed.data.message,
      locale,
      service,
    });
  } catch (error) {
    console.error("[contact] запитването не беше изпратено:", error);
    return { status: "error", message: form.errorGeneric, values };
  }

  return { status: "success", message: form.success };
}
