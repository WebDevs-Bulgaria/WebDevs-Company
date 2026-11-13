import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Кръглият знак „N“ долу вляво при разработка е изключен: пречи при преглед на сайта.
  // Грешките при компилация пак се показват на цял екран.
  devIndicators: false,
  experimental: {
    // Обща страница 404 (src/app/global-not-found.tsx) за адреси извън всеки маршрут.
    // Нужна е, защото root layout-ът е под динамичния сегмент [locale].
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
