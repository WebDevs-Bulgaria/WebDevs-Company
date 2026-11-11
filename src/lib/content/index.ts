import { getT } from "@/i18n/server";

/*
 * Слой за съдържание: списъците, които се показват от няколко компонента (услуги, стъпки на
 * процеса, технологии). Сега идват от преводите; когато се появи административен панел,
 * се сменя само вътрешността на тези функции. Единичните текстове компонентите взимат
 * направо с t().
 */

// Двете групи услуги: сайтовете са основната дейност, приложенията — втората.
export type ServiceGroup = "websites" | "applications";

export const serviceGroups: ServiceGroup[] = ["websites", "applications"];

export async function getServices() {
  const { t } = await getT("services");
  return t("items");
}

export async function getServicesByGroup(group: ServiceGroup) {
  return (await getServices()).filter((service) => service.group === group);
}

export async function getProcessSteps() {
  const { t } = await getT("services");
  return t("process.steps");
}

export async function getTechnologyGroups() {
  const { t } = await getT("solutions");
  return t("technology.groups");
}
