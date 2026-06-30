import { MetadataRoute } from "next";
import { SEO_PAGES_DATA } from "@/data/seoPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ordrji.com";

  // Core Static Pages
  const staticRoutes = [
    "",
    "/pricing",
    "/about",
    "/contact",
    "/demo",
    "/faq",
    "/how-to-use",
    "/terms",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Money & Landing Pages
  const dynamicRoutes = Object.keys(SEO_PAGES_DATA).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
