# Handoff

## State
Фирмен сайт WebDevs (`C:\Users\Bebo Jr\Documents\GitHub\WebDevs-Company`), фаза 2 по `plan-firmen-sait-faza-2.md`. Клон `fix/theme-toggle-and-marquee`, НЕкомитнато: етап 1 (ThemeScript пазач с MutationObserver, ThemeToggle, LanguageSwitcher `data-lang-switch`, globals.css) и етап 4.1 (TechMarquee 4 копия, без пауза при hover) + README. Мартин потвърди, че етап 1 е оправен.
Етап 2: дадох примери за AI/ERP услуги и предложение за цени и пакети (`memory/reference_webdevs_ceni_i_paketi.md`); текстовете още не са писани.

## Next
1. Чакам от Мартин: кои AI/ERP услуги влизат, ERP (собствена/интеграции), одобрени цени, вариант на пакети А/Б, какво е „платформата за промоции“ — после пиша текстовете (bg+en JSON в `src/i18n/locales`).
2. „Комитни“ за клона с поправките (само при изричен сигнал; без Co-Authored-By).
3. Отворено предложение без отговор: скриптът в `ThemeScript.tsx` да стане четим, пазачът да се премести в React.

## Context
- Пише Мартин (синът); първият отговор на сесия започва с „Здравей Бобка ще работим ли“. Без промени по код без питане; при проба не връщам без въпрос.
- Живият сайт https://webdevs-bulgaria.netlify.app тегли `main` и е БЕЗ поправките. `netlify deploy` от Windows не работи — само през GitHub.
- Промяна в `globals.css` иска рестарт на dev (kill 3000, `rm -rf .next`, `npm run dev`). Файловете са с CRLF — многоредови замени със скрипт да нормализират краищата.
- Присветването не се възпроизвежда в headless Chrome; потвърждава го само Мартин в своя браузър.
- Проектите в МАБИ не се назовават на сайта без решение на Борислав. Памет/дневник: 3 места, md5-равни; идеи в `memory/project_webdevs_idei.md`.
