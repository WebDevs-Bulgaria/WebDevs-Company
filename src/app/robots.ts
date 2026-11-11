import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";

// robots.txt: обхождането е разрешено само за публичния сайт (NEXT_PUBLIC_ALLOW_INDEXING=true).
// Всяка друга среда се затваря, за да не се индексира копие на сайта.
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
