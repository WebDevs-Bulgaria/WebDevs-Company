import messages from "@/messages/bg.json";

// Идентификаторите на услугите (те са и последната част от адреса на страницата на
// услугата). Взимат се от българския речник; двата речника имат едни и същи id.
export const serviceIds = messages.services.items.map((service) => service.id);

export const isServiceId = (value: string) => serviceIds.includes(value);

// Адресът на страницата на една услуга, без езиковия префикс: /services/online-stores.
export const servicePath = (id: string) => `/services/${id}`;
