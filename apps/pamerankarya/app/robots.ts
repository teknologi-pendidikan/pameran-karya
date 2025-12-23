import type { MetadataRoute } from "next";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/internal/",
    },
    sitemap: "https://pamerankarya.teknologipendidikan.or.id/sitemap.xml",
  };
}
