import { Inter, JetBrains_Mono, Manrope } from "next/font/google";

// Подмножеството cyrillic е задължително — без него българският текст пада на резервен шрифт.
const heading = Manrope({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin", "cyrillic"],
});

// Класовете се слагат на <html>; ползват се и от root layout, и от global-not-found.
export const fontVariables = `${heading.variable} ${body.variable} ${code.variable}`;
