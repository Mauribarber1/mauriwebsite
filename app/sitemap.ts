import type { MetadataRoute } from "next";

const BASE_URL = "https://www.mauribarber.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/es`,
      lastModified: new Date(),
      alternates: { languages: { en: `${BASE_URL}/en` } },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      alternates: { languages: { es: `${BASE_URL}/es` } },
    },
  ];
}
