import services from "@/i18n/locales/bg/services.json";

// Идентификаторите на услугите (те са и последната част от адреса на страницата на
// услугата). Взимат се от българския файл с преводи; на всички езици id-тата са едни и същи.
export const serviceIds = services.items.map((service) => service.id);

export const isServiceId = (value: string) => serviceIds.includes(value);

// Адресът на страницата на една услуга, без езиковия префикс: /services/online-stores.
export const servicePath = (id: string) => `/services/${id}`;
