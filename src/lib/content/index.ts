import { getT } from "@/i18n/server";

/*
 * Слой за съдържание: списъците, които се показват от няколко компонента (услуги, стъпки на
 * процеса, технологии). Сега идват от преводите; когато се появи административен панел,
 * се сменя само вътрешността на тези функции. Единичните текстове компонентите взимат
 * направо с t().
 */

// Трите групи услуги, в реда, в който се показват (AI е първа — с нея се отличаваме). Името на групата е и котва в „Услуги“
// (/services#ai) и ключ в home.json (eyebrow) и services.json (groups).
export type ServiceGroup = "websites" | "applications" | "ai";

export const serviceGroups: ServiceGroup[] = ["ai", "websites", "applications"];

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
