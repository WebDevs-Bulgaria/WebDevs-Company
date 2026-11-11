import { getDictionary } from "@/i18n/dictionaries";

/*
 * Слой за съдържание. Страниците взимат съдържанието си само оттук.
 * Сега източникът са файловете в src/messages; когато се появи административен
 * панел, се сменя само вътрешността на тези функции.
 */

// Двете групи услуги: сайтовете са основната дейност, приложенията — втората.
export type ServiceGroup = "websites" | "applications";

export const serviceGroups: ServiceGroup[] = ["websites", "applications"];

export async function getServices() {
  return (await getDictionary()).services;
}

export async function getServicesByGroup(group: ServiceGroup) {
  const services = await getServices();
  return services.items.filter((service) => service.group === group);
}

export async function getProcessSteps() {
  return (await getDictionary()).process.steps;
}

export async function getTechnologyGroups() {
  return (await getDictionary()).technology.groups;
}

export async function getSolutions() {
  return (await getDictionary()).projects;
}

export async function getAboutContent() {
  return (await getDictionary()).about;
}

export async function getPrivacyPolicy() {
  return (await getDictionary()).privacy;
}
