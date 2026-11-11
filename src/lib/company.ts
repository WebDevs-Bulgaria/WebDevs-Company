// Фирмените данни на едно място. Ползват се от футъра, страницата за контакт,
// политиката за поверителност и структурираните данни (JSON-LD).
export const company = {
  brandName: "Web Devs Bulgaria",
  legalName: {
    bg: "Уеб Девс България ЕООД",
    en: "Web Devs Bulgaria EOOD",
  },
  registrationNumber: "208976599",
  foundingDate: "2026-10-28",
  email: "webdevsbulgaria@gmail.com",
  phone: {
    display: "0894 371 779",
    international: "+359894371779",
  },
  address: {
    locality: { bg: "София", en: "Sofia" },
    country: { bg: "България", en: "Bulgaria" },
    countryCode: "BG",
  },
} as const;
