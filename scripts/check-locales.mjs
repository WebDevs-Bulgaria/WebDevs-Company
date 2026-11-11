// Проверява, че всички езици имат едни и същи namespace файлове и едни и същи ключове в тях.
// Пуска се с `npm run check:locales` (и преди build). TypeScript пази ключовете спрямо
// българските файлове; тази проверка пази останалите езици да не изостанат от тях.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = "src/i18n/locales";
const reference = "bg";
const languages = readdirSync(root);

// Всички пътища до крайни стойности: "hero.title", "items[0].points[2]" …
function keys(value, prefix = "") {
  if (Array.isArray(value)) return value.flatMap((item, index) => keys(item, `${prefix}[${index}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => keys(item, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}

const load = (language, file) => JSON.parse(readFileSync(join(root, language, file), "utf8"));
const files = readdirSync(join(root, reference)).filter((file) => file.endsWith(".json"));
const problems = [];

for (const language of languages) {
  if (language === reference) continue;
  const own = readdirSync(join(root, language)).filter((file) => file.endsWith(".json"));
  for (const file of files) if (!own.includes(file)) problems.push(`${language}: липсва файлът ${file}`);
  for (const file of own) if (!files.includes(file)) problems.push(`${language}: излишен файл ${file}`);

  for (const file of files.filter((name) => own.includes(name))) {
    const expected = new Set(keys(load(reference, file)));
    const actual = new Set(keys(load(language, file)));
    for (const key of expected) if (!actual.has(key)) problems.push(`${language}/${file}: липсва ${key}`);
    for (const key of actual) if (!expected.has(key)) problems.push(`${language}/${file}: излишен ${key}`);
  }
}

if (problems.length > 0) {
  console.error(`Преводите не съвпадат (${problems.length}):\n` + problems.map((line) => "  " + line).join("\n"));
  process.exit(1);
}
console.log(`Преводите съвпадат: ${languages.length} езика, ${files.length} namespace-а.`);
