import "i18next";
import type about from "./locales/bg/about.json";
import type admin from "./locales/bg/admin.json";
import type common from "./locales/bg/common.json";
import type contact from "./locales/bg/contact.json";
import type home from "./locales/bg/home.json";
import type privacy from "./locales/bg/privacy.json";
import type services from "./locales/bg/services.json";
import type solutions from "./locales/bg/solutions.json";
import type tickets from "./locales/bg/tickets.json";

// Типовете на ключовете идват от българските файлове: несъществуващ ключ в t() е грешка при
// компилация. Еднаквостта на двата езика се проверява със scripts/check-locales.mjs.
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    // Съответства на i18nextOptions.returnObjects в settings.ts: t() връща обектите с типовете им.
    returnObjects: true;
    resources: {
      common: typeof common;
      home: typeof home;
      services: typeof services;
      solutions: typeof solutions;
      about: typeof about;
      contact: typeof contact;
      privacy: typeof privacy;
      admin: typeof admin;
      tickets: typeof tickets;
    };
  }
}
