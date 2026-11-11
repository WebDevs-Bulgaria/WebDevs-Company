import "server-only";

export type ContactMessage = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale: string;
  // id на услугата, ако запитването е изпратено от нейната страница.
  service?: string;
};

/*
 * Единствената точка, през която запитването напуска сайта.
 * Услуга за изпращане на имейл още не е избрана (решава се заедно с хостинга),
 * затова при разработка съобщението се извежда в конзолата на сървъра,
 * а в production функцията отказва, вместо да изгуби запитването мълчаливо.
 */
export async function sendContactMessage(message: ContactMessage): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] ново запитване (не е изпратено — няма настроена поща):", message);
    return;
  }

  throw new Error("Не е настроена услуга за изпращане на имейл.");
}
